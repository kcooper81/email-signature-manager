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
  // Disclaimer Engine
  maxDisclaimerTemplates: number; // -1 = unlimited
  maxDisclaimerRules: number; // -1 = unlimited
  disclaimerHtmlEditor: boolean;
  disclaimerRegulatoryPresets: boolean;
  disclaimerAuditTrail: boolean;
  disclaimerMspCascade: boolean;
  disclaimerMultiLanguage: boolean;
  // HR Sync & Directory
  hrIntegrations: boolean;
  hrRealtimeSync: boolean;
  hrMspManaged: boolean;
  selfServicePortal: boolean;
  selfServiceAdminApproval: boolean;
  profileCompleteness: boolean;
  profileCompletenessAnalytics: boolean;
  // Lifecycle Automation
  maxLifecycleWorkflows: number; // -1 = unlimited
  lifecycleMoverDetection: boolean;
  lifecycleWebhooks: boolean;
  lifecycleMspCascade: boolean;
  // Brand Governance
  brandGovernance: boolean;
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
      // Disclaimer: 2 custom + system presets, 1 rule
      maxDisclaimerTemplates: 2,
      maxDisclaimerRules: 1,
      disclaimerHtmlEditor: false,
      disclaimerRegulatoryPresets: false,
      disclaimerAuditTrail: false,
      disclaimerMspCascade: false,
      disclaimerMultiLanguage: false,
      // HR Sync: none
      hrIntegrations: false,
      hrRealtimeSync: false,
      hrMspManaged: false,
      selfServicePortal: true,
      selfServiceAdminApproval: false,
      profileCompleteness: true,
      profileCompletenessAnalytics: false,
      // Lifecycle: none
      maxLifecycleWorkflows: 0,
      lifecycleMoverDetection: false,
      lifecycleWebhooks: false,
      lifecycleMspCascade: false,
      // Brand: none
      brandGovernance: false,
    },
    featureList: [
      { text: 'Up to 5 users', included: true },
      { text: '1 signature template', included: true },
      { text: 'Drag-and-drop editor', included: true },
      { text: 'Google Workspace deployment', included: true },
      { text: 'HubSpot CRM sync', included: true },
      { text: '2 disclaimer templates + 1 rule', included: true },
      { text: 'Basic self-service portal', included: true },
      { text: 'Scheduled deployments', included: true },
      { text: 'Analytics (7-day preview)', included: true },
      { text: 'HR integrations', included: false },
      { text: 'Lifecycle automation', included: false },
      { text: 'Brand governance', included: false },
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
      // Disclaimer: unlimited + HTML + regulatory presets + audit
      maxDisclaimerTemplates: -1,
      maxDisclaimerRules: -1,
      disclaimerHtmlEditor: true,
      disclaimerRegulatoryPresets: true,
      disclaimerAuditTrail: true,
      disclaimerMspCascade: false,
      disclaimerMultiLanguage: false,
      // HR Sync: BambooHR, Gusto, Rippling + scheduled
      hrIntegrations: true,
      hrRealtimeSync: false,
      hrMspManaged: false,
      selfServicePortal: true,
      selfServiceAdminApproval: true,
      profileCompleteness: true,
      profileCompletenessAnalytics: true,
      // Lifecycle: 5 workflows
      maxLifecycleWorkflows: 5,
      lifecycleMoverDetection: false,
      lifecycleWebhooks: false,
      lifecycleMspCascade: false,
      // Brand: none
      brandGovernance: false,
    },
    featureList: [
      { text: 'Unlimited users ($1.50/user/mo)', included: true },
      { text: '10-user minimum ($15/mo)', included: true },
      { text: 'Unlimited templates & disclaimers', included: true },
      { text: 'Full analytics & reporting', included: true },
      { text: 'BambooHR, Gusto, Rippling sync', included: true },
      { text: '5 lifecycle automation workflows', included: true },
      { text: 'Admin approval workflows', included: true },
      { text: 'Regulatory disclaimer presets', included: true },
      { text: 'Everything in Free', included: true },
      { text: 'Brand governance', included: false },
      { text: 'SSO/SAML', included: false },
      { text: 'White-label', included: false },
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
      // Disclaimer: all features + MSP cascade + multi-language
      maxDisclaimerTemplates: -1,
      maxDisclaimerRules: -1,
      disclaimerHtmlEditor: true,
      disclaimerRegulatoryPresets: true,
      disclaimerAuditTrail: true,
      disclaimerMspCascade: true,
      disclaimerMultiLanguage: true,
      // HR Sync: all + realtime + MSP-managed
      hrIntegrations: true,
      hrRealtimeSync: true,
      hrMspManaged: true,
      selfServicePortal: true,
      selfServiceAdminApproval: true,
      profileCompleteness: true,
      profileCompletenessAnalytics: true,
      // Lifecycle: unlimited + all features
      maxLifecycleWorkflows: -1,
      lifecycleMoverDetection: true,
      lifecycleWebhooks: true,
      lifecycleMspCascade: true,
      // Brand: full governance
      brandGovernance: true,
    },
    featureList: [
      { text: 'Everything in Professional', included: true },
      { text: 'Brand governance & audit', included: true },
      { text: 'Unlimited lifecycle workflows', included: true },
      { text: 'MSP cascading rules & workflows', included: true },
      { text: 'Realtime HR sync + MSP-managed', included: true },
      { text: 'Multi-language disclaimers', included: true },
      { text: 'SSO/SAML authentication', included: true },
      { text: 'White-label options', included: true },
      { text: 'Dedicated account manager', included: true },
      { text: 'SLA guarantees', included: true },
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
  feature: 'maxTemplates' | 'maxUsers' | 'maxDisclaimerTemplates' | 'maxDisclaimerRules' | 'maxLifecycleWorkflows',
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
