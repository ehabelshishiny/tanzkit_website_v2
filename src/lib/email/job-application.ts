import nodemailer from 'nodemailer';
import type { JobApplicationData } from '@/lib/validations/job-application';

/**
 * Create Nodemailer transporter
 */
function createTransporter() {
  const config = {
    host: process.env.SMTP_HOST,
    port: parseInt(process.env.SMTP_PORT || '587'),
    secure: process.env.SMTP_SECURE === 'true',
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASSWORD,
    },
  };

  return nodemailer.createTransport(config);
}

interface EmailAttachment {
  filename: string;
  content: Buffer;
  contentType: string;
}

/**
 * Send job application email to HR/admin with resume attachment
 */
export async function sendJobApplicationEmail(
  data: JobApplicationData,
  attachment: EmailAttachment,
  recipientEmail?: string
): Promise<void> {
  console.log('📧 [sendJobApplicationEmail] Starting...');
  
  const transporter = createTransporter();
  const toEmail = recipientEmail || process.env.SMTP_TO;

  const mailOptions = {
    from: `"Tranzkit Careers" <${process.env.SMTP_FROM}>`,
    to: toEmail,
    subject: `🎯 New Job Application: ${data.jobTitle} - ${data.name}`,
    html: generateApplicationEmailTemplate(data),
    text: `
New Job Application

Position: ${data.jobTitle}
Applicant: ${data.name}
Email: ${data.email}
Phone: ${data.phone}

${data.linkedinUrl ? `LinkedIn: ${data.linkedinUrl}` : ''}
${data.portfolioUrl ? `Portfolio: ${data.portfolioUrl}` : ''}

Cover Letter:
${data.coverLetter}

Resume attached: ${attachment.filename}

Submitted at: ${new Date().toLocaleString()}
    `.trim(),
    attachments: [
      {
        filename: attachment.filename,
        content: attachment.content,
        contentType: attachment.contentType,
      },
    ],
  };

  console.log('📧 [sendJobApplicationEmail] Sending to:', toEmail);
  const result = await transporter.sendMail(mailOptions);
  console.log('📧 [sendJobApplicationEmail] Email sent:', result);
}

/**
 * Generate HTML email template for job application
 */
