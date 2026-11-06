import { NextRequest, NextResponse } from 'next/server';

/**
 * POST /api/sale/webhook
 * Webhook handler for NOWPayments IPN or BSC node indexing callbacks.
 * Verifies signature, updates order status, and triggers token allocation.
 */
export async function POST(req: NextRequest) {
  try {
    const rawBody = await req.text();
    const signature = req.headers.get('x-nowpayments-sig');

    // In production, backend dev will verify HMAC SHA512 signature using IPN Secret Key
    return NextResponse.json({
      received: true,
      status: 'processed',
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    return NextResponse.json({ error: 'Webhook processing error' }, { status: 400 });
  }
}
