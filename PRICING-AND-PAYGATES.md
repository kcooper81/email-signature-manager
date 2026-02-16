# Pricing Tiers & Pay Gates Documentation

## Overview
This document outlines all pricing tiers, feature limits, and pay gate implementations across the Siggly application.

## Admin Management

**Admins are FREE** - You can have unlimited admins on any plan. Admins are not counted toward your user limit.

### User Roles
| Role | Description | Permissions |
|------|-------------|-------------|
| **Owner** | Account creator | Full access, can manage all admins |
| **Admin** | Organization administrator | Create templates, deploy signatures, manage integrations, invite users, promote members to admin |
| **Member** | Regular user (signature recipient) | Can self-manage their own profile/links if invited |

### How to Add Admins
1. **Invite New Admin**: Team page → "Invite Admin" button → Enter email → They receive an invite to create an account with admin privileges
2. **Promote Existing User**: Team page → Find user → Click role dropdown → Change from "member" to "admin"

### Permissions Matrix
| Action | Owner | Admin | Member |
|--------|-------|-------|--------|
| Create/edit templates | ✅ | ✅ | ❌ |
| Deploy signatures | ✅ | ✅ | ❌ |
| Manage integrations | ✅ | ✅ | ❌ |
| Add/remove users | ✅ | ✅ | ❌ |
| Promote to admin | ✅ | ✅ | ❌ |
| Demote admin | ✅ | ❌ | ❌ |
| Manage billing | ✅ | ❌ | ❌ |
| Edit own profile | ✅ | ✅ | ✅ |

---

## Pricing Tiers

### Free Plan
**Price:** $0 forever
**Target:** Individuals and small teams getting full access to Siggly

**Limits:**
- **Max Templates:** 1
- **Max Users:** 5
- **Analytics:** 7-day preview only (upgrade for full history)
- **Custom Branding:** ✅ Yes
- **Priority Support:** ❌ No
- **API Access:** ✅ Yes
- **SSO:** ❌ No
- **Remove Watermark:** ✅ Yes

**Integrations:**
- **Google Workspace:** ✅ Yes
- **Microsoft 365:** ❌ No (Professional+)
- **HubSpot CRM:** ✅ Yes
- **Scheduled Deployments:** ✅ Yes

**Features Included:**
- ✅ Up to 5 users
- ✅ 1 signature template
- ✅ Visual drag-and-drop editor
- ✅ Google Workspace integration
- ✅ HubSpot CRM integration
- ✅ Auto-sync user directory (Google + HubSpot)
- ✅ Directory sync
- ✅ One-click deployment
- ✅ Scheduled deployments
- ✅ Bulk operations
- ✅ Mobile-responsive signatures
- ✅ Industry compliance blocks (Legal, Healthcare, Finance, Real Estate)
- ✅ Disclaimer templates
- ✅ Email support
- ✅ Manual signature copy (for non-integrated users)
- ✅ API access
- ✅ Custom branding
- ✅ Remove watermark
- ⚠️ Analytics: 7-day preview (upgrade for full history)

**Disclaimer Engine (Limited):**
- ✅ Up to 2 disclaimer templates
- ✅ 1 disclaimer rule
- ❌ Custom HTML editor (Professional+)
- ❌ Regulatory presets (Professional+)
- ❌ Disclaimer audit trail (Professional+)

**Gated to Professional:**
- ❌ Microsoft 365 integration
- ❌ Full analytics (beyond 7-day preview)
- ❌ Multiple templates (limited to 1)
- ❌ HR sync & directory integration
- ❌ Admin approval workflows
- ❌ Profile completeness analytics (per-user)
- ❌ Unlimited disclaimer templates & rules

**Gated to Enterprise:**
- ❌ Lifecycle automation (0 workflows on Free)
- ❌ Brand governance
- ❌ MSP cascade (disclaimers, lifecycle)
- ❌ Multi-language disclaimers

