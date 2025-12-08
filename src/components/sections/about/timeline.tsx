'use client';

import { Card } from '@/components/ui/card';
import { Typography } from '@/components/ui/typography';
import { ScrollReveal } from '@/components/animations/scroll-reveal';
import { Calendar } from 'lucide-react';
import { useTranslations, useLocale } from 'next-intl';

export function Timeline() {
  const t = useTranslations('about.timeline');
  const locale = useLocale();
  const isRTL = locale === 'ar';

  const milestones = Array.from({ length: 7 }, (_, i) => ({
    year: t(`milestones.${i}.year`),
    title: t(`milestones.${i}.title`),
    description: t(`milestones.${i}.description`)
  }));

  return (
    <section className="w-full max-w-6xl mx-auto px-4 py-16">
      <ScrollReveal>
        <div className="text-center mb-12">
          <Typography variant="h2" align="center" className="mb-4">
            {t('heading')}
          </Typography>
          <Typography variant="subtitle" align="center" className="text-muted-foreground max-w-2xl mx-auto">
            {t('subtitle')}
          </Typography>
        </div>
      </ScrollReveal>

      <div className="relative">
        <div className={`absolute top-0 bottom-0 w-0.5 bg-primary/20 hidden md:block transform ${
          isRTL ? 'right-1/2 translate-x-1/2' : 'left-1/2 -translate-x-1/2'
        }`} />

        <div className="space-y-12">
          {milestones.map((milestone, index) => (
            <ScrollReveal key={index} delay={index * 0.1}>
              <div className={`flex items-center gap-8 ${
                index % 2 === 0 
                  ? isRTL ? 'md:flex-row-reverse' : 'md:flex-row'
                  : isRTL ? 'md:flex-row' : 'md:flex-row-reverse'
              }`}>
                <div className="flex-1 hidden md:block" />
                
                <div className="relative flex-shrink-0">
                  <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center relative z-10">
                    <Calendar className="w-8 h-8 text-primary" />
                  </div>
                </div>

                <Card className="flex-1 p-6 hover:shadow-lg transition-shadow">
                  <Typography variant="caption" className="text-primary mb-2 font-medium">
                    {milestone.year}
                  </Typography>
                  <Typography variant="h4" className="mb-2">
                    {milestone.title}
                  </Typography>
                  <Typography variant="body" className="text-muted-foreground">
                    {milestone.description}
                  </Typography>
                </Card>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
