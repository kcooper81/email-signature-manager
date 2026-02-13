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
| **Foundation** |
| Database migration | `apps/web/supabase/migrations/create_msp_multi_tenant.sql` |
| Drizzle schema | `apps/web/src/lib/db/schema.ts` |
| **White-Label Branding** |
| Subdomain middleware | `apps/web/src/middleware.ts` |
| Branding context | `apps/web/src/lib/branding/branding-context.tsx` |
| Server branding helper | `apps/web/src/lib/branding/get-branding.ts` |
| Branding settings UI | `apps/web/src/app/(dashboard)/settings/branding/page.tsx` |
| Branding API | `apps/web/src/app/api/settings/branding/route.ts` |
| Subdomain check API | `apps/web/src/app/api/settings/branding/check-subdomain/route.ts` |
| **Partner Application Flow** |
| Partner application form | `apps/web/src/app/partners/apply/page.tsx` |
| Partner application API | `apps/web/src/app/api/partners/apply/route.ts` |
| Admin review UI | `apps/web/src/app/(admin)/admin/partner-applications/page.tsx` |
| Approval/rejection API | `apps/web/src/app/api/admin/partner-applications/[id]/route.ts` |
| Partner email templates | `apps/web/src/lib/email/resend.ts` |
| **Client Management** |
| Client management UI | `apps/web/src/app/(dashboard)/clients/page.tsx` |
| Client management API | `apps/web/src/app/api/msp/clients/route.ts` |
| MSP context hook | `apps/web/src/hooks/use-msp-context.tsx` |
| Effective org resolver | `apps/web/src/lib/msp/get-effective-org.ts` |
| Billing overview API | `apps/web/src/app/api/msp/billing/route.ts` |
| Partner coupon system | `apps/web/src/lib/billing/partner-coupons.ts` |

### 🔲 Remaining

| Component | Priority | Effort | Notes |
|-----------|----------|--------|-------|
| Multi-domain management | Medium | 2-3 days | Allow clients to have multiple domains |
| Client analytics dashboard | Low | 2-3 days | Aggregate stats across all clients |
| Advanced access controls | Low | 2 days | Granular permissions per MSP user |
| Client self-service portal | Low | 3-4 days | Limited admin access for client admins |
| Partner tier upgrades | Low | 1 day | Upgrade from registered → authorized → premier |

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
/partners/apply (Application Form)
    │
    ▼
Applicant fills out:
  - Company Name *
  - Website
  - Contact Name *
  - Contact Email *
  - Contact Phone
  - Number of Clients
  - Primary Services (checkboxes)
  - How did you hear about us?
  - Preferred Subdomain (optional)
  - Additional Notes
    │
    ▼
POST /api/partners/apply
  ├─ Validates required fields
  ├─ Checks for existing organization (if user logged in)
  ├─ Creates partner_applications record (status: 'pending')
  ├─ Stores preferred subdomain in additional_notes
  ├─ Sends confirmation email to applicant
  └─ Sends notification to Siggly team
    │
    ▼
Applicant sees: "Application submitted! We'll review within 2-3 business days."
```

### Admin Approval Process

```
Admin Dashboard: /admin/partner-applications
    │
    ▼
Admin reviews application:
  - Company details
  - Number of clients
  - Services offered
  - Preferred subdomain
    │
    ├─────────────────┬─────────────────┐
    ▼                 ▼                 ▼
[Approve]        [Reject]         [Mark Under Review]
    │
    ▼
PATCH /api/admin/partner-applications/[id]
{
  action: 'approve',
  subdomain: 'acme-it',
  partnerTier: 'registered',  // or 'authorized', 'premier'
  reviewNotes: 'Approved - great fit'
}
    │
    ▼
