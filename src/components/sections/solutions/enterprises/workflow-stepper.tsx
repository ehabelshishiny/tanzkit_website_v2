'use client';

import { Card } from '@/components/ui/card';
import { Typography } from '@/components/ui/typography';
import { ScrollReveal } from '@/components/animations/scroll-reveal';
import { StaggerChildren, StaggerItem } from '@/components/animations/stagger-children';
import { CheckCircle2 } from 'lucide-react';
import { useLocale } from 'next-intl';
import { RTLAwareArrow } from '@/components/ui/rtl-aware-arrow';

interface WorkflowStepperProps {
  type?: 'passenger' | 'enterprise';
  data?: {
    passenger?: {
      title?: string;
      subtitle?: string;
      steps?: Array<{
        title?: string;
        description?: string;
      }>;
    };
    enterprise?: {
      title?: string;
      subtitle?: string;
      steps?: Array<{
        title?: string;
        description?: string;
      }>;
    };
  };
}

export function WorkflowStepper({ type = 'passenger', data }: WorkflowStepperProps) {
  const locale = useLocale();
  const isRTL = locale === 'ar';

  // Render empty if no data to maintain consistent structure
  if (!data) return <section className="w-full max-w-7xl mx-auto px-4 py-16" />;

  const workflowData = type === 'passenger' ? data.passenger : data.enterprise;
  if (!workflowData) return <section className="w-full max-w-7xl mx-auto px-4 py-16" />;

  const steps = workflowData.steps || [];

  return (
    <section className="w-full max-w-7xl mx-auto px-4 py-16">
      <ScrollReveal>
        <div className="text-center mb-12">
          <Typography variant="h2" className="mb-4">{workflowData.title}</Typography>
          <Typography variant="body" className="text-muted-foreground max-w-2xl mx-auto">
            {workflowData.subtitle}
          </Typography>
        </div>
      </ScrollReveal>

      <StaggerChildren className="space-y-6">
        {steps.map((step, index) => (
          <StaggerItem key={index}>
            <Card className="p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-start gap-6">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                    <span className="text-xl font-bold text-primary">{index + 1}</span>
                  </div>
                </div>
                <div className="flex-grow">
                  <Typography variant="h4" className="mb-2">{step.title}</Typography>
                  <Typography variant="body" className="text-muted-foreground">{step.description}</Typography>
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
