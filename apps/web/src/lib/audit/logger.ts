/**
 * Audit Logging System
 * Automatically logs all important actions for compliance
 */

import { createClient, createServiceClient } from '@/lib/supabase/server';

export type AuditAction =
  | 'create'
  | 'update'
  | 'delete'
  | 'deploy'
  | 'invite'
  | 'login'
  | 'logout'
  | 'export'
  | 'sync';

export type ResourceType =
  | 'template'
  | 'user'
  | 'rule'
  | 'deployment'
  | 'organization'
  | 'integration'
  | 'role'
  | 'permission';

interface AuditLogParams {
  organizationId: string;
  userId?: string;
  action: AuditAction;
  resourceType: ResourceType;
  resourceId?: string;
  resourceName?: string;
  changes?: Record<string, any>;
  metadata?: Record<string, any>;
  ipAddress?: string;
  userAgent?: string;
}

/**
 * Log an audit event
 */
export async function logAudit(params: AuditLogParams): Promise<void> {
  try {
    const supabase = createServiceClient();

    await supabase.from('audit_logs').insert({
      organization_id: params.organizationId,
      user_id: params.userId || null,
      action: params.action,
      resource_type: params.resourceType,
      resource_id: params.resourceId || null,
      resource_name: params.resourceName || null,
      changes: params.changes || null,
      metadata: params.metadata || null,
      ip_address: params.ipAddress || null,
      user_agent: params.userAgent || null,
    });
  } catch (error) {
    // Log error but don't throw - audit logging should never break the main flow
    console.error('Audit logging failed:', error);
  }
}

/**
 * Helper to log template changes
 */
export async function logTemplateChange(
  organizationId: string,
  userId: string,
  action: 'create' | 'update' | 'delete',
  templateId: string,
  templateName: string,
  changes?: { before?: any; after?: any }
) {
  await logAudit({
    organizationId,
    userId,
    action,
    resourceType: 'template',
    resourceId: templateId,
    resourceName: templateName,
    changes,
  });
}

/**
 * Helper to log deployment
 */
export async function logDeployment(
  organizationId: string,
  userId: string,
  templateId: string,
  templateName: string,
  metadata?: Record<string, any>
) {
  await logAudit({
    organizationId,
    userId,
    action: 'deploy',
    resourceType: 'deployment',
    resourceId: templateId,
    resourceName: templateName,
    metadata,
  });
}

/**
 * Helper to log user changes
 */
export async function logUserChange(
  organizationId: string,
  adminUserId: string,
  action: 'create' | 'update' | 'delete' | 'invite',
  targetUserId: string,
  targetUserEmail: string,
  changes?: Record<string, any>
) {
  await logAudit({
    organizationId,
    userId: adminUserId,
    action,
    resourceType: 'user',
    resourceId: targetUserId,
    resourceName: targetUserEmail,
    changes,
  });
}

/**
 * Get audit logs for an organization
 */
export async function getAuditLogs(
  organizationId: string,
  filters?: {
    userId?: string;
    action?: AuditAction;
    resourceType?: ResourceType;
    startDate?: Date;
    endDate?: Date;
    limit?: number;
  }
) {
  const supabase = createClient();

  let query = supabase
    .from('audit_logs')
    .select('*')
    .eq('organization_id', organizationId)
    .order('created_at', { ascending: false });

  if (filters?.userId) {
    query = query.eq('user_id', filters.userId);
  }

  if (filters?.action) {
    query = query.eq('action', filters.action);
  }

  if (filters?.resourceType) {
    query = query.eq('resource_type', filters.resourceType);
  }

  if (filters?.startDate) {
    query = query.gte('created_at', filters.startDate.toISOString());
  }

  if (filters?.endDate) {
    query = query.lte('created_at', filters.endDate.toISOString());
  }

  if (filters?.limit) {
    query = query.limit(filters.limit);
  }

  const { data, error } = await query;

  if (error) {
    console.error('Failed to fetch audit logs:', error);
    return [];
  }

  return data || [];
}
