'use client';

import { useTranslations } from 'next-intl';
import { Typography } from '@/components/ui/typography';
import { SectionContainer } from '@/components/ui/section-container';
import { SectionHeader } from '@/components/ui/section-header';
import { FramerMetricCard } from './framer-metric-card';
import { Brain, TrendingUp, Zap, Shield, Users } from 'lucide-react';
import { motion } from 'framer-motion';

export function OperatorsAiImpactSection() {
  const t = useTranslations('solutions.operatorsDrivers');

  return (
    <>
      {/* AI Advantage Section - Redesigned */}
      <SectionContainer
        background="dark"
        padding="xl"
        maxWidth="2xl"
      >
        <div className="relative">
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-[0.04] dark:opacity-[0.02] pointer-events-none">
            <div 
              className="absolute inset-0" 
              style={{
                backgroundImage: `
                  linear-gradient(to right, currentColor 1px, transparent 1px),
                  linear-gradient(to bottom, currentColor 1px, transparent 1px)
                `,
                backgroundSize: '40px 40px',
                maskImage: 'linear-gradient(to bottom, transparent 0%, black 10%, black 90%, transparent 100%)',
                WebkitMaskImage: 'linear-gradient(to bottom, transparent 0%, black 10%, black 90%, transparent 100%)'
              }} 
            />
          </div>

          {/* Subtle background decoration */}
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 0.03 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2 }}
            className="absolute -top-20 -right-20 w-96 h-96 bg-gradient-to-br from-primary/20 to-accent/20 rounded-full blur-3xl pointer-events-none"
          />
          
          <div className="flex flex-col items-center text-center gap-8 relative z-10">
            {/* Icon with enhanced animations */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="relative"
            >
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                className="w-24 h-24 bg-gradient-to-br from-primary via-accent to-primary rounded-2xl flex items-center justify-center shadow-xl shadow-primary/20"
              >
                <Brain className="w-12 h-12 text-white dark:text-primary-foreground" strokeWidth={1.5} />
              </motion.div>
              
              {/* Subtle pulse animation */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ 
                  opacity: [0.4, 0.6, 0.4],
                  scale: [1, 1.1, 1]
                }}
                transition={{ 
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="absolute inset-0 bg-gradient-to-br from-primary to-accent rounded-2xl -z-10 blur-xl"
              />
            </motion.div>

            {/* Title with staggered animation */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="max-w-3xl"
            >
              <Typography variant="h2" className="text-foreground mb-6 bg-gradient-to-r from-foreground via-foreground/90 to-foreground/80 bg-clip-text">
                {t('aiAdvantage.title')}
              </Typography>
              
              {/* Description with emphasis */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.5 }}
              >
                <Typography variant="subtitle" className="text-foreground/70 font-light">
                  {t('aiAdvantage.description')}
                </Typography>
              </motion.div>
            </motion.div>

            {/* Decorative line element */}
            <motion.div
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.7 }}
              className="w-24 h-0.5 bg-gradient-to-r from-transparent via-primary/50 to-transparent"
            />
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
            <Typography variant="h2" className="text-primary-foreground dark:text-gray-100">{t('impact.title')}</Typography>
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
