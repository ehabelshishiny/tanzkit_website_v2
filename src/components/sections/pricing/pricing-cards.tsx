'use client';

import Link from 'next/link';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Typography } from '@/components/ui/typography';
import {
  StaggerChildren,
  StaggerItem,
} from '@/components/animations/stagger-children';
import { ScrollReveal } from '@/components/animations/scroll-reveal';
import { Check } from 'lucide-react';
import { useLocale } from 'next-intl';
import { localizeInternalHref } from '@/lib/localize-internal-href';

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

function isPricingLine(text: string): boolean {
  const normalized = text.toLowerCase();
  return (
    normalized.includes('egp') ||
    normalized.includes('per user/month') ||
    normalized.includes('per month') ||
    text.includes('جنيه') ||
    text.includes('لكل مستخدم/شهر') ||
    text.includes('شهري')
  );
}

function getPrimaryPrice(plan: PricingPlan): string {
  const systemUserLine = plan.features.find((f) => {
    const text = (f.text || '').toLowerCase();
    return text.includes('system user') || f.text.includes('مستخدم النظام');
  });

  return systemUserLine?.text || plan.price;
}

export function PricingCards({ data }: PricingCardsProps) {
  const locale = useLocale();
  const gridClass =
    data.plans.length <= 2 ? 'md:grid-cols-2' : 'md:grid-cols-3';

  return (
    <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 md:px-8 py-16">
      <ScrollReveal>
        <div className="text-center mb-12">
          <Typography variant="h2" align="center" className="mb-4">
            {data.heading}
          </Typography>
          <Typography
            variant="subtitle"
            align="center"
            className="text-muted-foreground max-w-2xl mx-auto"
          >
            {data.subtitle}
          </Typography>
        </div>
      </ScrollReveal>

      <StaggerChildren className={`grid ${gridClass} gap-8`}>
        {data.plans.map((plan) => (
          <StaggerItem key={plan.id}>
            <Card
              className={`p-8 h-full flex flex-col ${
                plan.highlighted
                  ? 'border-2 border-primary shadow-lg scale-105'
                  : ''
              }`}
            >
              {plan.badge && <Badge className="w-fit mb-4">{plan.badge}</Badge>}

              <Typography variant="h3" className="mb-2">
                {plan.name}
              </Typography>
              <Typography variant="body" className="text-muted-foreground mb-6">
                {plan.description}
              </Typography>

              <div className="mb-6">
                <Typography variant="h3" as="span">
                  {getPrimaryPrice(plan)}
                </Typography>
                <Typography
                  variant="body"
                  as="span"
                  className="text-muted-foreground ms-1"
                >
                  {data.period}
                </Typography>
              </div>

              <Typography variant="body" className="font-semibold mb-3">
                Included Features
              </Typography>
              <ul className="space-y-3 mb-6">
                {plan.features
                  .filter((f) => f.included && !isPricingLine(f.text))
                  .map((feature, idx) => (
                    <li
                      key={`feature-${idx}`}
                      className="flex items-start gap-2"
                    >
                      <Check
                        className="w-5 h-5 text-primary flex-shrink-0"
                        style={{ marginTop: '0.125rem' }}
                      />
                      <Typography variant="body" className="text-sm flex-1">
                        {feature.text}
                      </Typography>
                    </li>
                  ))}
              </ul>

              <Typography variant="body" className="font-semibold mb-3">
                Pricing
              </Typography>
              <ul className="space-y-3 mb-8 flex-grow">
                {plan.features
                  .filter((f) => f.included && isPricingLine(f.text))
                  .map((feature, idx) => (
                    <li
                      key={`pricing-${idx}`}
                      className="flex items-start gap-2"
                    >
                      <Check
                        className="w-5 h-5 text-primary flex-shrink-0"
                        style={{ marginTop: '0.125rem' }}
                      />
                      <Typography variant="body" className="text-sm flex-1">
                        {feature.text}
                      </Typography>
                    </li>
                  ))}
              </ul>

              {plan.ctaHref ? (
                <Button
                  asChild
                  className="w-full"
                  variant={plan.highlighted ? 'default' : 'outline'}
                >
                  <Link href={localizeInternalHref(plan.ctaHref, locale)}>
                    {plan.ctaText || data.contactSales}
                  </Link>
                </Button>
              ) : (
                <Button className="w-full" variant="outline">
                  {plan.ctaText || data.contactSales}
                </Button>
              )}
            </Card>
          </StaggerItem>
        ))}
      </StaggerChildren>
    </section>
  );
}
