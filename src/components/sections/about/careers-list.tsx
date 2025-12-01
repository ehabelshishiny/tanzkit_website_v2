'use client';

import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ScrollReveal } from '@/components/animations/scroll-reveal';
import { StaggerChildren, StaggerItem } from '@/components/animations/stagger-children';
import { MapPin, Clock, Briefcase } from 'lucide-react';
import { useTranslations } from 'next-intl';

export function CareersList() {
  const t = useTranslations('about.careers');

  // Get job openings as an array
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
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            {t('heading')}
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {t('subtitle')}
          </p>
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
                      <h3 className="text-xl font-semibold mb-2">{job.title}</h3>
                      <p className="text-muted-foreground text-sm mb-3">
                        {job.description}
                      </p>
                      <div className="flex flex-wrap gap-3 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Briefcase className="w-4 h-4" />
                          <span>{job.department}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <MapPin className="w-4 h-4" />
                          <span>{job.location}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          <span>{job.type}</span>
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
