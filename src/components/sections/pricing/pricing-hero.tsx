'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { Zap, Shield, TrendingUp } from 'lucide-react';

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
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            {t('title')}
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            {t('subtitle')}
          </p>
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
              <span className="font-medium">{highlight.text}</span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
