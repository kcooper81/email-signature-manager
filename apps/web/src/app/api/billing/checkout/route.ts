import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { createCustomer, createCheckoutSession } from '@/lib/billing/stripe';
import { logException } from '@/lib/error-logging';
import { PARTNER_COUPON_IDS, type PartnerTier } from '@/lib/billing/partner-coupons';

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

    
    // Get user's organization
    const { data: userData } = await supabase
      .from('users')
      .select('organization_id')
      .eq('auth_id', user.id)
      .single();

    if (!userData?.organization_id) {
      return NextResponse.json({ error: 'Organization not found' }, { status: 404 });
    }

    // Check if this is an MSP organization with a partner tier (for coupon)
    const { data: orgData } = await supabase
      .from('organizations')
      .select('name, organization_type, partner_tier')
      .eq('id', userData.organization_id)
      .single();

    let partnerCouponId: string | undefined;
    if (orgData?.organization_type === 'msp' && orgData?.partner_tier) {
      const tier = orgData.partner_tier as PartnerTier;
      if (PARTNER_COUPON_IDS[tier]) {
        partnerCouponId = PARTNER_COUPON_IDS[tier];
      }
    }

    // Get or create subscription record
    let { data: subscription } = await supabase
      .from('subscriptions')
      .select('*')
      .eq('organization_id', userData.organization_id)
      .single();

    let customerId = subscription?.stripe_customer_id;

    // Create Stripe customer if needed (or if existing ID is invalid/placeholder)
    const needsNewCustomer = !customerId || 
      !customerId.startsWith('cus_') || 
      customerId.startsWith('pending_');
    
    if (needsNewCustomer) {
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

      // Upsert subscription record with stripe_customer_id
      const { error: upsertError } = await supabase
        .from('subscriptions')
        .upsert({
          organization_id: userData.organization_id,
          stripe_customer_id: customerId,
          plan: subscription?.plan || 'free',
          status: subscription?.status || 'active',
        }, {
          onConflict: 'organization_id',
        });

      if (upsertError) {
        console.error('Failed to upsert subscription record:', upsertError);
      }
    }

    // Get user count for quantity
    const { count: userCount } = await supabase
      .from('users')
      .select('*', { count: 'exact', head: true })
      .eq('organization_id', userData.organization_id);

    const quantity = Math.max(1, userCount || 1);

    // Create checkout session
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';
    const session = await createCheckoutSession({
      customerId,
      planId: planId as 'starter' | 'professional',
      quantity,
      successUrl: `${baseUrl}/settings/billing?success=true`,
      cancelUrl: `${baseUrl}/settings/billing?canceled=true`,
      couponId: partnerCouponId, // Apply partner discount if applicable
    });

    return NextResponse.json({ url: session.url });
  } catch (error: any) {
    console.error('Checkout error:', error);
    
    await logException(error, {
      route: '/api/billing/checkout',
      method: 'POST',
      errorType: 'billing_error',
    });

    // Handle Stripe test/live mode mismatch error
    if (error.type === 'StripeInvalidRequestError' && 
        error.message?.includes('a similar object exists in test mode')) {
      return NextResponse.json(
        { 
          error: 'Your billing account was created in test mode and cannot be used with live credentials. Please contact support to reset your billing account.',
          code: 'STRIPE_MODE_MISMATCH'
        },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: error.message || 'Failed to create checkout session' },
      { status: 500 }
    );
  }
}