Backend Process:
  1. Validate subdomain (3-63 chars, not reserved)
  2. Check subdomain availability
  3. Decision: New org or convert existing?
     │
     ├─ If existing_organization_id exists:
     │    └─ UPDATE organizations SET
     │         organization_type = 'msp',
     │         partner_tier = 'registered',
     │         custom_subdomain = 'acme-it',
     │         branding = {}
     │
     └─ If new organization:
          ├─ CREATE organization (type: 'msp')
          ├─ Link user account (role: 'owner')
          └─ If no user exists:
               └─ Create user + invite token (14-day expiry)
  4. Update application (status: 'approved')
  5. Create/verify Stripe partner coupon
     - Registered: 15% discount
     - Authorized: 20% discount
     - Premier: 25% discount
  6. Store partner_coupon_tier in org metadata
  7. Create audit log
  8. Send approval email with portal URL
    │
    ▼
Partner receives email:
  Subject: "Welcome to the Siggly Partner Program!"
  - Portal URL: https://acme-it.siggly.io
  - Partner tier: Registered
  - Next steps: Add your first client
```

### What Happens After Approval

**Organization Setup:**
- ✅ Organization created/converted with `organization_type: 'msp'`
- ✅ Partner tier assigned (`registered`, `authorized`, or `premier`)
- ✅ Custom subdomain configured (e.g., `acme-it.siggly.io`)
- ✅ Empty branding object initialized (ready for customization)
- ✅ Stripe discount coupon created and linked

**User Access:**
- ✅ Contact email linked as organization owner
- ✅ If new user: invite sent (14-day expiration)
- ✅ If existing user: role updated to owner

**Portal Access:**
- ✅ Partner can log in at `acme-it.siggly.io`
- ✅ Middleware detects subdomain → applies branding
- ✅ Same Siggly app, white-labeled experience
- ✅ Access to `/clients` page for client management

**Billing:**
- ✅ Partner discount stored in metadata
- ⏳ Applied automatically when partner subscribes
- ⏳ Discount applies to all future invoices

### MSP Client Management Flow

```
Partner logs in → /clients
    │
    ▼
[Add Client] button
    │
    ▼
Add Client Form:
  - Company Name * (e.g., "ABC Corporation")
  - Domain (optional, e.g., "abc.com")
  - Admin First Name
  - Admin Last Name
  - Admin Email * (e.g., "john@abc.com")
    │
    ▼
POST /api/msp/clients
  ├─ Validates user is in MSP organization
  ├─ Checks user has owner/admin role
  ├─ Creates client organization:
  │    organization_type: 'msp_client'
  │    parent_organization_id: [MSP org ID]
  ├─ Creates invite for client admin:
  │    role: 'owner'
  │    expires: 7 days
  ├─ Grants MSP access:
  │    msp_client_access table
  │    access_level: 'full'
  ├─ Creates audit log
  └─ Sends invite email to client admin
    │
    ▼
Response includes invite URL:
  https://siggly.io/invite/[token]
    │
    ▼
Partner can:
  - Copy invite link
  - Email it to client
  - Client clicks link → creates account → joins org
```

### Client Context Switching

```
MSP Dashboard: /clients
┌─────────────────────────────────────────────────────────────────┐
│  Client List:                                                    │
│  ┌──────────────────────────────────────────────────────────┐   │
│  │ ABC Corporation                    [Manage] button       │   │
│  │ abc.com • 25 users • Added Jan 15                        │   │
│  └──────────────────────────────────────────────────────────┘   │
│  ┌──────────────────────────────────────────────────────────┐   │
│  │ XYZ Inc                            [Manage] button       │   │
│  │ xyz.com • 12 users • Added Feb 1                         │   │
│  └──────────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────────┘

When [Manage] clicked:
  1. useMspContext.switchToClient({ id, name, domain })
  2. Stores in localStorage: 'msp_client_context'
  3. Sets cookie: 'msp_client_org' = client_id
  4. Redirects to /dashboard
  5. All API calls now scoped to client org

Header when viewing client:
┌─────────────────────────────────────────────────────────────────┐
│  [← Back to Clients]    Viewing: ABC Corporation    [Acme IT]   │
└─────────────────────────────────────────────────────────────────┘