function generateApplicationEmailTemplate(data: JobApplicationData): string {
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>New Job Application</title>
</head>
<body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #f8fafc;">
  <table role="presentation" style="width: 100%; border-collapse: collapse;">
    <tr>
      <td align="center" style="padding: 40px 20px;">
        <table role="presentation" style="max-width: 600px; width: 100%; background-color: #ffffff; border-radius: 12px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
          
          <!-- Header -->
          <tr>
            <td style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 40px 30px; border-radius: 12px 12px 0 0; text-align: center;">
              <h1 style="margin: 0; color: #ffffff; font-size: 28px; font-weight: 700;">
                🎯 New Job Application
              </h1>
              <p style="margin: 10px 0 0 0; color: #e0e7ff; font-size: 16px;">
                ${data.jobTitle}
              </p>
            </td>
          </tr>

          <!-- Content -->
          <tr>
            <td style="padding: 40px 30px;">
              
              <!-- Applicant Info -->
              <div style="background-color: #f8fafc; padding: 20px; border-radius: 8px; margin-bottom: 30px;">
                <h2 style="margin: 0 0 15px 0; color: #1e293b; font-size: 18px; font-weight: 600;">
                  👤 Applicant Information
                </h2>
                <table style="width: 100%; border-collapse: collapse;">
                  <tr>
                    <td style="padding: 8px 0; color: #64748b; font-size: 14px; font-weight: 600;">Name:</td>
                    <td style="padding: 8px 0; color: #1e293b; font-size: 14px;">${data.name}</td>
                  </tr>
                  <tr>
                    <td style="padding: 8px 0; color: #64748b; font-size: 14px; font-weight: 600;">Email:</td>
                    <td style="padding: 8px 0;"><a href="mailto:${data.email}" style="color: #667eea; text-decoration: none;">${data.email}</a></td>
                  </tr>
                  <tr>
                    <td style="padding: 8px 0; color: #64748b; font-size: 14px; font-weight: 600;">Phone:</td>
                    <td style="padding: 8px 0;"><a href="tel:${data.phone}" style="color: #667eea; text-decoration: none;">${data.phone}</a></td>
                  </tr>
                  ${data.linkedinUrl ? `
                  <tr>
                    <td style="padding: 8px 0; color: #64748b; font-size: 14px; font-weight: 600;">LinkedIn:</td>
                    <td style="padding: 8px 0;"><a href="${data.linkedinUrl}" style="color: #667eea; text-decoration: none;" target="_blank">View Profile</a></td>
                  </tr>
                  ` : ''}
                  ${data.portfolioUrl ? `
                  <tr>
                    <td style="padding: 8px 0; color: #64748b; font-size: 14px; font-weight: 600;">Portfolio:</td>
                    <td style="padding: 8px 0;"><a href="${data.portfolioUrl}" style="color: #667eea; text-decoration: none;" target="_blank">View Portfolio</a></td>
                  </tr>
                  ` : ''}
                </table>
              </div>

              <!-- Cover Letter -->
              <div style="margin-bottom: 30px;">
                <h2 style="margin: 0 0 15px 0; color: #1e293b; font-size: 18px; font-weight: 600;">
                  📝 Cover Letter
                </h2>
                <div style="background-color: #f8fafc; padding: 20px; border-radius: 8px; border-left: 4px solid #667eea;">
                  <p style="margin: 0; color: #475569; font-size: 14px; line-height: 1.6; white-space: pre-wrap;">${data.coverLetter}</p>
                </div>
              </div>

              <!-- Resume Attachment -->
              <div style="background-color: #ecfdf5; padding: 15px 20px; border-radius: 8px; border-left: 4px solid #10b981;">
                <p style="margin: 0; color: #065f46; font-size: 14px; font-weight: 600;">
                  📎 Resume attached to this email
                </p>
              </div>

            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background-color: #f8fafc; padding: 30px; border-radius: 0 0 12px 12px; text-align: center; border-top: 1px solid #e2e8f0;">
              <p style="margin: 0 0 10px 0; color: #64748b; font-size: 12px;">
                Submitted on ${new Date().toLocaleString('en-US', { dateStyle: 'full', timeStyle: 'short' })}
              </p>
              <p style="margin: 0; color: #94a3b8; font-size: 12px;">
                Tranzkit Careers - Automated Application System
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
 * Send auto-reply email to job applicant
 */
export async function sendJobApplicationAutoReply(data: JobApplicationData): Promise<void> {
  console.log('📧 [sendJobApplicationAutoReply] Starting...');

  const transporter = createTransporter();

  const mailOptions = {
    from: `"Tranzkit Careers Team" <${process.env.SMTP_FROM}>`,
    to: data.email,
    subject: `Application Received: ${data.jobTitle}`,
    html: generateAutoReplyTemplate(data),
    text: `
Dear ${data.name},

Thank you for applying for the ${data.jobTitle} position at Tranzkit!

We have successfully received your application and resume. Our hiring team will carefully review your qualifications and experience.

What happens next:
• Our team will review your application within 5-7 business days
• If your profile matches our requirements, we'll contact you for the next steps
• Please keep an eye on your email (including spam folder) for updates

We appreciate your interest in joining Tranzkit and wish you the best in the application process.

Best regards,
The Tranzkit Careers Team

---
Tranzkit - Smart Transportation Management
Email: ${process.env.SMTP_FROM}
Website: ${process.env.NEXT_PUBLIC_APP_URL || 'https://tranzkit.com'}

This is an automated response. Please do not reply to this email.
    `.trim(),
  };

  console.log('📧 [sendJobApplicationAutoReply] Sending to:', data.email);
  const result = await transporter.sendMail(mailOptions);
  console.log('📧 [sendJobApplicationAutoReply] Email sent:', result);
}

/**
 * Generate HTML auto-reply template
 */
function generateAutoReplyTemplate(data: JobApplicationData): string {
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Application Received</title>
</head>
<body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #f8fafc;">
  <table role="presentation" style="width: 100%; border-collapse: collapse;">
    <tr>
      <td align="center" style="padding: 40px 20px;">
        <table role="presentation" style="max-width: 600px; width: 100%; background-color: #ffffff; border-radius: 12px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">

          <!-- Header -->
          <tr>
            <td style="background: linear-gradient(135deg, #10b981 0%, #059669 100%); padding: 40px 30px; border-radius: 12px 12px 0 0; text-align: center;">
              <div style="width: 60px; height: 60px; background-color: rgba(255, 255, 255, 0.2); border-radius: 50%; display: inline-flex; align-items: center; justify-content: center; margin-bottom: 20px;">
                <span style="font-size: 30px;">✅</span>
              </div>
              <h1 style="margin: 0; color: #ffffff; font-size: 28px; font-weight: 700;">
                Application Received!
              </h1>
              <p style="margin: 10px 0 0 0; color: #d1fae5; font-size: 16px;">
                Thank you for applying to Tranzkit
              </p>
            </td>
          </tr>

          <!-- Content -->
          <tr>
            <td style="padding: 40px 30px;">

              <p style="margin: 0 0 20px 0; color: #1e293b; font-size: 16px; line-height: 1.6;">
                Dear <strong>${data.name}</strong>,
              </p>

              <p style="margin: 0 0 20px 0; color: #475569; font-size: 15px; line-height: 1.6;">
                Thank you for applying for the <strong>${data.jobTitle}</strong> position at Tranzkit! We have successfully received your application and resume.
              </p>

              <!-- Next Steps -->
              <div style="background-color: #f0f9ff; padding: 25px; border-radius: 8px; border-left: 4px solid #0ea5e9; margin: 30px 0;">
                <h2 style="margin: 0 0 15px 0; color: #0c4a6e; font-size: 18px; font-weight: 600;">
                  📋 What Happens Next
                </h2>
                <ul style="margin: 0; padding-left: 20px; color: #475569; font-size: 14px; line-height: 1.8;">
                  <li>Our hiring team will review your application within <strong>5-7 business days</strong></li>
                  <li>If your profile matches our requirements, we'll contact you for the next steps</li>
                  <li>Please keep an eye on your email (including spam folder) for updates</li>
                </ul>
              </div>

              <p style="margin: 0 0 20px 0; color: #475569; font-size: 15px; line-height: 1.6;">
                We appreciate your interest in joining Tranzkit and wish you the best in the application process.
              </p>

              <p style="margin: 0; color: #1e293b; font-size: 15px; line-height: 1.6;">
                Best regards,<br>
                <strong>The Tranzkit Careers Team</strong>
              </p>

            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background-color: #f8fafc; padding: 30px; border-radius: 0 0 12px 12px; text-align: center; border-top: 1px solid #e2e8f0;">
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

