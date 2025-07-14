# Technical Context: Development Environment & Dependencies

## Core Technology Stack

### Framework & Runtime
- **Next.js 15.3.5**: Latest version with App Router
- **React 19**: Latest React with concurrent features
- **TypeScript 5.8.3**: Full type safety throughout application
- **Node.js 18+**: Runtime requirement

### Payment Processing
- **Stripe 18.3.0**: Server-side Stripe API client
- **@stripe/react-stripe-js 3.7.0**: React components for Stripe Elements
- **@stripe/stripe-js 7.4.0**: Client-side Stripe.js library

### Database & ORM
- **Prisma ORM 6.11.1**: Database toolkit with type-safe client
- **@prisma/client 6.11.1**: Generated database client
- **@prisma/extension-accelerate 2.0.2**: Performance extensions
- **PostgreSQL**: Primary database (via connection string)

### Development Tools
- **Turbopack**: Next.js fast bundler for development
- **ESLint 9**: Code linting with Next.js configuration
- **Tailwind CSS 4**: Utility-first CSS framework
- **tsx 4.20.3**: TypeScript execution for scripts

## Development Setup Requirements

### Environment Variables
```bash
# Stripe Configuration (Required)
STRIPE_PUBLISHABLE_KEY=pk_test_...         # Stripe public key
STRIPE_SECRET_KEY=sk_test_...              # Stripe secret key  
STRIPE_WEBHOOK_SECRET=whsec_...            # Webhook endpoint secret
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_... # Client-side public key

# Database (Required)
DATABASE_URL=postgresql://...              # PostgreSQL connection string

# Development (Optional)
NEXT_PUBLIC_APP_URL=http://localhost:3000  # Application URL for redirects
```

### Prerequisites
1. **Node.js 18+**: Required for Next.js 15
2. **PostgreSQL Database**: Local or cloud instance
3. **Stripe Account**: Test mode for development
4. **pnpm**: Package manager (configured in project)

### Local Development Tools
- **Stripe CLI**: For webhook forwarding and testing
- **Prisma Studio**: Database GUI for development
- **VS Code**: Recommended with TypeScript extensions

## Technical Constraints

### Build Constraints
- **Server-Only Imports**: Stripe secret operations must use 'server-only'
- **Dynamic Imports**: Server-side Stripe code requires dynamic imports
- **Custom Prisma Output**: Generated client in custom directory
- **Environment Variables**: Must be properly configured for each environment

### Security Constraints
- **Webhook Verification**: All webhook endpoints must verify signatures
- **API Key Management**: Secret keys never exposed client-side
- **Environment Separation**: Clear separation between test/production
- **HTTPS Required**: Production webhooks require HTTPS endpoints

### Database Constraints
- **Migration Management**: Prisma migrations for schema changes
- **Connection Pooling**: Required for production deployments
- **Data Relationships**: Proper foreign keys and constraints
- **Type Safety**: All database operations must be type-safe

## Dependency Management

### Package Manager
- **pnpm**: Faster, more efficient than npm
- **Lock File**: `pnpm-lock.yaml` for reproducible builds
- **Scripts**: Custom scripts for development workflow

### Key Package Scripts
```json
{
  "dev": "next dev --turbopack",           // Development with Turbopack
  "build": "next build",                   // Production build
  "db:reset": "npx prisma migrate reset",  // Reset database
  "db:studio": "npx prisma studio",        // Open database GUI
  "stripe:listen": "stripe listen --forward-to localhost:3000/api/webhooks/stripe"
}
```

### Development Dependencies
- **@types/node**: Node.js type definitions
- **@types/react**: React type definitions
- **@types/react-dom**: React DOM type definitions
- **eslint-config-next**: Next.js ESLint configuration

## Tool Usage Patterns

### Prisma Workflow
```bash
# Schema changes
npx prisma migrate dev --name description   # Create and apply migration
npx prisma generate                         # Regenerate client
npx prisma studio                          # Open database GUI
npx prisma migrate reset                   # Reset for development
```

### Stripe Development
```bash
# Local webhook testing
stripe listen --forward-to localhost:3000/api/webhooks/stripe

# Test with Stripe CLI
stripe trigger payment_intent.succeeded
```

### Next.js Development
```bash
# Development server
pnpm dev                    # Starts with Turbopack

# Production testing
pnpm build                  # Build for production
pnpm start                  # Start production server
```

## Deployment Configuration

### Vercel Deployment
- **Framework**: Next.js (auto-detected)
- **Build Command**: `pnpm build`
- **Environment Variables**: Configure in Vercel dashboard
- **Webhook URLs**: Use production domain for Stripe webhooks

### Database Deployment
- **Connection Pooling**: Required for serverless environments
- **Migration Strategy**: Run migrations before deployment
- **Environment Variables**: Secure database URL configuration

### Stripe Configuration
- **Live Keys**: Switch to live keys for production
- **Webhook Endpoints**: Update to production URLs
- **Test vs Live**: Clear separation of environments

## Performance Considerations

### Build Optimization
- **Turbopack**: Faster development builds
- **Dynamic Imports**: Prevent unnecessary client bundling
- **Tree Shaking**: Automatic with Next.js
- **Code Splitting**: Automatic route-based splitting

### Database Optimization
- **Prisma Accelerate**: Query caching and connection pooling
- **Index Strategy**: Proper indexing on foreign keys
- **Query Optimization**: Efficient database queries
- **Connection Management**: Proper connection pooling
