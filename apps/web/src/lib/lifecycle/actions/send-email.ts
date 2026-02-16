import type { WorkflowRunContext } from '../workflow-runner';

export async function sendEmail(context: WorkflowRunContext, config: Record<string, any>) {
  const { subject, body, recipientType } = config;

  // In production, integrate with email service (SendGrid, Resend, etc.)
  console.log(`[Lifecycle] Sending email: subject="${subject || 'Welcome'}", to=${recipientType || 'user'}, userId=${context.userId}`);
}
