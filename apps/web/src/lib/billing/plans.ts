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
  id: 'free' | 'professional' | 'enterprise';
  name: string;
  description: string;
  priceMonthly: number;
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
    description: 'Full-featured for small teams',
    priceMonthly: 0,
    pricePerUser: 0,
    period: 'forever',
    cta: 'Get Started',
    ctaLink: '/signup',
    features: {
      maxTemplates: 1,
      maxUsers: 5,
      analytics: false,
      customBranding: true,
      prioritySupport: false,
      apiAccess: false,
      sso: false,
      removeWatermark: true,
      googleWorkspace: true,
      microsoft365: false,
      hubspotCRM: true,
      scheduledDeployments: true,
      whiteLabel: false,
    },
    featureList: [
      { text: 'Up to 5 users', included: true },
      { text: '1 signature template', included: true },
      { text: 'Visual drag-and-drop editor', included: true },
      { text: 'Google Workspace integration', included: true },
      { text: 'HubSpot CRM integration', included: true },
      { text: 'Industry compliance blocks', included: true },
      { text: 'Bulk operations', included: true },
      { text: 'Directory sync', included: true },
      { text: 'One-click deployment', included: true },
      { text: 'Scheduled deployments', included: true },
      { text: 'Mobile-responsive signatures', included: true },
      { text: 'Analytics (7-day preview)', included: true },
      { text: 'Microsoft 365 integration', included: false },
      { text: 'Unlimited templates', included: false },
      { text: 'Full analytics & reporting', included: false },
      { text: 'Priority support', included: false },
    ],
  },
  professional: {
    id: 'professional',
    name: 'Professional',
    description: 'One plan, everything included',
    priceMonthly: 15, // 10-user minimum at $1.50/user
    pricePerUser: 150, // $1.50/user/month in cents
    period: '/user/mo',
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
      { text: 'Unlimited users ($1.50/user/mo)', included: true },
      { text: '10-user minimum ($15/mo)', included: true },
      { text: 'Unlimited signature templates', included: true },
      { text: 'Full analytics & reporting', included: true },
      { text: 'Microsoft 365 integration', included: true },
      { text: 'Google Workspace integration', included: true },
      { text: 'HubSpot CRM integration', included: true },
      { text: 'API access', included: true },
      { text: 'Bulk operations', included: true },
      { text: 'Directory sync', included: true },
      { text: 'Priority support', included: true },
      { text: 'Scheduled deployments', included: true },
      { text: 'SSO/SAML', included: false },
      { text: 'White-label options', included: false },
    ],
  },
  enterprise: {
    id: 'enterprise',
    name: 'Enterprise',
    description: 'Custom solutions for large organizations',
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
      { text: 'Everything in Professional, plus:', included: true },
      { text: 'Dedicated account manager', included: true },
      { text: 'Custom integrations', included: true },
      { text: 'SSO/SAML authentication', included: true },
      { text: 'White-label options', included: true },
      { text: 'Custom contract terms', included: true },
      { text: 'SLA guarantees', included: true },
      { text: 'Volume discounts', included: true },
    ],
  },
};

// Array version for easy iteration
export const PLANS_LIST = Object.values(PLANS);


export function getPlan(planId: string): Plan {
  // Migrate legacy 'starter' plans to 'professional'
  if (planId === 'starter') return PLANS.professional;
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
