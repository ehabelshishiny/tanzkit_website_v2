'use client';

import { Card } from '@/components/ui/card';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { ScrollReveal } from '@/components/animations/scroll-reveal';
import { StaggerChildren, StaggerItem } from '@/components/animations/stagger-children';
import { Quote, Star } from 'lucide-react';

const testimonials = [
  {
    id: 1,
    name: 'Sarah Johnson',
    role: 'Fleet Manager',
    company: 'TechCorp Industries',
    content: 'Tranzkit transformed our employee transportation program. We reduced costs by 30% while improving service quality.',
    rating: 5,
    initials: 'SJ'
  },
  {
    id: 2,
    name: 'Ahmed Al-Rashid',
    role: 'Operations Director',
    company: 'Global Logistics',
    content: 'The real-time tracking and analytics have given us unprecedented visibility into our fleet operations.',
    rating: 5,
    initials: 'AA'
  },
  {
    id: 3,
    name: 'Maria Garcia',
    role: 'HR Manager',
    company: 'Innovation Labs',
    content: 'Our employees love the app. It\'s made their daily commute stress-free and reliable.',
    rating: 5,
    initials: 'MG'
  }
];

export function TestimonialStrip() {
  return (
    <section className="w-full max-w-7xl mx-auto px-4 py-16">
      <ScrollReveal>
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Trusted by Leading Organizations
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            See what our enterprise clients say about Tranzkit
          </p>
        </div>
      </ScrollReveal>

      <StaggerChildren className="grid md:grid-cols-3 gap-6">
        {testimonials.map((testimonial) => (
          <StaggerItem key={testimonial.id}>
            <Card className="p-6 h-full hover:shadow-lg transition-shadow relative">
              <Quote className="absolute top-4 right-4 w-8 h-8 text-primary/20" />
              
              <div className="flex items-center gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                ))}
              </div>

              <p className="text-muted-foreground mb-6 relative z-10">
                "{testimonial.content}"
              </p>

              <div className="flex items-center gap-3 pt-4 border-t">
                <Avatar>
                  <AvatarFallback className="bg-primary/10 text-primary font-semibold">
                    {testimonial.initials}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <div className="font-semibold">{testimonial.name}</div>
                  <div className="text-sm text-muted-foreground">
                    {testimonial.role}, {testimonial.company}
                  </div>
                </div>
              </div>
            </Card>
          </StaggerItem>
        ))}
      </StaggerChildren>
    </section>
  );
}

