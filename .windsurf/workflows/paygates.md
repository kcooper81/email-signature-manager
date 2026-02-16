---
description: How to add or modify plan-based feature gates and limits
---

## Before Making Paygate Changes

1. Read the pricing and paygates document first:
   ```
   Read PRICING-AND-PAYGATES.md
   ```

2. Check the current plan definitions:
   ```
   Read apps/web/src/lib/billing/plans.ts
   ```

3. Check the gate components:
   ```
   Read apps/web/src/components/billing/upgrade-prompt.tsx
   ```

4. Check the server-side plan guard:
   ```
   Read apps/web/src/lib/billing/plan-guard.ts
   ```

5. Check the field allowlists:
   ```
   Read apps/web/src/lib/api/field-allowlists.ts
   ```

## Adding a New Gated Feature

### Frontend (UI)
1. Add to `PlanFeatures` interface in `plans.ts`
2. Add to each plan in `PLANS` object
3. Add to `featureRequirements` in `upgrade-prompt.tsx`
4. Use `<FeatureGate feature="newFeature">` in the UI

### Backend (API Routes)
1. Add to `PlanFeatures` interface in `plans.ts`
2. Add to each plan in `PLANS` object
3. In the API route:
   ```typescript
   import { getOrgPlan, checkFeature, planDenied } from '@/lib/billing/plan-guard';

   const orgPlan = await getOrgPlan(supabase, organizationId);
   if (!checkFeature(orgPlan, 'newFeature')) {
     return planDenied('Feature Name', 'professional');
   }
   ```
4. For limit checks:
   ```typescript
   import { getOrgPlan, checkLimit, limitDenied } from '@/lib/billing/plan-guard';

   const orgPlan = await getOrgPlan(supabase, organizationId);
   if (!checkLimit(orgPlan, 'maxSomething', currentCount)) {
     return limitDenied('Resource', currentCount, orgPlan.plan.features.maxSomething);
   }
   ```

### PUT Route Security
For PUT routes, always use field allowlists:
1. Add an allowlist to `apps/web/src/lib/api/field-allowlists.ts`
2. Use `pickAllowed(body, ALLOWLIST)` instead of spreading `...body`

## Modifying Limits

1. Update limit values in `PLANS` object in `plans.ts`
2. Update `limitRequirements` in `upgrade-prompt.tsx` (if applicable)
3. All server-side `checkLimit()` calls automatically use new limits
4. Update `PRICING-AND-PAYGATES.md` documentation

## Testing

1. Turn OFF "Bypass Pay Gates (Dev)" toggle
2. Test as Free plan user:
   - Verify HubSpot, bulk ops, compliance blocks, directory sync, and scheduled deployments are accessible
   - Verify disclaimers limited to 2 templates, 1 rule
   - Verify Presets and Audit tabs are locked on disclaimers page
   - Verify HR Sync page shows upgrade prompt
   - Verify Automation page shows upgrade prompt
   - Verify Brand pages show upgrade prompt
3. Test as Professional plan user:
   - Verify MS365, full analytics, and multiple templates are unlocked
   - Verify HR Sync page loads fully
   - Verify up to 5 lifecycle workflows allowed
   - Verify disclaimer presets and audit trail accessible
4. Test as Enterprise user:
   - Verify brand governance accessible
   - Verify unlimited lifecycle workflows
   - Verify webhook actions allowed
   - Verify MSP cascade features work
5. Test dev bypass:
   - Set NEXT_PUBLIC_BYPASS_PAY_GATES=true
   - Verify all routes work regardless of plan
6. Test API security:
   - Verify PUT routes strip unauthorized fields (organization_id, is_system)
   - Verify webhook URLs reject private/localhost addresses
   - Verify cron route returns 500 when CRON_SECRET is unset
