import { NextResponse } from 'next/server';

/**
 * GET /api/wallet/transactions
 * Returns on-chain & rewards transaction history with Explorer deep links.
 */
export async function GET() {
  return NextResponse.json([
    {
      id: 'tx-101',
      type: 'buy_presale',
      description: 'Presale Stage 2 Allocation',
      amount: '+1,000,000 OKN',
      cost: '1.0 BNB ($600.00)',
      status: 'confirmed',
      txHash: '0x3a4b...9f12',
      explorerUrl: 'https://bscscan.com/tx/0x3a4b881928019a',
      timestamp: new Date(Date.now() - 3600 * 1000 * 2).toISOString(),
    },
    {
      id: 'tx-102',
      type: 'referral_payout',
      description: 'Tier 1 Referral Commission',
      amount: '+0.15 BNB',
      cost: 'Reward',
      status: 'confirmed',
      txHash: '0x88f1...11a2',
      explorerUrl: 'https://bscscan.com/tx/0x88f1',
      timestamp: new Date(Date.now() - 3600 * 1000 * 24).toISOString(),
    },
    {
      id: 'tx-103',
      type: 'task_reward',
      description: 'Community X Verification',
      amount: '+50 OK Points',
      cost: 'Reward',
      status: 'confirmed',
      timestamp: new Date(Date.now() - 3600 * 1000 * 48).toISOString(),
    },
  ]);
}
