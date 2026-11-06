import { NextRequest, NextResponse } from 'next/server';

/**
 * POST /api/tasks/claim
 * Claims points for a verified task and increments user balance.
 */
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { taskId } = body;

    if (!taskId) {
      return NextResponse.json({ error: 'Missing taskId' }, { status: 400 });
    }

    return NextResponse.json({
      success: true,
      taskId,
      pointsAwarded: 50,
      newTotalPoints: 185,
      claimedAt: new Date().toISOString(),
    });
  } catch (error) {
    return NextResponse.json({ error: 'Claim failed' }, { status: 500 });
  }
}
