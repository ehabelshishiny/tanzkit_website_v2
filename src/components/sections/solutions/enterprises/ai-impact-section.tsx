'use client';

import { useTranslations } from 'next-intl';
import { SectionContainer } from '@/components/ui/section-container';
import { ImpactTile } from './impact-tile';
import { Brain, TrendingDown, Clock, Heart, Route } from 'lucide-react';
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
            {/* H2: Sora SemiBold 36px/42px */}
            <div className="text-left mb-6">
              <h2 className="text-white">{t('aiAdvantage.title')}</h2>
            </div>
            {/* Body text: Inter Regular 16px/24px */}
            <p className="body-text text-slate-300 mt-6">
              {t('aiAdvantage.description')}
            </p>
          </div>
        </div>
      </SectionContainer>

      {/* Impact Metrics Section - Bold Impact Tiles */}
      <section
        className="relative py-20 md:py-28 overflow-hidden"
        style={{ background: 'linear-gradient(135deg, #0F2E63 0%, #1F6FB2 100%)' }}
      >
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
            backgroundSize: '32px 32px'
          }} />
        </div>

        <div className="relative z-10 container mx-auto px-4 max-w-7xl">
          {/* Section Title */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-white">{t('impact.title')}</h2>
          </motion.div>

          {/* Impact Tiles Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <ImpactTile
              value={25}
              suffix="%"
              label={t('impact.metrics.0.label')}
              icon={TrendingDown}
              backgroundColor="#0F2E63"
              animateOnScroll
              delay={0}
            />
            <ImpactTile
              value={t('impact.metrics.1.value')}
              label={t('impact.metrics.1.label')}
              icon={Clock}
              backgroundColor="#1F6FB2"
              animateOnScroll={false}
              delay={0.1}
            />
            <ImpactTile
              value={t('impact.metrics.2.value')}
              label={t('impact.metrics.2.label')}
              icon={Heart}
              backgroundColor="#27B889"
              animateOnScroll={false}
              delay={0.2}
            />
            <ImpactTile
              value={t('impact.metrics.3.value')}
              label={t('impact.metrics.3.label')}
              icon={Route}
              backgroundColor="#7ED977"
              animateOnScroll={false}
              delay={0.3}
            />
          </div>
        </div>
      </section>
    </>
  );
}

