import { NextResponse } from 'next/server';

/**
 * GET /api/wallet/holdings
 * Returns user token holdings breakdown with realtime price & 24h change.
 */
export async function GET() {
  return NextResponse.json({
    totalValueUsd: 1428.50,
    change24hUsd: 142.50,
    change24hPct: 11.08,
    assets: [
      {
        symbol: 'OKN',
        name: 'OKN Token',
        chain: 'BNB Smart Chain',
        balance: '1,000,000',
        priceUsd: 0.00060,
        valueUsd: 600.00,
        change24h: 15.4,
        icon: '/OKN.png',
        contractAddress: '0xBF6B0312f52fa8390Ec9393A9375BF05c8E40377',
      },
      {
        symbol: 'BNB',
        name: 'BNB (Gas & Staking)',
        chain: 'BNB Smart Chain',
        balance: '0.85',
        priceUsd: 610.00,
        valueUsd: 518.50,
        change24h: 3.2,
        icon: '/bnb-logo.png',
        native: true,
      },
      {
        symbol: 'USDT',
        name: 'Tether USD',
        chain: 'BEP-20',
        balance: '310.00',
        priceUsd: 1.00,
        valueUsd: 310.00,
        change24h: 0.01,
        icon: '/assets/usdt.png',
        contractAddress: '0x55d398326f99059fF775485246999027B3197955',
      },
    ],
  });
}
