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

## Integration Roadmap

### Current Integrations (Live)

| Integration | Status | Purpose | Technical Details |
|-------------|--------|---------|-------------------|
| **Google Workspace** | ✅ Live | Gmail signature deployment, user sync | Gmail API, Google Directory API, OAuth 2.0 |
| **Microsoft 365** | ✅ Live | Outlook signature deployment, user sync | Microsoft Graph API, Azure AD sync, OAuth 2.0 |
| **HubSpot CRM** | ✅ Live | Contact data sync for signature enrichment | HubSpot CRM API, OAuth 2.0, contact import |
| **Calendly** | ✅ Live | Meeting scheduling links in signatures | Calendly API, OAuth 2.0, dynamic link insertion |
| **Stripe** | ✅ Live | Subscription billing and payments | Stripe Checkout, Customer Portal, Webhooks |

---

### Competitor Integration Analysis

**What Exclaimer Has:**
- ✅ Google Workspace
- ✅ Microsoft 365
- ✅ Salesforce (full CRM integration with account/contact/opportunity targeting)
- ✅ HubSpot (contact, company, deal-based lists)
- ✅ Calendly (meeting scheduling links)
- ✅ Microsoft Bookings
- ✅ Chili Piper
- ✅ Salesloft (sales automation)
- ✅ Outreach (sales automation)
- ✅ Facebook (social media)
- ✅ LinkedIn (social media)
- ✅ Customer Thermometer (feedback)
- ✅ Okta Universal Directory
- ✅ Azure AD (Entra ID)

**What CodeTwo Has:**
- ✅ Microsoft 365 (primary focus)
- ✅ Microsoft Exchange
- ✅ Microsoft Teams (direct meeting links)
- ✅ Microsoft Bookings
- ✅ Google Analytics (tracking)
- ✅ Matomo/Piwik (analytics)
- ✅ Woopra (analytics)
- ⚠️ Limited CRM support (requires Outlook add-ins)

**What WiseStamp Has:**
- ✅ Gmail/Google Workspace
- ✅ Outlook
- ✅ HubSpot (basic)
- ✅ Salesforce (basic)
- ⚠️ More individual-focused, fewer enterprise integrations

---

### Integration Priority Tiers

#### 🔥 **Tier 1: High Priority (Quick Wins)**
*Easy to implement, high customer demand, competitive necessity*

| Integration | Effort | Impact | Why It Matters | Technical Approach |
|-------------|--------|--------|----------------|-------------------|
| **Zapier** | Medium | 🔥 Huge | Gives access to 5,000+ apps instantly. Marketing gold: "Connect to anything" | Zapier Platform, webhooks, triggers/actions |
| ~~**Calendly**~~ | ✅ Complete | High | Every competitor has this. Users expect meeting links in signatures | Calendly API, OAuth, dynamic link insertion |
| **Google Analytics** | Easy | Medium | Click tracking for signature links. Prove ROI to marketing teams | UTM parameters, GA4 Measurement Protocol |
| **Microsoft Bookings** | Easy | Medium | Natural fit for Microsoft 365 customers | Graph API, booking page links |

**Estimated Timeline:** 1-3 weeks for remaining Tier 1

---

#### 🎯 **Tier 2: Strategic (Competitive Parity)**
*Harder to build, but necessary to compete with Exclaimer*

| Integration | Effort | Impact | Why It Matters | Technical Approach |
|-------------|--------|--------|----------------|-------------------|
| **Salesforce** | Hard | High | Enterprise customers expect this. Exclaimer's killer feature | Salesforce REST API, OAuth, SOQL queries, custom fields |
| **LinkedIn** | Medium | Medium | Social profile enrichment, auto-populate LinkedIn URLs | LinkedIn API (limited), or manual URL builder |
| **Microsoft Teams** | Medium | Medium | Direct meeting links for Microsoft 365 users | Graph API, Teams meeting creation |
| **Okta** | Medium | Low | Enterprise SSO/directory sync | Okta SCIM API, OAuth, user provisioning |

**Estimated Timeline:** 6-12 weeks for all Tier 2

---

#### 🔮 **Tier 3: Future Enhancements**
*Nice-to-have, lower priority, niche use cases*

| Integration | Effort | Impact | Why It Matters | Technical Approach |
|-------------|--------|--------|----------------|-------------------|
| **Salesloft** | Hard | Low | Sales automation platform (niche) | Salesloft API, webhook events |
| **Outreach** | Hard | Low | Sales automation platform (niche) | Outreach API, webhook events |
| **Chili Piper** | Medium | Low | Meeting scheduling (less popular than Calendly) | Chili Piper API, booking links |
| **Customer Thermometer** | Easy | Low | Feedback surveys in signatures | Simple link insertion, no API needed |
| **Facebook** | Easy | Low | Social media links (less professional than LinkedIn) | Manual URL builder |
| **Matomo/Piwik** | Medium | Low | Privacy-focused analytics (niche) | Self-hosted analytics, tracking pixels |
| **Woopra** | Medium | Low | Customer analytics (niche) | Woopra API, event tracking |

**Estimated Timeline:** As needed based on customer requests

---

### Strategic Recommendations

#### **Why Zapier is the Game-Changer:**
- **One integration = 5,000+ apps**: Calendly, Salesforce, Slack, Asana, Trello, etc.
- **Marketing advantage**: "Connect Siggly to any tool you use"
- **Lower maintenance**: Zapier handles API changes, not you
- **Customer self-service**: Users can build their own integrations
- **Competitive differentiation**: Exclaimer doesn't have Zapier

**Zapier Use Cases:**
- Trigger: New team member added → Action: Send Slack notification
- Trigger: Signature deployed → Action: Log to Google Sheets
- Trigger: New HubSpot contact → Action: Update signature data
- Trigger: Calendly meeting booked → Action: Update signature with next availability

