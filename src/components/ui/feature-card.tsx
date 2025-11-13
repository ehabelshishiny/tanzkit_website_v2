'use client';

import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { ReactNode } from 'react';

interface FeatureCardProps {
  icon?: ReactNode;
  iconColor?: string;
  title: string;
  description: string;
  features?: string[];
  layout?: 'vertical' | 'horizontal';
  hoverEffect?: boolean;
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

export function FeatureCard({
  icon,
  iconColor = '#3B82F6',
  title,
  description,
  features,
  layout = 'vertical',
  hoverEffect = true,
  className,
}: FeatureCardProps) {
  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-50px' }}
      whileHover={hoverEffect ? { scale: 1.03, y: -4 } : {}}
      className={cn(
        'bg-white dark:bg-slate-800 rounded-2xl p-6 md:p-8',
        'border border-slate-200 dark:border-slate-700',
        'shadow-md hover:shadow-xl transition-shadow duration-300',
        layout === 'horizontal' && 'flex gap-6 items-start',
        className
      )}
    >
      {icon && (
        <div
          className={cn(
            'flex items-center justify-center rounded-xl',
            layout === 'vertical' ? 'w-16 h-16 mb-4' : 'w-12 h-12 flex-shrink-0'
          )}
          style={{ backgroundColor: `${iconColor}20`, color: iconColor }}
        >
          {icon}
        </div>
      )}
      
      <div className="flex-1">
        <h3 className="text-xl md:text-2xl font-bold mb-3">{title}</h3>
        <p className="text-slate-600 dark:text-slate-300 mb-4 leading-relaxed">
          {description}
        </p>
        
        {features && features.length > 0 && (
          <ul className="space-y-2">
            {features.map((feature, index) => (
              <li
                key={index}
                className="flex items-start gap-2 text-sm md:text-base text-slate-700 dark:text-slate-300"
              >
                <span className="text-lg mt-0.5" style={{ color: iconColor }}>
                  •
                </span>
                <span>{feature}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </motion.div>
  );
}

