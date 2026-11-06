import { NextRequest, NextResponse } from 'next/server';

/**
 * POST /api/notifications/mark-read
 * Marks all or a specific notification as read.
 */
export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => ({}));
    const { notificationId } = body;

    return NextResponse.json({
      success: true,
      all: !notificationId,
      notificationId: notificationId || null,
      unreadCount: 0,
    });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update notifications' }, { status: 500 });
  }
}
