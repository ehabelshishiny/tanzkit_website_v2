import { AppsHeroSection } from '@/components/sections/apps/apps-hero-section';
import { AppsGridSection } from '@/components/sections/apps/apps-grid-section';
import { CTASection } from '@/components/sections/cta-section';

export default function AppsPage() {
  return (
    <main>
      <AppsHeroSection />
      <AppsGridSection />
      <CTASection />
    </main>
  );
}

