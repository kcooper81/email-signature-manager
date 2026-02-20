import { NextRequest, NextResponse } from 'next/server';
import { createClient, createServiceClient } from '@/lib/supabase/server';
import { getOrgPlan, checkFeature, checkLimit, planDenied, limitDenied } from '@/lib/billing/plan-guard';
import { processEvent, type WorkflowRunContext } from '@/lib/lifecycle/workflow-runner';

export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
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
    if (!checkFeature(orgPlan, 'hrIntegrations')) {
      return planDenied('HR integrations', 'professional');
    }

    // Get the change
    const { data: change } = await supabase
      .from('sync_change_queue')
      .select('*')
      .eq('id', id)
      .eq('organization_id', userData.organization_id)
      .eq('status', 'pending')
      .single();

    if (!change) return NextResponse.json({ error: 'Change not found' }, { status: 404 });

    // Check user limit for create-type changes
    if (change.change_type === 'create') {
      const { count: userCount } = await supabase
        .from('users')
        .select('*', { count: 'exact', head: true })
        .eq('organization_id', userData.organization_id);
      if (!checkLimit(orgPlan, 'maxUsers', userCount || 0)) {
        return limitDenied('Users', userCount || 0, orgPlan.plan.features.maxUsers);
      }
    }

    // Use service client for writes — auth already verified above
    const serviceClient = createServiceClient();

    // Apply the change
    if (change.change_type === 'create') {
      const data: Record<string, any> = { organization_id: userData.organization_id, email: change.user_email, source: 'hr_sync' };
      for (const fc of (change.field_changes || [])) {
        data[fc.field] = fc.newValue;
      }
      const { error: insertErr } = await serviceClient.from('users').insert(data);
      if (insertErr) {
        return NextResponse.json({ error: 'Failed to create user', details: insertErr.message }, { status: 500 });
      }
    } else if (change.change_type === 'update' && change.user_id) {
      const updates: Record<string, any> = {};
      for (const fc of (change.field_changes || [])) {
        updates[fc.field] = fc.newValue;
      }
      const { error: updateErr } = await serviceClient.from('users').update(updates).eq('id', change.user_id).eq('organization_id', userData.organization_id);
      if (updateErr) {
        return NextResponse.json({ error: 'Failed to update user', details: updateErr.message }, { status: 500 });
      }
    } else if (change.change_type === 'deactivate' && change.user_id) {
      const { error: deactivateErr } = await serviceClient.from('users').update({ is_active: false }).eq('id', change.user_id).eq('organization_id', userData.organization_id);
      if (deactivateErr) {
        return NextResponse.json({ error: 'Failed to deactivate user', details: deactivateErr.message }, { status: 500 });
      }
    }

    // Mark as approved
    const { error: approveErr } = await serviceClient
      .from('sync_change_queue')
      .update({ status: 'approved', reviewed_by: userData.id, reviewed_at: new Date().toISOString() })
      .eq('id', id);
    if (approveErr) {
      console.error('Failed to mark change as approved:', approveErr);
    }

    // Fire lifecycle event so workflows trigger
    const eventTypeMap: Record<string, string> = {
      create: 'user_joined',
      update: 'user_updated',
      deactivate: 'user_left',
    };

    const eventType = eventTypeMap[change.change_type];
    if (eventType) {
      // Determine the target user ID
      let targetUserId = change.user_id;
      if (change.change_type === 'create' && !targetUserId) {
        // For new users, look up the just-created user by email
        const { data: newUser } = await serviceClient
          .from('users')
          .select('id, department')
          .eq('email', change.user_email)
          .eq('organization_id', userData.organization_id)
          .single();
        targetUserId = newUser?.id;
      }

      if (targetUserId) {
        // Get user department for workflow filtering
        const { data: targetUserData } = await serviceClient
          .from('users')
          .select('department')
          .eq('id', targetUserId)
          .single();

        const { data: lifecycleEvent } = await serviceClient
          .from('lifecycle_events')
          .insert({
            organization_id: userData.organization_id,
            user_id: targetUserId,
            event_type: eventType,
            event_source: 'hr_sync',
            event_data: {
              changeId: id,
              changeType: change.change_type,
              fieldChanges: change.field_changes,
              approvedBy: userData.id,
            },
            processed: false,
          })
          .select('id')
          .single();

        if (lifecycleEvent) {
          // Process the event to trigger matching workflows
          try {
            const eventContext: WorkflowRunContext = {
              eventId: lifecycleEvent.id,
              organizationId: userData.organization_id,
              userId: targetUserId,
              eventType,
              eventSource: 'hr_sync',
              eventData: {
                changeId: id,
                changeType: change.change_type,
                fieldChanges: change.field_changes,
              },
              userDepartment: targetUserData?.department || undefined,
            };
            await processEvent(eventContext);
          } catch (err) {
            // Log but don't fail the approval if workflow processing fails
            console.error('Lifecycle event processing failed:', err);
          }
        }
      }
    }

    return NextResponse.json({ success: true });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
