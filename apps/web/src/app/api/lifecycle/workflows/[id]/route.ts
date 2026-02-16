import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { getOrgPlan, checkFeature, planDenied } from '@/lib/billing/plan-guard';
import { LIFECYCLE_WORKFLOW_UPDATABLE, pickAllowed } from '@/lib/api/field-allowlists';

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
    if (!checkFeature(orgPlan, 'maxLifecycleWorkflows')) {
      return planDenied('Lifecycle automation', 'professional');
    }

    const body = await request.json();
    const updates = pickAllowed(body, LIFECYCLE_WORKFLOW_UPDATABLE);

    if (Object.keys(updates).length === 0) {
      return NextResponse.json({ error: 'No valid fields to update' }, { status: 400 });
    }

    // Check webhook actions if actions are being updated
    if ('actions' in updates && Array.isArray(updates.actions)) {
      if ((updates.actions as any[]).some((a: any) => a.type === 'webhook') && !checkFeature(orgPlan, 'lifecycleWebhooks')) {
        return planDenied('Lifecycle webhook actions', 'enterprise');
      }
    }
    if ('cascade_to_clients' in updates && updates.cascade_to_clients && !checkFeature(orgPlan, 'lifecycleMspCascade')) {
      return planDenied('MSP lifecycle cascading', 'enterprise');
    }

    const { data: workflow, error } = await supabase
      .from('lifecycle_workflows')
      .update({ ...updates, updated_at: new Date().toISOString() })
      .eq('id', id)
      .eq('organization_id', userData.organization_id)
      .select()
      .single();

    if (error) return NextResponse.json({ error: error.message }, { status: 500 });
    return NextResponse.json({ success: true, workflow });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
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
    if (!checkFeature(orgPlan, 'maxLifecycleWorkflows')) {
      return planDenied('Lifecycle automation', 'professional');
    }

    const { error } = await supabase
      .from('lifecycle_workflows')
      .delete()
      .eq('id', id)
      .eq('organization_id', userData.organization_id);

    if (error) return NextResponse.json({ error: error.message }, { status: 500 });
    return NextResponse.json({ success: true });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
