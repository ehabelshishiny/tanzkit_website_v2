'use client';

import { useTranslations } from 'next-intl';
import { Button } from '@/components/ui/button';
import { FadeIn } from '@/components/animations/fade-in';
import { TrialCTAButton } from '@/components/ui/trial-cta-button';

export function CTASection() {
  const t = useTranslations('common');

  return (
    <section className="py-16 md:py-24">
      <div className="container">
        <FadeIn>
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Ready to Transform Your Business?
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Join thousands of businesses already using Tranzkit to optimize their operations
            </p>
            <div className="mt-8 flex items-center justify-center gap-4">
              <TrialCTAButton variant="secondary" size="lg" />
              <Button size="lg" variant="outline">
                {t('bookDemo')}
              </Button>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

