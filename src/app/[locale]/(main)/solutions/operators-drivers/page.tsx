import { OperatorsHeroSection } from '@/components/sections/solutions/operators/hero-section';
import { RoleSwitcherTabs } from '@/components/sections/solutions/operators/role-switcher-tabs';
import { OperationsTimeline } from '@/components/sections/solutions/operators/operations-timeline';
import { DashboardPreviewCarousel } from '@/components/sections/solutions/operators/dashboard-preview-carousel';
import { MobileAppUIGrid } from '@/components/sections/solutions/operators/mobile-app-ui-grid';
import { FAQAccordion } from '@/components/sections/solutions/operators/faq-accordion';
import { OperatorsFeaturesSection } from '@/components/sections/solutions/operators/features-section';
import { OperatorsAiImpactSection } from '@/components/sections/solutions/operators/ai-impact-section';
import { OperatorsCtaSection } from '@/components/sections/solutions/operators/cta-section';
import { getSolutionsOperatorsDriversPage } from '@/lib/sanity/queries';

interface OperatorsDriversPageProps {
  params: Promise<{
    locale: string;
  }>;
}

export default async function OperatorsDriversPage({ params }: OperatorsDriversPageProps) {
  const { locale } = await params;
  const pageData = await getSolutionsOperatorsDriversPage(locale);

  // Provide empty object as fallback to prevent hydration issues
  const safePageData = pageData || {};

  return (
    <main>
      <OperatorsHeroSection data={safePageData.hero} />
      <RoleSwitcherTabs data={safePageData.roleSwitcher} />
      <OperationsTimeline data={safePageData.timeline} />
      <DashboardPreviewCarousel data={safePageData.dashboards} />
      <MobileAppUIGrid data={safePageData.mobileApps} />
      <OperatorsFeaturesSection data={safePageData.features} />
      <OperatorsAiImpactSection data={safePageData.aiImpact} />
      <OperatorsCtaSection data={safePageData.cta} />
      <FAQAccordion data={safePageData.faq} />
    </main>
  );
}

