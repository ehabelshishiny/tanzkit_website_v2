'use client';

import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Typography } from '@/components/ui/typography';

interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  description?: string;
  alignment?: 'left' | 'center' | 'right';
  titleSize?: 'sm' | 'md' | 'lg' | 'xl';
  accentColor?: string;
  className?: string;
}

const alignmentMap = {
  left: 'left' as const,
  center: 'center' as const,
  right: 'right' as const,
};

const titleSizeMap = {
  sm: 'h3' as const,
  md: 'h2' as const,
  lg: 'h2' as const,
  xl: 'h1' as const,
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
      className={cn('mb-12 md:mb-16', className)}
    >
      {subtitle && (
        <motion.div variants={itemVariants}>
          <Typography 
            variant="overline" 
            align={alignmentMap[alignment]}
            className="mb-4"
            style={{ color: accentColor }}
          >
            {subtitle}
          </Typography>
        </motion.div>
      )}
      
      <motion.div variants={itemVariants}>
        <Typography
          variant={titleSizeMap[titleSize]}
          align={alignmentMap[alignment]}
          className="font-bold leading-tight"
        >
          {title}
        </Typography>
      </motion.div>
      
      {description && (
        <motion.div variants={itemVariants}>
          <Typography
            variant="subtitle"
            align={alignmentMap[alignment]}
            className="mt-4 text-slate-600 dark:text-slate-300 max-w-3xl"
            style={alignment === 'center' ? { marginLeft: 'auto', marginRight: 'auto' } : {}}
          >
            {description}
          </Typography>
        </motion.div>
      )}
    </motion.div>
  );
}
