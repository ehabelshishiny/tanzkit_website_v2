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
import { urlFor } from '@/lib/sanity/image';

interface AppScreensCarouselProps {
  data?: {
    title?: string;
    subtitle?: string;
    screenshots?: any[];
  };
}

export function AppScreensCarousel({ data }: AppScreensCarouselProps) {
  // Render empty if no data to maintain consistent structure
  if (!data) return <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 md:px-8 py-16" />;

  return (
    <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 md:px-8 py-16 bg-muted/30">
      <ScrollReveal>
        <div className="text-center mb-12">
          <Typography variant="h2" className="mb-4">
            {data.title}
          </Typography>
          <Typography variant="body" className="text-muted-foreground max-w-2xl mx-auto">
            {data.subtitle}
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
          {data.screenshots?.filter(item => item.image).map((item, index) => {
            const imageUrl = item.image ? urlFor(item.image).width(1200).fit('max').url() : '';

            return (
              <CarouselItem key={index} className="pl-4 md:basis-1/2 lg:basis-1/3 p-4">
                <ScaleOnHover className="h-full">
                  <Card className="overflow-hidden h-[400px] flex flex-col">
                    <div className="relative h-[200px] flex-shrink-0 bg-muted/30 p-3">
                      {imageUrl && (
                        <div className="relative w-full h-full">
                          <Image
                            src={imageUrl}
                            alt={item.title || `Screenshot ${index + 1}`}
                            fill
                            className="object-contain"
                            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                          />
                        </div>
                      )}
                    </div>
                    <div className="p-4 flex flex-col flex-1 min-h-0">
                      <Typography variant="h4" className="font-semibold mb-2 line-clamp-1">
                        {item.title || `Screenshot ${index + 1}`}
                      </Typography>
                      <Typography variant="body" className="text-muted-foreground line-clamp-2">
                        {item.description || 'App screen view'}
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
