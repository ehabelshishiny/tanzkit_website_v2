import { HeroSection } from '@/components/sections/hero-section';
import { ContactForm } from '@/components/forms/contact-form';

export default function ContactPage() {
  return (
    <>
      <HeroSection 
        title="Get in Touch"
        subtitle="We're here to help you transform your transportation business"
      />
      <section className="container py-12">
        <ContactForm />
      </section>
    </>
  );
}

