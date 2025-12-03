'use client';

import { useTranslations } from 'next-intl';
import { useLocale } from 'next-intl';
import type { CarouselApi } from '@/components/ui/carousel';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { Card } from '@/components/ui/card';
import { ScrollReveal } from '@/components/animations/scroll-reveal';
import { ScaleOnHover } from '@/components/animations/scale-on-hover';
import { Typography } from '@/components/ui/typography';
import { useState } from 'react';

export function ScreenshotCarousel() {
  const t = useTranslations('homepage.seeInAction');
  const locale = useLocale();
  const isRTL = locale === 'ar';
  const [api, setApi] = useState<CarouselApi>();

  // Get screenshots array from translations
  const screenshots = t.raw('items') as Array<{
    id: number;
    title: string;
    description: string;
    category: string;
  }>;

  const handlePrevClick = () => {
    if (api) {
      if (isRTL) {
        api.scrollNext(); // In RTL, left arrow should scroll right (next)
      } else {
        api.scrollPrev(); // In LTR, left arrow scrolls left (prev)
      }
    }
  };

  const handleNextClick = () => {
    if (api) {
      if (isRTL) {
        api.scrollPrev(); // In RTL, right arrow should scroll left (prev)
      } else {
        api.scrollNext(); // In LTR, right arrow scrolls right (next)
      }
    }
  };

  return (
    <ScrollReveal className="w-full max-w-7xl mx-auto px-4 py-16">
      <div className="text-center mb-12">
        <Typography variant="h2" align="center" className="mb-4">
          {t('heading')}
        </Typography>
        <Typography variant="subtitle" align="center" className="text-muted-foreground max-w-2xl mx-auto">
          {t('subtitle')}
        </Typography>
      </div>

      <Carousel
        setApi={setApi}
        opts={{
          align: 'start',
          loop: true,
          direction: isRTL ? 'rtl' : 'ltr',
        }}
        className="w-full ltr:pl-4 rtl:pr-4"
      >
        <CarouselContent className="ltr:ml-0 ltr:pl-3 rtl:mr-0 rtl:pr-4">
          {screenshots.map((screenshot) => (
            <CarouselItem key={screenshot.id} className="ltr:pl-4 rtl:pr-4 md:basis-1/2 lg:basis-1/3 p-4">
              <ScaleOnHover className="h-full">
                <Card className="overflow-hidden h-[380px] flex flex-col">
                  <div className="aspect-video bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center relative group">
                    <div className="absolute inset-0 bg-grid-pattern opacity-10" />
                    <div className="text-center z-10 p-6">
                      <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary/20 flex items-center justify-center">
                        <Typography variant="h3" className="text-primary">
                          {screenshot.id}
                        </Typography>
                      </div>
                      <Typography variant="caption" className="inline-block px-3 py-1 bg-primary/10 rounded-full font-medium mb-2">
                        {screenshot.category}
                      </Typography>
                    </div>
                  </div>
                  <div className="p-4 flex flex-col flex-1">
                    <Typography variant="h4" className="font-semibold mb-2">
                      {screenshot.title}
                    </Typography>
                    <Typography variant="body" className="text-muted-foreground line-clamp-2">
                      {screenshot.description}
                    </Typography>
                  </div>
                </Card>
              </ScaleOnHover>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="hidden md:flex" onClick={handlePrevClick} />
        <CarouselNext className="hidden md:flex" onClick={handleNextClick} />
      </Carousel>
    </ScrollReveal>
  );
}
