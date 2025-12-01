'use client';

import { motion } from 'framer-motion';
import { Smartphone, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useTranslations } from 'next-intl';

export function AppHero() {
  const t = useTranslations('apps.template.hero');

  return (
    <section className="w-full bg-gradient-to-b from-primary/5 to-background py-20">
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              {t('title')}
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              {t('subtitle')}
            </p>
            <div className="flex flex-wrap gap-4">
              <Button size="lg" className="gap-2">
                <Download className="w-5 h-5" />
                {t('buttons.appStore')}
              </Button>
              <Button size="lg" variant="outline" className="gap-2">
                <Download className="w-5 h-5" />
                {t('buttons.googlePlay')}
              </Button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex justify-center"
          >
            <div className="relative">
              <div className="w-64 h-[500px] bg-gradient-to-br from-primary/20 to-primary/5 rounded-3xl flex items-center justify-center shadow-2xl">
                <Smartphone className="w-32 h-32 text-primary/40" />
              </div>
              <div className="absolute -top-4 -right-4 w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center">
                <Download className="w-10 h-10 text-primary" />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
