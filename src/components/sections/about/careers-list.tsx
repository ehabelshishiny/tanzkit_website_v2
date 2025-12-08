'use client';

import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Typography } from '@/components/ui/typography';
import { ScrollReveal } from '@/components/animations/scroll-reveal';
import { StaggerChildren, StaggerItem } from '@/components/animations/stagger-children';
import { MapPin, Clock, Briefcase } from 'lucide-react';
import { useTranslations } from 'next-intl';

export function CareersList() {
  const t = useTranslations('about.careers');

  const openings = Array.from({ length: 5 }, (_, i) => ({
    title: t(`openings.${i}.title`),
    department: t(`openings.${i}.department`),
    location: t(`openings.${i}.location`),
    type: t(`openings.${i}.type`),
    description: t(`openings.${i}.description`)
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

      <StaggerChildren className="space-y-4">
        {openings.map((job, index) => (
          <StaggerItem key={index}>
            <Card className="p-6 hover:shadow-lg transition-shadow">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div className="flex-grow">
                  <div className="flex items-start gap-3 mb-3">
                    <div>
                      <Typography variant="h4" className="mb-2">
                        {job.title}
                      </Typography>
                      <Typography variant="body" className="text-muted-foreground text-sm mb-3">
                        {job.description}
                      </Typography>
                      <div className="flex flex-wrap gap-3 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Briefcase className="w-4 h-4" />
                          <Typography variant="caption">{job.department}</Typography>
                        </div>
                        <div className="flex items-center gap-1">
                          <MapPin className="w-4 h-4" />
                          <Typography variant="caption">{job.location}</Typography>
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          <Typography variant="caption">{job.type}</Typography>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <Button className="md:flex-shrink-0">{t('applyNow')}</Button>
              </div>
            </Card>
          </StaggerItem>
        ))}
      </StaggerChildren>
    </section>
  );
}
