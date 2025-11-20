'use client';

import { useTranslations } from 'next-intl';
import { AppDetailHero } from './app-detail-hero';
import { AppFeaturesSection } from './app-features-section';
import { AppScreenshotsCarousel } from './app-screenshots-carousel';
import { AppDownloadSection } from './app-download-section';
import { CTASection } from '@/components/sections/cta-section';
import type { AppConfig } from '@/config/apps';

interface AppDetailTemplateProps {
  app: AppConfig;
}

export function AppDetailTemplate({ app }: AppDetailTemplateProps) {
  const t = useTranslations(`apps.${app.id}`);
  const tCommon = useTranslations('apps.common');

  // Map features with translations
  const features = app.features.map((feature) => ({
    icon: feature.icon,
    title: t(`features.${feature.titleKey}`),
    description: t(`features.${feature.descriptionKey}`),
  }));

  return (
    <main>
      {/* Hero Section */}
      <AppDetailHero
        title={t('hero.title')}
        subtitle={t('hero.subtitle')}
        icon={app.icon}
        gradient={app.gradient}
        accentColor={app.accentColor}
      />

      {/* Description Section */}
      <section className="w-full max-w-4xl mx-auto px-4 py-16">
        <p className="text-lg text-muted-foreground leading-relaxed text-center">
          {t('description')}
        </p>
      </section>

      {/* Features Section */}
      <AppFeaturesSection
        title={tCommon('keyFeatures')}
        description=""
        features={features}
        accentColor={app.accentColor}
      />

      {/* Screenshots Carousel */}
      <AppScreenshotsCarousel
        title={tCommon('screenshots')}
        screenshots={app.screenshots}
        accentColor={app.accentColor}
      />

      {/* Download Section */}
      <AppDownloadSection
        appStoreUrl={app.appStoreUrl}
        playStoreUrl={app.playStoreUrl}
        requirements={app.requirements}
        accentColor={app.accentColor}
      />

      {/* CTA Section */}
      <CTASection />
    </main>
  );
}

