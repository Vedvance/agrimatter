import { NextRequest, NextResponse } from 'next/server';
import { answerAssistantQuery } from '@/lib/advisory-engine';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { question = '', language = 'hi' } = body;

    if (!question.trim()) {
      return NextResponse.json({ success: false, error: 'Question cannot be empty' }, { status: 400 });
    }

    const response = answerAssistantQuery(question, language);

    return NextResponse.json({
      success: true,
      question,
      language,
      answer: response.answer,
      category: response.category,
      timestamp: new Date().toISOString()
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || 'Error answering query' },
      { status: 500 }
    );
  }
}
