import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { stripe, STRIPE_PRICE_IDS, createCustomer, createCheckoutSession } from '@/lib/billing/stripe';
import { TRIAL_DAYS } from '@/lib/billing/plans';

export async function POST(request: NextRequest) {
  try {
    const supabase = createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { planId } = await request.json();

    if (!planId || !['starter', 'professional'].includes(planId)) {
      return NextResponse.json({ error: 'Invalid plan' }, { status: 400 });
    }

    const priceId = STRIPE_PRICE_IDS[planId as keyof typeof STRIPE_PRICE_IDS];
    if (!priceId) {
      return NextResponse.json({ error: 'Price not configured' }, { status: 400 });
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

    // Get or create subscription record
    let { data: subscription } = await supabase
      .from('subscriptions')
      .select('*')
      .eq('organization_id', userData.organization_id)
      .single();

    let customerId = subscription?.stripe_customer_id;

    // Create Stripe customer if needed
    if (!customerId) {
      const { data: org } = await supabase
        .from('organizations')
        .select('name')
        .eq('id', userData.organization_id)
        .single();

      const customer = await createCustomer(
        user.email || '',
        org?.name || 'Organization',
        userData.organization_id
      );
      customerId = customer.id;

      // Create subscription record
      const { error: insertError } = await supabase
        .from('subscriptions')
        .insert({
          organization_id: userData.organization_id,
          stripe_customer_id: customerId,
          plan: 'free',
          status: 'active',
        });

      if (insertError) {
        console.error('Failed to create subscription record:', insertError);
      }
    }

    // Get user count for quantity
    const { count: userCount } = await supabase
      .from('users')
      .select('*', { count: 'exact', head: true })
      .eq('organization_id', userData.organization_id);

    const quantity = Math.max(1, userCount || 1);

    // Check if this is a new customer (eligible for trial)
    const isNewCustomer = !subscription?.stripe_subscription_id;

    // Create checkout session
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';
    const session = await createCheckoutSession({
      customerId,
      priceId,
      quantity,
      successUrl: `${baseUrl}/settings/billing?success=true`,
      cancelUrl: `${baseUrl}/settings/billing?canceled=true`,
      trialDays: isNewCustomer ? TRIAL_DAYS : undefined,
    });

    return NextResponse.json({ url: session.url });
  } catch (error: any) {
    console.error('Checkout error:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to create checkout session' },
      { status: 500 }
    );
  }
}
