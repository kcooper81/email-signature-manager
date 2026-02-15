import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { stripe } from '@/lib/billing/stripe';
import { logException } from '@/lib/error-logging';

/**
 * Sync subscription status directly from Stripe
 * Called after checkout redirect to ensure subscription is updated
 */
export async function POST(request: NextRequest) {
  try {
    const supabase = createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Get user's organization
    const { data: userData } = await supabase
      .from('users')
      .select('organization_id')
      .eq('auth_id', user.id)
      .single();

    if (!userData?.organization_id) {
      return NextResponse.json({ error: 'Organization not found' }, { status: 404 });
    }

    // Get subscription record
    const { data: subscription } = await supabase
      .from('subscriptions')
      .select('*')
      .eq('organization_id', userData.organization_id)
      .single();

    let stripeCustomerId = subscription?.stripe_customer_id;

    // If no stripe_customer_id, try to find customer by email in Stripe
    if (!stripeCustomerId && user.email) {
      const customers = await stripe.customers.list({
        email: user.email,
        limit: 1,
      });

      if (customers.data.length > 0) {
        stripeCustomerId = customers.data[0].id;
        
        // Update the subscription record with the found customer ID
        if (subscription) {
          await supabase
            .from('subscriptions')
            .update({ stripe_customer_id: stripeCustomerId })
            .eq('organization_id', userData.organization_id);
        }
      }
    }

    if (!stripeCustomerId) {
      return NextResponse.json({ 
        success: false, 
        message: 'No Stripe customer found',
        plan: subscription?.plan || 'free' 
      });
    }

    // Fetch active subscriptions from Stripe
    const stripeSubscriptions = await stripe.subscriptions.list({
      customer: stripeCustomerId,
      status: 'all',
      limit: 1,
    });

    const activeSubscription = stripeSubscriptions.data.find(
      sub => ['active', 'trialing'].includes(sub.status)
    ) || stripeSubscriptions.data[0];

    if (!activeSubscription) {
      return NextResponse.json({ 
        success: true, 
        message: 'No active subscription found',
        plan: subscription.plan,
        synced: false 
      });
    }

    // Determine plan from subscription items
    const plan = getPlanFromSubscription(activeSubscription);
    const status = mapStripeStatus(activeSubscription.status);

    // Update database if different
    if (subscription.plan !== plan || 
        subscription.stripe_subscription_id !== activeSubscription.id ||
        subscription.status !== status) {
      
      const { error: updateError } = await supabase
        .from('subscriptions')
        .update({
          stripe_subscription_id: activeSubscription.id,
          plan,
          status,
          current_period_start: new Date(activeSubscription.current_period_start * 1000).toISOString(),
          current_period_end: new Date(activeSubscription.current_period_end * 1000).toISOString(),
          cancel_at_period_end: activeSubscription.cancel_at_period_end,
          updated_at: new Date().toISOString(),
        })
        .eq('organization_id', userData.organization_id);

      if (updateError) {
        console.error('[Sync] Failed to update subscription:', updateError);
        return NextResponse.json({ error: 'Failed to sync subscription' }, { status: 500 });
      }

      console.log('[Sync] Updated subscription:', { plan, status });
      return NextResponse.json({ 
        success: true, 
        plan, 
        status,
        synced: true,
        message: 'Subscription synced from Stripe' 
      });
    }

    return NextResponse.json({ 
      success: true, 
      plan: subscription.plan, 
      status: subscription.status,
      synced: false,
      message: 'Subscription already up to date' 
    });

  } catch (error: any) {
    console.error('[Sync] Error:', error);
    
    await logException(error, {
      route: '/api/billing/sync',
      method: 'POST',
      errorType: 'billing_error',
    });

    // Handle Stripe test/live mode mismatch error
    if (error.type === 'StripeInvalidRequestError' && 
        error.message?.includes('a similar object exists in test mode')) {
      return NextResponse.json(
        { 
          error: 'Your billing account was created in test mode and cannot be synced with live credentials. Please contact support to reset your billing account.',
          code: 'STRIPE_MODE_MISMATCH'
        },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: error.message || 'Failed to sync subscription' },
      { status: 500 }
    );
  }
}

function getPlanFromSubscription(subscription: any): string {
  const priceIds = subscription.items.data.map((item: any) => item.price.id);

  const professionalPerUserPriceId = process.env.STRIPE_PROFESSIONAL_PER_USER_PRICE_ID;
  // Legacy price IDs for backward compatibility
  const professionalBasePriceId = process.env.STRIPE_PROFESSIONAL_BASE_PRICE_ID;
  const starterPriceId = process.env.STRIPE_STARTER_PRICE_ID;

  // New professional pricing (per-user only) or legacy professional (base + per-user)
  if (priceIds.includes(professionalPerUserPriceId) || priceIds.includes(professionalBasePriceId)) {
    return 'professional';
  }

  // Legacy starter customers are migrated to professional
  if (priceIds.includes(starterPriceId)) {
    return 'professional';
  }

  return 'free';
}

function mapStripeStatus(status: string): string {
  switch (status) {
    case 'active':
      return 'active';
    case 'trialing':
      return 'trialing';
    case 'past_due':
      return 'past_due';
    case 'canceled':
    case 'unpaid':
    case 'incomplete_expired':
      return 'canceled';
    default:
      return 'active';
  }
}
