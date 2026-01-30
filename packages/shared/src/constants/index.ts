// ============================================
// Application Constants
// ============================================

export const APP_NAME = 'Email Signature Manager';
export const APP_SHORT_NAME = 'ESM';

// ============================================
// Rate Limiting Constants
// ============================================

export const RATE_LIMITS = {
  // Google Workspace API limits
  google: {
    requestsPerSecond: 10,
    requestsPerDay: 1000000,
    batchSize: 50,
  },
  // Microsoft Graph API limits
  microsoft: {
    requestsPerSecond: 10000,
    requestsPerMinute: 120000,
    batchSize: 20,
  },
} as const;

// ============================================
// Job Configuration
// ============================================

export const JOB_CONFIG = {
  maxAttempts: 3,
  retryDelayMs: 5000,
  exponentialBackoff: true,
  backoffMultiplier: 2,
} as const;

// ============================================
// Subscription Limits
// ============================================

export const SUBSCRIPTION_LIMITS = {
  free: {
    users: 5,
    templates: 1,
    banners: 0,
    customDomain: false,
    analytics: false,
  },
  starter: {
    users: 25,
    templates: 5,
    banners: 2,
    customDomain: false,
    analytics: true,
  },
  professional: {
    users: 100,
    templates: 20,
    banners: 10,
    customDomain: true,
    analytics: true,
  },
  enterprise: {
    users: -1, // unlimited
    templates: -1,
    banners: -1,
    customDomain: true,
    analytics: true,
  },
} as const;

// ============================================
// Email-Safe Font Stacks
// ============================================

export const EMAIL_SAFE_FONTS = {
  arial: 'Arial, Helvetica, sans-serif',
  georgia: 'Georgia, Times, serif',
  helvetica: 'Helvetica, Arial, sans-serif',
  tahoma: 'Tahoma, Geneva, sans-serif',
  trebuchet: '"Trebuchet MS", Helvetica, sans-serif',
  verdana: 'Verdana, Geneva, sans-serif',
  timesNewRoman: '"Times New Roman", Times, serif',
  courierNew: '"Courier New", Courier, monospace',
} as const;

// ============================================
// Social Platform Metadata
// ============================================

export const SOCIAL_PLATFORMS = {
  linkedin: {
    name: 'LinkedIn',
    baseUrl: 'https://linkedin.com/in/',
    iconColor: '#0A66C2',
  },
  twitter: {
    name: 'Twitter / X',
    baseUrl: 'https://twitter.com/',
    iconColor: '#000000',
  },
  facebook: {
    name: 'Facebook',
    baseUrl: 'https://facebook.com/',
    iconColor: '#1877F2',
  },
  instagram: {
    name: 'Instagram',
    baseUrl: 'https://instagram.com/',
    iconColor: '#E4405F',
  },
  youtube: {
    name: 'YouTube',
    baseUrl: 'https://youtube.com/',
    iconColor: '#FF0000',
  },
  github: {
    name: 'GitHub',
    baseUrl: 'https://github.com/',
    iconColor: '#181717',
  },
  website: {
    name: 'Website',
    baseUrl: '',
    iconColor: '#4A5568',
  },
} as const;

// ============================================
// Default Styles
// ============================================

export const DEFAULT_SIGNATURE_STYLES = {
  fontFamily: EMAIL_SAFE_FONTS.arial,
  fontSize: 12,
  color: '#333333',
  linkColor: '#0066CC',
  dividerColor: '#CCCCCC',
} as const;
