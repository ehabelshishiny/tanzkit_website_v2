'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { useLocale } from 'next-intl';
import { cn } from '@/lib/utils';
import { ArrowRight } from 'lucide-react';
import type { IconName } from '@/config/apps';

interface AppCardProps {
  id: string;
  name: string;
  tagline: string;
  description: string;
  iconName: IconName;
  image?: string;
  appType?: 'mobile' | 'desktop';
  gradient: string;
  accentColor: string;
  use3D?: boolean;
  use3DVariant?: boolean;
}

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.0, 0.0, 0.2, 1.0] as const,
    },
  },
};

// Light gradient backgrounds for each card based on app ID
const cardGradients: Record<string, string> = {
  'rider-app': 'bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50',
  'driver-app': 'bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50',
  'operator-dashboard': 'bg-gradient-to-br from-amber-50 via-orange-50 to-rose-50',
  'enterprise-dashboard': 'bg-gradient-to-br from-violet-50 via-purple-50 to-fuchsia-50',
  'rider-web': 'bg-gradient-to-br from-sky-50 via-blue-50 to-indigo-50',
};

export function AppCard({
  id,
  name,
  tagline,
  description,
  image,
  appType = 'mobile',
}: AppCardProps) {
  const locale = useLocale();
  const href = `/${locale}/apps/${id}`;
  
  // Get the gradient for this specific card, fallback to a default
  const cardGradient = cardGradients[id] || 'bg-gradient-to-br from-slate-50 via-gray-50 to-zinc-50';

  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-50px' }}
      whileHover={{ scale: 1.02, y: -4 }}
      className="h-full"
    >
           <Link
        href={href}
        className={cn(
          'block h-full rounded-2xl overflow-hidden',
          'border border-gray-200/80',
          'shadow-lg hover:shadow-xl hover:border-gray-300',
          'transition-all duration-300 group',
          cardGradient
        )}
      >
        {/* Image Section - With 3px padding */}
        {image && (
          <div className="p-[6px] pt-[7px]">
            <div className="relative w-full h-80 overflow-hidden rounded-xl">
              <Image
                src={image}
                alt={name}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
              {/* Subtle gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
            </div>
          </div>
        )}

        {/* Content - Light theme optimized */}
        <div className="relative p-6">

          {/* Title */}
          <h3 className="text-2xl font-bold text-gray-900 mb-2 group-hover:text-gray-700 transition-colors">
            {name}
          </h3>

          {/* Tagline */}
          <p className="text-sm font-medium text-gray-600 mb-4">
            {tagline}
          </p>

          {/* Description */}
          <p className="text-gray-700 leading-relaxed mb-6 line-clamp-3">
            {description}
          </p>

          {/* CTA Button */}
          <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-gray-900 hover:bg-gray-800 text-white font-medium text-sm transition-all group-hover:gap-3">
            <span>Learn More</span>
            <ArrowRight className="w-4 h-4" />
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
