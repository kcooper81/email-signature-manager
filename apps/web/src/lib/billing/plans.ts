export interface PlanFeatures {
  maxTemplates: number;
  maxUsers: number;
  analytics: boolean;
  customBranding: boolean;
  prioritySupport: boolean;
  apiAccess: boolean;
  sso: boolean;
  removeWatermark: boolean;
  googleWorkspace: boolean;
  microsoft365: boolean;
  hubspotCRM: boolean;
  scheduledDeployments: boolean;
  whiteLabel: boolean;
}

export interface PlanFeatureDisplay {
  text: string;
  included: boolean;
}

export interface Plan {
  id: 'free' | 'starter' | 'professional' | 'enterprise';
  name: string;
  description: string;
  priceMonthly: number; // Monthly price in dollars (flat rate, not per user for display)
  pricePerUser: number; // Per-user price in cents for billing
  period: string;
  features: PlanFeatures;
  featureList: PlanFeatureDisplay[]; // For marketing display
  cta: string;
  ctaLink: string;
  stripePriceId?: string;
  popular?: boolean;
}

export const PLANS: Record<string, Plan> = {
  free: {
    id: 'free',
    name: 'Free',
    description: 'Perfect for trying out Siggly',
    priceMonthly: 0,
    pricePerUser: 0,
    period: 'forever',
    cta: 'Get Started',
    ctaLink: '/signup',
    features: {
      maxTemplates: 1,
      maxUsers: 5,
      analytics: false,
      customBranding: false,
      prioritySupport: false,
      apiAccess: false,
      sso: false,
      removeWatermark: false,
      googleWorkspace: true,
      microsoft365: false,
      hubspotCRM: false,
      scheduledDeployments: false,
      whiteLabel: false,
    },
    featureList: [
      { text: 'Up to 5 team members', included: true },
      { text: '1 signature template', included: true },
      { text: 'Visual drag-and-drop editor', included: true },
      { text: 'Google Workspace integration', included: true },
      { text: 'Microsoft 365 integration', included: false },
      { text: 'Auto-sync user directory', included: true },
      { text: 'One-click deployment', included: true },
      { text: 'Mobile-responsive signatures', included: true },
      { text: 'Industry compliance blocks (Legal, Healthcare, Finance, Real Estate)', included: true },
      { text: 'Disclaimer templates', included: true },
      { text: 'Email support', included: true },
      { text: 'HubSpot CRM integration', included: false },
      { text: 'Multiple templates', included: false },
      { text: 'Bulk operations', included: false },
      { text: 'Priority support', included: false },
    ],
  },
  starter: {
    id: 'starter',
    name: 'Starter',
    description: 'For small teams getting started',
    priceMonthly: 5, // Base price display
    pricePerUser: 50, // $0.50/team member/month - cheaper than WiseStamp's $1
    period: '/team member/mo',
    cta: 'Upgrade',
    ctaLink: '/signup',
    features: {
      maxTemplates: 5,
      maxUsers: -1, // Unlimited with per-user pricing
      analytics: true,
      customBranding: true,
      prioritySupport: false,
      apiAccess: false,
      sso: false,
      removeWatermark: true,
      googleWorkspace: true,
      microsoft365: true,
      hubspotCRM: false,
      scheduledDeployments: false,
      whiteLabel: false,
    },
    featureList: [
      { text: 'Unlimited team members ($0.50/user)', included: true },
      { text: '5 signature templates', included: true },
      { text: 'Visual drag-and-drop editor', included: true },
      { text: 'Google Workspace integration', included: true },
      { text: 'Microsoft 365 integration', included: true },
      { text: 'Auto-sync user directory', included: true },
      { text: 'One-click deployment', included: true },
      { text: 'Mobile-responsive signatures', included: true },
      { text: 'Industry compliance blocks (Legal, Healthcare, Finance, Real Estate)', included: true },
      { text: 'Disclaimer templates', included: true },
      { text: 'Email support', included: true },
      { text: 'HubSpot CRM integration', included: false },
      { text: 'Bulk operations', included: false },
      { text: 'Unlimited templates', included: false },
      { text: 'Priority support', included: false },
    ],
  },
  professional: {
    id: 'professional',
    name: 'Professional',
    description: 'For growing organizations',
    priceMonthly: 29, // Base price
    pricePerUser: 100, // $1/team member/month - same as WiseStamp but more features
    period: '/mo + $1/member',
    cta: 'Upgrade',
    ctaLink: '/signup',
    popular: true,
    features: {
      maxTemplates: -1,
      maxUsers: -1,
      analytics: true,
      customBranding: true,
      prioritySupport: true,
      apiAccess: true,
      sso: false,
      removeWatermark: true,
      googleWorkspace: true,
      microsoft365: true,
      hubspotCRM: true,
      scheduledDeployments: true,
      whiteLabel: false,
    },
    featureList: [
      { text: 'Unlimited team members ($29 for up to 10, then $1/user)', included: true },
      { text: 'Unlimited signature templates', included: true },
      { text: 'Visual drag-and-drop editor', included: true },
      { text: 'Google Workspace integration', included: true },
      { text: 'Microsoft 365 integration', included: true },
      { text: 'HubSpot CRM integration', included: true },
      { text: 'Auto-sync user directory', included: true },
      { text: 'One-click deployment', included: true },
      { text: 'Bulk operations', included: true },
      { text: 'Mobile-responsive signatures', included: true },
      { text: 'Industry compliance blocks (Legal, Healthcare, Finance, Real Estate)', included: true },
      { text: 'Disclaimer templates', included: true },
      { text: 'Department-based templates', included: true },
      { text: 'Priority email support', included: true },
      { text: 'SSO/SAML', included: false },
      { text: 'API access', included: false },
    ],
  },
  enterprise: {
    id: 'enterprise',
    name: 'Enterprise',
    description: 'For large organizations',
    priceMonthly: 0, // Custom
    pricePerUser: 0,
    period: '',
    cta: 'Contact Sales',
    ctaLink: '/contact',
    features: {
      maxTemplates: -1,
      maxUsers: -1,
      analytics: true,
      customBranding: true,
      prioritySupport: true,
      apiAccess: true,
      sso: true,
      removeWatermark: true,
      googleWorkspace: true,
      microsoft365: true,
      hubspotCRM: true,
      scheduledDeployments: true,
      whiteLabel: true,
    },
    featureList: [
      { text: 'Unlimited team members (custom pricing)', included: true },
      { text: 'Unlimited signature templates', included: true },
      { text: 'Everything in Professional, plus:', included: true },
      { text: 'Dedicated account manager', included: true },
      { text: 'Priority support', included: true },
      { text: 'Custom integrations', included: true },
      { text: 'Custom contract terms', included: true },
      { text: 'Volume discounts available', included: true },
      { text: 'SSO/SAML authentication', included: true },
      { text: 'API access', included: true },
      { text: 'White-label options', included: true },
    ],
  },
};

// Array version for easy iteration
export const PLANS_LIST = Object.values(PLANS);


export function getPlan(planId: string): Plan {
  return PLANS[planId] || PLANS.free;
}

export function canAccessFeature(
  planId: string,
  feature: keyof PlanFeatures
): boolean {
  const plan = getPlan(planId);
  const value = plan.features[feature];
  return typeof value === 'boolean' ? value : value !== 0;
}

export function isWithinLimit(
  planId: string,
  feature: 'maxTemplates' | 'maxUsers',
  currentCount: number
): boolean {
  const plan = getPlan(planId);
  const limit = plan.features[feature];
  if (limit === -1) return true; // Unlimited
  return currentCount < limit;
}

export function formatPrice(cents: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(cents / 100);
}
