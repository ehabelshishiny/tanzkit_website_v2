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
import { urlForImage } from '@/lib/sanity/image';
import { generateResourceMetadata } from '@/lib/seo/metadata';
import { Metadata } from 'next';

interface OperatorsDriversPageProps {
  params: Promise<{
    locale: string;
  }>;
}

export async function generateMetadata({ params }: OperatorsDriversPageProps): Promise<Metadata> {
  const { locale } = await params;
  const page = await getSolutionsOperatorsDriversPage(locale);

  if (!page) {
    return {
      title: 'Operators & Drivers Solutions',
      description: 'Fleet operations and driver execution solutions by Tranzkit.',
    };
  }

  const ogImage = page.seo?.ogImage
    ? urlForImage(page.seo.ogImage).width(1200).height(630).fit('fill').url()
    : undefined;

  return generateResourceMetadata(
    {
      metaTitle: page.seo?.metaTitle,
      metaDescription: page.seo?.metaDescription,
      ogImage,
      keywords: page.seo?.keywords?.[locale] || page.seo?.keywords,
      canonicalUrl: 'solutions/operators-drivers',
      noIndex: page.seo?.noIndex,
      noFollow: page.seo?.noFollow,
    },
    locale,
    page.hero?.title,
    page.hero?.subtitle
  );
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
