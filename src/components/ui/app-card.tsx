'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { useLocale } from 'next-intl';
import { cn } from '@/lib/utils';
import { ArrowRight } from 'lucide-react';
import { CardContainer, CardBody, CardItem } from './3d-card';
import { getIconComponent } from '@/lib/icon-mapper';
import { AppCard3DVariant } from './app-card-3d-variant';
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
  use3DVariant?: boolean; // New variant for Rider, Operator Dashboard, Enterprise Dashboard
}

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: 'easeOut',
    },
  },
};

export function AppCard({
  id,
  name,
  tagline,
  description,
  iconName,
  image,
  appType = 'mobile',
  gradient,
  accentColor,
  use3D = false,
  use3DVariant = false,
}: AppCardProps) {
  const locale = useLocale();
  const href = `/${locale}/apps/${id}`;
  const Icon = getIconComponent(iconName);

  // Use the new 3D variant for specific apps
  if (use3DVariant) {
    return (
      <AppCard3DVariant
        id={id}
        name={name}
        tagline={tagline}
        description={description}
        iconName={iconName}
        image={image}
        appType={appType}
        gradient={gradient}
        accentColor={accentColor}
      />
    );
  }

  if (use3D) {
    return (
      <CardContainer containerClassName="w-full h-full">
        <CardBody className="relative group/card w-full h-full">
          <Link href={href} className="block h-full">
            <CardItem
              translateZ="50"
              className={cn(
                'w-full h-full rounded-2xl overflow-hidden',
                'bg-gradient-to-br border border-border',
                'shadow-lg hover:shadow-2xl transition-shadow duration-300',
                gradient
              )}
            >
              {/* Image Section */}
              {image ? (
                <CardItem translateZ="70" className="relative w-full h-48 mb-6">
                  <Image
                    src={image}
                    alt={name}
                    fill
                    className="object-cover"
                  />
                </CardItem>
              ) : (
                <CardItem translateZ="70" className="relative w-full h-48 mb-6 bg-muted/30 flex items-center justify-center">
                  <Icon className="w-16 h-16 opacity-20" style={{ color: accentColor }} />
                </CardItem>
              )}

              {/* Content */}
              <div className="px-8 pb-8">
                {/* Icon */}
                <CardItem translateZ="80" className="mb-6">
                  <div
                    className="w-16 h-16 rounded-2xl flex items-center justify-center bg-card/80 backdrop-blur-sm shadow-lg"
                    style={{ color: accentColor }}
                  >
                    <Icon className="w-8 h-8" />
                  </div>
                </CardItem>

                {/* Title & Tagline */}
                <CardItem translateZ="60" className="mb-4">
                  <h3 className="text-2xl font-bold text-foreground mb-2">{name}</h3>
                  <p className="text-sm font-medium text-muted-foreground mb-4">{tagline}</p>
                </CardItem>

                {/* Description */}
                <CardItem translateZ="40" className="mb-6">
                  <p className="text-muted-foreground leading-relaxed">{description}</p>
                </CardItem>

                {/* CTA */}
                <CardItem translateZ="50" className="flex items-center gap-2 text-sm font-medium group-hover/card:gap-3 transition-all">
                  <span style={{ color: accentColor }}>Learn More</span>
                  <ArrowRight className="w-4 h-4" style={{ color: accentColor }} />
                </CardItem>
              </div>
            </CardItem>
          </Link>
        </CardBody>
      </CardContainer>
    );
  }

  // Standard card (non-3D)
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
          'bg-gradient-to-br border border-border',
          'shadow-lg hover:shadow-2xl transition-all duration-300',
          'group',
          gradient
        )}
      >
        {/* Image Section */}
        {image ? (
          <div className="relative w-full h-48">
            <Image
              src={image}
              alt={name}
              fill
              className="object-cover"
            />
          </div>
        ) : (
          <div className="relative w-full h-48 bg-muted/30 flex items-center justify-center">
            <Icon className="w-16 h-16 opacity-20" style={{ color: accentColor }} />
          </div>
        )}

        {/* Content */}
        <div className="p-8">
          {/* Icon */}
          <div
            className="w-16 h-16 rounded-2xl flex items-center justify-center bg-card/80 backdrop-blur-sm shadow-lg mb-6"
            style={{ color: accentColor }}
          >
            <Icon className="w-8 h-8" />
          </div>

          {/* Title & Tagline */}
          <div className="mb-4">
            <h3 className="text-2xl font-bold text-foreground mb-2">{name}</h3>
            <p className="text-sm font-medium text-muted-foreground mb-4">{tagline}</p>
          </div>

          {/* Description */}
          <p className="text-muted-foreground leading-relaxed mb-6">{description}</p>

          {/* CTA */}
          <div className="flex items-center gap-2 text-sm font-medium group-hover:gap-3 transition-all">
            <span style={{ color: accentColor }}>Learn More</span>
            <ArrowRight className="w-4 h-4" style={{ color: accentColor }} />
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

