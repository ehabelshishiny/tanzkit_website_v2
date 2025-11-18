'use client';

import { useTranslations } from 'next-intl';
import { SectionContainer } from '@/components/ui/section-container';
import { ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { TrialCTAButton } from '@/components/ui/trial-cta-button';

export function CtaSection() {
  const t = useTranslations('solutions.main.cta');

  return (
    <SectionContainer
      background="gradient"
      padding="xl"
      maxWidth="2xl"
    >
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="text-center"
      >
        <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary to-primary/90 bg-clip-text text-transparent mb-6">
          {t('title')}
        </h2>
        <p className="text-xl md:text-2xl text-foreground mb-10 max-w-3xl mx-auto">
          {t('subtitle')}
        </p>
        <TrialCTAButton
          variant="secondary"
          size="lg"
          icon={<ArrowRight className="w-5 h-5" />}
          iconPosition="right"
        />
      </motion.div>
    </SectionContainer>
  );
}

