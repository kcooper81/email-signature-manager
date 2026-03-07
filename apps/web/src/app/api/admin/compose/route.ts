import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { resolveReplyFrom, MAILBOXES } from '@/lib/email/resend';
import { logException } from '@/lib/error-logging';

/**
 * POST /api/admin/compose
 * Compose a new outbound email from the admin area.
 * Creates a ticket in the inbox and sends the email via Resend.
 * Replies from the recipient thread back into the ticket automatically.
 */
export async function POST(request: NextRequest) {
  try {
    const { to, subject, body, sendAs, context } = await request.json();

    if (!to?.trim() || !subject?.trim() || !body?.trim()) {
      return NextResponse.json(
        { error: 'to, subject, and body are required' },
        { status: 400 }
      );
    }

    const supabase = createClient();

    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { data: userData } = await supabase
      .from('users')
      .select('id, email, is_super_admin')
      .eq('auth_id', user.id.toString())
      .single();

    if (!userData?.is_super_admin) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    // Resolve the mailbox to send from
    const mailboxAddress = sendAs || 'support@siggly.io';
    const fromAddress = resolveReplyFrom(mailboxAddress);

    // Create the ticket first
    const { data: ticket, error: ticketError } = await supabase
      .from('feedback')
      .insert({
        user_id: null,
        user_email: to.trim(),
        type: 'email',
        priority: 'normal',
        message: `To: ${to.trim()}\nSubject: ${subject.trim()}\n\n${body.replace(/<[^>]+>/g, '').trim()}`,
        html_body: body.trim(),
        status: 'reviewed',
        inbox_email: mailboxAddress,
        metadata: {
          source: 'admin_compose',
          original_subject: subject.trim(),
          submitted_at: new Date().toISOString(),
          context: context || null,
          composed_by: userData.email,
        },
      })
      .select('id')
      .single();

    if (ticketError || !ticket) {
      console.error('Error creating ticket:', ticketError);
      return NextResponse.json({ error: 'Failed to create ticket' }, { status: 500 });
    }

    // Add the outbound message as the first note (so it appears in the thread)
    await supabase
      .from('ticket_notes')
      .insert({
        ticket_id: ticket.id,
        author_id: userData.id,
        content: body.trim(),
        is_internal: false,
        email_sent: false,
      });

    // Send the email via Resend
    try {
      const { Resend } = await import('resend');
      const resend = new Resend(process.env.RESEND_API_KEY);

      // Build plain text
      const plainBody = body.replace(/<[^>]+>/g, '').trim();

      // Sanitize HTML body for email
      let safeBody = body;
      safeBody = safeBody.replace(/<(script|style|iframe|object|embed|form)[^>]*>[\s\S]*?<\/\1>/gi, '');
      safeBody = safeBody.replace(/\s+on\w+\s*=\s*"[^"]*"/gi, '');
      safeBody = safeBody.replace(/\s+on\w+\s*=\s*'[^']*'/gi, '');
      safeBody = safeBody.replace(/<a\s+href=/g, '<a style="color: #4d52de; text-decoration: underline;" href=');
      safeBody = safeBody.replace(/<p>/g, '<p style="margin: 0.25em 0;">');

      const { error: emailError } = await resend.emails.send({
        from: fromAddress,
        to: [to.trim()],
        subject: `[Ticket#${ticket.id.slice(0, 8)}] ${subject.trim()}`,
        text: plainBody,
        html: `
          <!DOCTYPE html>
          <html>
            <head>
              <meta charset="utf-8">
              <meta name="viewport" content="width=device-width, initial-scale=1.0">
            </head>
            <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
              <div style="font-size: 15px; color: #374151;">${safeBody}</div>
              <div style="text-align: center; padding: 20px; color: #9ca3af; font-size: 11px;">
                <p style="margin: 5px 0;">Ticket #${ticket.id.slice(0, 8)}</p>
              </div>
            </body>
          </html>
        `,
        replyTo: mailboxAddress,
        headers: {
          'X-Entity-Ref-ID': ticket.id,
        },
      });

      if (emailError) {
        console.error('Resend send error:', emailError);
        return NextResponse.json({
          success: true,
          ticketId: ticket.id,
          warning: 'Ticket created but email failed to send',
        });
      }

      // Mark the note as sent
      await supabase
        .from('ticket_notes')
        .update({ email_sent: true })
        .eq('ticket_id', ticket.id);

      return NextResponse.json({
        success: true,
        ticketId: ticket.id,
        emailSent: true,
      });
    } catch (emailError) {
      console.error('Email send error:', emailError);
      await logException(emailError, {
        route: '/api/admin/compose',
        method: 'POST',
        errorType: 'api_error',
        metadata: { ticketId: ticket.id },
      });

      return NextResponse.json({
        success: true,
        ticketId: ticket.id,
        warning: 'Ticket created but email failed to send',
      });
    }
  } catch (error) {
    console.error('Compose email error:', error);
    await logException(error, {
      route: '/api/admin/compose',
      method: 'POST',
      errorType: 'api_error',
    });
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
