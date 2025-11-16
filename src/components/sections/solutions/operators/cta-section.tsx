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
      className="bg-gradient-to-br from-chart-4 via-chart-4/90 to-accent"
    >
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="text-center"
      >
        <h2 className="text-4xl md:text-5xl font-bold text-primary-foreground mb-6">
          {t('title')}
        </h2>
        <p className="text-xl md:text-2xl text-primary-foreground/90 mb-10 max-w-3xl mx-auto">
          {t('subtitle')}
        </p>
        <GradientButton
          href="/contact"
          size="lg"
          icon={<ArrowRight className="w-5 h-5" />}
          iconPosition="right"
          className="bg-background hover:bg-muted text-foreground font-semibold"
        >
          {t('button')}
        </GradientButton>
      </motion.div>
    </SectionContainer>
  );
}

