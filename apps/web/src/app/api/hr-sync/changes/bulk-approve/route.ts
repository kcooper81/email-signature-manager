import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { getOrgPlan, checkFeature, checkLimit, planDenied, limitDenied } from '@/lib/billing/plan-guard';

export const dynamic = 'force-dynamic';

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
    if (!checkFeature(orgPlan, 'hrIntegrations')) {
      return planDenied('HR integrations', 'professional');
    }

    const body = await request.json();
    const { changeIds } = body;

    if (!changeIds || !Array.isArray(changeIds) || changeIds.length === 0) {
      return NextResponse.json({ error: 'Change IDs are required' }, { status: 400 });
    }

    const createCount = changeIds.length; // Worst case
    const { count: userCount } = await supabase
      .from('users')
      .select('*', { count: 'exact', head: true })
      .eq('organization_id', userData.organization_id);
    if (!checkLimit(orgPlan, 'maxUsers', (userCount || 0) + createCount)) {
      return limitDenied('Users', (userCount || 0) + createCount, orgPlan.plan.features.maxUsers);
    }

    let approved = 0;
    let failed = 0;

    for (const changeId of changeIds) {
      try {
        const { data: change } = await supabase
          .from('sync_change_queue')
          .select('*')
          .eq('id', changeId)
          .eq('organization_id', userData.organization_id)
          .eq('status', 'pending')
          .single();

        if (!change) { failed++; continue; }

        if (change.change_type === 'create') {
          const data: Record<string, any> = { organization_id: userData.organization_id, email: change.user_email, source: 'hr_sync' };
          for (const fc of (change.field_changes || [])) { data[fc.field] = fc.newValue; }
          await supabase.from('users').insert(data);
        } else if (change.change_type === 'update' && change.user_id) {
          const updates: Record<string, any> = {};
          for (const fc of (change.field_changes || [])) { updates[fc.field] = fc.newValue; }
          await supabase.from('users').update(updates).eq('id', change.user_id);
        } else if (change.change_type === 'deactivate' && change.user_id) {
          await supabase.from('users').update({ is_active: false }).eq('id', change.user_id);
        }

        await supabase
          .from('sync_change_queue')
          .update({ status: 'approved', reviewed_by: userData.id, reviewed_at: new Date().toISOString() })
          .eq('id', changeId);

        approved++;
      } catch {
        failed++;
      }
    }

    return NextResponse.json({ success: true, approved, failed });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
