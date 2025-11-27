'use client';

import { useTranslations } from 'next-intl';
import { SectionContainer } from '@/components/ui/section-container';
import { RTLAwareArrow } from '@/components/ui/rtl-aware-arrow';
import { motion } from 'framer-motion';
import { TrialCTAButton } from '@/components/ui/trial-cta-button';

export function EnterprisesCtaSection() {
  const t = useTranslations('solutions.enterprisesPassengers.cta');

  return (
    <div className="bg-background dark:bg-card">
      <SectionContainer
        background="transparent"
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
          {/* H2: Sora SemiBold 36px/42px */}
          <h2 className="text-foreground mb-6">
            {t('title')}
          </h2>
          {/* Subheading: Space Grotesk Medium 18px/24px */}
          <p className="subheading text-muted-foreground mb-10 max-w-3xl mx-auto">
            {t('subtitle')}
          </p>
          <TrialCTAButton
            variant="secondary"
            size="lg"
            icon={<RTLAwareArrow className="w-5 h-5" />}
            iconPosition="right"
            className="bg-primary hover:bg-primary/90 text-primary-foreground"
          />
        </motion.div>
      </SectionContainer>
    </div>
  );
}
