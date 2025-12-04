'use client';

import { useTranslations } from 'next-intl';
import { Typography } from '@/components/ui/typography';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { ScrollReveal } from '@/components/animations/scroll-reveal';

export function FAQAccordion() {
  const t = useTranslations('solutions.operatorsDrivers.faq');

  return (
    <section className="w-full max-w-4xl mx-auto px-4 py-16">
      <ScrollReveal>
        <div className="text-center mb-12">
          <Typography variant="h2" className="mb-4">
            {t('title')}
          </Typography>
          <Typography variant="body" className="text-muted-foreground max-w-2xl mx-auto">
            {t('subtitle')}
          </Typography>
        </div>
      </ScrollReveal>

      <ScrollReveal delay={0.2}>
        <Accordion type="single" collapsible className="w-full">
          {[0, 1, 2, 3, 4, 5, 6, 7].map((index) => (
            <AccordionItem key={index} value={`item-${index}`}>
              <AccordionTrigger className="text-left">
                {t(`items.${index}.question`)}
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                {t(`items.${index}.answer`)}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </ScrollReveal>
    </section>
  );
}
