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

## Adding a New Gated Feature

1. Add to `PlanFeatures` interface in `plans.ts`
2. Add to each plan in `PLANS` object
3. Add to `featureRequirements` in `upgrade-prompt.tsx`
4. Use `<FeatureGate feature="newFeature">` in the UI
5. Update `PAYGATE-REFERENCE.md` documentation

## Modifying Limits

1. Update limit values in `PLANS` object in `plans.ts`
2. Update `limitRequirements` in `upgrade-prompt.tsx`
3. Update `PAYGATE-REFERENCE.md` documentation

## Testing

1. Turn OFF "Bypass Pay Gates (Dev)" toggle
2. Test as Free plan user (verify HubSpot, bulk ops, compliance blocks, directory sync, and scheduled deployments are accessible)
3. Test as Professional plan user (verify MS365, full analytics, and multiple templates are unlocked)
4. Verify upgrade prompts appear only for gated features: analytics (full), MS365, multiple templates
5. Verify NO upgrade prompts for: HubSpot, bulk ops, compliance blocks, directory sync, scheduled deployments, API access
