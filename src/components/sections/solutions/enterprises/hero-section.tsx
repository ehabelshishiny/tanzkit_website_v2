'use client';

import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { Typography } from '@/components/ui/typography';
import { GradientButton } from '@/components/ui/gradient-button';
import { RTLAwareArrow } from '@/components/ui/rtl-aware-arrow';

export function EnterprisesHeroSection() {
  const t = useTranslations('solutions.enterprisesPassengers.hero');

  return (
    <section
      className="relative min-h-[70vh] flex items-center overflow-hidden bg-gradient-to-br from-slate-50 via-blue-50/30 to-slate-50 dark:from-slate-950 dark:via-blue-950/50 dark:to-slate-950"
    >
      {/* Animated grid with glow effect */}
      <div className="absolute inset-0 opacity-40 dark:opacity-30">
        <div 
          className="absolute inset-0 animate-gradient-shift"
          style={{
            backgroundImage: `
              linear-gradient(to right, rgb(59, 130, 246, 0.15) 1px, transparent 1px),
              linear-gradient(to bottom, rgb(59, 130, 246, 0.15) 1px, transparent 1px)
            `,
            backgroundSize: '80px 80px',
          }}
        />
        {/* Grid intersection glow points */}
        <div 
          className="absolute inset-0"
          style={{
            backgroundImage: `
              radial-gradient(circle at 0px 0px, rgb(59, 130, 246, 0.4) 1px, transparent 1px)
            `,
            backgroundSize: '80px 80px',
          }}
        />
      </div>

      {/* Floating particles - tech aesthetic */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Large particles */}
        <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-blue-500/60 rounded-full animate-float-slow" />
        <div className="absolute top-1/3 right-1/3 w-1.5 h-1.5 bg-cyan-500/60 rounded-full animate-float-slower" />
        <div className="absolute bottom-1/3 left-1/2 w-2.5 h-2.5 bg-blue-400/60 rounded-full animate-float-slow" style={{ animationDelay: '-3s' }} />
        <div className="absolute top-1/2 right-1/4 w-1.5 h-1.5 bg-sky-500/60 rounded-full animate-float-slower" style={{ animationDelay: '-7s' }} />
        <div className="absolute bottom-1/4 left-1/3 w-2 h-2 bg-indigo-500/60 rounded-full animate-float-slow" style={{ animationDelay: '-5s' }} />
        
        {/* Small particles */}
        <div className="absolute top-[20%] right-[45%] w-1 h-1 bg-blue-400/50 rounded-full animate-float-slower" style={{ animationDelay: '-2s' }} />
        <div className="absolute bottom-[35%] right-[30%] w-1 h-1 bg-cyan-400/50 rounded-full animate-float-slow" style={{ animationDelay: '-6s' }} />
        <div className="absolute top-[60%] left-[20%] w-1 h-1 bg-sky-400/50 rounded-full animate-float-slower" style={{ animationDelay: '-4s' }} />
      </div>

      {/* Glowing accent lines - tech corridors */}
      <div className="absolute inset-0 opacity-20 dark:opacity-15">
        {/* Horizontal glow line */}
        <div 
          className="absolute top-1/3 left-0 right-0 h-px animate-gradient-shift"
          style={{
            background: 'linear-gradient(90deg, transparent 0%, rgb(59, 130, 246, 0.6) 50%, transparent 100%)',
            backgroundSize: '200% 100%',
          }}
        />
        {/* Vertical glow line */}
        <div 
          className="absolute top-0 bottom-0 left-2/3 w-px animate-gradient-shift"
          style={{
            background: 'linear-gradient(180deg, transparent 0%, rgb(34, 211, 238, 0.6) 50%, transparent 100%)',
            backgroundSize: '100% 200%',
            animationDelay: '-7s',
          }}
        />
      </div>

      {/* Soft tech glow orbs */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-blue-500/10 dark:bg-blue-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-cyan-500/10 dark:bg-cyan-500/5 rounded-full blur-3xl" />
      </div>

      {/* Subtle scan line effect */}
      <div className="absolute inset-0 opacity-[0.02] dark:opacity-[0.03]">
        <div 
          className="absolute inset-0"
          style={{
            backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, currentColor 2px, currentColor 4px)',
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 w-full px-4 py-20">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <Typography variant="h1" className="text-slate-900 dark:text-white mb-6">
              {t('title')}
            </Typography>
            <Typography variant="subtitle" className="text-slate-700 dark:text-slate-300 mb-8">
              {t('subtitle')}
            </Typography>
            <GradientButton
              href="/contact"
              size="lg"
              icon={<RTLAwareArrow className="w-5 h-5" />}
              iconPosition="right"
              className="bg-white hover:bg-white/90 text-secondary button-text transition-colors duration-300 shadow-xl"
            >
              {t('cta')}
            </GradientButton>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
