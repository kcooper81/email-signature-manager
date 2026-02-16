import type { WorkflowRunContext } from '../workflow-runner';

export async function setDepartedSignature(context: WorkflowRunContext, config: Record<string, any>) {
  const { message } = config;
  const defaultMessage = 'This person is no longer with the organization.';

  // In production, deploy a special "departed" signature via Gmail API
  console.log(`[Lifecycle] Setting departed signature for user ${context.userId}: ${message || defaultMessage}`);
}
