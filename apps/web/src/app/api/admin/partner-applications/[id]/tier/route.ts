import { NextRequest, NextResponse } from 'next/server';
import { createClient, createServiceClient } from '@/lib/supabase/server';
import { stripe } from '@/lib/billing/stripe';
import { updatePartnerTier, type PartnerTier } from '@/lib/billing/partner-coupons';

const VALID_TIERS: PartnerTier[] = ['registered', 'authorized', 'premier'];

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
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

    const { tier } = await request.json();

    if (!VALID_TIERS.includes(tier)) {
      return NextResponse.json({ error: 'Invalid tier' }, { status: 400 });
    }

    // Get the application and its organization
    const { data: application } = await supabaseAdmin
      .from('partner_applications')
      .select('id, organization_id, company_name, status')
      .eq('id', id)
      .single();

    if (!application || application.status !== 'approved') {
      return NextResponse.json({ error: 'Application not found or not approved' }, { status: 404 });
    }

    if (!application.organization_id) {
      return NextResponse.json({ error: 'No organization linked to this application' }, { status: 400 });
    }

    // Update organization partner_tier
    const { error: orgError } = await supabaseAdmin
      .from('organizations')
      .update({
        partner_tier: tier,
        metadata: { partner_coupon_tier: tier },
        updated_at: new Date().toISOString(),
      })
      .eq('id', application.organization_id);

    if (orgError) {
      return NextResponse.json({ error: 'Failed to update organization: ' + orgError.message }, { status: 500 });
    }

    // Update Stripe coupon
    const { data: sub } = await supabaseAdmin
      .from('subscriptions')
      .select('stripe_customer_id')
      .eq('organization_id', application.organization_id)
      .single();

    if (sub?.stripe_customer_id) {
      try {
        await updatePartnerTier(stripe, sub.stripe_customer_id, tier as PartnerTier);
      } catch (stripeErr: any) {
        console.error('Failed to update Stripe coupon:', stripeErr.message);
      }
    }

    // Audit log
    await supabaseAdmin.from('audit_logs').insert({
      organization_id: application.organization_id,
      user_id: userData.id,
      action: 'partner_tier_changed',
      resource_type: 'organization',
      resource_id: application.organization_id,
      metadata: { new_tier: tier, company_name: application.company_name },
    });

    return NextResponse.json({ success: true, tier });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
