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
    const { status } = body; // approved, pending, deprecated

    if (!['approved', 'pending', 'deprecated'].includes(status)) {
      return NextResponse.json({ error: 'Invalid status' }, { status: 400 });
    }

    const { data: asset, error } = await supabase
      .from('brand_assets')
      .update({
        approved_status: status,
        approved_by: status === 'approved' ? userData.id : null,
        approved_at: status === 'approved' ? new Date().toISOString() : null,
        updated_at: new Date().toISOString(),
      })
      .eq('id', id)
      .eq('organization_id', userData.organization_id)
      .select()
      .single();

    if (error) return NextResponse.json({ error: error.message }, { status: 500 });
    return NextResponse.json({ success: true, asset });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
