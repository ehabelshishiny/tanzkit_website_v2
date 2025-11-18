'use client';

import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { FadeIn } from '@/components/animations/fade-in';
import { contactFormSchema, type ContactFormData } from '@/lib/validations/contact';
import { toast } from 'sonner';
import { Mail, User, Building, Phone, MessageSquare, Users2 } from 'lucide-react';

export function ContactForm() {
  const searchParams = useSearchParams();
  const [hasSubmitted, setHasSubmitted] = useState(false);

  // Get pre-selected user type from URL query parameter
  const preSelectedType = searchParams.get('type') as 'enterprise' | 'operator' | null;

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    control,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      honeypot: '',
      userType: preSelectedType || undefined,
      notRobot: false,
    },
  });

  const onSubmit = async (data: ContactFormData) => {
    console.log('🚀 Form submission started');
    console.log('📝 Form data:', data);

    try {
      console.log('📤 Submitting to API...');

      // Submit to API
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      console.log('📥 API Response status:', response.status);

      if (!response.ok) {
        const error = await response.json();
        console.error('❌ API Error:', error);
        throw new Error(error.error || 'Failed to submit form');
      }

      const result = await response.json();
      console.log('✅ API Success:', result);

      // Mark as submitted (component state only - resets on page refresh)
      setHasSubmitted(true);

      // Success
      toast.success('Message sent successfully! We\'ll get back to you soon.');

      console.log('✅ Form submission complete');
    } catch (error) {
      console.error('❌ Form submission error:', error);
      toast.error(error instanceof Error ? error.message : 'Failed to send message. Please try again.');
    }
  };

  // If user has already submitted, show thank you message
  if (hasSubmitted) {
    return (
      <FadeIn>
        <div className="mx-auto max-w-2xl p-8 border rounded-lg bg-muted/30 text-center space-y-4">
          <div className="text-5xl">✅</div>
          <h3 className="text-2xl font-semibold">Thank You!</h3>
          <p className="text-muted-foreground">
            Thank you for your message. We have received your inquiry and will get back to you soon.
          </p>
          <p className="text-sm text-muted-foreground">
            If you need to send another message, please refresh the page.
          </p>
          <Button
            onClick={() => window.location.reload()}
            variant="outline"
            className="mt-4"
          >
            Refresh Page
          </Button>
        </div>
      </FadeIn>
    );
  }

  return (
    <FadeIn>
      <div className="mx-auto max-w-2xl">
        <div className="bg-card border border-border rounded-xl shadow-lg p-8 md:p-10">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Honeypot field - hidden from users, catches bots */}
        <input
          type="text"
          {...register('honeypot')}
          style={{ position: 'absolute', left: '-9999px', width: '1px', height: '1px' }}
          tabIndex={-1}
          autoComplete="off"
        />

        {/* Full Name */}
        <div>
          <label htmlFor="name" className="block text-sm font-medium mb-2 flex items-center gap-2">
            <User className="w-4 h-4" />
            Full Name *
          </label>
          <Input
            id="name"
            {...register('name')}
            placeholder="John Doe"
            disabled={isSubmitting}
          />
          {errors.name && (
            <p className="mt-1 text-sm text-destructive">{errors.name.message}</p>
          )}
        </div>

        {/* Email */}
        <div>
          <label htmlFor="email" className="block text-sm font-medium mb-2 flex items-center gap-2">
            <Mail className="w-4 h-4" />
            Email *
          </label>
          <Input
            id="email"
            type="email"
            {...register('email')}
            placeholder="john@company.com"
            disabled={isSubmitting}
          />
          {errors.email && (
            <p className="mt-1 text-sm text-destructive">{errors.email.message}</p>
          )}
        </div>

        {/* Company Name */}
        <div>
          <label htmlFor="company" className="block text-sm font-medium mb-2 flex items-center gap-2">
            <Building className="w-4 h-4" />
            Company Name *
          </label>
          <Input
            id="company"
            {...register('company')}
            placeholder="Your company name"
            disabled={isSubmitting}
          />
          {errors.company && (
            <p className="mt-1 text-sm text-destructive">{errors.company.message}</p>
          )}
        </div>

        {/* Phone Number */}
        <div>
          <label htmlFor="phone" className="block text-sm font-medium mb-2 flex items-center gap-2">
            <Phone className="w-4 h-4" />
            Phone Number *
          </label>
          <Input
            id="phone"
            type="tel"
            {...register('phone')}
            placeholder="+1 (555) 123-4567"
            disabled={isSubmitting}
          />
          {errors.phone && (
            <p className="mt-1 text-sm text-destructive">{errors.phone.message}</p>
          )}
        </div>

        {/* User Type */}
        <div>
          <label htmlFor="userType" className="block text-sm font-medium mb-2 flex items-center gap-2">
            <Users2 className="w-4 h-4" />
            I am a/an *
          </label>
          <Controller
            name="userType"
            control={control}
            render={({ field }) => (
              <Select
                onValueChange={field.onChange}
                value={field.value}
                disabled={isSubmitting}
              >
                <SelectTrigger id="userType">
                  <SelectValue placeholder="Select user type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="enterprise">
                    <div className="flex flex-col items-start">
                      <span className="font-medium">Enterprise</span>
                      <span className="text-xs text-slate-600 dark:text-slate-300">I need transportation for my employees</span>
                    </div>
                  </SelectItem>
                  <SelectItem value="operator">
                    <div className="flex flex-col items-start">
                      <span className="font-medium">Operator</span>
                      <span className="text-xs text-slate-600 dark:text-slate-300">I have vehicles to offer</span>
                    </div>
                  </SelectItem>
                </SelectContent>
              </Select>
            )}
          />
          {errors.userType && (
            <p className="mt-1 text-sm text-destructive">{errors.userType.message}</p>
          )}
        </div>

        {/* Message */}
        <div>
          <label htmlFor="message" className="block text-sm font-medium mb-2 flex items-center gap-2">
            <MessageSquare className="w-4 h-4" />
            Message *
          </label>
          <Textarea
            id="message"
            {...register('message')}
            placeholder="Tell us about your needs..."
            rows={5}
            disabled={isSubmitting}
          />
          {errors.message && (
            <p className="mt-1 text-sm text-destructive">{errors.message.message}</p>
          )}
        </div>

        {/* Checkbox CAPTCHA */}
        <div className="p-4 border rounded-lg bg-muted/30">
          <div className="flex items-start gap-3">
            <input
              id="notRobot"
              type="checkbox"
              {...register('notRobot')}
              disabled={isSubmitting}
              className="mt-1 h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
            />
            <label htmlFor="notRobot" className="text-sm font-medium cursor-pointer">
              ☑️ I'm not a robot *
            </label>
          </div>
          {errors.notRobot && (
            <p className="mt-2 text-sm text-destructive">{errors.notRobot.message}</p>
          )}
        </div>

        <Button type="submit" size="lg" disabled={isSubmitting} className="w-full">
          {isSubmitting ? 'Sending...' : 'Send Message'}
        </Button>
          </form>
        </div>
      </div>
    </FadeIn>
  );
}