---

### Professional Plan
**Price:** $1.50/user/month (10-user minimum = $15/month)
**Target:** Growing and professional teams needing MS365, full analytics, and multiple templates

**Limits:**
- **Max Templates:** Unlimited (-1)
- **Max Users:** Unlimited (-1)
- **Analytics:** ✅ Full analytics
- **Custom Branding:** ✅ Yes
- **Priority Support:** ✅ Yes
- **API Access:** ✅ Yes
- **SSO:** ❌ No
- **Remove Watermark:** ✅ Yes

**Integrations:**
- **Google Workspace:** ✅ Yes
- **Microsoft 365:** ✅ Yes
- **HubSpot CRM:** ✅ Yes
- **Scheduled Deployments:** ✅ Yes

**Everything Unlocked:**
- ✅ Unlimited users ($1.50/user/month, 10-user minimum)
- ✅ Unlimited templates
- ✅ Microsoft 365 integration
- ✅ Full analytics dashboard
- ✅ HubSpot CRM integration
- ✅ Advanced analytics
- ✅ API access
- ✅ Scheduled deployments
- ✅ Bulk operations
- ✅ Directory sync
- ✅ Compliance blocks
- ✅ Priority support
- ✅ Custom branding
- ✅ Remove watermark

**Disclaimer Engine (Full):**
- ✅ Unlimited disclaimer templates
- ✅ Unlimited disclaimer rules
- ✅ Custom HTML editor
- ✅ Regulatory presets (HIPAA, GDPR, etc.)
- ✅ Disclaimer audit trail
- ❌ MSP cascade (Enterprise)
- ❌ Multi-language disclaimers (Enterprise)

**HR Sync & Directory Integration:**
- ✅ HR integrations (BambooHR, Workday, etc.)
- ✅ Admin approval workflows
- ✅ Profile completeness analytics (per-user)
- ❌ Realtime sync (Enterprise)
- ❌ MSP-managed sync (Enterprise)

**Lifecycle Automation:**
- ✅ Up to 5 lifecycle workflows
- ❌ Webhook actions (Enterprise)
- ❌ MSP cascade (Enterprise)

**Gated to Enterprise:**
- ❌ Brand governance
- ❌ SSO
- ❌ White label

---

### Enterprise Plan
**Price:** Custom pricing
**Target:** Large organizations with custom requirements

**Limits:**
- **Max Templates:** Unlimited (-1)
- **Max Users:** Unlimited (-1)
- **Analytics:** ✅ Yes
- **Custom Branding:** ✅ Yes
- **Priority Support:** ✅ Yes
- **API Access:** ✅ Yes
- **SSO:** ✅ Yes
- **Remove Watermark:** ✅ Yes
- **White Label:** ✅ Yes

**Integrations:**
- **Google Workspace:** ✅ Yes
- **Microsoft 365:** ✅ Yes
- **HubSpot CRM:** ✅ Yes
- **Scheduled Deployments:** ✅ Yes

**Additional Features (beyond Professional):**
- ✅ Everything in Professional
- ✅ SSO (Single Sign-On)
- ✅ White label
- ✅ Dedicated account manager
- ✅ Custom integrations
- ✅ SLA guarantee
- ✅ Advanced security features

**Disclaimer Engine (Enterprise):**
- ✅ Everything in Professional disclaimers
- ✅ MSP cascade (cascade disclaimers to MSP clients)
- ✅ Multi-language disclaimers (non-English locales)

**HR Sync (Enterprise):**
- ✅ Everything in Professional HR sync
- ✅ Realtime sync schedule type
- ✅ MSP-managed sync

**Lifecycle Automation (Enterprise):**
- ✅ Unlimited lifecycle workflows
- ✅ Webhook actions in workflows
- ✅ MSP cascade (cascade workflows to MSP clients)

**Brand Governance (Enterprise Only):**
- ✅ Brand Hub
- ✅ Brand Guidelines management
- ✅ Brand Audit (per-user compliance)

