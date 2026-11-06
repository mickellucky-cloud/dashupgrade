import { NextResponse } from 'next/server';

/**
 * POST /api/auth/logout
 * Clears authentication session cookies.
 */
export async function POST() {
  const response = NextResponse.json({ success: true, message: 'Logged out successfully' });
  response.cookies.delete('okn_session');
  response.cookies.delete('token');
  return response;
}
