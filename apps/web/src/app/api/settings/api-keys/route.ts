import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { generateApiKey, countActiveKeys, MAX_KEYS_PER_ORG } from '@/lib/api-keys';
import { getOrgPlan, checkFeature, planDenied } from '@/lib/billing/plan-guard';
import { logException } from '@/lib/error-logging';

/** GET — list all API keys for the current user's org */
export async function GET() {
  try {
    const supabase = createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const { data: currentUser } = await supabase
      .from('users')
      .select('organization_id, role')
      .eq('auth_id', user.id)
      .single();

    if (!currentUser?.organization_id) {
      return NextResponse.json({ error: 'Organization not found' }, { status: 404 });
    }

    // Plan gate — free plans see the upgrade prompt instead of the key list
    const orgPlan = await getOrgPlan(supabase, currentUser.organization_id, { authId: user.id });
    if (!checkFeature(orgPlan, 'apiAccess')) {
      return planDenied('Public Signature API', 'Professional');
    }

    const { data: keys, error } = await supabase
      .from('api_keys')
      .select('id, name, key_prefix, is_revoked, created_at, last_used_at, created_by')
      .eq('organization_id', currentUser.organization_id)
      .order('created_at', { ascending: false });

    if (error) throw error;

    return NextResponse.json({ keys: keys || [] });
  } catch (error) {
    await logException(error, {
      route: '/api/settings/api-keys',
      method: 'GET',
      errorType: 'api_error',
    });
    return NextResponse.json({ error: 'Failed to list API keys' }, { status: 500 });
  }
}

/** POST — create a new API key */
export async function POST(request: NextRequest) {
  try {
    const supabase = createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const { data: currentUser } = await supabase
      .from('users')
      .select('id, organization_id, role')
      .eq('auth_id', user.id)
      .single();

    if (!currentUser?.organization_id) {
      return NextResponse.json({ error: 'Organization not found' }, { status: 404 });
    }

    // Only admins and owners can create keys
    if (!['owner', 'admin'].includes(currentUser.role)) {
      return NextResponse.json({ error: 'Only admins can create API keys' }, { status: 403 });
    }

    // Plan gate
    const orgPlan = await getOrgPlan(supabase, currentUser.organization_id, { authId: user.id });
    if (!checkFeature(orgPlan, 'apiAccess')) {
      return planDenied('Public Signature API', 'Professional');
    }

    // Check active key limit
    const activeCount = await countActiveKeys(supabase, currentUser.organization_id);
    if (activeCount >= MAX_KEYS_PER_ORG) {
      return NextResponse.json(
        { error: `Maximum of ${MAX_KEYS_PER_ORG} active API keys per organization` },
        { status: 400 },
      );
    }

    const { name } = await request.json();
    if (!name || typeof name !== 'string' || name.trim().length === 0) {
      return NextResponse.json({ error: 'Key name is required' }, { status: 400 });
    }

    const { rawKey, keyPrefix, keyHash } = generateApiKey();

    const { data: newKey, error } = await supabase
      .from('api_keys')
      .insert({
        organization_id: currentUser.organization_id,
        name: name.trim(),
        key_prefix: keyPrefix,
        key_hash: keyHash,
        created_by: currentUser.id,
      })
      .select('id, name, key_prefix, created_at')
      .single();

    if (error) throw error;

    // Return the raw key ONCE — it can never be retrieved again
    return NextResponse.json({
      key: {
        ...newKey,
        rawKey,
      },
    });
  } catch (error) {
    await logException(error, {
      route: '/api/settings/api-keys',
      method: 'POST',
      errorType: 'api_error',
    });
    return NextResponse.json({ error: 'Failed to create API key' }, { status: 500 });
  }
}
