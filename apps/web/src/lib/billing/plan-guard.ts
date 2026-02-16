import { NextResponse } from 'next/server';
import { getPlan, canAccessFeature, isWithinLimit, type PlanFeatures } from './plans';

type LimitFeature = 'maxTemplates' | 'maxUsers' | 'maxDisclaimerTemplates' | 'maxDisclaimerRules' | 'maxLifecycleWorkflows';

interface OrgPlan {
  planId: string;
  plan: ReturnType<typeof getPlan>;
  devBypass: boolean;
}

/**
 * Resolve the org's current plan from the subscriptions table.
 * Also checks the dev bypass env var and super admin status so callers don't have to.
 * Pass authId to automatically check if the user is a super admin (bypasses all gates).
 */
export async function getOrgPlan(
  supabase: { from: (table: string) => any; auth?: { getUser: () => Promise<any> } },
  orgId: string,
  options?: { authId?: string },
): Promise<OrgPlan> {
  let devBypass = process.env.NEXT_PUBLIC_BYPASS_PAY_GATES === 'true';

  // Check if the requesting user is a super admin
  if (!devBypass && options?.authId) {
    const { data: adminCheck } = await supabase
      .from('users')
      .select('is_super_admin')
      .eq('auth_id', options.authId)
      .maybeSingle();
    if (adminCheck?.is_super_admin === true) {
      devBypass = true;
    }
  }

  // If no authId provided, try to get it from supabase auth
  if (!devBypass && supabase.auth) {
    try {
      const { data: { user: authUser } } = await supabase.auth.getUser();
      if (authUser) {
        const { data: adminCheck } = await supabase
          .from('users')
          .select('is_super_admin')
          .eq('auth_id', authUser.id)
          .maybeSingle();
        if (adminCheck?.is_super_admin === true) {
          devBypass = true;
        }
      }
    } catch {
      // Auth not available, skip super admin check
    }
  }

  const { data: sub } = await supabase
    .from('subscriptions')
    .select('plan')
    .eq('organization_id', orgId)
    .maybeSingle();

  const planId = sub?.plan || 'free';
  return { planId, plan: getPlan(planId), devBypass };
}

/** Check a boolean feature. Returns true if the org can use it. */
export function checkFeature(orgPlan: OrgPlan, feature: keyof PlanFeatures): boolean {
  if (orgPlan.devBypass) return true;
  return canAccessFeature(orgPlan.planId, feature);
}

/** Check a numeric limit. Returns true if currentCount < limit (or unlimited). */
export function checkLimit(orgPlan: OrgPlan, feature: LimitFeature, currentCount: number): boolean {
  if (orgPlan.devBypass) return true;
  return isWithinLimit(orgPlan.planId, feature, currentCount);
}

/** 403 response for a feature the org's plan doesn't include. */
export function planDenied(featureName: string, requiredPlan: string) {
  return NextResponse.json(
    { error: `${featureName} requires the ${requiredPlan} plan or above.`, upgradeRequired: true, requiredPlan },
    { status: 403 },
  );
}

/** 403 response for a numeric limit being exceeded. */
export function limitDenied(resourceName: string, current: number, limit: number) {
  return NextResponse.json(
    { error: `${resourceName} limit reached (${current}/${limit}). Upgrade your plan for more.`, upgradeRequired: true, current, limit },
    { status: 403 },
  );
}
