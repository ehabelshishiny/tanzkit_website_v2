'use client';

import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Typography } from '@/components/ui/typography';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { FadeIn } from '@/components/animations/fade-in';
import { contactFormSchema, type ContactFormData } from '@/lib/validations/contact';
import { toast } from 'sonner';
import { Mail, User, Building, Phone, MessageSquare, Users2 } from 'lucide-react';
import { useTranslations, useLocale } from 'next-intl';

export function ContactForm() {
  const t = useTranslations('contact.form');
  const locale = useLocale();
  const isRTL = locale === 'ar';
  const searchParams = useSearchParams();
  const [hasSubmitted, setHasSubmitted] = useState(false);

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

      setHasSubmitted(true);
      toast.success(t('success.message'));

      console.log('✅ Form submission complete');
    } catch (error) {
      console.error('❌ Form submission error:', error);
      toast.error(error instanceof Error ? error.message : 'Failed to send message. Please try again.');
    }
  };

  if (hasSubmitted) {
    return (
      <FadeIn>
        <div className="mx-auto max-w-2xl p-8 border rounded-lg bg-muted/30 text-center space-y-4">
          <div className="text-5xl">✅</div>
          <Typography variant="h3" align="center">
            {t('success.title')}
          </Typography>
          <Typography variant="body" align="center" className="text-muted-foreground">
            {t('success.message')}
          </Typography>
          <Typography variant="caption" align="center" className="text-muted-foreground">
            {t('success.note')}
          </Typography>
          <Button
            onClick={() => window.location.reload()}
            variant="outline"
            className="mt-4"
          >
            {t('success.refresh')}
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
            <input
              type="text"
              {...register('honeypot')}
              style={{ position: 'absolute', left: '-9999px', width: '1px', height: '1px' }}
              tabIndex={-1}
              autoComplete="off"
            />

            <div>
              <Typography variant="caption" as="label" htmlFor="name" className="block font-medium mb-2 flex items-center gap-2">
                <User className="w-4 h-4" />
                {t('labels.name')} *
              </Typography>
              <Input
                id="name"
                {...register('name')}
                placeholder={t('placeholders.name')}
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

            <div>
              <Typography variant="caption" as="label" htmlFor="email" className="block font-medium mb-2 flex items-center gap-2">
                <Mail className="w-4 h-4" />
                {t('labels.email')} *
              </Typography>
              <Input
                id="email"
                type="email"
                {...register('email')}
                placeholder={t('placeholders.email')}
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

            <div>
              <Typography variant="caption" as="label" htmlFor="company" className="block font-medium mb-2 flex items-center gap-2">
                <Building className="w-4 h-4" />
                {t('labels.company')} *
              </Typography>
              <Input
                id="company"
                {...register('company')}
                placeholder={t('placeholders.company')}
                disabled={isSubmitting}
                className={isRTL ? 'text-right' : ''}
                dir={isRTL ? 'rtl' : 'ltr'}
              />
              {errors.company && (
                <Typography variant="caption" className="mt-1 text-destructive">
                  {errors.company.message}
                </Typography>
              )}
            </div>

            <div>
              <Typography variant="caption" as="label" htmlFor="phone" className="block font-medium mb-2 flex items-center gap-2">
                <Phone className="w-4 h-4" />
                {t('labels.phone')} *
              </Typography>
              <Input
                id="phone"
                type="tel"
                {...register('phone')}
                placeholder={t('placeholders.phone')}
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

            <div>
              <Typography variant="caption" as="label" htmlFor="userType" className="block font-medium mb-2 flex items-center gap-2">
                <Users2 className="w-4 h-4" />
                {t('labels.userType')} *
              </Typography>
              <Controller
                name="userType"
                control={control}
                render={({ field }) => (
                  <Select
                    onValueChange={field.onChange}
                    value={field.value}
                    disabled={isSubmitting}
                  >
                    <SelectTrigger id="userType" className={isRTL ? 'text-right' : ''} dir={isRTL ? 'rtl' : 'ltr'}>
                      <SelectValue placeholder={t('placeholders.userType')} />
                    </SelectTrigger>
                    <SelectContent className={isRTL ? 'text-right' : ''} dir={isRTL ? 'rtl' : 'ltr'}>
                      <SelectItem value="enterprise">
                        <div className={`flex flex-col ${isRTL ? 'items-end' : 'items-start'}`}>
                          <Typography variant="caption" className="font-medium">
                            {t('userTypes.enterprise.label')}
                          </Typography>
                          <Typography variant="caption" className="text-xs text-slate-600 dark:text-slate-100">
                            {t('userTypes.enterprise.description')}
                          </Typography>
                        </div>
                      </SelectItem>
                      <SelectItem value="operator">
                        <div className={`flex flex-col ${isRTL ? 'items-end' : 'items-start'}`}>
                          <Typography variant="caption" className="font-medium">
                            {t('userTypes.operator.label')}
                          </Typography>
                          <Typography variant="caption" className="text-xs text-slate-600 dark:text-slate-100">
                            {t('userTypes.operator.description')}
                          </Typography>
                        </div>
                      </SelectItem>
                    </SelectContent>
                  </Select>
                )}
              />
              {errors.userType && (
                <Typography variant="caption" className="mt-1 text-destructive">
                  {errors.userType.message}
                </Typography>
              )}
            </div>

            <div>
              <Typography variant="caption" as="label" htmlFor="message" className="block font-medium mb-2 flex items-center gap-2">
                <MessageSquare className="w-4 h-4" />
                {t('labels.message')} *
              </Typography>
              <Textarea
                id="message"
                {...register('message')}
                placeholder={t('placeholders.message')}
                rows={5}
                disabled={isSubmitting}
                className={isRTL ? 'text-right' : ''}
                dir={isRTL ? 'rtl' : 'ltr'}
              />
              {errors.message && (
                <Typography variant="caption" className="mt-1 text-destructive">
                  {errors.message.message}
                </Typography>
              )}
            </div>

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
                  ☑️ {t('captcha')} *
                </Typography>
              </div>
              {errors.notRobot && (
                <Typography variant="caption" className="mt-2 text-destructive">
                  {errors.notRobot.message}
                </Typography>
              )}
            </div>

            <Button type="submit" size="lg" disabled={isSubmitting} className="w-full">
              {isSubmitting ? t('submitting') : t('submit')}
            </Button>
          </form>
        </div>
      </div>
    </FadeIn>
  );
}
