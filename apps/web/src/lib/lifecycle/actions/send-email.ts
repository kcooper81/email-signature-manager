import { logAudit } from '@/lib/audit/logger';
import { createServiceClient } from '@/lib/supabase/server';
import { trackLoopsEvent, loopsEnabled } from '@/lib/email/loops';
import type { WorkflowRunContext } from '../workflow-runner';

/**
 * Lifecycle workflow "send email" action.
 *
 * Records the notification in the audit log (always), and — when Loops is
 * connected — fires a `lifecycle_<eventType>` event to the affected contact so
 * an automation in Loops delivers the actual email. The event name + the
 * subject/body from the workflow config let the Loops template render.
 *
 * Env-gated and best-effort: with no LOOPS_API_KEY this behaves exactly as the
 * previous audit-only stub.
 */
export async function sendEmail(context: WorkflowRunContext, config: Record<string, any>) {
  const { subject, body, recipientType } = config;

  // Audit record (always) — serves as the notification log.
  await logAudit({
    organizationId: context.organizationId,
    userId: context.userId,
    action: 'create',
    resourceType: 'user',
    metadata: {
      notificationType: 'email',
      subject: subject || `Lifecycle notification: ${context.eventType}`,
      body: body || '',
      recipientType: recipientType || 'user',
      eventType: context.eventType,
      eventSource: context.eventSource,
      eventId: context.eventId,
    },
  });

  if (!loopsEnabled()) return;

  // Resolve the recipient email, then trigger the Loops automation.
  try {
    const email =
      context.eventData?.email ||
      (await resolveRecipientEmail(context, recipientType || 'user'));

    if (!email) return;

    await trackLoopsEvent({
      email,
      eventName: `lifecycle_${context.eventType}`,
      eventProperties: {
        subject: subject || '',
        body: body || '',
        eventSource: context.eventSource,
      },
    });
  } catch (loopsError) {
    console.error('[loops] lifecycle send-email failed (non-fatal):', loopsError);
  }
}

/** Resolve the email for the affected user, or the org owner for admin notices. */
async function resolveRecipientEmail(
  context: WorkflowRunContext,
  recipientType: string
): Promise<string | null> {
  const supabase = createServiceClient();

  if (recipientType === 'admin') {
    const { data: owner } = await supabase
      .from('users')
      .select('email')
      .eq('organization_id', context.organizationId)
      .eq('role', 'owner')
      .maybeSingle();
    return owner?.email ?? null;
  }

  const { data: user } = await supabase
    .from('users')
    .select('email')
    .eq('id', context.userId)
    .maybeSingle();
  return user?.email ?? null;
}
