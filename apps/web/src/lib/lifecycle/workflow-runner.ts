/**
 * Lifecycle Workflow Runner
 * Matches events to workflows and executes action sequences
 */

import { createServiceClient } from '@/lib/supabase/server';
import type { WorkflowAction } from '@/lib/db/schema';

export interface WorkflowRunContext {
  eventId: string;
  organizationId: string;
  userId: string;
  eventType: string;
  eventSource: string;
  eventData: Record<string, any>;
  userDepartment?: string;
}

export async function processEvent(context: WorkflowRunContext): Promise<void> {
  const supabase = createServiceClient();

  // Plan check: skip if org doesn't have lifecycle access
  const { getOrgPlan, checkFeature } = await import('@/lib/billing/plan-guard');
  const orgPlan = await getOrgPlan(supabase, context.organizationId);
  if (!checkFeature(orgPlan, 'maxLifecycleWorkflows')) {
    // Mark event as processed to prevent retries, but don't run workflows
    await supabase
      .from('lifecycle_events')
      .update({ processed: true, processed_at: new Date().toISOString() })
      .eq('id', context.eventId);
    return;
  }

  // Find matching workflows
  const { data: workflows } = await supabase
    .from('lifecycle_workflows')
    .select('*')
    .eq('organization_id', context.organizationId)
    .eq('event_type', context.eventType)
    .eq('is_active', true)
    .order('priority', { ascending: true });

  // Also load MSP cascaded workflows
  const { data: org } = await supabase
    .from('organizations')
    .select('parent_organization_id')
    .eq('id', context.organizationId)
    .single();

  let allWorkflows = workflows || [];

  if (org?.parent_organization_id) {
    const { data: mspWorkflows } = await supabase
      .from('lifecycle_workflows')
      .select('*')
      .eq('organization_id', org.parent_organization_id)
      .eq('event_type', context.eventType)
      .eq('cascade_to_clients', true)
      .eq('is_active', true);

    if (mspWorkflows) {
      allWorkflows = [...allWorkflows, ...mspWorkflows];
    }
  }

  // Filter by department and source
  const matchingWorkflows = allWorkflows.filter(w => {
    if (w.department_filter?.length > 0) {
      if (!context.userDepartment || !w.department_filter.includes(context.userDepartment)) return false;
    }
    if (w.source_filter?.length > 0) {
      if (!w.source_filter.includes(context.eventSource)) return false;
    }
    return true;
  });

  // Execute each matching workflow
  for (const workflow of matchingWorkflows) {
    await executeWorkflow(workflow, context);
  }

  // Mark event as processed
  await supabase
    .from('lifecycle_events')
    .update({ processed: true, processed_at: new Date().toISOString(), workflow_id: matchingWorkflows[0]?.id })
    .eq('id', context.eventId);
}

async function executeWorkflow(workflow: any, context: WorkflowRunContext): Promise<void> {
  const supabase = createServiceClient();

  // Create run record
  const { data: run, error: runError } = await supabase
    .from('lifecycle_workflow_runs')
    .insert({
      organization_id: context.organizationId,
      workflow_id: workflow.id,
      event_id: context.eventId,
      user_id: context.userId,
      status: 'running',
    })
    .select('id')
    .single();

  if (runError || !run) {
    console.error('Failed to create workflow run record:', runError);
    return;
  }

  const actions: WorkflowAction[] = workflow.actions || [];
  const actionResults: { action: string; status: string; error?: string }[] = [];
  let hasFailure = false;

  for (const action of actions) {
    try {
      await executeAction(action, context);
      actionResults.push({ action: action.type, status: 'completed' });
    } catch (err: any) {
      hasFailure = true;
      actionResults.push({ action: action.type, status: 'failed', error: err.message });
    }
  }

  // Update run status
  const { error: updateErr } = await supabase
    .from('lifecycle_workflow_runs')
    .update({
      status: hasFailure ? (actionResults.some(r => r.status === 'completed') ? 'partial' : 'failed') : 'completed',
      action_results: actionResults,
      completed_at: new Date().toISOString(),
    })
    .eq('id', run.id);
  if (updateErr) {
    console.error('Failed to update workflow run status:', updateErr);
  }
}

async function executeAction(action: WorkflowAction, context: WorkflowRunContext): Promise<void> {
  switch (action.type) {
    case 'assign_template':
      const { assignTemplate } = await import('./actions/assign-template');
      await assignTemplate(context, action.config);
      break;
    case 'deploy_signature':
      const { deploySignature } = await import('./actions/deploy-signature');
      await deploySignature(context, action.config);
      break;
    case 'send_welcome_email':
    case 'send_notification':
      const { sendEmail } = await import('./actions/send-email');
      await sendEmail(context, action.config);
      break;
    case 'notify_admin':
      const { notifyAdmin } = await import('./actions/notify-admin');
      await notifyAdmin(context, action.config);
      break;
    case 'archive_signature_data':
      const { archiveData } = await import('./actions/archive-data');
      await archiveData(context, action.config);
      break;
    case 'set_departed_signature':
      const { setDepartedSignature } = await import('./actions/set-departed-sig');
      await setDepartedSignature(context, action.config);
      break;
    case 'deactivate_user':
      const { deactivateUser } = await import('./actions/deactivate-user');
      await deactivateUser(context, action.config);
      break;
    case 'webhook':
      // Enterprise-only: check plan before executing webhook
      const { getOrgPlan: getOrgPlanForWebhook, checkFeature: checkWebhookFeature } = await import('@/lib/billing/plan-guard');
      const webhookSupabase = createServiceClient();
      const webhookOrgPlan = await getOrgPlanForWebhook(webhookSupabase, context.organizationId);
      if (!checkWebhookFeature(webhookOrgPlan, 'lifecycleWebhooks')) {
        throw new Error('Webhook actions require an Enterprise plan');
      }
      const { executeWebhook } = await import('./actions/webhook');
      await executeWebhook(context, action.config);
      break;
    case 'wait':
      // Wait is handled by scheduling, not inline
      break;
    default:
      throw new Error(`Unsupported action type: ${action.type}`);
  }
}
