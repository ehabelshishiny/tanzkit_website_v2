'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { useLocale } from 'next-intl';
import { cn } from '@/lib/utils';
import { ArrowRight } from 'lucide-react';
import { getIconComponent } from '@/lib/icon-mapper';
import Atropos from 'atropos/react';
import 'atropos/css';
import type { IconName } from '@/config/apps';

interface AppCardBentoProps {
  id: string;
  name: string;
  tagline: string;
  description: string;
  iconName: IconName;
  image?: string;
  appType?: 'mobile' | 'desktop';
  gradient: string;
  accentColor: string;
  layoutType: 'desktop-large' | 'mobile-tall' | 'mobile-wide' | 'mobile-small' | 'mobile-stack';
  useAtropos?: boolean;
}

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.0, 0.0, 0.2, 1.0] as const,
    },
  },
};

export function AppCardBento({
  id,
  name,
  tagline,
  description,
  iconName,
  image,
  appType = 'mobile',
  gradient,
  accentColor,
  layoutType,
  useAtropos = false,
}: AppCardBentoProps) {
  const locale = useLocale();
  const href = `/${locale}/apps/${id}`;
  const Icon = getIconComponent(iconName);

  // Determine if image should be landscape or portrait based on app type
  const imageAspect = appType === 'desktop' ? 'landscape' : 'portrait';

  // Layout-specific classes
  const getLayoutClasses = () => {
    switch (layoutType) {
      case 'desktop-large':
        return {
          container: 'h-full min-h-[400px]',
          image: 'h-48 md:h-56',
          content: 'p-6 md:p-8',
          imageClass: 'object-cover object-center',
        };
      case 'mobile-tall':
        return {
          container: 'h-full min-h-[400px]',
          image: 'h-56 md:h-64',
          content: 'p-5 md:p-6',
          imageClass: 'object-cover object-top',
        };
      case 'mobile-wide':
        return {
          container: 'h-full min-h-[280px]',
          image: 'h-32 md:h-40',
          content: 'p-5 md:p-6',
          imageClass: 'object-cover object-center',
        };
      case 'mobile-small':
        return {
          container: 'h-full min-h-[280px]',
          image: 'h-32 md:h-40',
          content: 'p-4 md:p-5',
          imageClass: 'object-cover object-top',
        };
      case 'mobile-stack':
        return {
          container: 'h-full min-h-[320px]',
          image: 'h-48',
          content: 'p-6',
          imageClass: 'object-cover object-center',
        };
      default:
        return {
          container: 'h-full',
          image: 'h-48',
          content: 'p-6',
          imageClass: 'object-cover',
        };
    }
  };

  const layoutClasses = getLayoutClasses();

  const CardContent = (
    <div
      className={cn(
        'relative overflow-hidden rounded-2xl h-full',
        'bg-gradient-to-br border border-border',
        'shadow-lg hover:shadow-2xl transition-all duration-300',
        'group flex flex-col',
        gradient,
        layoutClasses.container
      )}
    >
      {/* Image Section */}
      {image ? (
        <div className={cn('relative w-full', layoutClasses.image)} data-atropos-offset="5">
          <Image
            src={image}
            alt={name}
            fill
            className={layoutClasses.imageClass}
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
          {/* Gradient overlay for better text readability */}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background/20" />
        </div>
      ) : (
        <div
          className={cn(
            'relative w-full bg-muted/30 flex items-center justify-center',
            layoutClasses.image
          )}
        >
          <Icon className="w-16 h-16 opacity-20" style={{ color: accentColor }} />
        </div>
      )}

      {/* Content Section */}
      <div className={cn('flex-1 flex flex-col', layoutClasses.content)}>
        {/* Icon Badge */}
        <div className="mb-4" data-atropos-offset="3">
          <div
            className="w-12 h-12 md:w-14 md:h-14 rounded-xl flex items-center justify-center bg-card/90 backdrop-blur-sm shadow-md"
            style={{ color: accentColor }}
          >
            <Icon className="w-6 h-6 md:w-7 md:h-7" />
          </div>
        </div>

        {/* Title & Tagline */}
        <div className="mb-3 flex-1" data-atropos-offset="2">
          <h3 className="text-xl md:text-2xl font-bold text-foreground mb-1.5 line-clamp-1">
            {name}
          </h3>
          <p className="text-xs md:text-sm font-medium text-muted-foreground mb-2 line-clamp-1">
            {tagline}
          </p>
          <p className="text-sm text-muted-foreground leading-relaxed line-clamp-2 md:line-clamp-3">
            {description}
          </p>
        </div>

        {/* CTA */}
        <div
          className="flex items-center gap-2 text-sm font-medium group-hover:gap-3 transition-all mt-auto"
          data-atropos-offset="1"
        >
          <span style={{ color: accentColor }}>Learn More</span>
          <ArrowRight className="w-4 h-4" style={{ color: accentColor }} />
        </div>
      </div>
    </div>
  );

  // Wrap with Atropos for desktop cards only
  if (useAtropos && layoutType === 'desktop-large') {
    return (
      <motion.div
        variants={cardVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-50px' }}
        className="h-full"
      >
        <Link href={href} className="block h-full">
          <Atropos
            className="h-full atropos-card"
            activeOffset={40}
            shadowScale={1.05}
            rotateXMax={8}
            rotateYMax={8}
            shadow={false}
          >
            {CardContent}
          </Atropos>
        </Link>
      </motion.div>
    );
  }

  // Standard card with hover animation
  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-50px' }}
      whileHover={{ scale: 1.02, y: -4 }}
      className="h-full"
    >
      <Link href={href} className="block h-full">
        {CardContent}
      </Link>
    </motion.div>
  );
}
