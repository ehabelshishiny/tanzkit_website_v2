'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { Zap, Shield, TrendingUp } from 'lucide-react';
import { Typography } from '@/components/ui/typography';

export function PricingHero() {
  const t = useTranslations('pricing.hero');

  const highlights = [
    {
      icon: Zap,
      text: t('highlights.noSetupFees')
    },
    {
      icon: Shield,
      text: t('highlights.cancelAnytime')
    },
    {
      icon: TrendingUp,
      text: t('highlights.freeTrial')
    }
  ];

  return (
    <section className="w-full bg-gradient-to-b from-primary/5 to-background py-20">
      <div className="max-w-4xl mx-auto px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Typography variant="display" as="h1" align="center" className="mb-6">
            {t('title')}
          </Typography>
          <Typography variant="subtitle" align="center" className="text-muted-foreground mb-8 max-w-2xl mx-auto">
            {t('subtitle')}
          </Typography>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-8 mt-12"
        >
          {highlights.map((highlight, index) => (
            <div key={index} className="flex items-center gap-2">
              <div className="p-2 bg-primary/10 rounded-lg">
                <highlight.icon className="w-5 h-5 text-primary" />
              </div>
              <Typography variant="body" className="font-medium">
                {highlight.text}
              </Typography>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