#### **Why Salesforce Matters (But Can Wait):**
- **Enterprise requirement**: Large orgs expect Salesforce integration
- **Complex to build**: Requires deep Salesforce knowledge, custom objects, SOQL
- **Zapier alternative**: Users can connect Salesforce via Zapier in the meantime
- **ROI question**: How many customers will actually use it vs. just expect it?

**Recommendation:** Build Zapier first, then gauge Salesforce demand. Zapier might satisfy 80% of Salesforce use cases.

#### **Analytics Integration Strategy:**
- **Start with Google Analytics**: Most popular, easy to implement
- **UTM parameters**: Auto-add tracking to all signature links
- **Click tracking dashboard**: Show "Your signatures generated 1,234 clicks this month"
- **Defer advanced analytics**: Matomo, Woopra are niche, wait for customer requests

---

### Integration Implementation Checklist

For each new integration, follow this process:

**1. Research & Planning**
- [ ] Review competitor implementations
- [ ] Read API documentation
- [ ] Identify OAuth requirements
- [ ] Map data fields to signature blocks
- [ ] Estimate effort and timeline

**2. Development**
- [ ] Set up OAuth flow (if needed)
- [ ] Create API client library
- [ ] Build data sync logic
- [ ] Add UI for connection management
- [ ] Implement error handling and retries
- [ ] Add rate limiting

**3. Testing**
- [ ] Test OAuth flow end-to-end
- [ ] Test data sync with sample accounts
- [ ] Test error scenarios (expired tokens, API errors)
- [ ] Test rate limiting behavior
- [ ] Security review (token storage, permissions)

**4. Documentation**
- [ ] Update SCOPE.md with integration details
- [ ] Create help docs for users
- [ ] Add integration to marketing site
- [ ] Create demo video/screenshots

**5. Launch**
- [ ] Add to integrations page in app
- [ ] Create landing page (e.g., `/integrations/calendly`)
- [ ] Announce to existing customers
- [ ] Update pricing page if gated feature

---

### Integration Data Model

**Table: `integration_connections`**
```sql
CREATE TABLE integration_connections (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  organization_id UUID REFERENCES organizations(id) ON DELETE CASCADE,
  provider VARCHAR(50) NOT NULL, -- 'google', 'microsoft', 'hubspot', 'salesforce', 'calendly', etc.
  access_token TEXT,
  refresh_token TEXT,
  token_expires_at TIMESTAMPTZ,
  scopes TEXT[],
  metadata JSONB, -- Provider-specific data (e.g., Salesforce instance URL)
  status VARCHAR(20) DEFAULT 'active', -- 'active', 'expired', 'revoked', 'error'
  last_synced_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_integration_connections_org ON integration_connections(organization_id);
CREATE INDEX idx_integration_connections_provider ON integration_connections(provider);
```

**Table: `integration_field_mappings`**
```sql
CREATE TABLE integration_field_mappings (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  organization_id UUID REFERENCES organizations(id) ON DELETE CASCADE,
  provider VARCHAR(50) NOT NULL,
  source_field VARCHAR(100) NOT NULL, -- e.g., 'salesforce.account.name'
  target_field VARCHAR(100) NOT NULL, -- e.g., 'signature.company'
  transform_rule JSONB, -- Optional transformation logic
  created_at TIMESTAMPTZ DEFAULT NOW()
);
```

---

### Next Steps

**Immediate (Next Sprint):**
1. ✅ Document current integrations (Google, Microsoft, HubSpot)
2. ✅ Build Calendly integration (completed)
3. 🔄 Build Zapier integration (2 weeks)
4. 🔄 Add Google Analytics tracking (3 days)

**Short-term (Next Quarter):**
5. Build Salesforce integration (4-6 weeks)
6. Add Microsoft Teams meeting links (2 weeks)
7. Build LinkedIn profile enrichment (1 week)

**Long-term (6+ months):**
8. Evaluate sales automation tools (Salesloft, Outreach) based on demand
9. Consider Okta integration for enterprise customers
10. Add advanced analytics (Matomo, Woopra) if requested

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

### Phase 1 - Core (MVP) ✅ COMPLETE
- [x] User authentication (email/password, magic links)
- [x] Organization creation on signup
- [x] Protected dashboard with navigation
- [x] Signature template builder (visual editor)
- [x] JSON block-based signature storage
- [x] HTML table-based rendering for email compatibility
- [x] Google Workspace integration (OAuth flow)
- [x] Manual signature deployment
- [x] Integrations page with connection management
- [x] Deployments page with history

### Phase 2 - Team Management ✅ COMPLETE
- [x] User import from Google Directory (Admin SDK)
- [x] Users page with sync and list view
- [x] Department filtering in deployment wizard
- [x] Step-by-step deployment wizard
- [x] Bulk deployment (all users, selected users, just me)
- [x] Celebratory success modal after deployment
- [x] Analytics page with deployment metrics
- [x] Settings page (profile, organization, notifications, security)

### Phase 2.5 - Marketing & Legal Pages ✅ COMPLETE
- [x] Privacy Policy page (Google API compliance)
- [x] Terms of Service page
- [x] About page
- [x] Contact page
- [x] Blog page (placeholder posts)
- [x] Demo page with feature showcase

### Phase 3 - Microsoft 365 (Outlook Web) ✅ COMPLETE
- [x] Microsoft Graph API OAuth integration
- [x] Azure AD user sync (import employees from directory)
- [x] Outlook Web signature deployment via Graph API
- [x] Token refresh and connection management
- **Note**: Fully functional OAuth flow, user sync from Azure AD, and token management.
- **Limitation**: This phase only covers Outlook Web. Desktop requires Phase 3.5.
- **Known Issue**: Microsoft Graph API doesn't support direct signature deployment. Signatures must be set via mailboxSettings endpoint which has limitations.

