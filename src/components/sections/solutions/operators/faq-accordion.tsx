'use client';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { ScrollReveal } from '@/components/animations/scroll-reveal';

const faqs = [
  {
    question: 'How do I onboard new drivers to the platform?',
    answer: 'Our streamlined onboarding process includes document verification, background checks, and training modules. Drivers can complete the entire process through the mobile app in 24-48 hours.'
  },
  {
    question: 'What are the commission rates for operators?',
    answer: 'Commission rates are flexible and depend on your fleet size and service area. Contact our sales team for a customized pricing plan that fits your business model.'
  },
  {
    question: 'Can I set custom pricing for different zones?',
    answer: 'Yes, our platform supports zone-based pricing, surge pricing, and custom rate cards. You have full control over pricing strategies to maximize revenue.'
  },
  {
    question: 'How does the driver payment system work?',
    answer: 'Drivers can choose from multiple payout options including instant pay, daily, or weekly transfers. All transactions are tracked in real-time with detailed earning reports.'
  },
  {
    question: 'What safety features are included?',
    answer: 'We provide comprehensive safety features including real-time tracking, SOS buttons, driver verification, trip sharing, and 24/7 support for both drivers and passengers.'
  },
  {
    question: 'Can I integrate with my existing systems?',
    answer: 'Yes, Tranzkit offers robust APIs and webhooks for seamless integration with your existing fleet management, accounting, and HR systems.'
  },
  {
    question: 'What kind of analytics and reporting do you provide?',
    answer: 'Our analytics dashboard provides real-time insights on fleet utilization, revenue, driver performance, passenger satisfaction, and operational efficiency with exportable reports.'
  },
  {
    question: 'Is there support for multiple languages?',
    answer: 'Yes, our platform supports multiple languages including English and Arabic, with more languages being added based on market demand.'
  }
];

export function FAQAccordion() {
  return (
    <section className="w-full max-w-4xl mx-auto px-4 py-16">
      <ScrollReveal>
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Find answers to common questions about our platform
          </p>
        </div>
      </ScrollReveal>

      <ScrollReveal delay={0.2}>
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
      </ScrollReveal>
    </section>
  );
}

