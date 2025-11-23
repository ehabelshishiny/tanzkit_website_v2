'use client';

import Link from 'next/link';
import { useTranslations, useLocale } from 'next-intl';
import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { LanguageSwitcher } from './language-switcher';
import { NavDropdown } from '../navigation/nav-dropdown';
import { Logo } from './logo';
import { ThemeToggle } from './theme-toggle';
import { TrialCTAButton } from '@/components/ui/trial-cta-button';

export function Header() {
  const t = useTranslations('nav');
  const locale = useLocale();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Navigation items with subpages
  const solutionsSubPages = [
    {
      name: t('solutions'),
      href: `/${locale}/solutions`,
      description: 'View all solutions',
      isParent: true
    },
    {
      name: t('submenus.solutions.enterprisesPassengers.name'),
      href: `/${locale}/solutions/enterprises-passengers`,
      description: t('submenus.solutions.enterprisesPassengers.description')
    },
    {
      name: t('submenus.solutions.operatorsDrivers.name'),
      href: `/${locale}/solutions/operators-drivers`,
      description: t('submenus.solutions.operatorsDrivers.description')
    },
  ];

  const resourcesSubPages = [
    {
      name: t('resources'),
      href: `/${locale}/resources`,
      description: 'View all resources',
      isParent: true
    },
    { name: t('submenus.resources.helpCenter'), href: `/${locale}/resources/help-center` },
    { name: t('submenus.resources.blog'), href: `/${locale}/resources/blog` },
    { name: t('submenus.resources.caseStudies'), href: `/${locale}/resources/case-studies` },
    { name: t('submenus.resources.faq'), href: `/${locale}/resources/faq` },
    { name: t('submenus.resources.webinars'), href: `/${locale}/resources/webinars` },
    { name: t('submenus.resources.whitepapers'), href: `/${locale}/resources/whitepapers` },
  ];

  const appsSubPages = [
    {
      name: t('apps'),
      href: `/${locale}/apps`,
      description: 'View all apps',
      isParent: true
    },
    { name: t('submenus.apps.supervisor'), href: `/${locale}/apps/supervisor` },
    { name: t('submenus.apps.driver'), href: `/${locale}/apps/driver` },
    { name: t('submenus.apps.rider'), href: `/${locale}/apps/rider` },
    { name: t('submenus.apps.operatorDashboard'), href: `/${locale}/apps/operator-dashboard` },
    { name: t('submenus.apps.enterpriseDashboard'), href: `/${locale}/apps/enterprise-dashboard` },
  ];

  const navigation = [
    { name: t('home'), href: `/${locale}`, subPages: [] },
    { name: t('solutions'), href: `/${locale}/solutions`, subPages: solutionsSubPages },
    { name: t('resources'), href: `/${locale}/resources`, subPages: resourcesSubPages },
    { name: t('apps'), href: `/${locale}/apps`, subPages: appsSubPages },
    { name: t('pricing'), href: `/${locale}/pricing`, subPages: [] },
    { name: t('about'), href: `/${locale}/about`, subPages: [] },
    { name: t('contact'), href: `/${locale}/contact`, subPages: [] },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
<nav className="w-full px-6 md:px-8" dir="ltr">
  <div className="grid grid-cols-[auto_1fr_auto] md:grid-cols-3 items-center h-16 gap-4">
          {/* Left: Logo */}
          <div className="flex items-center justify-start">
            <Link href={`/${locale}`} className="flex items-center">
              <Logo />
            </Link>
          </div>

          {/* Center: Desktop Navigation */}
          <div className="hidden md:flex items-center justify-center">
            <div className={`flex gap-6 ${locale === 'ar' ? 'flex-row-reverse' : ''}`}>
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
                    className="text-sm font-medium transition-colors hover:text-primary whitespace-nowrap"
                  >
                    {item.name}
                  </Link>
                )
              ))}
            </div>
          </div>

          {/* Right: Action Buttons */}
          <div className="flex items-center justify-end gap-3">
            {/* Desktop: Theme Toggle, Language Switcher, Trial Button */}
            <div className="hidden md:flex items-center gap-3">
              <ThemeToggle />
              <LanguageSwitcher />
              <TrialCTAButton variant="primary" size="lg" />
            </div>

            {/* Mobile: Menu Button */}
            <button
              className="md:hidden p-2"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Navigation Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t">
          <div className={`w-full py-4 px-6 ${locale === 'ar' ? 'flex flex-col-reverse space-y-reverse space-y-3' : 'space-y-3'}`}>
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
                  <div className={`mt-2 space-y-2 ${locale === 'ar' ? 'mr-4' : 'ml-4'}`}>
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

            {/* Mobile: Action Buttons */}
            <div className="pt-4 border-t space-y-3">
              <div className="flex items-center gap-3">
                <ThemeToggle />
                <LanguageSwitcher />
              </div>
              <TrialCTAButton variant="primary" size="lg" className="w-full" />
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
