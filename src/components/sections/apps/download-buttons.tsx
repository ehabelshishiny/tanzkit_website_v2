'use client';

import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Typography } from '@/components/ui/typography';
import { ScrollReveal } from '@/components/animations/scroll-reveal';
import { ScaleOnHover } from '@/components/animations/scale-on-hover';
import { Apple, Smartphone, QrCode } from 'lucide-react';
import { useTranslations } from 'next-intl';

export function DownloadButtons() {
  const t = useTranslations('apps.template.download');

  return (
    <section className="w-full max-w-4xl mx-auto px-4 py-16">
      <ScrollReveal>
        <Card className="p-12 text-center bg-gradient-to-br from-primary/5 to-background">
          <Typography variant="h2" className="mb-4">
            {t('title')}
          </Typography>
          <Typography variant="body" className="text-muted-foreground mb-8">
            {t('subtitle')}
          </Typography>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <ScaleOnHover>
              <Button size="lg" className="gap-2 min-w-[200px]">
                <Apple className="w-5 h-5" />
                {t('buttons.ios')}
              </Button>
            </ScaleOnHover>
            <ScaleOnHover>
              <Button size="lg" variant="outline" className="gap-2 min-w-[200px]">
                <Smartphone className="w-5 h-5" />
                {t('buttons.android')}
              </Button>
            </ScaleOnHover>
          </div>

          <div className="flex items-center justify-center gap-4 text-sm text-muted-foreground">
            <QrCode className="w-16 h-16" />
            <div className="text-left">
              <Typography variant="body" className="font-medium">{t('qr.title')}</Typography>
              <Typography variant="caption">{t('qr.subtitle')}</Typography>
            </div>
          </div>
        </Card>
      </ScrollReveal>
    </section>
  );
}
