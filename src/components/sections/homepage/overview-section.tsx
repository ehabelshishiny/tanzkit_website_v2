'use client';

import { useTranslations } from 'next-intl';
import { FadeIn } from '@/components/animations/fade-in';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { SectionContainer } from '@/components/layout/SectionContainer';

export function OverviewSection() {
  const t = useTranslations('homepage.whyChoose');

  // Get features array from translations
  const features = t.raw('items') as Array<{
    title: string;
    description: string;
  }>;

  return (
    <section className="py-16 md:py-24">
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

        <div className="grid gap-6 md:grid-cols-3">
          {features.map((feature, index) => (
            <FadeIn key={feature.title} delay={0.1 * (index + 1)}>
              <Card>
                <CardHeader>
                  <CardTitle>{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>{feature.description}</CardDescription>
                </CardContent>
              </Card>
            </FadeIn>
          ))}
        </div>
      </SectionContainer>
    </section>
  );
}
