'use client';

import { motion, useInView, useMotionValue, useSpring } from 'framer-motion';
import { useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';

interface MetricCardProps {
  value: number | string;
  suffix?: string;
  prefix?: string;
  label: string;
  description?: string;
  color?: string;
  animateOnScroll?: boolean;
  className?: string;
}

const cardVariants = {
  hidden: { opacity: 0, y: 48 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
    },
  },
};

export function MetricCard({
  value,
  suffix = '',
  prefix = '',
  label,
  description,
  color = '#3B82F6',
  animateOnScroll = true,
  className,
}: MetricCardProps) {
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
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-50px' }}
      className={cn(
        'bg-white dark:bg-slate-800 rounded-2xl p-6 md:p-8',
        'border border-slate-200 dark:border-slate-700',
        'text-center',
        className
      )}
    >
      <div className="text-4xl md:text-5xl lg:text-6xl font-bold mb-2" style={{ color }}>
        {prefix}
        {typeof value === 'number' && animateOnScroll ? (
          <span ref={displayValue}>0</span>
        ) : (
          <span>{value}</span>
        )}
        {suffix}
      </div>
      
      <h3 className="text-lg md:text-xl font-semibold mb-2">{label}</h3>
      
      {description && (
        <p className="text-sm md:text-base text-slate-600 dark:text-slate-300">
          {description}
        </p>
      )}
    </motion.div>
  );
}

