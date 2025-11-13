import { HeroSectionSolutions } from '@/components/sections/solutions/hero-section-solutions';
import { IntroSection } from '@/components/sections/solutions/intro-section';
import { AudienceCardsSection } from '@/components/sections/solutions/audience-cards-section';
import { TechnologySection } from '@/components/sections/solutions/technology-section';
import { WhyTranzkitSection } from '@/components/sections/solutions/why-tranzkit-section';
import { CtaSection } from '@/components/sections/solutions/cta-section';

export default function SolutionsPage() {
  return (
    <main>
      <HeroSectionSolutions />
      <IntroSection />
      <AudienceCardsSection />
      <TechnologySection />
      <WhyTranzkitSection />
      <CtaSection />
    </main>
  );
}

