import { HeroSection } from '@/components/sections/homepage/hero-section';
import { FeaturesSection } from '@/components/sections/homepage/features-section';
import { FeatureTabs } from '@/components/sections/homepage/feature-tabs';
import { ScreenshotCarousel } from '@/components/sections/homepage/screenshot-carousel';
import { LogoBarSection } from '@/components/sections/homepage/logo-bar-section';
import { TestimonialsSection } from '@/components/sections/homepage/testimonials-section';
import { CTASection } from '@/components/sections/homepage/cta-section';
import { getHomePage } from '@/lib/sanity/queries';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { urlForImage } from '@/lib/sanity/image';

interface HomePageProps {
  params: Promise<{
    locale: string;
  }>;
}

export async function generateMetadata({ params }: HomePageProps): Promise<Metadata> {
  const { locale } = await params;
  const homePageData = await getHomePage(locale);

  if (!homePageData?.seo) {
    return {};
  }

  const { seo } = homePageData;
  const ogImage = seo.ogImage ? urlForImage(seo.ogImage).width(1200).height(630).fit('fill').url() : undefined;

  return {
    title: seo.metaTitle,
    description: seo.metaDescription,
    keywords: seo.keywords,
    openGraph: {
      title: seo.metaTitle,
      description: seo.metaDescription,
      images: ogImage ? [{ url: ogImage }] : [],
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: seo.metaTitle,
      description: seo.metaDescription,
      images: ogImage ? [ogImage] : [],
    },
  };
}

export default async function HomePage({ params }: HomePageProps) {
  const { locale } = await params;

  // Fetch home page data from Sanity
  const homePageData = await getHomePage(locale);

  if (!homePageData) {
    notFound();
  }

  return (
    <>
      <HeroSection data={homePageData.hero} />
      <FeaturesSection data={homePageData.overview} />
      <FeatureTabs data={homePageData.featureTabs} />
      <ScreenshotCarousel data={homePageData.screenshotCarousel} />
      <LogoBarSection data={homePageData.logoBar} />
      <TestimonialsSection data={homePageData.testimonials} />
      <CTASection data={homePageData.cta} />
    </>
  );
}
