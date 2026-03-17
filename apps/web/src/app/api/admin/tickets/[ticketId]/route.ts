import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

async function requireSuperAdmin(supabase: ReturnType<typeof createClient>) {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return null;
  const { data: userData } = await supabase
    .from('users')
    .select('is_super_admin')
    .eq('auth_id', user.id.toString())
    .single();
  return userData?.is_super_admin ? user : null;
}

/** PATCH — ticket actions: snooze, unsnooze, spam, not_spam, mark_unread */
export async function PATCH(
  request: NextRequest,
  { params }: { params: { ticketId: string } }
) {
  const supabase = createClient();
  if (!await requireSuperAdmin(supabase)) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
  }

  // Validate ticketId is a valid UUID
  const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
  if (!UUID_RE.test(params.ticketId)) {
    return NextResponse.json({ error: 'Invalid ticket ID format' }, { status: 400 });
  }

  let body: any;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Invalid request body' }, { status: 400 });
  }
  const now = new Date().toISOString();

  if (body.action === 'snooze') {
    const { until } = body;
    if (!until) return NextResponse.json({ error: 'Snooze time required' }, { status: 400 });
    const { error } = await supabase
      .from('feedback')
      .update({ snoozed_until: until, updated_at: now })
      .eq('id', params.ticketId);
    if (error) return NextResponse.json({ error: 'Failed to snooze' }, { status: 500 });
    return NextResponse.json({ success: true });
  }

  if (body.action === 'unsnooze') {
    const { error } = await supabase
      .from('feedback')
      .update({ snoozed_until: null, updated_at: now })
      .eq('id', params.ticketId);
    if (error) return NextResponse.json({ error: 'Failed to unsnooze' }, { status: 500 });
    return NextResponse.json({ success: true });
  }

  if (body.action === 'spam') {
    const { error } = await supabase
      .from('feedback')
      .update({ status: 'spam', updated_at: now })
      .eq('id', params.ticketId);
    if (error) return NextResponse.json({ error: 'Failed to mark as spam' }, { status: 500 });
    return NextResponse.json({ success: true });
  }

  if (body.action === 'not_spam') {
    const { error } = await supabase
      .from('feedback')
      .update({ status: 'new', updated_at: now })
      .eq('id', params.ticketId);
    if (error) return NextResponse.json({ error: 'Failed to unmark spam' }, { status: 500 });
    return NextResponse.json({ success: true });
  }

  if (body.action === 'mark_unread') {
    const { error } = await supabase
      .from('feedback')
      .update({ status: 'new', updated_at: now })
      .eq('id', params.ticketId)
      .in('status', ['reviewed']);
    if (error) return NextResponse.json({ error: 'Failed to mark unread' }, { status: 500 });
    return NextResponse.json({ success: true });
  }

  return NextResponse.json({ error: 'Unknown action' }, { status: 400 });
}

/** DELETE — permanently delete a ticket and its notes (cascade) */
export async function DELETE(
  _request: NextRequest,
  { params }: { params: { ticketId: string } }
) {
  const supabase = createClient();
  if (!await requireSuperAdmin(supabase)) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
  }

  // Validate ticketId is a valid UUID
  const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
  if (!UUID_RE.test(params.ticketId)) {
    return NextResponse.json({ error: 'Invalid ticket ID format' }, { status: 400 });
  }

  const { error } = await supabase
    .from('feedback')
    .delete()
    .eq('id', params.ticketId);

  if (error) return NextResponse.json({ error: 'Failed to delete ticket' }, { status: 500 });
  return NextResponse.json({ success: true });
}
