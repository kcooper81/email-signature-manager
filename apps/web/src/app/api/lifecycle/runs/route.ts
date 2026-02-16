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
    if (!userData || !['owner', 'admin'].includes(userData.role)) {
      return NextResponse.json({ error: 'Insufficient permissions' }, { status: 403 });
    }

    const orgPlan = await getOrgPlan(supabase, userData.organization_id);
    if (!checkFeature(orgPlan, 'maxLifecycleWorkflows')) {
      return planDenied('Lifecycle automation', 'professional');
    }

    const { searchParams } = new URL(request.url);
    const limit = parseInt(searchParams.get('limit') || '50');
    const offset = parseInt(searchParams.get('offset') || '0');

    const { data: runs, count } = await supabase
      .from('lifecycle_workflow_runs')
      .select('*, lifecycle_workflows(name), users(email, first_name, last_name)', { count: 'exact' })
      .eq('organization_id', userData.organization_id)
      .order('started_at', { ascending: false })
      .range(offset, offset + limit - 1);

    return NextResponse.json({ runs: runs || [], total: count || 0, limit, offset });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
