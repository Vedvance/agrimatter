import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenAI } from '@google/genai';
import { answerAssistantQuery } from '@/lib/advisory-engine';

export async function POST(request: NextRequest) {
  let question = '';
  let language: 'en' | 'hi' = 'hi';

  try {
    const body = await request.json();
    question = body.question || '';
    language = body.language === 'en' ? 'en' : 'hi';

    if (!question.trim()) {
      return NextResponse.json({ success: false, error: 'Question cannot be empty' }, { status: 400 });
    }

    const fallbackResponse = answerAssistantQuery(question, language);
    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
      return NextResponse.json({
        success: true,
        question,
        language,
        answer: fallbackResponse.answer,
        category: fallbackResponse.category,
        source: 'local-fallback',
        timestamp: new Date().toISOString()
      });
    }

    const ai = new GoogleGenAI({ apiKey });
    const languageName = language === 'hi' ? 'Hinglish' : 'English';
    const prompt = `You are Agrimatter, a careful agricultural assistant for farmers in India.
  Answer the user's question in ${languageName}. ${language === 'hi'
      ? 'Use natural Roman Hindi mixed with familiar English farming terms (Hinglish), for example: " गेहूं me pehli सिंचाई CRI stage par karein". Do not use formal Hindi-only sentences or Devanagari unless a crop or product name requires it.'
      : 'Use simple, practical English.'}
  Keep the answer fast and concise: maximum 5 short bullet points and about 100 words.
Do not invent live weather, mandi prices, pesticide labels, or exact chemical doses.
For fertilizer or pesticide questions, give general guidance and recommend a soil test or local agriculture officer.
If current weather or market data is needed, say that live data must be checked separately.

User question: ${question}`;

    const geminiRequest = ai.models.generateContent({
      model: process.env.GEMINI_MODEL || 'gemini-3.6-flash',
      contents: prompt,
      config: {
        temperature: 0.3,
        maxOutputTokens: 250,
      },
    });
    const timeout = new Promise<never>((_, reject) => {
      setTimeout(() => reject(new Error('Gemini request timed out')), 20000);
    });
    const result = await Promise.race([geminiRequest, timeout]);
    const answer = result.text?.trim();

    if (!answer) {
      throw new Error('Gemini returned an empty response');
    }

    return NextResponse.json({
      success: true,
      question,
      language,
      answer,
      category: fallbackResponse.category,
      source: 'gemini',
      timestamp: new Date().toISOString()
    });
  } catch (error: any) {
    const fallbackResponse = answerAssistantQuery(question, language);
    return NextResponse.json({
      success: true,
      question,
      language,
      answer: fallbackResponse.answer,
      category: fallbackResponse.category,
      source: 'local-fallback',
      warning: error.message || 'Gemini temporarily unavailable',
      timestamp: new Date().toISOString()
    });
  }
}
