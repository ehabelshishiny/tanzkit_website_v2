import { HeroSection } from '@/components/sections/hero-section';
import { OverviewSection } from '@/components/sections/overview-section';
import { FeaturesSection } from '@/components/sections/features-section';
import { FeatureTabs } from '@/components/sections/feature-tabs';
import { ScreenshotCarousel } from '@/components/sections/screenshot-carousel';
import { LogoBarSection } from '@/components/sections/logo-bar-section';
import { TestimonialsSection } from '@/components/sections/testimonials-section';
import { CTASection } from '@/components/sections/cta-section';

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <OverviewSection />
      <FeaturesSection />
      <FeatureTabs />
      <ScreenshotCarousel />
      <LogoBarSection />
      <TestimonialsSection />
      <CTASection />
    </>
  );
}

