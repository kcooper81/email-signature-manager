import type { WorkflowRunContext } from '../workflow-runner';

export async function sendEmail(context: WorkflowRunContext, config: Record<string, any>) {
  const { subject, body, recipientType } = config;

  // In production, integrate with email service (SendGrid, Resend, etc.)
}
