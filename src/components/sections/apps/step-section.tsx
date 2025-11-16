'use client';

import { Card } from '@/components/ui/card';
import { StaggerChildren, StaggerItem } from '@/components/animations/stagger-children';
import { ScrollReveal } from '@/components/animations/scroll-reveal';
import { Download, UserPlus, MapPin, Star } from 'lucide-react';

const steps = [
  {
    icon: Download,
    title: 'Download the App',
    description: 'Get Tranzkit from App Store or Google Play'
  },
  {
    icon: UserPlus,
    title: 'Create Account',
    description: 'Sign up in seconds with your email or phone'
  },
  {
    icon: MapPin,
    title: 'Book Your Ride',
    description: 'Enter destination and request a ride'
  },
  {
    icon: Star,
    title: 'Enjoy & Rate',
    description: 'Relax and rate your experience'
  }
];

export function StepSection() {
  return (
    <section className="w-full max-w-6xl mx-auto px-4 py-16 bg-muted/30">
      <ScrollReveal>
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Get Started in 4 Easy Steps
          </h2>
        </div>
      </ScrollReveal>

      <StaggerChildren className="grid md:grid-cols-4 gap-6">
        {steps.map((step, index) => (
          <StaggerItem key={index}>
            <Card className="p-6 text-center h-full">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
                <step.icon className="w-8 h-8 text-primary" />
              </div>
              <div className="text-sm font-medium text-primary mb-2">Step {index + 1}</div>
              <h3 className="font-semibold mb-2">{step.title}</h3>
              <p className="text-sm text-muted-foreground">{step.description}</p>
            </Card>
          </StaggerItem>
        ))}
      </StaggerChildren>
    </section>
  );
}

