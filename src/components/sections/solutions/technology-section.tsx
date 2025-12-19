'use client';

import { SectionContainer } from '@/components/ui/section-container';
import { SectionHeader } from '@/components/ui/section-header';
import { FeatureCard } from '@/components/ui/feature-card';
import { Brain, BarChart3, Shield, Globe } from 'lucide-react';

interface TechnologySectionProps {
  data: {
    title: string;
    highlights: string[];
  };
}

export function TechnologySection({ data }: TechnologySectionProps) {
  // Safety check
  if (!data || !data.highlights) {
    return null;
  }

  const icons = [
    <Brain key="brain" className="w-8 h-8" />,
    <BarChart3 key="chart" className="w-8 h-8" />,
    <Shield key="shield" className="w-8 h-8" />,
    <Globe key="globe" className="w-8 h-8" />
  ];

  const iconColors = [
    'hsl(var(--chart-1))',
    'hsl(var(--chart-4))',
    'hsl(var(--chart-2))',
    'hsl(var(--chart-5))'
  ];

  const features = data.highlights.map((highlight, index) => ({
    icon: icons[index % icons.length],
    iconColor: iconColors[index % iconColors.length],
    title: highlight
  }));

  return (
    <SectionContainer
      background="dark"
      padding="xl"
      maxWidth="2xl"
    >
      <SectionHeader
        title={data.title}
        alignment="center"
        titleSize="lg"
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

