import { createClient } from '@/lib/supabase/server';

interface EffectiveOrgResult {
  organizationId: string;
  userId: string;
  userRole: string;
  isMspContext: boolean;
  mspOrgId: string | null;
}

/**
 * Get the effective organization ID for the current request.
 * If an MSP user is viewing a client org (via header), returns the client org ID.
 * Otherwise returns the user's own organization ID.
 * 
 * Also validates that the user has access to the requested client org.
 */
export async function getEffectiveOrg(
  clientOrgIdFromHeader?: string | null
): Promise<EffectiveOrgResult | null> {
  const supabase = await createClient();
  
  const { data: { user }, error: authError } = await supabase.auth.getUser();
  if (authError || !user) {
    return null;
  }

  // Get user's own organization
  const { data: userData, error: userError } = await supabase
    .from('users')
    .select('id, organization_id, role')
    .eq('auth_id', user.id)
    .single();

  if (userError || !userData?.organization_id) {
    return null;
  }

  // If no client org requested, return user's own org
  if (!clientOrgIdFromHeader) {
    return {
      organizationId: userData.organization_id,
      userId: userData.id,
      userRole: userData.role,
      isMspContext: false,
      mspOrgId: null,
    };
  }

  // Validate MSP access to the client org
  const { data: userOrg } = await supabase
    .from('organizations')
    .select('organization_type')
    .eq('id', userData.organization_id)
    .single();

  if (userOrg?.organization_type !== 'msp') {
    // User is not in an MSP org, cannot access other orgs
    return null;
  }

  // Verify the client org is actually a child of this MSP
  const { data: clientOrg } = await supabase
    .from('organizations')
    .select('id, parent_organization_id, organization_type')
    .eq('id', clientOrgIdFromHeader)
    .single();

  if (!clientOrg) {
    return null;
  }

  if (clientOrg.parent_organization_id !== userData.organization_id) {
    // Client org is not managed by this MSP
    return null;
  }

  if (clientOrg.organization_type !== 'msp_client') {
    // Not a client org
    return null;
  }

  // User has access - return client org context
  return {
    organizationId: clientOrgIdFromHeader,
    userId: userData.id,
    userRole: 'admin', // MSP users act as admin in client orgs
    isMspContext: true,
    mspOrgId: userData.organization_id,
  };
}

/**
 * Extract the MSP client org ID from request headers.
 * The client sends this header when viewing a client org.
 */
export function getMspClientOrgFromHeaders(request: Request): string | null {
  return request.headers.get('x-msp-client-org') || null;
}
