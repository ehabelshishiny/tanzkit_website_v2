'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { useLocale } from 'next-intl';
import { cn } from '@/lib/utils';
import { ArrowRight, type LucideIcon } from 'lucide-react';
import { CardContainer, CardBody, CardItem } from './3d-card';

interface AppCardProps {
  id: string;
  name: string;
  tagline: string;
  description: string;
  icon: LucideIcon;
  gradient: string;
  accentColor: string;
  use3D?: boolean;
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
  icon: Icon,
  gradient,
  accentColor,
  use3D = false,
}: AppCardProps) {
  const locale = useLocale();
  const href = `/${locale}/apps/${id}`;

  if (use3D) {
    return (
      <CardContainer containerClassName="w-full h-full">
        <CardBody className="relative group/card w-full h-full">
          <Link href={href} className="block h-full">
            <CardItem
              translateZ="50"
              className={cn(
                'w-full h-full rounded-2xl p-8',
                'bg-gradient-to-br border border-border',
                'shadow-lg hover:shadow-2xl transition-shadow duration-300',
                gradient
              )}
            >
              {/* Icon */}
              <CardItem translateZ="80" className="mb-6">
                <div
                  className="w-16 h-16 rounded-2xl flex items-center justify-center bg-card/80 backdrop-blur-sm shadow-lg"
                  style={{ color: accentColor }}
                >
                  <Icon className="w-8 h-8" />
                </div>
              </CardItem>

              {/* Content */}
              <CardItem translateZ="60" className="mb-4">
                <h3 className="text-2xl font-bold text-foreground mb-2">{name}</h3>
                <p className="text-sm font-medium text-muted-foreground mb-4">{tagline}</p>
              </CardItem>

              <CardItem translateZ="40" className="mb-6">
                <p className="text-muted-foreground leading-relaxed">{description}</p>
              </CardItem>

              {/* CTA */}
              <CardItem translateZ="50" className="flex items-center gap-2 text-sm font-medium group-hover/card:gap-3 transition-all">
                <span style={{ color: accentColor }}>Learn More</span>
                <ArrowRight className="w-4 h-4" style={{ color: accentColor }} />
              </CardItem>
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
          'block h-full rounded-2xl p-8',
          'bg-gradient-to-br border border-border',
          'shadow-lg hover:shadow-2xl transition-all duration-300',
          'group',
          gradient
        )}
      >
        {/* Icon */}
        <div
          className="w-16 h-16 rounded-2xl flex items-center justify-center bg-card/80 backdrop-blur-sm shadow-lg mb-6"
          style={{ color: accentColor }}
        >
          <Icon className="w-8 h-8" />
        </div>

        {/* Content */}
        <div className="mb-4">
          <h3 className="text-2xl font-bold text-foreground mb-2">{name}</h3>
          <p className="text-sm font-medium text-muted-foreground mb-4">{tagline}</p>
        </div>

        <p className="text-muted-foreground leading-relaxed mb-6">{description}</p>

        {/* CTA */}
        <div className="flex items-center gap-2 text-sm font-medium group-hover:gap-3 transition-all">
          <span style={{ color: accentColor }}>Learn More</span>
          <ArrowRight className="w-4 h-4" style={{ color: accentColor }} />
        </div>
      </Link>
    </motion.div>
  );
}

