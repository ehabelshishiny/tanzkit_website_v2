import { EnterprisesHeroSection } from '@/components/sections/solutions/enterprises/hero-section';
import { AudienceSwitcherTabs } from '@/components/sections/solutions/enterprises/audience-switcher-tabs';
import { FeatureShowcaseBentoGrid } from '@/components/sections/solutions/enterprises/feature-showcase-bento-grid';
import { WorkflowStepper } from '@/components/sections/solutions/enterprises/workflow-stepper';
import { AppScreensCarousel } from '@/components/sections/solutions/enterprises/app-screens-carousel';
import { TestimonialStrip } from '@/components/sections/solutions/enterprises/testimonial-strip';
import { EnterprisesFeaturesSection } from '@/components/sections/solutions/enterprises/features-section';
import { EnterprisesAiImpactSection } from '@/components/sections/solutions/enterprises/ai-impact-section';
import { EnterprisesCtaSection } from '@/components/sections/solutions/enterprises/cta-section';
import { getSolutionsEnterprisesPassengersPage } from '@/lib/sanity/queries';

interface EnterprisesPassengersPageProps {
  params: Promise<{
    locale: string;
  }>;
}

export default async function EnterprisesPassengersPage({ params }: EnterprisesPassengersPageProps) {
  const { locale } = await params;
  const pageData = await getSolutionsEnterprisesPassengersPage(locale);

  // Provide empty object as fallback to prevent hydration issues
  const safePageData = pageData || {};

  return (
    <main>
      <EnterprisesHeroSection data={safePageData.hero} />
      <AudienceSwitcherTabs data={safePageData.audienceSwitcher} />
      <FeatureShowcaseBentoGrid data={safePageData.featureShowcase} />
      <WorkflowStepper type="passenger" data={safePageData.workflow} />
      <AppScreensCarousel data={safePageData.appScreens} />
      <EnterprisesFeaturesSection data={safePageData.features} />
      <TestimonialStrip data={safePageData.testimonials} />
      <EnterprisesAiImpactSection data={safePageData.aiImpact} />
      <EnterprisesCtaSection data={safePageData.cta} />
    </main>
  );
}
