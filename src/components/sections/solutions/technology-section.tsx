'use client';

import { useTranslations } from 'next-intl';
import { SectionContainer } from '@/components/ui/section-container';
import { SectionHeader } from '@/components/ui/section-header';
import { FeatureCard } from '@/components/ui/feature-card';
import { Brain, BarChart3, Shield, Globe } from 'lucide-react';

export function TechnologySection() {
  const t = useTranslations('solutions.main.technology');

  const features = [
    {
      icon: <Brain className="w-8 h-8" />,
      iconColor: 'hsl(var(--chart-1))',
      title: t('highlights.0')
    },
    {
      icon: <BarChart3 className="w-8 h-8" />,
      iconColor: 'hsl(var(--chart-4))',
      title: t('highlights.1')
    },
    {
      icon: <Shield className="w-8 h-8" />,
      iconColor: 'hsl(var(--chart-2))',
      title: t('highlights.2')
    },
    {
      icon: <Globe className="w-8 h-8" />,
      iconColor: 'hsl(var(--chart-5))',
      title: t('highlights.3')
    }
  ];

  return (
    <SectionContainer
      background="dark"
      padding="xl"
      maxWidth="2xl"
    >
      <SectionHeader
        title={t('title')}
        alignment="center"
        titleSize="lg"
        className="text-primary-foreground dark:text-gray-100"
      />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
        {features.map((feature, index) => (
          <FeatureCard
            key={index}
            icon={feature.icon}
            iconColor={feature.iconColor}
            title={feature.title}
            description=""
            layout="vertical"
            hoverEffect
          />
        ))}
      </div>
    </SectionContainer>
  );
}

