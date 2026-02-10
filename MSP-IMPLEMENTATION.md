# MSP Partner Program - Implementation Guide

*Complete documentation for the MSP (Managed Service Provider) multi-tenant features in Siggly.*

---

## Table of Contents

1. [Overview](#overview)
2. [Architecture](#architecture)
3. [Database Schema](#database-schema)
4. [Competitor Pricing Analysis](#competitor-pricing-analysis)
5. [Implementation Status](#implementation-status)
6. [White-Label Branding](#white-label-branding)
7. [Roles & Permissions](#roles--permissions)
8. [UX Flows](#ux-flows)
9. [API Routes](#api-routes)
10. [File Reference](#file-reference)
11. [Next Steps](#next-steps)

---

## Overview

The MSP Partner Program enables IT service providers to manage email signatures for multiple client organizations from a single dashboard. This is a **gated program** requiring application and approval.

### Key Features

| Feature | Description | Status |
|---------|-------------|--------|
| Multi-Tenant Portal | Manage all clients from one dashboard | 🔲 Planned |
| Multi-Domain Support | One client can have multiple domains | 🔲 Planned |
| Client Switching | Quick switch between client orgs | 🔲 Planned |
| White-Label Branding | Custom colors, logos, subdomain | ✅ Built |
| Delegated Admin Access | Give clients limited self-service | 🔲 Planned |
| Consolidated Billing | One invoice for all clients | 🔲 Planned |
| Per-Client Reporting | Analytics per organization | 🔲 Planned |

### Impact on Existing Users

| User Type | Impact |
|-----------|--------|
| **Direct Admin** (standard org) | No change — works exactly as before |
| **MSP Admin** (msp org) | New features: client management, branding |
| **MSP Client User** | Sees MSP's branding if subdomain used |
| **Platform Admin** (`is_admin=true`) | No change — full access to all orgs |

---

## Architecture

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

### Organization Types

| Type | Description |
|------|-------------|
| `standard` | Direct customer (default) |
| `msp` | Managed Service Provider |
| `msp_client` | Client managed by an MSP |

---

## Database Schema

### Migration File

`apps/web/supabase/migrations/create_msp_multi_tenant.sql`

### Organizations Table Updates

```sql
ALTER TABLE organizations ADD COLUMN parent_organization_id UUID REFERENCES organizations(id);
ALTER TABLE organizations ADD COLUMN organization_type TEXT DEFAULT 'standard';
ALTER TABLE organizations ADD COLUMN branding JSONB DEFAULT '{}';
ALTER TABLE organizations ADD COLUMN partner_tier TEXT DEFAULT 'registered';
ALTER TABLE organizations ADD COLUMN custom_subdomain TEXT UNIQUE;
```

### New Tables

#### organization_domains (Multi-Domain Support)

```sql
CREATE TABLE organization_domains (
  id UUID PRIMARY KEY,
  organization_id UUID REFERENCES organizations(id),
  domain TEXT NOT NULL UNIQUE,
  is_primary BOOLEAN DEFAULT false,
  verified BOOLEAN DEFAULT false,
  verification_token TEXT,
  verified_at TIMESTAMPTZ
);
```

#### msp_client_access (Cross-Org Access)

```sql
CREATE TABLE msp_client_access (
  id UUID PRIMARY KEY,
  msp_user_id UUID REFERENCES users(id),
  msp_organization_id UUID REFERENCES organizations(id),
  client_organization_id UUID REFERENCES organizations(id),
  access_level TEXT DEFAULT 'full', -- 'full', 'read_only', 'deploy_only', 'billing_only'
  granted_at TIMESTAMPTZ,
  revoked_at TIMESTAMPTZ
);
```

#### partner_applications

```sql
CREATE TABLE partner_applications (
  id UUID PRIMARY KEY,
  company_name TEXT NOT NULL,
  website TEXT,
  contact_name TEXT NOT NULL,
  contact_email TEXT NOT NULL,
  number_of_clients INTEGER,
  primary_services TEXT[],
  status TEXT DEFAULT 'pending', -- 'pending', 'approved', 'rejected'
  reviewed_by UUID REFERENCES users(id),
  organization_id UUID REFERENCES organizations(id) -- linked on approval
);
```

### New Roles

| Role | Description |
|------|-------------|
| `msp_owner` | MSP org owner with full access to all clients |
| `msp_admin` | MSP admin who can manage client orgs |
| `client_admin` | Client org admin with limited self-service |

### New Permissions

| Permission | Category | Description |
|------------|----------|-------------|
| `msp.view_clients` | msp | View all client organizations |
| `msp.manage_clients` | msp | Create/edit/delete client orgs |
| `msp.switch_context` | msp | Switch between client contexts |
| `msp.billing` | msp | Manage consolidated billing |
| `msp.branding` | msp | Configure white-label branding |
| `msp.analytics` | msp | View aggregate analytics |
| `domains.view` | domains | View organization domains |
| `domains.manage` | domains | Add/verify/remove domains |

---

## Competitor Pricing Analysis

### Direct Pricing Comparison

| Vendor | Starter | Mid-Tier | Pro | Enterprise | Min Users |
|--------|---------|----------|-----|------------|-----------|
| **Exclaimer** | $0.90/user/mo | $1.45/user/mo | $1.75/user/mo | Custom | 10 |
| **CodeTwo** | $0.90/user/mo | $0.81/user/mo (500+) | Volume | Quote | 10 |
| **Rocketseed** | $50/mo min | Per-user | Volume | Quote | 50 |
| **Siggly** | Free | $0.50/user/mo | $29 + $1/user | Custom | 1 |

### MSP Partner Program Comparison

| Aspect | Exclaimer | CodeTwo | Rocketseed | Siggly (Planned) |
|--------|-----------|---------|------------|------------------|
| **Partner Margin** | Up to 20% (tiered) | Not public | **25% flat** | TBD (10-20%) |
| **Tiers** | 3 tiers | Yes | No tiers | 3 planned |
| **Signup** | Application | Application | Application | Application |
| **Consolidated Billing** | ✓ | ✓ | ✓ | Planned |
| **White-Label** | ✓ | ✓ | ✓ | ✅ Built |
| **Minimum Commitment** | 10 users | 10 users | $50/mo | TBD |

### Recommended Siggly MSP Pricing

| Tier | Clients | Margin | Benefits |
|------|---------|--------|----------|
| **Partner** | 1-9 | 15% | MSP dashboard, consolidated billing |
| **Silver** | 10-24 | 20% | + Co-branded assets, deal registration |
| **Gold** | 25+ | 25% | + Priority support, joint marketing |

---

## Implementation Status

### ✅ Completed

| Component | Files |
|-----------|-------|
| Database migration | `apps/web/supabase/migrations/create_msp_multi_tenant.sql` |
| Drizzle schema | `apps/web/src/lib/db/schema.ts` |
| Subdomain middleware | `apps/web/src/middleware.ts` |
| Branding context | `apps/web/src/lib/branding/branding-context.tsx` |
| Server branding helper | `apps/web/src/lib/branding/get-branding.ts` |
| Branding settings UI | `apps/web/src/app/(dashboard)/settings/branding/page.tsx` |
| Branding API | `apps/web/src/app/api/settings/branding/route.ts` |
| Subdomain check API | `apps/web/src/app/api/settings/branding/check-subdomain/route.ts` |
| Settings nav update | `apps/web/src/app/(dashboard)/settings/page.tsx` |
| Partner application form | `apps/web/src/app/partners/apply/page.tsx` |
| Partner application API | `apps/web/src/app/api/partners/apply/route.ts` |
| Admin review UI | `apps/web/src/app/(admin)/admin/partner-applications/page.tsx` |
| Approval/rejection API | `apps/web/src/app/api/admin/partner-applications/[id]/route.ts` |
| Admin nav update | `apps/web/src/components/admin/nav.tsx` |

### 🔲 Remaining

| Component | Priority | Effort |
|-----------|----------|--------|
| MSP dashboard | High | 3-4 days |
| Client management UI | High | 2-3 days |
| Client context switching | High | 2-3 days |
| Multi-domain management | Medium | 2-3 days |
| Consolidated billing | Medium | 3-4 days |
| Aggregate analytics | Low | 2-3 days |
| Approval/rejection emails | Low | 1 day |

---

## White-Label Branding

### Branding Options

| Category | Settings |
|----------|----------|
| **Colors** | Primary, Secondary, Accent (hex values) |
| **Logos** | Main logo, Square icon, Dark mode logo, Favicon |
| **Text** | Company name, Support email, Support URL |
| **Visibility** | Hide Siggly branding, Hide help links |
| **Domain** | Custom subdomain (e.g., `partner.siggly.io`) |

### OrganizationBranding Type

```typescript
type OrganizationBranding = {
  // Colors
  primaryColor?: string;      // Main brand color
  secondaryColor?: string;    // Backgrounds, borders
  accentColor?: string;       // Highlights, notifications
  // Logos
  logoUrl?: string;           // Main logo (~200x50px)
  logoIconUrl?: string;       // Square icon (~64x64px)
  logoDarkUrl?: string;       // Logo for dark backgrounds
  faviconUrl?: string;        // Browser favicon
  // Text
  companyName?: string;       // Display name
  supportEmail?: string;      // Custom support email
  supportUrl?: string;        // Custom help URL
  // Visibility
  hideSigglyBranding?: boolean;  // Hide "Powered by Siggly"
  hideHelpLinks?: boolean;       // Hide Siggly help links
  // Advanced
  customCss?: string;         // CSS overrides (premium)
};
```

### How Subdomain Branding Works

1. **MSP sets subdomain** → `acme-it` in branding settings
2. **DNS configured** → `acme-it.siggly.io` (wildcard cert handles SSL)
3. **User visits subdomain** → Middleware detects it
4. **Middleware looks up org** → Sets `x-msp-branding` header
5. **BrandingProvider reads header** → Applies CSS variables + logo
6. **UI renders with MSP branding** → Custom colors, logo, no "Powered by Siggly"

### Reserved Subdomains

These cannot be used by MSPs:
```
www, app, api, admin, dashboard, help, support, docs, blog, mail, 
status, cdn, static, assets, auth, login, signup, account, billing, 
payment, test, staging, dev, demo, preview, beta, alpha, siggly, 
signature, signatures, email, msp, partner
```

---

## Roles & Permissions

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
| settings.billing | ✓ | - | - | ✓ | - | - |

---

## UX Flows

### Partner Application Flow

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
  - Contact Email/Phone
  - Number of clients
  - Primary services
    │
    ▼
Application submitted → Email to Siggly team
    │
    ▼
Admin Dashboard: /admin/partner-applications
  - Review applications
  - Approve / Reject
    │
    ▼
On Approval:
  - Set organization_type = 'msp'
  - Send welcome email
  - Unlock /msp/* routes
```

### MSP Onboarding (After Approval)

```
1. Welcome Email → [Access Partner Portal]
       │
       ▼
2. First Login → /msp/dashboard
   "Welcome! Let's add your first client."
       │
       ▼
3. Add Client → /msp/clients/new
   - Client Name
   - Primary Domain
   - Contact Info
       │
       ▼
4. Connect Client's Email
   - [Connect Google] [Connect Microsoft]
   - Or [Send Invite to Client Admin]
       │
       ▼
5. MSP Dashboard with Client List
```

### Client Context Switching

```
Header when in MSP context:
┌─────────────────────────────────────────────────────────────────┐
│  Siggly                    [All Clients ▼]    [Acme IT] [👤]    │
└─────────────────────────────────────────────────────────────────┘

Header when in Client context:
┌─────────────────────────────────────────────────────────────────┐
│  Siggly    [← Back to MSP]    [ABC Corp ▼]    [Acme IT] [👤]    │
└─────────────────────────────────────────────────────────────────┘
```

---

## API Routes

### Branding

| Method | Route | Description |
|--------|-------|-------------|
| GET | `/api/settings/branding` | Get current branding settings |
| PUT | `/api/settings/branding` | Update branding settings |
| GET | `/api/settings/branding/check-subdomain?subdomain=xxx` | Check subdomain availability |

### Partner Applications (Planned)

| Method | Route | Description |
|--------|-------|-------------|
| POST | `/api/partners/apply` | Submit partner application |
| GET | `/api/admin/partner-applications` | List applications (admin) |
| PATCH | `/api/admin/partner-applications/[id]` | Approve/reject (admin) |

### MSP Client Management (Planned)

| Method | Route | Description |
|--------|-------|-------------|
| GET | `/api/msp/clients` | List all clients |
| POST | `/api/msp/clients` | Create new client org |
| GET | `/api/msp/clients/[id]` | Get client details |
| PATCH | `/api/msp/clients/[id]` | Update client |
| DELETE | `/api/msp/clients/[id]` | Remove client |
| POST | `/api/msp/clients/[id]/switch` | Switch to client context |

---

## File Reference

### Database

| File | Purpose |
|------|---------|
| `apps/web/supabase/migrations/create_msp_multi_tenant.sql` | All MSP-related migrations |
| `apps/web/src/lib/db/schema.ts` | Drizzle schema with MSP types |

### Branding System

| File | Purpose |
|------|---------|
| `apps/web/src/middleware.ts` | Subdomain detection + header injection |
| `apps/web/src/lib/branding/branding-context.tsx` | React context, `BrandLogo`, `PoweredBySiggly` |
| `apps/web/src/lib/branding/get-branding.ts` | Server-side branding helper |

### UI

| File | Purpose |
|------|---------|
| `apps/web/src/app/(dashboard)/settings/branding/page.tsx` | Branding settings page |
| `apps/web/src/app/(dashboard)/settings/page.tsx` | Settings nav (includes branding link) |

### API

| File | Purpose |
|------|---------|
| `apps/web/src/app/api/settings/branding/route.ts` | GET/PUT branding |
| `apps/web/src/app/api/settings/branding/check-subdomain/route.ts` | Subdomain availability |

---

## Next Steps

### Phase 1: Foundation (Remaining)
- [ ] Partner application form (`/partners/apply`)
- [ ] Admin application review UI (`/admin/partner-applications`)
- [ ] Basic MSP dashboard (`/msp/dashboard`)
- [ ] Add/edit client organizations
- [ ] Client context switching

### Phase 2: Core Features
- [ ] Multi-domain support per organization
- [ ] MSP roles and permissions enforcement
- [ ] Cross-org access control
- [ ] Client context routes (mirror dashboard)
- [ ] Aggregate analytics view

### Phase 3: Billing & Polish
- [ ] Consolidated billing for MSPs
- [ ] Per-client reporting/exports
- [ ] Partner tiers and benefits
- [ ] Deal registration

### Estimated Total Effort

| Phase | Duration |
|-------|----------|
| Phase 1 (remaining) | 2-3 weeks |
| Phase 2 | 3-4 weeks |
| Phase 3 | 2-3 weeks |
| **Total** | **7-10 weeks** |

---

## Decision Criteria

### Build MSP features when:
- You have 50+ direct customers (product-market fit proven)
- MSPs are organically requesting access
- You have capacity for 7-10 weeks of focused development
- You're ready to support partner relationships

### Don't build yet if:
- Still iterating on core product
- Limited development resources
- No MSP demand signals

---

*Last updated: February 2026*
