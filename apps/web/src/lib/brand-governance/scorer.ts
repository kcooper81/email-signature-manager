/**
 * Brand Compliance Scorer
 * Calculates a 0-100 score for how well a signature matches brand guidelines
 */

export interface BrandGuideline {
  id: string;
  primaryColors?: string[] | null;
  secondaryColors?: string[] | null;
  accentColors?: string[] | null;
  allowedFonts?: string[] | null;
  requiredLogoAssetId?: string | null;
  requiredDisclaimer?: boolean;
  requiredSocialLinks?: string[] | null;
}

export interface SignatureData {
  blocks: any[];
  usedColors: string[];
  usedFonts: string[];
  hasLogo: boolean;
  logoAssetId?: string;
  hasDisclaimer: boolean;
  socialLinks: string[];
  usedAssetIds: string[];
  deprecatedAssetIds: string[];
}

export interface ScoringResult {
  score: number;
  violations: { rule: string; expected: string; actual: string; severity: string }[];
}

// Scoring weights (total 100)
const WEIGHTS = {
  logo: 25,
  colors: 20,
  fonts: 15,
  disclaimer: 20,
  socialLinks: 10,
  noDeprecated: 10,
};

export function calculateComplianceScore(
  guideline: BrandGuideline,
  signature: SignatureData
): ScoringResult {
  const violations: ScoringResult['violations'] = [];
  let score = 0;

  // Logo check (25 pts)
  if (guideline.requiredLogoAssetId) {
    if (signature.hasLogo && signature.logoAssetId === guideline.requiredLogoAssetId) {
      score += WEIGHTS.logo;
    } else {
      violations.push({
        rule: 'Required logo',
        expected: guideline.requiredLogoAssetId,
        actual: signature.logoAssetId || 'none',
        severity: 'high',
      });
    }
  } else {
    score += WEIGHTS.logo; // No requirement = full points
  }

  // Color check (20 pts)
  const allowedColors = [
    ...(guideline.primaryColors || []),
    ...(guideline.secondaryColors || []),
    ...(guideline.accentColors || []),
  ].map(c => c.toLowerCase());

  if (allowedColors.length > 0) {
    const invalidColors = signature.usedColors.filter(
      c => !allowedColors.includes(c.toLowerCase())
    );
    if (invalidColors.length === 0) {
      score += WEIGHTS.colors;
    } else {
      const ratio = 1 - (invalidColors.length / Math.max(signature.usedColors.length, 1));
      score += Math.round(WEIGHTS.colors * ratio);
      violations.push({
        rule: 'Color palette',
        expected: allowedColors.join(', '),
        actual: invalidColors.join(', '),
        severity: 'medium',
      });
    }
  } else {
    score += WEIGHTS.colors;
  }

  // Font check (15 pts)
  if (guideline.allowedFonts && guideline.allowedFonts.length > 0) {
    const allowedFontsLower = guideline.allowedFonts.map(f => f.toLowerCase());
    const invalidFonts = signature.usedFonts.filter(
      f => !allowedFontsLower.includes(f.toLowerCase())
    );
    if (invalidFonts.length === 0) {
      score += WEIGHTS.fonts;
    } else {
      violations.push({
        rule: 'Allowed fonts',
        expected: guideline.allowedFonts.join(', '),
        actual: invalidFonts.join(', '),
        severity: 'medium',
      });
    }
  } else {
    score += WEIGHTS.fonts;
  }

  // Disclaimer check (20 pts)
  if (guideline.requiredDisclaimer) {
    if (signature.hasDisclaimer) {
      score += WEIGHTS.disclaimer;
    } else {
      violations.push({
        rule: 'Required disclaimer',
        expected: 'present',
        actual: 'missing',
        severity: 'high',
      });
    }
  } else {
    score += WEIGHTS.disclaimer;
  }

  // Social links check (10 pts)
  if (guideline.requiredSocialLinks && guideline.requiredSocialLinks.length > 0) {
    const missingLinks = guideline.requiredSocialLinks.filter(
      link => !signature.socialLinks.includes(link)
    );
    if (missingLinks.length === 0) {
      score += WEIGHTS.socialLinks;
    } else {
      const ratio = 1 - (missingLinks.length / guideline.requiredSocialLinks.length);
      score += Math.round(WEIGHTS.socialLinks * ratio);
      violations.push({
        rule: 'Required social links',
        expected: guideline.requiredSocialLinks.join(', '),
        actual: `missing: ${missingLinks.join(', ')}`,
        severity: 'low',
      });
    }
  } else {
    score += WEIGHTS.socialLinks;
  }

  // Deprecated assets check (10 pts)
  if (signature.deprecatedAssetIds.length > 0) {
    const usedDeprecated = signature.usedAssetIds.filter(
      id => signature.deprecatedAssetIds.includes(id)
    );
    if (usedDeprecated.length === 0) {
      score += WEIGHTS.noDeprecated;
    } else {
      violations.push({
        rule: 'No deprecated assets',
        expected: 'none',
        actual: `${usedDeprecated.length} deprecated assets used`,
        severity: 'medium',
      });
    }
  } else {
    score += WEIGHTS.noDeprecated;
  }

  return { score: Math.min(100, Math.max(0, score)), violations };
}
