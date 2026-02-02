import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { createBillingPortalSession } from '@/lib/billing/stripe';

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

    // Get subscription with Stripe customer ID
    const { data: subscription } = await supabase
      .from('subscriptions')
      .select('stripe_customer_id')
      .eq('organization_id', userData.organization_id)
      .single();

    if (!subscription?.stripe_customer_id) {
      return NextResponse.json({ error: 'No billing account found' }, { status: 404 });
    }

    // Create billing portal session
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';
    const session = await createBillingPortalSession(
      subscription.stripe_customer_id,
      `${baseUrl}/settings/billing`
    );

    return NextResponse.json({ url: session.url });
  } catch (error: any) {
    console.error('Billing portal error:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to create billing portal session' },
      { status: 500 }
    );
  }
}
