'use client';

import { SectionContainer } from '@/components/ui/section-container';
import { SectionHeader } from '@/components/ui/section-header';
import { BenefitsList } from '@/components/ui/benefits-list';
import { TrendingDown, Clock, Eye } from 'lucide-react';

interface WhyTranzkitSectionProps {
  data: {
    title: string;
    reasons: string[];
  };
}

export function WhyTranzkitSection({ data }: WhyTranzkitSectionProps) {
  // Safety check
  if (!data || !data.reasons) {
    return null;
  }

  const icons = [
    <TrendingDown key="trending" className="w-8 h-8 text-green-600" />,
    <Clock key="clock" className="w-8 h-8 text-blue-600" />,
    <Eye key="eye" className="w-8 h-8 text-purple-600" />
  ];

  const reasons = data.reasons.map((reason, index) => ({
    id: String(index + 1),
    title: reason,
    icon: icons[index % icons.length]
  }));

  return (
    <SectionContainer
      background="light"
      padding="xl"
      maxWidth="2xl"
    >
      <SectionHeader
        title={data.title}
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
