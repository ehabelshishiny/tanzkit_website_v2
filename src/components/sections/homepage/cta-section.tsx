'use client';

import { useTranslations } from 'next-intl';
import { Button } from '@/components/ui/button';
import { FadeIn } from '@/components/animations/fade-in';
import { TrialCTAButton } from '@/components/ui/trial-cta-button';
import { SectionContainer } from '@/components/layout/SectionContainer';
import { Typography } from '@/components/ui/typography';

export function CTASection() {
  const t = useTranslations('homepage.cta');
  const tCommon = useTranslations('common');

  return (
    <section className="py-16 md:py-24">
      <SectionContainer>
        <FadeIn>
          <div className="mx-auto max-w-2xl text-center">
            <Typography variant="h2" align="center" className="tracking-tight">
              {t('heading')}
            </Typography>
            <Typography variant="subtitle" align="center" className="mt-4 text-muted-foreground">
              {t('subtitle')}
            </Typography>
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
