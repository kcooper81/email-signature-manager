import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { getOrgPlan, checkFeature, planDenied } from '@/lib/billing/plan-guard';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  try {
    const supabase = createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const { data: userData } = await supabase
      .from('users').select('id, organization_id, role').eq('auth_id', user.id).single();
    if (!userData) return NextResponse.json({ error: 'User not found' }, { status: 404 });

    const orgPlan = await getOrgPlan(supabase, userData.organization_id);
    if (!checkFeature(orgPlan, 'hrIntegrations')) {
      return planDenied('HR integrations', 'professional');
    }

    const { data: configs } = await supabase
      .from('sync_configurations')
      .select('id, organization_id, provider, schedule_type, field_mapping, conflict_resolution, auto_apply_changes, sync_new_users, sync_deactivated, api_url, is_active, last_sync_at, last_sync_status, last_sync_result, created_at, updated_at')
      .eq('organization_id', userData.organization_id)
      .order('created_at', { ascending: false });

    return NextResponse.json({ configurations: configs || [] });
  } catch (err: any) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const supabase = createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const { data: userData } = await supabase
      .from('users').select('id, organization_id, role').eq('auth_id', user.id).single();
    if (!userData || !['owner', 'admin'].includes(userData.role)) {
      return NextResponse.json({ error: 'Insufficient permissions' }, { status: 403 });
    }

    const orgPlan = await getOrgPlan(supabase, userData.organization_id);
    if (!checkFeature(orgPlan, 'hrIntegrations')) {
      return planDenied('HR integrations', 'professional');
    }

    const body = await request.json();
    const { provider, scheduleType, fieldMapping, conflictResolution, autoApplyChanges, syncNewUsers, syncDeactivated, apiKey, apiUrl, webhookSecret, isActive } = body;

    if (!provider) return NextResponse.json({ error: 'Provider is required' }, { status: 400 });

    if (scheduleType === 'realtime' && !checkFeature(orgPlan, 'hrRealtimeSync')) {
      return planDenied('Realtime HR sync', 'enterprise');
    }

    const { data: config, error } = await supabase
      .from('sync_configurations')
      .insert({
        organization_id: userData.organization_id,
        provider,
        schedule_type: scheduleType || 'manual',
        field_mapping: fieldMapping || {},
        conflict_resolution: conflictResolution || 'ask_admin',
        auto_apply_changes: autoApplyChanges || false,
        sync_new_users: syncNewUsers !== false,
        sync_deactivated: syncDeactivated !== false,
        api_key: apiKey || null,
        api_url: apiUrl || null,
        webhook_secret: webhookSecret || null,
        is_active: isActive ?? true,
      })
      .select()
      .single();

    if (error) return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    return NextResponse.json({ success: true, configuration: config });
  } catch (err: any) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
