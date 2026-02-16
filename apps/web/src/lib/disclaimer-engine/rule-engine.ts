/**
 * Disclaimer Rule Evaluation Engine
 * Unlike signature rules (first match wins), disclaimer rules return ALL matching disclaimers.
 * A user can be subject to GDPR + company confidentiality + industry-specific simultaneously.
 */

export interface DisclaimerRuleContext {
  userId: string;
  userEmail: string;
  userDepartment?: string;
  userRegion?: string;
  userSource?: string; // google, microsoft, manual, hubspot
  organizationId: string;
  organizationDomain?: string;
  organizationIndustry?: string;
  recipients?: string[];
  timestamp?: Date;
}

export interface DisclaimerRule {
  id: string;
  name: string;
  priority: number;
  isActive: boolean;
  disclaimerTemplateId: string;
  departmentCondition: string;
  departments?: string[] | null;
  regionCondition: string;
  regions?: string[] | null;
  recipientCondition: string;
  recipientDomains?: string[] | null;
  industryCondition: string;
  industries?: string[] | null;
  userSourceCondition: string;
  userSources?: string[] | null;
  startDate?: Date | null;
  endDate?: Date | null;
  cascadeToClients?: boolean;
}

/**
 * Evaluate all rules and return ALL matching disclaimer template IDs
 * (sorted by priority, highest first)
 */
export function evaluateDisclaimerRules(
  rules: DisclaimerRule[],
  context: DisclaimerRuleContext
): { templateId: string; ruleId: string; ruleName: string }[] {
  const activeRules = rules
    .filter(rule => rule.isActive)
    .sort((a, b) => b.priority - a.priority);

  const matches: { templateId: string; ruleId: string; ruleName: string }[] = [];

  for (const rule of activeRules) {
    if (evaluateRule(rule, context)) {
      matches.push({
        templateId: rule.disclaimerTemplateId,
        ruleId: rule.id,
        ruleName: rule.name,
      });
    }
  }

  return matches;
}

function evaluateRule(rule: DisclaimerRule, context: DisclaimerRuleContext): boolean {
  if (!evaluateDepartmentCondition(rule, context)) return false;
  if (!evaluateRegionCondition(rule, context)) return false;
  if (!evaluateRecipientCondition(rule, context)) return false;
  if (!evaluateIndustryCondition(rule, context)) return false;
  if (!evaluateUserSourceCondition(rule, context)) return false;
  if (!evaluateDateCondition(rule, context)) return false;
  return true;
}

function evaluateDepartmentCondition(rule: DisclaimerRule, context: DisclaimerRuleContext): boolean {
  if (rule.departmentCondition === 'all') return true;
  if (!rule.departments || rule.departments.length === 0) return true;
  if (!context.userDepartment) return false;
  return rule.departments.map(d => d.toLowerCase()).includes(context.userDepartment.toLowerCase());
}

function evaluateRegionCondition(rule: DisclaimerRule, context: DisclaimerRuleContext): boolean {
  if (rule.regionCondition === 'all') return true;
  if (!rule.regions || rule.regions.length === 0) return true;
  if (!context.userRegion) return false;
  return rule.regions.map(r => r.toLowerCase()).includes(context.userRegion.toLowerCase());
}

function evaluateRecipientCondition(rule: DisclaimerRule, context: DisclaimerRuleContext): boolean {
  if (rule.recipientCondition === 'all') return true;
  if (!context.recipients || context.recipients.length === 0) return true;

  if (rule.recipientCondition === 'external') {
    if (!context.organizationDomain) return false;
    return context.recipients.some(r => {
      const domain = r.split('@')[1]?.toLowerCase();
      return domain !== context.organizationDomain?.toLowerCase();
    });
  }

  if (rule.recipientCondition === 'internal') {
    if (!context.organizationDomain) return false;
    return context.recipients.every(r => {
      const domain = r.split('@')[1]?.toLowerCase();
      return domain === context.organizationDomain?.toLowerCase();
    });
  }

  if (rule.recipientCondition === 'specific_domains') {
    if (!rule.recipientDomains || rule.recipientDomains.length === 0) return true;
    const targetDomains = rule.recipientDomains.map(d => d.toLowerCase());
    return context.recipients.some(r => {
      const domain = r.split('@')[1]?.toLowerCase();
      return domain && targetDomains.includes(domain);
    });
  }

  return true;
}

function evaluateIndustryCondition(rule: DisclaimerRule, context: DisclaimerRuleContext): boolean {
  if (rule.industryCondition === 'all') return true;
  if (!rule.industries || rule.industries.length === 0) return true;
  if (!context.organizationIndustry) return false;
  return rule.industries.map(i => i.toLowerCase()).includes(context.organizationIndustry.toLowerCase());
}

function evaluateUserSourceCondition(rule: DisclaimerRule, context: DisclaimerRuleContext): boolean {
  if (rule.userSourceCondition === 'all') return true;
  if (!rule.userSources || rule.userSources.length === 0) return true;
  if (!context.userSource) return false;
  return rule.userSources.includes(context.userSource);
}

function evaluateDateCondition(rule: DisclaimerRule, context: DisclaimerRuleContext): boolean {
  const now = context.timestamp || new Date();
  if (rule.startDate && now < rule.startDate) return false;
  if (rule.endDate && now > rule.endDate) return false;
  return true;
}
