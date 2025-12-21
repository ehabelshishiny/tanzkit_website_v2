'use client';

import { Typography } from '@/components/ui/typography';
import { SectionContainer } from '@/components/ui/section-container';
import { StyledFeatureCard } from './styled-feature-card';
import { Building2, Users, BarChart3, Shield } from 'lucide-react';

const featureIcons = [Building2, Users, BarChart3, Shield];

interface EnterprisesFeaturesSectionProps {
  data?: {
    overview?: string;
    title?: string;
    items?: Array<{
      title?: string;
      description?: string;
      points?: string[];
    }>;
  };
}

export function EnterprisesFeaturesSection({ data }: EnterprisesFeaturesSectionProps) {
  // Render empty if no data to maintain consistent structure
  if (!data) return <section className="w-full max-w-7xl mx-auto px-4 py-16" />;

  const iconColors = ['#0F2E63', '#1F6FB2', '#27B889', '#7ED977'];

  return (
    <SectionContainer
      background="light"
      padding="xl"
      maxWidth="2xl"
    >
      {data.overview && (
        <div className="text-center mb-16">
          <Typography variant="subtitle" className="text-[#334155] dark:text-gray-100 max-w-4xl mx-auto">
            {data.overview}
          </Typography>
        </div>
      )}

      {/* Features */}
      <div>
        <div className="text-center mb-12 md:mb-16">
          <Typography variant="h2">{data.title}</Typography>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
          {data.items?.map((item, index) => {
            const Icon = featureIcons[index % featureIcons.length];
            const iconColor = iconColors[index % iconColors.length];

            return (
              <StyledFeatureCard
                key={index}
                icon={<Icon className="w-8 h-8" />}
                iconColor={iconColor}
                title={item.title || ''}
                description={item.description || ''}
                features={item.points || []}
                layout="vertical"
                hoverEffect
              />
            );
          })}
        </div>
      </div>
    </SectionContainer>
  );
}
