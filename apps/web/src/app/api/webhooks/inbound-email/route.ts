import { NextRequest, NextResponse } from 'next/server';
import { createClient as createSupabaseClient } from '@supabase/supabase-js';
import { notifyAdminsOfNewTicket } from '@/lib/email/resend';
import { logException } from '@/lib/error-logging';
import { createHmac } from 'crypto';

/**
 * POST /api/webhooks/inbound-email
 * Receives inbound emails from Resend when someone emails support@siggly.io
 * - If subject contains "Re:" and matches an existing ticket → adds as a note
 * - If new email → creates a feedback record with type: 'email'
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

  // Resend sends "t=<timestamp>,v1=<signature>"
  const parts = signature.split(',');
  const timestamp = parts.find(p => p.startsWith('t='))?.slice(2);
  const v1 = parts.find(p => p.startsWith('v1='))?.slice(3);

  if (!timestamp || !v1) return false;

  // Reject if timestamp is older than 5 minutes
  const age = Math.abs(Date.now() / 1000 - Number(timestamp));
  if (age > 300) return false;

  const expected = createHmac('sha256', webhookSecret)
    .update(`${timestamp}.${body}`)
    .digest('hex');

  return expected === v1;
}

// Extract ticket ID from a "Re:" subject line
// Matches patterns like "Re: Your bug submission" or "Re: [#abc12345] ..."
const TICKET_ID_RE = /\[#([a-f0-9-]{8})\]/i;

export async function POST(request: NextRequest) {
  const rawBody = await request.text();

  // Verify webhook signature (skip in dev if no secret set)
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

  // Resend inbound email payload structure
  const { from, to, subject, text, html } = payload.data || payload;
  const senderEmail = typeof from === 'string' ? from : from?.address || from?.[0]?.address;
  // Capture which mailbox they sent to (support@, help@, kade@, etc.)
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

  try {
    // Check if this is a reply to an existing ticket
    const isReply = subject && /^re:/i.test(subject.trim());
    const ticketIdMatch = subject ? TICKET_ID_RE.exec(subject) : null;

    if (isReply && ticketIdMatch) {
      const ticketPrefix = ticketIdMatch[1];

      // Find the ticket by ID prefix
      const { data: ticket } = await supabase
        .from('feedback')
        .select('id')
        .like('id', `${ticketPrefix}%`)
        .single();

      if (ticket) {
        // Add as a note on the existing ticket
        await supabase
          .from('ticket_notes')
          .insert({
            ticket_id: ticket.id,
            author_id: null, // External user, no author_id
            content: `Email reply from ${senderEmail}:\n\n${messageBody.trim()}`,
            is_internal: false,
            email_sent: false,
          });

        // Bump the ticket back to 'new' if it was resolved/archived
        await supabase
          .from('feedback')
          .update({ status: 'new', updated_at: new Date().toISOString() })
          .eq('id', ticket.id)
          .in('status', ['resolved', 'archived']);

        return NextResponse.json({ success: true, action: 'note_added', ticketId: ticket.id });
      }
    }

    // New email → create a feedback record
    const { data: newTicket, error: insertError } = await supabase
      .from('feedback')
      .insert({
        user_email: senderEmail,
        type: 'email',
        message: `From: ${senderEmail}\nSubject: ${subject || '(no subject)'}\n\n${messageBody.trim()}`,
        status: 'new',
        metadata: {
          source: 'inbound_email',
          original_subject: subject || null,
          received_at_mailbox: receivedAt || null,
          submitted_at: new Date().toISOString(),
        },
      })
      .select('id, type, user_email, message')
      .single();

    if (insertError) throw insertError;

    // Notify admins of the new ticket
    if (newTicket) {
      try {
        await notifyAdminsOfNewTicket({
          ticketId: newTicket.id,
          type: newTicket.type,
          senderEmail: senderEmail,
          message: messageBody.trim().slice(0, 500),
          source: 'inbound_email',
        });
      } catch {
        // Notification failure shouldn't break the webhook
      }
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
