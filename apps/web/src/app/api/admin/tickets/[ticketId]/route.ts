import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

/** PATCH — snooze or un-snooze a ticket */
export async function PATCH(
  request: NextRequest,
  { params }: { params: { ticketId: string } }
) {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { data: userData } = await supabase
    .from('users')
    .select('is_super_admin')
    .eq('auth_id', user.id.toString())
    .single();
  if (!userData?.is_super_admin) return NextResponse.json({ error: 'Forbidden' }, { status: 403 });

  const body = await request.json();

  if (body.action === 'snooze') {
    const { until } = body;
    if (!until) return NextResponse.json({ error: 'Snooze time required' }, { status: 400 });

    const { error } = await supabase
      .from('feedback')
      .update({ snoozed_until: until, updated_at: new Date().toISOString() })
      .eq('id', params.ticketId);

    if (error) return NextResponse.json({ error: 'Failed to snooze' }, { status: 500 });
    return NextResponse.json({ success: true });
  }

  if (body.action === 'unsnooze') {
    const { error } = await supabase
      .from('feedback')
      .update({ snoozed_until: null, updated_at: new Date().toISOString() })
      .eq('id', params.ticketId);

    if (error) return NextResponse.json({ error: 'Failed to unsnooze' }, { status: 500 });
    return NextResponse.json({ success: true });
  }

  return NextResponse.json({ error: 'Unknown action' }, { status: 400 });
}
