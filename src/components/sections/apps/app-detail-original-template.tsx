import { AppHero } from './app-hero';
import { ScreenCarousel } from './screen-carousel';
import { StepSection } from './step-section';
import { DownloadButtons } from './download-buttons';
import { CTASection } from '@/components/sections/homepage/cta-section';

export function AppDetailOriginalTemplate() {
  return (
    <>
      <AppHero />
      <ScreenCarousel />
      <StepSection />
      <DownloadButtons />
      <CTASection />
    </>
  );
}

