'use client';

import { useLocale } from 'next-intl';
import { SectionContainer } from '@/components/ui/section-container';
import { AudienceCard } from '@/components/ui/audience-card';

interface AudienceCardsSectionProps {
  data: {
    operators: {
      headline: string;
      description: string;
      benefits: string[];
      cta: string;
    };
    enterprises: {
      headline: string;
      description: string;
      benefits: string[];
      cta: string;
    };
  };
}

export function AudienceCardsSection({ data }: AudienceCardsSectionProps) {
  const locale = useLocale();

  // Safety check
  if (!data || !data.operators || !data.enterprises) {
    return null;
  }

  return (
    <SectionContainer
      background="gradient"
      padding="xl"
      maxWidth="2xl"
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <AudienceCard
          title={data.operators.headline}
          description={data.operators.description}
          benefits={data.operators.benefits}
          ctaText={data.operators.cta}
          ctaLink={`/${locale}/solutions/operators-drivers`}
          gradient="from-primary/10 to-chart-1/10"
        />

        <AudienceCard
          title={data.enterprises.headline}
          description={data.enterprises.description}
          benefits={data.enterprises.benefits}
          ctaText={data.enterprises.cta}
          ctaLink={`/${locale}/solutions/enterprises-passengers`}
          gradient="from-chart-4/10 to-accent/10"
        />
      </div>
    </SectionContainer>
  );
}
