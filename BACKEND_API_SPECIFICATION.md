# OKN User Dashboard — Backend API Specification & Integration Guide

Welcome backend developer! This document specifies all API endpoints required by the **OKN User Dashboard**, including authentication, portfolio data, presale transactions, referral tracking, task rewards, and webhooks.

Every endpoint below is stubbed with realistic mock responses in `src/app/api/` so the frontend is 100% testable out of the box, and ready to connect to your production database (PostgreSQL, Supabase, Redis, BSC RPC nodes, etc.).

---

## 1. Authentication & Sessions

### `GET /api/auth/nonce`
- **Purpose**: Generates an EIP-4361 compliant SIWE (Sign-In with Ethereum) nonce.
- **Response**:
```json
{
  "nonce": "c4b189a0f44e78d2b99147ef3a90",
  "issuedAt": "2026-11-05T22:30:00.000Z",
  "expiresAt": "2026-11-05T22:40:00.000Z"
}
```

### `POST /api/auth/verify`
- **Purpose**: Verifies signed message (EIP-191 / EIP-4361) or Telegram WebApp `initData`.
- **Request Body**:
```json
{
  "address": "0xBF6B0312f52fa8390Ec9393A9375BF05c8E40377",
  "signature": "0x123456789...",
  "message": "Sign in to OKN Dashboard...",
  "initData": "query_id=...&user=..."
}
```
- **Response**:
```json
{
  "success": true,
  "token": "jwt_token_here",
  "user": {
    "id": "uuid",
    "walletAddress": "0x...",
    "displayName": "0xBF6B...0377",
    "points": 135,
    "streakDays": 6
  }
}
```

### `GET /api/me`
- **Purpose**: Returns the authenticated user profile, points, streak, and wallet address.

### `POST /api/auth/logout`
- **Purpose**: Clears cookies (`okn_session`, `token`) and terminates session.

---

## 2. Portfolio & Assets

### `GET /api/portfolio`
- **Purpose**: Aggregates total balance, 24h gain, streak, and active holdings.

### `GET /api/wallet/holdings`
- **Purpose**: Returns granular breakdown of user token balances on BNB Smart Chain.
- **Response**:
```json
{
  "totalValueUsd": 1428.50,
  "change24hUsd": 142.50,
  "change24hPct": 11.08,
  "assets": [
    {
      "symbol": "OKN",
      "name": "OKN Token",
      "chain": "BNB Smart Chain",
      "balance": "1,000,000",
      "priceUsd": 0.00060,
      "valueUsd": 600.00,
      "change24h": 15.4,
      "icon": "/OKN.png"
    },
    {
      "symbol": "BNB",
      "name": "BNB (Gas & Staking)",
      "chain": "BNB Smart Chain",
      "balance": "0.85",
      "priceUsd": 610.00,
      "valueUsd": 518.50,
      "change24h": 3.2,
      "icon": "/bnb-logo.png"
    }
  ]
}
```

### `GET /api/wallet/transactions`
- **Purpose**: Paginated list of purchases, claims, and rewards.

---

## 3. Presale & Token Purchase Gateways

### `GET /api/sale/price`
- **Purpose**: Returns current presale stage, token rate, raised amount, and target goal.
- **Response**:
```json
{
  "stage": 2,
  "rate": "1 BNB = 1,000,000 OKN",
  "tokenPriceUsd": 0.00060,
  "raisedUsd": 412800,
  "goalUsd": 600000,
  "percentageSold": 68.4
}
```

### `POST /api/sale/deposit` (Primary Gateway: Multi-Crypto Direct Deposit)
- **Request Body**:
```json
{
  "payCurrency": "usdtbsc",
  "priceAmount": 100,
  "userWallet": "0xBF6B0312f52fa8390Ec9393A9375BF05c8E40377"
}
```
- **Response**:
```json
{
  "success": true,
  "paymentId": "dep_179391512",
  "payCurrency": "USDTBSC",
  "payAmount": 100,
  "payAddress": "0x46fC09a84C23c94Ea6853450253C050be44dB751",
  "qrCodeUrl": "https://api.qrserver.com/...",
  "estimatedOknTokens": 166666,
  "expiresAt": "2026-11-05T23:30:00Z"
}
```

### `POST /api/sale/contribute` (Secondary Gateway: Direct Web3 BNB)
- **Purpose**: Registers on-chain contribution after user confirms MetaMask/TrustWallet transaction.
- **Request Body**:
```json
{
  "txHash": "0x3a4b...",
  "walletAddress": "0x...",
  "bnbAmount": "1.0",
  "oknAmount": "1000000",
  "referralCode": "REF_1482"
}
```

### `POST /api/sale/webhook` (IPN / Payment Callback)
- **Purpose**: Handles instant IPN notifications from payment gateway or BSC indexing worker.

---

## 4. Tasks & Daily Rewards

### `GET /api/tasks`
- **Purpose**: Lists all daily, social, and on-chain tasks with status (`pending`, `completed`, `claimed`).

### `POST /api/tasks/verify`
- **Request Body**: `{ "taskId": "task-1" }`

### `POST /api/tasks/claim`
- **Request Body**: `{ "taskId": "task-1" }`
- **Response**: `{ "success": true, "pointsAwarded": 50, "newTotalPoints": 185 }`

### `POST /api/rewards/check-in`
- **Purpose**: Submits daily check-in to preserve streak. Returns updated streak count and bonus points.

---

## 5. Referral Program

### `GET /api/referral`
- **Purpose**: Returns user's referral code, link, invited count, total USD earned, BNB earned, and partner tiers.

### `POST /api/referral/claim`
- **Purpose**: Requests payout of unwithdrawn referral commission.
- **Request Body**: `{ "payoutCurrency": "BNB" }`

---

## 6. Leaderboard & Notifications

### `GET /api/leaderboard`
- **Purpose**: Returns top rankings with tier badges, points, and invite counts.

### `GET /api/notifications`
- **Purpose**: Fetches real-time alerts.

### `POST /api/notifications/mark-read`
- **Request Body**: `{ "notificationId": "notif-1" }` (or empty to mark all as read).
