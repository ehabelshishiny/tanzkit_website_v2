'use client';

import { motion, useInView, useMotionValue, useSpring } from 'framer-motion';
import { useEffect, useRef } from 'react';
import { Typography } from '@/components/ui/typography';
import { LucideIcon } from 'lucide-react';

interface ImpactTileProps {
  value: number | string;
  suffix?: string;
  prefix?: string;
  label: string;
  icon: LucideIcon;
  variant?: 'primary' | 'secondary' | 'accent' | 'success';
  animateOnScroll?: boolean;
  delay?: number;
}

const variantClasses = {
  primary: 'bg-primary',
  secondary: 'bg-secondary',
  accent: 'bg-accent',
  success: 'bg-success',
};

export function ImpactTile({
  value,
  suffix = '',
  prefix = '',
  label,
  icon: Icon,
  variant = 'primary',
  animateOnScroll = true,
  delay = 0,
}: ImpactTileProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const motionValue = useMotionValue(0);
  const springValue = useSpring(motionValue, { duration: 2000 });
  const displayValue = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (isInView && animateOnScroll && typeof value === 'number') {
      motionValue.set(value);
    }
  }, [isInView, value, motionValue, animateOnScroll]);

  useEffect(() => {
    if (typeof value === 'number' && animateOnScroll) {
      const unsubscribe = springValue.on('change', (latest) => {
        if (displayValue.current) {
          displayValue.current.textContent = Math.round(latest).toString();
        }
      });
      return () => unsubscribe();
    }
  }, [springValue, value, animateOnScroll]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.6, delay }}
      whileHover={{ scale: 1.05 }}
      className={`relative rounded-2xl p-8 md:p-10 text-center overflow-hidden group cursor-default ${variantClasses[variant]}`}
    >
      {/* Dot pattern overlay */}
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
          backgroundSize: '24px 24px'
        }}
      />

      {/* Content */}
      <div className="relative z-10">
        {/* Icon */}
        <motion.div
          initial={{ scale: 0 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: delay + 0.2, type: 'spring', bounce: 0.5 }}
          className="mb-6"
        >
          <Icon className="w-8 h-8 md:w-10 md:h-10 text-primary-foreground mx-auto" />
        </motion.div>

        {/* Metric Value */}
        <Typography variant="display" as="div" className="text-primary-foreground mb-4">
          {prefix}
          {typeof value === 'number' && animateOnScroll ? (
            <span ref={displayValue}>0</span>
          ) : (
            <span>{value}</span>
          )}
          {suffix}
        </Typography>

        {/* Label */}
        <Typography variant="subtitle" className="text-primary-foreground opacity-90">
          {label}
        </Typography>
      </div>
    </motion.div>
  );
}
