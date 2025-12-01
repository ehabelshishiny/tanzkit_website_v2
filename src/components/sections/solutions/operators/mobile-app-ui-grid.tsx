'use client';

import { useTranslations } from 'next-intl';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ScrollReveal } from '@/components/animations/scroll-reveal';
import { HoverTilt } from '@/components/animations/hover-tilt';
import { Smartphone, Navigation, DollarSign, MessageSquare, Star, Bell } from 'lucide-react';

const appIcons = [Navigation, DollarSign, MessageSquare, Star, Bell, Smartphone];

export function MobileAppUIGrid() {
  const t = useTranslations('solutions.operatorsDrivers.mobileApps');

  return (
    <section className="w-full max-w-7xl mx-auto px-4 py-16">
      <ScrollReveal>
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            {t('title')}
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {t('subtitle')}
          </p>
        </div>
      </ScrollReveal>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[0, 1, 2, 3, 4, 5].map((index) => {
          const Icon = appIcons[index];
          const badge = t(`features.${index}.badge`);
          
          return (
            <ScrollReveal key={index} delay={index * 0.1}>
              <HoverTilt>
                <Card className="p-6 h-full hover:shadow-lg transition-shadow relative overflow-hidden">
                  <div className="absolute top-4 right-4">
                    <Badge variant={badge === 'New' || badge === 'جديد' ? 'default' : 'secondary'}>
                      {badge}
                    </Badge>
                  </div>
                  
                  <div className="p-4 bg-primary/10 rounded-lg w-fit mb-4">
                    <Icon className="w-8 h-8 text-primary" />
                  </div>
                  
                  <h3 className="text-xl font-semibold mb-3">
                    {t(`features.${index}.title`)}
                  </h3>
                  <p className="text-muted-foreground">
                    {t(`features.${index}.description`)}
                  </p>
                </Card>
              </HoverTilt>
            </ScrollReveal>
          );
        })}
      </div>
    </section>
  );
}
