import { NextResponse } from 'next/server';
import { getRefreshToken, getSession } from '@/lib/auth/session';

/**
 * POST /api/auth/refresh
 * Silent session refresher endpoint. Returns 200 if valid, 401 if unauthenticated.
 */
export async function POST() {
  try {
    const refreshToken = await getRefreshToken();
    const session = await getSession();

    if (!refreshToken && !session) {
      return NextResponse.json({ ok: false, error: 'No active session to refresh' }, { status: 401 });
    }

    return NextResponse.json({
      ok: true,
      refreshed: true,
      user: session ? { address: session.address, role: session.role } : null,
    });
  } catch {
    return NextResponse.json({ ok: false, error: 'Refresh failed' }, { status: 401 });
  }
}
