'use client';

import { useTranslations } from 'next-intl';
import { SectionContainer } from '@/components/ui/section-container';
import { SectionHeader } from '@/components/ui/section-header';
import { BenefitsList } from '@/components/ui/benefits-list';
import { TrendingDown, Clock, Eye } from 'lucide-react';

export function WhyTranzkitSection() {
  const t = useTranslations('solutions.main.whyTranzkit');

  const reasons = [
    {
      id: '1',
      title: t('reasons.0'),
      icon: <TrendingDown className="w-8 h-8 text-green-600" />
    },
    {
      id: '2',
      title: t('reasons.1'),
      icon: <Clock className="w-8 h-8 text-blue-600" />
    },
    {
      id: '3',
      title: t('reasons.2'),
      icon: <Eye className="w-8 h-8 text-purple-600" />
    }
  ];

  return (
    <SectionContainer
      background="light"
      padding="xl"
      maxWidth="2xl"
    >
      <SectionHeader
        title={t('title')}
        alignment="center"
        titleSize="lg"
      />
      <BenefitsList
        items={reasons}
        columns={3}
        layout="spacious"
      />
    </SectionContainer>
  );
}
