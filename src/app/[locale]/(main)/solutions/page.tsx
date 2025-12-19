import { HeroSectionSolutions } from '@/components/sections/solutions/hero-section-solutions';
import { IntroSection } from '@/components/sections/solutions/intro-section';
import { AudienceCardsSection } from '@/components/sections/solutions/audience-cards-section';
import { TechnologySection } from '@/components/sections/solutions/technology-section';
import { WhyTranzkitSection } from '@/components/sections/solutions/why-tranzkit-section';
import { CtaSection } from '@/components/sections/solutions/cta-section';
import { getSolutionsPage } from '@/lib/sanity/queries';

interface SolutionsPageProps {
  params: Promise<{
    locale: string;
  }>;
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

