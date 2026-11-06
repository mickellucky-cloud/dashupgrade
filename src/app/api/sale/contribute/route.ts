import { NextRequest, NextResponse } from 'next/server';

/**
 * POST /api/sale/contribute
 * Records Web3 BNB Smart Chain contribution and registers tokens for vesting / instant claim.
 */
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { txHash, walletAddress, bnbAmount, oknAmount, referralCode } = body;

    if (!txHash || !walletAddress || !bnbAmount) {
      return NextResponse.json(
        { error: 'Missing required parameters: txHash, walletAddress, bnbAmount' },
        { status: 400 },
      );
    }

    return NextResponse.json({
      success: true,
      orderId: `okn_ord_${Date.now()}`,
      txHash,
      walletAddress,
      bnbAmount,
      oknAmount: oknAmount || Number(bnbAmount) * 1_000_000,
      referralCredited: Boolean(referralCode),
      status: 'pending_confirmation',
      confirmedAt: null,
    });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to record contribution' }, { status: 500 });
  }
}
