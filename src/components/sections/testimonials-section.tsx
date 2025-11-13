'use client';

import { FadeIn } from '@/components/animations/fade-in';
import { Card, CardContent } from '@/components/ui/card';
import { Quote } from 'lucide-react';

export function TestimonialsSection() {
  const testimonials = [
    {
      quote: 'Tranzkit transformed our operations. The platform is intuitive and powerful.',
      author: 'John Doe',
      role: 'CEO, Transport Co.',
    },
    {
      quote: 'Best investment we made for our fleet management. Highly recommended!',
      author: 'Jane Smith',
      role: 'Operations Manager',
    },
    {
      quote: 'The real-time tracking and analytics have been game-changing for our business.',
      author: 'Mike Johnson',
      role: 'Fleet Director',
    },
  ];

  return (
    <section className="py-16 md:py-24 bg-muted/50">
      <div className="container">
        <FadeIn>
          <div className="mx-auto max-w-2xl text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              What Our Clients Say
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Trusted by transportation businesses worldwide
            </p>
          </div>
        </FadeIn>

        <div className="grid gap-6 md:grid-cols-3">
          {testimonials.map((testimonial, index) => (
            <FadeIn key={testimonial.author} delay={0.1 * (index + 1)}>
              <Card>
                <CardContent className="pt-6">
                  <Quote className="h-8 w-8 text-primary mb-4" />
                  <p className="mb-4 text-muted-foreground">{testimonial.quote}</p>
                  <div>
                    <p className="font-semibold">{testimonial.author}</p>
                    <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                  </div>
                </CardContent>
              </Card>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

