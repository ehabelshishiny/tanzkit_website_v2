'use client';

import { Card } from '@/components/ui/card';
import { ScrollReveal } from '@/components/animations/scroll-reveal';
import { CheckCircle2 } from 'lucide-react';

const timelineSteps = [
  {
    time: '00:00',
    title: 'System Initialization',
    description: 'Fleet management system starts, all vehicles sync status'
  },
  {
    time: '06:00',
    title: 'Morning Rush',
    description: 'Peak demand period, dynamic pricing activated, all drivers online'
  },
  {
    time: '09:00',
    title: 'Business Hours',
    description: 'Corporate bookings increase, route optimization in progress'
  },
  {
    time: '12:00',
    title: 'Midday Operations',
    description: 'Lunch hour surge, driver breaks scheduled, maintenance checks'
  },
  {
    time: '17:00',
    title: 'Evening Peak',
    description: 'Highest demand period, all resources deployed, real-time adjustments'
  },
  {
    time: '22:00',
    title: 'Night Shift',
    description: 'Reduced operations, night drivers active, system maintenance'
  }
];

export function OperationsTimeline() {
  return (
    <section className="w-full max-w-7xl mx-auto px-4 py-16">
      <ScrollReveal>
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            24/7 Operations Management
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Track and manage your fleet operations around the clock
          </p>
        </div>
      </ScrollReveal>

      <div className="relative">
        {/* Timeline line */}
        <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-primary/20 hidden md:block" />

        <div className="space-y-8">
          {timelineSteps.map((step, index) => (
            <ScrollReveal key={index} delay={index * 0.1}>
              <div className="relative flex items-start gap-6">
                {/* Timeline dot */}
                <div className="hidden md:flex flex-shrink-0 w-16 h-16 rounded-full bg-primary/10 items-center justify-center relative z-10">
                  <CheckCircle2 className="w-8 h-8 text-primary" />
                </div>

                <Card className="flex-grow p-6 hover:shadow-lg transition-shadow">
                  <div className="flex items-start justify-between gap-4 mb-3">
                    <div>
                      <div className="text-sm font-medium text-primary mb-1">
                        {step.time}
                      </div>
                      <h3 className="text-xl font-semibold">{step.title}</h3>
                    </div>
                    <div className="md:hidden w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <CheckCircle2 className="w-6 h-6 text-primary" />
                    </div>
                  </div>
                  <p className="text-muted-foreground">{step.description}</p>
                </Card>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}

