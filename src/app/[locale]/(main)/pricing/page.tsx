import { PricingHero } from '@/components/sections/pricing/pricing-hero';
import { PricingCards } from '@/components/sections/pricing/pricing-cards';
import { ComparisonTable } from '@/components/sections/pricing/comparison-table';
import { CTASection } from '@/components/sections/homepage/cta-section';
import { getPricingPage } from '@/lib/sanity/queries';
import { notFound } from 'next/navigation';

interface PricingPageProps {
  params: Promise<{
    locale: string;
  }>;
}

export default async function PricingPage({ params }: PricingPageProps) {
  const { locale } = await params;

  // Fetch pricing page data from Sanity
  const pricingPageData = await getPricingPage(locale);

  if (!pricingPageData) {
    notFound();
  }

  return (
    <>
      <PricingHero data={pricingPageData.hero} />
      <PricingCards data={pricingPageData.pricingCards} />
      <ComparisonTable data={pricingPageData.comparisonTable} />
      <CTASection data={pricingPageData.cta} />
    </>
  );
}

