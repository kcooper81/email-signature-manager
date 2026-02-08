/**
 * RBAC Permission Checking System
 */

import { createClient } from '@/lib/supabase/server';

export type Permission =
  // Template permissions
  | 'templates.view'
  | 'templates.create'
  | 'templates.edit'
  | 'templates.delete'
  | 'templates.rules'
  // Team permissions
  | 'team.view'
  | 'team.add'
  | 'team.edit'
  | 'team.delete'
  | 'team.invite'
  // Deployment permissions
  | 'deployments.create'
  | 'deployments.view'
  // Analytics permissions
  | 'analytics.view'
  | 'analytics.export'
  // Settings permissions
  | 'settings.organization'
  | 'settings.integrations'
  | 'settings.billing'
  | 'settings.roles';

/**
 * Check if a user has a specific permission
 */
export async function hasPermission(
  userId: string,
  organizationId: string,
  permission: Permission
): Promise<boolean> {
  const supabase = createClient();

  // Get user's roles
  const { data: userRoles } = await supabase
    .from('user_roles')
    .select('role_id')
    .eq('user_id', userId)
    .eq('organization_id', organizationId);

  if (!userRoles || userRoles.length === 0) {
    return false;
  }

  const roleIds = userRoles.map(ur => ur.role_id);

  // Check if any of the user's roles have the permission
  const { data: rolePermissions } = await supabase
    .from('role_permissions')
    .select('permission_id, permissions(name)')
    .in('role_id', roleIds);

  if (!rolePermissions) {
    return false;
  }

  return rolePermissions.some((rp: any) => rp.permissions?.name === permission);
}

/**
 * Check if user has any of the specified permissions
 */
export async function hasAnyPermission(
  userId: string,
  organizationId: string,
  permissions: Permission[]
): Promise<boolean> {
  for (const permission of permissions) {
    if (await hasPermission(userId, organizationId, permission)) {
      return true;
    }
  }
  return false;
}

/**
 * Check if user has all of the specified permissions
 */
export async function hasAllPermissions(
  userId: string,
  organizationId: string,
  permissions: Permission[]
): Promise<boolean> {
  for (const permission of permissions) {
    if (!(await hasPermission(userId, organizationId, permission))) {
      return false;
    }
  }
  return true;
}

/**
 * Get all permissions for a user
 */
export async function getUserPermissions(
  userId: string,
  organizationId: string
): Promise<Permission[]> {
  const supabase = createClient();

  const { data: userRoles } = await supabase
    .from('user_roles')
    .select('role_id')
    .eq('user_id', userId)
    .eq('organization_id', organizationId);

  if (!userRoles || userRoles.length === 0) {
    return [];
  }

  const roleIds = userRoles.map(ur => ur.role_id);

  const { data: rolePermissions } = await supabase
    .from('role_permissions')
    .select('permissions(name)')
    .in('role_id', roleIds);

  if (!rolePermissions) {
    return [];
  }

  return rolePermissions
    .map((rp: any) => rp.permissions?.name)
    .filter(Boolean) as Permission[];
}

/**
 * Assign a role to a user
 */
export async function assignRole(
  userId: string,
  roleId: string,
  organizationId: string,
  assignedBy: string
): Promise<boolean> {
  const supabase = createClient();

  const { error } = await supabase
    .from('user_roles')
    .insert({
      user_id: userId,
      role_id: roleId,
      organization_id: organizationId,
      assigned_by: assignedBy,
    });

  return !error;
}

/**
 * Remove a role from a user
 */
export async function removeRole(
  userId: string,
  roleId: string,
  organizationId: string
): Promise<boolean> {
  const supabase = createClient();

  const { error } = await supabase
    .from('user_roles')
    .delete()
    .eq('user_id', userId)
    .eq('role_id', roleId)
    .eq('organization_id', organizationId);

  return !error;
}
