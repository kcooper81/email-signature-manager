// Social media icon URLs using Simple Icons CDN with official brand colors.
// LinkedIn was removed from Simple Icons (brand requested removal), so we self-host it.
export const SOCIAL_ICONS: Record<string, string> = {
  linkedin: 'https://siggly.io/icons/linkedin.svg',
  twitter: 'https://cdn.simpleicons.org/x/000000',
  facebook: 'https://cdn.simpleicons.org/facebook/1877F2',
  instagram: 'https://cdn.simpleicons.org/instagram/E4405F',
  youtube: 'https://cdn.simpleicons.org/youtube/FF0000',
  github: 'https://cdn.simpleicons.org/github/181717',
};

/**
 * Returns the URL for a social platform icon.
 */
export function getSocialIconUrl(platform: string): string {
  return SOCIAL_ICONS[platform] || '';
}
