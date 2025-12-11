import { Suspense } from 'react';
import { ContactHero } from '@/components/sections/contact/contact-hero';
import { ContactForm } from '@/components/forms/contact-form';
import { SocialLinks } from '@/components/sections/contact/social-links';

export default function ContactPage() {
  return (
    <div className="w-full overflow-x-hidden">
      <ContactHero />
      <section className="container py-12 w-full max-w-full">
        <Suspense fallback={
          <div className="mx-auto max-w-2xl w-full px-4">
            <div className="bg-card border border-border rounded-xl shadow-lg p-8 md:p-10 animate-pulse">
              <div className="space-y-6">
                <div className="h-10 bg-muted rounded"></div>
                <div className="h-10 bg-muted rounded"></div>
                <div className="h-10 bg-muted rounded"></div>
                <div className="h-10 bg-muted rounded"></div>
                <div className="h-10 bg-muted rounded"></div>
                <div className="h-32 bg-muted rounded"></div>
                <div className="h-12 bg-muted rounded"></div>
              </div>
            </div>
          </div>
        }>
          <ContactForm />
        </Suspense>
      </section>
      <SocialLinks />
    </div>
  );
}


