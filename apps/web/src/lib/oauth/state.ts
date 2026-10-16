import { createHmac, timingSafeEqual } from 'crypto';

/**
 * HMAC-signed OAuth `state` parameter.
 *
 * The state round-trips through the provider, so it must be tamper-proof: an
 * unsigned base64 blob could be forged to point the callback at a different
 * configId/org. We sign the payload and verify the signature on return, and we
 * bind the initiating user's id so the callback can confirm the same user.
 */

function getSecret(): string {
  const secret =
    process.env.NEXTAUTH_SECRET ||
    process.env.ENCRYPTION_SECRET ||
    process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!secret) {
    throw new Error('No secret available for OAuth state signing');
  }
  return secret;
}

export interface OAuthStateData {
  configId: string;
  userId: string;
  subdomain?: string;
  useSandbox?: boolean;
}

function base64url(input: Buffer | string): string {
  return Buffer.from(input).toString('base64url');
}

export function signState(data: OAuthStateData): string {
  const payload = base64url(JSON.stringify(data));
  const sig = createHmac('sha256', getSecret()).update(payload).digest('base64url');
  return `${payload}.${sig}`;
}

/**
 * Verifies the signature and returns the decoded state, or null if the token is
 * malformed or the signature does not match.
 */
export function verifyState(token: string | null | undefined): OAuthStateData | null {
  if (!token || typeof token !== 'string') return null;
  const dot = token.lastIndexOf('.');
  if (dot <= 0) return null;

  const payload = token.slice(0, dot);
  const sig = token.slice(dot + 1);

  let expected: string;
  try {
    expected = createHmac('sha256', getSecret()).update(payload).digest('base64url');
  } catch {
    return null;
  }

  const a = Buffer.from(sig);
  const b = Buffer.from(expected);
  if (a.length !== b.length || !timingSafeEqual(a, b)) {
    return null;
  }

  try {
    return JSON.parse(Buffer.from(payload, 'base64url').toString('utf8')) as OAuthStateData;
  } catch {
    return null;
  }
}
