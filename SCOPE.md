# Email Signature Manager - Project Scope

## Overview

**SignatureHub** is a centralized email signature management platform that allows organizations to create, manage, and deploy consistent email signatures across their entire team. The platform integrates with Google Workspace and Microsoft 365 to automatically push signatures to users' email clients.

---

## Tech Stack

### Frontend
- **Framework**: Next.js 14 (App Router, SSR)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui, Radix UI primitives
- **Icons**: Lucide React
- **Forms**: React Hook Form + Zod validation

### Backend
- **Database**: Supabase (PostgreSQL)
- **Auth**: Supabase Auth (email/password, magic links)
- **Storage**: Supabase Storage (logos, images)
- **ORM**: Drizzle ORM (SQL-first, lightweight)

### Email Rendering
- **MJML**: Converts JSON signature blocks to email-safe HTML
- **Validation**: Built-in HTML validation for email client compatibility

### Integrations
- **Google Workspace**: Gmail API for signature deployment
- **Microsoft 365**: Microsoft Graph API for Outlook signatures
- **Stripe**: Usage-based billing

### Infrastructure
- **Monorepo**: Turborepo with npm workspaces
- **Hosting**: Netlify (alternative: Vercel, Railway)
- **Background Jobs**: Supabase Edge Functions or Netlify Background Functions

---

## Project Structure

```
email-signature-manager/
├── apps/
│   └── web/                          # Next.js 14 application
│       ├── src/
│       │   ├── app/                  # App Router pages
│       │   │   ├── (auth)/           # Auth pages (login, signup, etc.)
│       │   │   ├── (dashboard)/      # Protected dashboard pages
│       │   │   └── auth/callback/    # OAuth callback handler
│       │   ├── components/
│       │   │   ├── ui/               # shadcn/ui components
│       │   │   └── dashboard/        # Dashboard-specific components
│       │   ├── lib/
│       │   │   ├── db/               # Drizzle ORM schema & connection
│       │   │   ├── supabase/         # Supabase client (browser/server/middleware)
│       │   │   ├── signature-renderer/  # MJML-based email HTML renderer
│       │   │   └── rate-limiter/     # API rate limiting for providers
│       │   └── middleware.ts         # Auth middleware
│       ├── drizzle.config.ts
│       ├── tailwind.config.ts
│       └── netlify.toml
├── packages/
│   └── shared/                       # Shared types, schemas, constants
│       └── src/
│           ├── types/                # TypeScript type definitions
│           ├── schemas/              # Zod validation schemas
│           └── constants/            # App constants, rate limits
├── package.json                      # Turborepo workspaces
├── turbo.json                        # Turborepo pipeline config
└── README.md
```

---

## Database Schema

### Core Tables

| Table | Description |
|-------|-------------|
| `organizations` | Company/team accounts |
| `users` | Team members within organizations |
| `signature_templates` | Reusable signature designs (JSON blocks) |
| `signature_assignments` | Links templates to users/departments |
| `signature_deployments` | Deployment history and status |
| `provider_connections` | OAuth tokens for Google/Microsoft |
| `audit_logs` | Security and compliance tracking |
| `job_logs` | Background job status and retries |
| `subscriptions` | Stripe billing information |

### Key Relationships
- Organizations have many users
- Organizations have many templates
- Templates can be assigned to users or departments
- Deployments track which signature was pushed to which user

---

## Features

### Phase 1 - Core (MVP)
- [x] User authentication (email/password, magic links)
- [x] Organization creation on signup
- [x] Protected dashboard with navigation
- [ ] Signature template builder (visual editor)
- [ ] JSON block-based signature storage
- [ ] MJML rendering to email-safe HTML
- [ ] Google Workspace integration
- [ ] Manual signature deployment

### Phase 2 - Team Management
- [ ] User import from Google Directory
- [ ] Department/group management
- [ ] Template assignment rules
- [ ] Bulk deployment

### Phase 3 - Microsoft 365
- [ ] Microsoft Graph API integration
- [ ] Outlook signature deployment
- [ ] Azure AD user sync

### Phase 4 - Advanced
- [ ] Scheduled deployments
- [ ] A/B testing for signatures
- [ ] Analytics (deployment success rates)
- [ ] Stripe billing integration
- [ ] White-label options

---

## Signature Architecture

### JSON Block Storage
Signatures are stored as structured JSON blocks, not raw HTML. This enables:
- Version control and diffing
- Easy template updates
- Consistent rendering across email clients

### Block Types
```typescript
type SignatureBlockType = 
  | 'text'           // Plain text with formatting
  | 'image'          // Logo or photo
  | 'social'         // Social media icons
  | 'divider'        // Horizontal line
  | 'spacer'         // Vertical spacing
  | 'button'         // CTA button
  | 'contact-info'   // Structured contact details
  | 'banner'         // Promotional banner
  | 'disclaimer';    // Legal text
```

### Dynamic Fields
Templates support placeholders that are replaced per-user:
- `{{first_name}}`, `{{last_name}}`
- `{{email}}`, `{{phone}}`
- `{{job_title}}`, `{{department}}`
- `{{company}}`, `{{website}}`

### Rendering Pipeline
1. Load template JSON blocks
2. Replace dynamic fields with user data
3. Convert to MJML markup
4. Render MJML to email-safe HTML
5. Validate HTML for email client compatibility

