'use client';

import { Typography } from '@/components/ui/typography';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ScrollReveal } from '@/components/animations/scroll-reveal';
import { HoverTilt } from '@/components/animations/hover-tilt';
import { Smartphone, Navigation, DollarSign, MessageSquare, Star, Bell } from 'lucide-react';

const appIcons = [Navigation, DollarSign, MessageSquare, Star, Bell, Smartphone];

interface MobileAppUIGridProps {
  data?: {
    title?: string;
    subtitle?: string;
    features?: Array<{
      title?: string;
      description?: string;
      badge?: string;
    }>;
  };
}

export function MobileAppUIGrid({ data }: MobileAppUIGridProps) {
  // Render empty if no data to maintain consistent structure
  if (!data) return <section className="w-full max-w-7xl mx-auto px-4 py-16" />;

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

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {data.features?.map((feature, index) => {
          const Icon = appIcons[index % appIcons.length];
          const badge = feature.badge || '';

          return (
            <ScrollReveal key={index} delay={index * 0.1} className="h-full">
              <HoverTilt className="h-full">
                <Card className="p-6 h-full flex flex-col hover:shadow-lg transition-shadow relative overflow-hidden">
                  {badge && (
                    <div className="absolute top-4 right-4">
                      <Badge variant={badge === 'New' || badge === 'جديد' ? 'default' : 'secondary'}>
                        {badge}
                      </Badge>
                    </div>
                  )}

                  <div className="p-4 bg-primary/10 rounded-lg w-fit mb-4">
                    <Icon className="w-8 h-8 text-primary" />
                  </div>

                  <Typography variant="h4" className="mb-3">
                    {feature.title}
                  </Typography>
                  <Typography variant="body" className="text-muted-foreground flex-grow">
                    {feature.description}
                  </Typography>
                </Card>
              </HoverTilt>
            </ScrollReveal>
          );
        })}
      </div>
    </section>
  );
}