---

## Pay Gate Architecture

### Centralized System
All pay gates use a **shared architecture** to ensure consistency:

```
plans.ts (Source of Truth)
    ↓
├─ useSubscription() Hook (Frontend)
├─ getPlan() Function (Backend - existing routes)
├─ plan-guard.ts (Backend - new expansion routes)
│  ├─ getOrgPlan() — resolves org subscription
│  ├─ checkFeature() — boolean feature check
│  ├─ checkLimit() — numeric limit check
│  ├─ planDenied() — 403 response helper
│  └─ limitDenied() — 403 response helper
├─ field-allowlists.ts (Backend - PUT security)
│  └─ pickAllowed() — strips unauthorized fields
    ↓
├─ UI Components
│  ├─ <UpgradePrompt>
│  ├─ <FeatureGate> (13 new features added)
│  └─ <LimitGate>
│
└─ API Endpoints (35+ routes now gated)
```

### Shared Components

**Frontend:**
- `useSubscription()` - Hook providing plan data and limit checks
- `<UpgradePrompt>` - Reusable upgrade UI component
- `<FeatureGate>` - Wraps features requiring specific plans
- `<LimitGate>` - Wraps actions that hit usage limits

**Backend:**
- `getPlan(planId)` - Returns plan configuration
- `canAccessFeature()` - Checks feature access
- `isWithinLimit()` - Checks usage limits
- `getOrgPlan()` - Resolves org subscription to plan (plan-guard.ts)
- `checkFeature()` - Boolean feature check with 403 helper (plan-guard.ts)
- `checkLimit()` - Numeric limit check with 403 helper (plan-guard.ts)
- `pickAllowed()` - Strips unauthorized fields from PUT bodies (field-allowlists.ts)

---

## Complete Pay Gate List

### 1. Template Creation Limit
**Location:** `/templates` page
**Type:** Usage Limit
**Check:** `canCreateTemplate()`
**Enforcement:**
- Disables "New Template" button when limit reached
- Shows "Upgrade to Create More" button
- Displays usage indicator (e.g., "1 of 1 templates")

**Limits:**
- Free: 1 template
- Professional: Unlimited
- Enterprise: Unlimited

---

### 2. Team Member Addition Limit
**Location:** `/team` page
**Type:** Usage Limit
**Check:** `canAddTeamMember()`
**Enforcement:**
- Prevents manual "Add Member" action
- Shows upgrade prompt
- Displays usage indicator (e.g., "5 of 5 members")

**Limits:**
- Free: 5 users
- Professional: Unlimited
- Enterprise: Unlimited

---

### 3. Microsoft 365 Sync Limit
**Location:** `/api/integrations/microsoft/sync`  
**Type:** Usage Limit (Backend)  
**Check:** `maxUsers` from plan  
**Enforcement:**
- Returns 403 Forbidden if limit reached
- Partial sync if slots available
- Error message: "Your [Plan] allows up to [X] users. Please upgrade."

**Behavior:**
- Counts existing users in organization
- Calculates available slots: `maxUsers - currentCount`
- Syncs only up to available slots
- Skips remaining users

---

### 4. Google Workspace Sync Limit
**Location:** `/api/integrations/google/sync`  
**Type:** Usage Limit (Backend)  
**Check:** `maxUsers` from plan  
**Enforcement:**
- Returns 403 Forbidden if limit reached
- Partial sync if slots available
- Error message: "Your [Plan] allows up to [X] users. Please upgrade."

**Behavior:**
- Counts existing users in organization
- Calculates available slots: `maxUsers - currentCount`
- Syncs only up to available slots
- Skips remaining users

---

### 5. HubSpot CRM Sync Limit
**Location:** `/api/integrations/hubspot/sync`  
**Type:** Usage Limit (Backend)  
**Check:** `maxUsers` from plan  
**Enforcement:**
- Returns 403 Forbidden if limit reached
- Partial sync if slots available
- Error message: "Your [Plan] allows up to [X] users. Please upgrade."

