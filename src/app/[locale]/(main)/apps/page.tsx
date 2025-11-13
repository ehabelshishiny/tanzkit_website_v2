import { HeroSection } from '@/components/sections/hero-section';
import { OverviewSection } from '@/components/sections/overview-section';
import { CTASection } from '@/components/sections/cta-section';

export default function AppsPage() {
  return (
    <>
      <HeroSection 
        title="Our Mobile Applications"
        subtitle="Powerful apps for every user type in your transportation ecosystem"
      />
      <OverviewSection />
      {/* Add app showcase sections here */}
      <CTASection />
    </>
  );
}

