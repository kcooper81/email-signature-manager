import { timingSafeEqual } from 'crypto';

/**
 * Constant-time comparison of a cron request's Authorization header against
 * CRON_SECRET. Returns false if the secret is not configured (caller should
 * reject). Timing-safe to avoid leaking the secret via response timing.
 */
export function isValidCronAuth(authHeader: string | null): boolean {
  const cronSecret = process.env.CRON_SECRET;
  if (!cronSecret) return false;
  const expected = `Bearer ${cronSecret}`;
  const a = Buffer.from(authHeader || '');
  const b = Buffer.from(expected);
  if (a.length !== b.length) return false;
  return timingSafeEqual(a, b);
}
