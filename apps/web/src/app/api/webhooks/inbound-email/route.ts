import { NextRequest, NextResponse } from 'next/server';
import { createClient as createSupabaseClient } from '@supabase/supabase-js';
import { notifyAdminsOfNewTicket, sendAutoResponse } from '@/lib/email/resend';
import { logException } from '@/lib/error-logging';
import { createHmac } from 'crypto';

/**
 * POST /api/webhooks/inbound-email
 * Receives all email sent to *@siggly.io via Resend's inbound webhook.
 * - Recognizes 7 aliases: support@, sales@, help@, contact@, info@, team@, kade@
 * - Auto-tags type based on recipient (sales@ → "sales" + high priority)
 * - Threads replies onto existing tickets by [Ticket#UUID] or subject matching
 * - Links to existing user profiles by matching sender email
 */

function getSupabaseAdmin() {
  return createSupabaseClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );
}

function verifyResendWebhook(request: NextRequest, body: string): boolean {
  const signature = request.headers.get('resend-signature');
  const webhookSecret = process.env.RESEND_WEBHOOK_SECRET;

  if (!webhookSecret || !signature) return false;

  const parts = signature.split(',');
  const timestamp = parts.find(p => p.startsWith('t='))?.slice(2);
  const v1 = parts.find(p => p.startsWith('v1='))?.slice(3);

  if (!timestamp || !v1) return false;

  const age = Math.abs(Date.now() / 1000 - Number(timestamp));
  if (age > 300) return false;

  const expected = createHmac('sha256', webhookSecret)
    .update(`${timestamp}.${body}`)
    .digest('hex');

  return expected === v1;
}

// Extract ticket ID from subject: [Ticket#abc12345] or [#abc12345]
const TICKET_ID_RE = /\[(?:Ticket)?#([a-f0-9-]{8})\]/i;

/** Extract the local part of the recipient email (e.g. "help" from "help@siggly.io") */
function getInboxAlias(toAddress: string | null): string | null {
  if (!toAddress) return null;
  const match = toAddress.match(/<?([^@<\s]+)@/);
  return match?.[1]?.toLowerCase() || null;
}

export async function POST(request: NextRequest) {
  const rawBody = await request.text();

  if (process.env.RESEND_WEBHOOK_SECRET) {
    if (!verifyResendWebhook(request, rawBody)) {
      return NextResponse.json({ error: 'Invalid signature' }, { status: 401 });
    }
  }

  let payload: any;
  try {
    payload = JSON.parse(rawBody);
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 });
  }

  const { from, to, subject, text, html } = payload.data || payload;
  const senderEmail = typeof from === 'string' ? from : from?.address || from?.[0]?.address;
  const receivedAt = typeof to === 'string' ? to
    : Array.isArray(to) ? (to[0]?.address || to[0] || null)
    : to?.address || null;

  if (!senderEmail) {
    return NextResponse.json({ error: 'No sender email found' }, { status: 400 });
  }

  const messageBody = text || html?.replace(/<[^>]+>/g, '') || '';
  if (!messageBody.trim()) {
    return NextResponse.json({ error: 'Empty email body' }, { status: 400 });
  }

  const supabase = getSupabaseAdmin();
  const inboxAlias = getInboxAlias(receivedAt);

  try {
    // --- Try to thread onto an existing ticket ---
    const isReply = subject && /^re:/i.test(subject.trim());

    if (isReply) {
      let existingTicketId: string | null = null;

      // Strategy 1: Match [Ticket#UUID] or [#UUID] in subject
      const ticketIdMatch = subject ? TICKET_ID_RE.exec(subject) : null;
      if (ticketIdMatch) {
        const { data: ticket } = await supabase
          .from('feedback')
          .select('id')
          .like('id', `${ticketIdMatch[1]}%`)
          .single();
        if (ticket) existingTicketId = ticket.id;
      }

      // Strategy 2: Fallback — match by original subject text + sender email
      if (!existingTicketId && subject) {
        const cleanSubject = subject.replace(/^re:\s*/i, '').replace(/\[(?:Ticket)?#[a-f0-9-]+\]\s*/i, '').trim();
        if (cleanSubject.length > 5) {
          const { data: ticket } = await supabase
            .from('feedback')
            .select('id')
            .eq('user_email', senderEmail)
            .ilike('message', `%${cleanSubject.slice(0, 80)}%`)
            .order('created_at', { ascending: false })
            .limit(1)
            .single();
          if (ticket) existingTicketId = ticket.id;
        }
      }

      if (existingTicketId) {
        await supabase
          .from('ticket_notes')
          .insert({
            ticket_id: existingTicketId,
            author_id: null,
            content: `Email reply from ${senderEmail}:\n\n${messageBody.trim()}`,
            is_internal: false,
            email_sent: false,
          });

        // Reopen if resolved/archived
        await supabase
          .from('feedback')
          .update({ status: 'new', updated_at: new Date().toISOString() })
          .eq('id', existingTicketId)
          .in('status', ['resolved', 'archived']);

        return NextResponse.json({ success: true, action: 'note_added', ticketId: existingTicketId });
      }
    }

    // --- New ticket ---

    // Auto-tag type & priority based on inbox alias
    const isSales = inboxAlias === 'sales';
    const ticketType = isSales ? 'sales' : 'email';
    const ticketPriority = isSales ? 'high' : 'normal';

    // Try to link sender to an existing user profile
    let userId: string | null = null;
    const { data: existingUser } = await supabase
      .from('users')
      .select('id')
      .eq('email', senderEmail)
      .limit(1)
      .single();
    if (existingUser) userId = existingUser.id;

    const { data: newTicket, error: insertError } = await supabase
      .from('feedback')
      .insert({
        user_id: userId,
        user_email: senderEmail,
        type: ticketType,
        priority: ticketPriority,
        message: `From: ${senderEmail}\nSubject: ${subject || '(no subject)'}\n\n${messageBody.trim()}`,
        status: 'new',
        inbox_email: receivedAt || null,
        metadata: {
          source: 'inbound_email',
          original_subject: subject || null,
          submitted_at: new Date().toISOString(),
        },
      })
      .select('id, type, user_email, message')
      .single();

    if (insertError) throw insertError;

    // Notify admins + auto-respond to sender (fire-and-forget)
    if (newTicket) {
      notifyAdminsOfNewTicket({
        ticketId: newTicket.id,
        type: newTicket.type,
        senderEmail: senderEmail,
        message: messageBody.trim().slice(0, 500),
        source: 'inbound_email',
      }).catch(() => {});

      sendAutoResponse({
        to: senderEmail,
        ticketId: newTicket.id,
        inboxEmail: receivedAt || null,
      }).catch(() => {});
    }

    return NextResponse.json({ success: true, action: 'ticket_created', ticketId: newTicket?.id });
  } catch (error) {
    await logException(error, {
      route: '/api/webhooks/inbound-email',
      method: 'POST',
      errorType: 'api_error',
      metadata: { senderEmail },
    });
    return NextResponse.json({ error: 'Failed to process inbound email' }, { status: 500 });
  }
}
