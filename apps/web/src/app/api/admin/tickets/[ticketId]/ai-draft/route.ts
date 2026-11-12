import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { draftTicketReply, summarizeTicket, isSupportAiConfigured, type ThreadMessage } from '@/lib/support/ai-draft';
import { logException } from '@/lib/error-logging';

/**
 * POST /api/admin/tickets/[ticketId]/ai-draft
 * Generates an AI draft reply (mode: 'reply') or a thread summary (mode: 'summary')
 * for the ticket, using the full conversation as context. Super-admin only.
 */
export async function POST(
  request: NextRequest,
  { params }: { params: { ticketId: string } }
) {
  try {
    if (!isSupportAiConfigured()) {
      return NextResponse.json({ error: 'AI assistant not configured' }, { status: 503 });
    }

    const body = await request.json().catch(() => ({}));
    const mode: 'reply' | 'summary' = body?.mode === 'summary' ? 'summary' : 'reply';
    const instructions: string | null = typeof body?.instructions === 'string' ? body.instructions : null;

    const supabase = createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const { data: userData } = await supabase
      .from('users')
      .select('is_super_admin')
      .eq('auth_id', user.id.toString())
      .single();
    if (!userData?.is_super_admin) {
      return NextResponse.json({ error: 'Forbidden - Super admin access required' }, { status: 403 });
    }

    const { data: ticket } = await supabase
      .from('feedback')
      .select('id, user_email, message, metadata')
      .eq('id', params.ticketId)
      .single();
    if (!ticket) return NextResponse.json({ error: 'Ticket not found' }, { status: 404 });

    const { data: notes } = await supabase
      .from('ticket_notes')
      .select('author_id, content, is_internal, created_at')
      .eq('ticket_id', params.ticketId)
      .order('created_at', { ascending: true });

    const subject = (ticket.metadata as any)?.original_subject || null;
    const origText = String(ticket.message || '')
      .replace(/^From:.*?\n(Subject:.*?\n)?\n?/s, '')
      .trim();

    const thread: ThreadMessage[] = [
      { role: 'customer', from: ticket.user_email || undefined, text: origText || '(no message body)' },
    ];
    for (const n of notes || []) {
      const text = String(n.content || '').replace(/^Email reply from .*?:\n\n/s, '').trim();
      if (!text) continue;
      const role: ThreadMessage['role'] = n.author_id ? (n.is_internal ? 'note' : 'agent') : 'customer';
      thread.push({ role, text });
    }

    const text = mode === 'summary'
      ? await summarizeTicket({ subject, thread })
      : await draftTicketReply({ subject, customerEmail: ticket.user_email, thread, instructions });

    if (!text) return NextResponse.json({ error: 'Empty response from AI' }, { status: 502 });
    return NextResponse.json({ text, mode });
  } catch (error) {
    await logException(error, {
      route: '/api/admin/tickets/[ticketId]/ai-draft',
      method: 'POST',
      errorType: 'api_error',
    });
    return NextResponse.json({ error: 'Failed to generate' }, { status: 500 });
  }
}
