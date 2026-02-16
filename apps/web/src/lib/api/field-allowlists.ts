/**
 * Field allowlists for PUT routes.
 * Only fields in these lists can be set via the request body,
 * preventing injection of organization_id, is_system, etc.
 */

export const DISCLAIMER_TEMPLATE_UPDATABLE = new Set([
  'name', 'category', 'content', 'content_html', 'description',
  'regulation_type', 'locale', 'styling', 'is_active',
]);

export const DISCLAIMER_RULE_UPDATABLE = new Set([
  'name', 'description', 'priority', 'is_active',
  'disclaimer_template_id',
  'department_condition', 'departments',
  'region_condition', 'regions',
  'recipient_condition', 'recipient_domains',
  'industry_condition', 'industries',
  'user_source_condition', 'user_sources',
  'start_date', 'end_date',
  'cascade_to_clients',
]);

export const SYNC_CONFIG_UPDATABLE = new Set([
  'schedule_type', 'field_mapping', 'conflict_resolution',
  'auto_apply_changes', 'sync_new_users', 'sync_deactivated',
  'api_key', 'api_url', 'is_active',
]);

export const LIFECYCLE_WORKFLOW_UPDATABLE = new Set([
  'name', 'description', 'event_type', 'is_active', 'priority',
  'department_filter', 'source_filter', 'actions', 'cascade_to_clients',
]);

/**
 * Pick only allowed keys from a body object.
 * Returns a new object containing only whitelisted fields.
 */
export function pickAllowed(body: Record<string, unknown>, allowlist: Set<string>): Record<string, unknown> {
  const result: Record<string, unknown> = {};
  for (const key of Object.keys(body)) {
    if (allowlist.has(key)) {
      result[key] = body[key];
    }
  }
  return result;
}
