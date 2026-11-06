import { NextResponse } from 'next/server';
import crypto from 'node:crypto';

/**
 * GET /api/auth/nonce
 * Generates an EIP-4361 compliant SIWE (Sign-In with Ethereum) nonce.
 */
export async function GET() {
  const nonce = crypto.randomBytes(16).toString('hex');
  return NextResponse.json({
    nonce,
    issuedAt: new Date().toISOString(),
    expiresAt: new Date(Date.now() + 10 * 60 * 1000).toISOString(), // 10 min
  });
}
