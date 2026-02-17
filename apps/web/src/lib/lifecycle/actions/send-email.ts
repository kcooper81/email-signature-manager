import { logAudit } from '@/lib/audit/logger';
import type { WorkflowRunContext } from '../workflow-runner';

export async function sendEmail(context: WorkflowRunContext, config: Record<string, any>) {
  const { subject, body, recipientType } = config;

  // Log notification to audit log (serves as notification record)
  // When external email service is added (SendGrid, Resend, etc.), this is the integration point
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
}
