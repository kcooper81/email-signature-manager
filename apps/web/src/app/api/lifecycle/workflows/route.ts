import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { getOrgPlan, checkFeature, checkLimit, planDenied, limitDenied } from '@/lib/billing/plan-guard';

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
    if (!checkFeature(orgPlan, 'maxLifecycleWorkflows')) {
      return planDenied('Lifecycle automation', 'professional');
    }

    const { data: workflows } = await supabase
      .from('lifecycle_workflows')
      .select('*')
      .eq('organization_id', userData.organization_id)
      .order('priority', { ascending: false });

    // Load MSP cascaded workflows
    const { data: org } = await supabase
      .from('organizations')
      .select('parent_organization_id')
      .eq('id', userData.organization_id)
      .single();

    let cascadedWorkflows: any[] = [];
    if (org?.parent_organization_id) {
      const { data: mspWorkflows } = await supabase
        .from('lifecycle_workflows')
        .select('*')
        .eq('organization_id', org.parent_organization_id)
        .eq('cascade_to_clients', true)
        .eq('is_active', true);
      cascadedWorkflows = (mspWorkflows || []).map(w => ({ ...w, _cascaded: true, _readOnly: true }));
    }

    return NextResponse.json({ workflows: [...(workflows || []), ...cascadedWorkflows] });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

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
    if (!checkFeature(orgPlan, 'maxLifecycleWorkflows')) {
      return planDenied('Lifecycle automation', 'professional');
    }

    const { count } = await supabase
      .from('lifecycle_workflows')
      .select('*', { count: 'exact', head: true })
      .eq('organization_id', userData.organization_id);
    if (!checkLimit(orgPlan, 'maxLifecycleWorkflows', count || 0)) {
      return limitDenied('Lifecycle workflows', count || 0, orgPlan.plan.features.maxLifecycleWorkflows);
    }

    const body = await request.json();
    const { name, description, eventType, priority, departmentFilter, sourceFilter, actions, cascadeToClients } = body;

    if (!name || !eventType) {
      return NextResponse.json({ error: 'Name and event type are required' }, { status: 400 });
    }

    // Check if any action is a webhook (Enterprise only)
    const actionsList = actions || [];
    if (actionsList.some((a: any) => a.type === 'webhook') && !checkFeature(orgPlan, 'lifecycleWebhooks')) {
      return planDenied('Lifecycle webhook actions', 'enterprise');
    }
    if (cascadeToClients && !checkFeature(orgPlan, 'lifecycleMspCascade')) {
      return planDenied('MSP lifecycle cascading', 'enterprise');
    }

    const { data: workflow, error } = await supabase
      .from('lifecycle_workflows')
      .insert({
        organization_id: userData.organization_id,
        name,
        description: description || null,
        event_type: eventType,
        is_active: true,
        priority: priority || 0,
        department_filter: departmentFilter || null,
        source_filter: sourceFilter || null,
        actions: actions || [],
        cascade_to_clients: cascadeToClients || false,
        created_by: userData.id,
      })
      .select()
      .single();

    if (error) return NextResponse.json({ error: error.message }, { status: 500 });
    return NextResponse.json({ success: true, workflow });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
