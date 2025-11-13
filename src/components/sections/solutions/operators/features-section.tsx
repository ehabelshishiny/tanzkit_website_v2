'use client';

import { useTranslations } from 'next-intl';
import { SectionContainer } from '@/components/ui/section-container';
import { SectionHeader } from '@/components/ui/section-header';
import { FeatureCard } from '@/components/ui/feature-card';
import { Truck, Calendar, BarChart3, Smartphone } from 'lucide-react';

export function OperatorsFeaturesSection() {
  const t = useTranslations('solutions.operatorsDrivers');

  return (
    <SectionContainer
      background="light"
      padding="xl"
      maxWidth="2xl"
    >
      {/* Overview */}
      <div className="text-center mb-16">
        <p className="text-xl md:text-2xl text-slate-700 leading-relaxed max-w-4xl mx-auto">
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
            icon={<Truck className="w-8 h-8" />}
            iconColor="#3b82f6"
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
            icon={<Calendar className="w-8 h-8" />}
            iconColor="#8b5cf6"
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
            iconColor="#10b981"
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
            icon={<Smartphone className="w-8 h-8" />}
            iconColor="#f59e0b"
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

