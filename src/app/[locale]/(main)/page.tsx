import { HeroSection } from '@/components/sections/homepage/hero-section';
import { OverviewSection } from '@/components/sections/homepage/overview-section';
import { FeaturesSection } from '@/components/sections/homepage/features-section';
import { FeatureTabs } from '@/components/sections/homepage/feature-tabs';
import { ScreenshotCarousel } from '@/components/sections/homepage/screenshot-carousel';
import { LogoBarSection } from '@/components/sections/homepage/logo-bar-section';
import { TestimonialsSection } from '@/components/sections/homepage/testimonials-section';
import { CTASection } from '@/components/sections/homepage/cta-section';

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
