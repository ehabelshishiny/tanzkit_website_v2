'use client';

import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { Typography } from '@/components/ui/typography';

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
          className="grid grid-cols-3 gap-8 mt-12"
        >
          <div>
            <Typography variant="h1" className="text-primary mb-2">
              {t('stats.enterprises.value')}
            </Typography>
            <Typography variant="body" className="text-muted-foreground">
              {t('stats.enterprises.label')}
            </Typography>
          </div>
          <div>
            <Typography variant="h1" className="text-primary mb-2">
              {t('stats.drivers.value')}
            </Typography>
            <Typography variant="body" className="text-muted-foreground">
              {t('stats.drivers.label')}
            </Typography>
          </div>
          <div>
            <Typography variant="h1" className="text-primary mb-2">
              {t('stats.trips.value')}
            </Typography>
            <Typography variant="body" className="text-muted-foreground">
              {t('stats.trips.label')}
            </Typography>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
