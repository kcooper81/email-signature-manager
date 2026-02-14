import { headers } from 'next/headers';
import type { OrganizationBranding } from '@/lib/db/schema';

export interface MspBrandingInfo {
  mspOrgId: string | null;
  mspOrgName: string | null;
  mspOrgType: string | null;
  branding: OrganizationBranding;
  isWhiteLabeled: boolean;
}

// Default Siggly branding
const DEFAULT_BRANDING: OrganizationBranding = {
  primaryColor: '#4d52de',
  secondaryColor: '#f8fafc',
  accentColor: '#10b981',
  companyName: 'Siggly',
  hideSigglyBranding: false,
  hideHelpLinks: false,
};

/**
 * Get branding info from request headers (set by middleware)
 * Use this in Server Components to get MSP branding
 */
export async function getBrandingFromHeaders(): Promise<MspBrandingInfo> {
  const headersList = await headers();
  
  const mspOrgId = headersList.get('x-msp-org-id');
  const mspOrgName = headersList.get('x-msp-org-name');
  const mspOrgType = headersList.get('x-msp-org-type');
  const brandingHeader = headersList.get('x-msp-branding');
  
  let branding: OrganizationBranding = DEFAULT_BRANDING;
  
  if (brandingHeader) {
    try {
      const parsedBranding = JSON.parse(brandingHeader);
      branding = { ...DEFAULT_BRANDING, ...parsedBranding };
    } catch {
      // Invalid JSON, use defaults
    }
  }
  
  return {
    mspOrgId,
    mspOrgName,
    mspOrgType,
    branding,
    isWhiteLabeled: Boolean(mspOrgId && branding.hideSigglyBranding),
  };
}

/**
 * Validate a subdomain string
 * Returns null if invalid, or the sanitized subdomain if valid
 */
export function validateSubdomain(subdomain: string): string | null {
  // Must be 3-63 characters
  if (subdomain.length < 3 || subdomain.length > 63) {
    return null;
  }
  
  // Must start and end with alphanumeric
  if (!/^[a-z0-9].*[a-z0-9]$/i.test(subdomain)) {
    return null;
  }
  
  // Can only contain lowercase letters, numbers, and hyphens
  const sanitized = subdomain.toLowerCase().replace(/[^a-z0-9-]/g, '');
  
  // No consecutive hyphens
  if (sanitized.includes('--')) {
    return null;
  }
  
  // Reserved subdomains
  const reserved = [
    'www', 'app', 'api', 'admin', 'dashboard', 'help', 'support', 
    'docs', 'blog', 'mail', 'status', 'cdn', 'static', 'assets',
    'auth', 'login', 'signup', 'account', 'billing', 'payment',
    'test', 'staging', 'dev', 'demo', 'preview', 'beta', 'alpha',
  ];
  
  if (reserved.includes(sanitized)) {
    return null;
  }
  
  return sanitized;
}

/**
 * Check if a subdomain is available
 */
export async function isSubdomainAvailable(subdomain: string): Promise<boolean> {
  const validated = validateSubdomain(subdomain);
  if (!validated) {
    return false;
  }
  
  // This would need to query the database
  // For now, return true - actual implementation in API route
  return true;
}
