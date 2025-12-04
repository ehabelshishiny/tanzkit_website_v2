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
import { Smartphone } from 'lucide-react';
import { useTranslations } from 'next-intl';

export function ScreenCarousel() {
  const t = useTranslations('apps.template.screenshots');

  const screens = [
    { id: 1, title: t('screens.homeScreen.title'), description: t('screens.homeScreen.description') },
    { id: 2, title: t('screens.bookRide.title'), description: t('screens.bookRide.description') },
    { id: 3, title: t('screens.trackRide.title'), description: t('screens.trackRide.description') },
    { id: 4, title: t('screens.payment.title'), description: t('screens.payment.description') },
    { id: 5, title: t('screens.tripHistory.title'), description: t('screens.tripHistory.description') },
    { id: 6, title: t('screens.profile.title'), description: t('screens.profile.description') }
  ];

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
          {screens.map((screen) => (
            <CarouselItem key={screen.id} className="pl-4 md:basis-1/3 lg:basis-1/4">
              <Card className="overflow-hidden">
                <div className="aspect-[9/16] bg-gradient-to-br from-primary/20 to-background flex items-center justify-center">
                  <Smartphone className="w-16 h-16 text-primary/40" />
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
