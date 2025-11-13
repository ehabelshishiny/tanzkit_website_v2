import { HeroSection } from '@/components/sections/hero-section';
import { CTASection } from '@/components/sections/cta-section';

export default function PricingPage() {
  return (
    <>
      <HeroSection 
        title="Flexible Pricing Plans"
        subtitle="Choose the perfect plan for your business needs"
      />
      {/* Add pricing cards here */}
      <CTASection />
    </>
  );
}

