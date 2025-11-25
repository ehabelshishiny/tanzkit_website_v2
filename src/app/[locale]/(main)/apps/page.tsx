import { AppsHeroSection } from '@/components/sections/apps/apps-hero-section';
import AppsShowcase from '@/components/sections/apps/AppsShowcase';
import { CTASection } from '@/components/sections/cta-section';

export default function AppsPage() {
  // find theme value by context, hook, or parent prop
  const isDarkTheme = false; // Replace with your theme state
  return (
    <main>
      <AppsHeroSection />
      <AppsShowcase isDarkTheme={isDarkTheme} />
      <CTASection />
    </main>
  );
}

