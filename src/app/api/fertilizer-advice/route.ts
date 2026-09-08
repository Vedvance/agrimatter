import { NextRequest, NextResponse } from 'next/server';
import { getFertilizerAdvice } from '@/lib/advisory-engine';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { crop_name = 'Wheat', crop_stage = 'Vegetative' } = body;

    const advice = getFertilizerAdvice(crop_name, crop_stage);

    return NextResponse.json({
      success: true,
      advice
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || 'Error executing fertilizer advice engine' },
      { status: 500 }
    );
  }
}
