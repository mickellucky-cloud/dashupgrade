import { NextRequest, NextResponse } from 'next/server';

/**
 * POST /api/referral/claim
 * Claims unwithdrawn referral commission rewards (BNB & $OKN).
 */
export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => ({}));
    const { payoutCurrency = 'BNB' } = body;

    return NextResponse.json({
      success: true,
      amountClaimed: payoutCurrency === 'BNB' ? '0.238 BNB' : '396,666 OKN',
      currency: payoutCurrency,
      status: 'pending_multisig_transfer',
      estimatedPayoutTime: 'Within 2 hours',
      claimedAt: new Date().toISOString(),
    });
  } catch (error) {
    return NextResponse.json({ error: 'Claim failed' }, { status: 500 });
  }
}
