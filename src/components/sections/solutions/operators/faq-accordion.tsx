'use client';

import { Typography } from '@/components/ui/typography';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { ScrollReveal } from '@/components/animations/scroll-reveal';

interface FAQAccordionProps {
  data?: {
    title?: string;
    subtitle?: string;
    items?: Array<{
      question?: string;
      answer?: string;
    }>;
  };
}

export function FAQAccordion({ data }: FAQAccordionProps) {
  // Render empty if no data to maintain consistent structure
  if (!data) return <section className="w-full max-w-7xl mx-auto px-4 py-16" />;

  return (
    <section className="w-full max-w-4xl mx-auto px-4 py-16">
      <ScrollReveal>
        <div className="text-center mb-12">
          <Typography variant="h2" className="mb-4">
            {data.title}
          </Typography>
          <Typography variant="body" className="text-muted-foreground max-w-2xl mx-auto">
            {data.subtitle}
          </Typography>
        </div>
      </ScrollReveal>

      <ScrollReveal delay={0.2}>
        <Accordion type="single" collapsible className="w-full">
          {data.items?.map((item, index) => (
            <AccordionItem key={index} value={`item-${index}`}>
              <AccordionTrigger className="text-left">
                {item.question}
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                {item.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </ScrollReveal>
    </section>
  );
}
