/**
 * Brand Auditor
 * Runs brand compliance audits across an organization's signatures
 */

import { createClient } from '@/lib/supabase/server';
import { calculateComplianceScore, type SignatureData } from './scorer';

export interface AuditResult {
  userId: string;
  userEmail: string;
  templateId: string;
  templateName: string;
  score: number;
  violations: any[];
}

export async function runOrgAudit(organizationId: string): Promise<AuditResult[]> {
  const supabase = createClient();

  // Get active brand guideline
  const { data: guideline } = await supabase
    .from('brand_guidelines')
    .select('*')
    .eq('organization_id', organizationId)
    .eq('is_active', true)
    .order('created_at', { ascending: false })
    .limit(1)
    .single();

  if (!guideline) return [];

  // Get all users with their assigned templates
  const { data: assignments } = await supabase
    .from('signature_assignments')
    .select('user_id, template_id, users(email, first_name, last_name), signature_templates(name, blocks)')
    .eq('organization_id', organizationId);

  // Get deprecated assets
  const { data: deprecatedAssets } = await supabase
    .from('brand_assets')
    .select('id')
    .eq('organization_id', organizationId)
    .eq('approved_status', 'deprecated');

  const deprecatedIds = (deprecatedAssets || []).map(a => a.id);

  const results: AuditResult[] = [];

  for (const assignment of assignments || []) {
    const template = (assignment as any).signature_templates;
    const user = (assignment as any).users;
    if (!template || !user) continue;

    const signatureData = extractSignatureData(template.blocks || [], deprecatedIds);
    const mappedGuideline = {
      id: guideline.id,
      primaryColors: guideline.primary_colors,
      secondaryColors: guideline.secondary_colors,
      accentColors: guideline.accent_colors,
      allowedFonts: guideline.allowed_fonts,
      requiredLogoAssetId: guideline.required_logo_asset_id,
      requiredDisclaimer: guideline.required_disclaimer,
      requiredSocialLinks: guideline.required_social_links,
    };
    const { score, violations } = calculateComplianceScore(mappedGuideline, signatureData);

    // Save audit result
    await supabase.from('brand_audit_results').insert({
      organization_id: organizationId,
      guideline_id: guideline.id,
      user_id: assignment.user_id,
      template_id: assignment.template_id,
      compliance_score: score,
      violations,
      audited_at: new Date().toISOString(),
    });

    results.push({
      userId: assignment.user_id!,
      userEmail: user.email,
      templateId: assignment.template_id,
      templateName: template.name,
      score,
      violations,
    });
  }

  return results;
}

export async function auditUser(organizationId: string, userId: string): Promise<AuditResult | null> {
  const supabase = createClient();

  const { data: guideline } = await supabase
    .from('brand_guidelines')
    .select('*')
    .eq('organization_id', organizationId)
    .eq('is_active', true)
    .order('created_at', { ascending: false })
    .limit(1)
    .single();

  if (!guideline) return null;

  const { data: assignment } = await supabase
    .from('signature_assignments')
    .select('user_id, template_id, users(email), signature_templates(name, blocks)')
    .eq('organization_id', organizationId)
    .eq('user_id', userId)
    .order('priority', { ascending: false })
    .limit(1)
    .single();

  if (!assignment) return null;

  const template = (assignment as any).signature_templates;
  const user = (assignment as any).users;

  const { data: deprecatedAssets } = await supabase
    .from('brand_assets')
    .select('id')
    .eq('organization_id', organizationId)
    .eq('approved_status', 'deprecated');

  const deprecatedIds = (deprecatedAssets || []).map((a: any) => a.id);
  const signatureData = extractSignatureData(template?.blocks || [], deprecatedIds);
  const mappedGuideline = {
    id: guideline.id,
    primaryColors: guideline.primary_colors,
    secondaryColors: guideline.secondary_colors,
    accentColors: guideline.accent_colors,
    allowedFonts: guideline.allowed_fonts,
    requiredLogoAssetId: guideline.required_logo_asset_id,
    requiredDisclaimer: guideline.required_disclaimer,
    requiredSocialLinks: guideline.required_social_links,
  };
  const { score, violations } = calculateComplianceScore(mappedGuideline, signatureData);

  return {
    userId,
    userEmail: user?.email || '',
    templateId: assignment.template_id,
    templateName: template?.name || '',
    score,
    violations,
  };
}

function extractSignatureData(blocks: any[], deprecatedAssetIds: string[]): SignatureData {
  const usedColors: string[] = [];
  const usedFonts: string[] = [];
  const socialLinks: string[] = [];
  const usedAssetIds: string[] = [];
  let hasLogo = false;
  let logoAssetId: string | undefined;
  let hasDisclaimer = false;

  for (const block of blocks) {
    // Extract colors
    if (block.style?.color) usedColors.push(block.style.color);
    if (block.style?.backgroundColor) usedColors.push(block.style.backgroundColor);

    // Extract fonts
    if (block.style?.fontFamily) usedFonts.push(block.style.fontFamily);

    // Check for logo
    if (block.type === 'image' || block.type === 'logo') {
      hasLogo = true;
      if (block.assetId) {
        logoAssetId = block.assetId;
        usedAssetIds.push(block.assetId);
      }
    }

    // Check for disclaimer
    if (block.type === 'disclaimer' || block.type === 'legal') {
      hasDisclaimer = true;
    }

    // Check for social links
    if (block.type === 'social' || block.type === 'socialLinks') {
      if (block.links) {
        for (const link of block.links) {
          if (link.platform) socialLinks.push(link.platform);
        }
      }
    }
  }

  return {
    blocks,
    usedColors: [...new Set(usedColors)],
    usedFonts: [...new Set(usedFonts)],
    hasLogo,
    logoAssetId,
    hasDisclaimer,
    socialLinks,
    usedAssetIds,
    deprecatedAssetIds,
  };
}
