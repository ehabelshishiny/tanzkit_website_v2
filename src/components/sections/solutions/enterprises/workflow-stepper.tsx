'use client';

import { Card } from '@/components/ui/card';
import { ScrollReveal } from '@/components/animations/scroll-reveal';
import { StaggerChildren, StaggerItem } from '@/components/animations/stagger-children';
import { CheckCircle2 } from 'lucide-react';
import { useLocale, useTranslations } from 'next-intl';
import { RTLAwareArrow } from '@/components/ui/rtl-aware-arrow';

interface WorkflowStepperProps {
  type?: 'passenger' | 'enterprise';
}

export function WorkflowStepper({ type = 'passenger' }: WorkflowStepperProps) {
  const locale = useLocale();
  const isRTL = locale === 'ar';
  const t = useTranslations(`solutions.enterprisesPassengers.workflow.${type}`);

  // Get steps count dynamically
  const stepsCount = 5; // Both passenger and enterprise have 5 steps
  const steps = Array.from({ length: stepsCount }, (_, i) => ({
    step: i + 1,
    title: t(`steps.${i}.title`),
    description: t(`steps.${i}.description`)
  }));

  return (
    <section className="w-full max-w-7xl mx-auto px-4 py-16">
      <ScrollReveal>
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">{t('title')}</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {t('subtitle')}
          </p>
        </div>
      </ScrollReveal>

      <StaggerChildren className="space-y-6">
        {steps.map((step, index) => (
          <StaggerItem key={index}>
            <Card className="p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-start gap-6">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                    <span className="text-xl font-bold text-primary">{step.step}</span>
                  </div>
                </div>
                <div className="flex-grow">
                  <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                  <p className="text-muted-foreground">{step.description}</p>
                </div>
                {index < steps.length - 1 ? (
                  <RTLAwareArrow className="w-6 h-6 text-muted-foreground hidden md:block" />
                ) : (
                  <CheckCircle2 className="w-6 h-6 text-green-500 hidden md:block" />
                )}
              </div>
            </Card>
          </StaggerItem>
        ))}
      </StaggerChildren>
    </section>
  );
}
