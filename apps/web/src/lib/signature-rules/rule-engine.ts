/**
 * Signature Rule Evaluation Engine
 * Based on WiseStamp and Exclaimer rule logic
 * 
 * Evaluates rules in priority order and returns the matching template
 */

export interface RuleEvaluationContext {
  // Sender info
  senderId: string;
  senderEmail: string;
  senderDepartment?: string;
  
  // Email metadata
  emailType: 'new' | 'reply'; // New (compose) or Reply
  recipients: string[]; // Array of recipient email addresses
  ccRecipients?: string[];
  subject?: string;
  
  // Organization context
  organizationId: string;
  organizationDomain?: string; // For internal/external detection
  
  // Timestamp
  timestamp?: Date;
}

export interface SignatureRule {
  id: string;
  templateId: string;
  name: string;
  priority: number;
  isActive: boolean;
  
  // Conditions
  senderCondition: 'all' | 'specific_users' | 'specific_departments';
  senderUserIds?: string[];
  senderDepartments?: string[];
  
  emailType: 'all' | 'new' | 'reply';
  
  recipientCondition: 'all' | 'all_internal' | 'all_external' | 'at_least_one_internal' | 'at_least_one_external';
  
  startDate?: Date;
  endDate?: Date;
  
  subjectContains?: string;
  subjectNotContains?: string;
}

/**
 * Evaluate all rules and return the matching template ID
 * Returns null if no rules match (use default template)
 */
export function evaluateSignatureRules(
  rules: SignatureRule[],
  context: RuleEvaluationContext
): string | null {
  // Filter active rules and sort by priority (highest first)
  const activeRules = rules
    .filter(rule => rule.isActive)
    .sort((a, b) => b.priority - a.priority);

  // Evaluate each rule in priority order
  for (const rule of activeRules) {
    if (evaluateRule(rule, context)) {
      return rule.templateId;
    }
  }

  // No rules matched
  return null;
}

/**
 * Evaluate a single rule against the context
 */
function evaluateRule(rule: SignatureRule, context: RuleEvaluationContext): boolean {
  // Check sender conditions
  if (!evaluateSenderCondition(rule, context)) {
    return false;
  }

  // Check email type
  if (!evaluateEmailType(rule, context)) {
    return false;
  }

  // Check recipient conditions
  if (!evaluateRecipientCondition(rule, context)) {
    return false;
  }

  // Check date/time conditions
  if (!evaluateDateCondition(rule, context)) {
    return false;
  }

  // Check subject conditions
  if (!evaluateSubjectCondition(rule, context)) {
    return false;
  }

  // All conditions passed
  return true;
}

/**
 * Evaluate sender conditions
 */
function evaluateSenderCondition(rule: SignatureRule, context: RuleEvaluationContext): boolean {
  switch (rule.senderCondition) {
    case 'all':
      return true;

    case 'specific_users':
      if (!rule.senderUserIds || rule.senderUserIds.length === 0) {
        return true; // No users specified = all users
      }
      return rule.senderUserIds.includes(context.senderId);

    case 'specific_departments':
      if (!rule.senderDepartments || rule.senderDepartments.length === 0) {
        return true; // No departments specified = all departments
      }
      if (!context.senderDepartment) {
        return false; // User has no department
      }
      return rule.senderDepartments.includes(context.senderDepartment);

    default:
      return true;
  }
}

/**
 * Evaluate email type (new vs reply)
 */
function evaluateEmailType(rule: SignatureRule, context: RuleEvaluationContext): boolean {
  if (rule.emailType === 'all') {
    return true;
  }
  return rule.emailType === context.emailType;
}

/**
 * Evaluate recipient conditions (internal vs external)
 */
function evaluateRecipientCondition(rule: SignatureRule, context: RuleEvaluationContext): boolean {
  if (rule.recipientCondition === 'all') {
    return true;
  }

  if (!context.organizationDomain) {
    // Can't determine internal/external without domain, so fail the rule
    return false;
  }

  // Classify recipients as internal or external
  const internalRecipients: string[] = [];
  const externalRecipients: string[] = [];

  for (const recipient of context.recipients) {
    if (isInternalEmail(recipient, context.organizationDomain)) {
      internalRecipients.push(recipient);
    } else {
      externalRecipients.push(recipient);
    }
  }

  // Evaluate based on condition
  switch (rule.recipientCondition) {
    case 'all_internal':
      return externalRecipients.length === 0 && internalRecipients.length > 0;

    case 'all_external':
      return internalRecipients.length === 0 && externalRecipients.length > 0;

    case 'at_least_one_internal':
      return internalRecipients.length > 0;

    case 'at_least_one_external':
      return externalRecipients.length > 0;

    default:
      // Should never reach here since 'all' is handled above
      return true;
  }
}

/**
 * Check if an email is internal to the organization
 */
function isInternalEmail(email: string, organizationDomain: string): boolean {
  const emailDomain = email.split('@')[1]?.toLowerCase();
  const orgDomain = organizationDomain.toLowerCase();
  
  return emailDomain === orgDomain;
}

/**
 * Evaluate date/time conditions (for campaigns)
 */
function evaluateDateCondition(rule: SignatureRule, context: RuleEvaluationContext): boolean {
  const now = context.timestamp || new Date();

  // Check start date
  if (rule.startDate && now < rule.startDate) {
    return false;
  }

  // Check end date
  if (rule.endDate && now > rule.endDate) {
    return false;
  }

  return true;
}

/**
 * Evaluate subject conditions
 */
function evaluateSubjectCondition(rule: SignatureRule, context: RuleEvaluationContext): boolean {
  if (!context.subject) {
    // No subject provided, skip subject checks
    return true;
  }

  const subject = context.subject.toLowerCase();

  // Check subject contains
  if (rule.subjectContains) {
    const searchTerm = rule.subjectContains.toLowerCase();
    if (!subject.includes(searchTerm)) {
      return false;
    }
  }

  // Check subject not contains
  if (rule.subjectNotContains) {
    const searchTerm = rule.subjectNotContains.toLowerCase();
    if (subject.includes(searchTerm)) {
      return false;
    }
  }

  return true;
}

/**
 * Helper to get default template for organization
 */
export async function getDefaultTemplate(organizationId: string): Promise<string | null> {
  // This will be implemented to query the database for the default template
  // For now, return null to indicate no default
  return null;
}

/**
 * Test helper: Validate rule configuration
 */
export function validateRule(rule: SignatureRule): { valid: boolean; errors: string[] } {
  const errors: string[] = [];

  if (!rule.templateId) {
    errors.push('Template ID is required');
  }

  if (rule.senderCondition === 'specific_users' && (!rule.senderUserIds || rule.senderUserIds.length === 0)) {
    errors.push('Specific users condition requires at least one user ID');
  }

  if (rule.senderCondition === 'specific_departments' && (!rule.senderDepartments || rule.senderDepartments.length === 0)) {
    errors.push('Specific departments condition requires at least one department');
  }

  if (rule.startDate && rule.endDate && rule.startDate > rule.endDate) {
    errors.push('Start date must be before end date');
  }

  return {
    valid: errors.length === 0,
    errors,
  };
}
