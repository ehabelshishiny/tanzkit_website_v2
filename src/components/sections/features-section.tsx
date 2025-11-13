'use client';

import { FadeIn } from '@/components/animations/fade-in';
import { Zap, Shield, Users, BarChart } from 'lucide-react';

export function FeaturesSection() {
  const features = [
    {
      icon: Zap,
      title: 'Lightning Fast',
      description: 'Optimized performance for seamless user experience',
    },
    {
      icon: Shield,
      title: 'Secure & Reliable',
      description: 'Enterprise-grade security for your peace of mind',
    },
    {
      icon: Users,
      title: 'User-Friendly',
      description: 'Intuitive interface designed for all user types',
    },
    {
      icon: BarChart,
      title: 'Advanced Analytics',
      description: 'Data-driven insights to optimize your operations',
    },
  ];

  return (
    <section className="py-16 md:py-24 bg-muted/50">
      <div className="container">
        <FadeIn>
          <div className="mx-auto max-w-2xl text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Powerful Features
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Everything you need to run a successful transportation business
            </p>
          </div>
        </FadeIn>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <FadeIn key={feature.title} delay={0.1 * (index + 1)}>
                <div className="flex flex-col items-center text-center">
                  <div className="mb-4 rounded-full bg-primary/10 p-4">
                    <Icon className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="mb-2 text-xl font-semibold">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </div>
              </FadeIn>
            );
          })}
        </div>
      </div>
    </section>
  );
}

