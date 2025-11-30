'use client';

import { useTranslations } from 'next-intl';
import { FadeIn } from '@/components/animations/fade-in';
import { Zap, Shield, Users, BarChart } from 'lucide-react';
import { SectionContainer } from '@/components/layout/SectionContainer';

const featureIcons = {
  0: Zap,
  1: Shield,
  2: Users,
  3: BarChart
};

export function FeaturesSection() {
  const t = useTranslations('homepage.featuresSimple');

  // Get features array from translations
  const features = t.raw('items') as Array<{
    title: string;
    description: string;
  }>;

  return (
    <section className="py-16 md:py-24 bg-muted/50">
      <SectionContainer>
        <FadeIn>
          <div className="mx-auto max-w-2xl text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              {t('heading')}
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              {t('subtitle')}
            </p>
          </div>
        </FadeIn>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {features.map((feature, index) => {
            const Icon = featureIcons[index as keyof typeof featureIcons];
            return (
              <FadeIn key={index} delay={0.1 * (index + 1)}>
                <div className="flex flex-col items-center text-center">
                  <div className="mb-4 rounded-full bg-primary/10 p-4">
                    <Icon className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="mb-2 text-xl font-semibold">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </div>
              </FadeIn>
            );
          })}
        </div>
      </SectionContainer>
    </section>
  );
}