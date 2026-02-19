import { SupabaseClient } from '@supabase/supabase-js';

interface CreateUserOrgParams {
  supabaseAdmin: SupabaseClient;
  authId: string;
  email: string;
  firstName: string;
  lastName: string;
  organizationName: string;
  role?: string;
}

interface CreateUserOrgResult {
  success: boolean;
  organizationId?: string;
  error?: string;
}

/**
 * Shared utility to create an organization + user + subscription atomically.
 * Used by auth callback, setup-profile, and users/ensure to avoid divergent logic.
 * Cleans up partial records on failure.
 */
export async function createUserWithOrganization(
  params: CreateUserOrgParams
): Promise<CreateUserOrgResult> {
  const {
    supabaseAdmin,
    authId,
    email,
    firstName,
    lastName,
    organizationName,
    role = 'owner',
  } = params;

  // Validate inputs
  const trimmedOrgName = organizationName.trim().substring(0, 200);
  const trimmedFirstName = firstName.trim().substring(0, 100);
  const trimmedLastName = lastName.trim().substring(0, 100);

  if (!trimmedOrgName || !trimmedFirstName) {
    return { success: false, error: 'Missing required fields' };
  }

  // Generate unique slug
  let baseSlug = trimmedOrgName
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
    .substring(0, 50);

  if (!baseSlug) baseSlug = 'org';

  let slug = baseSlug;
  let slugExists = true;
  let attempts = 0;

  while (slugExists && attempts < 10) {
    const { data: existingOrg } = await supabaseAdmin
      .from('organizations')
      .select('id')
      .eq('slug', slug)
      .maybeSingle();

    if (!existingOrg) {
      slugExists = false;
    } else {
      slug = `${baseSlug}-${Math.floor(1000 + Math.random() * 9000)}`;
      attempts++;
    }
  }

  // Final fallback: UUID-based slug guarantees uniqueness
  if (slugExists) {
    slug = `${baseSlug}-${crypto.randomUUID().substring(0, 8)}`;
  }

  // Step 1: Create organization
  const { data: newOrg, error: orgError } = await supabaseAdmin
    .from('organizations')
    .insert({
      name: trimmedOrgName,
      slug,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    })
    .select('id')
    .single();

  if (orgError || !newOrg) {
    console.error('Failed to create organization:', orgError);
    return { success: false, error: 'Failed to create organization' };
  }

  // Step 2: Create user record
  const { error: userError } = await supabaseAdmin
    .from('users')
    .insert({
      auth_id: authId,
      email,
      first_name: trimmedFirstName,
      last_name: trimmedLastName,
      role,
      organization_id: newOrg.id,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    });

  if (userError) {
    console.error('Failed to create user record:', userError);
    // Cleanup: delete the orphaned org
    await supabaseAdmin.from('organizations').delete().eq('id', newOrg.id);
    return { success: false, error: 'Failed to create user profile' };
  }

  // Step 3: Create default free subscription
  const { error: subError } = await supabaseAdmin
    .from('subscriptions')
    .insert({
      organization_id: newOrg.id,
      plan: 'free',
      status: 'active',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    });

  if (subError) {
    console.error('Failed to create subscription:', subError);
    // Non-fatal: user can still use the app, billing page will handle missing subscription
  }

  return { success: true, organizationId: newOrg.id };
}

/**
 * Validates a redirect URL to prevent open redirect attacks.
 * Returns a safe path or '/dashboard' as fallback.
 */
export function sanitizeRedirectUrl(url: string | null): string {
  if (!url) return '/dashboard';

  // Must start with exactly one slash and not be a protocol-relative URL
  if (!url.startsWith('/') || url.startsWith('//')) {
    return '/dashboard';
  }

  // Block any URL that contains a protocol
  if (url.includes('://')) {
    return '/dashboard';
  }

  return url;
}
