import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { resolveReplyFrom, sendComposeEmail } from '@/lib/email/resend';
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

    // Create the ticket
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

    // Send the email (with signature, proper headers for deliverability)
    try {
      await sendComposeEmail({
        to: to.trim(),
        subject: subject.trim(),
        body: body.trim(),
        ticketId: ticket.id,
        adminUserId: userData.id,
        replyAs: mailboxAddress,
      });

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
