'use client';

import { motion } from 'framer-motion';
import { Mail, Phone, MapPin } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { Typography } from '@/components/ui/typography';

export function ContactHero() {
  const t = useTranslations('contact.hero');

  return (
    <section className="w-full bg-gradient-to-b from-primary/5 to-background py-20">
      <div className="max-w-6xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <Typography variant="display" as="h1" align="center" className="mb-6">
            {t('title')}
          </Typography>
          <Typography variant="subtitle" align="center" className="text-muted-foreground max-w-2xl mx-auto">
            {t('subtitle')}
          </Typography>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid md:grid-cols-3 gap-8"
        >
          <div className="text-center">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
              <Mail className="w-8 h-8 text-primary" />
            </div>
            <Typography variant="h4" align="center" className="font-semibold mb-2">
              {t('emailUs')}
            </Typography>
            <Typography variant="body" align="center" className="text-muted-foreground">
              {t('contactInfo.email')}
            </Typography>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
              <Phone className="w-8 h-8 text-primary" />
            </div>
            <Typography variant="h4" align="center" className="font-semibold mb-2">
              {t('callUs')}
            </Typography>
            <Typography variant="body" align="center" className="text-muted-foreground">
              {t('contactInfo.phone')}
            </Typography>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
              <MapPin className="w-8 h-8 text-primary" />
            </div>
            <Typography variant="h4" align="center" className="font-semibold mb-2">
              {t('visitUs')}
            </Typography>
            <Typography variant="body" align="center" className="text-muted-foreground">
              {t('contactInfo.location')}
            </Typography>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