Server-side context resolution:
  1. Read 'msp_client_org' cookie
  2. Validate MSP user has access:
     - User's org is type 'msp'
     - Client org has parent_organization_id = MSP org
     - Client org is type 'msp_client'
  3. Return effective org ID (client org)
  4. MSP user acts as 'admin' in client context
```

### Data Scoping Architecture

```typescript
// Client-side: Switch context
const { switchToClient } = useMspContext();
switchToClient({ id: 'client-123', name: 'ABC Corp', domain: 'abc.com' });
// Sets localStorage + cookie

// Server-side: Resolve effective org
const effectiveOrg = await getEffectiveOrg();
// Returns:
{
  organizationId: 'client-123',  // The client org
  userId: 'msp-user-456',        // MSP user ID
  userRole: 'admin',             // MSP acts as admin
  isMspContext: true,            // Flag for MSP context
  mspOrgId: 'msp-789'           // Original MSP org
}

// All queries automatically scoped
const signatures = await db.query.signatures.findMany({
  where: eq(signatures.organization_id, effectiveOrg.organizationId)
});
// Returns signatures for ABC Corp, not MSP org
```

### Multi-Tenant Hierarchy

```
Organizations Table:
┌─────────────────────────────────────────────────────────────────┐
│ Acme IT Services                                                │
│ id: msp-789                                                     │
│ organization_type: 'msp'                                        │
│ partner_tier: 'registered'                                      │
│ custom_subdomain: 'acme-it'                                     │
│ parent_organization_id: NULL                                    │
└─────────────────────────────────────────────────────────────────┘
                          │
        ┌─────────────────┴─────────────────┐
        ▼                                   ▼
┌──────────────────────┐         ┌──────────────────────┐
│ ABC Corporation      │         │ XYZ Inc              │
│ id: client-123       │         │ id: client-456       │
│ type: 'msp_client'   │         │ type: 'msp_client'   │
│ parent_id: msp-789   │         │ parent_id: msp-789   │
└──────────────────────┘         └──────────────────────┘
```

---

## API Routes

### Branding

| Method | Route | Description |
|--------|-------|-------------|
| GET | `/api/settings/branding` | Get current branding settings |
| PUT | `/api/settings/branding` | Update branding settings |
| GET | `/api/settings/branding/check-subdomain?subdomain=xxx` | Check subdomain availability |

### Partner Applications

| Method | Route | Description | Status |
|--------|-------|-------------|--------|
| POST | `/api/partners/apply` | Submit partner application | ✅ Built |
| GET | `/api/admin/partner-applications` | List applications (admin) | ✅ Built |
| PATCH | `/api/admin/partner-applications/[id]` | Approve/reject (admin) | ✅ Built |

**Approval Request Body:**
```json
{
  "action": "approve",
  "subdomain": "acme-it",
  "partnerTier": "registered",
  "reviewNotes": "Approved - great fit"
}
```

**Rejection Request Body:**
```json
{
  "action": "reject",
  "reviewNotes": "Not enough clients",
  "sendNotification": true
}
```

### MSP Client Management

| Method | Route | Description | Status |
|--------|-------|-------------|--------|
| GET | `/api/msp/clients` | List all clients | ✅ Built |
| POST | `/api/msp/clients` | Create new client org | ✅ Built |
| GET | `/api/msp/billing` | Get billing summary | ✅ Built |

**Create Client Request:**
```json
{
  "name": "ABC Corporation",
  "domain": "abc.com",
  "adminEmail": "john@abc.com",
  "adminFirstName": "John",
  "adminLastName": "Smith"
}
```

**Response:**
```json
{
  "success": true,
  "client": { "id": "...", "name": "ABC Corporation" },
  "inviteUrl": "https://siggly.io/invite/[token]",
  "message": "Client created. Invite sent to john@abc.com"
}
```

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
