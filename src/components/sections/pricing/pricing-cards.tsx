'use client';

import { useTranslations, useLocale, useMessages } from 'next-intl';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { StaggerChildren, StaggerItem } from '@/components/animations/stagger-children';
import { ScrollReveal } from '@/components/animations/scroll-reveal';
import { Check } from 'lucide-react';
import { TrialCTAButton } from '@/components/ui/trial-cta-button';

export function PricingCards() {
  const t = useTranslations('pricing.cards');
  const messages = useMessages();
  const locale = useLocale();
  const isRTL = locale === 'ar';

  const pricingPlans = [
    {
      id: 'starter',
      badge: null,
    },
    {
      id: 'professional',
      badge: 'mostPopular',
    },
    {
      id: 'enterprise',
      badge: 'bestValue',
    }
  ];

  return (
    <section className="w-full max-w-7xl mx-auto px-4 py-16">
      <ScrollReveal>
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            {t('heading')}
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {t('subtitle')}
          </p>
        </div>
      </ScrollReveal>

      <StaggerChildren className="grid md:grid-cols-3 gap-8">
        {pricingPlans.map((plan, index) => {
          const planT = (key: string) => t(`plans.${plan.id}.${key}`);
          
          // Get features from messages object
          const planMessages = (messages as any).pricing.cards.plans[plan.id].features;
          const featureKeys = Object.keys(planMessages);
          
          return (
            <StaggerItem key={index}>
              <Card className={`p-8 h-full flex flex-col ${
                plan.badge === 'mostPopular' 
                  ? 'border-2 border-primary shadow-lg scale-105' 
                  : ''
              }`}>
                {plan.badge && (
                  <Badge className="w-fit mb-4">{t(`badges.${plan.badge}`)}</Badge>
                )}
                
                <h3 className="text-2xl font-bold mb-2">{planT('name')}</h3>
                <p className="text-muted-foreground mb-6">{planT('description')}</p>
                
                <div className="mb-6">
                  <span className={`text-4xl font-bold ${isRTL ? 'ml-1' : 'mr-1'}`}>
                    {planT('price')}
                  </span>
                  {plan.id !== 'enterprise' && (
                    <span className="text-muted-foreground">{t('period')}</span>
                  )}
                </div>

                <ul className={`space-y-3 mb-8 flex-grow ${isRTL ? 'text-right' : 'text-left'}`}>
                  {featureKeys.map((key) => (
                    <li key={key} className={`flex items-start gap-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
                      <Check className={`w-5 h-5 text-primary flex-shrink-0 mt-0.5`} />
                      <span className="text-sm">{planT(`features.${key}`)}</span>
                    </li>
                  ))}
                </ul>

                {plan.id === 'enterprise' ? (
                  <Button
                    className="w-full"
                    variant="outline"
                  >
                    {t('contactSales')}
                  </Button>
                ) : (
                  <TrialCTAButton
                    variant={plan.badge === 'mostPopular' ? 'primary' : 'secondary'}
                    size="lg"
                    fullWidth
                  />
                )}
              </Card>
            </StaggerItem>
          );
        })}
      </StaggerChildren>
    </section>
  );
}
