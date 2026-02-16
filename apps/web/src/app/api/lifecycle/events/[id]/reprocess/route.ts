import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { processEvent } from '@/lib/lifecycle';
import { getOrgPlan, checkFeature, planDenied } from '@/lib/billing/plan-guard';

export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const supabase = createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const { data: userData } = await supabase
      .from('users').select('id, organization_id, role').eq('auth_id', user.id).single();
    if (!userData || !['owner', 'admin'].includes(userData.role)) {
      return NextResponse.json({ error: 'Insufficient permissions' }, { status: 403 });
    }

    const orgPlan = await getOrgPlan(supabase, userData.organization_id);
    if (!checkFeature(orgPlan, 'maxLifecycleWorkflows')) {
      return planDenied('Lifecycle automation', 'professional');
    }

    const { data: event } = await supabase
      .from('lifecycle_events')
      .select('*')
      .eq('id', id)
      .eq('organization_id', userData.organization_id)
      .single();

    if (!event) return NextResponse.json({ error: 'Event not found' }, { status: 404 });

    // Reset and reprocess
    await supabase
      .from('lifecycle_events')
      .update({ processed: false, processed_at: null })
      .eq('id', id);

    // Get user department
    let dept: string | undefined;
    if (event.user_id) {
      const { data: eventUser } = await supabase.from('users').select('department').eq('id', event.user_id).single();
      dept = eventUser?.department || undefined;
    }

    await processEvent({
      eventId: event.id,
      organizationId: event.organization_id,
      userId: event.user_id,
      eventType: event.event_type,
      eventSource: event.event_source,
      eventData: event.event_data || {},
      userDepartment: dept,
    });

    return NextResponse.json({ success: true });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
