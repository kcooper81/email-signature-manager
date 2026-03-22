import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { resolveReplyFrom, sendComposeEmail } from '@/lib/email/resend';
import { logException } from '@/lib/error-logging';

/**
 * POST /api/admin/compose
 * Compose and send a new outbound email from the admin area.
 * Works like a regular email — no ticket is created.
 */
export async function POST(request: NextRequest) {
  try {
    const { to, subject, body, sendAs, cc, bcc } = await request.json();

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

    const mailboxAddress = sendAs || 'support@siggly.io';

    // Parse and validate CC/BCC — accept comma-separated strings or arrays
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const parsedCc = (Array.isArray(cc) ? cc : (cc || '').split(','))
      .map((e: string) => e.trim()).filter((e: string) => emailRegex.test(e));
    const parsedBcc = (Array.isArray(bcc) ? bcc : (bcc || '').split(','))
      .map((e: string) => e.trim()).filter((e: string) => emailRegex.test(e));

    try {
      await sendComposeEmail({
        to: to.trim(),
        subject: subject.trim(),
        body: body.trim(),
        adminUserId: userData.id,
        replyAs: mailboxAddress,
        cc: parsedCc.length ? parsedCc : undefined,
        bcc: parsedBcc.length ? parsedBcc : undefined,
      });

      return NextResponse.json({
        success: true,
        emailSent: true,
      });
    } catch (emailError) {
      console.error('Email send error:', emailError);
      await logException(emailError, {
        route: '/api/admin/compose',
        method: 'POST',
        errorType: 'api_error',
      });

      return NextResponse.json(
        { error: 'Failed to send email' },
        { status: 500 }
      );
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
