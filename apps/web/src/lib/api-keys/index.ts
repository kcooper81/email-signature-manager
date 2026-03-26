import { createHash, randomBytes } from 'crypto';
import { NextRequest, NextResponse } from 'next/server';
import { createServiceClient } from '@/lib/supabase/server';
import { getOrgPlan, checkFeature, planDenied } from '@/lib/billing/plan-guard';
import { logException } from '@/lib/error-logging';

const KEY_PREFIX = 'sk_live_';
const PREFIX_LENGTH = 12; // chars of the raw key stored for identification
const RATE_LIMIT_MAX = 60;
const RATE_LIMIT_WINDOW_MS = 60 * 1000; // 1 minute
const MAX_KEYS_PER_ORG = 5;

export interface ApiKeyAuth {
  keyId: string;
  organizationId: string;
  orgName: string;
  orgDomain: string | null;
  orgIndustry: string | null;
  parentOrganizationId: string | null;
}

/**
 * Generate a new API key. Returns the raw key (shown once) and the data to store.
 */
export function generateApiKey(): { rawKey: string; keyPrefix: string; keyHash: string } {
  const randomPart = randomBytes(32).toString('base64url');
  const rawKey = `${KEY_PREFIX}${randomPart}`;
  const keyPrefix = rawKey.slice(0, KEY_PREFIX.length + PREFIX_LENGTH);
  const keyHash = hashKey(rawKey);
  return { rawKey, keyPrefix, keyHash };
}

/**
 * SHA-256 hash of the full API key.
 */
export function hashKey(rawKey: string): string {
  return createHash('sha256').update(rawKey).digest('hex');
}

/**
 * Authenticate an API request via Bearer token.
 * Returns the org context or a NextResponse error.
 */
export async function authenticateApiKey(
  request: NextRequest,
): Promise<ApiKeyAuth | NextResponse> {
  const authHeader = request.headers.get('authorization');
  if (!authHeader?.startsWith('Bearer ')) {
    return NextResponse.json(
      { error: 'Missing or invalid Authorization header. Use: Bearer sk_live_...' },
      { status: 401 },
    );
  }

  const rawKey = authHeader.slice(7);
  if (!rawKey.startsWith(KEY_PREFIX)) {
    return NextResponse.json({ error: 'Invalid API key format' }, { status: 401 });
  }

  const keyHash = hashKey(rawKey);
  const keyPrefix = rawKey.slice(0, KEY_PREFIX.length + PREFIX_LENGTH);

  const supabase = createServiceClient();

  // Look up key + org in one query
  const { data: keyRow, error: keyError } = await supabase
    .from('api_keys')
    .select('id, organization_id, is_revoked, rate_limit_count, rate_limit_window')
    .eq('key_prefix', keyPrefix)
    .eq('key_hash', keyHash)
    .single();

  if (keyError || !keyRow) {
    return NextResponse.json({ error: 'Invalid API key' }, { status: 401 });
  }

  if (keyRow.is_revoked) {
    return NextResponse.json({ error: 'API key has been revoked' }, { status: 401 });
  }

  // Check org status
  const { data: org, error: orgError } = await supabase
    .from('organizations')
    .select('id, name, domain, industry, parent_organization_id, is_suspended')
    .eq('id', keyRow.organization_id)
    .single();

  if (orgError || !org) {
    return NextResponse.json({ error: 'Organization not found' }, { status: 403 });
  }

  if (org.is_suspended) {
    return NextResponse.json({ error: 'Organization is suspended' }, { status: 403 });
  }

  // Plan gate
  const orgPlan = await getOrgPlan(supabase, org.id);
  if (!checkFeature(orgPlan, 'apiAccess')) {
    return planDenied('Public Signature API', 'Professional');
  }

  // Rate limiting with optimistic locking
  const now = new Date();
  const windowStart = new Date(keyRow.rate_limit_window);
  const windowAge = now.getTime() - windowStart.getTime();

  const windowExpired = windowAge > RATE_LIMIT_WINDOW_MS;
  const newCount = windowExpired ? 1 : keyRow.rate_limit_count + 1;
  const newWindow = windowExpired ? now.toISOString() : keyRow.rate_limit_window;

  if (newCount > RATE_LIMIT_MAX) {
    const retryAfter = Math.ceil((RATE_LIMIT_WINDOW_MS - windowAge) / 1000);
    return NextResponse.json(
      { error: 'Rate limit exceeded. Max 60 requests per minute.' },
      {
        status: 429,
        headers: { 'Retry-After': String(retryAfter) },
      },
    );
  }

  // Optimistic locking: only update if count hasn't changed since we read it
  const { data: updated } = await supabase
    .from('api_keys')
    .update({
      last_used_at: now.toISOString(),
      rate_limit_count: newCount,
      rate_limit_window: newWindow,
    })
    .eq('id', keyRow.id)
    .eq('rate_limit_count', keyRow.rate_limit_count)
    .select('id');

  // If update affected 0 rows, another request incremented the counter — re-check
  if (!updated?.length) {
    const { data: freshKey } = await supabase
      .from('api_keys')
      .select('rate_limit_count, rate_limit_window')
      .eq('id', keyRow.id)
      .single();
    if (freshKey && freshKey.rate_limit_count >= RATE_LIMIT_MAX) {
      return NextResponse.json(
        { error: 'Rate limit exceeded. Max 60 requests per minute.' },
        { status: 429 },
      );
    }
  }

  return {
    keyId: keyRow.id,
    organizationId: org.id,
    orgName: org.name,
    orgDomain: org.domain,
    orgIndustry: org.industry,
    parentOrganizationId: org.parent_organization_id,
  };
}

/**
 * Check if an org has reached the max API key limit.
 */
export async function countActiveKeys(supabase: any, organizationId: string): Promise<number> {
  const { count } = await supabase
    .from('api_keys')
    .select('*', { count: 'exact', head: true })
    .eq('organization_id', organizationId)
    .eq('is_revoked', false);
  return count || 0;
}

export { MAX_KEYS_PER_ORG };
