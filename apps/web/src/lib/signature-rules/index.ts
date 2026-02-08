/**
 * Signature Rules - Main entry point
 * Fetches rules and evaluates them for a given context
 */

import { createClient } from '@/lib/supabase/server';
import { evaluateSignatureRules, type RuleEvaluationContext, type SignatureRule } from './rule-engine';

/**
 * Get the appropriate template ID for a user based on rules
 * Returns the template ID to use, or null if no rules match (use default)
 */
export async function getTemplateForUser(
  userId: string,
  organizationId: string,
  context?: Partial<RuleEvaluationContext>
): Promise<string | null> {
  const supabase = createClient();

  // Get user details
  const { data: user } = await supabase
    .from('users')
    .select('id, email, department, organization_id')
    .eq('id', userId)
    .single();

  if (!user) {
    return null;
  }

  // Get organization domain for internal/external detection
  const { data: org } = await supabase
    .from('organizations')
    .select('domain')
    .eq('id', organizationId)
    .single();

  // Fetch all active rules for this organization
  const { data: rules } = await supabase
    .from('signature_rules')
    .select('*')
    .eq('organization_id', organizationId)
    .eq('is_active', true)
    .order('priority', { ascending: false });

  if (!rules || rules.length === 0) {
    return null; // No rules, use default template
  }

  // Build evaluation context
  const evaluationContext: RuleEvaluationContext = {
    senderId: user.id,
    senderEmail: user.email,
    senderDepartment: user.department || undefined,
    emailType: context?.emailType || 'new',
    recipients: context?.recipients || [],
    ccRecipients: context?.ccRecipients,
    subject: context?.subject,
    organizationId: organizationId,
    organizationDomain: org?.domain || undefined,
    timestamp: context?.timestamp || new Date(),
  };

  // Convert database rules to engine format
  const engineRules: SignatureRule[] = rules.map(rule => ({
    id: rule.id,
    templateId: rule.template_id,
    name: rule.name,
    priority: rule.priority,
    isActive: rule.is_active,
    senderCondition: rule.sender_condition as any,
    senderUserIds: rule.sender_user_ids || undefined,
    senderDepartments: rule.sender_departments || undefined,
    emailType: rule.email_type as any,
    recipientCondition: rule.recipient_condition as any,
    startDate: rule.start_date ? new Date(rule.start_date) : undefined,
    endDate: rule.end_date ? new Date(rule.end_date) : undefined,
    subjectContains: rule.subject_contains || undefined,
    subjectNotContains: rule.subject_not_contains || undefined,
  }));

  // Evaluate rules
  const matchedTemplateId = evaluateSignatureRules(engineRules, evaluationContext);

  return matchedTemplateId;
}

/**
 * Get default template for organization
 */
export async function getDefaultTemplate(organizationId: string): Promise<string | null> {
  const supabase = createClient();

  const { data: template } = await supabase
    .from('signature_templates')
    .select('id')
    .eq('organization_id', organizationId)
    .eq('is_default', true)
    .single();

  return template?.id || null;
}

/**
 * Get template for user with fallback to default
 */
export async function getTemplateForUserWithFallback(
  userId: string,
  organizationId: string,
  context?: Partial<RuleEvaluationContext>
): Promise<string | null> {
  // Try to get template based on rules
  const ruleBasedTemplate = await getTemplateForUser(userId, organizationId, context);
  
  if (ruleBasedTemplate) {
    return ruleBasedTemplate;
  }

  // Fallback to default template
  return await getDefaultTemplate(organizationId);
}
