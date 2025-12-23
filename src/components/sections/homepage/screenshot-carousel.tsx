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
import Image from 'next/image';
import { urlFor } from '@/lib/sanity/image';

interface ScreenshotCarouselProps {
  data?: {
    heading?: string;
    subtitle?: string;
    items?: Array<{
      _key: string;
      title: string;
      description: string;
      category: string;
      image?: any;
    }>;
  };
}

export function ScreenshotCarousel({ data }: ScreenshotCarouselProps) {
  const t = useTranslations('homepage.seeInAction');
  const locale = useLocale();
  const isRTL = locale === 'ar';
  const [api, setApi] = useState<CarouselApi>();

  // Use Sanity data if available, otherwise fall back to translations
  const screenshots = data?.items || (t.raw('items') as Array<{
    id: number;
    title: string;
    description: string;
    category: string;
  }>);

  const usingSanityData = !!data?.items;

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
    <ScrollReveal className="w-full max-w-7xl mx-auto px-4 sm:px-6 md:px-8 py-16">
      <div className="text-center mb-12">
        <Typography variant="h2" align="center" className="mb-4">
          {data?.heading || t('heading')}
        </Typography>
        <Typography variant="subtitle" align="center" className="text-muted-foreground max-w-2xl mx-auto">
          {data?.subtitle || t('subtitle')}
        </Typography>
      </div>

      <Carousel
        setApi={setApi}
        opts={{
          align: 'start',
          loop: true,
          direction: isRTL ? 'rtl' : 'ltr',
        }}
        className="w-full ltr:pl-4 rtl:pr-4 py-4"
      >
        <CarouselContent className="ltr:ml-0 ltr:pl-3 rtl:mr-0 rtl:pr-4 py-2">
          {screenshots.map((screenshot) => {
            const itemKey = usingSanityData ? (screenshot as any)._key : (screenshot as any).id;

            // Check if we have Sanity data with an image
            let imageUrl = null;
            if (usingSanityData && (screenshot as any).image?.asset) {
              try {
                imageUrl = urlFor((screenshot as any).image).width(1200).fit('max').url();
              } catch (error) {
                console.error('Error generating image URL:', error);
              }
            }

            // Fallback to static images if no Sanity image
            if (!imageUrl && !usingSanityData) {
              imageUrl = `/assets/homepage/see_tranzkit_in_action/${(screenshot as any).id}.png`;
            }

            return (
              <CarouselItem key={itemKey} className="ltr:pl-4 rtl:pr-4 md:basis-1/2 lg:basis-1/3 py-4">
                <ScaleOnHover className="h-full relative hover:z-10">
                  <Card className="h-full flex flex-col">
                    {/* Image Container - no background, with padding */}
                    <div className="w-full p-4">
                      {imageUrl ? (
                        <Image
                          src={imageUrl}
                          alt={screenshot.title || 'Screenshot'}
                          width={1200}
                          height={800}
                          className="w-full h-auto object-contain"
                          priority={false}
                        />
                      ) : (
                        <div className="w-full h-48 flex items-center justify-center bg-muted rounded-md">
                          <Typography variant="body" className="text-muted-foreground">
                            No image available
                          </Typography>
                        </div>
                      )}
                    </div>
                    <div className="p-6 flex flex-col flex-1">
                      <Typography variant="h4" className="font-semibold mb-2 line-clamp-2">
                        {screenshot.title}
                      </Typography>
                      <Typography variant="body" className="text-muted-foreground line-clamp-3">
                        {screenshot.description}
                      </Typography>
                    </div>
                  </Card>
                </ScaleOnHover>
              </CarouselItem>
            );
          })}
        </CarouselContent>
        <CarouselPrevious className="hidden md:flex" onClick={handlePrevClick} />
        <CarouselNext className="hidden md:flex" onClick={handleNextClick} />
      </Carousel>
    </ScrollReveal>
  );
}