### Phase 3.5 - Outlook Desktop Support (Advanced)
**Option A: Outlook Web Add-in (Recommended)** 🎯
- [ ] Build Microsoft Office Add-in using Office.js
- [ ] Add-in manifest configuration for Outlook
- [ ] Client-side signature insertion on email compose
- [ ] Real-time signature preview in Outlook desktop
- [ ] Centralized deployment via Microsoft 365 admin center
- [ ] Support for Outlook for Windows, Mac, Web, and Mobile
- [ ] Add-in authentication and API communication
- [ ] Signature caching and offline support

**Technical Requirements:**
- Microsoft 365 admin center access for deployment
- Office Add-in development (JavaScript/TypeScript)
- Office.js API integration
- Signature storage in user's mailbox or cloud service
- Works across all Outlook clients (desktop, web, mobile)

**Benefits:**
- ✅ User sees signature while composing (real-time preview)
- ✅ Works on all platforms (Windows, Mac, web, mobile)
- ✅ Better placement in replies/forwards
- ✅ No Exchange transport rules needed
- ✅ Industry-standard approach (used by Exclaimer, CodeTwo)

**Challenges:**
- More complex to build than API-only solution
- Requires Microsoft partnership/certification for production
- Add-in must be deployed by tenant admin
- Development and testing requires Microsoft 365 developer tenant

**Alternative Options (Not Recommended):**
- Option B: Exchange Transport Rules (server-side, no preview, poor placement)
- Option C: PowerShell scripts + Group Policy (Windows-only, high maintenance)

### Phase 4 - Billing & Pay Gates ✅ COMPLETE
- [x] Stripe billing integration (checkout, portal, webhooks)
- [x] Subscription plans (Free, Professional, Enterprise)
- [x] Pay gates system with feature and usage limits (only analytics, MS365, multiple templates gated)
- [x] Development bypass toggle for testing
- [x] Upgrade prompts and billing page

### Phase 5 - Advanced
- [ ] Scheduled deployments
- [ ] A/B testing for signatures
- [ ] Click tracking and analytics
- [ ] White-label options

### Phase 6 - Production Readiness
- [ ] **Google OAuth Verification**: Submit app for Google verification (2-6 weeks)
- [ ] **Domain-Wide Delegation**: Enterprise install option for Workspace admins
- [ ] **Custom SMTP for auth emails**: Resend/SendGrid integration
- [ ] **Error monitoring**: Sentry or similar
- [ ] **Rate limiting**: Protect API endpoints

---

## Target Audiences & Search Intent

### Buyer Profiles

| Audience | Pain Points | What They Want | Price Sensitivity |
|----------|-------------|----------------|-------------------|
| **IT/Admin Teams** | Employees mess up signatures, no central control, missing disclaimers, mobile inconsistency | Centralized control, domain-wide deployment, compliance | Have budget, willing to pay |
| **Marketing Teams** | No way to use signatures for campaigns, can't track ROI | Campaign banners, click tracking, signature as promo space | Value buyers, pay for ROI |
| **Small Businesses** | Look unprofessional, hard to set up | Professional look, easy setup, basic sync | Price sensitive, need cheaper plans |
| **Agencies** | Managing signatures for multiple clients | White-label, multi-tenant, bulk management | Can bring multiple clients |

### High-Intent Search Keywords

Target these for SEO and content marketing:

**Commercial Intent (buyers searching):**
- "company email signature manager"
- "outlook company signature"
- "gmail signature for all users"
- "email signature marketing banner"
- "outlook auto deploy signatures"
- "centralized email footer"
- "email signature software"

**Problem-Aware (pain point searches):**
- "update all outlook signatures automatically"
- "company-wide gmail signatures"
- "enforce email signature policy"
- "email signature legal disclaimer"
- "consistent email signatures across company"

### Marketing Content Ideas

| Content Type | Topics |
|--------------|--------|
| **Landing Pages** | IT Admins, Marketing Teams, Small Business, Agencies |
| **Use Cases** | Sales teams, Support teams, Recruiting, Legal compliance |
| **Blog Posts** | "Why email signatures matter for brand", "Email signature compliance guide", "ROI of signature marketing" |
| **Tools** | Free signature generator (SEO traffic), Signature audit tool |
| **Comparisons** | "Siggly vs Exclaimer", "Siggly vs CodeTwo", "Best email signature software 2024" |

### Demand Tiers

Understanding buyer segments helps guide pricing and feature prioritization:

| Tier | Buyer Profile | What They Care About | Willingness to Pay | Siggly Plan |
|------|---------------|---------------------|-------------------|-------------|
| **Basic SMB** | Small teams (1-5 people) | Price, ease of use, quick setup | Low ($0/mo) | Free |
| **Growing Teams** | Teams (6-50 people) | MS365, analytics, multiple templates | Medium ($15-75/mo) | Professional |
| **Mid-Market** | Marketing teams, growing companies | Campaign banners, reporting, ROI tracking | Medium-High ($75-750/mo) | Professional |
| **Enterprise** | IT buyers, large orgs | Compliance, SSO, white-label, SLA | Highest ($200+/mo) | Enterprise |

**Key insight**: Mid-market marketing teams are the sweet spot — they have budget AND pain, and will pay for measurable ROI.

### Market Gaps (Where Siggly Can Win)

Competitors like Exclaimer and CodeTwo focus on enterprise. This leaves gaps:

