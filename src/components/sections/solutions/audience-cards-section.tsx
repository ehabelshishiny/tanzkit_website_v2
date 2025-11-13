'use client';

import { useTranslations, useLocale } from 'next-intl';
import { SectionContainer } from '@/components/ui/section-container';
import { AudienceCard } from '@/components/ui/audience-card';

export function AudienceCardsSection() {
  const t = useTranslations('solutions.main.audienceCards');
  const locale = useLocale();

  const operatorsBenefits = [
    t('operators.benefits.0'),
    t('operators.benefits.1'),
    t('operators.benefits.2'),
    t('operators.benefits.3')
  ];

  const enterprisesBenefits = [
    t('enterprises.benefits.0'),
    t('enterprises.benefits.1'),
    t('enterprises.benefits.2'),
    t('enterprises.benefits.3')
  ];

  return (
    <SectionContainer
      background="gradient"
      padding="xl"
      maxWidth="2xl"
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Operators & Drivers Card */}
        <AudienceCard
          title={t('operators.headline')}
          description={t('operators.description')}
          benefits={operatorsBenefits}
          ctaText={t('operators.cta')}
          ctaLink={`/${locale}/solutions/operators-drivers`}
          gradient="linear-gradient(135deg, #3b82f6, #2563eb)"
        />

        {/* Enterprises & Passengers Card */}
        <AudienceCard
          title={t('enterprises.headline')}
          description={t('enterprises.description')}
          benefits={enterprisesBenefits}
          ctaText={t('enterprises.cta')}
          ctaLink={`/${locale}/solutions/enterprises-passengers`}
          gradient="linear-gradient(135deg, #8b5cf6, #7c3aed)"
        />
      </div>
    </SectionContainer>
  );
}

