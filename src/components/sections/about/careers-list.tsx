'use client';

import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Typography } from '@/components/ui/typography';
import { ScrollReveal } from '@/components/animations/scroll-reveal';
import { StaggerChildren, StaggerItem } from '@/components/animations/stagger-children';
import { MapPin, Clock, Briefcase } from 'lucide-react';
import { useLocale, useTranslations } from 'next-intl';
import Link from 'next/link';

interface Career {
  _key: string;
  title: string;
  department: string;
  location: string;
  type: string;
  description: string;
  slug: {
    current: string;
  };
}

interface CareersListProps {
  heading: string;
  subtitle: string;
  openings: Career[];
}

export function CareersList({ heading, subtitle, openings }: CareersListProps) {
  const t = useTranslations('about.careers');
  const locale = useLocale();

  // Filter only active jobs (already filtered in query, but double-check)
  const activeJobs = openings || [];

  return (
    <section id="careers" className="w-full max-w-6xl mx-auto px-4 sm:px-6 md:px-8 py-16">
      <ScrollReveal>
        <div className="text-center mb-12">
          <Typography variant="h2" align="center" className="mb-4">
            {heading}
          </Typography>
          <Typography variant="subtitle" align="center" className="text-muted-foreground max-w-2xl mx-auto">
            {subtitle}
          </Typography>
        </div>
      </ScrollReveal>

      {activeJobs.length === 0 ? (
        <div className="text-center py-12">
          <Typography variant="body" className="text-muted-foreground">
            {locale === 'ar'
              ? 'لا توجد وظائف متاحة حالياً. يرجى التحقق مرة أخرى قريباً.'
              : 'No open positions at the moment. Please check back soon.'}
          </Typography>
        </div>
      ) : (
        <StaggerChildren className="space-y-4">
          {activeJobs.map((job) => (
            <StaggerItem key={job._key}>
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
                  <Button asChild className="md:flex-shrink-0">
                    <Link href={`/${locale}/careers/${job.slug.current}`}>
                      {t('applyNow')}
                    </Link>
                  </Button>
                </div>
              </Card>
            </StaggerItem>
          ))}
        </StaggerChildren>
      )}
    </section>
  );
}
