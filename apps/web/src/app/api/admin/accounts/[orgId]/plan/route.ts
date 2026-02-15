import { NextRequest, NextResponse } from 'next/server';
import { createClient, createServiceClient } from '@/lib/supabase/server';
import { cancelSubscription } from '@/lib/billing/stripe';

const VALID_PLANS = ['free', 'professional'];

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ orgId: string }> }
) {
  try {
    const { orgId } = await params;
    const supabase = await createClient();
    const supabaseAdmin = createServiceClient();

    // Verify super admin
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { data: userData } = await supabaseAdmin
      .from('users')
      .select('id, is_super_admin')
      .eq('auth_id', user.id)
      .single();

    if (!userData?.is_super_admin) {
      return NextResponse.json({ error: 'Admin access required' }, { status: 403 });
    }

    const { plan } = await request.json();

    if (!VALID_PLANS.includes(plan)) {
      return NextResponse.json({ error: 'Invalid plan' }, { status: 400 });
    }

    // Get current subscription
    const { data: subscription } = await supabaseAdmin
      .from('subscriptions')
      .select('id, plan, stripe_subscription_id, status')
      .eq('organization_id', orgId)
      .single();

    if (!subscription) {
      return NextResponse.json({ error: 'No subscription found' }, { status: 404 });
    }

    const fromPlan = subscription.plan;

    if (fromPlan === plan) {
      return NextResponse.json({ error: 'Already on this plan' }, { status: 400 });
    }

    // Downgrade to free: cancel Stripe subscription immediately
    if (plan === 'free' && subscription.stripe_subscription_id) {
      try {
        await cancelSubscription(subscription.stripe_subscription_id, false);
      } catch (stripeErr: any) {
        console.error('Failed to cancel Stripe subscription:', stripeErr.message);
      }
    }

    // Update subscription in DB
    const { error: updateError } = await supabaseAdmin
      .from('subscriptions')
      .update({
        plan,
        stripe_subscription_id: plan === 'free' ? null : subscription.stripe_subscription_id,
        status: plan === 'free' ? 'active' : subscription.status,
        updated_at: new Date().toISOString(),
      })
      .eq('id', subscription.id);

    if (updateError) {
      return NextResponse.json({ error: 'Failed to update subscription: ' + updateError.message }, { status: 500 });
    }

    // Log subscription event
    const eventType = VALID_PLANS.indexOf(plan) < VALID_PLANS.indexOf(fromPlan) ? 'downgraded' : 'upgraded';
    await supabaseAdmin.from('subscription_events').insert({
      organization_id: orgId,
      event_type: eventType,
      from_plan: fromPlan,
      to_plan: plan,
    });

    // Audit log
    await supabaseAdmin.from('audit_logs').insert({
      organization_id: orgId,
      user_id: userData.id,
      action: 'admin_plan_change',
      resource_type: 'subscription',
      resource_id: subscription.id,
      metadata: { from_plan: fromPlan, to_plan: plan },
    });

    return NextResponse.json({ success: true, from: fromPlan, to: plan });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
