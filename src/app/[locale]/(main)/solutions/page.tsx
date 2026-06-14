import { HeroSectionSolutions } from '@/components/sections/solutions/hero-section-solutions';
import { IntroSection } from '@/components/sections/solutions/intro-section';
import { AudienceCardsSection } from '@/components/sections/solutions/audience-cards-section';
import { TechnologySection } from '@/components/sections/solutions/technology-section';
import { WhyTranzkitSection } from '@/components/sections/solutions/why-tranzkit-section';
import { CtaSection } from '@/components/sections/solutions/cta-section';
import { getSolutionsPage } from '@/lib/sanity/queries';
import { urlForImage } from '@/lib/sanity/image';
import { generateResourceMetadata } from '@/lib/seo/metadata';
import { Metadata } from 'next';

interface SolutionsPageProps {
  params: Promise<{
    locale: string;
  }>;
}

export async function generateMetadata({ params }: SolutionsPageProps): Promise<Metadata> {
  const { locale } = await params;
  const solutionsPage = await getSolutionsPage(locale);

  if (!solutionsPage) {
    return {
      title: 'Solutions',
      description: 'Explore Tranzkit transport solutions for operators and enterprises.',
    };
  }

  const ogImage = solutionsPage.seo?.ogImage
    ? urlForImage(solutionsPage.seo.ogImage).width(1200).height(630).fit('fill').url()
    : undefined;

  return generateResourceMetadata(
    {
      metaTitle: solutionsPage.seo?.metaTitle,
      metaDescription: solutionsPage.seo?.metaDescription,
      ogImage,
      keywords: solutionsPage.seo?.keywords?.[locale] || solutionsPage.seo?.keywords,
      canonicalUrl: 'solutions',
      noIndex: solutionsPage.seo?.noIndex,
      noFollow: solutionsPage.seo?.noFollow,
    },
    locale,
    solutionsPage.hero?.title?.smart,
    solutionsPage.hero?.subtitle
  );
}

export default async function SolutionsPage({ params }: SolutionsPageProps) {
  const { locale } = await params;
  const solutionsData = await getSolutionsPage(locale);

  return (
    <main>
      <HeroSectionSolutions data={solutionsData?.hero} />
      <IntroSection data={solutionsData?.intro} />
      <AudienceCardsSection data={solutionsData?.audienceCards} />
      <TechnologySection data={solutionsData?.technology} />
      <WhyTranzkitSection data={solutionsData?.whyTranzkit} />
      <CtaSection data={solutionsData?.cta} />
    </main>
  );
}
