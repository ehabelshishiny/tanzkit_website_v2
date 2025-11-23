'use client';

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

const screenshots = [
  {
    id: 1,
    title: 'Dashboard Overview',
    description: 'Comprehensive fleet management dashboard with real-time insights',
    category: 'Dashboard'
  },
  {
    id: 2,
    title: 'Live Tracking',
    description: 'Real-time vehicle tracking with interactive map interface',
    category: 'Tracking'
  },
  {
    id: 3,
    title: 'Analytics Reports',
    description: 'Detailed analytics and performance metrics visualization',
    category: 'Analytics'
  },
  {
    id: 4,
    title: 'Driver Management',
    description: 'Manage drivers, schedules, and performance tracking',
    category: 'Management'
  },
  {
    id: 5,
    title: 'Passenger App',
    description: 'User-friendly passenger booking and tracking interface',
    category: 'Mobile'
  },
  {
    id: 6,
    title: 'Route Optimization',
    description: 'AI-powered route planning and optimization tools',
    category: 'Optimization'
  }
];

export function ScreenshotCarousel() {
  return (
    <ScrollReveal className="w-full max-w-7xl mx-auto px-4 py-16">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          See Tranzkit in Action
        </h2>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Explore our intuitive interface designed for efficiency and ease of use
        </p>
      </div>

      <Carousel
        opts={{
          align: 'start',
          loop: true,
        }}
        className="w-full ltr:pl-4 rtl:pr-4"
      >
        <CarouselContent className="ltr:ml-0 ltr:pl-4 rtl:mr-0 rtl:pr-4">
          {screenshots.map((screenshot) => (
            <CarouselItem key={screenshot.id} className="ltr:pl-4 rtl:pr-4 md:basis-1/2 lg:basis-1/3 p-4">
              <ScaleOnHover className="h-full">
                <Card className="overflow-hidden h-[380px] flex flex-col">
                  <div className="aspect-video bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center relative group">
                    <div className="absolute inset-0 bg-grid-pattern opacity-10" />
                    <div className="text-center z-10 p-6">
                      <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary/20 flex items-center justify-center">
                        <span className="text-2xl font-bold text-primary">
                          {screenshot.id}
                        </span>
                      </div>
                      <div className="inline-block px-3 py-1 bg-primary/10 rounded-full text-xs font-medium mb-2">
                        {screenshot.category}
                      </div>
                    </div>
                  </div>
                  <div className="p-4 flex flex-col flex-1">
                    <h3 className="font-semibold mb-2">{screenshot.title}</h3>
                    <p className="text-sm text-muted-foreground line-clamp-2">
                      {screenshot.description}
                    </p>
                  </div>
                </Card>
              </ScaleOnHover>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="hidden md:flex" />
        <CarouselNext className="hidden md:flex" />
      </Carousel>
    </ScrollReveal>
  );
}
