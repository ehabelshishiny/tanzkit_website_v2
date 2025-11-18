import * as z from 'zod';

/**
 * Validation schemas for forms
 * Using Zod for type-safe validation
 */

export const contactFormSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  company: z.string().min(2, 'Company name is required'),
  phone: z.string().regex(/^[\d\s\-\+\(\)]+$/, 'Invalid phone number format').min(1, 'Phone number is required'),
  userType: z.enum(['enterprise', 'operator'], {
    message: 'Please select a user type',
  }),
  message: z.string().min(10, 'Message must be at least 10 characters'),
  // CAPTCHA fields
  honeypot: z.string().max(0, 'Invalid submission'), // Should be empty (catches bots)
  notRobot: z.boolean().refine((val) => val === true, {
    message: 'Please confirm you are not a robot',
  }),
});

export const demoRequestSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  company: z.string().min(2, 'Company name is required'),
  phone: z.string().min(10, 'Valid phone number is required'),
  companySize: z.enum(['1-10', '11-50', '51-200', '201-500', '500+']),
  message: z.string().optional(),
});

export const freeTrialSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  company: z.string().min(2, 'Company name is required'),
  phone: z.string().min(10, 'Valid phone number is required'),
  agreeToTerms: z.boolean().refine((val) => val === true, {
    message: 'You must agree to the terms and conditions',
  }),
});

export type ContactFormData = z.infer<typeof contactFormSchema>;
export type DemoRequestData = z.infer<typeof demoRequestSchema>;
export type FreeTrialData = z.infer<typeof freeTrialSchema>;

