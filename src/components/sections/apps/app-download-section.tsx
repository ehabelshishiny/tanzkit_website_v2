'use client';

import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { Apple, Smartphone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { SectionContainer } from '@/components/ui/section-container';
import { fadeInUp, scaleIn } from '@/lib/animation-variants';

interface AppDownloadSectionProps {
  appStoreUrl: string;
  playStoreUrl: string;
  requirements: {
    ios: string;
    android: string;
  };
  accentColor: string;
}

export function AppDownloadSection({
  appStoreUrl,
  playStoreUrl,
  requirements,
  accentColor,
}: AppDownloadSectionProps) {
  const t = useTranslations('apps.common');

  return (
    <SectionContainer background="light" padding="xl" maxWidth="lg">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-100px' }}
        variants={fadeInUp}
      >
        <Card className="p-12 text-center bg-gradient-to-br from-card to-muted/50 border-border">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">
            {t('downloadOn')}
          </h2>
          <p className="text-lg text-muted-foreground mb-8">
            {t('availableOn')} iOS & Android
          </p>

          {/* Download Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <motion.div variants={scaleIn} whileHover={{ scale: 1.05 }}>
              <Button
                size="lg"
                className="gap-2 min-w-[200px]"
                style={{ backgroundColor: accentColor }}
                asChild
              >
                <a href={appStoreUrl} target="_blank" rel="noopener noreferrer">
                  <Apple className="w-5 h-5" />
                  {t('appStore')}
                </a>
              </Button>
            </motion.div>

            <motion.div variants={scaleIn} whileHover={{ scale: 1.05 }}>
              <Button
                size="lg"
                variant="outline"
                className="gap-2 min-w-[200px]"
                style={{ borderColor: accentColor, color: accentColor }}
                asChild
              >
                <a href={playStoreUrl} target="_blank" rel="noopener noreferrer">
                  <Smartphone className="w-5 h-5" />
                  {t('playStore')}
                </a>
              </Button>
            </motion.div>
          </div>

          {/* Requirements */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center text-sm text-muted-foreground">
            <div>
              <span className="font-medium text-foreground">iOS:</span>{' '}
              {requirements.ios}
            </div>
            <div>
              <span className="font-medium text-foreground">Android:</span>{' '}
              {requirements.android}
            </div>
          </div>
        </Card>
      </motion.div>
    </SectionContainer>
  );
}

