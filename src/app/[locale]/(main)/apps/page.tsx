import { AppsHeroSection } from '@/components/sections/apps/apps-hero-section';
import AppsShowcase from '@/components/sections/apps/AppsShowcase';
import { CTASection } from '@/components/sections/homepage/cta-section';
import { getAppsPage } from '@/lib/sanity/queries';
import { notFound } from 'next/navigation';

interface AppsPageProps {
  params: Promise<{
    locale: string;
  }>;
}

export default async function AppsPage({ params }: AppsPageProps) {
  const { locale } = await params;

  // Fetch apps page data from Sanity
  const appsPageData = await getAppsPage(locale);

  if (!appsPageData || !appsPageData.showcase) {
    notFound();
  }

  return (
    <main>
      {/* Hero section with data from Sanity */}
      <AppsHeroSection data={appsPageData.hero} />
      <AppsShowcase data={appsPageData.showcase} />
      <CTASection data={appsPageData.cta} />
    </main>
  );
}

