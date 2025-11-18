import nodemailer from 'nodemailer';
import type { ContactFormData } from '@/lib/validations/contact';

/**
 * Create Nodemailer transporter with custom SMTP configuration
 * Supports fallback from port 587 (TLS) to port 465 (SSL)
 */
function createTransporter() {
  const config = {
    host: process.env.SMTP_HOST,
    port: parseInt(process.env.SMTP_PORT || '587'),
    secure: process.env.SMTP_SECURE === 'true', // true for 465, false for 587
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASSWORD,
    },
  };

  return nodemailer.createTransport(config);
}

/**
 * Generate professional HTML email template with Tranzkit branding
 */
function generateEmailTemplate(data: ContactFormData): string {
  const userTypeLabels: Record<string, string> = {
    enterprise: '🏢 Enterprise (Needs transportation for employees)',
    operator: '🚗 Operator (Has vehicles to offer)',
  };

  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>New Contact Form Submission</title>
</head>
<body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #f5f5f5;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f5f5f5; padding: 40px 20px;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
          <!-- Header -->
          <tr>
            <td style="background: linear-gradient(135deg, #1e40af 0%, #06b6d4 100%); padding: 30px; border-radius: 8px 8px 0 0; text-align: center;">
              <h1 style="margin: 0; color: #ffffff; font-size: 28px; font-weight: 700;">🎯 New Lead from Tranzkit Website</h1>
            </td>
          </tr>
          
          <!-- Content -->
          <tr>
            <td style="padding: 40px;">
              <h2 style="margin: 0 0 20px 0; color: #1e293b; font-size: 20px; font-weight: 600;">Contact Information</h2>
              
              <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom: 30px;">
                <tr>
                  <td style="padding: 12px 0; border-bottom: 1px solid #e2e8f0;">
                    <strong style="color: #475569; font-size: 14px;">Full Name:</strong>
                  </td>
                  <td style="padding: 12px 0; border-bottom: 1px solid #e2e8f0; text-align: right;">
                    <span style="color: #1e293b; font-size: 14px;">${data.name}</span>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 12px 0; border-bottom: 1px solid #e2e8f0;">
                    <strong style="color: #475569; font-size: 14px;">Email:</strong>
                  </td>
                  <td style="padding: 12px 0; border-bottom: 1px solid #e2e8f0; text-align: right;">
                    <a href="mailto:${data.email}" style="color: #0ea5e9; font-size: 14px; text-decoration: none;">${data.email}</a>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 12px 0; border-bottom: 1px solid #e2e8f0;">
                    <strong style="color: #475569; font-size: 14px;">Company:</strong>
                  </td>
                  <td style="padding: 12px 0; border-bottom: 1px solid #e2e8f0; text-align: right;">
                    <span style="color: #1e293b; font-size: 14px;">${data.company}</span>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 12px 0; border-bottom: 1px solid #e2e8f0;">
                    <strong style="color: #475569; font-size: 14px;">Phone:</strong>
                  </td>
                  <td style="padding: 12px 0; border-bottom: 1px solid #e2e8f0; text-align: right;">
                    <a href="tel:${data.phone}" style="color: #0ea5e9; font-size: 14px; text-decoration: none;">${data.phone}</a>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 12px 0; border-bottom: 1px solid #e2e8f0;">
                    <strong style="color: #475569; font-size: 14px;">User Type:</strong>
                  </td>
                  <td style="padding: 12px 0; border-bottom: 1px solid #e2e8f0; text-align: right;">
                    <span style="display: inline-block; background-color: #dbeafe; color: #1e40af; padding: 4px 12px; border-radius: 12px; font-size: 13px; font-weight: 600;">${userTypeLabels[data.userType] || data.userType}</span>
                  </td>
                </tr>
              </table>

              <h2 style="margin: 0 0 15px 0; color: #1e293b; font-size: 20px; font-weight: 600;">Message</h2>
              <div style="background-color: #f8fafc; border-left: 4px solid #0ea5e9; padding: 20px; border-radius: 4px; margin-bottom: 30px;">
                <p style="margin: 0; color: #334155; font-size: 15px; line-height: 1.6; white-space: pre-wrap;">${data.message}</p>
              </div>

              <p style="margin: 0; color: #64748b; font-size: 13px; text-align: center;">
                Submitted at: ${new Date().toLocaleString('en-US', { dateStyle: 'full', timeStyle: 'long' })}
              </p>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background-color: #f8fafc; padding: 20px; border-radius: 0 0 8px 8px; text-align: center; border-top: 1px solid #e2e8f0;">
              <p style="margin: 0; color: #64748b; font-size: 12px;">
                This email was sent from the Tranzkit website contact form.
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `.trim();
}

/**
 * Send contact form email notification to admin
 */
export async function sendContactEmail(data: ContactFormData): Promise<void> {
  console.log('📧 [sendContactEmail] Starting admin email send...');
  console.log('📧 [sendContactEmail] SMTP Config:', {
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    secure: process.env.SMTP_SECURE,
    from: process.env.SMTP_FROM,
    to: process.env.SMTP_TO,
  });

  const transporter = createTransporter();
  console.log('📧 [sendContactEmail] Transporter created');

  const userTypeLabel = data.userType === 'enterprise' ? 'Enterprise' : 'Operator';

  const mailOptions = {
    from: `"Tranzkit Website" <${process.env.SMTP_FROM}>`,
    to: process.env.SMTP_TO,
    subject: `🎯 New ${userTypeLabel} Lead: ${data.name} from ${data.company}`,
    html: generateEmailTemplate(data),
    text: `
New Contact Form Submission

Name: ${data.name}
Email: ${data.email}
Company: ${data.company}
Phone: ${data.phone}
User Type: ${userTypeLabel}

Message:
${data.message}

Submitted at: ${new Date().toLocaleString()}
    `.trim(),
  };

  console.log('📧 [sendContactEmail] Mail options prepared:', {
    from: mailOptions.from,
    to: mailOptions.to,
    subject: mailOptions.subject,
  });

  const result = await transporter.sendMail(mailOptions);
  console.log('📧 [sendContactEmail] Email sent successfully:', result);
}

/**
 * Generate auto-reply email template for user
 */
function generateAutoReplyTemplate(data: ContactFormData): string {
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Thank you for contacting Tranzkit</title>
</head>
<body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #f5f5f5;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f5f5f5; padding: 40px 20px;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
          <!-- Header -->
          <tr>
            <td style="background: linear-gradient(135deg, #1e40af 0%, #06b6d4 100%); padding: 30px; border-radius: 8px 8px 0 0; text-align: center;">
              <h1 style="margin: 0; color: #ffffff; font-size: 28px; font-weight: 700;">✅ Thank You for Contacting Tranzkit</h1>
            </td>
          </tr>

          <!-- Content -->
          <tr>
            <td style="padding: 40px;">
              <p style="margin: 0 0 20px 0; color: #1e293b; font-size: 16px; line-height: 1.6;">
                Dear ${data.name},
              </p>

              <p style="margin: 0 0 20px 0; color: #1e293b; font-size: 16px; line-height: 1.6;">
                Thank you for reaching out to us! We have received your message and our team will review it shortly.
              </p>

              <p style="margin: 0 0 30px 0; color: #1e293b; font-size: 16px; line-height: 1.6;">
                We typically respond within 24-48 hours during business days. If your inquiry is urgent, please feel free to call us directly.
              </p>

              <div style="background-color: #f8fafc; border-left: 4px solid #0ea5e9; padding: 20px; border-radius: 4px; margin-bottom: 30px;">
                <p style="margin: 0 0 10px 0; color: #475569; font-size: 14px; font-weight: 600;">Your Message Summary:</p>
                <p style="margin: 0; color: #64748b; font-size: 14px; line-height: 1.6;">
                  <strong>Company:</strong> ${data.company}<br>
                  <strong>Phone:</strong> ${data.phone}<br>
                  <strong>Type:</strong> ${data.userType === 'enterprise' ? 'Enterprise' : 'Operator'}
                </p>
              </div>

              <div style="text-align: center; margin: 30px 0;">
                <a href="${process.env.NEXT_PUBLIC_APP_URL || 'https://tranzkit.com'}" style="display: inline-block; background: linear-gradient(135deg, #1e40af 0%, #06b6d4 100%); color: #ffffff; text-decoration: none; padding: 14px 32px; border-radius: 6px; font-size: 16px; font-weight: 600;">Visit Our Website</a>
              </div>

              <p style="margin: 30px 0 0 0; color: #1e293b; font-size: 16px; line-height: 1.6;">
                Best regards,<br>
                <strong>The Tranzkit Team</strong>
              </p>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background-color: #f8fafc; padding: 30px; border-radius: 0 0 8px 8px; text-align: center; border-top: 1px solid #e2e8f0;">
              <p style="margin: 0 0 15px 0; color: #64748b; font-size: 14px; font-weight: 600;">
                Tranzkit - Smart Transportation Management
              </p>
              <p style="margin: 0 0 15px 0; color: #64748b; font-size: 13px;">
                📧 Email: ${process.env.SMTP_FROM}<br>
                🌐 Website: ${process.env.NEXT_PUBLIC_APP_URL || 'https://tranzkit.com'}
              </p>
              <p style="margin: 0; color: #94a3b8; font-size: 12px;">
                This is an automated response. Please do not reply to this email.
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `.trim();
}