**Behavior:**
- Counts existing users in organization
- Calculates available slots: `maxUsers - currentCount`
- Syncs only up to available slots
- Skips remaining contacts

---

### 6. Analytics Access (Full)
**Location:** `/analytics` page
**Type:** Feature Gate
**Check:** `canAccess('analytics')`
**Enforcement:**
- Free plan: Shows 7-day analytics preview with upgrade prompt for full history
- Shows "Upgrade to unlock full analytics" message

**Note:** Free plan users get a 7-day analytics preview. Full analytics history requires Professional plan or higher.

**Requirement:** Professional plan or higher (for full analytics)

---

### 7. Microsoft 365 Integration Access
**Location:** `/integrations` page
**Type:** Feature Gate
**Check:** `microsoft365` feature flag
**Enforcement:**
- Shows "Upgrade Required" on Free plan
- Connect button disabled
- Upgrade prompt displayed

**Requirement:** Professional plan or higher

---

### 8. HubSpot CRM Integration Access
**Location:** `/integrations` page
**Type:** Feature Gate
**Check:** `hubspotCRM` feature flag
**Enforcement:**
- Available on all plans (Free, Professional, Enterprise)
- Connect button enabled for all users

**Requirement:** None (available on Free plan and above)

---

### 9. Scheduled Deployments
**Location:** Deployment settings
**Type:** Feature Gate
**Check:** `canAccess('scheduledDeployments')`
**Enforcement:**
- Available on all plans (Free, Professional, Enterprise)
- No upgrade prompt needed

**Requirement:** None (available on Free plan and above)

---

### 10. API Access
**Location:** API endpoints & settings
**Type:** Feature Gate
**Check:** `canAccess('apiAccess')`
**Enforcement:**
- Available on all plans (Free, Professional, Enterprise)
- API keys enabled for all users

**Requirement:** None (available on Free plan and above)

---

### 11. SSO (Single Sign-On)
**Location:** Authentication settings  
**Type:** Feature Gate  
**Check:** `canAccess('sso')`  
**Enforcement:**
- SSO settings hidden
- Shows upgrade prompt
- Feature unavailable

**Requirement:** Enterprise plan only

---

### 12. White Label
**Location:** Branding settings
**Type:** Feature Gate
**Check:** `canAccess('whiteLabel')`
**Enforcement:**
- Branding removal disabled
- Shows upgrade prompt
- Feature unavailable

**Requirement:** Enterprise plan only

---

### 13. Disclaimer Engine
**Location:** `/settings/disclaimers` page, `/api/disclaimers/` routes
**Type:** Multiple gates (Usage Limits + Feature Gates)

**Sub-Gates:**

| Feature Key | Free | Professional | Enterprise | Description |
|-------------|------|-------------|------------|-------------|
| `maxDisclaimerTemplates` | 2 | Unlimited | Unlimited | Number of disclaimer templates |
| `maxDisclaimerRules` | 1 | Unlimited | Unlimited | Number of disclaimer rules |
| `disclaimerHtmlEditor` | ❌ | ✅ | ✅ | Custom HTML in disclaimer templates |
| `disclaimerRegulatoryPresets` | ❌ | ✅ | ✅ | Regulatory preset templates (HIPAA, GDPR, etc.) |
| `disclaimerAuditTrail` | ❌ | ✅ | ✅ | View disclaimer deployment history |
| `disclaimerMspCascade` | ❌ | ❌ | ✅ | Cascade disclaimers to MSP clients |
| `disclaimerMultiLanguage` | ❌ | ❌ | ✅ | Non-English disclaimer locales |

**Backend Enforcement:** All POST routes check limits, PUT routes use field allowlists (no raw body spread)
**Frontend:** Presets and Audit tabs locked on disclaimers page for Free users

