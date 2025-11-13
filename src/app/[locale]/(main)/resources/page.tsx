import { HeroSection } from '@/components/sections/hero-section';
import { OverviewSection } from '@/components/sections/overview-section';
import { CTASection } from '@/components/sections/cta-section';

export default function ResourcesPage() {
  return (
    <>
      <HeroSection 
        title="Resources Hub"
        subtitle="Knowledge, insights, and support for your success"
      />
      <OverviewSection />
      {/* Add resource categories grid here */}
      <CTASection />
    </>
  );
}

