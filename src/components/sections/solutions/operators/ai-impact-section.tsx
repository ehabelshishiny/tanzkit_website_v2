'use client';

import { useTranslations } from 'next-intl';
import { SectionContainer } from '@/components/ui/section-container';
import { SectionHeader } from '@/components/ui/section-header';
import { FramerMetricCard } from './framer-metric-card';
import { Brain, TrendingUp, Zap, Shield, Users } from 'lucide-react';
import { motion } from 'framer-motion';

export function OperatorsAiImpactSection() {
  const t = useTranslations('solutions.operatorsDrivers');

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
              className="w-32 h-32 mx-auto md:mx-0 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center"
            >
              <Brain className="w-16 h-16 text-white dark:text-primary-foreground" />
            </motion.div>
          </div>
          <div className="flex-[2]">
            <SectionHeader
              title={t('aiAdvantage.title')}
              alignment="left"
              titleSize="lg"
              className="text-foreground"
            />
            <p className="text-lg md:text-xl text-foreground/80 leading-relaxed mt-6">
              {t('aiAdvantage.description')}
            </p>
          </div>
        </div>
      </SectionContainer>

      {/* Impact Metrics Section - Advanced Framer Motion */}
      <section className="relative py-20 md:py-28 overflow-hidden bg-gradient-to-br from-accent via-primary to-secondary">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
            backgroundSize: '32px 32px'
          }} />
        </div>

        <div className="relative z-10 w-full px-4 max-w-7xl mx-auto">
          {/* Section Title */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold leading-tight text-primary-foreground dark:text-gray-100">{t('impact.title')}</h2>
          </motion.div>

          {/* Impact Cards Grid - 2x2 Layout */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            <FramerMetricCard
              value={30}
              suffix="%"
              label={t('impact.metrics.0.label')}
              icon={TrendingUp}
              variant="accent"
              delay={0}
            />
            <FramerMetricCard
              value={2}
              suffix="x"
              label={t('impact.metrics.1.label')}
              icon={Zap}
              variant="primary"
              delay={0.15}
            />
            <FramerMetricCard
              value={t('impact.metrics.2.value')}
              label={t('impact.metrics.2.label')}
              icon={Shield}
              variant="secondary"
              delay={0.3}
            />
            <FramerMetricCard
              value={t('impact.metrics.3.value')}
              label={t('impact.metrics.3.label')}
              icon={Users}
              variant="success"
              delay={0.45}
            />
          </div>
        </div>
      </section>
    </>
  );
}
