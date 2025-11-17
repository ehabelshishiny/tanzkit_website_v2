import { OperatorsHeroSection } from '@/components/sections/solutions/operators/hero-section';
import { RoleSwitcherTabs } from '@/components/sections/solutions/operators/role-switcher-tabs';
import { OperationsTimeline } from '@/components/sections/solutions/operators/operations-timeline';
import { DashboardPreviewCarousel } from '@/components/sections/solutions/operators/dashboard-preview-carousel';
import { MobileAppUIGrid } from '@/components/sections/solutions/operators/mobile-app-ui-grid';
import { FAQAccordion } from '@/components/sections/solutions/operators/faq-accordion';
import { OperatorsFeaturesSection } from '@/components/sections/solutions/operators/features-section';
import { OperatorsAiImpactSection } from '@/components/sections/solutions/operators/ai-impact-section';
import { OperatorsCtaSection } from '@/components/sections/solutions/operators/cta-section';

export default function OperatorsDriversPage() {
  return (
    <main>
      <OperatorsHeroSection />
      <RoleSwitcherTabs />
      <OperationsTimeline />
      <DashboardPreviewCarousel />
      <MobileAppUIGrid />
      <OperatorsFeaturesSection />
      <OperatorsAiImpactSection />
      <OperatorsCtaSection />
      <FAQAccordion />
    </main>
  );
}

