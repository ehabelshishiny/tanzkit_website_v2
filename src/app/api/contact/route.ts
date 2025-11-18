import { NextRequest, NextResponse } from 'next/server';
import { contactFormSchema } from '@/lib/validations/contact';
import { sendContactEmail, sendAutoReplyEmail } from '@/lib/email/nodemailer';
import { sendSlackNotification } from '@/lib/slack/webhook';
import { checkRateLimit } from '@/lib/rate-limit';

/**
 * POST /api/contact
 * Handle contact form submissions
 */
export async function POST(request: NextRequest) {
  try {
    // 1. Get IP address for rate limiting
    const ip = request.headers.get('x-forwarded-for') || 
               request.headers.get('x-real-ip') || 
               'unknown';

    // 2. Check rate limit
    const rateLimitResult = checkRateLimit(ip);
    if (!rateLimitResult.success) {
      const resetTime = rateLimitResult.resetTime 
        ? new Date(rateLimitResult.resetTime).toLocaleTimeString()
        : 'later';
      
      return NextResponse.json(
        { 
          error: `Too many requests. Please try again after ${resetTime}.`,
          resetTime: rateLimitResult.resetTime,
        },
        { status: 429 }
      );
    }

    // 3. Parse and validate request body
    const body = await request.json();

    // Validate with Zod schema
    const validationResult = contactFormSchema.safeParse(body);

    if (!validationResult.success) {
      return NextResponse.json(
        {
          error: 'Validation failed',
          details: validationResult.error.issues,
        },
        { status: 400 }
      );
    }

    const validatedData = validationResult.data;

    // 4. Additional CAPTCHA validation (honeypot should be empty)
    if (validatedData.honeypot && validatedData.honeypot.length > 0) {
      console.warn('Honeypot triggered for IP:', ip);
      return NextResponse.json(
        { error: 'Invalid submission' },
        { status: 400 }
      );
    }

    // 5. Send email notification to admin
    console.log('📧 Attempting to send admin email to:', process.env.SMTP_TO);
    try {
      await sendContactEmail(validatedData);
      console.log('✅ Admin email sent successfully to:', process.env.SMTP_TO);
    } catch (emailError) {
      console.error('❌ Admin email sending failed:', emailError);
      console.error('❌ Admin email error details:', emailError instanceof Error ? emailError.message : emailError);
      console.error('❌ Admin email error stack:', emailError instanceof Error ? emailError.stack : 'No stack trace');
      // Continue even if admin email fails
    }

    // 6. Send auto-reply email to user
    console.log('📧 Attempting to send auto-reply email to:', validatedData.email);
    try {
      await sendAutoReplyEmail(validatedData);
      console.log('✅ Auto-reply email sent successfully to:', validatedData.email);
    } catch (autoReplyError) {
      console.error('❌ Auto-reply email sending failed:', autoReplyError);
      console.error('❌ Auto-reply error details:', autoReplyError instanceof Error ? autoReplyError.message : autoReplyError);
      // Continue even if auto-reply fails
    }

    // 7. Send Slack notification
    console.log('💬 Attempting to send Slack notification...');
    try {
      await sendSlackNotification(validatedData);
      console.log('✅ Slack notification sent successfully');
    } catch (slackError) {
      console.error('❌ Slack notification failed:', slackError);
      console.error('❌ Slack error details:', slackError instanceof Error ? slackError.message : slackError);
      console.error('❌ Slack error stack:', slackError instanceof Error ? slackError.stack : 'No stack trace');
      // Continue even if Slack fails
    }

    // 8. Return success response
    return NextResponse.json(
      { 
        message: 'Form submitted successfully',
        remaining: rateLimitResult.remaining,
      },
      { status: 200 }
    );

  } catch (error) {
    console.error('❌ Contact form API error:', error);
    
    return NextResponse.json(
      { 
        error: 'Failed to submit form. Please try again later.',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}

/**
 * GET /api/contact
 * Return API information (optional)
 */
export async function GET() {
  return NextResponse.json({
    message: 'Contact Form API',
    version: '1.0.0',
    endpoints: {
      POST: '/api/contact - Submit contact form',
    },
  });
}

