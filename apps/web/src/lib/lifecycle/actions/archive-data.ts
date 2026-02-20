import { createServiceClient } from '@/lib/supabase/server';
import type { WorkflowRunContext } from '../workflow-runner';

export async function archiveData(context: WorkflowRunContext, _config: Record<string, any>) {
  const supabase = createServiceClient();

  // Remove signature assignments
  await supabase
    .from('signature_assignments')
    .delete()
    .eq('user_id', context.userId)
    .eq('organization_id', context.organizationId);
}