| Gap | Opportunity | Siggly Advantage |
|-----|-------------|------------------|
| **SMB-Friendly UX** | Most solutions feel enterprise-heavy and complex | Simple, modern UI that non-technical users love |
| **Affordable Entry Tier** | Competitors start at $1-4/user/month minimum | Free tier with full features + $1.50/user Professional plan |
| **Better Analytics & ROI** | "Did signatures generate leads?" is unanswered | Click tracking, campaign attribution, engagement dashboard |
| **AI-Powered Signatures** | No personalization without admin hassle | AI generator, smart suggestions, auto-optimization |
| **Seamless Gmail/Outlook Sync** | Competitors require scripts, admin certs, IT involvement | One-click OAuth connection, no IT needed |
| **Mobile Consistency** | Signatures break on mobile apps | Mobile-optimized templates that work everywhere |

---

## Competitive Differentiators (Future Roadmap)

*Features that will make Siggly stand out from Exclaimer, CodeTwo, WiseStamp, Newoldstamp, Letsignit, and Opensense.*

### 🚀 Zero-Friction Onboarding
- [ ] **60-second setup**: Connect Google/Microsoft → see live signature instantly
- [ ] **No IT involvement**: Self-serve for marketing/HR teams
- [ ] **Auto-detect existing signatures**: Import and improve current signatures

### 📊 Signature Analytics & ROI Tracking
- [ ] **Click tracking**: Track clicks on links, banners, CTAs in signatures
- [ ] **Campaign attribution**: Connect signature clicks to CRM deals (HubSpot, Salesforce)
- [ ] **Engagement dashboard**: "Your team's emails generated 4,200 banner clicks this month"
- [ ] **A/B testing with results**: Test two CTAs, measure which converts better

### 🎯 Dynamic Smart Signatures
- [ ] **Context-aware signatures**: Different CTA based on recipient domain or department
- [ ] **Time-based content**: Auto-rotate banners for holidays, events, promotions
- [ ] **Recipient personalization**: "Hi [First Name]" in signature based on recipient

### 🎨 AI-Powered Design
- [ ] **AI signature generator**: Describe what you want → get professional HTML signature
- [ ] **Signature health score**: Rate existing signatures 1-100, suggest improvements
- [ ] **Brand consistency checker**: Auto-detect off-brand colors, fonts, logos
- [ ] **One-click redesign**: "Make this more modern" → AI updates the design

### 🔗 Campaign Banners & Marketing
- [ ] **Rotating promotional banners**: Schedule banners for product launches, events
- [ ] **Banner templates library**: Pre-designed banners for common use cases
- [ ] **UTM tracking built-in**: Auto-add tracking parameters to all links
- [ ] **Marketing calendar integration**: Sync banners with marketing campaigns

### 🔒 Security & Compliance
- [ ] **Verified sender badge**: DKIM-verified footer to fight spoofing
- [ ] **Compliance disclaimers**: Auto-add legal text based on country/industry
- [ ] **Audit trail**: Full history of signature changes for compliance
- [ ] **GDPR/HIPAA templates**: Pre-built compliant signature blocks

### 🔄 HR System Integration
- [ ] **HRIS sync**: Pull data from BambooHR, Gusto, Workday automatically
- [ ] **Auto-update on role change**: Job title changes → signature updates instantly
- [ ] **New hire automation**: Signature deployed on day one, no manual setup
- [ ] **Offboarding cleanup**: Remove signatures when employees leave

### 🌐 Viral Growth Features
- [ ] **"Powered by Siggly"**: Subtle branding on free-tier signatures (removable on paid)
- [ ] **Signature personality quiz**: Fun viral tool → generates custom signature style
- [ ] **Free public generator**: SEO-optimized page for organic traffic
- [ ] **Referral program**: "Invite 3 companies → get 1 month free"

### 📱 Multi-Platform Excellence
- [ ] **Mobile signature sync**: Signatures work perfectly on Gmail/Outlook mobile apps
- [ ] **Apple Mail support**: Native macOS/iOS signature deployment
- [ ] **Browser extension**: Quick signature preview and edit from any tab

### 🏢 Enterprise Features
- [ ] **SSO/SAML**: Single sign-on for large organizations
- [ ] **API access**: Programmatic signature management
- [ ] **Custom domains**: White-label the entire platform
- [ ] **SLA guarantees**: 99.9% uptime commitment
- [ ] **Dedicated support**: Priority support channel for enterprise customers

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

# Development
NEXT_PUBLIC_BYPASS_PAY_GATES=true  # Set to 'false' in production
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

## Billing & Subscription System

### Pricing Model

Siggly uses a **simple per-user pricing model** with a generous free tier:

| Tier | Price | Templates | Team Members | Key Features |
|------|-------|-----------|--------------|--------------|
| **Free** | $0 forever | 1 | 5 | Full features: editor, Google Workspace, HubSpot, bulk ops, compliance, directory sync, scheduled deployments, API access |
| **Professional** | $1.50/user/mo (10-user min) | Unlimited | Unlimited | + Microsoft 365, full analytics, unlimited templates, priority support |
| **Enterprise** | Custom | Unlimited | Unlimited | + SSO/SAML, white-label, dedicated AM, custom integrations, SLA |

**Feature gates (Free plan):** Only analytics (7-day preview), Microsoft 365, and multiple templates are gated to Professional. Everything else is free.

### Stripe Integration

#### API Routes
| Route | Description |
|-------|-------------|
| `/api/billing/checkout` | Creates Stripe Checkout session for plan upgrades |
| `/api/billing/portal` | Opens Stripe Customer Portal for subscription management |
| `/api/billing/webhook` | Handles Stripe webhook events (subscription updates, payments) |

#### Webhook Events Handled
- `checkout.session.completed` - New subscription created
- `customer.subscription.updated` - Plan changed or renewed
- `customer.subscription.deleted` - Subscription canceled
- `invoice.payment_failed` - Payment failed

#### Environment Variables
```env
STRIPE_SECRET_KEY=sk_...
STRIPE_WEBHOOK_SECRET=whsec_...
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_...
STRIPE_PROFESSIONAL_PRICE_ID=price_...  # $1.50/user/month per-seat price
```

