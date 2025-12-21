'use client';

import { Card } from '@/components/ui/card';
import { Typography } from '@/components/ui/typography';
import { StaggerChildren, StaggerItem } from '@/components/animations/stagger-children';
import { ScrollReveal } from '@/components/animations/scroll-reveal';
import { Download, UserPlus, MapPin, Star, CheckCircle, Settings } from 'lucide-react';
import { useTranslations } from 'next-intl';

interface WorkflowStep {
  _key: string;
  title: string;
  description: string;
}

interface StepSectionProps {
  steps?: WorkflowStep[];
}

export function StepSection({ steps: sanitySteps }: StepSectionProps) {
  const t = useTranslations('apps.template.steps');

  // Default fallback steps if no Sanity data
  const defaultSteps = [
    {
      icon: Download,
      title: t('items.download.title'),
      description: t('items.download.description')
    },
    {
      icon: UserPlus,
      title: t('items.createAccount.title'),
      description: t('items.createAccount.description')
    },
    {
      icon: MapPin,
      title: t('items.bookRide.title'),
      description: t('items.bookRide.description')
    },
    {
      icon: Star,
      title: t('items.enjoyRate.title'),
      description: t('items.enjoyRate.description')
    }
  ];

  // Icon mapping for steps
  const iconMap = [Download, UserPlus, MapPin, Star, CheckCircle, Settings];

  // Use Sanity steps if available, otherwise use default
  const stepsToDisplay = sanitySteps && sanitySteps.length > 0
    ? sanitySteps.map((step, index) => ({
        icon: iconMap[index % iconMap.length],
        title: step.title,
        description: step.description
      }))
    : defaultSteps;

  return (
    <section className="w-full max-w-6xl mx-auto px-4 py-16 bg-muted/30">
      <ScrollReveal>
        <div className="text-center mb-12">
          <Typography variant="h2" className="mb-4">
            {t('title')}
          </Typography>
        </div>
      </ScrollReveal>

      <StaggerChildren className={`grid gap-6 ${stepsToDisplay.length <= 4 ? 'md:grid-cols-4' : 'md:grid-cols-3 lg:grid-cols-4'}`}>
        {stepsToDisplay.map((step, index) => (
          <StaggerItem key={sanitySteps?.[index]?._key || index}>
            <Card className="p-6 text-center h-full">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
                <step.icon className="w-8 h-8 text-primary" />
              </div>
              <Typography variant="caption" className="font-medium text-primary mb-2">{t('stepLabel')} {index + 1}</Typography>
              <Typography variant="h4" className="mb-2">{step.title}</Typography>
              <Typography variant="caption" className="text-muted-foreground">{step.description}</Typography>
            </Card>
          </StaggerItem>
        ))}
      </StaggerChildren>
    </section>
  );
}
