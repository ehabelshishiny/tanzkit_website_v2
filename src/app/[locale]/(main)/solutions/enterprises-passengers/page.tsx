import { EnterprisesHeroSection } from '@/components/sections/solutions/enterprises/hero-section';
import { EnterprisesFeaturesSection } from '@/components/sections/solutions/enterprises/features-section';
import { EnterprisesAiImpactSection } from '@/components/sections/solutions/enterprises/ai-impact-section';
import { EnterprisesCtaSection } from '@/components/sections/solutions/enterprises/cta-section';
import { TypographyWrapper } from '@/components/sections/solutions/enterprises/typography-wrapper';

export default function EnterprisesPassengersPage() {
  return (
    <TypographyWrapper>
      <main>
        <EnterprisesHeroSection />
        <EnterprisesFeaturesSection />
        <EnterprisesAiImpactSection />
        <EnterprisesCtaSection />
      </main>
    </TypographyWrapper>
  );
}