---

## Pay Gates System

### Overview

Pay gates restrict access to features and enforce usage limits based on the user's subscription plan. A **development bypass** allows disabling all gates during development.

### Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                    SubscriptionProvider                      │
│  (Context provider wrapping dashboard layout)               │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  ┌─────────────────┐    ┌─────────────────────────────┐    │
│  │ useSubscription │───▶│ Fetches plan, usage, limits │    │
│  │     Hook        │    │ from Supabase               │    │
│  └─────────────────┘    └─────────────────────────────┘    │
│           │                                                 │
│           ▼                                                 │
│  ┌─────────────────────────────────────────────────────┐   │
│  │              Helper Functions                        │   │
│  │  • canAccess(feature) - Check feature access         │   │
│  │  • canCreateTemplate() - Check template limit        │   │
│  │  • canAddTeamMember() - Check team member limit      │   │
│  └─────────────────────────────────────────────────────┘   │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

### Key Files

| File | Purpose |
|------|---------|
| `src/hooks/use-subscription.tsx` | Subscription context and hook |
| `src/lib/billing/plans.ts` | Plan definitions, features, limits |
| `src/components/billing/upgrade-prompt.tsx` | Upgrade UI components |
| `src/components/billing/dev-bypass-indicator.tsx` | Dev mode indicator |
| `src/components/providers/subscription-provider.tsx` | Client wrapper |

### Feature Gates

Features are gated by plan using the `canAccess()` function. Most features are now free:

| Feature | Free | Professional | Enterprise |
|---------|------|--------------|------------|
| `analytics` | ⚠️ 7-day preview | ✅ Full | ✅ Full |
| `microsoft365` | ❌ | ✅ | ✅ |
| `hubspotCRM` | ✅ | ✅ | ✅ |
| `customBranding` | ✅ | ✅ | ✅ |
| `removeWatermark` | ✅ | ✅ | ✅ |
| `scheduledDeployments` | ✅ | ✅ | ✅ |
| `bulkOperations` | ✅ | ✅ | ✅ |
| `directorySync` | ✅ | ✅ | ✅ |
| `complianceBlocks` | ✅ | ✅ | ✅ |
| `apiAccess` | ✅ | ✅ | ✅ |
| `prioritySupport` | ❌ | ✅ | ✅ |
| `sso` | ❌ | ❌ | ✅ |
| `whiteLabel` | ❌ | ❌ | ✅ |

**Only 3 feature gates on Free plan:** analytics (full history), Microsoft 365, and multiple templates.

### Usage Limits

Limits are enforced using the `isWithinLimit()` function:

| Resource | Free | Professional | Enterprise |
|----------|------|--------------|------------|
| Templates | 1 | Unlimited | Unlimited |
| Team Members | 5 | Unlimited | Unlimited |

### Implementation Examples

#### Checking Feature Access
```typescript
const { canAccess } = useSubscription();

if (!canAccess('analytics')) {
  return <UpgradePrompt feature="Analytics" requiredPlan="professional" />;
}
```

#### Checking Usage Limits
```typescript
const { canCreateTemplate, usage, limits } = useSubscription();

if (!canCreateTemplate()) {
  return (
    <div>
      You've used {usage.templateCount} of {limits.maxTemplates} templates.
      <Link href="/settings/billing">Upgrade</Link>
    </div>
  );
}
```

#### Using Gate Components
```tsx
// Feature gate - shows upgrade prompt if no access
<FeatureGate feature="analytics">
  <AnalyticsDashboard />
</FeatureGate>

// Limit gate - shows upgrade prompt if limit reached
<LimitGate type="template">
  <CreateTemplateButton />
</LimitGate>
```

### Development Bypass

To disable all pay gates during development:

```env
# .env.local
NEXT_PUBLIC_BYPASS_PAY_GATES=true
```

When enabled:
- All `canAccess()` calls return `true`
- All `canCreateTemplate()` / `canAddTeamMember()` calls return `true`
- A yellow "Pay Gates Bypassed" badge appears in the bottom-right corner
- `UpgradePrompt` components are hidden

**⚠️ Important**: Remove or set to `false` in production!

### Pages with Pay Gates

| Page | Gate Type | Restriction |
|------|-----------|-------------|
| `/templates` | Limit | Template count vs plan limit |
| `/team` | Limit | Team member count vs plan limit |
| `/analytics` | Feature | Requires `analytics` feature |

### Billing Page

Located at `/settings/billing`, this page shows:
- Current plan and status
- Usage vs limits (templates, team members)
- Trial status and days remaining
- Upgrade/downgrade options
- Link to Stripe Customer Portal

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

---

## MSP Market Requirements Analysis

*Research conducted February 2026 to evaluate Siggly's readiness for the MSP (Managed Service Provider) channel.*

### 1. Security & Compliance Requirements

| Requirement | MSP Expectation | Siggly Status |
|-------------|-----------------|---------------|
| **SOC 2 Type 2** | Required for enterprise clients | ⚠️ Via Vercel/Supabase (not Siggly-specific) |
| **ISO 27001** | Expected for security-conscious clients | ❌ Not certified |
| **GDPR Compliance** | Required for EU clients | ✅ Likely compliant (verify DPA) |
| **HIPAA** | Healthcare clients | ❌ Not certified |
| **SSO/SAML** | Enterprise requirement | ❌ Not yet (on roadmap) |
| **Audit Logs** | Compliance tracking | ✅ Built into schema |
| **Data Encryption** | At rest and in transit | ✅ Via Supabase (TLS, encrypted storage) |
| **Role-Based Access Control** | Multi-user management | ⚠️ Basic (needs enhancement) |

**Verdict**: Partial compliance. Basic security needs met, but lacks formal certifications (SOC 2, ISO 27001) that enterprise MSPs require.

