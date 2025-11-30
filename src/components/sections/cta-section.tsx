'use client';

import { useTranslations } from 'next-intl';
import { Button } from '@/components/ui/button';
import { FadeIn } from '@/components/animations/fade-in';
import { TrialCTAButton } from '@/components/ui/trial-cta-button';
import { SectionContainer } from '@/components/layout/SectionContainer';

export function CTASection() {
  const t = useTranslations('cta');
  const tCommon = useTranslations('common');

  return (
    <section className="py-16 md:py-24">
      <SectionContainer>
        <FadeIn>
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              {t('heading')}
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              {t('subtitle')}
            </p>
            <div className="mt-8 flex items-center justify-center gap-4">
              <TrialCTAButton variant="secondary" size="lg" />
              <Button size="lg" variant="outline">
                {tCommon('bookDemo')}
              </Button>
            </div>
          </div>
        </FadeIn>
      </SectionContainer>
    </section>
  );
}