import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Card } from '@/components/ui/card';

const faqs = [
  {
    question: 'How do I get started with Tranzkit?',
    answer: 'Getting started is easy! Download our app from the App Store or Google Play, create an account, and you can start booking rides immediately.'
  },
  {
    question: 'What payment methods do you accept?',
    answer: 'We accept all major credit cards, debit cards, and digital wallets including Apple Pay and Google Pay.'
  },
  {
    question: 'Is Tranzkit available in my city?',
    answer: 'We currently operate in major cities across the Middle East and are expanding rapidly. Check our app to see if we serve your area.'
  },
  {
    question: 'How do I become a driver?',
    answer: 'Visit our driver portal, complete the application form, and our team will guide you through the onboarding process.'
  },
  {
    question: 'What are your enterprise solutions?',
    answer: 'We offer comprehensive fleet management, employee transportation, and custom integration solutions for businesses of all sizes.'
  }
];

export default function FAQPage() {
  return (
    <main className="container py-12">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Frequently Asked Questions
          </h1>
          <p className="text-lg text-muted-foreground">
            Find answers to common questions about Tranzkit
          </p>
        </div>

        <Card className="p-8">
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
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

