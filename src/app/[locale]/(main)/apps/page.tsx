import { AppsHeroSection } from '@/components/sections/apps/apps-hero-section';
import AppsShowcase from '@/components/sections/apps/AppsShowcase';
import { CTASection } from '@/components/sections/homepage/cta-section';
import { getAppsPage } from '@/lib/sanity/queries';
import { urlForImage } from '@/lib/sanity/image';
import { generateResourceMetadata } from '@/lib/seo/metadata';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';

interface AppsPageProps {
  params: Promise<{
    locale: string;
  }>;
}

export async function generateMetadata({ params }: AppsPageProps): Promise<Metadata> {
  const { locale } = await params;
  const appsPage = await getAppsPage(locale);

  if (!appsPage) {
    return {
      title: 'Apps',
      description: 'Explore Tranzkit applications for operators and enterprises.',
    };
  }

  const ogImage = appsPage.seo?.ogImage
    ? urlForImage(appsPage.seo.ogImage).width(1200).height(630).fit('fill').url()
    : undefined;

  return generateResourceMetadata(
    {
      metaTitle: appsPage.seo?.metaTitle,
      metaDescription: appsPage.seo?.metaDescription,
      ogImage,
      keywords: appsPage.seo?.keywords?.[locale] || appsPage.seo?.keywords,
      canonicalUrl: 'apps',
      noIndex: appsPage.seo?.noIndex,
      noFollow: appsPage.seo?.noFollow,
    },
    locale,
    appsPage.hero?.titlePart1,
    appsPage.hero?.subtitle
  );
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
