import { AppsHeroSection } from '@/components/sections/apps/apps-hero-section';
import AppsShowcase from '@/components/sections/apps/AppsShowcase';
import { CTASection } from '@/components/sections/cta-section';

export default function AppsPage() {
  return (
    <main>
      <AppsHeroSection />
      <AppsShowcase />
      <CTASection />
    </main>
  );
}

