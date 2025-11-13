'use client';

import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { ReactNode } from 'react';

interface BenefitItem {
  id: string;
  title: string;
  description?: string;
  icon?: ReactNode;
}

interface BenefitsListProps {
  items: BenefitItem[];
  columns?: 1 | 2 | 3 | 4;
  iconColor?: string;
  layout?: 'compact' | 'spacious';
  animationDelay?: number;
  className?: string;
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
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

const columnVariants = {
  1: 'grid-cols-1',
  2: 'grid-cols-1 md:grid-cols-2',
  3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
  4: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4',
};

export function BenefitsList({
  items,
  columns = 4,
  iconColor = '#3B82F6',
  layout = 'compact',
  animationDelay = 0,
  className,
}: BenefitsListProps) {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-100px' }}
      className={cn(
        'grid gap-4 md:gap-6',
        columnVariants[columns],
        className
      )}
    >
      {items.map((item, index) => (
        <motion.div
          key={item.id}
          variants={itemVariants}
          custom={index}
          className={cn(
            'flex gap-4 items-center',
            layout === 'spacious' && 'p-6 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700'
          )}
        >
          {item.icon && (
            <div
              className="flex-shrink-0 w-12 h-12 flex items-center justify-center rounded-lg"
              style={{ backgroundColor: `${iconColor}20`, color: iconColor }}
            >
              {item.icon}
            </div>
          )}

          <div className="flex-1">
            <h4 className="font-semibold text-base md:text-lg mb-1">
              {item.title}
            </h4>
            {item.description && (
              <p className="text-sm md:text-base text-slate-600 dark:text-slate-300">
                {item.description}
              </p>
            )}
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
}

