'use client';

import { Card } from '@/components/ui/card';
import { Typography } from '@/components/ui/typography';
import { ScrollReveal } from '@/components/animations/scroll-reveal';

interface StorySectionProps {
  data: {
    heading: string;
    subtitle: string;
    mission: {
      title: string;
      text: string;
    };
    vision: {
      title: string;
      text: string;
    };
    values: {
      title: string;
      innovation: {
        title: string;
        description: string;
      };
      reliability: {
        title: string;
        description: string;
      };
      sustainability: {
        title: string;
        description: string;
      };
    };
  };
}

export function StorySection({ data }: StorySectionProps) {
  // Transform values object into array for rendering
  const valuesArray = [
    data.values.innovation,
    data.values.reliability,
    data.values.sustainability,
  ];
  return (
    <section className="w-full max-w-6xl mx-auto px-4 sm:px-6 md:px-8 py-16">
      <ScrollReveal>
        <div className="text-center mb-12">
          <Typography variant="h2" align="center" className="mb-4">
            {data.heading}
          </Typography>
          <Typography variant="subtitle" align="center" className="text-muted-foreground max-w-2xl mx-auto">
            {data.subtitle}
          </Typography>
        </div>
      </ScrollReveal>

      <div className="grid md:grid-cols-2 gap-8">
        <ScrollReveal delay={0.2}>
          <Card className="p-8">
            <Typography variant="h3" className="mb-4">
              {data.mission.title}
            </Typography>
            <Typography variant="body" className="text-muted-foreground leading-relaxed">
              {data.mission.text}
            </Typography>
          </Card>
        </ScrollReveal>

        <ScrollReveal delay={0.3}>
          <Card className="p-8">
            <Typography variant="h3" className="mb-4">
              {data.vision.title}
            </Typography>
            <Typography variant="body" className="text-muted-foreground leading-relaxed">
              {data.vision.text}
            </Typography>
          </Card>
        </ScrollReveal>
      </div>

      <ScrollReveal delay={0.4}>
        <Card className="p-8 mt-8">
          <Typography variant="h3" className="mb-4">
            {data.values.title}
          </Typography>
          <div className="grid md:grid-cols-3 gap-6">
            {valuesArray.map((value, index) => (
              <div key={index}>
                <Typography variant="h4" className="font-semibold mb-2">
                  {value.title}
                </Typography>
                <Typography variant="body" className="text-sm text-muted-foreground">
                  {value.description}
                </Typography>
              </div>
            ))}
          </div>
        </Card>
      </ScrollReveal>
    </section>
  );
}
