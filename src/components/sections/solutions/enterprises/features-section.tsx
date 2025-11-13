'use client';

import { useTranslations } from 'next-intl';
import { SectionContainer } from '@/components/ui/section-container';
import { SectionHeader } from '@/components/ui/section-header';
import { FeatureCard } from '@/components/ui/feature-card';
import { Building2, Users, BarChart3, Shield } from 'lucide-react';

export function EnterprisesFeaturesSection() {
  const t = useTranslations('solutions.enterprisesPassengers');

  return (
    <SectionContainer
      background="light"
      padding="xl"
      maxWidth="2xl"
    >
      {/* Overview */}
      <div className="text-center mb-16">
        <p className="text-xl md:text-2xl text-[#334155] leading-relaxed max-w-4xl mx-auto">
          {t('overview.text')}
        </p>
      </div>

      {/* Features */}
      <div>
        <SectionHeader
          title={t('features.title')}
          alignment="center"
          titleSize="lg"
        />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
          {/* Feature 1 */}
          <FeatureCard
            icon={<Building2 className="w-8 h-8" />}
            iconColor="#0F2E63"
            title={t('features.items.0.title')}
            description={t('features.items.0.description')}
            features={[
              t('features.items.0.points.0'),
              t('features.items.0.points.1'),
              t('features.items.0.points.2')
            ]}
            layout="vertical"
            hoverEffect
          />

          {/* Feature 2 */}
          <FeatureCard
            icon={<Users className="w-8 h-8" />}
            iconColor="#1F6FB2"
            title={t('features.items.1.title')}
            description={t('features.items.1.description')}
            features={[
              t('features.items.1.points.0'),
              t('features.items.1.points.1'),
              t('features.items.1.points.2')
            ]}
            layout="vertical"
            hoverEffect
          />

          {/* Feature 3 */}
          <FeatureCard
            icon={<BarChart3 className="w-8 h-8" />}
            iconColor="#27B889"
            title={t('features.items.2.title')}
            description={t('features.items.2.description')}
            features={[
              t('features.items.2.points.0'),
              t('features.items.2.points.1'),
              t('features.items.2.points.2')
            ]}
            layout="vertical"
            hoverEffect
          />

          {/* Feature 4 */}
          <FeatureCard
            icon={<Shield className="w-8 h-8" />}
            iconColor="#7ED977"
            title={t('features.items.3.title')}
            description={t('features.items.3.description')}
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

