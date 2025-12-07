import { AppHero } from './app-hero';
import { ScreenCarousel } from './screen-carousel';
import { StepSection } from './step-section';
import { DownloadButtons } from './download-buttons';
import { CTASection } from '@/components/sections/homepage/cta-section';
import { AppConfig } from '@/config/apps-data';

interface AppDetailOriginalTemplateProps {
  appConfig: AppConfig;
}

export function AppDetailOriginalTemplate({ appConfig }: AppDetailOriginalTemplateProps) {
  return (
    <>
      <AppHero 
        appName={appConfig.name} 
        appNameAr={appConfig.nameAr}
        appDescription={appConfig.description}
        appDescriptionAr={appConfig.descriptionAr}
      />
      <ScreenCarousel screenshots={appConfig.screenshots} layoutType={appConfig.layoutType} />
      <StepSection />
      <DownloadButtons />
      <CTASection />
    </>
  );
}
