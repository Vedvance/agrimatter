import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenAI } from '@google/genai';
import { answerAssistantQuery } from '@/lib/advisory-engine';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { question = '', language = 'hi' } = body;

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
    const languageName = language === 'hi' ? 'Hindi' : 'English';
    const prompt = `You are Agrimatter, a careful agricultural assistant for farmers in India.
Answer the user's question in ${languageName}. Use simple, practical language.
Do not invent live weather, mandi prices, pesticide labels, or exact chemical doses.
For fertilizer or pesticide questions, give general guidance and recommend a soil test or local agriculture officer.
If current weather or market data is needed, say that live data must be checked separately.

User question: ${question}`;

    const result = await ai.models.generateContent({
      model: process.env.GEMINI_MODEL || 'gemini-3.6-flash',
      contents: prompt
    });
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
    return NextResponse.json(
      { success: false, error: error.message || 'Error answering query' },
      { status: 500 }
    );
  }
}