### 2. Top 11 MSP Priorities for Email Signature Software

| Priority | What MSPs Want | Siggly Status |
|----------|----------------|---------------|
| **1. Integration** | Microsoft 365, Google Workspace, Exchange | ✅ Google & Microsoft done |
| **2. Centralized Control** | Single admin portal, tamper-proof signatures | ✅ Have this |
| **3. Automation** | Directory sync, auto-populate fields | ✅ Google/Azure AD sync |
| **4. Security/Compliance** | ISO 27001, HIPAA, GDPR, SOC 2 | ⚠️ Partial |
| **5. Scalability** | No user limits, handles growth | ✅ Architecture supports this |
| **6. Easy Deployment** | SaaS, no IT involvement | ✅ Self-serve OAuth |
| **7. Branding/Customization** | Templates, logos, banners, HTML | ✅ Have this |
| **8. Marketing/Analytics** | Click tracking, A/B testing, campaigns | ⚠️ On roadmap |
| **9. Performance/Reliability** | 99.9% SLA, fast processing | ✅ Via Vercel |
| **10. Partner Program** | White-label, reseller margins, co-marketing | ❌ Not built |
| **11. Vendor Reputation** | Reviews, case studies, certifications | ⚠️ Early stage |

### 3. Multi-Domain & Multi-Tenant Requirements

**MSPs require these features to manage multiple clients:**

| Feature | Why It Matters | Siggly Status |
|---------|----------------|---------------|
| **Multi-Tenant Portal** | Manage ALL clients from one dashboard | ❌ Not built |
| **Multi-Domain Support** | One client may have multiple domains | ❌ Not built |
| **Client Switching** | Quick switch between client orgs | ❌ Not built |
| **White-Label/Custom Branding** | MSP's logo, not Siggly's | ❌ Not built |
| **Delegated Admin Access** | Give client limited self-service | ⚠️ Basic RBAC only |
| **Consolidated Billing** | One invoice for all clients | ❌ Not built |
| **Per-Client Reporting** | Analytics per organization | ⚠️ Single-org only |

### 4. Gap Analysis Summary

| Category | Current State | Gap |
|----------|---------------|-----|
| **Security Certifications** | Rely on infra providers | Need SOC 2 badge (or statement) |
| **Multi-Tenant Admin** | Single-org only | **Major gap** — MSPs can't manage clients |
| **Multi-Domain** | Single domain per org | **Major gap** — enterprises have multiple domains |
| **Partner Program** | None | Need reseller pricing, white-label, co-marketing |
| **SSO/SAML** | Not built | Enterprise blocker |

### 5. MSP Feature Roadmap (If Pursuing This Market)

**Phase 1: Foundation (2-3 months)**
- [ ] Multi-tenant organization model (parent/child orgs)
- [ ] MSP admin dashboard with client switching
- [ ] Multi-domain support per organization
- [ ] Enhanced RBAC (MSP Admin, Client Admin, User roles)

**Phase 2: Partner Program (1-2 months)**
- [ ] Reseller pricing and margins
- [ ] White-label option (custom branding)
- [ ] Consolidated billing for MSPs
- [ ] Partner portal with co-marketing materials

**Phase 3: Enterprise Features (2-3 months)**
- [ ] SSO/SAML integration (Okta, Azure AD)
- [ ] SOC 2 Type 2 certification process
- [ ] SLA documentation and uptime guarantees
- [ ] Dedicated support tier

### 6. Strategic Recommendation

**Current Focus**: Direct-to-business sales (IT admins, marketing teams) rather than MSP channel.

**Rationale**:
- MSP features require 4-6 months of focused development
- Direct sales validates product-market fit first
- MSP channel can be added once core product is proven
- Competitors (Exclaimer, Rocketseed) already have mature MSP programs

**When to Pursue MSPs**:
- After reaching 50+ direct customers
- When MSPs start requesting access organically
- If a strategic MSP partnership opportunity arises

---

## MSP Partner Program - Full Scope

*Comprehensive specification for building MSP/multi-tenant capabilities into Siggly.*

### Overview

The MSP Partner Program enables IT service providers to manage email signatures for multiple client organizations from a single dashboard. This is a gated program requiring application and approval.

### Access Hierarchy

```
┌─────────────────────────────────────────────────────────────────┐
│                    PLATFORM LEVEL (Siggly Team Only)            │
│  • is_admin = true on users table                               │
│  • Access: /admin/* routes                                      │
│  • Can view all orgs, impersonate, manage billing               │
└─────────────────────────────────────────────────────────────────┘
                              │
        ┌─────────────────────┴─────────────────────┐
        │                                           │
        ▼                                           ▼
┌───────────────────────┐               ┌───────────────────────┐
│   MSP Organization    │               │  Standard Organization │
│   (type: 'msp')       │               │  (type: 'standard')    │
├───────────────────────┤               ├───────────────────────┤
│ • msp_owner           │               │ • owner               │
│ • msp_admin           │               │ • admin               │
│                       │               │ • member              │
│   ┌─────────────────┐ │               └───────────────────────┘
│   │ Client Org 1    │ │
│   │ (type: 'client')│ │
│   │ parent_id → MSP │ │
│   │ • client_admin  │ │
│   │ • member        │ │
│   └─────────────────┘ │
└───────────────────────┘
```

### Database Schema Changes

#### 1. Organizations Table Updates

```sql
-- Add columns to organizations table
ALTER TABLE organizations ADD COLUMN parent_organization_id UUID REFERENCES organizations(id);
ALTER TABLE organizations ADD COLUMN organization_type TEXT DEFAULT 'standard';
-- Values: 'standard', 'msp', 'msp_client'

ALTER TABLE organizations ADD COLUMN branding JSONB DEFAULT '{}';
-- branding: { primaryColor, logoUrl, faviconUrl, hideSignlyBranding }

CREATE INDEX idx_organizations_parent ON organizations(parent_organization_id);
CREATE INDEX idx_organizations_type ON organizations(organization_type);
```

