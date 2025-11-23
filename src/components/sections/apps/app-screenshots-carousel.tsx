'use client';

import { motion } from 'framer-motion';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { Card } from '@/components/ui/card';
import { SectionContainer } from '@/components/ui/section-container';
import { Smartphone } from 'lucide-react';
import { fadeInUp } from '@/lib/animation-variants';
import type { AppScreenshot } from '@/config/apps';

interface AppScreenshotsCarouselProps {
  title: string;
  screenshots: AppScreenshot[];
  accentColor: string;
}

export function AppScreenshotsCarousel({
  title,
  screenshots,
  accentColor,
}: AppScreenshotsCarouselProps) {
  return (
    <SectionContainer background="light" padding="xl" maxWidth="2xl">
      {/* Section Header */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-100px' }}
        variants={fadeInUp}
        className="text-center mb-12"
      >
        <h2 className="text-3xl md:text-4xl font-bold text-foreground">
          {title}
        </h2>
      </motion.div>

      {/* Carousel */}
      <Carousel
        opts={{
          align: 'start',
          loop: true,
        }}
        className="w-full"
      >
        <CarouselContent className="-ml-4">
          {screenshots.map((screenshot) => (
            <CarouselItem
              key={screenshot.id}
              className="pl-4 md:basis-1/2 lg:basis-1/3"
            >
              <Card className="overflow-hidden h-full border-border">
                {/* Screenshot placeholder with gradient */}
                <div
                  className="aspect-[9/16] bg-gradient-to-br from-muted via-muted/50 to-background flex items-center justify-center relative group"
                  style={{
                    background: `linear-gradient(135deg, ${accentColor}15, ${accentColor}05)`,
                  }}
                >
                  {/* Grid pattern */}
                  <div
                    className="absolute inset-0 opacity-[0.03]"
                    style={{
                      backgroundImage: `linear-gradient(to right, currentColor 1px, transparent 1px),
                                       linear-gradient(to bottom, currentColor 1px, transparent 1px)`,
                      backgroundSize: '2rem 2rem',
                    }}
                  />

                  {/* Icon */}
                  <div className="text-center z-10 p-4">
                    <div
                      className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-card/80 backdrop-blur-sm flex items-center justify-center shadow-lg"
                      style={{ color: accentColor }}
                    >
                      <Smartphone className="w-8 h-8" />
                    </div>
                    <div
                      className="inline-block px-3 py-1.5 backdrop-blur-sm rounded-full text-xs font-medium mb-3"
                      style={{
                        backgroundColor: `${accentColor}20`,
                        color: accentColor,
                      }}
                    >
                      {screenshot.category}
                    </div>
                  </div>
                </div>

                {/* Screenshot info */}
                <div className="p-6 bg-card">
                  <h3 className="font-semibold text-lg mb-2 text-foreground">
                    {screenshot.title}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {screenshot.description}
                  </p>
                </div>
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="hidden md:flex" />
        <CarouselNext className="hidden md:flex" />
      </Carousel>
    </SectionContainer>
  );
}

