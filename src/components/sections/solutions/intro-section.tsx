'use client';

import { SectionContainer } from '@/components/ui/section-container';
import { SectionHeader } from '@/components/ui/section-header';
import { BenefitsList } from '@/components/ui/benefits-list';
import { Typography } from '@/components/ui/typography';
import { CheckCircle } from 'lucide-react';

interface IntroSectionProps {
  data: {
    text: string;
    howWeHelp: {
      title: string;
      benefits: string[];
    };
  };
}

export function IntroSection({ data }: IntroSectionProps) {
  // Safety check
  if (!data || !data.howWeHelp || !data.howWeHelp.benefits) {
    return null;
  }

  const benefits = data.howWeHelp.benefits.map((benefit, index) => ({
    id: String(index + 1),
    title: benefit,
    icon: <CheckCircle className="w-6 h-6 text-blue-600" />
  }));

  return (
    <SectionContainer
      id="explore"
      background="light"
      padding="xl"
      maxWidth="2xl"
    >
      {/* Intro Text */}
      <div className="text-center mb-16">
        <Typography variant="subtitle" align="center" className="text-slate-700 dark:text-gray-100 leading-relaxed max-w-4xl mx-auto">
          {data.text}
        </Typography>
      </div>

      {/* How We Help */}
      <div>
        <SectionHeader
          title={data.howWeHelp.title}
          alignment="center"
          titleSize="lg"
        />
        <BenefitsList
          items={benefits}
          columns={2}
          layout="spacious"
        />
      </div>
    </SectionContainer>
  );
}
