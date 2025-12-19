import { AboutHero } from '@/components/sections/about/about-hero';
import { StorySection } from '@/components/sections/about/story-section';
import { Timeline } from '@/components/sections/about/timeline';
import { TeamGrid } from '@/components/sections/about/team-grid';
import { CareersList } from '@/components/sections/about/careers-list';
import { CTASection } from '@/components/sections/homepage/cta-section';
import { getAboutPage } from '@/lib/sanity/queries';

interface AboutPageProps {
  params: Promise<{
    locale: string;
  }>;
}

export default async function AboutPage({ params }: AboutPageProps) {
  const { locale } = await params;
  const aboutData = await getAboutPage(locale);

  return (
    <>
      <AboutHero data={aboutData.hero} />
      <StorySection data={aboutData.story} />
      <Timeline data={aboutData.timeline} />
      <TeamGrid data={aboutData.team} />
      <CareersList
        heading={aboutData.careers.heading}
        subtitle={aboutData.careers.subtitle}
        openings={aboutData.careers.openings}
      />
      <CTASection data={aboutData.cta} />
    </>
  );
}

