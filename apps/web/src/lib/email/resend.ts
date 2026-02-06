import { Resend } from 'resend';

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

export interface TicketResponseEmailData {
  to: string;
  ticketId: string;
  ticketType: string;
  originalMessage: string;
  responseMessage: string;
  adminEmail: string;
}

export async function sendTicketResponseEmail(data: TicketResponseEmailData) {
  const { to, ticketId, ticketType, originalMessage, responseMessage, adminEmail } = data;

  try {
    const client = getResendClient();
    const { data: emailData, error } = await client.emails.send({
      from: 'Siggly Support <support@siggly.io>',
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
            <div style="background: linear-gradient(135deg, #7c3aed 0%, #2563eb 100%); padding: 30px; border-radius: 12px 12px 0 0; text-align: center;">
              <h1 style="color: white; margin: 0; font-size: 24px;">Siggly Support</h1>
            </div>
            
            <div style="background: #ffffff; padding: 30px; border: 1px solid #e5e7eb; border-top: none; border-radius: 0 0 12px 12px;">
              <p style="font-size: 16px; color: #374151; margin-top: 0;">Hi there,</p>
              
              <p style="font-size: 16px; color: #374151;">Thank you for reaching out to us. We've reviewed your ${ticketType} and wanted to respond:</p>
              
              <div style="background: #f3f4f6; border-left: 4px solid #7c3aed; padding: 15px; margin: 20px 0; border-radius: 4px;">
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
                <a href="https://siggly.io" style="color: #7c3aed; text-decoration: none;">Visit Siggly</a> | 
                <a href="mailto:support@siggly.io" style="color: #7c3aed; text-decoration: none;">Contact Support</a>
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
