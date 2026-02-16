/**
 * Disclaimer Engine - Main Entry Point
 * Resolves all applicable disclaimers for a user and returns combined HTML
 */

import { createClient } from '@/lib/supabase/server';
import { evaluateDisclaimerRules, type DisclaimerRuleContext, type DisclaimerRule } from './rule-engine';
import { renderDisclaimerHtml, combineDisclaimers } from './renderer';

export interface ResolvedDisclaimer {
  templateId: string;
  ruleId: string;
  ruleName: string;
  templateName: string;
  html: string;
}

export interface DisclaimerResolution {
  disclaimers: ResolvedDisclaimer[];
  combinedHtml: string;
}

/**
 * Resolve all applicable disclaimers for a user context
 * Loads org rules + MSP cascaded rules, evaluates, renders, returns combined HTML
 */
export async function resolveDisclaimersForUser(
  context: DisclaimerRuleContext,
  mspOrgId?: string | null
): Promise<DisclaimerResolution> {
  const supabase = createClient();

  // Load rules for the user's organization
  const { data: orgRules } = await supabase
    .from('disclaimer_rules')
    .select('*, disclaimer_templates(*)')
    .eq('organization_id', context.organizationId)
    .eq('is_active', true);

  let allRules: any[] = orgRules || [];

  // If this org has a parent MSP, also load cascaded rules
  if (mspOrgId) {
    const { data: mspRules } = await supabase
      .from('disclaimer_rules')
      .select('*, disclaimer_templates(*)')
      .eq('organization_id', mspOrgId)
      .eq('cascade_to_clients', true)
      .eq('is_active', true);

    if (mspRules) {
      allRules = [...allRules, ...mspRules];
    }
  }

  // Map to DisclaimerRule interface
  const rules: DisclaimerRule[] = allRules.map(r => ({
    id: r.id,
    name: r.name,
    priority: r.priority,
    isActive: r.is_active,
    disclaimerTemplateId: r.disclaimer_template_id,
    departmentCondition: r.department_condition || 'all',
    departments: r.departments,
    regionCondition: r.region_condition || 'all',
    regions: r.regions,
    recipientCondition: r.recipient_condition || 'all',
    recipientDomains: r.recipient_domains,
    industryCondition: r.industry_condition || 'all',
    industries: r.industries,
    userSourceCondition: r.user_source_condition || 'all',
    userSources: r.user_sources,
    startDate: r.start_date ? new Date(r.start_date) : null,
    endDate: r.end_date ? new Date(r.end_date) : null,
    cascadeToClients: r.cascade_to_clients,
  }));

  // Evaluate: returns ALL matching rules (not just first)
  const matches = evaluateDisclaimerRules(rules, context);

  // Render each matched disclaimer
  const disclaimers: ResolvedDisclaimer[] = [];

  for (const match of matches) {
    const ruleData = allRules.find(r => r.id === match.ruleId);
    const template = ruleData?.disclaimer_templates;

    if (!template) continue;

    const html = renderDisclaimerHtml(
      template.content,
      template.content_html,
      template.styling
    );

    disclaimers.push({
      templateId: match.templateId,
      ruleId: match.ruleId,
      ruleName: match.ruleName,
      templateName: template.name,
      html,
    });
  }

  return {
    disclaimers,
    combinedHtml: combineDisclaimers(disclaimers.map(d => d.html)),
  };
}

export { evaluateDisclaimerRules, type DisclaimerRuleContext, type DisclaimerRule } from './rule-engine';
export { renderDisclaimerHtml, combineDisclaimers } from './renderer';
export { DISCLAIMER_PRESETS, getPresetById, getPresetsByRegulation, getPresetsByCategory } from './presets';
