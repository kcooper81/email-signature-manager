// Social media icon URLs using Simple Icons CDN with official brand colors.
// These brand-color URLs are reliable; arbitrary hex colors may 404 on the CDN.
export const SOCIAL_ICONS: Record<string, string> = {
  linkedin: 'https://cdn.simpleicons.org/linkedin/0A66C2',
  twitter: 'https://cdn.simpleicons.org/x/000000',
  facebook: 'https://cdn.simpleicons.org/facebook/1877F2',
  instagram: 'https://cdn.simpleicons.org/instagram/E4405F',
  youtube: 'https://cdn.simpleicons.org/youtube/FF0000',
  github: 'https://cdn.simpleicons.org/github/181717',
};

/**
 * Returns the CDN URL for a social platform icon.
 * Uses official brand colors since the CDN doesn't reliably serve arbitrary hex colors.
 */
export function getSocialIconUrl(platform: string): string {
  return SOCIAL_ICONS[platform] || '';
}
