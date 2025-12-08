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

  const screens = [
    { id: 1, title: t('screens.homeScreen.title'), description: t('screens.homeScreen.description') },
    { id: 2, title: t('screens.bookRide.title'), description: t('screens.bookRide.description') },
    { id: 3, title: t('screens.trackRide.title'), description: t('screens.trackRide.description') },
    { id: 4, title: t('screens.payment.title'), description: t('screens.payment.description') },
    { id: 5, title: t('screens.tripHistory.title'), description: t('screens.tripHistory.description') },
    { id: 6, title: t('screens.profile.title'), description: t('screens.profile.description') }
  ];

  // Determine aspect ratio and carousel basis based on layout type
  const aspectRatio = layoutType === 'landscape' ? 'aspect-[16/9]' : 'aspect-[9/16]';
  const carouselBasis = layoutType === 'landscape' ? 'md:basis-1/2 lg:basis-1/2' : 'md:basis-1/3 lg:basis-1/4';
  const PlaceholderIcon = layoutType === 'landscape' ? Monitor : Smartphone;

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
          {screens.map((screen, index) => (
            <CarouselItem key={screen.id} className={`pl-4 ${carouselBasis}`}>
              <Card className="overflow-hidden">
                <div className={`${aspectRatio} bg-card flex items-center justify-center relative`}>
                  {screenshots[index] ? (
                    <Image
                      src={screenshots[index]}
                      alt={screen.title}
                      fill
                      className="object-contain scale-[0.95]"
                    />
                  ) : (
                    <PlaceholderIcon className="w-16 h-16 text-primary/40" />
                  )}
                </div>
                <div className="p-4">
                  <Typography variant="h4" className="mb-1">{screen.title}</Typography>
                  <Typography variant="caption" className="text-muted-foreground">{screen.description}</Typography>
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