---

## API Rate Limiting

### Google Workspace
- **Quota**: 250 requests per user per day
- **Strategy**: Token bucket with exponential backoff
- **Batch Size**: 10 users per batch with delays

### Microsoft 365
- **Quota**: 10,000 requests per 10 minutes
- **Strategy**: Token bucket with exponential backoff
- **Batch Size**: 20 users per batch

### Implementation
```typescript
const rateLimiter = new RateLimiter({
  provider: 'google',
  maxTokens: 250,
  refillRate: 250 / (24 * 60 * 60 * 1000), // per day
});

await rateLimiter.acquire(); // Waits if rate limited
```

---

## Authentication Flow

### Supported Methods
1. **Email/Password**: Traditional signup with email confirmation
2. **Magic Links**: Passwordless login via email
3. **OAuth** (future): Google/Microsoft SSO

### Routes
| Route | Description |
|-------|-------------|
| `/login` | Email/password + magic link login |
| `/signup` | New account + organization creation |
| `/forgot-password` | Request password reset email |
| `/reset-password` | Set new password (from email link) |
| `/auth/callback` | Handles OAuth/magic link redirects |

### Protected Routes
All `/dashboard/*` routes require authentication. Unauthenticated users are redirected to `/login`.

---

## Environment Variables

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://[project].supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...

# Database (direct connection for migrations)
DATABASE_URL=postgresql://postgres:[password]@db.[project].supabase.co:5432/postgres

# Stripe
STRIPE_SECRET_KEY=sk_...
STRIPE_WEBHOOK_SECRET=whsec_...
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_...

# Google Workspace
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=

# Microsoft 365
MICROSOFT_CLIENT_ID=
MICROSOFT_CLIENT_SECRET=
MICROSOFT_TENANT_ID=

# App
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

---

## Audit & Compliance

### Audit Log Events
- `signature.created` - New template created
- `signature.updated` - Template modified
- `signature.deleted` - Template removed
- `deployment.started` - Deployment initiated
- `deployment.completed` - Deployment finished
- `deployment.failed` - Deployment error
- `user.invited` - Team member invited
- `user.removed` - Team member removed
- `settings.changed` - Organization settings modified

### Data Retention
- Audit logs: 2 years
- Deployment history: 1 year
- Deleted templates: 30 days (soft delete)

---

## Job Processing

### Background Jobs
| Job Type | Description | Retry Strategy |
|----------|-------------|----------------|
| `deploy_signature` | Push signature to user | 3 retries, exponential backoff |
| `sync_users` | Import users from directory | 3 retries |
| `refresh_tokens` | Refresh OAuth tokens | 5 retries |

### Job States
- `pending` - Queued for processing
- `running` - Currently executing
- `completed` - Successfully finished
- `failed` - All retries exhausted
- `cancelled` - Manually stopped

---

## Subscription Tiers

| Tier | Users | Templates | Features |
|------|-------|-----------|----------|
| **Free** | 5 | 1 | Basic editor, manual deploy |
| **Starter** | 25 | 5 | Google Workspace, scheduling |
| **Professional** | 100 | Unlimited | + Microsoft 365, analytics |
| **Enterprise** | Unlimited | Unlimited | + SSO, API access, SLA |

---

## Development Commands

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Database commands
npm run db:push      # Push schema to database
npm run db:generate  # Generate migrations
npm run db:studio    # Open Drizzle Studio

# Build for production
npm run build

# Type checking
npm run type-check

# Linting
npm run lint
```

---

## Current Progress

### Completed ✓
- [x] Monorepo structure with Turborepo
- [x] Next.js 14 app with TypeScript
- [x] Tailwind CSS + shadcn/ui setup
- [x] Supabase integration (auth, database)
- [x] Drizzle ORM schema (all tables)
- [x] MJML signature renderer
- [x] Rate limiter for API calls
- [x] Authentication pages (login, signup, forgot/reset password)
- [x] Auth callback handler
- [x] Protected dashboard layout
- [x] Dashboard navigation sidebar
- [x] GitHub repository setup

### Next Steps
- [ ] Signature template editor (visual builder)
- [ ] Google Workspace OAuth integration
- [ ] User management page
- [ ] Deployment workflow
- [ ] Settings page

---

## Repository

**GitHub**: https://github.com/kcooper81/email-signature-manager

---

## Architecture Decisions

### Why Next.js over React Native?
- **Web-first product**: Admins manage signatures from desktop browsers
- **SSR benefits**: Better SEO, faster initial load
- **API routes**: Built-in backend without separate server
- **No mobile app needed**: End users don't interact with the platform

### Why Drizzle over Prisma?
- **Lighter weight**: Smaller bundle size
- **SQL-first**: More control over queries
- **Type-safe**: Full TypeScript support
- **Supabase compatible**: Works well with Postgres

### Why MJML for signatures?
- **Email-safe HTML**: Handles quirks of email clients
- **Responsive**: Works on mobile and desktop
- **Maintainable**: Cleaner than raw HTML tables
- **Validated**: Built-in compatibility checking

### Why JSON blocks over raw HTML?
- **Structured data**: Easy to update and version
- **Dynamic fields**: Simple placeholder replacement
- **Validation**: Can enforce brand guidelines
- **Portability**: Render to different formats if needed
