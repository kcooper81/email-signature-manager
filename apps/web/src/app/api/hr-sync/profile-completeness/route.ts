import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { calculateProfileCompleteness, getIncompleteFields } from '@/lib/hr-sync/profile-completeness';
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
    if (!checkFeature(orgPlan, 'hrIntegrations')) {
      return planDenied('HR integrations', 'professional');
    }

    const { data: orgUsers } = await supabase
      .from('users')
      .select('id, email, first_name, last_name, title, department, phone, mobile, avatar_url, company, office_location, linkedin_url, region, profile_completeness')
      .eq('organization_id', userData.organization_id)
      .eq('is_active', true);

    const scores = (orgUsers || []).map((u: Record<string, unknown>) => ({
      userId: u.id,
      email: u.email,
      name: `${u.first_name || ''} ${u.last_name || ''}`.trim(),
      score: calculateProfileCompleteness(u),
      incompleteFields: getIncompleteFields(u),
    }));

    const avgScore = scores.length > 0
      ? Math.round(scores.reduce((sum: number, s: { score: number }) => sum + s.score, 0) / scores.length)
      : 0;

    if (!checkFeature(orgPlan, 'profileCompletenessAnalytics')) {
      return NextResponse.json({ averageScore: avgScore, totalUsers: scores.length });
    }

    return NextResponse.json({ users: scores, averageScore: avgScore, totalUsers: scores.length });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
