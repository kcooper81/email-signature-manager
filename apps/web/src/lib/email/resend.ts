import { Resend } from 'resend';
import { escapeHtml } from '@/lib/utils';

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

export interface TicketResponseEmailData {
  to: string;
  ticketId: string;
  ticketType: string;
  originalMessage: string;
  responseMessage: string;
  adminEmail: string;
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
  const { to, ticketId, adminEmail } = data;
  const ticketType = escapeHtml(data.ticketType);
  const originalMessage = escapeHtml(data.originalMessage);
  const responseMessage = escapeHtml(data.responseMessage);

  try {
    const client = getResendClient();
    const { data: emailData, error } = await client.emails.send({
      from: EMAIL_FROM.support,
      to: [to],
      subject: `Re: Your ${ticketType} submission`,
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
          </head>
          <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
            <div style="background: linear-gradient(135deg, #4d52de 0%, #2563eb 100%); padding: 30px; border-radius: 12px 12px 0 0; text-align: center;">
              <h1 style="color: white; margin: 0; font-size: 24px;">Siggly Support</h1>
            </div>
            
            <div style="background: #ffffff; padding: 30px; border: 1px solid #e5e7eb; border-top: none; border-radius: 0 0 12px 12px;">
              <p style="font-size: 16px; color: #374151; margin-top: 0;">Hi there,</p>
              
              <p style="font-size: 16px; color: #374151;">Thank you for reaching out to us. We've reviewed your ${ticketType} and wanted to respond:</p>
              
              <div style="background: #f3f4f6; border-left: 4px solid #4d52de; padding: 15px; margin: 20px 0; border-radius: 4px;">
                <p style="margin: 0; color: #6b7280; font-size: 14px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px;">Your Original Message:</p>
                <p style="margin: 10px 0 0 0; color: #1f2937; white-space: pre-wrap;">${originalMessage}</p>
              </div>
              
              <div style="background: #eff6ff; border-left: 4px solid #2563eb; padding: 15px; margin: 20px 0; border-radius: 4px;">
                <p style="margin: 0; color: #1e40af; font-size: 14px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px;">Our Response:</p>
                <p style="margin: 10px 0 0 0; color: #1f2937; white-space: pre-wrap;">${responseMessage}</p>
              </div>
              
              <p style="font-size: 16px; color: #374151;">If you have any additional questions or concerns, please don't hesitate to reply to this email.</p>
              
              <p style="font-size: 16px; color: #374151; margin-bottom: 0;">Best regards,<br><strong>The Siggly Team</strong></p>
            </div>
            
            <div style="text-align: center; padding: 20px; color: #9ca3af; font-size: 12px;">
              <p style="margin: 5px 0;">This email was sent in response to ticket #${ticketId.slice(0, 8)}</p>
              <p style="margin: 5px 0;">
                <a href="https://siggly.io" style="color: #4d52de; text-decoration: none;">Visit Siggly</a> | 
                <a href="mailto:support@siggly.io" style="color: #4d52de; text-decoration: none;">Contact Support</a>
              </p>
            </div>
          </body>
        </html>
      `,
      replyTo: 'support@siggly.io',
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
