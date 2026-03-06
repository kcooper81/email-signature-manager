import { Resend } from 'resend';
import { escapeHtml } from '@/lib/utils';
import { renderSignatureToHtml } from '@/lib/signature-renderer';

let resend: Resend | null = null;

function getResendClient(): Resend {
  if (!resend) {
    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
      throw new Error('RESEND_API_KEY environment variable is not set');
    }
    resend = new Resend(apiKey);
  }
  return resend;
}

// Email sender addresses - use specific addresses for different email types
const EMAIL_FROM = {
  support: process.env.RESEND_FROM_SUPPORT || 'Siggly Support <support@siggly.io>',
  noreply: process.env.RESEND_FROM_NOREPLY || 'Siggly <noreply@siggly.io>',
  sales: process.env.RESEND_FROM_SALES || 'Siggly <sales@siggly.io>',
};

// All mailboxes that can receive and send replies
// Key = the local part before @, value = the formatted "From" address
export const MAILBOXES: Record<string, string> = {
  support: 'Siggly Support <support@siggly.io>',
  team: 'Siggly Team <team@siggly.io>',
  kade: 'Kade <kade@siggly.io>',
  sales: 'Siggly Sales <sales@siggly.io>',
  help: 'Siggly Help <help@siggly.io>',
  contact: 'Siggly <contact@siggly.io>',
  info: 'Siggly <info@siggly.io>',
};

/**
 * Sanitize rich editor HTML for email delivery.
 * Strips dangerous elements (script, iframe, etc.) while preserving
 * formatting tags and converting them to inline styles for email clients.
 */
function sanitizeEmailHtml(html: string): string {
  // Strip script, style, iframe, object, embed, form tags and their content
  let safe = html.replace(/<(script|style|iframe|object|embed|form)[^>]*>[\s\S]*?<\/\1>/gi, '');
  // Strip event handlers
  safe = safe.replace(/\s+on\w+\s*=\s*"[^"]*"/gi, '');
  safe = safe.replace(/\s+on\w+\s*=\s*'[^']*'/gi, '');
  // Convert TipTap tags to email-safe inline styles
  safe = safe.replace(/<a\s+href=/g, '<a style="color: #4d52de; text-decoration: underline;" href=');
  safe = safe.replace(/<ul>/g, '<ul style="padding-left: 1.5em; margin: 0.5em 0;">');
  safe = safe.replace(/<ol>/g, '<ol style="padding-left: 1.5em; margin: 0.5em 0;">');
  safe = safe.replace(/<li>/g, '<li style="margin: 0.25em 0;">');
  safe = safe.replace(/<p>/g, '<p style="margin: 0.25em 0;">');
  return safe;
}

/**
 * Resolve the "from" address for a ticket reply.
 * Matches the mailbox the user originally emailed.
 */
export function resolveReplyFrom(receivedAt: string | null | undefined): string {
  if (!receivedAt) return EMAIL_FROM.support;
  // Extract local part: "help@siggly.io" → "help", "Siggly Help <help@siggly.io>" → "help"
  const match = receivedAt.match(/<?([^@<\s]+)@/);
  const local = match?.[1]?.toLowerCase();
  return (local && MAILBOXES[local]) || EMAIL_FROM.support;
}

/**
 * Look up a per-mailbox signature from the mailbox_signatures table.
 * Returns the stored HTML if the mailbox has a non-empty signature enabled.
 */
async function getMailboxSignature(mailboxAlias: string | null | undefined): Promise<string | null> {
  if (!mailboxAlias) return null;
  try {
    const { createClient: createSupabaseClient } = await import('@supabase/supabase-js');
    const supabase = createSupabaseClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    );
    const match = mailboxAlias.match(/<?([^@<\s]+)@/);
    const alias = match?.[1]?.toLowerCase() || mailboxAlias.toLowerCase();
    const { data } = await supabase
      .from('mailbox_signatures')
      .select('signature_html, is_enabled')
      .eq('alias', alias)
      .single();
    if (data?.is_enabled && data.signature_html?.trim()) {
      return data.signature_html;
    }
    return null;
  } catch {
    return null;
  }
}

/**
 * Render the email signature for an admin user (by users.id).
 * Looks up their assigned template (or org default), renders it, and returns HTML.
 * Returns null if no signature is available.
 */
async function renderAdminSignature(adminUserId: string): Promise<string | null> {
  try {
    const { createClient: createSupabaseClient } = await import('@supabase/supabase-js');
    const supabase = createSupabaseClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    );

    // Get admin user data
    const { data: user } = await supabase
      .from('users')
      .select('*, organization:organization_id(name)')
      .eq('id', adminUserId)
      .single();

    if (!user) return null;

    // Find their assigned template, or org default
    let template: any = null;

    const { data: assignment } = await supabase
      .from('signature_assignments')
      .select('template:template_id(id, blocks, name)')
      .eq('user_id', adminUserId)
      .order('created_at', { ascending: false })
      .limit(1)
      .single();

    if (assignment?.template) {
      template = assignment.template;
    }

    if (!template && user.organization_id) {
      const { data: defaultTpl } = await supabase
        .from('signature_templates')
        .select('id, blocks, name')
        .eq('organization_id', user.organization_id)
        .eq('is_default', true)
        .single();
      template = defaultTpl;
    }

    if (!template) return null;

    const blocks = (template.blocks as any[]) || [];
    if (blocks.length === 0) return null;

    const context = {
      user: {
        firstName: user.first_name || '',
        lastName: user.last_name || '',
        email: user.email,
        title: user.title || '',
        department: user.department || '',
        phone: user.phone || '',
        mobile: user.mobile || '',
        calendlyUrl: user.calendly_url || '',
        linkedinUrl: user.linkedin_url || '',
        twitterUrl: user.twitter_url || '',
        githubUrl: user.github_url || '',
        personalWebsite: user.personal_website || '',
        instagramUrl: user.instagram_url || '',
        facebookUrl: user.facebook_url || '',
        youtubeUrl: user.youtube_url || '',
        googleBookingUrl: user.google_booking_url || '',
      },
      organization: { name: user.organization?.name || '' },
    };

    const { html } = await renderSignatureToHtml(blocks, context);
    return html || null;
  } catch (error) {
    console.error('Failed to render admin signature:', error);
    return null;
  }
}

