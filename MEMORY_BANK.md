# Stripe Integration Memory Bank
*Updated: July 13, 2025*

## Project Overview

This Next.js application demonstrates a complete Stripe subscription integration with embedded payment forms, webhook handling, and database persistence using Prisma ORM.

### Current Branch: `stripe-documentation-flow`

## Tech Stack

- **Framework**: Next.js 15.3.5 with App Router
- **Runtime**: React 19 + TypeScript 5.8.3
- **Database**: PostgreSQL with Prisma ORM 6.11.1
- **Payments**: Stripe 18.3.0 with React Stripe.js 3.7.0
- **Deployment**: Vercel (configured)

## Project Structure

```
├── prisma/
│   ├── schema.prisma              # Database schema with Stripe models
│   └── migrations/                # Database migration files
├── src/
│   ├── app/
│   │   ├── actions/
│   │   │   └── stripe.ts          # Server actions for Stripe operations
│   │   ├── api/
│   │   │   └── webhooks/
│   │   │       └── stripe/
│   │   │           └── route.ts   # Stripe webhook endpoint
│   │   ├── components/
│   │   │   └── checkout.tsx       # Payment form component
│   │   ├── return/
│   │   │   └── page.tsx          # Post-payment return page
│   │   ├── layout.tsx            # Root layout
│   │   └── page.tsx              # Home page
│   ├── generated/
│   │   └── prisma/               # Generated Prisma client (custom output)
│   └── lib/
│       ├── prisma.ts             # Prisma client instance
│       └── stripe.ts             # Stripe client configuration
```

## Database Schema

### Models

1. **User** - Customer information and Stripe customer mapping
2. **Subscription** - Stripe subscription management with status tracking
3. **Product** - Stripe product catalog
4. **Price** - Pricing configurations (one-time/recurring)
5. **Payment** - Individual payment tracking

### Enums
- `SubscriptionStatus`: Comprehensive subscription states
- `PaymentStatus`: Payment intent states
- `PriceType`: ONE_TIME | RECURRING
- `PriceInterval`: DAY | WEEK | MONTH | YEAR

## Environment Variables Required

```bash
# Stripe Configuration
STRIPE_PUBLISHABLE_KEY=pk_test_...
STRIPE_SECRET_KEY=sk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...

# Database
DATABASE_URL=postgresql://...

# Next.js
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=$STRIPE_PUBLISHABLE_KEY
```

## Key Features Implemented

### ✅ Completed Features

1. **Embedded Checkout Forms**
   - PaymentElement integration
   - Elements provider setup
   - Error handling and loading states

2. **Subscription Management**
   - Checkout session creation
   - Subscription status tracking
   - Customer management

3. **Webhook Infrastructure**
   - Signature verification
   - Event processing for:
     - `payment_intent.succeeded`
     - `customer.subscription.created`
     - `customer.subscription.updated`
     - `customer.subscription.deleted`
     - `invoice.payment_succeeded`
     - `invoice.payment_failed`

4. **Database Integration**
   - Complete Prisma schema with relationships
   - Type-safe database operations
   - Migration system configured

5. **Build Configuration**
   - Server-only imports properly configured
   - Dynamic Stripe imports to avoid build issues
   - Custom Prisma client output directory

### 🔄 In Progress

1. **Documentation Flow** (Current Branch)
   - Comprehensive setup documentation
   - Troubleshooting guides
   - API reference

## Setup Instructions

### 1. Database Setup
```bash
# Install dependencies
pnpm install

# Reset and migrate database
npx prisma migrate reset --force
npx prisma migrate dev --name initial_setup

# Generate Prisma client
npx prisma generate
```

### 2. Stripe Configuration
1. Create Stripe account and get API keys
2. Set up webhook endpoint: `/api/webhooks/stripe`
3. Configure webhook events (see webhook handler for required events)
4. Update environment variables

### 3. Development
```bash
# Start development server
pnpm dev

# Open Prisma Studio (optional)
npx prisma studio
```

## API Endpoints

### `/api/webhooks/stripe` (POST)
- **Purpose**: Handle Stripe webhook events
- **Security**: Signature verification required
- **Events**: Payment, subscription, and invoice events
- **Database**: Updates subscription and payment records

### Server Actions

#### `fetchClientSecret()`
- **File**: `src/app/actions/stripe.ts`
- **Purpose**: Create Stripe checkout session
- **Mode**: Subscription
- **Returns**: Client secret for embedded checkout

## Testing

### Test Cards (Stripe Test Mode)
- **Success**: `4242424242424242`
- **Declined**: `4000000000000002`
- **3D Secure**: `4000002500003155`

### Webhook Testing
```bash
# Install Stripe CLI
stripe listen --forward-to localhost:3000/api/webhooks/stripe
```

## Common Issues & Solutions

### Database Tables Not Found
**Error**: `table 'public.users' does not exist`
**Solution**: Run Prisma migrations
```bash
npx prisma migrate dev
```

### Stripe Build Errors
**Error**: Dynamic imports failing
**Solution**: Use `import()` for server-side Stripe operations
```typescript
const { stripe } = await import('../../lib/stripe')
```

### Custom Prisma Output Directory
**Current Setup**: Generated client in `src/generated/prisma`
**Import Path**: `import { PrismaClient } from '@generated/prisma'`

## Recent Changes

### Database Schema Migration (2025-01-13)
- Added comprehensive Stripe integration models
- Implemented proper relationships and constraints
- Added enums for type safety

### Build Fixes
- Resolved server-only import issues
- Fixed dynamic import patterns for Stripe
- Configured custom Prisma client generation

## Next Steps

1. **Product Catalog Management**
   - Admin interface for products/prices
   - Stripe product sync

2. **Customer Portal**
   - Subscription management
   - Billing history
   - Payment method updates

3. **Advanced Features**
   - Prorations and upgrades
   - Multiple payment methods
   - Invoice customization

## Debugging Commands

```bash
# Check database connection
npx prisma studio

# View migration status
npx prisma migrate status

# Reset database (⚠️ Development only)
npx prisma migrate reset

# Generate types
npx prisma generate

# Check Stripe webhook logs
stripe listen --print-json
```

## Performance Considerations

- **Database**: Indexed foreign keys and unique constraints
- **Stripe API**: Proper error handling and retries
- **Next.js**: Server-side rendering optimized
- **Build**: Dynamic imports prevent client-side bundling issues

---

*This memory bank is maintained on the `stripe-documentation-flow` branch for iterative improvements.*
