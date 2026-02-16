import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { runOrgAudit } from '@/lib/brand-governance';
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
    if (!checkFeature(orgPlan, 'brandGovernance')) {
      return planDenied('Brand governance', 'enterprise');
    }

    const results = await runOrgAudit(userData.organization_id);
    const avgScore = results.length > 0
      ? Math.round(results.reduce((sum, r) => sum + r.score, 0) / results.length)
      : 0;

    return NextResponse.json({ results, averageScore: avgScore, totalAudited: results.length });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
