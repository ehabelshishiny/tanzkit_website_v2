'use client';

import { useTranslations } from 'next-intl';
import { SectionContainer } from '@/components/ui/section-container';
import { SectionHeader } from '@/components/ui/section-header';
import { BenefitsList } from '@/components/ui/benefits-list';
import { CheckCircle } from 'lucide-react';

export function IntroSection() {
  const t = useTranslations('solutions.main');

  const benefits = [
    {
      id: '1',
      title: t('howWeHelp.benefits.0'),
      icon: <CheckCircle className="w-6 h-6 text-blue-600" />
    },
    {
      id: '2',
      title: t('howWeHelp.benefits.1'),
      icon: <CheckCircle className="w-6 h-6 text-blue-600" />
    },
    {
      id: '3',
      title: t('howWeHelp.benefits.2'),
      icon: <CheckCircle className="w-6 h-6 text-blue-600" />
    },
    {
      id: '4',
      title: t('howWeHelp.benefits.3'),
      icon: <CheckCircle className="w-6 h-6 text-blue-600" />
    }
  ];

  return (
    <SectionContainer
      id="explore"
      background="light"
      padding="xl"
      maxWidth="2xl"
    >
      {/* Intro Text */}
      <div className="text-center mb-16">
        <p className="text-xl md:text-2xl text-slate-700 leading-relaxed max-w-4xl mx-auto">
          {t('intro.text')}
        </p>
      </div>

      {/* How We Help */}
      <div>
        <SectionHeader
          title={t('howWeHelp.title')}
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