#### 2. Organization Domains Table (Multi-Domain Support)

```sql
CREATE TABLE organization_domains (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  organization_id UUID REFERENCES organizations(id) ON DELETE CASCADE NOT NULL,
  domain TEXT NOT NULL UNIQUE,
  is_primary BOOLEAN DEFAULT false,
  verified BOOLEAN DEFAULT false,
  verification_token TEXT,
  verified_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_org_domains_org ON organization_domains(organization_id);
```

#### 3. MSP User Access Table (Cross-Org Access)

```sql
CREATE TABLE msp_client_access (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  msp_user_id UUID REFERENCES users(id) ON DELETE CASCADE NOT NULL,
  msp_organization_id UUID REFERENCES organizations(id) ON DELETE CASCADE NOT NULL,
  client_organization_id UUID REFERENCES organizations(id) ON DELETE CASCADE NOT NULL,
  access_level TEXT DEFAULT 'full', -- 'full', 'read_only', 'deploy_only'
  granted_at TIMESTAMPTZ DEFAULT NOW(),
  granted_by UUID REFERENCES users(id),
  UNIQUE(msp_user_id, client_organization_id)
);

CREATE INDEX idx_msp_access_user ON msp_client_access(msp_user_id);
CREATE INDEX idx_msp_access_client ON msp_client_access(client_organization_id);
```

#### 4. Extended Roles & Permissions

```sql
-- Add new roles
INSERT INTO roles (name, description, is_system) VALUES
  ('msp_owner', 'MSP organization owner with access to all clients', true),
  ('msp_admin', 'MSP administrator who can manage client orgs', true),
  ('client_admin', 'Client org admin with limited self-service', true)
ON CONFLICT (name) DO NOTHING;

-- Add MSP permissions
INSERT INTO permissions (name, description, category) VALUES
  ('msp.view_clients', 'View all client organizations', 'msp'),
  ('msp.manage_clients', 'Create and manage client organizations', 'msp'),
  ('msp.switch_context', 'Switch between client organizations', 'msp'),
  ('msp.billing', 'Manage consolidated billing for clients', 'msp'),
  ('msp.branding', 'Manage white-label branding', 'msp'),
  ('msp.analytics', 'View aggregate analytics across clients', 'msp')
ON CONFLICT (name) DO NOTHING;
```

### Role Permissions Matrix

| Permission | msp_owner | msp_admin | client_admin | owner | admin | member |
|------------|-----------|-----------|--------------|-------|-------|--------|
| **MSP Features** |
| msp.view_clients | ✓ | ✓ | - | - | - | - |
| msp.manage_clients | ✓ | ✓ | - | - | - | - |
| msp.switch_context | ✓ | ✓ | - | - | - | - |
| msp.billing | ✓ | - | - | - | - | - |
| msp.branding | ✓ | ✓ | - | - | - | - |
| msp.analytics | ✓ | ✓ | - | - | - | - |
| **Standard Features** |
| templates.* | ✓ | ✓ | ✓ | ✓ | ✓ | view |
| team.* | ✓ | ✓ | ✓ | ✓ | ✓ | view |
| deployments.* | ✓ | ✓ | ✓ | ✓ | ✓ | - |
| analytics.* | ✓ | ✓ | ✓ | ✓ | ✓ | view |
| settings.organization | ✓ | ✓ | ✓ | ✓ | ✓ | - |
| settings.integrations | ✓ | ✓ | ✓ | ✓ | ✓ | - |
| settings.billing | ✓ | - | - | ✓ | - | - |

### Partner Program Flow

#### 1. Application Process

```
/partners (Marketing Page)
    │
    ▼
[Apply for Partner Program] button
    │
    ▼
Application Form:
  - Company Name
  - Website
  - Contact Email
  - Phone
  - Number of clients you manage
  - Primary services (IT, Security, Cloud, etc.)
  - How did you hear about us?
    │
    ▼
Application submitted → Email to Siggly team
    │
    ▼
Admin Dashboard: /admin/partner-applications
  - Review applications
  - Approve / Reject
  - Set partner tier
    │
    ▼
On Approval:
  - Set organization_type = 'msp'
  - Send welcome email with next steps
  - Unlock /msp/* routes
```

#### 2. Partner Tiers (Future)

| Tier | Requirements | Benefits |
|------|--------------|----------|
| **Registered** | Approved application | Basic MSP features, standard pricing |
| **Authorized** | 5+ active clients | 10% margin, co-branded assets, deal registration |
| **Premier** | 20+ active clients, $5k+ MRR | 20% margin, priority support, joint marketing |

### Route Structure

```
/partners                      → Marketing page with "Apply" CTA
/partners/apply                → Application form
/partners/portal               → Redirect to /msp/dashboard (if approved)

/msp/dashboard                 → MSP overview (all clients)
/msp/clients                   → Client list with add/edit
/msp/clients/new               → Add new client org
/msp/clients/[orgId]           → Client detail / enter client context
/msp/clients/[orgId]/settings  → Client-specific settings
/msp/analytics                 → Aggregate analytics
/msp/billing                   → Consolidated billing view
/msp/settings                  → MSP settings, branding

/msp/context/[orgId]/*         → Client context (mirrors /dashboard/*)
  /msp/context/[orgId]/dashboard
  /msp/context/[orgId]/templates
  /msp/context/[orgId]/team
  /msp/context/[orgId]/deployments
  /msp/context/[orgId]/analytics
  /msp/context/[orgId]/settings
```

### UX Flows

#### MSP Onboarding (After Approval)

