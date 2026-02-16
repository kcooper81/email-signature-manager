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

    // Get latest audit results
    const { data: results } = await supabase
      .from('brand_audit_results')
      .select('compliance_score, user_id, audited_at')
      .eq('organization_id', userData.organization_id)
      .order('audited_at', { ascending: false });

    // Get most recent per user
    const latestByUser = new Map<string, number>();
    for (const r of results || []) {
      if (r.user_id && !latestByUser.has(r.user_id)) {
        latestByUser.set(r.user_id, r.compliance_score);
      }
    }

    const scores = Array.from(latestByUser.values());
    const avgScore = scores.length > 0
      ? Math.round(scores.reduce((sum, s) => sum + s, 0) / scores.length)
      : 0;

    return NextResponse.json({
      averageScore: avgScore,
      totalUsers: scores.length,
      distribution: {
        excellent: scores.filter(s => s >= 90).length,
        good: scores.filter(s => s >= 70 && s < 90).length,
        needsWork: scores.filter(s => s >= 50 && s < 70).length,
        poor: scores.filter(s => s < 50).length,
      },
    });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
