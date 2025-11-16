'use client';

import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { StaggerChildren, StaggerItem } from '@/components/animations/stagger-children';
import { ScrollReveal } from '@/components/animations/scroll-reveal';
import { Check } from 'lucide-react';

const pricingPlans = [
  {
    name: 'Starter',
    price: '$299',
    period: '/month',
    description: 'Perfect for small fleets getting started',
    badge: null,
    features: [
      'Up to 10 vehicles',
      'Basic analytics dashboard',
      'Mobile apps for drivers',
      'Email support',
      'Standard routing',
      'Monthly reports'
    ]
  },
  {
    name: 'Professional',
    price: '$799',
    period: '/month',
    description: 'Ideal for growing transportation businesses',
    badge: 'Most Popular',
    features: [
      'Up to 50 vehicles',
      'Advanced analytics & insights',
      'Priority support (24/7)',
      'AI-powered route optimization',
      'Custom branding',
      'API access',
      'Real-time reporting',
      'Driver performance tracking'
    ]
  },
  {
    name: 'Enterprise',
    price: 'Custom',
    period: '',
    description: 'Tailored solutions for large-scale operations',
    badge: 'Best Value',
    features: [
      'Unlimited vehicles',
      'Dedicated account manager',
      'Custom integrations',
      'White-label solution',
      'Advanced security features',
      'SLA guarantees',
      'Custom analytics',
      'Multi-region support',
      'Training & onboarding'
    ]
  }
];

export function PricingCards() {
  return (
    <section className="w-full max-w-7xl mx-auto px-4 py-16">
      <ScrollReveal>
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Simple, Transparent Pricing
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Choose the plan that fits your business needs
          </p>
        </div>
      </ScrollReveal>

      <StaggerChildren className="grid md:grid-cols-3 gap-8">
        {pricingPlans.map((plan, index) => (
          <StaggerItem key={index}>
            <Card className={`p-8 h-full flex flex-col ${
              plan.badge === 'Most Popular' 
                ? 'border-2 border-primary shadow-lg scale-105' 
                : ''
            }`}>
              {plan.badge && (
                <Badge className="w-fit mb-4">{plan.badge}</Badge>
              )}
              
              <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
              <p className="text-muted-foreground mb-6">{plan.description}</p>
              
              <div className="mb-6">
                <span className="text-4xl font-bold">{plan.price}</span>
                <span className="text-muted-foreground">{plan.period}</span>
              </div>

              <ul className="space-y-3 mb-8 flex-grow">
                {plan.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                    <span className="text-sm">{feature}</span>
                  </li>
                ))}
              </ul>

              <Button 
                className="w-full" 
                variant={plan.badge === 'Most Popular' ? 'default' : 'outline'}
              >
                {plan.name === 'Enterprise' ? 'Contact Sales' : 'Get Started'}
              </Button>
            </Card>
          </StaggerItem>
        ))}
      </StaggerChildren>
    </section>
  );
}

