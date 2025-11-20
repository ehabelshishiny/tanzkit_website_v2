'use client';

import { motion } from 'framer-motion';
import { Mail, Phone, MapPin } from 'lucide-react';
import { useTranslations } from 'next-intl';

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
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            {t('title')}
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            {t('subtitle')}
          </p>
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
            <h3 className="font-semibold mb-2">{t('emailUs')}</h3>
            <p className="text-muted-foreground">support@tranzkit.com</p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
              <Phone className="w-8 h-8 text-primary" />
            </div>
            <h3 className="font-semibold mb-2">{t('callUs')}</h3>
            <p className="text-muted-foreground">+1 (555) 123-4567</p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
              <MapPin className="w-8 h-8 text-primary" />
            </div>
            <h3 className="font-semibold mb-2">{t('visitUs')}</h3>
            <p className="text-muted-foreground">Dubai, UAE</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

