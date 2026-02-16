import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { getOrgPlan, checkFeature, planDenied } from '@/lib/billing/plan-guard';

export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
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
    if (!checkFeature(orgPlan, 'selfServiceAdminApproval')) {
      return planDenied('Admin approval workflows', 'professional');
    }

    const { data: profileRequest } = await supabase
      .from('user_profile_requests')
      .select('*')
      .eq('id', id)
      .eq('organization_id', userData.organization_id)
      .eq('status', 'pending')
      .single();

    if (!profileRequest) return NextResponse.json({ error: 'Request not found' }, { status: 404 });

    // Apply changes
    const updates: Record<string, any> = {};
    for (const fc of (profileRequest.field_changes || [])) {
      updates[fc.field] = fc.newValue;
    }
    await supabase.from('users').update({ ...updates, updated_at: new Date().toISOString() }).eq('id', profileRequest.user_id);

    // Mark as approved
    await supabase
      .from('user_profile_requests')
      .update({ status: 'approved', reviewed_by: userData.id, reviewed_at: new Date().toISOString() })
      .eq('id', id);

    return NextResponse.json({ success: true });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
