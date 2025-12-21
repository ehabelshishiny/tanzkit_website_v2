'use client';

import { Typography } from '@/components/ui/typography';
import { SectionContainer } from '@/components/ui/section-container';
import { RTLAwareArrow } from '@/components/ui/rtl-aware-arrow';
import { motion } from 'framer-motion';
import { TrialCTAButton } from '@/components/ui/trial-cta-button';

interface EnterprisesCtaSectionProps {
  data?: {
    heading?: string;
    subtitle?: string;
  };
}

export function EnterprisesCtaSection({ data }: EnterprisesCtaSectionProps) {
  // Render empty if no data to maintain consistent structure
  if (!data) return <section className="w-full max-w-7xl mx-auto px-4 py-16" />;

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
          <Typography variant="h2" className="text-foreground mb-6">
            {data.heading}
          </Typography>
          <Typography variant="subtitle" className="text-muted-foreground mb-10 max-w-3xl mx-auto">
            {data.subtitle}
          </Typography>
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
