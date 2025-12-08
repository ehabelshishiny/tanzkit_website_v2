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

export function AppScreensCarousel() {
  const t = useTranslations('solutions.enterprisesPassengers.appScreens');

  // Get screens from translation
  const screens = Array.from({ length: 6 }, (_, i) => ({
    id: i + 1,
    title: t(`screens.${i}.title`),
    description: t(`screens.${i}.description`),
    category: t(`screens.${i}.category`),
  }));

  return (
    <section className="w-full max-w-7xl mx-auto px-4 py-16 bg-muted/30">
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

      <Carousel
        opts={{
          align: 'start',
          loop: true,
        }}
        className="w-full"
      >
        <CarouselContent>
          {screens.map((screen) => (
            <CarouselItem key={screen.id} className="md:basis-1/2 lg:basis-1/3">
              <Card className="overflow-hidden h-full">
                <div className="aspect-[9/16] bg-gradient-to-br from-primary/20 via-primary/10 to-background flex items-center justify-center relative group">
                  <div className="absolute inset-0 bg-grid-pattern opacity-5" />
                  <div className="text-center z-10 p-4">
                    <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-background/80 backdrop-blur-sm flex items-center justify-center shadow-lg">
                      <Smartphone className="w-8 h-8 text-primary" />
                    </div>
                    <div className="inline-block px-3 py-1.5 bg-primary/20 backdrop-blur-sm rounded-full text-xs font-medium mb-3">
                      {screen.category}
                    </div>
                    <div className="text-5xl font-bold text-primary/20">
                      {screen.id}
                    </div>
                  </div>
                </div>
                <div className="p-4">
                  <Typography variant="h4" className="text-base mb-1.5">{screen.title}</Typography>
                  <Typography variant="caption" className="text-muted-foreground">
                    {screen.description}
                  </Typography>
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
