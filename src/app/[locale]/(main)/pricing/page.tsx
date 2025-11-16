import { PricingHero } from '@/components/sections/pricing/pricing-hero';
import { PricingCards } from '@/components/sections/pricing/pricing-cards';
import { ComparisonTable } from '@/components/sections/pricing/comparison-table';
import { CTASection } from '@/components/sections/cta-section';

export default function PricingPage() {
  return (
    <>
      <PricingHero />
      <PricingCards />
      <ComparisonTable />
      <CTASection />
    </>
  );
}