---

### 14. HR Sync & Directory Integration
**Location:** `/settings/hr-sync` page, `/api/hr-sync/` routes
**Type:** Multiple gates (Feature Gates)

**Sub-Gates:**

| Feature Key | Free | Professional | Enterprise | Description |
|-------------|------|-------------|------------|-------------|
| `hrIntegrations` | ❌ | ✅ | ✅ | Base gate — blocks Free from ALL HR sync routes |
| `hrRealtimeSync` | ❌ | ❌ | ✅ | Realtime sync schedule type |
| `hrMspManaged` | ❌ | ❌ | ✅ | MSP-managed sync |
| `selfServiceAdminApproval` | ❌ | ✅ | ✅ | Admin approval workflows for profile changes |
| `profileCompletenessAnalytics` | ❌ | ✅ | ✅ | Per-user completeness details (Free gets aggregate only) |

**Backend Enforcement:** Every HR sync route checks `hrIntegrations` first. Config PUT uses field allowlist.
**Frontend:** HR Sync page wrapped with FeatureGate for `hrIntegrations`

---

### 15. Lifecycle Automation
**Location:** `/settings/automation` page, `/api/lifecycle/` routes
**Type:** Usage Limit + Feature Gates

**Sub-Gates:**

| Feature Key | Free | Professional | Enterprise | Description |
|-------------|------|-------------|------------|-------------|
| `maxLifecycleWorkflows` | 0 | 5 | Unlimited | Number of lifecycle workflows |
| `lifecycleWebhooks` | ❌ | ❌ | ✅ | Webhook actions in workflows |
| `lifecycleMspCascade` | ❌ | ❌ | ✅ | Cascade workflows to MSP clients |

**Backend Enforcement:** All lifecycle routes check `maxLifecycleWorkflows`. Workflow POST checks limit count. Webhook actions blocked at both API and workflow-runner level. Workflow test route validates testUserId belongs to same org.
**Frontend:** Automation page wrapped with FeatureGate for `maxLifecycleWorkflows`

---

### 16. Brand Governance
**Location:** `/brand` pages, `/api/brand/` routes
**Type:** Feature Gate
**Check:** `checkFeature('brandGovernance')`

**Sub-Gates:**

| Feature Key | Free | Professional | Enterprise | Description |
|-------------|------|-------------|------------|-------------|
| `brandGovernance` | ❌ | ❌ | ✅ | Gates ALL brand routes |

**Backend Enforcement:** All 7 brand API routes check `brandGovernance`. The `brand/audit/[userId]` route has role check (admin/owner) and validates userId belongs to same org.
**Frontend:** Brand Hub, Guidelines, and Audit pages all wrapped with FeatureGate for `brandGovernance`

---

## Development Bypass

### Environment Variable
```bash
NEXT_PUBLIC_BYPASS_PAY_GATES=true
```

### UI Toggle
A development-only toggle appears in the bottom-right corner of the dashboard:
- Only visible when `NODE_ENV === 'development'`
- Stores state in `localStorage.dev_bypass_pay_gates`
- Requires page refresh after toggling
- Bypasses ALL pay gates when enabled

### How It Works
```typescript
const getDevBypassEnabled = () => {
  if (typeof window === 'undefined') 
    return process.env.NEXT_PUBLIC_BYPASS_PAY_GATES === 'true';
  return localStorage.getItem('dev_bypass_pay_gates') === 'true' 
    || process.env.NEXT_PUBLIC_BYPASS_PAY_GATES === 'true';
};
```

---

## Pay Gate Enforcement Flow

### Frontend (UI)
1. Component imports `useSubscription()` hook
2. Hook provides plan data and limit check functions
3. Component calls check function (e.g., `canCreateTemplate()`)
4. If check fails, show `<UpgradePrompt>` or disable action
5. User sees upgrade message with plan requirements

