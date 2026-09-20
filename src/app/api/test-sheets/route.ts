import { NextRequest, NextResponse } from 'next/server';
import { testSheetAccess } from '@/lib/google-sheets';

export async function GET(request: NextRequest) {
  try {
    const result = await testSheetAccess();
    return NextResponse.json({
      success: true,
      ...result,
      message: 'Sheet access test completed successfully'
    });
  } catch (error) {
    console.error('Test failed:', error);
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}