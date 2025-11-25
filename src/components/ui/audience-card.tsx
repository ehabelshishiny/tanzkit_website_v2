'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { ReactNode } from 'react';
import { ArrowRight } from 'lucide-react';

interface AudienceCardProps {
  title: string;
  description: string;
  benefits: string[];
  ctaText: string;
  ctaLink: string;
  icon?: ReactNode;
  gradient?: string;
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

export function AudienceCard({
  title,
  description,
  benefits,
  ctaText,
  ctaLink,
  icon,
  gradient = 'from-primary/10 to-accent/10',
  className,
}: AudienceCardProps) {
  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-50px' }}
      whileHover={{ scale: 1.03, y: -8 }}
      className={cn('h-full', className)}
    >
      <Link
        href={ctaLink}
        className={cn(
          'block h-full rounded-3xl p-8 md:p-10',
          'border border-border',
          'shadow-lg hover:shadow-2xl transition-all duration-300',
          'group',
          '[background:var(--card-gradient-light)] dark:[background:var(--card-gradient-dark)]',
          'relative overflow-hidden'
        )}
      >
        {/* Overlay gradient for accent color */}
        <div 
          className={cn(
            'absolute inset-0 bg-gradient-to-br opacity-10 -z-10',
            gradient
          )}
          aria-hidden="true"
        />
        
        {icon && (
          <div className="w-16 h-16 mb-6 flex items-center justify-center rounded-2xl bg-white/80 dark:bg-slate-800/80 relative z-10">
            {icon}
          </div>
        )}
        
        <h3 className="text-2xl md:text-3xl font-bold mb-4 relative z-10">{title}</h3>
        
        <p className="text-lg text-slate-700 dark:text-slate-300 mb-6 leading-relaxed relative z-10">
          {description}
        </p>
        
        <ul className="space-y-3 mb-8 relative z-10">
          {benefits.map((benefit, index) => (
            <li key={index} className="flex items-start gap-3">
              <span className="flex-shrink-0 w-6 h-6 rounded-full bg-green-500/20 flex items-center justify-center mt-0.5">
                <svg
                  className="w-4 h-4 text-green-600 dark:text-green-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </span>
              <span className="text-base text-slate-700 dark:text-slate-300">
                {benefit}
              </span>
            </li>
          ))}
        </ul>
        
        <div className="flex items-center gap-2 text-blue-600 dark:text-blue-400 font-semibold group-hover:gap-4 transition-all relative z-10">
          <span>{ctaText}</span>
          <ArrowRight className="w-5 h-5" />
        </div>
      </Link>
    </motion.div>
  );
}
