'use client';

import { useTranslations } from 'next-intl';
import { SectionContainer } from '@/components/ui/section-container';
import { RTLAwareArrow } from '@/components/ui/rtl-aware-arrow';
import { motion } from 'framer-motion';
import { TrialCTAButton } from '@/components/ui/trial-cta-button';

export function OperatorsCtaSection() {
  const t = useTranslations('solutions.operatorsDrivers.cta');

  return (
    <SectionContainer
      background="transparent"
      padding="xl"
      maxWidth="2xl"
      className="bg-muted"
    >
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="text-center"
      >
        <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
          {t('title')}
        </h2>
        <p className="text-xl md:text-2xl text-foreground/80 mb-10 max-w-3xl mx-auto">
          {t('subtitle')}
        </p>
        <TrialCTAButton
          variant="secondary"
          size="lg"
          icon={<RTLAwareArrow className="w-5 h-5" />}
          iconPosition="right"
          className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold"
        />
      </motion.div>
    </SectionContainer>
  );
}
