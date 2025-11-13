'use client';

import { useTranslations } from 'next-intl';
import { SectionContainer } from '@/components/ui/section-container';
import { SectionHeader } from '@/components/ui/section-header';
import { MetricCard } from '@/components/ui/metric-card';
import { Brain } from 'lucide-react';
import { motion } from 'framer-motion';

export function EnterprisesAiImpactSection() {
  const t = useTranslations('solutions.enterprisesPassengers');

  return (
    <>
      {/* AI Advantage Section */}
      <SectionContainer
        background="dark"
        padding="xl"
        maxWidth="2xl"
      >
        <div className="flex flex-col md:flex-row items-center gap-12">
          <div className="flex-1">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="w-32 h-32 mx-auto md:mx-0 rounded-full flex items-center justify-center"
              style={{ background: 'linear-gradient(135deg, #0F2E63 0%, #1F6FB2 50%, #27B889 100%)' }}
            >
              <Brain className="w-16 h-16 text-white" />
            </motion.div>
          </div>
          <div className="flex-[2]">
            <SectionHeader
              title={t('aiAdvantage.title')}
              alignment="left"
              titleSize="lg"
              className="text-white"
            />
            <p className="text-lg md:text-xl text-slate-300 leading-relaxed mt-6">
              {t('aiAdvantage.description')}
            </p>
          </div>
        </div>
      </SectionContainer>

      {/* Impact Metrics Section */}
      <SectionContainer
        background="light"
        padding="xl"
        maxWidth="2xl"
      >
        <SectionHeader
          title={t('impact.title')}
          alignment="center"
          titleSize="lg"
        />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
          <MetricCard
            value={25}
            suffix="%"
            label={t('impact.metrics.0.label')}
            animateOnScroll
          />
          <MetricCard
            value={t('impact.metrics.1.value')}
            label={t('impact.metrics.1.label')}
            animateOnScroll={false}
          />
          <MetricCard
            value={t('impact.metrics.2.value')}
            label={t('impact.metrics.2.label')}
            animateOnScroll={false}
          />
          <MetricCard
            value={t('impact.metrics.3.value')}
            label={t('impact.metrics.3.label')}
            animateOnScroll={false}
          />
        </div>
      </SectionContainer>
    </>
  );
}

