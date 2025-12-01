'use client';

import { Card } from '@/components/ui/card';
import { ScrollReveal } from '@/components/animations/scroll-reveal';
import { useTranslations } from 'next-intl';

export function StorySection() {
  const t = useTranslations('about.story');

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

      <div className="grid md:grid-cols-2 gap-8">
        <ScrollReveal delay={0.2}>
          <Card className="p-8">
            <h3 className="text-2xl font-bold mb-4">{t('mission.title')}</h3>
            <p className="text-muted-foreground leading-relaxed">
              {t('mission.text')}
            </p>
          </Card>
        </ScrollReveal>

        <ScrollReveal delay={0.3}>
          <Card className="p-8">
            <h3 className="text-2xl font-bold mb-4">{t('vision.title')}</h3>
            <p className="text-muted-foreground leading-relaxed">
              {t('vision.text')}
            </p>
          </Card>
        </ScrollReveal>
      </div>

      <ScrollReveal delay={0.4}>
        <Card className="p-8 mt-8">
          <h3 className="text-2xl font-bold mb-4">{t('values.title')}</h3>
          <div className="grid md:grid-cols-3 gap-6">
            <div>
              <h4 className="font-semibold mb-2">{t('values.innovation.title')}</h4>
              <p className="text-sm text-muted-foreground">
                {t('values.innovation.description')}
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-2">{t('values.reliability.title')}</h4>
              <p className="text-sm text-muted-foreground">
                {t('values.reliability.description')}
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-2">{t('values.sustainability.title')}</h4>
              <p className="text-sm text-muted-foreground">
                {t('values.sustainability.description')}
              </p>
            </div>
          </div>
        </Card>
      </ScrollReveal>
    </section>
  );
}
