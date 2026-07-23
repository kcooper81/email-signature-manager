import { createHmac, timingSafeEqual } from 'crypto';

/**
 * Server-only signing for click-tracking redirect targets.
 *
 * The /api/track/click endpoint redirects to a `url` query param. Without a
 * signature that param is an open redirect (any http/https URL). We HMAC-sign
 * the target so the tracker can reject tampered/forged links.
 *
 * Backward compatibility: already-deployed email signatures contain unsigned
 * links. The tracker only *rejects* links whose signature is present but
 * invalid; missing signatures are allowed unless TRACK_CLICK_REQUIRE_SIGNATURE
 * is set, so old signatures keep working until they are re-deployed.
 */
function getSecret(): string {
  return process.env.ENCRYPTION_SECRET || process.env.CRON_SECRET || '';
}

/** Returns a short base64url HMAC of the target URL, or '' if no secret is configured. */
export function signTrackingTarget(targetUrl: string): string {
  const secret = getSecret();
  if (!secret || !targetUrl) return '';
  return createHmac('sha256', secret).update(targetUrl).digest('base64url').slice(0, 24);
}

/** Constant-time comparison of a provided signature against the expected one. */
export function verifyTrackingSignature(targetUrl: string, provided: string | null): boolean {
  const expected = signTrackingTarget(targetUrl);
  if (!expected || !provided) return false;
  const a = Buffer.from(provided);
  const b = Buffer.from(expected);
  if (a.length !== b.length) return false;
  return timingSafeEqual(a, b);
}
