import { NextRequest, NextResponse } from 'next/server';
import { recommendCrops } from '@/lib/advisory-engine';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { soil_type = 'Loam', irrigation_type = 'Borewell', season = 'Rabi' } = body;

    const recommendations = recommendCrops(soil_type, irrigation_type, season);

    return NextResponse.json({
      success: true,
      query: { soil_type, irrigation_type, season },
      recommendations
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || 'Error executing crop recommendation engine' },
      { status: 500 }
    );
  }
}
