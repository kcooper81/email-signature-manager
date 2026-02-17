import { createClient } from '@/lib/supabase/server';
import type { WorkflowRunContext } from '../workflow-runner';

export async function notifyAdmin(context: WorkflowRunContext, config: Record<string, any>) {
  const supabase = createClient();
  const { message } = config;

  // Get org admins
  const { data: admins } = await supabase
    .from('users')
    .select('id, email')
    .eq('organization_id', context.organizationId)
    .in('role', ['owner', 'admin']);

  // In production, send notification to each admin
}
