import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { stripe } from '@/lib/billing/stripe';
import { PARTNER_DISCOUNTS, type PartnerTier } from '@/lib/billing/partner-coupons';

interface ClientBilling {
  id: string;
  name: string;
  domain: string | null;
  userCount: number;
  plan: string;
  status: string;
  monthlyAmount: number;
  nextBillingDate: string | null;
}

interface MspBillingSummary {
  partnerTier: PartnerTier | null;
  discountPercent: number;
  totalClients: number;
  totalUsers: number;
  totalMonthlyRevenue: number;
  partnerMargin: number;
  clients: ClientBilling[];
}

export async function GET() {
  try {
    const supabase = await createClient();
    
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Get user's organization and verify it's an MSP
    const { data: userData, error: userError } = await supabase
      .from('users')
      .select('id, organization_id, role')
      .eq('auth_id', user.id)
      .single();

    if (userError || !userData) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    // Only owners and admins can view billing data
    if (!['owner', 'admin'].includes(userData.role)) {
      return NextResponse.json({ error: 'Insufficient permissions' }, { status: 403 });
    }

    const { data: orgData, error: orgError } = await supabase
      .from('organizations')
      .select('id, name, organization_type, partner_tier')
      .eq('id', userData.organization_id)
      .single();

    if (orgError || !orgData) {
      return NextResponse.json({ error: 'Organization not found' }, { status: 404 });
    }

    if (orgData.organization_type !== 'msp') {
      return NextResponse.json({ error: 'Not an MSP organization' }, { status: 403 });
    }

    // Get all client organizations
    const { data: clients, error: clientsError } = await supabase
      .from('organizations')
      .select('id, name, domain')
      .eq('parent_organization_id', userData.organization_id)
      .eq('organization_type', 'msp_client')
      .order('name');

    if (clientsError) {
      throw clientsError;
    }

    // Get billing info for each client
    const clientBillings: ClientBilling[] = [];
    let totalMonthlyRevenue = 0;
    let totalUsers = 0;

    for (const client of clients || []) {
      // Get user count
      const { count: userCount } = await supabase
        .from('users')
        .select('*', { count: 'exact', head: true })
        .eq('organization_id', client.id);

      // Get subscription info
      const { data: subscription } = await supabase
        .from('subscriptions')
        .select('plan, status, stripe_subscription_id, current_period_end')
        .eq('organization_id', client.id)
        .single();

      let monthlyAmount = 0;
      let nextBillingDate: string | null = null;

      if (subscription?.stripe_subscription_id) {
        try {
          const stripeSub = await stripe.subscriptions.retrieve(subscription.stripe_subscription_id);
          // Calculate monthly amount from subscription items
          for (const item of stripeSub.items.data) {
            const price = item.price;
            if (price.recurring?.interval === 'month') {
              monthlyAmount += (price.unit_amount || 0) * (item.quantity || 1) / 100;
            } else if (price.recurring?.interval === 'year') {
              monthlyAmount += ((price.unit_amount || 0) * (item.quantity || 1) / 100) / 12;
            }
          }
          nextBillingDate = new Date(stripeSub.current_period_end * 1000).toISOString();
        } catch {
          // Stripe subscription not found or error
        }
      }

      totalMonthlyRevenue += monthlyAmount;
      totalUsers += userCount || 0;

      clientBillings.push({
        id: client.id,
        name: client.name,
        domain: client.domain,
        userCount: userCount || 0,
        plan: subscription?.plan || 'free',
        status: subscription?.status || 'inactive',
        monthlyAmount,
        nextBillingDate,
      });
    }

    // Calculate partner margin
    const partnerTier = orgData.partner_tier as PartnerTier | null;
    const discountPercent = partnerTier ? PARTNER_DISCOUNTS[partnerTier] : 0;
    const partnerMargin = totalMonthlyRevenue * (discountPercent / 100);

    const summary: MspBillingSummary = {
      partnerTier,
      discountPercent,
      totalClients: clients?.length || 0,
      totalUsers,
      totalMonthlyRevenue,
      partnerMargin,
      clients: clientBillings,
    };

    return NextResponse.json(summary);
  } catch (error: any) {
    console.error('MSP billing error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
