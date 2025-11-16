import { EnterprisesHeroSection } from '@/components/sections/solutions/enterprises/hero-section';
import { AudienceSwitcherTabs } from '@/components/sections/solutions/enterprises/audience-switcher-tabs';
import { FeatureShowcaseBentoGrid } from '@/components/sections/solutions/enterprises/feature-showcase-bento-grid';
import { WorkflowStepper } from '@/components/sections/solutions/enterprises/workflow-stepper';
import { AppScreensCarousel } from '@/components/sections/solutions/enterprises/app-screens-carousel';
import { TestimonialStrip } from '@/components/sections/solutions/enterprises/testimonial-strip';
import { EnterprisesFeaturesSection } from '@/components/sections/solutions/enterprises/features-section';
import { EnterprisesAiImpactSection } from '@/components/sections/solutions/enterprises/ai-impact-section';
import { EnterprisesCtaSection } from '@/components/sections/solutions/enterprises/cta-section';
import { TypographyWrapper } from '@/components/sections/solutions/enterprises/typography-wrapper';

export default function EnterprisesPassengersPage() {
  return (
    <TypographyWrapper>
      <main>
        <EnterprisesHeroSection />
        <AudienceSwitcherTabs />
        <FeatureShowcaseBentoGrid />
        <WorkflowStepper type="passenger" />
        <AppScreensCarousel />
        <EnterprisesFeaturesSection />
        <TestimonialStrip />
        <EnterprisesAiImpactSection />
        <EnterprisesCtaSection />
      </main>
    </TypographyWrapper>
  );
}