### Backend (API)
1. API endpoint receives request
2. Fetches user's subscription from database
3. Calls `getPlan(planId)` to get plan limits
4. Counts current usage (e.g., existing users)
5. Calculates available capacity
6. If limit reached: Return 403 with error message
7. If capacity available: Process request (partial sync if needed)

---

## Testing Pay Gates

### Manual Testing
1. **Enable dev bypass:** Toggle in bottom-right corner
2. **Test unlimited access:** All features should work
3. **Disable dev bypass:** Toggle off and refresh
4. **Test free plan limits:**
   - Try creating 2nd template (should block)
   - Try adding 6th user (should block)
   - Try accessing full analytics (should show 7-day preview only)
   - Try connecting Microsoft 365 (should block)
   - Verify HubSpot, bulk ops, compliance blocks, directory sync, scheduled deployments all work on Free
5. **Test sync limits:**
   - Sync more than 5 users (should partial sync or block)
   - Check error messages are clear

### Automated Testing
- Unit tests for `useSubscription()` hook
- Integration tests for sync endpoints
- E2E tests for upgrade flows

---

## Common Scenarios

### Scenario 1: User Hits Template Limit
**User Action:** Clicks "New Template" button  
**System Check:** `canCreateTemplate()` returns false  
**Result:** Button shows "Upgrade to Create More"  
**User Experience:** Sees usage indicator "1 of 1 templates" and upgrade prompt

### Scenario 2: Sync Exceeds User Limit
**User Action:** Syncs 10 users from MS365 on Free plan  
**System Check:** `maxUsers = 5`, `currentCount = 3`, `availableSlots = 2`  
**Result:** Only syncs first 2 users, returns success with warning  
**User Experience:** Sees "Synced 2 of 10 users. Upgrade to sync more."

### Scenario 3: Sync at Limit
**User Action:** Syncs users when already at 5/5 limit  
**System Check:** `availableSlots = 0`  
**Result:** Returns 403 Forbidden  
**User Experience:** Error message "Your Free plan allows up to 5 users. Please upgrade."

### Scenario 4: Feature Access Denied
**User Action:** Tries to access full Analytics on Free plan
**System Check:** `canAccess('analytics')` returns false for full access
**Result:** Shows 7-day analytics preview with upgrade prompt for full history
**User Experience:** Sees "Upgrade to Professional to unlock full Analytics"

### Scenario 5: Free Plan Feature Access
**User Action:** Tries to use HubSpot, bulk ops, compliance blocks, directory sync, or scheduled deployments on Free plan
**System Check:** These features are available on all plans
**Result:** Features work normally
**User Experience:** Full access to these features with no upgrade prompts

---

## File Locations

### Core Files
- **Plans Definition:** `src/lib/billing/plans.ts`
- **Subscription Hook:** `src/hooks/use-subscription.tsx`
- **UI Components:** `src/components/billing/upgrade-prompt.tsx`
- **Dev Toggle:** `src/components/billing/dev-bypass-toggle.tsx`

### Pay Gate Implementations
- **Templates Page:** `src/app/(dashboard)/templates/page.tsx`
- **Team Page:** `src/app/(dashboard)/team/page.tsx`
- **Analytics Page:** `src/app/(dashboard)/analytics/page.tsx`
- **MS365 Sync:** `src/app/api/integrations/microsoft/sync/route.ts`
- **Google Sync:** `src/app/api/integrations/google/sync/route.ts`
- **HubSpot Sync:** `src/app/api/integrations/hubspot/sync/route.ts`

