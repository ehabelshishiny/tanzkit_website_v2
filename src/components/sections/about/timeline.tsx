'use client';

import { Card } from '@/components/ui/card';
import { ScrollReveal } from '@/components/animations/scroll-reveal';
import { Calendar } from 'lucide-react';

const milestones = [
  {
    year: '2018',
    title: 'Company Founded',
    description: 'Tranzkit was born from a vision to revolutionize urban transportation'
  },
  {
    year: '2019',
    title: 'First 1000 Rides',
    description: 'Reached our first major milestone with 1000 successful trips'
  },
  {
    year: '2020',
    title: 'Enterprise Launch',
    description: 'Launched enterprise solutions for corporate transportation'
  },
  {
    year: '2021',
    title: 'Regional Expansion',
    description: 'Expanded operations to 5 major cities across the region'
  },
  {
    year: '2022',
    title: 'AI Integration',
    description: 'Introduced AI-powered route optimization and demand forecasting'
  },
  {
    year: '2023',
    title: '1 Million Trips',
    description: 'Celebrated 1 million completed trips and 10,000 active drivers'
  },
  {
    year: '2024',
    title: 'Global Recognition',
    description: 'Awarded Best Transportation Platform by industry leaders'
  }
];

export function Timeline() {
  return (
    <section className="w-full max-w-6xl mx-auto px-4 py-16">
      <ScrollReveal>
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Our Journey
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Key milestones in our mission to transform transportation
          </p>
        </div>
      </ScrollReveal>

      <div className="relative">
        {/* Timeline line */}
        <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-primary/20 hidden md:block transform -translate-x-1/2" />

        <div className="space-y-12">
          {milestones.map((milestone, index) => (
            <ScrollReveal key={index} delay={index * 0.1}>
              <div className={`flex items-center gap-8 ${
                index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
              }`}>
                <div className="flex-1 hidden md:block" />
                
                <div className="relative flex-shrink-0">
                  <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center relative z-10">
                    <Calendar className="w-8 h-8 text-primary" />
                  </div>
                </div>

                <Card className="flex-1 p-6 hover:shadow-lg transition-shadow">
                  <div className="text-sm font-medium text-primary mb-2">
                    {milestone.year}
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{milestone.title}</h3>
                  <p className="text-muted-foreground">{milestone.description}</p>
                </Card>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}

