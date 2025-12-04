'use client';

import { Card } from '@/components/ui/card';
import { Typography } from '@/components/ui/typography';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { ScrollReveal } from '@/components/animations/scroll-reveal';
import { StaggerChildren, StaggerItem } from '@/components/animations/stagger-children';
import { Quote, Star } from 'lucide-react';
import { useTranslations } from 'next-intl';

export function TestimonialStrip() {
  const t = useTranslations('solutions.enterprisesPassengers.testimonials');

  // Get testimonials count dynamically
  const testimonialsCount = 3;
  const testimonials = Array.from({ length: testimonialsCount }, (_, i) => ({
    id: i + 1,
    name: t(`items.${i}.name`),
    role: t(`items.${i}.role`),
    company: t(`items.${i}.company`),
    content: t(`items.${i}.content`),
    initials: t(`items.${i}.initials`),
    rating: 5
  }));

  return (
    <section className="w-full max-w-7xl mx-auto px-4 py-16">
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

      <StaggerChildren className="grid md:grid-cols-3 gap-6">
        {testimonials.map((testimonial) => (
          <StaggerItem key={testimonial.id}>
            <Card className="p-6 h-full hover:shadow-lg transition-shadow relative">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-1">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <Quote className="w-8 h-8 text-primary/20" />
              </div>

              <Typography variant="body" className="text-muted-foreground mb-6 relative z-10">
                "{testimonial.content}"
              </Typography>

              <div className="flex items-center gap-3 pt-4 border-t">
                <Avatar>
                  <AvatarFallback className="bg-primary/10 text-primary font-semibold">
                    {testimonial.initials}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <Typography variant="body" className="font-semibold">{testimonial.name}</Typography>
                  <Typography variant="caption" className="text-muted-foreground">
                    {testimonial.role}, {testimonial.company}
                  </Typography>
                </div>
              </div>
            </Card>
          </StaggerItem>
        ))}
      </StaggerChildren>
    </section>
  );
}
