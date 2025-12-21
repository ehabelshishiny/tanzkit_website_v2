# Job Application System - Implementation Summary

## 🎯 Overview

Implemented a complete job application system with:
- ✅ Rich text job descriptions in Sanity CMS
- ✅ File upload support (Resume/CV)
- ✅ Email notifications with attachments
- ✅ Auto-reply emails to applicants
- ✅ Rate limiting for security
- ✅ Bilingual support (EN/AR)

---

## 📋 Schema Updates

### Enhanced `careerItem` Schema

**Location**: `sanity-studio/schemaTypes/objects/careerItem.ts`

**New Fields Added**:
1. **`fullDescription`** - Rich text editor for detailed job descriptions
2. **`slug`** - URL-friendly identifier for job postings
3. **`applicationEmail`** - Custom email per job (optional, defaults to site email)
4. **`isActive`** - Toggle to show/hide job postings
5. **`postedDate`** - When the job was posted
6. **`closingDate`** - Application deadline (optional)

**Existing Fields**:
- `title` - Job title (localized)
- `department` - Department (localized)
- `location` - Location (localized)
- `type` - Employment type (localized)
- `description` - Short description (localized)
- `applyUrl` - External application URL (optional)

---

## 🎨 Components Created

### 1. Job Application Form Component

**Location**: `src/components/forms/job-application-form.tsx`

**Features**:
- Personal information fields (name, email, phone)
- Resume/CV file upload (PDF, DOC, DOCX - max 5MB)
- Cover letter textarea
- LinkedIn and Portfolio URL fields (optional)
- Honeypot + checkbox CAPTCHA
- File validation (size and type)
- RTL support for Arabic
- Success/error toast notifications
- Form reset after successful submission

**Props**:
```typescript
interface JobApplicationFormProps {
  jobSlug: string;
  jobTitle: string;
  applicationEmail?: string;
  labels: {
    name, email, phone, coverLetter, resume,
    linkedinUrl, portfolioUrl, submit, submitting,
    captcha, successMessage, errorMessage,
    fileTooBig, invalidFileType,
    placeholders: { ... }
  };
}
```

---

## 🔧 Validation Schema

**Location**: `src/lib/validations/job-application.ts`

**Validation Rules**:
- Name: min 2 characters
- Email: valid email format
- Phone: valid phone number format
- Cover Letter: min 50 characters
- LinkedIn/Portfolio: valid URL (optional)
- File: PDF, DOC, DOCX only, max 5MB
- CAPTCHA: honeypot + checkbox validation

---

## 🚀 API Route

**Location**: `src/app/api/jobs/apply/route.ts`

**Features**:
- FormData parsing for file uploads
- Zod validation
- Rate limiting (3 applications per hour per IP)
- File validation (size, type)
- Email sending with attachments
- Auto-reply to applicants
- Error handling

**Endpoint**: `POST /api/jobs/apply`

**Request**: FormData with:
- Form fields (name, email, phone, etc.)
- Resume file
- Optional: applicationEmail

**Response**:
```json
{
  "message": "Application submitted successfully",
  "remaining": 2
}
```

---

## 📧 Email System

**Location**: `src/lib/email/job-application.ts`

### 1. Admin/HR Notification Email

**Features**:
- Beautiful HTML template
- Applicant information summary
- Cover letter display
- Resume attached as file
- LinkedIn/Portfolio links (if provided)
- Sent to `applicationEmail` or `SMTP_TO`

### 2. Applicant Auto-Reply Email

**Features**:
- Professional confirmation email
- Application timeline (5-7 business days)
- Next steps information
- Branded HTML template
- Sent to applicant's email

---

## 🔒 Security Features

1. **Rate Limiting**: 3 applications per hour per IP
2. **Honeypot Field**: Catches bots
3. **Checkbox CAPTCHA**: Human verification
4. **File Validation**: Type and size checks
5. **Zod Validation**: Server-side data validation
6. **CSRF Protection**: FormData submission

