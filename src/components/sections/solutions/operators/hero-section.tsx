'use client';

import { motion } from 'framer-motion';
import { Typography } from '@/components/ui/typography';
import { GradientButton } from '@/components/ui/gradient-button';
import { RTLAwareArrow } from '@/components/ui/rtl-aware-arrow';

interface OperatorsHeroSectionProps {
  data?: {
    title?: string;
    subtitle?: string;
    cta?: string;
  };
}

export function OperatorsHeroSection({ data }: OperatorsHeroSectionProps) {
  // Provide default values to prevent hydration mismatches
  const title = data?.title || '';
  const subtitle = data?.subtitle || '';
  const cta = data?.cta || '';

  return (
    <section
      className="relative min-h-[60vh] flex items-center overflow-hidden"
      style={{
        background: `
          linear-gradient(135deg, 
            oklch(0.95 0.02 250) 0%, 
            oklch(0.96 0.03 240) 25%, 
            oklch(0.96 0.03 165) 50%, 
            oklch(0.97 0.03 130) 75%, 
            oklch(0.96 0.02 240) 100%
          )
        `
      }}
    >
      {/* Animated brand gradient overlay - flowing colors */}
      <div className="absolute inset-0 opacity-60 dark:opacity-30">
        <div 
          className="absolute inset-0 animate-gradient-shift"
          style={{
            background: `
              linear-gradient(
                45deg,
                oklch(0.90 0.05 250) 0%,
                oklch(0.92 0.07 240) 25%,
                oklch(0.93 0.07 165) 50%,
                oklch(0.94 0.08 130) 75%,
                oklch(0.92 0.06 240) 100%
              )
            `,
            backgroundSize: '400% 400%',
          }}
        />
      </div>

      {/* Brand color orbs - navy, ocean, emerald, lime */}
      <div className="absolute inset-0">
        {/* Navy orb - top left */}
        <div 
          className="absolute -top-20 -left-20 w-96 h-96 rounded-full blur-3xl opacity-20 dark:opacity-15 animate-float-slow"
          style={{ backgroundColor: 'oklch(0.75 0.08 250)' }}
        />
        {/* Ocean orb - center right */}
        <div 
          className="absolute top-1/2 -right-32 w-[500px] h-[500px] rounded-full blur-3xl opacity-25 dark:opacity-20 animate-float-slower"
          style={{ backgroundColor: 'oklch(0.80 0.10 240)' }}
        />
        {/* Emerald orb - bottom left */}
        <div 
          className="absolute -bottom-32 left-1/4 w-[450px] h-[450px] rounded-full blur-3xl opacity-20 dark:opacity-15 animate-float-slow"
          style={{ backgroundColor: 'oklch(0.82 0.10 165)', animationDelay: '-7s' }}
        />
        {/* Lime orb - top center */}
        <div 
          className="absolute -top-24 left-1/2 w-80 h-80 rounded-full blur-3xl opacity-15 dark:opacity-10 animate-float-slower"
          style={{ backgroundColor: 'oklch(0.88 0.10 130)', animationDelay: '-3s' }}
        />
      </div>

      {/* Dark mode - Deep blue gradient - MOVED BEFORE PATTERN */}
      <div className="absolute inset-0 opacity-0 dark:opacity-100 bg-gradient-to-br dark:from-blue-950 dark:via-slate-900 dark:to-blue-900" />

      {/* Brand-colored wave pattern - Light mode */}
      <div className="absolute inset-0 opacity-[0.08] dark:opacity-0">
        <div 
          className="absolute inset-0"
          style={{
            backgroundImage: `
              repeating-linear-gradient(
                45deg,
                oklch(0.52 0.12 240) 0px,
                transparent 2px,
                transparent 20px,
                oklch(0.65 0.12 165) 22px,
                transparent 24px,
                transparent 44px
              )
            `,
          }}
        />
      </div>

      {/* Grey wave pattern - Dark mode only */}
      <div className="absolute inset-0 opacity-0 dark:opacity-[0.15]">
        <div 
          className="absolute inset-0"
          style={{
            backgroundImage: `
              repeating-linear-gradient(
                45deg,
                rgb(100, 116, 139) 0px,
                transparent 2px,
                transparent 20px,
                rgb(71, 85, 105) 22px,
                transparent 24px,
                transparent 44px
              )
            `,
          }}
        />
      </div>

      {/* Overlay for text contrast */}
      <div className="absolute inset-0 bg-white/10 dark:bg-black/30" />

      {/* Content */}
      <div className="relative z-10 w-full px-4 sm:px-6 md:px-8 py-20">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <Typography variant="h1" className="text-slate-900 dark:text-white mb-6 drop-shadow-sm">
              {title}
            </Typography>
            <Typography variant="subtitle" className="text-slate-800 dark:text-white/95 mb-8 drop-shadow-sm">
              {subtitle}
            </Typography>
            <GradientButton
              href="/contact"
              size="lg"
              icon={<RTLAwareArrow className="w-5 h-5" />}
              iconPosition="right"
              className="bg-white hover:bg-white/90 text-secondary button-text transition-colors duration-300 shadow-lg"
            >
              {cta}
            </GradientButton>
          </motion.div>
        </div>
        </div>
      </div>
    </section>
  );
}
