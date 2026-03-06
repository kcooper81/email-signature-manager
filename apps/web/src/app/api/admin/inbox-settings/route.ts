import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

/** GET — load mailbox signatures + auto-responder settings */
export async function GET() {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { data: userData } = await supabase
    .from('users')
    .select('is_super_admin')
    .eq('auth_id', user.id.toString())
    .single();
  if (!userData?.is_super_admin) return NextResponse.json({ error: 'Forbidden' }, { status: 403 });

  const [mailboxes, autoResponder] = await Promise.all([
    supabase.from('mailbox_signatures').select('*').order('alias'),
    supabase.from('auto_responder_settings').select('*').limit(1).single(),
  ]);

  return NextResponse.json({
    mailboxes: mailboxes.data || [],
    autoResponder: autoResponder.data || null,
  });
}

/** PUT — update a mailbox signature or auto-responder settings */
export async function PUT(request: NextRequest) {
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

  // Update mailbox signature
  if (body.type === 'mailbox') {
    const { id, signature_html, is_enabled } = body;
    const { error } = await supabase
      .from('mailbox_signatures')
      .update({
        signature_html: signature_html ?? '',
        is_enabled: is_enabled ?? true,
        updated_at: new Date().toISOString(),
      })
      .eq('id', id);
    if (error) return NextResponse.json({ error: 'Failed to update mailbox' }, { status: 500 });
    return NextResponse.json({ success: true });
  }

  // Update auto-responder
  if (body.type === 'auto_responder') {
    const { is_enabled, subject, body: responderBody, only_outside_hours, business_hours_start, business_hours_end, business_timezone } = body;
    const { error } = await supabase
      .from('auto_responder_settings')
      .update({
        is_enabled: is_enabled ?? false,
        subject: subject || 'We received your message',
        body: responderBody || '',
        only_outside_hours: only_outside_hours ?? false,
        business_hours_start: business_hours_start || '09:00',
        business_hours_end: business_hours_end || '17:00',
        business_timezone: business_timezone || 'America/New_York',
        updated_at: new Date().toISOString(),
      })
      .limit(1);
    if (error) return NextResponse.json({ error: 'Failed to update auto-responder' }, { status: 500 });
    return NextResponse.json({ success: true });
  }

  return NextResponse.json({ error: 'Unknown type' }, { status: 400 });
}
