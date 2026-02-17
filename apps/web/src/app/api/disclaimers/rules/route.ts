import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { getOrgPlan, checkFeature, checkLimit, planDenied, limitDenied } from '@/lib/billing/plan-guard';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  try {
    const supabase = createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { data: userData } = await supabase
      .from('users')
      .select('id, organization_id, role')
      .eq('auth_id', user.id)
      .single();

    if (!userData) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    const { data: rules } = await supabase
      .from('disclaimer_rules')
      .select('*, disclaimer_templates(id, name, category)')
      .eq('organization_id', userData.organization_id)
      .order('priority', { ascending: true });

    // Also load MSP cascaded rules if this org has a parent
    const { data: org } = await supabase
      .from('organizations')
      .select('parent_organization_id')
      .eq('id', userData.organization_id)
      .single();

    let cascadedRules: any[] = [];
    if (org?.parent_organization_id) {
      const { data: mspRules } = await supabase
        .from('disclaimer_rules')
        .select('*, disclaimer_templates(id, name, category)')
        .eq('organization_id', org.parent_organization_id)
        .eq('cascade_to_clients', true)
        .eq('is_active', true)
        .order('priority', { ascending: true });

      cascadedRules = (mspRules || []).map(r => ({ ...r, _cascaded: true, _readOnly: true }));
    }

    return NextResponse.json({ rules: [...(rules || []), ...cascadedRules] });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const supabase = createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { data: userData } = await supabase
      .from('users')
      .select('id, organization_id, role')
      .eq('auth_id', user.id)
      .single();

    if (!userData || !['owner', 'admin'].includes(userData.role)) {
      return NextResponse.json({ error: 'Insufficient permissions' }, { status: 403 });
    }

    const orgPlan = await getOrgPlan(supabase, userData.organization_id);

    const { count } = await supabase
      .from('disclaimer_rules')
      .select('*', { count: 'exact', head: true })
      .eq('organization_id', userData.organization_id);
    if (!checkLimit(orgPlan, 'maxDisclaimerRules', count || 0)) {
      return limitDenied('Disclaimer rules', count || 0, orgPlan.plan.features.maxDisclaimerRules);
    }

    const body = await request.json();
    const {
      name, description, priority, disclaimerTemplateId,
      departmentCondition, departments, regionCondition, regions,
      recipientCondition, recipientDomains, industryCondition, industries,
      userSourceCondition, userSources, startDate, endDate, cascadeToClients, isActive,
    } = body;

    if (!name || !disclaimerTemplateId) {
      return NextResponse.json({ error: 'Name and disclaimer template are required' }, { status: 400 });
    }

    if (cascadeToClients && !checkFeature(orgPlan, 'disclaimerMspCascade')) {
      return planDenied('MSP disclaimer cascading', 'enterprise');
    }

    const { data: rule, error } = await supabase
      .from('disclaimer_rules')
      .insert({
        organization_id: userData.organization_id,
        name,
        description: description || null,
        priority: priority || 0,
        is_active: isActive ?? true,
        disclaimer_template_id: disclaimerTemplateId,
        department_condition: departmentCondition || 'all',
        departments: departments || null,
        region_condition: regionCondition || 'all',
        regions: regions || null,
        recipient_condition: recipientCondition || 'all',
        recipient_domains: recipientDomains || null,
        industry_condition: industryCondition || 'all',
        industries: industries || null,
        user_source_condition: userSourceCondition || 'all',
        user_sources: userSources || null,
        start_date: startDate || null,
        end_date: endDate || null,
        cascade_to_clients: cascadeToClients || false,
        created_by: userData.id,
      })
      .select()
      .single();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true, rule });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