---

## 📊 Migration Updates

**Location**: `scripts/migrate-content.ts`

**Career Items Now Include**:
- Auto-generated slugs from job titles
- Full description (rich text blocks)
- `isActive: true` by default
- Posted date (current date)
- All localized fields

---

## 🎯 How to Use

### In Sanity Studio:

1. **Navigate to About Page** → Careers Section
2. **Edit a Job Opening**:
   - Fill in basic info (title, department, location, type)
   - Write short description (for listings)
   - Write full description using rich text editor
   - Set application email (optional)
   - Toggle `isActive` to show/hide
   - Set posted/closing dates

### On the Website:

1. **Create Job Detail Page** (e.g., `/careers/[slug]/page.tsx`):
   ```tsx
   import { JobApplicationForm } from '@/components/forms/job-application-form';
   
   export default function JobDetailPage({ params }) {
     // Fetch job from Sanity using params.slug
     // Render job details + application form
     
     return (
       <div>
         {/* Job details */}
         <JobApplicationForm
           jobSlug={job.slug.current}
           jobTitle={job.title[locale]}
           applicationEmail={job.applicationEmail}
           labels={t('careers.applicationForm')}
         />
       </div>
     );
   }
   ```

2. **Add Translation Keys** to `messages/en.json` and `messages/ar.json`:
   ```json
   {
     "careers": {
       "applicationForm": {
         "name": "Full Name",
         "email": "Email Address",
         "phone": "Phone Number",
         "resume": "Resume/CV",
         "coverLetter": "Cover Letter",
         "linkedinUrl": "LinkedIn Profile (Optional)",
         "portfolioUrl": "Portfolio URL (Optional)",
         "submit": "Submit Application",
         "submitting": "Submitting...",
         "captcha": "I am not a robot",
         "successMessage": "Application submitted successfully!",
         "errorMessage": "Failed to submit application",
         "fileTooBig": "File size exceeds 5MB limit",
         "invalidFileType": "Only PDF, DOC, and DOCX files are allowed",
         "placeholders": {
           "name": "John Doe",
           "email": "john@example.com",
           "phone": "+1 234 567 8900",
           "coverLetter": "Tell us why you're a great fit...",
           "linkedinUrl": "https://linkedin.com/in/yourprofile",
           "portfolioUrl": "https://yourportfolio.com"
         }
       }
     }
   }
   ```

---

## 🌐 Environment Variables Required

Already configured in `.env.local`:
- `SMTP_HOST` - SMTP server
- `SMTP_PORT` - SMTP port
- `SMTP_SECURE` - true/false
- `SMTP_USER` - SMTP username
- `SMTP_PASSWORD` - SMTP password
- `SMTP_FROM` - From email address
- `SMTP_TO` - Default recipient email (HR/admin)

---

## ✅ Testing Checklist

- [ ] Visit Sanity Studio and verify career items have new fields
- [ ] Create a job detail page with application form
- [ ] Test file upload (valid and invalid files)
- [ ] Test form validation (all fields)
- [ ] Submit an application and verify:
  - [ ] Admin receives email with resume attached
  - [ ] Applicant receives auto-reply email
  - [ ] Rate limiting works (try 4th application)
- [ ] Test in both English and Arabic
- [ ] Verify honeypot catches bots

---

## 🚀 Next Steps

1. **Create Job Detail Pages**: `/careers/[slug]/page.tsx`
2. **Add Translations**: Update `messages/en.json` and `messages/ar.json`
3. **Test Email System**: Submit test applications
4. **Customize Email Templates**: Update branding/content as needed
5. **Add Analytics**: Track application submissions

---

## 📝 Notes

- Resume files are sent as email attachments (not stored in Sanity)
- For file storage, consider adding Sanity asset upload or cloud storage
- Rate limiting is in-memory (resets on server restart)
- For production, consider Redis for rate limiting
- External apply URLs override the built-in form

