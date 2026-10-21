import { NextRequest, NextResponse } from 'next/server';
import { createClient as createSupabaseClient } from '@supabase/supabase-js';
import { notifyAdminsOfNewTicket, sendAutoResponse } from '@/lib/email/resend';
import { logException } from '@/lib/error-logging';
import { createHmac, timingSafeEqual } from 'crypto';

/**
 * POST /api/webhooks/inbound-email
 * Receives all email sent to *@siggly.io via Resend's inbound webhook.
 * - Recognizes aliases: support@, sales@, help@, contact@, info@, team@, kade@
 * - Auto-tags type based on recipient (sales@ → "sales" + high priority)
 * - Threads replies onto existing tickets by RFC headers (In-Reply-To / References),
 *   then [Ticket#UUID] subject tag, then subject+sender heuristic
 * - Idempotent: the same Resend email is never turned into two tickets / two auto-replies
 * - Reliable: if the message body can't be fetched yet, returns a retryable error so
 *   Resend re-delivers rather than creating an empty "(No message body)" ticket
 * - Loop-safe: bounces and auto-responders don't create tickets or trigger auto-replies
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

  const svixId = request.headers.get('svix-id');
  const svixTimestamp = request.headers.get('svix-timestamp');
  const svixSignature = request.headers.get('svix-signature');
  if (!svixId || !svixTimestamp || !svixSignature) return false;

  // Reject timestamps outside a 5-minute window in either direction (clock skew / replay).
  const skew = Date.now() / 1000 - Number(svixTimestamp);
  if (!Number.isFinite(skew) || Math.abs(skew) > 300) return false;

  const secretBytes = Buffer.from(
    webhookSecret.startsWith('whsec_') ? webhookSecret.slice(6) : webhookSecret,
    'base64'
  );
  const signaturePayload = `${svixId}.${svixTimestamp}.${body}`;
  const expected = createHmac('sha256', secretBytes).update(signaturePayload).digest('base64');
  const expectedBuf = Buffer.from(expected);

  // svix-signature can carry multiple space-separated "v1,<base64>" signatures.
  return svixSignature.split(' ').some((sig) => {
    const [version, value] = sig.split(',');
    if (version !== 'v1' || !value) return false;
    const valueBuf = Buffer.from(value);
    return valueBuf.length === expectedBuf.length && timingSafeEqual(valueBuf, expectedBuf);
  });
}

// Extract a ticket ID embedded in a threading header: <ticket-UUID@siggly.io> or <compose-UUID-123@siggly.io>
const HEADER_TICKET_RE = /(?:ticket|compose)-([0-9a-f]{8}(?:-[0-9a-f]{4}){3}-[0-9a-f]{12}|[0-9a-f]{8,})/i;
// Extract ticket ID from subject tag: [Ticket#abc12345] or [#abc12345]
const SUBJECT_TICKET_RE = /\[(?:Ticket)?#([a-f0-9-]{8,})\]/i;
// Reply-subject prefixes across common locales (Re, AW, SV, Antwort, Fwd, …)
const REPLY_PREFIX_RE = /^\s*(re|aw|sv|antw(?:ort)?|rif|r|fw|fwd|wg|vs|res)(\[\d+\])?\s*:/i;

/** Normalize a from/to/cc field (string | {address} | array of either) to lowercased addresses. */
function toAddressList(field: any): string[] {
  const out: string[] = [];
  const push = (v: any) => {
    if (!v) return;
    if (typeof v === 'string') {
      const m = v.match(/<?([^@<\s]+@[^>\s]+)>?/);
      if (m) out.push(m[1].toLowerCase());
    } else if (typeof v === 'object' && v.address) {
      out.push(String(v.address).toLowerCase());
    }
  };
  if (Array.isArray(field)) field.forEach(push);
  else push(field);
  return out;
}

/** Build a case-insensitive header lookup from the various shapes Resend may return. */
function makeHeaderLookup(...sources: any[]): (name: string) => string | undefined {
  const map = new Map<string, string>();
  const add = (name: any, value: any) => {
    if (typeof name === 'string' && value != null) map.set(name.toLowerCase(), String(value));
  };
  for (const src of sources) {
    if (!src) continue;
    if (Array.isArray(src)) src.forEach((h) => add(h?.name ?? h?.key, h?.value));
    else if (typeof src === 'object') Object.entries(src).forEach(([k, v]) => add(k, v));
  }
  return (name: string) => map.get(name.toLowerCase());
}

