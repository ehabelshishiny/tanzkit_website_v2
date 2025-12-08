import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Card } from '@/components/ui/card';
import { Typography } from '@/components/ui/typography';
import { useTranslations } from 'next-intl';

export default function FAQPage() {
  const t = useTranslations('resources.faq');
  const faqs = t.raw('items');
  
  return (
    <main className="container py-12">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <Typography variant="h1" className="mb-4">
            {t('hero.title')}
          </Typography>
          <Typography variant="body" className="text-muted-foreground">
            {t('hero.subtitle')}
          </Typography>
        </div>

        <Card className="p-8">
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq: any, index: number) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger className="text-left">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </Card>
      </div>
    </main>
  );
}
