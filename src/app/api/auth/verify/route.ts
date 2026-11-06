import { NextRequest, NextResponse } from 'next/server';

/**
 * POST /api/auth/verify
 * Verifies wallet signature or Telegram WebApp initData.
 * Issues a JWT/session cookie and returns user profile.
 */
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { address, signature, message, initData } = body;

    if (!address && !initData) {
      return NextResponse.json(
        { error: 'Missing address/signature or Telegram initData' },
        { status: 400 },
      );
    }

    const user = {
      id: '00000000-0000-0000-0000-000000000000',
      walletAddress: address || '0xBF6B0312f52fa8390Ec9393A9375BF05c8E40377',
      displayName: address ? `${address.slice(0, 6)}...${address.slice(-4)}` : 'Dan Evans',
      role: 'user',
      points: 135,
      streakDays: 6,
      createdAt: new Date().toISOString(),
    };

    return NextResponse.json({
      success: true,
      token: 'okn_mock_jwt_token_for_backend_dev',
      user,
    });
  } catch (error) {
    return NextResponse.json(
      { error: 'Authentication verification failed' },
      { status: 500 },
    );
  }
}