function getInboxAlias(toAddress: string | null): string | null {
  if (!toAddress) return null;
  const match = toAddress.match(/<?([^@<\s]+)@/);
  return match?.[1]?.toLowerCase() || null;
}

export async function POST(request: NextRequest) {
  const rawBody = await request.text();

  if (!process.env.RESEND_WEBHOOK_SECRET) {
    console.error('[inbound-email] RESEND_WEBHOOK_SECRET not configured — rejecting webhook');
    return NextResponse.json({ error: 'Webhook not configured' }, { status: 500 });
  }
  if (!verifyResendWebhook(request, rawBody)) {
    console.error('[inbound-email] Webhook signature verification failed');
    return NextResponse.json({ error: 'Invalid signature' }, { status: 401 });
  }

  let payload: any;
  try {
    payload = JSON.parse(rawBody);
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 });
  }

  const emailData = payload.data || payload;
  const { from, to, cc, subject, email_id } = emailData;

  const senderEmail = toAddressList(from)[0] || null;
  if (!senderEmail) {
    return NextResponse.json({ error: 'No sender email found' }, { status: 400 });
  }

  // Loop guard: never process mail from our own domain.
  if (senderEmail.includes('@siggly.io') || senderEmail.includes('@send.siggly.io')) {
    return NextResponse.json({ skipped: true, reason: 'Sent from own domain' });
  }

  // Find the siggly.io recipient across BOTH to and cc (not just the first address),
  // so a CC'd support@ address is never silently dropped.
  const recipients = [...toAddressList(to), ...toAddressList(cc)];
  const receivedAt = recipients.find((a) => a.includes('@siggly.io')) || null;
  if (!receivedAt) {
    return NextResponse.json({ skipped: true, reason: 'No siggly.io recipient' });
  }

  const supabase = getSupabaseAdmin();
  const inboxAlias = getInboxAlias(receivedAt);

  try {
    // --- Idempotency: has this exact Resend email already become a ticket? ---
    if (email_id) {
      const { data: dupe } = await supabase
        .from('feedback')
        .select('id')
        .filter('metadata->>resend_email_id', 'eq', email_id)
        .limit(1)
        .maybeSingle();
      if (dupe) {
        return NextResponse.json({ success: true, action: 'duplicate_ignored', ticketId: dupe.id });
      }
    }

    // --- Fetch the message body + headers (Resend webhook carries metadata only) ---
    let bodyText = '';
    let bodyHtml = '';
    let attachments: Array<{ filename: string; content_type: string; content: string; content_id?: string }> = [];
    let header = makeHeaderLookup(emailData.headers);
    let bodyFetchFailed = false;

    if (email_id && process.env.RESEND_API_KEY) {
      try {
        const res = await fetch(`https://api.resend.com/emails/receiving/${email_id}`, {
          headers: { Authorization: `Bearer ${process.env.RESEND_API_KEY}` },
          signal: AbortSignal.timeout(10000),
        });
        if (res.ok) {
          const fullEmail = await res.json();
          bodyText = fullEmail.text || '';
          bodyHtml = fullEmail.html || '';
          attachments = fullEmail.attachments || [];
          header = makeHeaderLookup(fullEmail.headers, emailData.headers, {
            'in-reply-to': fullEmail.in_reply_to,
            references: fullEmail.references,
            'message-id': fullEmail.message_id,
          });
        } else {
          bodyFetchFailed = true;
          console.error('[inbound-email] Resend receiving API error', { status: res.status });
        }
      } catch (fetchErr) {
        bodyFetchFailed = true;
        console.error('[inbound-email] Failed to fetch email body', fetchErr);
      }
    }

    // If we were supposed to fetch a body but couldn't, ask Resend to retry (503) rather
    // than persisting a content-free ticket. Idempotency above prevents duplicates on retry.
    if (bodyFetchFailed && !bodyText && !bodyHtml) {
      return NextResponse.json(
        { error: 'Message body not available yet — retry' },
        { status: 503 }
      );
    }

    // --- Loop / bounce / auto-responder guard ---
    const autoSubmitted = (header('auto-submitted') || '').toLowerCase();
    const precedence = (header('precedence') || '').toLowerCase();
    const isBulkOrAuto =
      (autoSubmitted && autoSubmitted !== 'no') ||
      ['bulk', 'list', 'auto_reply', 'junk'].includes(precedence) ||
      !!header('list-id') ||
      !!header('list-unsubscribe') ||
      !!header('x-autoreply') ||
      !!header('x-autorespond') ||
      /^(mailer-daemon|postmaster|no-?reply|do-?not-?reply|bounce)/i.test(senderEmail.split('@')[0]);

    // Inline cid: images
    if (bodyHtml && attachments.length > 0) {
      for (const att of attachments) {
        if (att.content_id && att.content) {
          const cid = att.content_id.replace(/^<|>$/g, '');
          bodyHtml = bodyHtml.replace(
            new RegExp(`cid:${cid.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}`, 'gi'),
            `data:${att.content_type};base64,${att.content}`
          );
        }
      }
    }
    const fileAttachments = attachments
      .filter((att) => !att.content_id && att.filename)
      .map((att) => ({ filename: att.filename, content_type: att.content_type, size: att.content?.length || 0 }));

    const htmlToPlainText = (html: string) =>
      html
        .replace(/<style[^>]*>[\s\S]*?<\/style>/gi, '')
        .replace(/<script[^>]*>[\s\S]*?<\/script>/gi, '')
        .replace(/<head[^>]*>[\s\S]*?<\/head>/gi, '')
        .replace(/<br\s*\/?>/gi, '\n')
        .replace(/<\/p>/gi, '\n')
        .replace(/<\/div>/gi, '\n')
        .replace(/<[^>]+>/g, '')
        .replace(/&nbsp;/g, ' ')
        .replace(/&amp;/g, '&')
        .replace(/&lt;/g, '<')
        .replace(/&gt;/g, '>')
        .replace(/&quot;/g, '"')
        .replace(/&#39;/g, "'")
        .replace(/\n{3,}/g, '\n\n')
        .trim();

    const messageBody = bodyText || (bodyHtml ? htmlToPlainText(bodyHtml) : '');
    const displayBody = messageBody.trim() || '(No message body)';
    const htmlContent = bodyHtml?.trim() || null;

    // --- Resolve the ticket this email belongs to (if any) ---
    const inReplyTo = header('in-reply-to') || '';
    const references = header('references') || '';
    const headerBlob = `${inReplyTo} ${references}`;
    let existingTicketId: string | null = null;

    // Strategy 1 (most reliable): ticket id embedded in In-Reply-To / References headers.
    const headerMatch = HEADER_TICKET_RE.exec(headerBlob);
    if (headerMatch) {
      const id = headerMatch[1];
      const q = supabase.from('feedback').select('id');
      const { data } = await (id.length === 36 ? q.eq('id', id) : q.like('id', `${id}%`))
        .limit(1)
        .maybeSingle();
      if (data) existingTicketId = data.id;
    }

    // Strategy 2: [Ticket#UUID] tag in the subject.
    if (!existingTicketId && subject) {
      const m = SUBJECT_TICKET_RE.exec(subject);
      if (m) {
        const id = m[1];
        const q = supabase.from('feedback').select('id');
        const { data } = await (id.length === 36 ? q.eq('id', id) : q.like('id', `${id}%`))
          .limit(1)
          .maybeSingle();
        if (data) existingTicketId = data.id;
      }
    }

    // Strategy 3 (heuristic, last resort): same sender + same normalized subject on a
    // recent, still-open ticket. Only when the subject looks like a reply.
    const looksLikeReply = !!subject && (REPLY_PREFIX_RE.test(subject) || !!inReplyTo || !!references);
    if (!existingTicketId && looksLikeReply && subject) {
      const cleanSubject = subject
        .replace(REPLY_PREFIX_RE, '')
        .replace(/\[(?:Ticket)?#[a-f0-9-]+\]\s*/i, '')
        .trim();
      const escaped = cleanSubject.slice(0, 80).replace(/[%_\\]/g, '\\$&');
      if (cleanSubject.length > 5) {
        const since = new Date(Date.now() - 60 * 24 * 60 * 60 * 1000).toISOString();
        const { data } = await supabase
          .from('feedback')
          .select('id')
          .eq('user_email', senderEmail)
          .not('status', 'in', '("spam","archived")')
          .gte('created_at', since)
          .ilike('message', `%${escaped}%`)
          .order('created_at', { ascending: false })
          .limit(1)
          .maybeSingle();
        if (data) existingTicketId = data.id;
      }
    }

    // --- Thread onto the existing ticket ---
    if (existingTicketId) {
      const noteContent = `Email reply from ${senderEmail}:\n\n${displayBody}`;

      // Best-effort note-level dedup (retries after threading, before idempotency catches up).
      const tenMinAgo = new Date(Date.now() - 10 * 60 * 1000).toISOString();
      const { data: existingNote } = await supabase
        .from('ticket_notes')
        .select('id')
        .eq('ticket_id', existingTicketId)
        .is('author_id', null)
        .eq('content', noteContent)
        .gte('created_at', tenMinAgo)
        .limit(1)
        .maybeSingle();

      if (!existingNote) {
        await supabase.from('ticket_notes').insert({
          ticket_id: existingTicketId,
          author_id: null,
          content: noteContent,
          html_body: htmlContent,
          is_internal: false,
          email_sent: false,
        });
        // Reopen if resolved/archived.
        await supabase
          .from('feedback')
          .update({ status: 'new', updated_at: new Date().toISOString() })
          .eq('id', existingTicketId)
          .in('status', ['resolved', 'archived']);
      }

      return NextResponse.json({ success: true, action: 'note_added', ticketId: existingTicketId });
    }

    // --- Create a new ticket ---
    const isSales = inboxAlias === 'sales';
    const ticketType = isSales ? 'sales' : 'email';
    const ticketPriority = isSales ? 'high' : 'normal';

    // Link sender to an existing user profile if we recognize them.
    let userId: string | null = null;
    const { data: existingUser } = await supabase
      .from('users')
      .select('id')
      .eq('email', senderEmail)
      .limit(1)
      .maybeSingle();
    if (existingUser) userId = existingUser.id;

    const { data: newTicket, error: insertError } = await supabase
      .from('feedback')
      .insert({
        user_id: userId,
        user_email: senderEmail,
        type: ticketType,
        priority: ticketPriority,
        message: `From: ${senderEmail}\nSubject: ${subject || '(no subject)'}\n\n${displayBody}`,
        html_body: htmlContent,
        status: 'new',
        inbox_email: receivedAt || null,
        metadata: {
          source: 'inbound_email',
          original_subject: subject || null,
          submitted_at: new Date().toISOString(),
          is_auto: isBulkOrAuto || undefined,
          ...(email_id ? { resend_email_id: email_id } : {}),
          ...(inReplyTo || references ? { thread_headers: { in_reply_to: inReplyTo || undefined, references: references || undefined } } : {}),
          ...(fileAttachments.length > 0 ? { attachments: fileAttachments } : {}),
        },
      })
      .select('id, type, user_email, message')
      .single();

    if (insertError) {
      console.error('[inbound-email] DB insert failed', { error: insertError.message, code: insertError.code });
      throw insertError;
    }

    if (newTicket) {
      notifyAdminsOfNewTicket({
        ticketId: newTicket.id,
        type: newTicket.type,
        senderEmail,
        message: displayBody.slice(0, 500),
        source: 'inbound_email',
      }).catch((err) => console.error('[inbound-email] Admin notification failed:', err));

      // Loop guard: never auto-respond to bounces / vacation autoresponders / list mail.
      if (!isBulkOrAuto) {
        sendAutoResponse({
          to: senderEmail,
          ticketId: newTicket.id,
          inboxEmail: receivedAt || null,
        }).catch((err) => console.error('[inbound-email] Auto-response failed:', err));
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
