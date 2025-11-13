import { HeroSection } from '@/components/sections/hero-section';
import { OverviewSection } from '@/components/sections/overview-section';
import { CTASection } from '@/components/sections/cta-section';

export default function AboutPage() {
  return (
    <>
      <HeroSection 
        title="About Tranzkit"
        subtitle="Our story, mission, and vision for transforming transportation"
      />
      <OverviewSection />
      {/* Add Our Story, Mission & Vision, Team sections here */}
      <CTASection />
    </>
  );
}

