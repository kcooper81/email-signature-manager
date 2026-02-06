# Paygate & Plan Limits Reference

This document is the **single source of truth** for all plan-based restrictions in Siggly.

## Quick Reference

| Feature | Free | Starter | Professional | Enterprise |
|---------|------|---------|--------------|------------|
| **Templates** | 1 | 5 | Unlimited | Unlimited |
| **Team Members** | 5 | Unlimited | Unlimited | Unlimited |
| **Google Workspace** | ✅ | ✅ | ✅ | ✅ |
| **Microsoft 365** | ❌ | ✅ | ✅ | ✅ |
| **HubSpot CRM** | ❌ | ❌ | ✅ | ✅ |
| **Analytics** | ❌ | ✅ | ✅ | ✅ |
| **Custom Branding** | ❌ | ✅ | ✅ | ✅ |
| **Remove Watermark** | ❌ | ✅ | ✅ | ✅ |
| **Scheduled Deployments** | ❌ | ❌ | ✅ | ✅ |
| **API Access** | ❌ | ❌ | ✅ | ✅ |
| **Priority Support** | ❌ | ❌ | ✅ | ✅ |
| **SSO/SAML** | ❌ | ❌ | ❌ | ✅ |
| **White Label** | ❌ | ❌ | ❌ | ✅ |

---

## Source Files

### 1. Plan Definitions
**File:** `apps/web/src/lib/billing/plans.ts`

This is where `PlanFeatures` interface and `PLANS` object are defined. All feature flags and limits must be defined here.

### 2. Gate Components
**File:** `apps/web/src/components/billing/upgrade-prompt.tsx`

Contains:
- `FeatureGate` - Wraps content that requires a specific feature
- `LimitGate` - Wraps content that has usage limits
- `UpgradePrompt` - Shows upgrade CTA
- `featureRequirements` - Maps features to minimum required plan
- `limitRequirements` - Defines limits per plan

### 3. Subscription Hook
**File:** `apps/web/src/hooks/use-subscription.tsx`

Provides:
- `useSubscription()` - Returns plan, usage, limits, helper functions
- `usePayGatesBypass()` - Dev bypass toggle state

---

## How to Gate Features

### Option 1: Use FeatureGate Component (Recommended)

```tsx
import { FeatureGate } from '@/components/billing';

// Wraps content - shows upgrade prompt if no access
<FeatureGate feature="microsoft365">
  <MicrosoftIntegrationPanel />
</FeatureGate>

// With custom fallback
<FeatureGate feature="analytics" fallback={<LockedAnalyticsPlaceholder />}>
  <AnalyticsDashboard />
</FeatureGate>
```

### Option 2: Use LimitGate Component

```tsx
import { LimitGate } from '@/components/billing';

// For template limits
<LimitGate type="template">
  <CreateTemplateButton />
</LimitGate>

// For team member limits
<LimitGate type="teamMember">
  <AddMemberButton />
</LimitGate>
```

### Option 3: Manual Check (When components don't work)

```tsx
import { useSubscription, usePayGatesBypass } from '@/hooks/use-subscription';

const { plan, limits, usage } = useSubscription();
const devBypass = usePayGatesBypass();

// Feature check
const hasAccess = devBypass || plan.features.microsoft365;

// Limit check
const canCreate = devBypass || limits.maxTemplates === -1 || usage.templateCount < limits.maxTemplates;
```

---

## Enforcement Locations

### Templates
| Location | Check Type | Status |
|----------|------------|--------|
| `/templates` page | Display count | ✅ Uses `templates.length` |
| `/templates/new` page | Block creation | ✅ Checks limit on mount |
| Template list "New Template" button | Show lock icon | ✅ Uses `canCreate` |

### Team Members
| Location | Check Type | Status |
|----------|------------|--------|
| `/team` page | Block add | ✅ `canAddTeamMember()` check |
| Sync users | Block if limit | ✅ Checked in sync |

### Integrations
| Location | Check Type | Status |
|----------|------------|--------|
| `/integrations` - Microsoft 365 | Show upgrade | ✅ `hasMicrosoft365Access` |
| `/integrations` - HubSpot | Show upgrade | ✅ `hasHubSpotAccess` |
| `/integrations` - Google | No gate | ✅ Free for all |

### Analytics
| Location | Check Type | Status |
|----------|------------|--------|
| `/analytics` page | Full page gate | ✅ `hasAnalyticsAccess` |

### Deployments
| Location | Check Type | Status |
|----------|------------|--------|
| `/deployments` page | Provider check | ✅ `hasEmailProvider` |
| Manual copy option | No gate | ✅ Available for all |

---

## Adding New Gated Features

1. **Add to plans.ts**: Add feature flag to `PlanFeatures` interface and each plan in `PLANS`
2. **Add to featureRequirements**: In `upgrade-prompt.tsx`, add mapping to required plan
3. **Implement gate**: Use `FeatureGate` component or manual check
4. **Update this doc**: Add to the reference tables above

---

## Dev Bypass

The "Bypass Pay Gates (Dev)" toggle (bottom-right of dashboard) disables ALL restrictions for testing.

- Stored in localStorage as `siggly_dev_bypass`
- Checked via `usePayGatesBypass()` hook
- **IMPORTANT**: Always test with bypass OFF before shipping

---

## Common Mistakes to Avoid

1. **Don't duplicate limit values** - Always reference `plans.ts` or `limitRequirements`
2. **Don't forget dev bypass** - Always include `devBypass ||` in manual checks
3. **Don't use stale counts** - Call `refresh()` after mutations that change usage
4. **Don't gate in multiple places inconsistently** - Use the gate components
5. **Don't forget to update this doc** - When adding new gated features
