'use client';

import { Card } from '@/components/ui/card';
import { ScrollReveal } from '@/components/animations/scroll-reveal';
import { StaggerChildren, StaggerItem } from '@/components/animations/stagger-children';
import { CheckCircle2, ArrowRight } from 'lucide-react';

const passengerJourney = [
  {
    step: 1,
    title: 'Book Your Ride',
    description: 'Open the app, enter your destination, and select your preferred vehicle type'
  },
  {
    step: 2,
    title: 'Get Matched',
    description: 'Our AI instantly matches you with the nearest available driver'
  },
  {
    step: 3,
    title: 'Track in Real-time',
    description: 'Watch your driver approach with live GPS tracking and accurate ETAs'
  },
  {
    step: 4,
    title: 'Enjoy Your Ride',
    description: 'Relax in comfort with verified drivers and in-app safety features'
  },
  {
    step: 5,
    title: 'Rate & Review',
    description: 'Share your experience to help us maintain quality standards'
  }
];

const enterpriseDashboard = [
  {
    step: 1,
    title: 'Setup Your Fleet',
    description: 'Add vehicles, drivers, and define your operational zones'
  },
  {
    step: 2,
    title: 'Configure Rules',
    description: 'Set up routing rules, pricing, and employee access policies'
  },
  {
    step: 3,
    title: 'Monitor Operations',
    description: 'Track all rides, driver performance, and fleet utilization in real-time'
  },
  {
    step: 4,
    title: 'Analyze & Optimize',
    description: 'Review analytics, identify trends, and optimize routes for cost savings'
  },
  {
    step: 5,
    title: 'Scale & Grow',
    description: 'Expand to new locations and add more vehicles as your needs grow'
  }
];

interface WorkflowStepperProps {
  type?: 'passenger' | 'enterprise';
}

export function WorkflowStepper({ type = 'passenger' }: WorkflowStepperProps) {
  const steps = type === 'passenger' ? passengerJourney : enterpriseDashboard;
  const title = type === 'passenger' ? 'Your Journey with Tranzkit' : 'Enterprise Dashboard Flow';
  const subtitle = type === 'passenger' 
    ? 'From booking to destination in 5 simple steps'
    : 'Set up and manage your fleet in minutes';

  return (
    <section className="w-full max-w-7xl mx-auto px-4 py-16">
      <ScrollReveal>
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">{title}</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {subtitle}
          </p>
        </div>
      </ScrollReveal>

      <StaggerChildren className="space-y-6">
        {steps.map((step, index) => (
          <StaggerItem key={index}>
            <Card className="p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-start gap-6">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                    <span className="text-xl font-bold text-primary">{step.step}</span>
                  </div>
                </div>
                <div className="flex-grow">
                  <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                  <p className="text-muted-foreground">{step.description}</p>
                </div>
                {index < steps.length - 1 ? (
                  <ArrowRight className="w-6 h-6 text-muted-foreground hidden md:block" />
                ) : (
                  <CheckCircle2 className="w-6 h-6 text-green-500 hidden md:block" />
                )}
              </div>
            </Card>
          </StaggerItem>
        ))}
      </StaggerChildren>
    </section>
  );
}

