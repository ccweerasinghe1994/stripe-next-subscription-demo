# Quick Setup Guide

## Prerequisites
- Node.js 18+ 
- PostgreSQL database
- Stripe account (test mode)

## 1. Environment Setup

Create `.env.local`:
```bash
# Stripe
STRIPE_PUBLISHABLE_KEY=pk_test_your_publishable_key
STRIPE_SECRET_KEY=sk_test_your_secret_key
STRIPE_WEBHOOK_SECRET=whsec_your_webhook_secret
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_your_publishable_key

# Database
DATABASE_URL="postgresql://username:password@localhost:5432/stripe_demo"
```

## 2. Installation

```bash
# Install dependencies
pnpm install

# Setup database
npx prisma migrate dev --name init
npx prisma generate
```

## 3. Stripe Configuration

1. **Dashboard Setup**:
   - Get API keys from https://dashboard.stripe.com/apikeys
   - Create a product with a price in test mode

2. **Update Price ID**:
   - Copy the price ID from your Stripe dashboard  
   - Update `src/app/actions/stripe.ts` line 16:
   ```typescript
   price: 'price_your_actual_price_id', // Replace this
   ```

3. **Webhook Setup**:
   ```bash
   # Install Stripe CLI
   stripe listen --forward-to localhost:3000/api/webhooks/stripe
   ```

## 4. Run Development Server

```bash
pnpm dev
```

## 5. Test the Integration

1. Open http://localhost:3000
2. Click on checkout
3. Use test card: `4242424242424242`
4. Complete payment flow

## Troubleshooting

- **Database errors**: Run `npx prisma migrate reset` then `npx prisma migrate dev`
- **Stripe errors**: Check your API keys and webhook secret
- **Build errors**: Ensure all environment variables are set

## Production Deployment

1. Set production environment variables
2. Update Stripe webhook endpoint to your domain
3. Use live Stripe keys (remove test mode)
4. Deploy to Vercel or similar platform
