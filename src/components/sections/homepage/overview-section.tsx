'use client';

import { useTranslations } from 'next-intl';
import { FadeIn } from '@/components/animations/fade-in';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { SectionContainer } from '@/components/layout/SectionContainer';
import { Typography } from '@/components/ui/typography';

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
            <Typography variant="h2" align="center" className="tracking-tight">
              {t('heading')}
            </Typography>
            <Typography variant="subtitle" align="center" className="mt-4 text-muted-foreground">
              {t('subtitle')}
            </Typography>
          </div>
        </FadeIn>

        <div className="grid gap-6 md:grid-cols-3">
          {features.map((feature, index) => (
            <FadeIn key={feature.title} delay={0.1 * (index + 1)}>
              <Card>
                <CardHeader>
                  <CardTitle>
                    <Typography variant="h4">
                      {feature.title}
                    </Typography>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>
                    <Typography variant="body" className="text-muted-foreground">
                      {feature.description}
                    </Typography>
                  </CardDescription>
                </CardContent>
              </Card>
            </FadeIn>
          ))}
        </div>
      </SectionContainer>
    </section>
  );
}
