'use client';

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { Card } from '@/components/ui/card';
import { Typography } from '@/components/ui/typography';
import { ScrollReveal } from '@/components/animations/scroll-reveal';
import { Smartphone, Monitor } from 'lucide-react';
import { useTranslations } from 'next-intl';
import Image from 'next/image';

interface ScreenCarouselProps {
  screenshots: string[];
  layoutType: 'portrait' | 'landscape';
}

export function ScreenCarousel({ screenshots, layoutType }: ScreenCarouselProps) {
  const t = useTranslations('apps.template.screenshots');

  // Determine aspect ratio and carousel basis based on layout type
  const aspectRatio = layoutType === 'landscape' ? 'aspect-[16/9]' : 'aspect-[9/16]';
  const carouselBasis = layoutType === 'landscape' ? 'md:basis-1/2 lg:basis-1/2' : 'md:basis-1/3 lg:basis-1/4';
  const PlaceholderIcon = layoutType === 'landscape' ? Monitor : Smartphone;

  // If no screenshots, don't render the section
  if (!screenshots || screenshots.length === 0) {
    return null;
  }

  return (
    <section className="w-full max-w-7xl mx-auto px-4 py-16">
      <ScrollReveal>
        <div className="text-center mb-12">
          <Typography variant="h2" className="mb-4">
            {t('title')}
          </Typography>
          <Typography variant="body" className="text-muted-foreground max-w-2xl mx-auto">
            {t('subtitle')}
          </Typography>
        </div>
      </ScrollReveal>

      <Carousel opts={{ align: 'start', loop: true }} className="w-full">
        <CarouselContent className="-ml-4">
          {screenshots.map((screenshot, index) => (
            <CarouselItem key={index} className={`pl-4 ${carouselBasis}`}>
              <Card className="overflow-hidden">
                <div className={`${aspectRatio} bg-card flex items-center justify-center relative`}>
                  <Image
                    src={screenshot}
                    alt={`Screenshot ${index + 1}`}
                    fill
                    className="object-contain scale-[0.95]"
                  />
                </div>
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="hidden md:flex" />
        <CarouselNext className="hidden md:flex" />
      </Carousel>
    </section>
  );
}
