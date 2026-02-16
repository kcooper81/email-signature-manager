import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { getOrgPlan, checkFeature, planDenied } from '@/lib/billing/plan-guard';

export const dynamic = 'force-dynamic';

export async function PUT(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
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
      .update({
        name: body.name,
        description: body.description || null,
        primary_colors: body.primaryColors || null,
        secondary_colors: body.secondaryColors || null,
        accent_colors: body.accentColors || null,
        allowed_fonts: body.allowedFonts || null,
        locked_colors: body.lockedColors || false,
        locked_fonts: body.lockedFonts || false,
        required_disclaimer: body.requiredDisclaimer || false,
        required_social_links: body.requiredSocialLinks || null,
        cascade_to_clients: body.cascadeToClients || false,
        is_active: body.isActive ?? true,
      })
      .eq('id', id)
      .eq('organization_id', userData.organization_id)
      .select()
      .single();

    if (error) return NextResponse.json({ error: error.message }, { status: 500 });
    return NextResponse.json({ success: true, guideline });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
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

    const { error } = await supabase
      .from('brand_guidelines')
      .delete()
      .eq('id', id)
      .eq('organization_id', userData.organization_id);

    if (error) return NextResponse.json({ error: error.message }, { status: 500 });
    return NextResponse.json({ success: true });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
