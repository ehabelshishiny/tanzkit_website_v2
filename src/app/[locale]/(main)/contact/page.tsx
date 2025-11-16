import { ContactHero } from '@/components/sections/contact/contact-hero';
import { ContactForm } from '@/components/forms/contact-form';
import { SocialLinks } from '@/components/sections/contact/social-links';

export default function ContactPage() {
  return (
    <>
      <ContactHero />
      <section className="container py-12">
        <ContactForm />
      </section>
      <SocialLinks />
    </>
  );
}

