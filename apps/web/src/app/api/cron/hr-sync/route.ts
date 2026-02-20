import { NextRequest, NextResponse } from 'next/server';
import { createServiceClient } from '@/lib/supabase/server';
import { runSync } from '@/lib/hr-sync';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  try {
    // Verify cron secret
    const authHeader = request.headers.get('authorization');
    const cronSecret = process.env.CRON_SECRET;
    if (!cronSecret) {
      return NextResponse.json({ error: 'CRON_SECRET not configured' }, { status: 500 });
    }
    if (authHeader !== `Bearer ${cronSecret}`) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Use service client — cron has no user session
    const supabase = createServiceClient();

    // Get all active sync configs that are due
    const { data: configs } = await supabase
      .from('sync_configurations')
      .select('id, organization_id, schedule_type, last_sync_at')
      .eq('is_active', true)
      .in('schedule_type', ['daily', 'weekly']);

    const { getOrgPlan, checkFeature } = await import('@/lib/billing/plan-guard');

    const results: any[] = [];
    const now = new Date();

    for (const config of configs || []) {
      const lastSync = config.last_sync_at ? new Date(config.last_sync_at) : null;
      const hoursSince = lastSync ? (now.getTime() - lastSync.getTime()) / (1000 * 60 * 60) : Infinity;

      let shouldSync = false;
      if (config.schedule_type === 'daily' && hoursSince >= 24) shouldSync = true;
      if (config.schedule_type === 'weekly' && hoursSince >= 168) shouldSync = true;

      if (shouldSync) {
        const orgPlan = await getOrgPlan(supabase, config.organization_id);
        if (!checkFeature(orgPlan, 'hrIntegrations')) {
          results.push({ configId: config.id, skipped: true, reason: 'Plan does not include HR integrations' });
          continue;
        }
        const result = await runSync(config.id, config.organization_id);
        results.push({ configId: config.id, ...result });
      }
    }

    return NextResponse.json({ success: true, synced: results.length, results });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
