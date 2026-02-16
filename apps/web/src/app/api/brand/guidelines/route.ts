import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { getOrgPlan, checkFeature, planDenied } from '@/lib/billing/plan-guard';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  try {
    const supabase = createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const { data: userData } = await supabase
      .from('users').select('id, organization_id, role').eq('auth_id', user.id).single();
    if (!userData) return NextResponse.json({ error: 'User not found' }, { status: 404 });

    const orgPlan = await getOrgPlan(supabase, userData.organization_id);
    if (!checkFeature(orgPlan, 'brandGovernance')) {
      return planDenied('Brand governance', 'enterprise');
    }

    const { data: guidelines } = await supabase
      .from('brand_guidelines')
      .select('*, brand_assets(id, public_url, display_name)')
      .eq('organization_id', userData.organization_id)
      .order('created_at', { ascending: false });

    // Load MSP cascaded guidelines
    const { data: org } = await supabase
      .from('organizations')
      .select('parent_organization_id')
      .eq('id', userData.organization_id)
      .single();

    let cascaded: any[] = [];
    if (org?.parent_organization_id) {
      const { data: mspGuidelines } = await supabase
        .from('brand_guidelines')
        .select('*, brand_assets(id, public_url, display_name)')
        .eq('organization_id', org.parent_organization_id)
        .eq('cascade_to_clients', true)
        .eq('is_active', true);
      cascaded = (mspGuidelines || []).map(g => ({ ...g, _cascaded: true, _readOnly: true }));
    }

    return NextResponse.json({ guidelines: [...(guidelines || []), ...cascaded] });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const supabase = createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const { data: userData } = await supabase
      .from('users').select('id, organization_id, role').eq('auth_id', user.id).single();
    if (!userData || !['owner', 'admin'].includes(userData.role)) {
      return NextResponse.json({ error: 'Insufficient permissions' }, { status: 403 });
    }

    const orgPlan = await getOrgPlan(supabase, userData.organization_id);
    if (!checkFeature(orgPlan, 'brandGovernance')) {
      return planDenied('Brand governance', 'enterprise');
    }

    const body = await request.json();
    const { data: guideline, error } = await supabase
      .from('brand_guidelines')
      .insert({
        organization_id: userData.organization_id,
        name: body.name,
        description: body.description || null,
        primary_colors: body.primaryColors || null,
        secondary_colors: body.secondaryColors || null,
        accent_colors: body.accentColors || null,
        allowed_fonts: body.allowedFonts || null,
        required_logo_asset_id: body.requiredLogoAssetId || null,
        logo_min_width: body.logoMinWidth || null,
        logo_max_width: body.logoMaxWidth || null,
        required_disclaimer: body.requiredDisclaimer || false,
        required_social_links: body.requiredSocialLinks || null,
        locked_blocks: body.lockedBlocks || null,
        locked_colors: body.lockedColors || false,
        locked_fonts: body.lockedFonts || false,
        is_active: true,
        cascade_to_clients: body.cascadeToClients || false,
        allow_client_override: body.allowClientOverride || false,
        created_by: userData.id,
      })
      .select()
      .single();

    if (error) return NextResponse.json({ error: error.message }, { status: 500 });
    return NextResponse.json({ success: true, guideline });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
