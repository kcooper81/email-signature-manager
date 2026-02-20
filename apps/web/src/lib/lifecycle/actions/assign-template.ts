import { createServiceClient } from '@/lib/supabase/server';
import type { WorkflowRunContext } from '../workflow-runner';

export async function assignTemplate(context: WorkflowRunContext, config: Record<string, any>) {
  const supabase = createServiceClient();
  const { templateId, departmentMapping } = config;

  let targetTemplateId = templateId;

  // If department mapping is provided, look up template by department
  if (departmentMapping && context.userDepartment) {
    targetTemplateId = departmentMapping[context.userDepartment] || templateId;
  }

  if (!targetTemplateId) return;

  // Upsert assignment
  const { data: existing } = await supabase
    .from('signature_assignments')
    .select('id')
    .eq('user_id', context.userId)
    .eq('organization_id', context.organizationId)
    .single();

  if (existing) {
    await supabase
      .from('signature_assignments')
      .update({ template_id: targetTemplateId })
      .eq('id', existing.id);
  } else {
    await supabase
      .from('signature_assignments')
      .insert({
        template_id: targetTemplateId,
        user_id: context.userId,
        organization_id: context.organizationId,
        priority: 0,
      });
  }
}
