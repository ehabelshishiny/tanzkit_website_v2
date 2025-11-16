import { AppHero } from '@/components/sections/apps/app-hero';
import { ScreenCarousel } from '@/components/sections/apps/screen-carousel';
import { StepSection } from '@/components/sections/apps/step-section';
import { DownloadButtons } from '@/components/sections/apps/download-buttons';
import { CTASection } from '@/components/sections/cta-section';

export default function AppsPage() {
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

