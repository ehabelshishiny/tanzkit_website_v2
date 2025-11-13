'use client';

import Link from 'next/link';
import { useTranslations, useLocale } from 'next-intl';
import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { LanguageSwitcher } from './language-switcher';
import { NavDropdown } from './nav-dropdown';
import { Logo } from './logo';

export function Header() {
  const t = useTranslations('nav');
  const locale = useLocale();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Navigation items with subpages
  const solutionsSubPages = [
    {
      name: 'Enterprises & Passengers',
      href: `/${locale}/solutions/enterprises-passengers`,
      description: 'Transform enterprise transport operations'
    },
    {
      name: 'Operators & Drivers',
      href: `/${locale}/solutions/operators-drivers`,
      description: 'Empower your transport operations'
    },
  ];

  const resourcesSubPages = [
    { name: 'Help Center', href: `/${locale}/resources/help-center` },
    { name: 'Blog', href: `/${locale}/resources/blog` },
    { name: 'Case Studies', href: `/${locale}/resources/case-studies` },
    { name: 'FAQ', href: `/${locale}/resources/faq` },
    { name: 'Webinars', href: `/${locale}/resources/webinars` },
    { name: 'Whitepapers', href: `/${locale}/resources/whitepapers` },
  ];

  const navigation = [
    { name: t('home'), href: `/${locale}`, subPages: [] },
    { name: t('solutions'), href: `/${locale}/solutions`, subPages: solutionsSubPages },
    { name: t('resources'), href: `/${locale}/resources`, subPages: resourcesSubPages },
    { name: t('apps'), href: `/${locale}/apps`, subPages: [] },
    { name: t('pricing'), href: `/${locale}/pricing`, subPages: [] },
    { name: t('about'), href: `/${locale}/about`, subPages: [] },
    { name: t('contact'), href: `/${locale}/contact`, subPages: [] },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <nav className="container flex h-16 items-center px-6 md:px-8">
        {/* Logo - Left Side */}
        <div className="flex items-center">
          <Link href={`/${locale}`} className="flex items-center">
            <Logo />
          </Link>
        </div>

        {/* Desktop Navigation - Centered */}
        <div className="hidden md:flex md:gap-6 flex-1 justify-center">
          {navigation.map((item) => (
            item.subPages.length > 0 ? (
              <NavDropdown
                key={item.name}
                label={item.name}
                href={item.href}
                subPages={item.subPages}
              />
            ) : (
              <Link
                key={item.name}
                href={item.href}
                className="text-sm font-medium transition-colors hover:text-primary"
              >
                {item.name}
              </Link>
            )
          ))}
        </div>

        {/* Right Side - Language Switcher & CTA */}
        <div className="flex items-center gap-4">
          <LanguageSwitcher />
          <Button className="hidden md:inline-flex">
            {t('contact')}
          </Button>

          {/* Mobile menu button */}
          <button
            className="md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </nav>

      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t">
          <div className="container py-4 space-y-3 px-6">
            {navigation.map((item) => (
              <div key={item.name}>
                <Link
                  href={item.href}
                  className="block py-2 text-sm font-medium"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.name}
                </Link>
                {/* Mobile Subpages */}
                {item.subPages.length > 0 && (
                  <div className="ml-4 mt-2 space-y-2">
                    {item.subPages.map((subPage) => (
                      <Link
                        key={subPage.href}
                        href={subPage.href}
                        className="block py-1 text-xs text-muted-foreground hover:text-foreground"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        {subPage.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}