### Platform Expansion (v3.0)
- **Plan Guard:** `src/lib/billing/plan-guard.ts`
- **Field Allowlists:** `src/lib/api/field-allowlists.ts`
- **Disclaimers Routes:** `src/app/api/disclaimers/`
- **HR Sync Routes:** `src/app/api/hr-sync/`
- **Lifecycle Routes:** `src/app/api/lifecycle/`
- **Brand Routes:** `src/app/api/brand/`
- **Profile Routes:** `src/app/api/profile/`
- **Cron Route:** `src/app/api/cron/hr-sync/`
- **Disclaimers Page:** `src/app/(dashboard)/settings/disclaimers/`
- **HR Sync Page:** `src/app/(dashboard)/settings/hr-sync/`
- **Automation Page:** `src/app/(dashboard)/settings/automation/`
- **Brand Pages:** `src/app/(dashboard)/brand/`
- **Validation Rules Page:** `src/app/(dashboard)/settings/validation-rules/`

---

## Maintenance Notes

### Adding a New Pay Gate
1. Define limit/feature in `plans.ts`
2. Add check function to `useSubscription()` hook (if needed)
3. Implement UI check using `<FeatureGate>` or `<LimitGate>`
4. Add backend enforcement in API route (if applicable)
5. Test with dev bypass on/off
6. Update this documentation

### Changing Plan Limits
1. Update `PLANS` object in `plans.ts`
2. All pay gates automatically use new limits
3. No other code changes needed
4. Test affected features
5. Update this documentation

### Debugging Pay Gates
1. Check dev bypass is OFF
2. Verify subscription data in database
3. Check `useSubscription()` hook returns correct plan
4. Console log limit check results
5. Verify API endpoints receive correct plan data
6. Check error messages are clear and helpful

---

## Future Enhancements

### Potential Improvements
- [ ] Warning before hitting limits (e.g., "2 slots remaining")
- [ ] Upgrade CTA in sync UI when limit reached
- [ ] Sync preview showing "X users will sync, Y skipped"
- [ ] Audit log for limit hits (analytics)
- [ ] Grace period for recently downgraded accounts
- [ ] Soft limits vs hard limits
- [ ] Usage notifications/alerts
- [ ] Plan comparison modal in upgrade prompts

---

## Security Fixes (v3.0)

### PUT Route Field Allowlists
All PUT routes in the platform expansion use `pickAllowed()` from `field-allowlists.ts` instead of spreading the raw request body (`...body`). This prevents users from injecting unauthorized fields (e.g., setting `orgId`, `planOverride`, or other protected fields) through API requests.

### Webhook SSRF Prevention
Lifecycle automation webhook actions include SSRF (Server-Side Request Forgery) protection:
- Private IP address blocking (10.x, 172.16-31.x, 192.168.x, 127.x)
- Localhost blocking (localhost, 0.0.0.0, ::1)
- 10-second timeout on all outbound webhook requests
- Blocked URLs return a clear error without making the request

### Cron Route Authentication
The cron route (`/api/cron/hr-sync/`) now returns HTTP 500 when the `CRON_SECRET` environment variable is unset. Previously, an unset secret would skip authentication entirely, allowing unauthenticated access to the cron endpoint.

### Brand Audit User Validation
The `brand/audit/[userId]` route validates that:
- The requesting user has admin or owner role
- The target `userId` belongs to the same organization as the requester
- This prevents cross-org data access through the audit endpoint

### Lifecycle Workflow Test Validation
The `lifecycle/workflows/[id]/test` route validates that:
- The `testUserId` provided in the request belongs to the same organization
- This prevents testing workflows against users in other organizations

---

## Support & Troubleshooting

### Common Issues

**Issue:** Pay gates not enforcing  
**Solution:** Check dev bypass is disabled, verify subscription data

**Issue:** Sync stops at wrong limit  
**Solution:** Check user count query includes correct organization filter

**Issue:** Upgrade prompt not showing  
**Solution:** Verify `useSubscription()` hook is properly wrapped in provider

**Issue:** 403 errors on sync  
**Solution:** Check plan limits, verify user hasn't hit limit

---

*Last Updated: February 16, 2026*
*Version: 3.0 - Platform expansion: Disclaimer engine, HR sync, lifecycle automation, brand governance with 13 new feature gates and security hardening*
