import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { auditUser } from '@/lib/brand-governance';
import { getOrgPlan, checkFeature, planDenied } from '@/lib/billing/plan-guard';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest, { params }: { params: Promise<{ userId: string }> }) {
  try {
    const { userId } = await params;
    const supabase = createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const { data: userData } = await supabase
      .from('users').select('id, organization_id, role').eq('auth_id', user.id).single();
    if (!userData) return NextResponse.json({ error: 'User not found' }, { status: 404 });

    if (!['owner', 'admin'].includes(userData.role)) {
      return NextResponse.json({ error: 'Insufficient permissions' }, { status: 403 });
    }

    const orgPlan = await getOrgPlan(supabase, userData.organization_id);
    if (!checkFeature(orgPlan, 'brandGovernance')) {
      return planDenied('Brand governance', 'enterprise');
    }

    // Validate target user belongs to same org
    const { data: targetUser } = await supabase
      .from('users')
      .select('id')
      .eq('id', userId)
      .eq('organization_id', userData.organization_id)
      .single();
    if (!targetUser) {
      return NextResponse.json({ error: 'User not found in your organization' }, { status: 404 });
    }

    const result = await auditUser(userData.organization_id, userId);
    if (!result) return NextResponse.json({ error: 'No audit data available' }, { status: 404 });

    return NextResponse.json({ result });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
