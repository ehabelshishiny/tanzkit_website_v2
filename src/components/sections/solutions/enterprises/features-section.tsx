'use client';

import { useTranslations } from 'next-intl';
import { Typography } from '@/components/ui/typography';
import { SectionContainer } from '@/components/ui/section-container';
import { StyledFeatureCard } from './styled-feature-card';
import { Building2, Users, BarChart3, Shield } from 'lucide-react';

export function EnterprisesFeaturesSection() {
  const t = useTranslations('solutions.enterprisesPassengers');

  return (
    <SectionContainer
      background="light"
      padding="xl"
      maxWidth="2xl"
    >
      <div className="text-center mb-16">
        <Typography variant="subtitle" className="text-[#334155] dark:text-gray-100 max-w-4xl mx-auto">
          {t('overview.text')}
        </Typography>
      </div>

      {/* Features */}
      <div>
        <div className="text-center mb-12 md:mb-16">
          <Typography variant="h2">{t('features.title')}</Typography>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
          {/* Feature 1 */}
          <StyledFeatureCard
            icon={<Building2 className="w-8 h-8" />}
            iconColor="#0F2E63"
            title={t('features.items.0.title')}
            description=""
            features={[
              t('features.items.0.points.0'),
              t('features.items.0.points.1'),
              t('features.items.0.points.2')
            ]}
            layout="vertical"
            hoverEffect
          />

          {/* Feature 2 */}
          <StyledFeatureCard
            icon={<Users className="w-8 h-8" />}
            iconColor="#1F6FB2"
            title={t('features.items.1.title')}
            description=""
            features={[
              t('features.items.1.points.0'),
              t('features.items.1.points.1'),
              t('features.items.1.points.2')
            ]}
            layout="vertical"
            hoverEffect
          />

          {/* Feature 3 */}
          <StyledFeatureCard
            icon={<BarChart3 className="w-8 h-8" />}
            iconColor="#27B889"
            title={t('features.items.2.title')}
            description=""
            features={[
              t('features.items.2.points.0'),
              t('features.items.2.points.1'),
              t('features.items.2.points.2')
            ]}
            layout="vertical"
            hoverEffect
          />

          {/* Feature 4 */}
          <StyledFeatureCard
            icon={<Shield className="w-8 h-8" />}
            iconColor="#7ED977"
            title={t('features.items.3.title')}
            description=""
            features={[
              t('features.items.3.points.0'),
              t('features.items.3.points.1'),
              t('features.items.3.points.2')
            ]}
            layout="vertical"
            hoverEffect
          />
        </div>
      </div>
    </SectionContainer>
  );
}
