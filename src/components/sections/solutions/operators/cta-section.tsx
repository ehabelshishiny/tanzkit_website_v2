'use client';

import { Typography } from '@/components/ui/typography';
import { SectionContainer } from '@/components/ui/section-container';
import { RTLAwareArrow } from '@/components/ui/rtl-aware-arrow';
import { motion } from 'framer-motion';
import { TrialCTAButton } from '@/components/ui/trial-cta-button';

interface OperatorsCtaSectionProps {
  data?: {
    heading?: string;
    subtitle?: string;
  };
}

export function OperatorsCtaSection({ data }: OperatorsCtaSectionProps) {
  // Render empty if no data to maintain consistent structure
  if (!data) return <section className="w-full max-w-7xl mx-auto px-4 py-16" />;

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
        <Typography variant="h2" className="text-foreground mb-6">
          {data.heading}
        </Typography>
        <Typography variant="subtitle" className="text-foreground/80 mb-10 max-w-3xl mx-auto">
          {data.subtitle}
        </Typography>
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
