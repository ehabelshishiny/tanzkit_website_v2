'use client';

import { useTranslations } from 'next-intl';
import { FadeIn } from '@/components/animations/fade-in';

export function LogoBarSection() {
  const t = useTranslations('logoBar');

  // Placeholder for partner logos
  const partners = ['Partner 1', 'Partner 2', 'Partner 3', 'Partner 4', 'Partner 5'];

  return (
    <section className="py-16 md:py-24">
      <div className="container">
        <FadeIn>
          <div className="text-center mb-12">
            <h2 className="text-2xl font-semibold mb-4">{t('heading')}</h2>
            <p className="text-muted-foreground">
              {t('subtitle')}
            </p>
          </div>
        </FadeIn>

        <div className="flex flex-wrap items-center justify-center gap-8 md:gap-12">
          {partners.map((partner, index) => (
            <FadeIn key={partner} delay={0.1 * (index + 1)}>
              <div className="flex h-16 w-32 items-center justify-center rounded-lg bg-muted">
                <span className="text-sm font-medium text-muted-foreground">
                  {partner}
                </span>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}