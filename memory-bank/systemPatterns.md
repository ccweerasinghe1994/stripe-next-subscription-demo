# System Patterns: Stripe Integration Architecture

## Core Architecture Patterns

### 1. Server-First Stripe Integration
**Pattern**: Keep Stripe secret operations on server, minimize client-side exposure
```typescript
// ✅ Server Action Pattern
'use server'
import { stripe } from '@/lib/stripe'

// ✅ Dynamic Import Pattern (avoids build-time bundling)
const { stripe } = await import('@/lib/stripe')
```

**Why**: Prevents Stripe secret keys from being bundled client-side, maintains security

### 2. Custom Prisma Output Directory
**Pattern**: Generate Prisma client to custom location for better organization
```prisma
generator client {
  provider = "prisma-client-js"
  output   = "../src/generated/prisma"
}
```

**Why**: Keeps generated files organized, allows for custom import paths

### 3. Webhook Event Processing Pipeline
**Pattern**: Structured webhook handling with proper verification and error handling
```typescript
// 1. Signature Verification
const signature = headers.get('stripe-signature')
const event = stripe.webhooks.constructEvent(body, signature, secret)

// 2. Event Type Routing
switch (event.type) {
  case 'customer.subscription.created':
    // Handle subscription creation
    break
}

// 3. Database Updates with Transactions
await prisma.$transaction([
  // Multiple related updates
])
```

**Why**: Ensures webhook security, reliable event processing, data consistency

### 4. Type-Safe Database Models
**Pattern**: Comprehensive Prisma schema with proper relationships and enums
```prisma
model Subscription {
  id                   String               @id @default(cuid())
  stripeSubscriptionId String               @unique
  status               SubscriptionStatus
  user                 User                 @relation(fields: [userId], references: [id])
}

enum SubscriptionStatus {
  ACTIVE
  CANCELED
  PAST_DUE
  // ... other states
}
```

**Why**: Type safety, proper data relationships, clear subscription state management

## Component Relationships

### Client-Side Flow
```
Page → Checkout Component → Stripe Elements → PaymentElement
  ↓
Server Action (fetchClientSecret) → Stripe API → Session Creation
```

### Server-Side Flow
```
Webhook Endpoint → Signature Verification → Event Processing → Database Update
```

### Data Flow
```
Stripe Dashboard → Webhook → Database → Application State
```

## Critical Implementation Paths

### 1. Payment Flow Path
1. **Client**: User clicks subscribe button
2. **Server**: `fetchClientSecret()` creates Stripe session
3. **Client**: Stripe Elements renders payment form
4. **Stripe**: Processes payment and sends webhook
5. **Server**: Webhook handler updates database
6. **Client**: Redirect to success page

### 2. Error Handling Path
1. **Client**: Payment form shows errors
2. **Server**: Webhook failures trigger retries
3. **Database**: Failed operations rollback properly
4. **User**: Clear error messages with recovery options

### 3. Development Path
1. **Stripe CLI**: Local webhook forwarding
2. **Prisma**: Database migrations and schema updates
3. **Environment**: Proper variable configuration
4. **Testing**: Test cards and webhook simulation

## Key Technical Decisions

### Database Strategy
- **Custom Prisma Output**: Better organization, custom import paths
- **Comprehensive Models**: Full Stripe entity representation
- **Type-Safe Enums**: Subscription and payment status management
- **Proper Relationships**: Foreign keys and constraints

### Security Strategy
- **Server-Only Imports**: Stripe secrets never bundled client-side
- **Webhook Verification**: Proper signature validation
- **Environment Variables**: Secure configuration management
- **Dynamic Imports**: Prevent client-side bundling of server code

### Build Strategy
- **Turbopack**: Fast development builds
- **TypeScript**: Full type safety
- **Custom Prisma Client**: Organized generated code
- **Next.js 15**: Latest App Router patterns

### API Design
- **Server Actions**: Type-safe server operations
- **Webhook Endpoints**: RESTful webhook handling
- **Error Responses**: Consistent error formatting
- **Status Codes**: Proper HTTP response codes

## Integration Patterns

### Stripe Elements Integration
```typescript
// Provider Setup
<Elements stripe={stripePromise} options={options}>
  <CheckoutForm />
</Elements>

// Element Usage
const elements = useElements()
const stripe = useStripe()
```

### Database Integration
```typescript
// Custom Import Path
import { PrismaClient } from '@/generated/prisma'

// Transaction Pattern
await prisma.$transaction(async (tx) => {
  // Multiple operations
})
```

### Environment Integration
```typescript
// Server-side configuration
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!)

// Client-side configuration
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!)
```