export interface TicketResponseEmailData {
  to: string;
  ticketId: string;
  ticketType: string;
  originalMessage: string;
  responseMessage: string;
  /** When true, responseMessage contains HTML from the rich text editor */
  isHtml?: boolean;
  adminEmail: string;
  /** The users.id of the admin sending the reply — used to render their email signature */
  adminUserId?: string | null;
  /** The mailbox address to send from (e.g. "help@siggly.io"). Falls back to support. */
  replyAs?: string | null;
}

export interface ContactFormEmailData {
  name: string;
  email: string;
  company?: string;
  subject: string;
  message: string;
}

export async function sendContactFormEmail(data: ContactFormEmailData) {
  const { email } = data;
  const name = escapeHtml(data.name);
  const company = data.company ? escapeHtml(data.company) : undefined;
  const subject = escapeHtml(data.subject);
  const message = escapeHtml(data.message);

  try {
    const client = getResendClient();
    const { data: emailData, error } = await client.emails.send({
      from: EMAIL_FROM.sales,
      to: ['sales@siggly.io'],
      subject: `[Contact Form] ${subject}`,
      replyTo: email,
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
          </head>
          <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
            <div style="background: linear-gradient(135deg, #4d52de 0%, #2563eb 100%); padding: 30px; border-radius: 12px 12px 0 0; text-align: center;">
              <h1 style="color: white; margin: 0; font-size: 24px;">New Contact Form Submission</h1>
            </div>
            
            <div style="background: #ffffff; padding: 30px; border: 1px solid #e5e7eb; border-top: none; border-radius: 0 0 12px 12px;">
              <table style="width: 100%; border-collapse: collapse;">
                <tr>
                  <td style="padding: 10px 0; border-bottom: 1px solid #e5e7eb; font-weight: 600; width: 100px;">Name:</td>
                  <td style="padding: 10px 0; border-bottom: 1px solid #e5e7eb;">${name}</td>
                </tr>
                <tr>
                  <td style="padding: 10px 0; border-bottom: 1px solid #e5e7eb; font-weight: 600;">Email:</td>
                  <td style="padding: 10px 0; border-bottom: 1px solid #e5e7eb;"><a href="mailto:${email}" style="color: #4d52de;">${email}</a></td>
                </tr>
                ${company ? `
                <tr>
                  <td style="padding: 10px 0; border-bottom: 1px solid #e5e7eb; font-weight: 600;">Company:</td>
                  <td style="padding: 10px 0; border-bottom: 1px solid #e5e7eb;">${company}</td>
                </tr>
                ` : ''}
                <tr>
                  <td style="padding: 10px 0; border-bottom: 1px solid #e5e7eb; font-weight: 600;">Subject:</td>
                  <td style="padding: 10px 0; border-bottom: 1px solid #e5e7eb;">${subject}</td>
                </tr>
              </table>
              
              <div style="margin-top: 20px;">
                <p style="font-weight: 600; margin-bottom: 10px;">Message:</p>
                <div style="background: #f3f4f6; padding: 15px; border-radius: 8px; white-space: pre-wrap;">${message}</div>
              </div>
              
              <div style="margin-top: 20px; padding: 15px; background: #eff6ff; border-radius: 8px;">
                <p style="margin: 0; font-size: 14px; color: #1e40af;">
                  <strong>Quick Reply:</strong> Simply reply to this email to respond directly to ${name}.
                </p>
              </div>
            </div>
          </body>
        </html>
      `,
    });

    if (error) {
      console.error('Resend email error:', error);
      throw new Error(`Failed to send email: ${error.message}`);
    }

    return { success: true, emailId: emailData?.id };
  } catch (error) {
    console.error('Error sending contact form email:', error);
    throw error;
  }
}

export interface TeamInviteEmailData {
  to: string;
  inviterName: string;
  organizationName: string;
  inviteUrl: string;
  expiresAt: string;
}

export async function sendTeamInviteEmail(data: TeamInviteEmailData) {
  const { to, inviteUrl, expiresAt } = data;
  const inviterName = escapeHtml(data.inviterName);
  const organizationName = escapeHtml(data.organizationName);

  try {
    const client = getResendClient();
    const { data: emailData, error } = await client.emails.send({
      from: EMAIL_FROM.noreply,
      to: [to],
      subject: `You've been invited to join ${organizationName} on Siggly`,
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
          </head>
          <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
            <div style="background: linear-gradient(135deg, #4d52de 0%, #2563eb 100%); padding: 30px; border-radius: 12px 12px 0 0; text-align: center;">
              <h1 style="color: white; margin: 0; font-size: 24px;">You're Invited!</h1>
            </div>
            
            <div style="background: #ffffff; padding: 30px; border: 1px solid #e5e7eb; border-top: none; border-radius: 0 0 12px 12px;">
              <p style="font-size: 16px; color: #374151; margin-top: 0;">Hi there,</p>
              
              <p style="font-size: 16px; color: #374151;">
                <strong>${inviterName}</strong> has invited you to join <strong>${organizationName}</strong> on Siggly to manage your email signature.
              </p>
              
              <p style="font-size: 16px; color: #374151;">
                Click the button below to set up your account and start managing your professional email signature:
              </p>
              
              <div style="text-align: center; margin: 30px 0;">
                <a href="${inviteUrl}" style="display: inline-block; background: linear-gradient(135deg, #4d52de 0%, #2563eb 100%); color: white; text-decoration: none; padding: 14px 32px; border-radius: 8px; font-weight: 600; font-size: 16px;">
                  Accept Invitation
                </a>
              </div>
              
              <p style="font-size: 14px; color: #6b7280;">
                Or copy and paste this link into your browser:<br>
                <a href="${inviteUrl}" style="color: #4d52de; word-break: break-all;">${inviteUrl}</a>
              </p>
              
              <div style="margin-top: 20px; padding: 15px; background: #fef3c7; border-radius: 8px;">
                <p style="margin: 0; font-size: 14px; color: #92400e;">
                  <strong>Note:</strong> This invitation expires on ${new Date(expiresAt).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}.
                </p>
              </div>
              
              <p style="font-size: 14px; color: #6b7280; margin-top: 20px; margin-bottom: 0;">
                If you didn't expect this invitation, you can safely ignore this email.
              </p>
            </div>
            
            <div style="text-align: center; padding: 20px; color: #9ca3af; font-size: 12px;">
              <p style="margin: 5px 0;">
                <a href="https://siggly.io" style="color: #4d52de; text-decoration: none;">Visit Siggly</a> | 
                <a href="mailto:support@siggly.io" style="color: #4d52de; text-decoration: none;">Contact Support</a>
              </p>
            </div>
          </body>
        </html>
      `,
    });

    if (error) {
      console.error('Resend email error:', error);
      throw new Error(`Failed to send email: ${error.message}`);
    }

    return { success: true, emailId: emailData?.id };
  } catch (error) {
    console.error('Error sending team invite email:', error);
    throw error;
  }
}

export interface AdminInviteEmailData {
  to: string;
  inviterName: string;
  organizationName: string;
  inviteUrl: string;
  expiresAt: string;
}

export async function sendAdminInviteEmail(data: AdminInviteEmailData) {
  const { to, inviteUrl, expiresAt } = data;
  const inviterName = escapeHtml(data.inviterName);
  const organizationName = escapeHtml(data.organizationName);

  try {
    const client = getResendClient();
    const { data: emailData, error } = await client.emails.send({
      from: EMAIL_FROM.noreply,
      to: [to],
      subject: `You've been invited as an Admin to ${organizationName} on Siggly`,
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
          </head>
          <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
            <div style="background: linear-gradient(135deg, #4d52de 0%, #2563eb 100%); padding: 30px; border-radius: 12px 12px 0 0; text-align: center;">
              <h1 style="color: white; margin: 0; font-size: 24px;">Admin Invitation</h1>
            </div>
            
            <div style="background: #ffffff; padding: 30px; border: 1px solid #e5e7eb; border-top: none; border-radius: 0 0 12px 12px;">
              <p style="font-size: 16px; color: #374151; margin-top: 0;">Hi there,</p>
              
              <p style="font-size: 16px; color: #374151;">
                <strong>${inviterName}</strong> has invited you to join <strong>${organizationName}</strong> on Siggly as an <strong>Administrator</strong>.
              </p>
              
              <div style="background: #f0fdf4; border: 1px solid #bbf7d0; padding: 15px; border-radius: 8px; margin: 20px 0;">
                <p style="margin: 0; font-size: 14px; color: #166534;">
                  <strong>As an admin, you'll be able to:</strong>
                </p>
                <ul style="margin: 10px 0 0 0; padding-left: 20px; color: #166534; font-size: 14px;">
                  <li>Create and manage email signature templates</li>
                  <li>Deploy signatures to team members</li>
                  <li>Connect integrations (Google, Microsoft, HubSpot)</li>
                  <li>Manage team members and their profiles</li>
                </ul>
              </div>
              
              <p style="font-size: 16px; color: #374151;">
                Click the button below to set up your admin account:
              </p>
              
              <div style="text-align: center; margin: 30px 0;">
                <a href="${inviteUrl}" style="display: inline-block; background: linear-gradient(135deg, #4d52de 0%, #2563eb 100%); color: white; text-decoration: none; padding: 14px 32px; border-radius: 8px; font-weight: 600; font-size: 16px;">
                  Accept Admin Invitation
                </a>
              </div>
              
              <p style="font-size: 14px; color: #6b7280;">
                Or copy and paste this link into your browser:<br>
                <a href="${inviteUrl}" style="color: #4d52de; word-break: break-all;">${inviteUrl}</a>
              </p>
              
              <div style="margin-top: 20px; padding: 15px; background: #fef3c7; border-radius: 8px;">
                <p style="margin: 0; font-size: 14px; color: #92400e;">
                  <strong>Note:</strong> This invitation expires on ${new Date(expiresAt).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}.
                </p>
              </div>
              
              <p style="font-size: 14px; color: #6b7280; margin-top: 20px; margin-bottom: 0;">
                If you didn't expect this invitation, you can safely ignore this email.
              </p>
            </div>
            
            <div style="text-align: center; padding: 20px; color: #9ca3af; font-size: 12px;">
              <p style="margin: 5px 0;">
                <a href="https://siggly.io" style="color: #4d52de; text-decoration: none;">Visit Siggly</a> | 
                <a href="mailto:support@siggly.io" style="color: #4d52de; text-decoration: none;">Contact Support</a>
              </p>
            </div>
          </body>
        </html>
      `,
    });

    if (error) {
      console.error('Resend email error:', error);
      throw new Error(`Failed to send email: ${error.message}`);
    }

    return { success: true, emailId: emailData?.id };
  } catch (error) {
    console.error('Error sending admin invite email:', error);
    throw error;
  }
}

export async function sendTicketResponseEmail(data: TicketResponseEmailData) {
  const { to, ticketId, adminEmail, adminUserId, replyAs, isHtml } = data;
  const ticketType = escapeHtml(data.ticketType);
  const originalMessage = escapeHtml(data.originalMessage);
  // If content is HTML from the rich editor, sanitize but preserve formatting
  // Otherwise escape as plain text
  const responseMessage = isHtml
    ? sanitizeEmailHtml(data.responseMessage)
    : escapeHtml(data.responseMessage);
  const fromAddress = resolveReplyFrom(replyAs);

  // Render email signature: per-mailbox first, then admin's personal, then fallback
  let signatureHtml = '';
  const mailboxSig = await getMailboxSignature(replyAs);
  if (mailboxSig) {
    signatureHtml = `
      <div style="margin-top: 24px; padding-top: 16px; border-top: 1px solid #e5e7eb;">
        ${mailboxSig}
      </div>
    `;
  } else if (adminUserId) {
    const adminSig = await renderAdminSignature(adminUserId);
    if (adminSig) {
      signatureHtml = `
        <div style="margin-top: 24px; padding-top: 16px; border-top: 1px solid #e5e7eb;">
          ${adminSig}
        </div>
      `;
    }
  }

  // Fallback sign-off when no signature is available
  const fallbackSignOff = !signatureHtml
    ? `<p style="font-size: 16px; color: #374151; margin-bottom: 0;">Best regards,<br><strong>The Siggly Team</strong></p>`
    : '';

  try {
    const client = getResendClient();
    const { data: emailData, error } = await client.emails.send({
      from: fromAddress,
      to: [to],
      subject: `Re: [#${ticketId.slice(0, 8)}] Your ${ticketType} submission`,
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
          </head>
          <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
            <div style="background: #ffffff; padding: 0;">
              <div style="font-size: 15px; color: #374151; margin-top: 0;${isHtml ? '' : ' white-space: pre-wrap;'}">${responseMessage}</div>

              ${fallbackSignOff}
              ${signatureHtml}
            </div>

            <div style="margin-top: 32px; padding-top: 16px; border-top: 1px solid #e5e7eb;">
              <div style="background: #f3f4f6; border-left: 4px solid #4d52de; padding: 15px; border-radius: 4px;">
                <p style="margin: 0; color: #6b7280; font-size: 13px; font-weight: 600;">On ${new Date().toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' })}, you wrote:</p>
                <p style="margin: 8px 0 0 0; color: #6b7280; font-size: 13px; white-space: pre-wrap;">${originalMessage}</p>
              </div>
            </div>

            <div style="text-align: center; padding: 20px; color: #9ca3af; font-size: 11px;">
              <p style="margin: 5px 0;">Ticket #${ticketId.slice(0, 8)} &middot; <a href="https://siggly.io" style="color: #4d52de; text-decoration: none;">Siggly</a></p>
            </div>
          </body>
        </html>
      `,
      replyTo: replyAs || 'support@siggly.io',
    });

    if (error) {
      console.error('Resend email error:', error);
      throw new Error(`Failed to send email: ${error.message}`);
    }

    return { success: true, emailId: emailData?.id };
  } catch (error) {
    console.error('Error sending ticket response email:', error);
    throw error;
  }
}

// ============================================================
// Admin Ticket Notification
// ============================================================

export interface NewTicketNotificationData {
  ticketId: string;
  type: string;
  senderEmail: string;
  message: string;
  source: 'feedback_widget' | 'inbound_email' | 'contact_form';
}

/**
 * Send an auto-reply to the customer when a new ticket is created (if enabled).
 * Checks auto_responder_settings table. Optionally restricted to outside business hours.
 */
export async function sendAutoResponse(opts: {
  to: string;
  ticketId: string;
  inboxEmail: string | null;
}) {
  try {
    const { createClient: createSupabaseClient } = await import('@supabase/supabase-js');
    const supabase = createSupabaseClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    );

    const { data: settings } = await supabase
      .from('auto_responder_settings')
      .select('*')
      .limit(1)
      .single();

    if (!settings?.is_enabled) return;

    // Check business hours if restricted
    if (settings.only_outside_hours) {
      const tz = settings.business_timezone || 'America/New_York';
      const now = new Date();
      const formatter = new Intl.DateTimeFormat('en-US', {
        timeZone: tz,
        hour: 'numeric',
        minute: 'numeric',
        hour12: false,
      });
      const parts = formatter.formatToParts(now);
      const hour = parseInt(parts.find(p => p.type === 'hour')?.value || '0');
      const minute = parseInt(parts.find(p => p.type === 'minute')?.value || '0');
      const currentMinutes = hour * 60 + minute;

      const [startH, startM] = (settings.business_hours_start || '09:00').split(':').map(Number);
      const [endH, endM] = (settings.business_hours_end || '17:00').split(':').map(Number);
      const startMinutes = startH * 60 + startM;
      const endMinutes = endH * 60 + endM;

      // If within business hours, skip auto-response
      if (currentMinutes >= startMinutes && currentMinutes < endMinutes) return;
    }

    const fromAddress = resolveReplyFrom(opts.inboxEmail);
    const mailboxSig = await getMailboxSignature(opts.inboxEmail);
    const sigBlock = mailboxSig
      ? `<div style="margin-top: 24px; padding-top: 16px; border-top: 1px solid #e5e7eb;">${mailboxSig}</div>`
      : '';

    const subject = settings.subject || 'We received your message';
    const body = escapeHtml(settings.body || 'Thank you for reaching out. We\'ve received your message and will get back to you as soon as possible.');

    const client = getResendClient();
    await client.emails.send({
      from: fromAddress,
      to: [opts.to],
      subject: `${subject} [#${opts.ticketId.slice(0, 8)}]`,
      html: `
        <!DOCTYPE html>
        <html>
          <head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"></head>
          <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
            <div style="background: #ffffff; padding: 0;">
              <p style="font-size: 15px; color: #374151; white-space: pre-wrap; margin-top: 0;">${body}</p>
              ${sigBlock}
            </div>
            <div style="text-align: center; padding: 20px; color: #9ca3af; font-size: 11px;">
              <p style="margin: 5px 0;">Ticket #${opts.ticketId.slice(0, 8)} &middot; <a href="https://siggly.io" style="color: #4d52de; text-decoration: none;">Siggly</a></p>
            </div>
          </body>
        </html>
      `,
      replyTo: opts.inboxEmail || 'support@siggly.io',
    });
  } catch (error) {
    console.error('Auto-responder failed:', error);
  }
}

/**
 * Sends a notification email to all super admins when a new ticket arrives.
 * Queries the users table for is_super_admin = true to get email addresses.
 */
export async function notifyAdminsOfNewTicket(data: NewTicketNotificationData) {
  const { senderEmail, source } = data;
  const ticketId = escapeHtml(data.ticketId);
  const type = escapeHtml(data.type);
  const message = escapeHtml(data.message);

  // Look up admin emails from the database
  const { createClient: createSupabaseClient } = await import('@supabase/supabase-js');
  const supabase = createSupabaseClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );

  const { data: admins } = await supabase
    .from('users')
    .select('email')
    .eq('is_super_admin', true)
    .not('email', 'is', null);

  const adminEmails = admins?.map(a => a.email).filter(Boolean) || [];
  if (adminEmails.length === 0) return;

  const sourceLabel = source === 'inbound_email' ? 'Inbound Email'
    : source === 'contact_form' ? 'Contact Form'
    : 'Feedback Widget';

  const appUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://siggly.io';

  try {
    const client = getResendClient();
    await client.emails.send({
      from: EMAIL_FROM.support,
      to: adminEmails,
      subject: `[New Ticket] ${type} from ${senderEmail}`,
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
          </head>
          <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
            <div style="background: linear-gradient(135deg, #4d52de 0%, #2563eb 100%); padding: 30px; border-radius: 12px 12px 0 0; text-align: center;">
              <h1 style="color: white; margin: 0; font-size: 24px;">New Support Ticket</h1>
            </div>

            <div style="background: #ffffff; padding: 30px; border: 1px solid #e5e7eb; border-top: none; border-radius: 0 0 12px 12px;">
              <table style="width: 100%; border-collapse: collapse;">
                <tr>
                  <td style="padding: 10px 0; border-bottom: 1px solid #e5e7eb; font-weight: 600; width: 100px;">Type:</td>
                  <td style="padding: 10px 0; border-bottom: 1px solid #e5e7eb; text-transform: capitalize;">${type}</td>
                </tr>
                <tr>
                  <td style="padding: 10px 0; border-bottom: 1px solid #e5e7eb; font-weight: 600;">From:</td>
                  <td style="padding: 10px 0; border-bottom: 1px solid #e5e7eb;"><a href="mailto:${senderEmail}" style="color: #4d52de;">${senderEmail}</a></td>
                </tr>
                <tr>
                  <td style="padding: 10px 0; border-bottom: 1px solid #e5e7eb; font-weight: 600;">Source:</td>
                  <td style="padding: 10px 0; border-bottom: 1px solid #e5e7eb;">${sourceLabel}</td>
                </tr>
                <tr>
                  <td style="padding: 10px 0; border-bottom: 1px solid #e5e7eb; font-weight: 600;">Ticket:</td>
                  <td style="padding: 10px 0; border-bottom: 1px solid #e5e7eb;">#${ticketId.slice(0, 8)}</td>
                </tr>
              </table>

              <div style="margin-top: 20px;">
                <p style="font-weight: 600; margin-bottom: 10px;">Message:</p>
                <div style="background: #f3f4f6; padding: 15px; border-radius: 8px; white-space: pre-wrap; font-size: 14px;">${message}</div>
              </div>

              <div style="text-align: center; margin: 30px 0;">
                <a href="${appUrl}/admin/tickets" style="display: inline-block; background: linear-gradient(135deg, #4d52de 0%, #2563eb 100%); color: white; text-decoration: none; padding: 14px 32px; border-radius: 8px; font-weight: 600; font-size: 16px;">
                  View in Admin Panel
                </a>
              </div>
            </div>
          </body>
        </html>
      `,
    });
  } catch (error) {
    console.error('Failed to send admin notification:', error);
    throw error;
  }
}

// ============================================================
// Partner / MSP Email Functions
// ============================================================

export interface PartnerApplicationConfirmationEmailData {
  to: string;
  contactName: string;
  companyName: string;
}

export async function sendPartnerApplicationConfirmationEmail(data: PartnerApplicationConfirmationEmailData) {
  const { to } = data;
  const contactName = escapeHtml(data.contactName);
  const companyName = escapeHtml(data.companyName);

  try {
    const client = getResendClient();
    const { data: emailData, error } = await client.emails.send({
      from: EMAIL_FROM.sales,
      to: [to],
      subject: `We've received your MSP Partner application`,
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
          </head>
          <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
            <div style="background: linear-gradient(135deg, #4d52de 0%, #2563eb 100%); padding: 30px; border-radius: 12px 12px 0 0; text-align: center;">
              <h1 style="color: white; margin: 0; font-size: 24px;">Application Received</h1>
            </div>

            <div style="background: #ffffff; padding: 30px; border: 1px solid #e5e7eb; border-top: none; border-radius: 0 0 12px 12px;">
              <p style="font-size: 16px; color: #374151; margin-top: 0;">Hi ${contactName},</p>

              <p style="font-size: 16px; color: #374151;">
                Thank you for applying to become a Siggly MSP Partner! We've received your application for <strong>${companyName}</strong>.
              </p>

              <div style="background: #f0fdf4; border: 1px solid #bbf7d0; padding: 15px; border-radius: 8px; margin: 20px 0;">
                <p style="margin: 0; font-size: 14px; color: #166534;">
                  <strong>What happens next?</strong>
                </p>
                <ul style="margin: 10px 0 0 0; padding-left: 20px; color: #166534; font-size: 14px;">
                  <li>Our team will review your application within 2-3 business days</li>
                  <li>You'll receive an email once your application has been reviewed</li>
                  <li>If approved, you'll get access to your partner portal right away</li>
                </ul>
              </div>

              <p style="font-size: 16px; color: #374151;">
                In the meantime, if you have any questions about the partner program, don't hesitate to reach out.
              </p>

              <p style="font-size: 16px; color: #374151; margin-bottom: 0;">
                Best regards,<br><strong>The Siggly Team</strong>
              </p>
            </div>

            <div style="text-align: center; padding: 20px; color: #9ca3af; font-size: 12px;">
              <p style="margin: 5px 0;">
                <a href="https://siggly.io" style="color: #4d52de; text-decoration: none;">Visit Siggly</a> |
                <a href="mailto:support@siggly.io" style="color: #4d52de; text-decoration: none;">Contact Support</a>
              </p>
            </div>
          </body>
        </html>
      `,
    });

    if (error) {
      console.error('Resend email error:', error);
      throw new Error(`Failed to send email: ${error.message}`);
    }

    return { success: true, emailId: emailData?.id };
  } catch (error) {
    console.error('Error sending partner application confirmation email:', error);
    throw error;
  }
}

export interface PartnerApplicationTeamNotificationData {
  companyName: string;
  contactName: string;
  contactEmail: string;
  numberOfClients: number | null;
  primaryServices: string[];
  applicationId: string;
}

export async function sendPartnerApplicationTeamNotification(data: PartnerApplicationTeamNotificationData) {
  const { contactEmail, numberOfClients, primaryServices, applicationId } = data;
  const companyName = escapeHtml(data.companyName);
  const contactName = escapeHtml(data.contactName);

  try {
    const client = getResendClient();
    const appUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://siggly.io';
    const { data: emailData, error } = await client.emails.send({
      from: EMAIL_FROM.sales,
      to: ['sales@siggly.io'],
      replyTo: contactEmail,
      subject: `[New Partner Application] ${companyName}`,
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
          </head>
          <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
            <div style="background: linear-gradient(135deg, #4d52de 0%, #2563eb 100%); padding: 30px; border-radius: 12px 12px 0 0; text-align: center;">
              <h1 style="color: white; margin: 0; font-size: 24px;">New Partner Application</h1>
            </div>

            <div style="background: #ffffff; padding: 30px; border: 1px solid #e5e7eb; border-top: none; border-radius: 0 0 12px 12px;">
              <p style="font-size: 16px; color: #374151; margin-top: 0;">A new MSP partner application has been submitted.</p>

              <table style="width: 100%; border-collapse: collapse;">
                <tr>
                  <td style="padding: 10px 0; border-bottom: 1px solid #e5e7eb; font-weight: 600; width: 140px;">Company:</td>
                  <td style="padding: 10px 0; border-bottom: 1px solid #e5e7eb;">${companyName}</td>
                </tr>
                <tr>
                  <td style="padding: 10px 0; border-bottom: 1px solid #e5e7eb; font-weight: 600;">Contact:</td>
                  <td style="padding: 10px 0; border-bottom: 1px solid #e5e7eb;">${contactName}</td>
                </tr>
                <tr>
                  <td style="padding: 10px 0; border-bottom: 1px solid #e5e7eb; font-weight: 600;">Email:</td>
                  <td style="padding: 10px 0; border-bottom: 1px solid #e5e7eb;"><a href="mailto:${contactEmail}" style="color: #7c3aed;">${contactEmail}</a></td>
                </tr>
                ${numberOfClients ? `
                <tr>
                  <td style="padding: 10px 0; border-bottom: 1px solid #e5e7eb; font-weight: 600;">Clients:</td>
                  <td style="padding: 10px 0; border-bottom: 1px solid #e5e7eb;">${numberOfClients}</td>
                </tr>
                ` : ''}
                ${primaryServices.length > 0 ? `
                <tr>
                  <td style="padding: 10px 0; border-bottom: 1px solid #e5e7eb; font-weight: 600;">Services:</td>
                  <td style="padding: 10px 0; border-bottom: 1px solid #e5e7eb;">${primaryServices.map(s => escapeHtml(s)).join(', ')}</td>
                </tr>
                ` : ''}
              </table>

              <div style="text-align: center; margin: 30px 0;">
                <a href="${appUrl}/admin/partner-applications" style="display: inline-block; background: linear-gradient(135deg, #7c3aed 0%, #2563eb 100%); color: white; text-decoration: none; padding: 14px 32px; border-radius: 8px; font-weight: 600; font-size: 16px;">
                  Review Application
                </a>
              </div>

              <div style="margin-top: 20px; padding: 15px; background: #eff6ff; border-radius: 8px;">
                <p style="margin: 0; font-size: 14px; color: #1e40af;">
                  <strong>Quick Reply:</strong> Reply to this email to respond directly to ${contactName}.
                </p>
              </div>
            </div>
          </body>
        </html>
      `,
    });

    if (error) {
      console.error('Resend email error:', error);
      throw new Error(`Failed to send email: ${error.message}`);
    }

    return { success: true, emailId: emailData?.id };
  } catch (error) {
    console.error('Error sending partner application team notification:', error);
    throw error;
  }
}

export interface PartnerApprovalEmailData {
  to: string;
  contactName: string;
  companyName: string;
  portalUrl: string;
  partnerTier: string;
}

export async function sendPartnerApprovalEmail(data: PartnerApprovalEmailData) {
  const { to, portalUrl, partnerTier } = data;
  const contactName = escapeHtml(data.contactName);
  const companyName = escapeHtml(data.companyName);
  const tierLabel = escapeHtml(partnerTier.charAt(0).toUpperCase() + partnerTier.slice(1));
  const appUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://siggly.io';

  try {
    const client = getResendClient();
    const { data: emailData, error } = await client.emails.send({
      from: EMAIL_FROM.sales,
      to: [to],
      subject: `Welcome to the Siggly Partner Program!`,
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
          </head>
          <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
            <div style="background: linear-gradient(135deg, #4d52de 0%, #2563eb 100%); padding: 30px; border-radius: 12px 12px 0 0; text-align: center;">
              <h1 style="color: white; margin: 0; font-size: 24px;">Welcome, Partner!</h1>
            </div>

            <div style="background: #ffffff; padding: 30px; border: 1px solid #e5e7eb; border-top: none; border-radius: 0 0 12px 12px;">
              <p style="font-size: 16px; color: #374151; margin-top: 0;">Hi ${contactName},</p>

              <p style="font-size: 16px; color: #374151;">
                Great news! Your application for <strong>${companyName}</strong> has been approved. Welcome to the Siggly Partner Program as a <strong>${tierLabel} Partner</strong>.
              </p>

              <div style="background: #f0fdf4; border: 1px solid #bbf7d0; padding: 15px; border-radius: 8px; margin: 20px 0;">
                <p style="margin: 0; font-size: 14px; color: #166534;">
                  <strong>Your Partner Portal:</strong>
                  <a href="${portalUrl}" style="color: #166534; margin-left: 4px;">${portalUrl}</a>
                </p>
              </div>

              <div style="text-align: center; margin: 30px 0;">
                <a href="${appUrl}/login" style="display: inline-block; background: linear-gradient(135deg, #7c3aed 0%, #2563eb 100%); color: white; text-decoration: none; padding: 14px 32px; border-radius: 8px; font-weight: 600; font-size: 16px;">
                  Log In to Get Started
                </a>
              </div>

              <p style="font-size: 16px; color: #374151; font-weight: 600;">Next steps to get started:</p>

              <div style="margin: 15px 0;">
                <div style="display: flex; align-items: flex-start; margin-bottom: 12px;">
                  <div style="background: #7c3aed; color: white; border-radius: 50%; width: 24px; height: 24px; text-align: center; line-height: 24px; font-size: 12px; font-weight: 600; flex-shrink: 0; margin-right: 12px;">1</div>
                  <div>
                    <p style="margin: 0; font-size: 14px; color: #374151;"><strong>Set up your branding</strong> - Add your logo, colors, and company name to white-label the portal.</p>
                  </div>
                </div>
                <div style="display: flex; align-items: flex-start; margin-bottom: 12px;">
                  <div style="background: #7c3aed; color: white; border-radius: 50%; width: 24px; height: 24px; text-align: center; line-height: 24px; font-size: 12px; font-weight: 600; flex-shrink: 0; margin-right: 12px;">2</div>
                  <div>
                    <p style="margin: 0; font-size: 14px; color: #374151;"><strong>Add your first client</strong> - Create a client organization and invite their admin.</p>
                  </div>
                </div>
                <div style="display: flex; align-items: flex-start; margin-bottom: 12px;">
                  <div style="background: #7c3aed; color: white; border-radius: 50%; width: 24px; height: 24px; text-align: center; line-height: 24px; font-size: 12px; font-weight: 600; flex-shrink: 0; margin-right: 12px;">3</div>
                  <div>
                    <p style="margin: 0; font-size: 14px; color: #374151;"><strong>Explore billing</strong> - Review your partner margins and subscription overview.</p>
                  </div>
                </div>
              </div>

              <p style="font-size: 14px; color: #6b7280; margin-top: 20px; margin-bottom: 0;">
                Need help getting started? Reach out to us at <a href="mailto:support@siggly.io" style="color: #4d52de;">support@siggly.io</a> and we'll be happy to assist.
              </p>
            </div>

            <div style="text-align: center; padding: 20px; color: #9ca3af; font-size: 12px;">
              <p style="margin: 5px 0;">
                <a href="https://siggly.io" style="color: #4d52de; text-decoration: none;">Visit Siggly</a> |
                <a href="mailto:support@siggly.io" style="color: #4d52de; text-decoration: none;">Contact Support</a>
              </p>
            </div>
          </body>
        </html>
      `,
    });

    if (error) {
      console.error('Resend email error:', error);
      throw new Error(`Failed to send email: ${error.message}`);
    }

    return { success: true, emailId: emailData?.id };
  } catch (error) {
    console.error('Error sending partner approval email:', error);
    throw error;
  }
}

export interface PartnerRejectionEmailData {
  to: string;
  contactName: string;
  companyName: string;
}

export async function sendPartnerRejectionEmail(data: PartnerRejectionEmailData) {
  const { to } = data;
  const contactName = escapeHtml(data.contactName);
  const companyName = escapeHtml(data.companyName);

  try {
    const client = getResendClient();
    const { data: emailData, error } = await client.emails.send({
      from: EMAIL_FROM.sales,
      to: [to],
      subject: `Update on your Siggly Partner application`,
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
          </head>
          <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
            <div style="background: linear-gradient(135deg, #4d52de 0%, #2563eb 100%); padding: 30px; border-radius: 12px 12px 0 0; text-align: center;">
              <h1 style="color: white; margin: 0; font-size: 24px;">Application Update</h1>
            </div>

            <div style="background: #ffffff; padding: 30px; border: 1px solid #e5e7eb; border-top: none; border-radius: 0 0 12px 12px;">
              <p style="font-size: 16px; color: #374151; margin-top: 0;">Hi ${contactName},</p>

              <p style="font-size: 16px; color: #374151;">
                Thank you for your interest in the Siggly Partner Program and for submitting an application for <strong>${companyName}</strong>.
              </p>

              <p style="font-size: 16px; color: #374151;">
                After careful review, we're unable to approve your application at this time. This could be due to a variety of factors, and we encourage you to apply again in the future as our program evolves.
              </p>

              <div style="background: #eff6ff; border: 1px solid #bfdbfe; padding: 15px; border-radius: 8px; margin: 20px 0;">
                <p style="margin: 0; font-size: 14px; color: #1e40af;">
                  <strong>Questions?</strong> If you'd like to discuss this further or learn more about what we look for in partners, feel free to reach out to us at <a href="mailto:support@siggly.io" style="color: #7c3aed;">support@siggly.io</a>.
                </p>
              </div>

              <p style="font-size: 16px; color: #374151;">
                You're still welcome to use Siggly as a regular customer. We appreciate your interest and wish you all the best.
              </p>

              <p style="font-size: 16px; color: #374151; margin-bottom: 0;">
                Best regards,<br><strong>The Siggly Team</strong>
              </p>
            </div>

            <div style="text-align: center; padding: 20px; color: #9ca3af; font-size: 12px;">
              <p style="margin: 5px 0;">
                <a href="https://siggly.io" style="color: #4d52de; text-decoration: none;">Visit Siggly</a> |
                <a href="mailto:support@siggly.io" style="color: #4d52de; text-decoration: none;">Contact Support</a>
              </p>
            </div>
          </body>
        </html>
      `,
    });

    if (error) {
      console.error('Resend email error:', error);
      throw new Error(`Failed to send email: ${error.message}`);
    }

    return { success: true, emailId: emailData?.id };
  } catch (error) {
    console.error('Error sending partner rejection email:', error);
    throw error;
  }
}