```
1. Welcome Email
   "Your MSP Partner application has been approved!"
   [Access Partner Portal]
       │
       ▼
2. First Login → /msp/dashboard
   ┌─────────────────────────────────────────┐
   │  Welcome to the Partner Portal! 🚀      │
   │                                         │
   │  Let's add your first client.           │
   │                                         │
   │  [Add Client Organization]              │
   └─────────────────────────────────────────┘
       │
       ▼
3. Add Client → /msp/clients/new
   ┌─────────────────────────────────────────┐
   │  Add Client Organization                │
   │                                         │
   │  Client Name: [________________]        │
   │  Primary Domain: [________________]     │
   │  Contact Name: [________________]       │
   │  Contact Email: [________________]      │
   │                                         │
   │  [Create Client]                        │
   └─────────────────────────────────────────┘
       │
       ▼
4. Connect Client's Email
   ┌─────────────────────────────────────────┐
   │  Connect "ABC Corp" to their email      │
   │                                         │
   │  You'll need admin access to their      │
   │  Google Workspace or Microsoft 365.     │
   │                                         │
   │  [Connect Google] [Connect Microsoft]   │
   │                                         │
   │  Or invite client admin to connect:     │
   │  [Send Invite to Client Admin]          │
   └─────────────────────────────────────────┘
       │
       ▼
5. MSP Dashboard with Client
   ┌─────────────────────────────────────────┐
   │  Your Clients                           │
   │  ┌─────────────────────────────────────┐│
   │  │ ABC Corp    0 users    ⚠ Connect   ││
   │  │ + Add Client                        ││
   │  └─────────────────────────────────────┘│
   └─────────────────────────────────────────┘
```

#### Client Context Switching

```
Header when in MSP context:
┌─────────────────────────────────────────────────────────────────┐
│  Siggly                    [All Clients ▼]    [Acme IT] [👤]    │
└─────────────────────────────────────────────────────────────────┘

Header when in Client context:
┌─────────────────────────────────────────────────────────────────┐
│  Siggly    [← Back to MSP]    [ABC Corp ▼]    [Acme IT] [👤]    │
└─────────────────────────────────────────────────────────────────┘

Client Switcher Dropdown:
┌─────────────────────────┐
│ ← MSP Overview          │
├─────────────────────────┤
│ ABC Corp            ✓   │
│ XYZ Inc                 │
│ 123 LLC                 │
├─────────────────────────┤
│ + Add Client            │
└─────────────────────────┘
```

### Billing Model Options

#### Option A: MSP Pays for All (Consolidated)

```
MSP Organization
└── Subscription: Professional @ $1.50/user/month
    └── Covers all client orgs
    └── Total users across all clients = billable users (10-user minimum)
```

#### Option B: Per-Client Billing (Pass-Through)

```
MSP Organization (no subscription)
├── Client 1: Professional @ $1.50/user × 24 users = $36/mo
├── Client 2: Professional @ $1.50/user × 18 users = $27/mo
└── Client 3: Professional @ $1.50/user × 45 users = $67.50/mo

MSP receives single invoice for all clients
```

#### Option C: Hybrid (MSP Margin)

```
MSP buys at partner discount (e.g., 20% off)
MSP bills clients at retail or custom rate
MSP keeps the margin
```

**Recommended for MVP:** Option A (Consolidated) — simplest to implement.

### Implementation Phases

#### Phase 1: Foundation (3-4 weeks)
- [ ] Database migrations (org type, parent_id, domains table)
- [ ] Partner application form and admin review UI
- [ ] Basic MSP dashboard with client list
- [ ] Add/edit client organizations
- [ ] Client context switching

#### Phase 2: Core Features (3-4 weeks)
- [ ] Multi-domain support per organization
- [ ] MSP roles and permissions
- [ ] Cross-org access control
- [ ] Client context routes (mirror dashboard)
- [ ] Aggregate analytics view

#### Phase 3: Billing & Branding (2-3 weeks)
- [ ] Consolidated billing for MSPs
- [ ] White-label branding settings
- [ ] Per-client reporting/exports

#### Phase 4: Polish & Scale (2-3 weeks)
- [ ] Partner tiers and benefits
- [ ] Deal registration
- [ ] Client self-service portal (optional)
- [ ] SSO/SAML for enterprise MSPs

### Total Estimated Effort

| Phase | Duration | Priority |
|-------|----------|----------|
| Phase 1: Foundation | 3-4 weeks | Required for MVP |
| Phase 2: Core Features | 3-4 weeks | Required for MVP |
| Phase 3: Billing & Branding | 2-3 weeks | Important |
| Phase 4: Polish & Scale | 2-3 weeks | Nice-to-have |
| **Total** | **10-14 weeks** | |

### Success Metrics

- Number of approved MSP partners
- Number of client orgs managed by MSPs
- MSP retention rate
- Revenue from MSP channel vs direct
- Average clients per MSP
- Time to first client deployment

### Competitive Positioning

| Feature | Siggly (Planned) | Exclaimer | CodeTwo |
|---------|------------------|-----------|---------|
| Multi-tenant portal | ✓ | ✓ | ✓ |
| Partner tiers | ✓ | ✓ (3 tiers) | ✓ |
| White-label | ✓ | ✓ | ✓ |
| Consolidated billing | ✓ | ✓ | ✓ |
| Self-service signup | ✗ (Application) | ✗ (Application) | ✗ |
| Partner margins | ✓ | ✓ (up to 20%) | ✓ |
| Deal registration | ✓ (Phase 4) | ✓ | ✓ |

### Decision: When to Build This

**Build MSP features when:**
- You have 50+ direct customers (product-market fit proven)
- MSPs are organically requesting access
- You have capacity for 10-14 weeks of focused development
- You're ready to support partner relationships

**Don't build yet if:**
- Still iterating on core product
- Limited development resources
- No MSP demand signals
