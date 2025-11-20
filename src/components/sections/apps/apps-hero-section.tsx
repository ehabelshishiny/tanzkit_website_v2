'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { AnimatedGradientBackground } from '@/components/ui/animated-gradient-background';
import { ArrowDown } from 'lucide-react';
import { fadeInUp } from '@/lib/animation-variants';

export function AppsHeroSection() {
  const t = useTranslations('apps.main.hero');

  const scrollToShowcase = () => {
    const showcaseSection = document.getElementById('apps-showcase');
    if (showcaseSection) {
      showcaseSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <AnimatedGradientBackground variant="vibrant" className="min-h-[70vh] flex items-center">
      <div className="container mx-auto px-4 py-20">
        <div className="max-w-4xl mx-auto text-center">
          {/* Animated Headline */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeInUp}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 text-foreground">
              {t('title')}
            </h1>
          </motion.div>

          {/* Subtitle */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeInUp}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <p className="text-lg md:text-xl text-muted-foreground mb-12 max-w-3xl mx-auto leading-relaxed">
              {t('subtitle')}
            </p>
          </motion.div>

          {/* Scroll indicator */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeInUp}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="flex justify-center"
          >
            <button
              onClick={scrollToShowcase}
              className="group flex flex-col items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
              aria-label="Scroll to apps showcase"
            >
              <span className="text-sm font-medium">{t('cta')}</span>
              <motion.div
                animate={{ y: [0, 8, 0] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
              >
                <ArrowDown className="w-6 h-6" />
              </motion.div>
            </button>
          </motion.div>
        </div>
      </div>
    </AnimatedGradientBackground>
  );
}

