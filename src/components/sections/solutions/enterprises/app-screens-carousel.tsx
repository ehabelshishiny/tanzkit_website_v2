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
import { Smartphone } from 'lucide-react';

const screens = [
  {
    id: 1,
    title: 'Dashboard Overview',
    description: 'Monitor your entire fleet at a glance with real-time metrics',
    category: 'Management'
  },
  {
    id: 2,
    title: 'Live Tracking Map',
    description: 'Track all vehicles in real-time with interactive map interface',
    category: 'Tracking'
  },
  {
    id: 3,
    title: 'Driver Profiles',
    description: 'Manage driver information, schedules, and performance',
    category: 'Drivers'
  },
  {
    id: 4,
    title: 'Booking Interface',
    description: 'Intuitive booking flow for passengers with smart suggestions',
    category: 'Passenger'
  },
  {
    id: 5,
    title: 'Analytics Dashboard',
    description: 'Comprehensive reports and insights for decision making',
    category: 'Analytics'
  },
  {
    id: 6,
    title: 'Route Optimization',
    description: 'AI-powered route planning for maximum efficiency',
    category: 'Optimization'
  }
];

export function AppScreensCarousel() {
  return (
    <section className="w-full max-w-7xl mx-auto px-4 py-16 bg-muted/30">
      <ScrollReveal>
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Powerful Apps for Every User
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Intuitive interfaces designed for enterprises, drivers, and passengers
          </p>
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
          {screens.map((screen) => (
            <CarouselItem key={screen.id} className="pl-4 md:basis-1/2 lg:basis-1/3">
              <Card className="overflow-hidden h-full">
                <div className="aspect-[9/16] bg-gradient-to-br from-primary/20 via-primary/10 to-background flex items-center justify-center relative group">
                  <div className="absolute inset-0 bg-grid-pattern opacity-5" />
                  <div className="text-center z-10 p-6">
                    <div className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-background/80 backdrop-blur-sm flex items-center justify-center shadow-lg">
                      <Smartphone className="w-10 h-10 text-primary" />
                    </div>
                    <div className="inline-block px-4 py-2 bg-primary/20 backdrop-blur-sm rounded-full text-sm font-medium mb-4">
                      {screen.category}
                    </div>
                    <div className="text-6xl font-bold text-primary/20">
                      {screen.id}
                    </div>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="font-semibold text-lg mb-2">{screen.title}</h3>
                  <p className="text-sm text-muted-foreground">
                    {screen.description}
                  </p>
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

