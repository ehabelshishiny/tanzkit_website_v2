'use client';

import { SectionContainer } from '@/components/ui/section-container';
import { RTLAwareArrow } from '@/components/ui/rtl-aware-arrow';
import { Typography } from '@/components/ui/typography';
import { motion } from 'framer-motion';
import { TrialCTAButton } from '@/components/ui/trial-cta-button';

interface CtaSectionProps {
  data: {
    title: string;
    subtitle: string;
  };
}

export function CtaSection({ data }: CtaSectionProps) {
  // Safety check
  if (!data) {
    return null;
  }

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
        <Typography variant="h2" align="center" className="bg-gradient-to-r from-primary to-primary/90 bg-clip-text text-transparent mb-6">
          {data.title}
        </Typography>
        <Typography variant="subtitle" align="center" className="text-foreground mb-10 max-w-3xl mx-auto">
          {data.subtitle}
        </Typography>
        <TrialCTAButton
          variant="secondary"
          size="lg"
          icon={<RTLAwareArrow className="w-5 h-5" />}
          iconPosition="right"
        />
      </motion.div>
    </SectionContainer>
  );
}
