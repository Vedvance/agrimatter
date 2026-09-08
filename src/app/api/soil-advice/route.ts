import { NextRequest, NextResponse } from 'next/server';
import { evaluateSoilHealth } from '@/lib/advisory-engine';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const ph = parseFloat(body.ph ?? 6.8);
    const nitrogen = parseFloat(body.nitrogen ?? 220);
    const phosphorus = parseFloat(body.phosphorus ?? 22);
    const potassium = parseFloat(body.potassium ?? 180);

    const advice = evaluateSoilHealth(ph, nitrogen, phosphorus, potassium);

    return NextResponse.json({
      success: true,
      input: { ph, nitrogen, phosphorus, potassium },
      advice
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || 'Error processing soil analysis' },
      { status: 500 }
    );
  }
}
