'use client';

import Link from 'next/link';
import { useTranslations, useLocale } from 'next-intl';

export function Footer() {
  const t = useTranslations('nav');
  const tFooter = useTranslations('footer');
  const locale = useLocale();
  const isRTL = locale === 'ar';

  const footerLinks = {
    solutions: [
      { name: tFooter('solutions.enterprisesPassengers'), href: `/${locale}/solutions/enterprises-passengers` },
      { name: tFooter('solutions.operatorsDrivers'), href: `/${locale}/solutions/operators-drivers` },
    ],
    resources: [
      { name: tFooter('resources.helpCenter'), href: `/${locale}/resources/help-center` },
      { name: tFooter('resources.blog'), href: `/${locale}/resources/blog` },
      { name: tFooter('resources.caseStudies'), href: `/${locale}/resources/case-studies` },
      { name: tFooter('resources.faq'), href: `/${locale}/resources/faq` },
    ],
    company: [
      { name: t('apps'), href: `/${locale}/apps` },
      { name: t('about'), href: `/${locale}/about` },
      { name: tFooter('company.careers'), href: `/${locale}/about/careers` },
      { name: t('contact'), href: `/${locale}/contact` },
    ],
  };

  return (
    <footer className="border-t bg-muted/50">
      <div className="container mx-auto pt-12 md:pt-16 pb-4 md:pb-6 px-6 md:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4 justify-items-center">
          {/* Brand */}
          <div className="space-y-4">
            <h3 className="text-2xl font-bold">{isRTL ? 'ترانزكِت' : 'Tranzkit'}</h3>
            <p className="text-sm text-muted-foreground">
              {tFooter('brand.tagline')}
            </p>
          </div>

          {/* Solutions */}
          <div className="space-y-4">
            <Link href={`/${locale}/solutions`} className="block">
              <h4 className="font-semibold hover:text-foreground transition-colors cursor-pointer m-0">{t('solutions')}</h4>
            </Link>
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
            <Link href={`/${locale}/resources`} className="block">
              <h4 className="font-semibold hover:text-foreground transition-colors cursor-pointer m-0">{t('resources')}</h4>
            </Link>
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
            <span className="block">
              <h4 className="font-semibold m-0">{t('company')}</h4>
            </span>
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

        <div className="mt-8 border-t pt-2 pb-2 text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} {isRTL ? 'ترانزكِت' : 'Tranzkit'}. {tFooter('copyright')}</p>
        </div>
      </div>
    </footer>
  );
}

