'use client';

import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { GradientButton } from '@/components/ui/gradient-button';
import { ArrowRight } from 'lucide-react';

export function EnterprisesHeroSection() {
  const t = useTranslations('solutions.enterprisesPassengers.hero');

  return (
    <section
      className="relative min-h-[70vh] flex items-center overflow-hidden bg-gradient-to-br from-[oklch(var(--brand-navy))] via-[oklch(var(--brand-ocean))] via-[oklch(var(--brand-emerald))] to-[oklch(var(--brand-lime))]"
    >
      {/* Dark overlay to ensure text visibility in both themes */}
      <div className="absolute inset-0 bg-black/40 dark:bg-slate-800/60" />

      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
          backgroundSize: '40px 40px'
        }} />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 py-20">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            {/* H1: Sora SemiBold 48px/56px (responsive: 32px/40px on mobile) */}
            <h1 className="text-white mb-6 drop-shadow-lg">
              {t('title')}
            </h1>
            {/* Subheading: Space Grotesk Medium 18px/24px */}
            <p className="subheading text-white/95 mb-8 drop-shadow-lg">
              {t('subtitle')}
            </p>
            <GradientButton
              href="/contact"
              size="lg"
              icon={<ArrowRight className="w-5 h-5" />}
              iconPosition="right"
              className="bg-white hover:bg-white/90 text-secondary button-text transition-colors duration-300"
            >
              {t('cta')}
            </GradientButton>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

