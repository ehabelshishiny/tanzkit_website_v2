import { NextRequest, NextResponse } from 'next/server';
import { jobApplicationSchema, FILE_VALIDATION } from '@/lib/validations/job-application';
import { sendJobApplicationEmail, sendJobApplicationAutoReply } from '@/lib/email/job-application';
import { checkRateLimit } from '@/lib/rate-limit';

/**
 * POST /api/jobs/apply
 * Handle job application submissions with file attachments
 */
export async function POST(request: NextRequest) {
  try {
    // 1. Get IP address for rate limiting
    const ip = request.headers.get('x-forwarded-for') || 
               request.headers.get('x-real-ip') || 
               'unknown';

    // 2. Check rate limit (stricter for file uploads)
    const rateLimitResult = checkRateLimit(ip, 3, 3600000); // 3 applications per hour
    if (!rateLimitResult.success) {
      const resetTime = rateLimitResult.resetTime 
        ? new Date(rateLimitResult.resetTime).toLocaleTimeString()
        : 'later';
      
      return NextResponse.json(
        { 
          error: `Too many applications. Please try again after ${resetTime}.`,
          resetTime: rateLimitResult.resetTime,
        },
        { status: 429 }
      );
    }

    // 3. Parse FormData
    const formData = await request.formData();
    
    // Extract form fields
    const data = {
      name: formData.get('name') as string,
      email: formData.get('email') as string,
      phone: formData.get('phone') as string,
      jobSlug: formData.get('jobSlug') as string,
      jobTitle: formData.get('jobTitle') as string,
      coverLetter: formData.get('coverLetter') as string,
      linkedinUrl: formData.get('linkedinUrl') as string || '',
      portfolioUrl: formData.get('portfolioUrl') as string || '',
      honeypot: formData.get('honeypot') as string || '',
      notRobot: formData.get('notRobot') === 'true',
    };

    // Extract file
    const resumeFile = formData.get('resume') as File | null;
    const applicationEmail = formData.get('applicationEmail') as string || process.env.SMTP_TO;

    // 4. Validate form data
    const validationResult = jobApplicationSchema.safeParse(data);

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

    // 5. Validate honeypot
    if (validatedData.honeypot && validatedData.honeypot.length > 0) {
      console.warn('Honeypot triggered for IP:', ip);
      return NextResponse.json(
        { error: 'Invalid submission' },
        { status: 400 }
      );
    }

    // 6. Validate resume file
    if (!resumeFile) {
      return NextResponse.json(
        { error: 'Resume file is required' },
        { status: 400 }
      );
    }

    // Validate file size
    if (resumeFile.size > FILE_VALIDATION.MAX_FILE_SIZE) {
      return NextResponse.json(
        { error: 'File size exceeds 5MB limit' },
        { status: 400 }
      );
    }

    // Validate file type
    if (!FILE_VALIDATION.ALLOWED_TYPES.includes(resumeFile.type as any)) {
      return NextResponse.json(
        { error: 'Invalid file type. Only PDF, DOC, and DOCX files are allowed' },
        { status: 400 }
      );
    }

    // 7. Convert file to buffer for email attachment
    const arrayBuffer = await resumeFile.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const attachment = {
      filename: resumeFile.name,
      content: buffer,
      contentType: resumeFile.type,
    };

    // 8. Send email notification to admin/HR
    console.log('📧 Sending job application email to:', applicationEmail);
    try {
      await sendJobApplicationEmail(validatedData, attachment, applicationEmail);
      console.log('✅ Job application email sent successfully');
    } catch (emailError) {
      console.error('❌ Job application email failed:', emailError);
      // Continue even if admin email fails
    }

    // 9. Send auto-reply email to applicant
    console.log('📧 Sending auto-reply to applicant:', validatedData.email);
    try {
      await sendJobApplicationAutoReply(validatedData);
      console.log('✅ Auto-reply sent successfully');
    } catch (autoReplyError) {
      console.error('❌ Auto-reply failed:', autoReplyError);
      // Continue even if auto-reply fails
    }

    // 10. Return success response
    return NextResponse.json(
      { 
        message: 'Application submitted successfully',
        remaining: rateLimitResult.remaining,
      },
      { status: 200 }
    );

  } catch (error) {
    console.error('❌ Job application API error:', error);
    
    return NextResponse.json(
      { 
        error: 'Failed to submit application. Please try again later.',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json({ error: 'Method not allowed' }, { status: 405 });
}

