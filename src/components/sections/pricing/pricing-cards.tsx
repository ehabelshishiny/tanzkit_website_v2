'use client';

import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Typography } from '@/components/ui/typography';
import { StaggerChildren, StaggerItem } from '@/components/animations/stagger-children';
import { ScrollReveal } from '@/components/animations/scroll-reveal';
import { Check } from 'lucide-react';
import { TrialCTAButton } from '@/components/ui/trial-cta-button';

interface PricingPlan {
  id: string;
  name: string;
  badge?: string;
  price: string;
  description: string;
  features: Array<{
    text: string;
    included: boolean;
  }>;
  ctaText: string;
  ctaHref?: string;
  highlighted: boolean;
}

interface PricingCardsProps {
  data: {
    heading: string;
    subtitle: string;
    period: string;
    contactSales: string;
    plans: PricingPlan[];
  };
}

export function PricingCards({ data }: PricingCardsProps) {

  return (
    <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 md:px-8 py-16">
      <ScrollReveal>
        <div className="text-center mb-12">
          <Typography variant="h2" align="center" className="mb-4">
            {data.heading}
          </Typography>
          <Typography variant="subtitle" align="center" className="text-muted-foreground max-w-2xl mx-auto">
            {data.subtitle}
          </Typography>
        </div>
      </ScrollReveal>

      <StaggerChildren className="grid md:grid-cols-3 gap-8">
        {data.plans.map((plan) => (
          <StaggerItem key={plan.id}>
            <Card className={`p-8 h-full flex flex-col ${
              plan.highlighted
                ? 'border-2 border-primary shadow-lg scale-105'
                : ''
            }`}>
              {plan.badge && (
                <Badge className="w-fit mb-4">{plan.badge}</Badge>
              )}

              <Typography variant="h3" className="mb-2">
                {plan.name}
              </Typography>
              <Typography variant="body" className="text-muted-foreground mb-6">
                {plan.description}
              </Typography>

              <div className="mb-6">
                <Typography variant="h3" as="span">
                  {plan.price}
                </Typography>
                {plan.id !== 'enterprise' && (
                  <Typography variant="body" as="span" className="text-muted-foreground ms-1">
                    {data.period}
                  </Typography>
                )}
              </div>

              <ul className="space-y-3 mb-8 flex-grow">
                {plan.features.filter(f => f.included).map((feature, idx) => (
                  <li
                    key={idx}
                    className="flex items-start gap-2"
                  >
                    <Check
                      className="w-5 h-5 text-primary flex-shrink-0"
                      style={{ marginTop: '0.125rem' }}
                    />
                    <Typography
                      variant="body"
                      className="text-sm flex-1"
                    >
                      {feature.text}
                    </Typography>
                  </li>
                ))}
              </ul>

              {plan.id === 'enterprise' ? (
                <Button
                  className="w-full"
                  variant="outline"
                >
                  {data.contactSales}
                </Button>
              ) : (
                <TrialCTAButton
                  variant={plan.highlighted ? 'primary' : 'secondary'}
                  size="lg"
                  fullWidth
                />
              )}
            </Card>
          </StaggerItem>
        ))}
      </StaggerChildren>
    </section>
  );
}
