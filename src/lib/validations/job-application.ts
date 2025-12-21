import { z } from 'zod';

/**
 * Job Application Form Validation Schema
 */
export const jobApplicationSchema = z.object({
  // Personal Information
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  phone: z.string().regex(/^[\d\s\-\+\(\)]+$/, 'Invalid phone number format').min(1, 'Phone number is required'),
  
  // Application Details
  jobSlug: z.string().min(1, 'Job position is required'),
  jobTitle: z.string().min(1, 'Job title is required'),
  coverLetter: z.string().min(50, 'Cover letter must be at least 50 characters'),
  
  // LinkedIn/Portfolio (optional)
  linkedinUrl: z.string().url('Invalid URL').optional().or(z.literal('')),
  portfolioUrl: z.string().url('Invalid URL').optional().or(z.literal('')),
  
  // File attachments (handled separately via FormData)
  // resume and cv will be validated on the server side
  
  // CAPTCHA fields
  honeypot: z.string().max(0, 'Invalid submission'), // Should be empty (catches bots)
  notRobot: z.boolean().refine((val) => val === true, {
    message: 'Please confirm you are not a robot',
  }),
});

export type JobApplicationData = z.infer<typeof jobApplicationSchema>;

/**
 * File validation constants
 */
export const FILE_VALIDATION = {
  MAX_FILE_SIZE: 5 * 1024 * 1024, // 5MB
  ALLOWED_TYPES: [
    'application/pdf',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  ],
  ALLOWED_EXTENSIONS: ['.pdf', '.doc', '.docx'],
} as const;

