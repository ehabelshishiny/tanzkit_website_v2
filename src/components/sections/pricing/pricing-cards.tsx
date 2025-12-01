'use client';

import { useTranslations, useLocale, useMessages } from 'next-intl';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { StaggerChildren, StaggerItem } from '@/components/animations/stagger-children';
import { ScrollReveal } from '@/components/animations/scroll-reveal';
import { Check } from 'lucide-react';
import { TrialCTAButton } from '@/components/ui/trial-cta-button';
import { useEffect, useState } from 'react';

export function PricingCards() {
  const t = useTranslations('pricing.cards');
  const messages = useMessages() as any;
  const locale = useLocale();
  const isRTL = locale === 'ar';
  const [isClient, setIsClient] = useState(false);

  // Ensure client-side rendering
  useEffect(() => {
    setIsClient(true);
  }, []);

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

  // Don't render until client-side is ready
  if (!isClient || !messages) {
    return (
      <section className="w-full max-w-7xl mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Loading...</h2>
        </div>
      </section>
    );
  }

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
          const planT = (key: string) => {
            try {
              return t(`plans.${plan.id}.${key}`);
            } catch {
              return '';
            }
          };
          
          // Safely get features from messages object
          let featureKeys: string[] = [];
          try {
            const planMessages = messages?.pricing?.cards?.plans?.[plan.id]?.features;
            if (planMessages && typeof planMessages === 'object') {
              featureKeys = Object.keys(planMessages);
            }
          } catch (error) {
            console.error(`Error loading features for ${plan.id}:`, error);
          }

          // Skip rendering if no features found
          if (featureKeys.length === 0) {
            console.warn(`No features found for plan: ${plan.id}`);
            return null;
          }
          
          return (
            <StaggerItem key={`${plan.id}-${locale}`}>
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
                  <span className="text-4xl font-bold">
                    {planT('price')}
                  </span>
                  {plan.id !== 'enterprise' && (
                    <span className="text-muted-foreground ms-1">{t('period')}</span>
                  )}
                </div>

                <ul className="space-y-3 mb-8 flex-grow" key={`features-${locale}`}>
                  {featureKeys.map((key) => (
                    <li 
                      key={`${key}-${locale}`}
                      className="flex items-start"
                      style={{
                        flexDirection: isRTL ? 'row-reverse' : 'row',
                        gap: '0.5rem'
                      }}
                    >
                      <div style={{ flexShrink: 0 }}>
                        <Check 
                          className="w-5 h-5 text-primary" 
                          style={{ marginTop: '0.125rem' }}
                        />
                      </div>
                      <span 
                        className="text-sm" 
                        style={{ 
                          flex: 1,
                          textAlign: isRTL ? 'right' : 'left'
                        }}
                      >
                        {planT(`features.${key}`)}
                      </span>
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
