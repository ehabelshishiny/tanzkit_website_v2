import { AnimatedHeader } from '@/components/sections/resources/animated-header';
import { FilterTabs } from '@/components/sections/resources/filter-tabs';
import { CardList } from '@/components/sections/resources/card-list';
import { CTASection } from '@/components/sections/cta-section';

export default function ResourcesPage() {
  return (
    <>
      <AnimatedHeader />
      <FilterTabs />
      <CardList />
      <CTASection />
    </>
  );
}

