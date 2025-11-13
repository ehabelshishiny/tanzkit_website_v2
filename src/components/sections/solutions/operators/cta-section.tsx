'use client';

import { useTranslations } from 'next-intl';
import { SectionContainer } from '@/components/ui/section-container';
import { GradientButton } from '@/components/ui/gradient-button';
import { ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

export function OperatorsCtaSection() {
  const t = useTranslations('solutions.operatorsDrivers.cta');

  return (
    <SectionContainer
      background="transparent"
      padding="xl"
      maxWidth="2xl"
      className="bg-gradient-to-br from-purple-600 via-purple-700 to-violet-800"
    >
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="text-center"
      >
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
          {t('title')}
        </h2>
        <p className="text-xl md:text-2xl text-purple-100 mb-10 max-w-3xl mx-auto">
          {t('subtitle')}
        </p>
        <GradientButton
          href="/contact"
          size="lg"
          gradient="#ffffff, #f8d0fbff"
          hoverGradient="#f8fafc, #f8d0fbff"
          icon={<ArrowRight className="w-5 h-5" />}
          iconPosition="right"
          className="text-purple-900 font-semibold"
        >
          {t('button')}
        </GradientButton>
      </motion.div>
    </SectionContainer>
  );
}