/**
 * Send auto-reply email to user
 */
export async function sendAutoReplyEmail(data: ContactFormData): Promise<void> {
  console.log('📧 [sendAutoReplyEmail] Starting auto-reply email send...');
  console.log('📧 [sendAutoReplyEmail] Recipient:', data.email);

  const transporter = createTransporter();
  console.log('📧 [sendAutoReplyEmail] Transporter created');

  const mailOptions = {
    from: `"Tranzkit Team" <${process.env.SMTP_FROM}>`,
    to: data.email,
    subject: 'Thank you for contacting Tranzkit',
    html: generateAutoReplyTemplate(data),
    text: `
Dear ${data.name},

Thank you for reaching out to us! We have received your message and our team will review it shortly.

We typically respond within 24-48 hours during business days. If your inquiry is urgent, please feel free to call us directly.

Your Message Summary:
Company: ${data.company}
Phone: ${data.phone}
Type: ${data.userType === 'enterprise' ? 'Enterprise' : 'Operator'}

Best regards,
The Tranzkit Team

---
Tranzkit - Smart Transportation Management
Email: ${process.env.SMTP_FROM}
Website: ${process.env.NEXT_PUBLIC_APP_URL || 'https://tranzkit.com'}

This is an automated response. Please do not reply to this email.
    `.trim(),
  };

  console.log('📧 [sendAutoReplyEmail] Mail options prepared:', {
    from: mailOptions.from,
    to: mailOptions.to,
    subject: mailOptions.subject,
  });

  const result = await transporter.sendMail(mailOptions);
  console.log('📧 [sendAutoReplyEmail] Email sent successfully:', result);
}

