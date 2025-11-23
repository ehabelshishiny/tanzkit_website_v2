'use client';

import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { fadeInUp } from '@/lib/animation-variants';
import { getIconComponent } from '@/lib/icon-mapper';
import type { IconName } from '@/config/apps';

interface AppDetailHeroProps {
  title: string;
  subtitle: string;
  iconName: IconName;
  gradient: string;
  accentColor: string;
}

export function AppDetailHero({
  title,
  subtitle,
  iconName,
  gradient,
  accentColor,
}: AppDetailHeroProps) {
  const Icon = getIconComponent(iconName);
  return (
    <section
      className={cn(
        'relative w-full min-h-[60vh] flex items-center overflow-hidden',
        'bg-gradient-to-br',
        gradient
      )}
    >
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div
          className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full blur-3xl opacity-30 animate-float-slow"
          style={{ backgroundColor: accentColor }}
        />
        <div
          className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full blur-3xl opacity-20 animate-float-slower"
          style={{ backgroundColor: accentColor }}
        />
      </div>

      {/* Grid pattern overlay */}
      <div
        className="absolute inset-0 opacity-[0.02] dark:opacity-[0.05]"
        style={{
          backgroundImage: `linear-gradient(to right, currentColor 1px, transparent 1px),
                           linear-gradient(to bottom, currentColor 1px, transparent 1px)`,
          backgroundSize: '4rem 4rem',
        }}
      />

      {/* Content */}
      <div className="relative z-10 w-full px-4 py-20">
        <div className="max-w-4xl mx-auto text-center">
          {/* App Icon */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeInUp}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="flex justify-center mb-8"
          >
            <div
              className="w-24 h-24 md:w-32 md:h-32 rounded-3xl flex items-center justify-center bg-card/80 backdrop-blur-sm shadow-2xl"
              style={{ color: accentColor }}
            >
              <Icon className="w-12 h-12 md:w-16 md:h-16" />
            </div>
          </motion.div>

          {/* Title */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeInUp}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-foreground">
              {title}
            </h1>
          </motion.div>

          {/* Subtitle */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeInUp}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              {subtitle}
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

