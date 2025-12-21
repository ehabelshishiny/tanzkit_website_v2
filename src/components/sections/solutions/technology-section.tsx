'use client';

import { SectionContainer } from '@/components/ui/section-container';
import { SectionHeader } from '@/components/ui/section-header';
import { FeatureCard } from '@/components/ui/feature-card';
import { getLucideIcon } from '@/lib/lucide-icons';

interface TechnologySectionProps {
  data: {
    title: string;
    highlights: Array<{
      _key: string;
      icon: string;
      text: string;
    }>;
  };
}

export function TechnologySection({ data }: TechnologySectionProps) {
  // Safety check
  if (!data || !data.highlights) {
    return null;
  }

  const iconColors = [
    'hsl(var(--chart-1))',
    'hsl(var(--chart-4))',
    'hsl(var(--chart-2))',
    'hsl(var(--chart-5))'
  ];

  const features = data.highlights.map((highlight, index) => {
    const IconComponent = getLucideIcon(highlight.icon, 'Brain');

    return {
      icon: <IconComponent key={highlight._key} className="w-8 h-8" />,
      iconColor: iconColors[index % iconColors.length],
      title: highlight.text
    };
  });

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

