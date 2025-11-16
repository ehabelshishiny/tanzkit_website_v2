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
  { id: 1, title: 'Home Screen', description: 'Quick access to all features' },
  { id: 2, title: 'Book a Ride', description: 'Simple booking interface' },
  { id: 3, title: 'Track Your Ride', description: 'Real-time GPS tracking' },
  { id: 4, title: 'Payment', description: 'Secure payment options' },
  { id: 5, title: 'Trip History', description: 'View all your past trips' },
  { id: 6, title: 'Profile', description: 'Manage your account' }
];

export function ScreenCarousel() {
  return (
    <section className="w-full max-w-7xl mx-auto px-4 py-16">
      <ScrollReveal>
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            App Screenshots
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Explore the intuitive interface of our mobile apps
          </p>
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
                  <h3 className="font-semibold mb-1">{screen.title}</h3>
                  <p className="text-sm text-muted-foreground">{screen.description}</p>
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

