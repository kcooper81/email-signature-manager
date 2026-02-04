# Tech Stack Documentation

## Project Overview
Email Signature Manager (Siggly) - A SaaS platform for managing email signatures across Google Workspace organizations.

## Architecture
- **Monorepo Structure**: Turborepo-based monorepo
- **Deployment**: Vercel (Next.js hosting)
- **Database**: Supabase (PostgreSQL)
- **Authentication**: Supabase Auth

## Frontend

### Framework & Build Tools
- **Next.js 14.1.0** - React framework with App Router
- **React 18** - UI library
- **TypeScript** - Type safety
- **Tailwind CSS** - Utility-first CSS framework
- **PostCSS** - CSS processing

### UI Components & Libraries
- **shadcn/ui** - Component library (built on Radix UI)
- **Radix UI** - Headless UI primitives
- **Lucide React** - Icon library
- **Recharts** - Chart library for analytics

### State Management & Data Fetching
- **React Hooks** - Built-in state management
- **Supabase Client** - Real-time data fetching

## Backend

### Database & Authentication
- **Supabase**
  - PostgreSQL database
  - Row Level Security (RLS)
  - Real-time subscriptions
  - Authentication (email/password, OAuth)
  - Storage for images/assets

### API Routes
- **Next.js API Routes** - Serverless functions
- **Vercel Edge Functions** - For performance-critical endpoints

### External Integrations
- **Google Workspace API** - Gmail signature management
- **Stripe** - Payment processing and subscription management
- **HubSpot** (optional) - CRM integration

## Database Schema

### Core Tables
- `users` - User profiles and preferences
- `organizations` - Company/organization data
- `templates` - Email signature templates
- `deployments` - Signature deployment tracking
- `signature_deployments` - Individual user deployments

### User Preferences Columns
- `email_notifications` - Email notification toggle
- `deployment_alerts` - Deployment alert toggle
- `weekly_digest` - Weekly digest toggle

## File Structure

```
/
├── apps/
│   └── web/                    # Main Next.js application
│       ├── src/
│       │   ├── app/           # App Router pages
│       │   │   ├── (dashboard)/  # Dashboard routes (authenticated)
│       │   │   ├── (marketing)/  # Marketing pages (public)
│       │   │   └── api/          # API routes
│       │   ├── components/
│       │   │   ├── ui/           # shadcn/ui components
│       │   │   ├── dashboard/    # Dashboard-specific components
│       │   │   └── marketing/    # Marketing components
│       │   └── lib/
│       │       ├── supabase/     # Supabase client setup
│       │       └── utils.ts      # Utility functions
│       ├── public/            # Static assets
│       └── supabase/
│           └── migrations/    # Database migrations
└── packages/
    └── shared/                # Shared utilities/types
```

## Environment Variables

### Required
- `NEXT_PUBLIC_SUPABASE_URL` - Supabase project URL
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` - Supabase anonymous key
- `SUPABASE_SERVICE_ROLE_KEY` - Supabase service role key (server-side)
- `STRIPE_SECRET_KEY` - Stripe secret key
- `STRIPE_WEBHOOK_SECRET` - Stripe webhook signing secret
- `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` - Stripe publishable key

### Optional
- `GOOGLE_CLIENT_ID` - Google OAuth client ID
- `GOOGLE_CLIENT_SECRET` - Google OAuth client secret
- `HUBSPOT_API_KEY` - HubSpot API key

## Development Tools

### Code Quality
- **ESLint** - Linting
- **TypeScript** - Type checking
- **Prettier** (implied) - Code formatting

### Package Management
- **npm** - Package manager
- **Turborepo** - Monorepo build system

## Deployment

### Hosting
- **Vercel** - Primary hosting platform
  - Automatic deployments from Git
  - Preview deployments for PRs
  - Edge network CDN
  - Serverless functions

### Database
- **Supabase Cloud** - Managed PostgreSQL
  - Automatic backups
  - Connection pooling
  - Real-time capabilities

### CI/CD
- **Vercel Git Integration** - Automatic deployments
- **GitHub** - Version control

## Key Features Implementation

### Authentication Flow
1. User signs up/logs in via Supabase Auth
2. Session managed via cookies
3. Protected routes check auth state
4. RLS policies enforce data access

### Signature Deployment
1. User creates template in visual editor
2. Template stored in Supabase
3. Deployment triggers Google Workspace API calls
4. Status tracked in `deployments` table

### Billing Integration
1. Stripe Checkout for subscriptions
2. Webhook handles payment events
3. Subscription status stored in Supabase
4. Usage limits enforced based on plan

## Security

### Authentication
- Supabase Auth with secure session management
- Row Level Security (RLS) on all tables
- API routes validate authentication

### Data Protection
- HTTPS everywhere
- Environment variables for secrets
- Secure cookie handling
- CORS configuration

## Performance Optimizations

### Frontend
- Next.js App Router with streaming
- Image optimization via Next.js Image
- Code splitting and lazy loading
- Tailwind CSS purging

### Backend
- Edge functions for low latency
- Database connection pooling
- Efficient queries with indexes
- Caching strategies

## Monitoring & Analytics

### Application Monitoring
- Vercel Analytics (built-in)
- Error tracking (to be implemented)

### User Analytics
- Custom analytics dashboard
- Deployment tracking
- Usage metrics

## Future Considerations

### Planned Integrations
- Microsoft 365 support
- Outlook signature management
- Additional CRM integrations

### Scaling
- Database read replicas
- CDN for static assets
- Redis for caching (if needed)
