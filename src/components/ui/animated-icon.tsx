'use client';

import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { ReactNode } from 'react';

interface AnimatedIconProps {
  children: ReactNode;
  animation?: 'bounce' | 'pulse' | 'spin' | 'float' | 'none';
  hoverAnimation?: 'scale' | 'rotate' | 'shake' | 'none';
  color?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  delay?: number;
  className?: string;
}

const sizeVariants = {
  sm: 'w-8 h-8',
  md: 'w-12 h-12',
  lg: 'w-16 h-16',
  xl: 'w-20 h-20',
};

const animationVariants = {
  bounce: {
    y: [0, -10, 0],
    transition: {
      duration: 2,
      repeat: Infinity,
    },
  },
  pulse: {
    scale: [1, 1.1, 1],
    transition: {
      duration: 2,
      repeat: Infinity,
    },
  },
  spin: {
    rotate: 360,
    transition: {
      duration: 3,
      repeat: Infinity,
    },
  },
  float: {
    y: [0, -15, 0],
    transition: {
      duration: 3,
      repeat: Infinity,
    },
  },
  none: {},
};

const hoverAnimationVariants = {
  scale: { scale: 1.2 },
  rotate: { rotate: 15 },
  shake: {
    x: [-5, 5, -5, 5, 0],
    transition: { duration: 0.5 },
  },
  none: {},
};

export function AnimatedIcon({
  children,
  animation = 'none',
  hoverAnimation = 'scale',
  color = '#3B82F6',
  size = 'md',
  delay = 0,
  className,
}: AnimatedIconProps) {
  return (
    <motion.div
      animate={animationVariants[animation]}
      whileHover={hoverAnimationVariants[hoverAnimation]}
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ delay }}
      className={cn(
        'flex items-center justify-center',
        sizeVariants[size],
        className
      )}
      style={{ color }}
    >
      {children}
    </motion.div>
  );
}

