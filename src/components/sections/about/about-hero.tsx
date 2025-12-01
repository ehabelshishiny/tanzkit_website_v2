'use client';

import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';

export function AboutHero() {
  const t = useTranslations('about.hero');

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
          className="grid grid-cols-3 gap-8 mt-12"
        >
          <div>
            <div className="text-4xl font-bold text-primary mb-2">
              {t('stats.enterprises.value')}
            </div>
            <div className="text-muted-foreground">
              {t('stats.enterprises.label')}
            </div>
          </div>
          <div>
            <div className="text-4xl font-bold text-primary mb-2">
              {t('stats.drivers.value')}
            </div>
            <div className="text-muted-foreground">
              {t('stats.drivers.label')}
            </div>
          </div>
          <div>
            <div className="text-4xl font-bold text-primary mb-2">
              {t('stats.trips.value')}
            </div>
            <div className="text-muted-foreground">
              {t('stats.trips.label')}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
