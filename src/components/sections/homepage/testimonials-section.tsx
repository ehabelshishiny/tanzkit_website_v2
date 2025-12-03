'use client';

import { useTranslations } from 'next-intl';
import { FadeIn } from '@/components/animations/fade-in';
import { CardContainer, CardBody, CardItem } from '@/components/ui/3d-card';
import { Quote } from 'lucide-react';
import { SectionContainer } from '@/components/layout/SectionContainer';
import { Typography } from '@/components/ui/typography';

export function TestimonialsSection() {
  const t = useTranslations('homepage.testimonials');

  // Get testimonials array from translations
  const testimonials = t.raw('items') as Array<{
    quote: string;
    author: string;
    role: string;
  }>;

  return (
    <section className="py-16 md:py-24 bg-muted/50">
      <SectionContainer>
        <FadeIn>
          <div className="mx-auto max-w-2xl text-center mb-12">
            <Typography variant="h2" align="center" className="tracking-tight">
              {t('heading')}
            </Typography>
            <Typography variant="subtitle" align="center" className="mt-4 text-muted-foreground">
              {t('subtitle')}
            </Typography>
          </div>
        </FadeIn>

        <div className="grid gap-6 md:grid-cols-3">
          {testimonials.map((testimonial, index) => (
            <FadeIn key={index} delay={0.1 * (index + 1)}>
              {/* Apply 3D card effect to all testimonial cards */}
              <CardContainer containerClassName="w-full h-full">
                <CardBody className="relative group/card w-full h-full">
                  <CardItem
                    translateZ="50"
                    className="w-full h-full rounded-2xl overflow-hidden bg-card border border-border shadow-lg hover:shadow-2xl transition-shadow duration-300"
                  >
                    <div className="px-6 py-6">
                      <CardItem translateZ="60">
                        <Quote className="h-8 w-8 text-primary mb-4" />
                      </CardItem>
                      <CardItem translateZ="70" as="div">
                        <Typography variant="body" className="mb-4 text-muted-foreground">
                          {testimonial.quote}
                        </Typography>
                      </CardItem>
                      <CardItem translateZ="60">
                        <div>
                          <Typography variant="body" className="font-semibold">
                            {testimonial.author}
                          </Typography>
                          <Typography variant="caption" className="text-muted-foreground">
                            {testimonial.role}
                          </Typography>
                        </div>
                      </CardItem>
                    </div>
                  </CardItem>
                </CardBody>
              </CardContainer>
            </FadeIn>
          ))}
        </div>
      </SectionContainer>
    </section>
  );
}
