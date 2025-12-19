'use client';

import { Typography } from '@/components/ui/typography';
import { Card } from '@/components/ui/card';
import { ScrollReveal } from '@/components/animations/scroll-reveal';
import { CheckCircle2 } from 'lucide-react';

interface OperationsTimelineProps {
  data?: {
    title?: string;
    subtitle?: string;
    items?: Array<{
      time?: string;
      title?: string;
      description?: string;
    }>;
  };
}

export function OperationsTimeline({ data }: OperationsTimelineProps) {
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

      <div className="relative">
        {/* Timeline line */}
        <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-primary/20 hidden md:block" />

        <div className="space-y-8">
          {data.items?.map((item, index) => (
            <ScrollReveal key={index} delay={index * 0.1}>
              <div className="relative flex items-start gap-6">
                {/* Timeline dot */}
                <div className="hidden md:flex flex-shrink-0 w-16 h-16 rounded-full bg-primary/10 items-center justify-center relative z-10">
                  <CheckCircle2 className="w-8 h-8 text-primary" />
                </div>

                <Card className="flex-grow p-6 hover:shadow-lg transition-shadow">
                  <div className="flex items-start justify-between gap-4 mb-3">
                    <div>
                      <Typography variant="caption" as="div" className="font-medium text-primary mb-1">
                        {item.time}
                      </Typography>
                      <Typography variant="h4">
                        {item.title}
                      </Typography>
                    </div>
                    <div className="md:hidden w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <CheckCircle2 className="w-6 h-6 text-primary" />
                    </div>
                  </div>
                  <Typography variant="body" className="text-muted-foreground">
                    {item.description}
                  </Typography>
                </Card>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
