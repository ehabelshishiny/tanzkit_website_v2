'use client';

import { useTranslations } from 'next-intl';
import { Typography } from '@/components/ui/typography';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { Card } from '@/components/ui/card';
import { ScrollReveal } from '@/components/animations/scroll-reveal';
import { BarChart3, Map, Users, DollarSign, TrendingUp, Settings } from 'lucide-react';

const dashboardIcons = [BarChart3, Map, Users, DollarSign, TrendingUp, Settings];

export function DashboardPreviewCarousel() {
  const t = useTranslations('solutions.operatorsDrivers.dashboards');

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
            const Icon = dashboardIcons[index];
            return (
              <CarouselItem key={index} className="pl-4 md:basis-1/2 lg:basis-1/3">
                <Card className="overflow-hidden h-full">
                  <div className="aspect-video bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center relative group p-8">
                    <div className="absolute inset-0 bg-grid-pattern opacity-10" />
                    <div className="text-center z-10">
                      <div className="w-20 h-20 mx-auto mb-4 rounded-2xl bg-background/80 backdrop-blur-sm flex items-center justify-center shadow-lg">
                        <Icon className="w-10 h-10 text-primary" />
                      </div>
                      <div className="flex gap-2 justify-center flex-wrap">
                        {[0, 1, 2].map((metricIdx) => (
                          <div key={metricIdx} className="px-3 py-1 bg-primary/10 backdrop-blur-sm rounded-full text-xs font-medium">
                            {t(`items.${index}.metrics.${metricIdx}`)}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="p-6">
                    <Typography variant="h4" className="mb-2">
                      {t(`items.${index}.title`)}
                    </Typography>
                    <Typography variant="caption" className="text-muted-foreground">
                      {t(`items.${index}.description`)}
                    </Typography>
                  </div>
                </Card>
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
