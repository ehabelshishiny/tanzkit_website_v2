'use client';

import { Typography } from '@/components/ui/typography';
import { SectionContainer } from '@/components/ui/section-container';
import { SectionHeader } from '@/components/ui/section-header';
import { FeatureCard } from '@/components/ui/feature-card';
import { Truck, Calendar, BarChart3, Smartphone } from 'lucide-react';

const featureIcons = [Truck, Calendar, BarChart3, Smartphone];
const iconColors = ['#3b82f6', '#8b5cf6', '#10b981', '#f59e0b'];

interface OperatorsFeaturesSectionProps {
  data?: {
    overview?: string;
    title?: string;
    subtitle?: string;
    items?: Array<{
      title?: string;
      description?: string;
      points?: string[];
    }>;
  };
}

export function OperatorsFeaturesSection({ data }: OperatorsFeaturesSectionProps) {
  // Render empty if no data to maintain consistent structure
  if (!data) return <section className="w-full max-w-7xl mx-auto px-4 py-16" />;

  return (
    <SectionContainer
      background="light"
      padding="xl"
      maxWidth="2xl"
    >
      {data.overview && (
        <div className="text-center mb-16">
          <Typography variant="subtitle" className="text-slate-700 dark:text-gray-100 max-w-4xl mx-auto">
            {data.overview}
          </Typography>
        </div>
      )}

      {/* Features */}
      <div>
        <SectionHeader
          title={data.title || ''}
          alignment="center"
          titleSize="lg"
        />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
          {data.items?.map((item, index) => {
            const Icon = featureIcons[index % featureIcons.length];
            const iconColor = iconColors[index % iconColors.length];

            return (
              <FeatureCard
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
