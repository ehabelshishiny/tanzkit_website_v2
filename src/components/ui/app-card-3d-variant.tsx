'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { useLocale } from 'next-intl';
import { ArrowRight } from 'lucide-react';
import { CardContainer, CardBody, CardItem } from './3d-card';
import { getLucideIcon } from '@/lib/lucide-icons';

interface AppCard3DVariantProps {
  id: string;
  name: string;
  tagline: string;
  description: string;
  iconName: string;
  image?: string;
  appType?: 'mobile' | 'desktop';
  gradient: string;
  accentColor: string;
}

export function AppCard3DVariant({
  id,
  name,
  tagline,
  description,
  iconName,
  image,
  appType = 'mobile',
  gradient,
  accentColor,
}: AppCard3DVariantProps) {
  const locale = useLocale();
  const href = `/${locale}/apps/${id}`;
  const Icon = getLucideIcon(iconName, 'Smartphone');

  // Determine image aspect ratio and card dimensions based on app type
  // Desktop apps: 16:9 aspect ratio for landscape 1920x1080 desktop screenshots
  // Mobile apps: 9:16 aspect ratio for portrait mobile phone screenshots (matches Supervisor detail page carousel)
  // Mobile apps use max-width to limit image size and prevent excessive height
  const imageAspect = appType === 'desktop' ? 'aspect-[16/9]' : 'aspect-[9/16]';
  const imageMaxWidth = appType === 'desktop' ? 'max-w-full' : 'max-w-sm mx-auto';
  const cardWidth = 'w-full';
  const cardHeight = 'h-auto';
  
  // Card scaling controls - adjust these values to change card sizes independently
  const desktopScale = 'scale-[0.86]';  // Desktop card scale (0.85 = 15% smaller)
  const mobileScale = 'scale-[0.9]';   // Mobile card scale (0.85 = 15% smaller)

  return (
    <CardContainer className={`inter-var ${appType === 'desktop' ? desktopScale : mobileScale}`} containerClassName="py-2 w-full">
      <CardBody className={`bg-gray-50 relative group/card dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] dark:bg-black dark:border-white/[0.2] border-black/[0.1] ${cardWidth} ${cardHeight} rounded-xl p-4 border`}>
        <Link href={href} className="block">
          {/* Title */}
          <CardItem
            translateZ="50"
            className="text-xl font-bold text-neutral-600 dark:text-white"
          >
            {name}
          </CardItem>

          {/* Tagline */}
          <CardItem
            as="p"
            translateZ="60"
            className="text-neutral-500 text-sm max-w-sm mt-2 dark:text-neutral-300"
          >
            {tagline}
          </CardItem>

          {/* Image or Icon Placeholder */}
          <CardItem translateZ="100" className={`w-full mt-4 ${imageMaxWidth}`}>
            {image ? (
              <Image
                src={image}
                height={1000}
                width={1000}
                className={`${imageAspect} w-full object-cover rounded-xl group-hover/card:shadow-xl`}
                alt={name}
              />
            ) : (
              <div className={`${imageAspect} w-full rounded-xl bg-gradient-to-br from-muted/50 to-muted flex items-center justify-center group-hover/card:shadow-xl`}>
                <Icon className="w-16 h-16 opacity-20" style={{ color: accentColor }} />
              </div>
            )}
          </CardItem>

          {/* Description */}
          <CardItem
            translateZ="60"
            as="p"
            className="text-neutral-500 text-sm mt-4 dark:text-neutral-300"
          >
            {description}
          </CardItem>

          {/* CTA Buttons */}
          <div className="flex justify-between items-center mt-8">
            <CardItem
              translateZ={20}
              as="span"
              className="px-4 py-2 rounded-xl text-xs font-normal dark:text-white flex items-center gap-2"
              style={{ color: accentColor }}
            >
              Learn More
              <ArrowRight className="w-4 h-4" />
            </CardItem>
            <CardItem
              translateZ={20}
              as="span"
              className="px-4 py-2 rounded-xl text-white text-xs font-bold"
              style={{ backgroundColor: accentColor }}
            >
              Get Started
            </CardItem>
          </div>
        </Link>
      </CardBody>
    </CardContainer>
  );
}
