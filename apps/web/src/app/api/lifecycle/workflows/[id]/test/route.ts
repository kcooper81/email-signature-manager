import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { processEvent } from '@/lib/lifecycle';
import { getOrgPlan, checkFeature, planDenied } from '@/lib/billing/plan-guard';

export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const supabase = createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const { data: userData } = await supabase
      .from('users').select('id, organization_id, role, department').eq('auth_id', user.id).single();
    if (!userData || !['owner', 'admin'].includes(userData.role)) {
      return NextResponse.json({ error: 'Insufficient permissions' }, { status: 403 });
    }

    const orgPlan = await getOrgPlan(supabase, userData.organization_id);
    if (!checkFeature(orgPlan, 'maxLifecycleWorkflows')) {
      return planDenied('Lifecycle automation', 'professional');
    }

    const body = await request.json();
    const { testUserId } = body;

    // Security: validate testUserId belongs to same org
    if (testUserId && testUserId !== userData.id) {
      const { data: testUser } = await supabase
        .from('users')
        .select('id')
        .eq('id', testUserId)
        .eq('organization_id', userData.organization_id)
        .single();
      if (!testUser) {
        return NextResponse.json({ error: 'Test user not found in your organization' }, { status: 403 });
      }
    }

    // Get workflow
    const { data: workflow } = await supabase
      .from('lifecycle_workflows')
      .select('*')
      .eq('id', id)
      .eq('organization_id', userData.organization_id)
      .single();

    if (!workflow) return NextResponse.json({ error: 'Workflow not found' }, { status: 404 });

    // Create test event
    const { data: event } = await supabase
      .from('lifecycle_events')
      .insert({
        organization_id: userData.organization_id,
        user_id: testUserId || userData.id,
        event_type: workflow.event_type,
        event_source: 'manual',
        event_data: { test: true },
        processed: false,
      })
      .select('id')
      .single();

    if (!event) return NextResponse.json({ error: 'Failed to create test event' }, { status: 500 });

    // Process the event
    await processEvent({
      eventId: event.id,
      organizationId: userData.organization_id,
      userId: testUserId || userData.id,
      eventType: workflow.event_type,
      eventSource: 'manual',
      eventData: { test: true },
      userDepartment: userData.department || undefined,
    });

    // Fetch the run results to report actions executed
    const { data: runs } = await supabase
      .from('lifecycle_workflow_runs')
      .select('action_results')
      .eq('event_id', event.id)
      .order('started_at', { ascending: false })
      .limit(1);

    const actionsExecuted = runs?.[0]?.action_results?.length || 0;

    return NextResponse.json({ success: true, eventId: event.id, actionsExecuted });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
