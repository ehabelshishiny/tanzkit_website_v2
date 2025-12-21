'use client';

import React from 'react';
import { Card } from '@/components/ui/card';
import { Typography } from '@/components/ui/typography';
import { ScrollReveal } from '@/components/animations/scroll-reveal';
import { HoverTilt } from '@/components/animations/hover-tilt';
import { BarChart3, Shield, Zap, Users, Globe, Clock } from 'lucide-react';

const featureIcons = [BarChart3, Shield, Zap, Users, Globe, Clock];

interface FeatureShowcaseBentoGridProps {
  data?: {
    title?: string;
    subtitle?: string;
    features?: Array<{
      title?: string;
      description?: string;
    }>;
  };
}

export function FeatureShowcaseBentoGrid({ data }: FeatureShowcaseBentoGridProps) {
  // Render empty if no data to maintain consistent structure
  if (!data) return <section className="w-full max-w-7xl mx-auto px-4 py-16" />;

  const features = data.features || [];

  return (
    <section className="w-full max-w-7xl mx-auto px-4 py-16">
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

      <div className="flex flex-col gap-6">
        {/* Row 1: 60% / 40% */}
        {features.length >= 2 && (
          <div className="flex flex-col md:flex-row md:items-stretch gap-6">
            <ScrollReveal delay={0} className="flex-[60] min-w-0">
              <HoverTilt className="h-full">
                <Card className="p-8 h-full bg-gradient-to-br from-background to-muted/20 border-2 hover:border-primary/50 transition-colors">
                  <div className="flex flex-col h-full">
                    <div className="p-4 bg-primary/10 rounded-lg w-fit mb-4">
                      {React.createElement(featureIcons[0], { className: "w-8 h-8 text-primary" })}
                    </div>
                    <Typography variant="h3" className="mb-3">{features[0].title}</Typography>
                    <Typography variant="body" className="text-muted-foreground flex-grow">
                      {features[0].description}
                    </Typography>
                  </div>
                </Card>
              </HoverTilt>
            </ScrollReveal>
            <ScrollReveal delay={0.1} className="flex-[40] min-w-0">
              <HoverTilt className="h-full">
                <Card className="p-8 h-full bg-gradient-to-br from-background to-muted/20 border-2 hover:border-primary/50 transition-colors">
                  <div className="flex flex-col h-full">
                    <div className="p-4 bg-primary/10 rounded-lg w-fit mb-4">
                      {React.createElement(featureIcons[1], { className: "w-8 h-8 text-primary" })}
                    </div>
                    <Typography variant="h3" className="mb-3">{features[1].title}</Typography>
                    <Typography variant="body" className="text-muted-foreground flex-grow">
                      {features[1].description}
                    </Typography>
                  </div>
                </Card>
              </HoverTilt>
            </ScrollReveal>
          </div>
        )}

        {/* Row 2: 45% / 55% */}
        {features.length >= 4 && (
          <div className="flex flex-col md:flex-row gap-6">
            <ScrollReveal delay={0.2} className="flex-[45] min-w-0">
              <HoverTilt className="h-full">
                <Card className="p-8 h-full bg-gradient-to-br from-background to-muted/20 border-2 hover:border-primary/50 transition-colors">
                  <div className="flex flex-col h-full">
                    <div className="p-4 bg-primary/10 rounded-lg w-fit mb-4">
                      {React.createElement(featureIcons[2], { className: "w-8 h-8 text-primary" })}
                    </div>
                    <Typography variant="h3" className="mb-3">{features[2].title}</Typography>
                    <Typography variant="body" className="text-muted-foreground flex-grow">
                      {features[2].description}
                    </Typography>
                  </div>
                </Card>
              </HoverTilt>
            </ScrollReveal>
            <ScrollReveal delay={0.3} className="flex-[55] min-w-0">
              <HoverTilt className="h-full">
                <Card className="p-8 h-full bg-gradient-to-br from-background to-muted/20 border-2 hover:border-primary/50 transition-colors">
                  <div className="flex flex-col h-full">
                    <div className="p-4 bg-primary/10 rounded-lg w-fit mb-4">
                      {React.createElement(featureIcons[3], { className: "w-8 h-8 text-primary" })}
                    </div>
                    <Typography variant="h3" className="mb-3">{features[3].title}</Typography>
                    <Typography variant="body" className="text-muted-foreground flex-grow">
                      {features[3].description}
                    </Typography>
                  </div>
                </Card>
              </HoverTilt>
            </ScrollReveal>
          </div>
        )}

        {/* Row 3: 60% / 40% */}
        {features.length >= 6 && (
          <div className="flex flex-col md:flex-row gap-6">
            <ScrollReveal delay={0.4} className="flex-[60] min-w-0">
              <HoverTilt className="h-full">
                <Card className="p-8 h-full bg-gradient-to-br from-background to-muted/20 border-2 hover:border-primary/50 transition-colors">
                  <div className="flex flex-col h-full">
                    <div className="p-4 bg-primary/10 rounded-lg w-fit mb-4">
                      {React.createElement(featureIcons[4], { className: "w-8 h-8 text-primary" })}
                    </div>
                    <Typography variant="h3" className="mb-3">{features[4].title}</Typography>
                    <Typography variant="body" className="text-muted-foreground flex-grow">
                      {features[4].description}
                    </Typography>
                  </div>
                </Card>
              </HoverTilt>
            </ScrollReveal>
            <ScrollReveal delay={0.5} className="flex-[40] min-w-0">
              <HoverTilt className="h-full">
                <Card className="p-8 h-full bg-gradient-to-br from-background to-muted/20 border-2 hover:border-primary/50 transition-colors">
                  <div className="flex flex-col h-full">
                    <div className="p-4 bg-primary/10 rounded-lg w-fit mb-4">
                      {React.createElement(featureIcons[5], { className: "w-8 h-8 text-primary" })}
                    </div>
                    <Typography variant="h3" className="mb-3">{features[5].title}</Typography>
                    <Typography variant="body" className="text-muted-foreground flex-grow">
                      {features[5].description}
                    </Typography>
                  </div>
                </Card>
              </HoverTilt>
            </ScrollReveal>
          </div>
        )}
      </div>
    </section>
  );
}
