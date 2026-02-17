import { createClient } from '@/lib/supabase/server';
import { logAudit } from '@/lib/audit/logger';
import type { WorkflowRunContext } from '../workflow-runner';

export async function notifyAdmin(context: WorkflowRunContext, config: Record<string, any>) {
  const supabase = createClient();
  const { message, notificationType } = config;

  // Get org admins
  const { data: admins } = await supabase
    .from('users')
    .select('id, email')
    .eq('organization_id', context.organizationId)
    .in('role', ['owner', 'admin']);

  if (!admins || admins.length === 0) return;

  // Log notification for each admin via audit log (serves as the in-app notification channel)
  for (const admin of admins) {
    await logAudit({
      organizationId: context.organizationId,
      userId: admin.id,
      action: 'create',
      resourceType: 'user',
      resourceId: context.userId,
      metadata: {
        notificationType: notificationType || 'lifecycle_event',
        message: message || `Lifecycle event: ${context.eventType}`,
        eventType: context.eventType,
        eventSource: context.eventSource,
        eventId: context.eventId,
        targetUserId: context.userId,
      },
    });
  }
}
