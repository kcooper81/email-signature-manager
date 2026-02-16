/**
 * Brand Enforcer
 * Prevents saving non-compliant templates when brand guidelines have locked elements
 */

import { createClient } from '@/lib/supabase/server';

export interface EnforcementResult {
  allowed: boolean;
  violations: string[];
}

export async function enforceGuidelines(
  organizationId: string,
  templateBlocks: any[]
): Promise<EnforcementResult> {
  const supabase = createClient();

  const { data: guideline } = await supabase
    .from('brand_guidelines')
    .select('*')
    .eq('organization_id', organizationId)
    .eq('is_active', true)
    .order('created_at', { ascending: false })
    .limit(1)
    .single();

  if (!guideline) return { allowed: true, violations: [] };

  const violations: string[] = [];

  // Check locked colors
  if (guideline.locked_colors) {
    const allowedColors = [
      ...(guideline.primary_colors || []),
      ...(guideline.secondary_colors || []),
      ...(guideline.accent_colors || []),
    ].map((c: string) => c.toLowerCase());

    if (allowedColors.length > 0) {
      for (const block of templateBlocks) {
        if (block.style?.color && !allowedColors.includes(block.style.color.toLowerCase())) {
          violations.push(`Color ${block.style.color} is not in the approved brand palette`);
        }
        if (block.style?.backgroundColor && !allowedColors.includes(block.style.backgroundColor.toLowerCase())) {
          violations.push(`Background color ${block.style.backgroundColor} is not in the approved brand palette`);
        }
      }
    }
  }

  // Check locked fonts
  if (guideline.locked_fonts && guideline.allowed_fonts?.length > 0) {
    const allowedFonts = guideline.allowed_fonts.map((f: string) => f.toLowerCase());
    for (const block of templateBlocks) {
      if (block.style?.fontFamily && !allowedFonts.includes(block.style.fontFamily.toLowerCase())) {
        violations.push(`Font "${block.style.fontFamily}" is not in the approved font list`);
      }
    }
  }

  // Check locked blocks
  if (guideline.locked_blocks?.length > 0) {
    for (const lockedType of guideline.locked_blocks) {
      const hasBlock = templateBlocks.some(b => b.type === lockedType);
      if (!hasBlock) {
        violations.push(`Required block type "${lockedType}" is missing`);
      }
    }
  }

  return {
    allowed: violations.length === 0,
    violations,
  };
}
