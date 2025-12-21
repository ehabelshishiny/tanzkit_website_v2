import { Suspense } from 'react';
import { ContactHero } from '@/components/sections/contact/contact-hero';
import { ContactForm } from '@/components/forms/contact-form';
import { SocialLinks } from '@/components/sections/contact/social-links';
import { getContactPage, getSiteSettings } from '@/lib/sanity/queries';
import { notFound } from 'next/navigation';

interface ContactPageProps {
  params: Promise<{
    locale: string;
  }>;
}

export default async function ContactPage({ params }: ContactPageProps) {
  const { locale } = await params;

  // Fetch contact page data and site settings from Sanity
  const [contactPageData, siteSettings] = await Promise.all([
    getContactPage(locale),
    getSiteSettings(locale),
  ]);

  if (!contactPageData) {
    notFound();
  }

  return (
    <>
      <ContactHero data={contactPageData.hero} />
      <section className="container py-12">
        <Suspense fallback={
          <div className="mx-auto max-w-2xl">
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
          <ContactForm labels={contactPageData.form} />
        </Suspense>
      </section>
      <SocialLinks data={siteSettings.socialLinks} />
    </>
  );
}
