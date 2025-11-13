import { OperatorsHeroSection } from '@/components/sections/solutions/operators/hero-section';
import { OperatorsFeaturesSection } from '@/components/sections/solutions/operators/features-section';
import { OperatorsAiImpactSection } from '@/components/sections/solutions/operators/ai-impact-section';
import { OperatorsCtaSection } from '@/components/sections/solutions/operators/cta-section';

export default function OperatorsDriversPage() {
  return (
    <main>
      <OperatorsHeroSection />
      <OperatorsFeaturesSection />
      <OperatorsAiImpactSection />
      <OperatorsCtaSection />
    </main>
  );
}

