import { createClient } from '@/lib/supabase/server';
import type { WorkflowRunContext } from '../workflow-runner';

export async function deactivateUser(context: WorkflowRunContext, _config: Record<string, any>) {
  const supabase = createClient();

  await supabase
    .from('users')
    .update({ is_active: false, updated_at: new Date().toISOString() })
    .eq('id', context.userId)
    .eq('organization_id', context.organizationId);

  console.log(`[Lifecycle] Deactivated user ${context.userId}`);
}
