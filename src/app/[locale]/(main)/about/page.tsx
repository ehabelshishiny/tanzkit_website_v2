import { AboutHero } from '@/components/sections/about/about-hero';
import { StorySection } from '@/components/sections/about/story-section';
import { Timeline } from '@/components/sections/about/timeline';
import { TeamGrid } from '@/components/sections/about/team-grid';
import { CareersList } from '@/components/sections/about/careers-list';
import { CTASection } from '@/components/sections/homepage/cta-section';

export default function AboutPage() {
  return (
    <>
      <AboutHero />
      <StorySection />
      <Timeline />
      <TeamGrid />
      <CareersList />
      <CTASection />
    </>
  );
}

