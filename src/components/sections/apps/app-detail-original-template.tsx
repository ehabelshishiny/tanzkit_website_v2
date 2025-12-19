import { AppHero } from './app-hero';
import { ScreenCarousel } from './screen-carousel';
import { StepSection } from './step-section';
import { DownloadButtons } from './download-buttons';
import { CTASection } from '@/components/sections/homepage/cta-section';
import { AppFeaturesSection } from './app-features-section';
import { urlFor } from '@/lib/sanity/image';
import { appsData } from '@/config/apps-data';
import type { IconName } from '@/config/apps';

interface SanityImage {
  _type: 'image';
  asset: {
    _ref: string;
    _type: 'reference';
  };
  url?: string;
}

interface WorkflowStep {
  _key: string;
  title: string;
  description: string;
}

interface CTAData {
  heading?: string;
  subtitle?: string;
  primaryCta?: {
    text: string;
    href: string;
  };
  secondaryCta?: {
    text: string;
    href: string;
  };
  backgroundStyle?: string;
  backgroundImage?: SanityImage;
}

interface FeatureItem {
  _key: string;
  icon: string;
  title: string;
  description: string;
  image?: SanityImage;
}

interface AppData {
  name: string;
  slug: { current: string };
  tagline?: string;
  description: string;
  category?: 'operators' | 'enterprise';
  layoutType: 'portrait' | 'landscape';
  screenshots: SanityImage[];
  features?: FeatureItem[];
  steps?: WorkflowStep[];
  cta?: CTAData;
  platforms?: {
    ios?: boolean;
    android?: boolean;
    web?: boolean;
  };
  storeUrls?: {
    appStore?: string;
    playStore?: string;
    webApp?: string;
  };
}

interface AppDetailOriginalTemplateProps {
  appData: AppData;
  locale: string;
}

export function AppDetailOriginalTemplate({ appData, locale }: AppDetailOriginalTemplateProps) {
  // Convert Sanity images to URLs, or use fallback from hardcoded data
  let screenshotUrls: string[] = [];

  if (appData.screenshots && appData.screenshots.length > 0) {
    // Use Sanity screenshots if available
    screenshotUrls = appData.screenshots
      .map((screenshot) => screenshot.url || urlFor(screenshot).url())
      .filter(Boolean); // Remove any null/undefined URLs
  }

  // Fallback to hardcoded screenshots if Sanity screenshots are empty
  if (screenshotUrls.length === 0) {
    const fallbackData = appsData[appData.slug.current];
    if (fallbackData) {
      screenshotUrls = fallbackData.screenshots;
    }
  }

  // Map features data for AppFeaturesSection
  const features = appData.features?.map(feature => ({
    iconName: feature.icon as IconName,
    title: feature.title,
    description: feature.description
  })) || [];

  // Determine accent color based on category
  const accentColor = appData.category === 'operators' ? '#1F6FB2' : '#8B5CF6';

  // Section titles based on locale
  const featuresSectionTitle = locale === 'ar' ? 'الميزات الرئيسية' : 'Key Features';

  return (
    <>
      <AppHero
        appName={appData.name}
        tagline={appData.tagline}
        appDescription={appData.description}
        heroImage={screenshotUrls[0] || '/assets/apps_screenshots/placeholder.png'}
        layoutType={appData.layoutType}
        platforms={appData.platforms}
        storeUrls={appData.storeUrls}
      />
      <ScreenCarousel screenshots={screenshotUrls} layoutType={appData.layoutType} />
      {features.length > 0 && (
        <AppFeaturesSection
          title={featuresSectionTitle}
          description=""
          features={features}
          accentColor={accentColor}
        />
      )}
      <StepSection steps={appData.steps} />
      <DownloadButtons />
      {appData.cta && <CTASection data={appData.cta} />}
    </>
  );
}
