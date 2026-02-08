/**
 * URL Builder for Analytics Tracking
 * Wraps URLs with tracking parameters and redirect endpoint
 */

interface TrackingParams {
  userId?: string;
  templateId?: string;
  linkType?: 'calendly' | 'linkedin' | 'twitter' | 'github' | 'banner' | 'button' | 'custom';
  campaign?: string;
  utmSource?: string;
  utmMedium?: string;
  utmCampaign?: string;
  utmContent?: string;
}

/**
 * Build a trackable URL that goes through our click tracking endpoint
 */
export function buildTrackableUrl(
  targetUrl: string,
  params: TrackingParams
): string {
  if (!targetUrl) return '';

  // Add UTM parameters to target URL if provided
  const url = new URL(targetUrl);
  if (params.utmSource) url.searchParams.set('utm_source', params.utmSource);
  if (params.utmMedium) url.searchParams.set('utm_medium', params.utmMedium);
  if (params.utmCampaign) url.searchParams.set('utm_campaign', params.utmCampaign);
  if (params.utmContent) url.searchParams.set('utm_content', params.utmContent);

  // Build tracking redirect URL
  const trackingUrl = new URL('/api/track/click', process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000');
  trackingUrl.searchParams.set('url', url.toString());
  
  if (params.userId) trackingUrl.searchParams.set('u', params.userId);
  if (params.templateId) trackingUrl.searchParams.set('t', params.templateId);
  if (params.linkType) trackingUrl.searchParams.set('type', params.linkType);
  if (params.campaign) trackingUrl.searchParams.set('campaign', params.campaign);

  return trackingUrl.toString();
}

/**
 * Add default UTM parameters for email signatures
 */
export function addEmailSignatureUTM(url: string, userName?: string): string {
  if (!url) return '';

  const targetUrl = new URL(url);
  
  // Default UTM parameters for email signatures
  if (!targetUrl.searchParams.has('utm_source')) {
    targetUrl.searchParams.set('utm_source', 'email_signature');
  }
  if (!targetUrl.searchParams.has('utm_medium')) {
    targetUrl.searchParams.set('utm_medium', 'email');
  }
  if (userName && !targetUrl.searchParams.has('utm_content')) {
    targetUrl.searchParams.set('utm_content', userName.toLowerCase().replace(/\s+/g, '_'));
  }

  return targetUrl.toString();
}

/**
 * Detect link type from URL
 */
export function detectLinkType(url: string): TrackingParams['linkType'] {
  if (!url) return 'custom';

  const lowerUrl = url.toLowerCase();
  
  if (lowerUrl.includes('calendly.com')) return 'calendly';
  if (lowerUrl.includes('linkedin.com')) return 'linkedin';
  if (lowerUrl.includes('twitter.com') || lowerUrl.includes('x.com')) return 'twitter';
  if (lowerUrl.includes('github.com')) return 'github';
  
  return 'custom';
}
