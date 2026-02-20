/**
 * HR Sync Orchestrator
 * Coordinates syncing user data from HR providers (BambooHR, Gusto, Rippling)
 */

import { createServiceClient } from '@/lib/supabase/server';
import { mapFields } from './field-mapper';
import { detectChanges } from './change-detector';
import { calculateProfileCompleteness } from './profile-completeness';

export interface SyncResult {
  totalRecords: number;
  created: number;
  updated: number;
  deactivated: number;
  pendingReview: number;
  errors: string[];
}

export async function runSync(
  syncConfigId: string,
  organizationId: string
): Promise<SyncResult> {
  const supabase = createServiceClient();
  const result: SyncResult = {
    totalRecords: 0,
    created: 0,
    updated: 0,
    deactivated: 0,
    pendingReview: 0,
    errors: [],
  };

  try {
    // Load sync configuration
    const { data: config } = await supabase
      .from('sync_configurations')
      .select('*')
      .eq('id', syncConfigId)
      .eq('organization_id', organizationId)
      .single();

    if (!config) {
      result.errors.push('Sync configuration not found');
      return result;
    }

    // Fetch data from HR provider
    let hrRecords: any[] = [];
    try {
      hrRecords = await fetchHrData(config.provider, config.api_key, config.api_url);
    } catch (err: any) {
      result.errors.push(`Failed to fetch HR data: ${err.message}`);
      await updateSyncStatus(supabase, syncConfigId, 'failed', result);
      return result;
    }

    result.totalRecords = hrRecords.length;

    // Map HR fields to our user fields
    const mappedRecords = hrRecords.map(record =>
      mapFields(record, config.field_mapping || {})
    );

    // Get existing users
    const { data: existingUsers } = await supabase
      .from('users')
      .select('*')
      .eq('organization_id', organizationId);

    // Detect changes
    const changes = detectChanges(mappedRecords, existingUsers || []);

    // Process changes based on auto-apply setting
    for (const change of changes) {
      if (config.auto_apply_changes) {
        // Auto-apply
        try {
          await applyChange(supabase, organizationId, change);
          if (change.type === 'create') result.created++;
          else if (change.type === 'update') result.updated++;
          else if (change.type === 'deactivate') result.deactivated++;
        } catch (err: any) {
          result.errors.push(`Failed to apply change for ${change.email}: ${err.message}`);
        }
      } else {
        // Queue for review
        await supabase.from('sync_change_queue').insert({
          organization_id: organizationId,
          sync_configuration_id: syncConfigId,
          user_id: change.userId || null,
          user_email: change.email,
          change_type: change.type,
          field_changes: change.fieldChanges,
          status: 'pending',
        });
        result.pendingReview++;
      }
    }

    // Update profile completeness for all users
    const { data: updatedUsers } = await supabase
      .from('users')
      .select('*')
      .eq('organization_id', organizationId);

    for (const u of updatedUsers || []) {
      const score = calculateProfileCompleteness(u);
      await supabase
        .from('users')
        .update({ profile_completeness: score })
        .eq('id', u.id);
    }

    await updateSyncStatus(supabase, syncConfigId, 'success', result);
    return result;
  } catch (err: any) {
    result.errors.push(err.message);
    await updateSyncStatus(supabase, syncConfigId, 'failed', result);
    return result;
  }
}

async function fetchHrData(provider: string, apiKey: string | null, apiUrl: string | null): Promise<any[]> {
  // Provider-specific API calls would go here
  // For now, return empty array — actual implementations in provider-specific files
  switch (provider) {
    case 'bamboohr':
      const { fetchBambooHREmployees } = await import('./bamboohr');
      return fetchBambooHREmployees(apiKey || '', apiUrl || '');
    case 'gusto':
      const { fetchGustoEmployees } = await import('./gusto');
      return fetchGustoEmployees(apiKey || '', apiUrl || '');
    case 'rippling':
      const { fetchRipplingEmployees } = await import('./rippling');
      return fetchRipplingEmployees(apiKey || '', apiUrl || '');
    default:
      return [];
  }
}

async function applyChange(supabase: any, organizationId: string, change: any) {
  if (change.type === 'create') {
    await supabase.from('users').insert({
      organization_id: organizationId,
      email: change.email,
      ...change.data,
      source: change.source || 'hr_sync',
    });
  } else if (change.type === 'update' && change.userId) {
    const updates: Record<string, any> = {};
    for (const fc of change.fieldChanges) {
      updates[fc.field] = fc.newValue;
    }
    updates.last_enrichment_at = new Date().toISOString();
    updates.last_enrichment_source = change.source || 'hr_sync';
    await supabase.from('users').update(updates).eq('id', change.userId);
  } else if (change.type === 'deactivate' && change.userId) {
    await supabase.from('users').update({ is_active: false }).eq('id', change.userId);
  }
}

async function updateSyncStatus(supabase: any, syncConfigId: string, status: string, result: SyncResult) {
  await supabase
    .from('sync_configurations')
    .update({
      last_sync_at: new Date().toISOString(),
      last_sync_status: status,
      last_sync_result: result,
      updated_at: new Date().toISOString(),
    })
    .eq('id', syncConfigId);
}
