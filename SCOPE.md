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
| **Calendly** | Easy | High | Every competitor has this. Users expect meeting links in signatures | Calendly API, OAuth, dynamic link insertion |
| **Google Analytics** | Easy | Medium | Click tracking for signature links. Prove ROI to marketing teams | UTM parameters, GA4 Measurement Protocol |
| **Microsoft Bookings** | Easy | Medium | Natural fit for Microsoft 365 customers | Graph API, booking page links |

**Estimated Timeline:** 2-4 weeks for all Tier 1

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
2. 🔄 Build Zapier integration (2 weeks)
3. 🔄 Build Calendly integration (1 week)
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
- [x] Subscription plans (Free, Starter, Professional, Enterprise)
- [x] Pay gates system with feature and usage limits
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
| **Basic SMB** | Small teams (5-20 people) | Price, ease of use, quick setup | Low ($0-10/mo) | Free / Starter |
| **Mid-Market** | Marketing teams, growing companies | Campaign banners, reporting, ROI tracking | Medium-High ($29-99/mo) | Professional |
| **Enterprise** | IT buyers, large orgs | Compliance, SSO, API, governance, SLA | Highest ($200+/mo) | Enterprise |

**Key insight**: Mid-market marketing teams are the sweet spot — they have budget AND pain, and will pay for measurable ROI.

### Market Gaps (Where Siggly Can Win)

Competitors like Exclaimer and CodeTwo focus on enterprise. This leaves gaps:

| Gap | Opportunity | Siggly Advantage |
|-----|-------------|------------------|
| **SMB-Friendly UX** | Most solutions feel enterprise-heavy and complex | Simple, modern UI that non-technical users love |
| **Affordable Entry Tier** | Competitors start at $2-4/user/month minimum | Free tier + $0.50/user Starter plan |
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

Siggly uses a **per-team-member pricing model** similar to competitors but at lower rates:

| Tier | Price | Templates | Team Members | Key Features |
|------|-------|-----------|--------------|--------------|
| **Free** | $0 forever | 1 | 5 | Basic editor, Google Workspace sync |
| **Starter** | $0.50/member/mo | 5 | Unlimited | + Microsoft 365, analytics, remove watermark |
| **Professional** | $29/mo + $1/member | Unlimited | Unlimited | + Scheduled deployments, API access, priority support |
| **Enterprise** | Custom | Unlimited | Unlimited | + SSO/SAML, white-label, dedicated support |

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
STRIPE_STARTER_PRICE_ID=price_...
STRIPE_PROFESSIONAL_PRICE_ID=price_...
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

Features are gated by plan using the `canAccess()` function:

| Feature | Free | Starter | Professional | Enterprise |
|---------|------|---------|--------------|------------|
| `analytics` | ❌ | ✅ | ✅ | ✅ |
| `microsoft365` | ❌ | ✅ | ✅ | ✅ |
| `customBranding` | ❌ | ✅ | ✅ | ✅ |
| `removeWatermark` | ❌ | ✅ | ✅ | ✅ |
| `scheduledDeployments` | ❌ | ❌ | ✅ | ✅ |
| `apiAccess` | ❌ | ❌ | ✅ | ✅ |
| `prioritySupport` | ❌ | ❌ | ✅ | ✅ |
| `sso` | ❌ | ❌ | ❌ | ✅ |
| `whiteLabel` | ❌ | ❌ | ❌ | ✅ |

### Usage Limits

Limits are enforced using the `isWithinLimit()` function:

| Resource | Free | Starter | Professional | Enterprise |
|----------|------|---------|--------------|------------|
| Templates | 1 | 5 | Unlimited | Unlimited |
| Team Members | 5 | Unlimited | Unlimited | Unlimited |

### Implementation Examples

#### Checking Feature Access
```typescript
const { canAccess } = useSubscription();

if (!canAccess('analytics')) {
  return <UpgradePrompt feature="Analytics" requiredPlan="starter" />;
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
