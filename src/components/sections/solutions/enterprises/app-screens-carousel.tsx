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
import { ScaleOnHover } from '@/components/animations/scale-on-hover';
import Image from 'next/image';
import { useTranslations } from 'next-intl';

export function AppScreensCarousel() {
  const t = useTranslations('solutions.enterprisesPassengers.appScreens');

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
        <CarouselContent className="-ml-4">
          {[0, 1, 2, 3, 4, 5].map((index) => {
            return (
              <CarouselItem key={index} className="pl-4 md:basis-1/2 lg:basis-1/3 p-4">
                <ScaleOnHover className="h-full">
                  <Card className="overflow-hidden h-[400px] flex flex-col">
                    <div className="relative h-[200px] flex-shrink-0 overflow-hidden">
                      <Image
                        src={`/assets/apps_screenshots/enterprise-dashboard/${index + 1}.png`}
                        alt={t(`screens.${index}.title`)}
                        fill
                        className="object-contain"
                        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      />
                    </div>
                    <div className="p-4 flex flex-col flex-1 min-h-0">
                      <Typography variant="h4" className="font-semibold mb-2 line-clamp-1">
                        {t(`screens.${index}.title`)}
                      </Typography>
                      <Typography variant="body" className="text-muted-foreground line-clamp-2">
                        {t(`screens.${index}.description`)}
                      </Typography>
                    </div>
                  </Card>
                </ScaleOnHover>
              </CarouselItem>
            );
          })}
        </CarouselContent>
        <CarouselPrevious className="hidden md:flex" />
        <CarouselNext className="hidden md:flex" />
      </Carousel>
    </section>
  );
}
