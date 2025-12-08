'use client';

import { Card } from '@/components/ui/card';
import { Typography } from '@/components/ui/typography';
import { ScrollReveal } from '@/components/animations/scroll-reveal';
import { useTranslations } from 'next-intl';

export function StorySection() {
  const t = useTranslations('about.story');

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

      <div className="grid md:grid-cols-2 gap-8">
        <ScrollReveal delay={0.2}>
          <Card className="p-8">
            <Typography variant="h3" className="mb-4">
              {t('mission.title')}
            </Typography>
            <Typography variant="body" className="text-muted-foreground leading-relaxed">
              {t('mission.text')}
            </Typography>
          </Card>
        </ScrollReveal>

        <ScrollReveal delay={0.3}>
          <Card className="p-8">
            <Typography variant="h3" className="mb-4">
              {t('vision.title')}
            </Typography>
            <Typography variant="body" className="text-muted-foreground leading-relaxed">
              {t('vision.text')}
            </Typography>
          </Card>
        </ScrollReveal>
      </div>

      <ScrollReveal delay={0.4}>
        <Card className="p-8 mt-8">
          <Typography variant="h3" className="mb-4">
            {t('values.title')}
          </Typography>
          <div className="grid md:grid-cols-3 gap-6">
            <div>
              <Typography variant="h4" className="font-semibold mb-2">
                {t('values.innovation.title')}
              </Typography>
              <Typography variant="body" className="text-sm text-muted-foreground">
                {t('values.innovation.description')}
              </Typography>
            </div>
            <div>
              <Typography variant="h4" className="font-semibold mb-2">
                {t('values.reliability.title')}
              </Typography>
              <Typography variant="body" className="text-sm text-muted-foreground">
                {t('values.reliability.description')}
              </Typography>
            </div>
            <div>
              <Typography variant="h4" className="font-semibold mb-2">
                {t('values.sustainability.title')}
              </Typography>
              <Typography variant="body" className="text-sm text-muted-foreground">
                {t('values.sustainability.description')}
              </Typography>
            </div>
          </div>
        </Card>
      </ScrollReveal>
    </section>
  );
}
