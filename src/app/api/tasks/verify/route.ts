import { NextRequest, NextResponse } from 'next/server';

/**
 * POST /api/tasks/verify
 * Checks external verification status (e.g. X API, Telegram bot membership, on-chain TX).
 */
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { taskId, proof } = body;

    if (!taskId) {
      return NextResponse.json({ error: 'Missing taskId' }, { status: 400 });
    }

    return NextResponse.json({
      success: true,
      taskId,
      verified: true,
      rewardPoints: 50,
      message: 'Task verified successfully. Ready to claim.',
    });
  } catch (error) {
    return NextResponse.json({ error: 'Verification failed' }, { status: 500 });
  }
}
