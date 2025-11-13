'use client';

import Link from 'next/link';
import { useTranslations, useLocale } from 'next-intl';

export function Footer() {
  const t = useTranslations('nav');
  const locale = useLocale();

  const footerLinks = {
    solutions: [
      { name: 'For Drivers & Passengers', href: `/${locale}/solutions#drivers` },
      { name: 'For Enterprises', href: `/${locale}/solutions#enterprises` },
      { name: 'For Transport Operators', href: `/${locale}/solutions#operators` },
    ],
    resources: [
      { name: 'Help Center', href: `/${locale}/resources/help-center` },
      { name: 'Blog', href: `/${locale}/resources/blog` },
      { name: 'Case Studies', href: `/${locale}/resources/case-studies` },
      { name: 'FAQ', href: `/${locale}/resources/faq` },
    ],
    company: [
      { name: t('about'), href: `/${locale}/about` },
      { name: 'Careers', href: `/${locale}/about/careers` },
      { name: t('contact'), href: `/${locale}/contact` },
    ],
  };

  return (
    <footer className="border-t bg-muted/50">
      <div className="container py-12 md:py-16 px-6 md:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4 text-center md:text-left">
          {/* Brand */}
          <div className="space-y-4">
            <h3 className="text-2xl font-bold">Tranzkit</h3>
            <p className="text-sm text-muted-foreground">
              Transform your transportation business with our comprehensive platform.
            </p>
          </div>

          {/* Solutions */}
          <div className="space-y-4">
            <h4 className="font-semibold">{t('solutions')}</h4>
            <ul className="space-y-3">
              {footerLinks.solutions.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div className="space-y-4">
            <h4 className="font-semibold">{t('resources')}</h4>
            <ul className="space-y-3">
              {footerLinks.resources.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div className="space-y-4">
            <h4 className="font-semibold">Company</h4>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t pt-8 text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} Tranzkit. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

