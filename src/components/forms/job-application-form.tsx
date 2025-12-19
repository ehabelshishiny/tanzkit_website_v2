'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Typography } from '@/components/ui/typography';
import { FadeIn } from '@/components/animations/fade-in';
import { jobApplicationSchema, type JobApplicationData, FILE_VALIDATION } from '@/lib/validations/job-application';
import { toast } from 'sonner';
import { Mail, User, Phone, FileText, Link as LinkIcon, Upload, X } from 'lucide-react';
import { useLocale } from 'next-intl';

interface JobApplicationFormProps {
  jobSlug: string;
  jobTitle: string;
  applicationEmail?: string;
  labels: {
    name: string;
    email: string;
    phone: string;
    coverLetter: string;
    resume: string;
    linkedinUrl: string;
    portfolioUrl: string;
    submit: string;
    submitting: string;
    captcha: string;
    successMessage: string;
    errorMessage: string;
    fileTooBig: string;
    invalidFileType: string;
    placeholders: {
      name: string;
      email: string;
      phone: string;
      coverLetter: string;
      linkedinUrl: string;
      portfolioUrl: string;
    };
  };
}

export function JobApplicationForm({ jobSlug, jobTitle, applicationEmail, labels }: JobApplicationFormProps) {
  const locale = useLocale();
  const isRTL = locale === 'ar';
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [resumeFile, setResumeFile] = useState<File | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<JobApplicationData>({
    resolver: zodResolver(jobApplicationSchema),
    defaultValues: {
      honeypot: '',
      notRobot: false,
      jobSlug,
      jobTitle,
    },
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file size
    if (file.size > FILE_VALIDATION.MAX_FILE_SIZE) {
      toast.error(labels.fileTooBig);
      e.target.value = '';
      return;
    }

    // Validate file type
    if (!FILE_VALIDATION.ALLOWED_TYPES.includes(file.type as any)) {
      toast.error(labels.invalidFileType);
      e.target.value = '';
      return;
    }

    setResumeFile(file);
  };

  const removeFile = () => {
    setResumeFile(null);
    const fileInput = document.getElementById('resume') as HTMLInputElement;
    if (fileInput) fileInput.value = '';
  };

  const onSubmit = async (data: JobApplicationData) => {
    try {
      // Create FormData to handle file upload
      const formData = new FormData();
      
      // Add all form fields
      Object.entries(data).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          formData.append(key, String(value));
        }
      });

      // Add resume file if present
      if (resumeFile) {
        formData.append('resume', resumeFile);
      }

      // Add application email if provided
      if (applicationEmail) {
        formData.append('applicationEmail', applicationEmail);
      }

      const response = await fetch('/api/jobs/apply', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Failed to submit application');
      }

      setHasSubmitted(true);
      toast.success(labels.successMessage);
      reset();
      setResumeFile(null);
    } catch (error) {
      console.error('Application submission error:', error);
      toast.error(error instanceof Error ? error.message : labels.errorMessage);
    }
  };

  if (hasSubmitted) {
    return (
      <FadeIn>
        <div className="text-center py-12">
          <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <Typography variant="h3" className="mb-2">
            {labels.successMessage}
          </Typography>
        </div>
      </FadeIn>
    );
  }

  return (
    <FadeIn>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Hidden fields */}
        <input type="hidden" {...register('jobSlug')} />
        <input type="hidden" {...register('jobTitle')} />
        <input type="text" {...register('honeypot')} className="hidden" tabIndex={-1} autoComplete="off" />

        {/* Name */}
        <div>
          <Typography variant="caption" as="label" htmlFor="name" className="block font-medium mb-2 flex items-center gap-2">
            <User className="w-4 h-4" />
            {labels.name} *
          </Typography>
          <Input
            id="name"
            {...register('name')}
            placeholder={labels.placeholders.name}
            disabled={isSubmitting}
            className={isRTL ? 'text-right' : ''}
            dir={isRTL ? 'rtl' : 'ltr'}
          />
          {errors.name && (
            <Typography variant="caption" className="mt-1 text-destructive">
              {errors.name.message}
            </Typography>
          )}
        </div>

        {/* Email */}
        <div>
          <Typography variant="caption" as="label" htmlFor="email" className="block font-medium mb-2 flex items-center gap-2">
            <Mail className="w-4 h-4" />
            {labels.email} *
          </Typography>
          <Input
            id="email"
            type="email"
            {...register('email')}
            placeholder={labels.placeholders.email}
            disabled={isSubmitting}
            className={isRTL ? 'text-right' : ''}
            dir={isRTL ? 'rtl' : 'ltr'}
          />
          {errors.email && (
            <Typography variant="caption" className="mt-1 text-destructive">
              {errors.email.message}
            </Typography>
          )}
        </div>

        {/* Phone */}
        <div>
          <Typography variant="caption" as="label" htmlFor="phone" className="block font-medium mb-2 flex items-center gap-2">
            <Phone className="w-4 h-4" />
            {labels.phone} *
          </Typography>
          <Input
            id="phone"
            type="tel"
            {...register('phone')}
            placeholder={labels.placeholders.phone}
            disabled={isSubmitting}
            className={isRTL ? 'text-right' : ''}
            dir={isRTL ? 'rtl' : 'ltr'}
          />
          {errors.phone && (
            <Typography variant="caption" className="mt-1 text-destructive">
              {errors.phone.message}
            </Typography>
          )}
        </div>

        {/* Resume Upload */}
        <div>
          <Typography variant="caption" as="label" htmlFor="resume" className="block font-medium mb-2 flex items-center gap-2">
            <Upload className="w-4 h-4" />
            {labels.resume} * (PDF, DOC, DOCX - Max 5MB)
          </Typography>
          {!resumeFile ? (
            <div className="relative">
              <Input
                id="resume"
                type="file"
                accept=".pdf,.doc,.docx"
                onChange={handleFileChange}
                disabled={isSubmitting}
                className="cursor-pointer"
              />
            </div>
          ) : (
            <div className="flex items-center gap-2 p-3 border rounded-lg bg-muted/30">
              <FileText className="w-5 h-5 text-primary" />
              <span className="flex-1 text-sm truncate">{resumeFile.name}</span>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={removeFile}
                disabled={isSubmitting}
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
          )}
        </div>

        {/* Cover Letter */}
        <div>
          <Typography variant="caption" as="label" htmlFor="coverLetter" className="block font-medium mb-2 flex items-center gap-2">
            <FileText className="w-4 h-4" />
            {labels.coverLetter} *
          </Typography>
          <Textarea
            id="coverLetter"
            {...register('coverLetter')}
            placeholder={labels.placeholders.coverLetter}
            rows={6}
            disabled={isSubmitting}
            className={isRTL ? 'text-right' : ''}
            dir={isRTL ? 'rtl' : 'ltr'}
          />
          {errors.coverLetter && (
            <Typography variant="caption" className="mt-1 text-destructive">
              {errors.coverLetter.message}
            </Typography>
          )}
        </div>

        {/* LinkedIn URL */}
        <div>
          <Typography variant="caption" as="label" htmlFor="linkedinUrl" className="block font-medium mb-2 flex items-center gap-2">
            <LinkIcon className="w-4 h-4" />
            {labels.linkedinUrl}
          </Typography>
          <Input
            id="linkedinUrl"
            type="url"
            {...register('linkedinUrl')}
            placeholder={labels.placeholders.linkedinUrl}
            disabled={isSubmitting}
            className={isRTL ? 'text-right' : ''}
            dir={isRTL ? 'rtl' : 'ltr'}
          />
          {errors.linkedinUrl && (
            <Typography variant="caption" className="mt-1 text-destructive">
              {errors.linkedinUrl.message}
            </Typography>
          )}
        </div>

        {/* Portfolio URL */}
        <div>
          <Typography variant="caption" as="label" htmlFor="portfolioUrl" className="block font-medium mb-2 flex items-center gap-2">
            <LinkIcon className="w-4 h-4" />
            {labels.portfolioUrl}
          </Typography>
          <Input
            id="portfolioUrl"
            type="url"
            {...register('portfolioUrl')}
            placeholder={labels.placeholders.portfolioUrl}
            disabled={isSubmitting}
            className={isRTL ? 'text-right' : ''}
            dir={isRTL ? 'rtl' : 'ltr'}
          />
          {errors.portfolioUrl && (
            <Typography variant="caption" className="mt-1 text-destructive">
              {errors.portfolioUrl.message}
            </Typography>
          )}
        </div>

        {/* CAPTCHA */}
        <div className="p-4 border rounded-lg bg-muted/30">
          <div className="flex items-start gap-3">
            <input
              id="notRobot"
              type="checkbox"
              {...register('notRobot')}
              disabled={isSubmitting}
              className="mt-1 h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
            />
            <Typography variant="caption" as="label" htmlFor="notRobot" className="font-medium cursor-pointer">
              ☑️ {labels.captcha} *
            </Typography>
          </div>
          {errors.notRobot && (
            <Typography variant="caption" className="mt-2 text-destructive">
              {errors.notRobot.message}
            </Typography>
          )}
        </div>

        {/* Submit Button */}
        <Button type="submit" size="lg" disabled={isSubmitting || !resumeFile} className="w-full">
          {isSubmitting ? labels.submitting : labels.submit}
        </Button>
      </form>
    </FadeIn>
  );
}

