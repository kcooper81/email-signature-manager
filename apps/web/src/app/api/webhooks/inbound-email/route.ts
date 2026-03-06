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
  const webhookSecret = process.env.RESEND_WEBHOOK_SECRET;
  if (!webhookSecret) return false;

  // Resend uses Svix under the hood — headers are svix-id, svix-timestamp, svix-signature
  const svixId = request.headers.get('svix-id');
  const svixTimestamp = request.headers.get('svix-timestamp');
  const svixSignature = request.headers.get('svix-signature');

  if (!svixId || !svixTimestamp || !svixSignature) return false;

  // Reject timestamps older than 5 minutes
  const age = Math.abs(Date.now() / 1000 - Number(svixTimestamp));
  if (age > 300) return false;

  // Secret from Resend dashboard is prefixed with "whsec_" and base64-encoded
  const secretBytes = Buffer.from(
    webhookSecret.startsWith('whsec_') ? webhookSecret.slice(6) : webhookSecret,
    'base64'
  );

  // Signature payload: "{svix-id}.{svix-timestamp}.{body}"
  const signaturePayload = `${svixId}.${svixTimestamp}.${body}`;
  const expected = createHmac('sha256', secretBytes)
    .update(signaturePayload)
    .digest('base64');

  // svix-signature header can contain multiple signatures: "v1,<base64> v1,<base64>"
  const signatures = svixSignature.split(' ');
  return signatures.some(sig => {
    const [version, value] = sig.split(',');
    return version === 'v1' && value === expected;
  });
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

  console.log('[inbound-email] Webhook received', {
    bodyLength: rawBody.length,
    hasWebhookSecret: !!process.env.RESEND_WEBHOOK_SECRET,
    contentType: request.headers.get('content-type'),
  });

  if (process.env.RESEND_WEBHOOK_SECRET) {
    if (!verifyResendWebhook(request, rawBody)) {
      console.error('[inbound-email] Webhook signature verification failed', {
        hasSvixId: !!request.headers.get('svix-id'),
        hasSvixTimestamp: !!request.headers.get('svix-timestamp'),
        hasSvixSignature: !!request.headers.get('svix-signature'),
        hasResendSignature: !!request.headers.get('resend-signature'),
      });
      return NextResponse.json({ error: 'Invalid signature' }, { status: 401 });
    }
  }

  let payload: any;
  try {
    payload = JSON.parse(rawBody);
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 });
  }

  const emailData = payload.data || payload;
  const { from, to, subject, email_id } = emailData;
  const senderEmail = typeof from === 'string' ? from : from?.address || from?.[0]?.address;
  const receivedAt = typeof to === 'string' ? to
    : Array.isArray(to) ? (to[0]?.address || to[0] || null)
    : to?.address || null;

  console.log('[inbound-email] Parsed', { senderEmail, receivedAt, subject: subject || '(none)', email_id });

  if (!senderEmail) {
    return NextResponse.json({ error: 'No sender email found' }, { status: 400 });
  }

  // Prevent loop: ignore emails FROM our own @siggly.io addresses
  const senderLower = senderEmail.toLowerCase();
  if (senderLower.includes('@siggly.io') || senderLower.includes('@send.siggly.io')) {
    console.log('[inbound-email] Skipping — email from our own domain', { senderEmail });
    return NextResponse.json({ skipped: true, reason: 'Sent from own domain' });
  }

  // Only process emails addressed to @siggly.io — ignore other domains
  const recipientStr = typeof receivedAt === 'string' ? receivedAt : '';
  if (!recipientStr.toLowerCase().includes('@siggly.io')) {
    return NextResponse.json({ skipped: true, reason: 'Not a siggly.io recipient' });
  }

  // Resend webhook only includes metadata — fetch body via Received Emails API
  let bodyText = '';
  let bodyHtml = '';
  if (email_id && process.env.RESEND_API_KEY) {
    try {
      // Use the /emails/receiving/{id} endpoint (not /emails/{id} which is for outbound)
      const res = await fetch(`https://api.resend.com/emails/receiving/${email_id}`, {
        headers: { Authorization: `Bearer ${process.env.RESEND_API_KEY}` },
      });
      if (res.ok) {
        const fullEmail = await res.json();
        bodyText = fullEmail.text || '';
        bodyHtml = fullEmail.html || '';
      } else {
        console.error('[inbound-email] Resend API error', { status: res.status, statusText: res.statusText });
      }
      console.log('[inbound-email] Fetched email body', {
        hasText: !!bodyText,
        hasHtml: !!bodyHtml,
        textLength: bodyText.length,
      });
    } catch (fetchErr) {
      console.error('[inbound-email] Failed to fetch email body', fetchErr);
    }
  }

  const messageBody = bodyText || bodyHtml?.replace(/<[^>]+>/g, '') || '';
  const displayBody = messageBody.trim() || '(No message body)';

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
            content: `Email reply from ${senderEmail}:\n\n${displayBody}`,
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
        message: `From: ${senderEmail}\nSubject: ${subject || '(no subject)'}\n\n${displayBody}`,
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
        message: displayBody.slice(0, 500),
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
