import { NextResponse } from 'next/server';
import { getMongoClientPromise } from '@/lib/mongodb';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const client = await getMongoClientPromise();
    await client.db('admin').command({ ping: 1 });

    return NextResponse.json({
      success: true,
      message: 'MongoDB connected successfully',
    });
  } catch (error) {
    console.error('MongoDB connection error:', error);

    return NextResponse.json(
      {
        success: false,
        message: 'MongoDB connection failed',
      },
      { status: 500 }
    );
  }
}
