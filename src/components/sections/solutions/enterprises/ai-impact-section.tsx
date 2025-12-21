'use client';

import { Typography } from '@/components/ui/typography';
import { SectionContainer } from '@/components/ui/section-container';
import { FramerMetricCard } from '../operators/framer-metric-card';
import { Brain, TrendingDown, Clock, Heart, Route } from 'lucide-react';
import { motion } from 'framer-motion';

interface EnterprisesAiImpactSectionProps {
  data?: {
    title?: string;
    subtitle?: string;
    impactTitle?: string;
    metrics?: Array<{
      value?: string;
      label?: string;
      description?: string;
    }>;
  };
}

export function EnterprisesAiImpactSection({ data }: EnterprisesAiImpactSectionProps) {
  // Render empty if no data to maintain consistent structure
  if (!data) return <section className="w-full max-w-7xl mx-auto px-4 py-16" />;

  return (
    <>
      {/* AI Advantage Section - Redesigned */}
      <SectionContainer
        background="dark"
        padding="xl"
        maxWidth="2xl"
      >
        <div className="relative">
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-[0.04] dark:opacity-[0.02] pointer-events-none">
            <div 
              className="absolute inset-0" 
              style={{
                backgroundImage: `
                  linear-gradient(to right, currentColor 1px, transparent 1px),
                  linear-gradient(to bottom, currentColor 1px, transparent 1px)
                `,
                backgroundSize: '40px 40px',
                maskImage: 'linear-gradient(to bottom, transparent 0%, black 10%, black 90%, transparent 100%)',
                WebkitMaskImage: 'linear-gradient(to bottom, transparent 0%, black 10%, black 90%, transparent 100%)'
              }} 
            />
          </div>

          {/* Subtle background decoration */}
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 0.03 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2 }}
            className="absolute -top-20 -right-20 w-96 h-96 bg-gradient-to-br from-primary/20 to-accent/20 rounded-full blur-3xl pointer-events-none"
          />
          
          <div className="flex flex-col items-center text-center gap-8 relative z-10">
            {/* Icon with enhanced animations */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="relative"
            >
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                className="w-24 h-24 bg-gradient-to-br from-primary via-accent to-primary rounded-2xl flex items-center justify-center shadow-xl shadow-primary/20"
              >
                <Brain className="w-12 h-12 text-white dark:text-primary-foreground" strokeWidth={1.5} />
              </motion.div>
              
              {/* Subtle pulse animation */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ 
                  opacity: [0.4, 0.6, 0.4],
                  scale: [1, 1.1, 1]
                }}
                transition={{ 
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="absolute inset-0 bg-gradient-to-br from-primary to-accent rounded-2xl -z-10 blur-xl"
              />
            </motion.div>

            {/* Title with staggered animation */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="max-w-3xl"
            >
              <Typography variant="h2" className="text-foreground mb-6 bg-gradient-to-r from-foreground via-foreground/90 to-foreground/80 bg-clip-text">
                {data.title}
              </Typography>

              {/* Description with emphasis */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.5 }}
              >
                <Typography variant="subtitle" className="text-foreground/70 font-light">
                  {data.subtitle}
                </Typography>
              </motion.div>
            </motion.div>

            {/* Decorative line element */}
            <motion.div
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.7 }}
              className="w-24 h-0.5 bg-gradient-to-r from-transparent via-primary/50 to-transparent"
            />
          </div>
        </div>
      </SectionContainer>

      {/* Impact Metrics Section - Advanced Framer Motion */}
      <section className="relative py-20 md:py-28 overflow-hidden bg-gradient-to-br from-slate-50 via-blue-50/30 to-slate-50 dark:from-slate-950 dark:via-blue-950/50 dark:to-slate-950">
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

        <div className="relative z-10 w-full px-4 max-w-7xl mx-auto">
          {/* Section Title */}
          {data.impactTitle && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <Typography variant="h2" className="text-slate-900 dark:text-white drop-shadow-sm">
                {data.impactTitle}
              </Typography>
            </motion.div>
          )}

          {/* Impact Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {data.metrics?.filter(metric => metric.value && metric.label).map((metric, index) => {
              const icons = [TrendingDown, Clock, Heart, Route];
              const variants = ['secondary', 'primary', 'accent', 'success'] as const;
              const Icon = icons[index % icons.length];
              const variant = variants[index % variants.length];

              return (
                <FramerMetricCard
                  key={index}
                  value={metric.value!}
                  label={metric.label!}
                  icon={Icon}
                  variant={variant}
                  delay={index * 0.15}
                />
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}
