'use client';

import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  description?: string;
  alignment?: 'left' | 'center' | 'right';
  titleSize?: 'sm' | 'md' | 'lg' | 'xl';
  accentColor?: string;
  className?: string;
}

const alignmentVariants = {
  left: 'text-left',
  center: 'text-center',
  right: 'text-right',
};

const titleSizeVariants = {
  sm: 'text-2xl md:text-3xl',
  md: 'text-3xl md:text-4xl',
  lg: 'text-4xl md:text-5xl',
  xl: 'text-5xl md:text-6xl',
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
    },
  },
};

export function SectionHeader({
  title,
  subtitle,
  description,
  alignment = 'center',
  titleSize = 'lg',
  accentColor,
  className,
}: SectionHeaderProps) {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-100px' }}
      className={cn('mb-12 md:mb-16', alignmentVariants[alignment], className)}
    >
      {subtitle && (
        <motion.p
          variants={itemVariants}
          className="text-sm md:text-base font-semibold uppercase tracking-wider mb-4"
          style={{ color: accentColor }}
        >
          {subtitle}
        </motion.p>
      )}
      
      <motion.h2
        variants={itemVariants}
        className={cn(
          'font-bold leading-tight',
          titleSizeVariants[titleSize]
        )}
      >
        {title}
      </motion.h2>
      
      {description && (
        <motion.p
          variants={itemVariants}
          className="mt-4 text-lg md:text-xl text-slate-600 dark:text-slate-300 max-w-3xl"
          style={alignment === 'center' ? { marginLeft: 'auto', marginRight: 'auto' } : {}}
        >
          {description}
        </motion.p>
      )}
    </motion.div>
  );
}

