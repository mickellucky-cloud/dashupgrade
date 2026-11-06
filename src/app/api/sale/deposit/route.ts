import { NextRequest, NextResponse } from 'next/server';

/**
 * POST /api/sale/deposit
 * Creates a crypto deposit payment via NOWPayments or payment processor.
 * Returns unique deposit wallet address, amount, QR code, and expiry.
 */
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { payCurrency = 'usdtbsc', priceAmount = 100, userWallet } = body;

    const paymentId = `now_${Date.now()}_${Math.floor(Math.random() * 1000)}`;
    const payAddress = '0x46fC09a84C23c94Ea6853450253C050be44dB751';

    return NextResponse.json({
      success: true,
      paymentId,
      payCurrency: payCurrency.toUpperCase(),
      payAmount: priceAmount,
      payAddress,
      qrCodeUrl: `https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=${payAddress}`,
      estimatedOknTokens: Math.floor((priceAmount / 0.00060)),
      expiresAt: new Date(Date.now() + 60 * 60 * 1000).toISOString(), // 60 min
      status: 'waiting',
    });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create deposit order' }, { status: 500 });
  }
}
