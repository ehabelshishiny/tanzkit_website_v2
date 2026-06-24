'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { LanguageSwitcher } from './language-switcher';
import { NavDropdown } from '../navigation/nav-dropdown';
import { Logo } from './logo';
import { ThemeToggle } from './theme-toggle';
import { TrialCTAButton } from '@/components/ui/trial-cta-button';

interface NavigationItem {
  name: string;
  href: string;
  subPages: Array<{
    name: string;
    href: string;
    description?: string;
    isParent?: boolean;
  }>;
}

interface HeaderClientProps {
  locale: string;
  navigation: NavigationItem[];
  logo?: {
    src?: string;
    alt?: string;
  };
  headerCtaHref?: string;
}

export function HeaderClient({
  locale,
  navigation,
  logo,
  headerCtaHref,
}: HeaderClientProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <nav className="w-full px-6 xl:px-8" dir="ltr">
        <div className="grid grid-cols-[auto_1fr_auto] xl:grid-cols-3 items-center h-16 gap-4">
          {/* Left: Logo */}
          <div className="flex items-center justify-start">
            <Link href={`/${locale}`} className="flex items-center">
              <Logo src={logo?.src} alt={logo?.alt} />
            </Link>
          </div>

          {/* Center: Desktop Navigation - Only show at xl (1280px) and above */}
          <div className="hidden xl:flex items-center justify-center">
            <div
              className={`flex gap-6 ${locale === 'ar' ? 'flex-row-reverse' : ''}`}
            >
              {navigation.map((item) =>
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
                ),
              )}
            </div>
          </div>

          {/* Right: Action Buttons */}
          <div className="flex items-center gap-3 justify-self-end">
            {/* Desktop (xl and above): Theme Toggle, Language Switcher, Trial Button */}
            <div className="hidden xl:flex items-center gap-2">
              <div className="flex items-center gap-1 pointer-events-auto">
                <ThemeToggle />
                <LanguageSwitcher />
              </div>
              <div className="w-px h-6 bg-border mx-2" />
              <TrialCTAButton
                variant="primary"
                size="lg"
                className="relative z-10 pointer-events-auto"
                href={headerCtaHref}
              />
            </div>

            {/* Mobile/Tablet (below xl): Theme Toggle, Language Switcher, Menu Button */}
            <div className="flex xl:hidden items-center gap-2">
              <div className="flex items-center gap-1 pointer-events-auto">
                <ThemeToggle />
                <LanguageSwitcher />
              </div>
              <button
                className="p-2 pointer-events-auto"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                aria-label="Toggle menu"
              >
                {mobileMenuOpen ? (
                  <X className="h-6 w-6" />
                ) : (
                  <Menu className="h-6 w-6" />
                )}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Navigation Menu - Show below xl breakpoint */}
      {mobileMenuOpen && (
        <div className="xl:hidden border-t fixed left-0 right-0 bg-background z-40 max-h-[calc(100vh-4rem)] overflow-y-auto overflow-x-hidden">
          <div
            className={`w-full py-4 px-6 space-y-3`}
            dir={locale === 'ar' ? 'rtl' : 'ltr'}
          >
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
                  <div
                    className={`mt-2 space-y-2 ${locale === 'ar' ? 'mr-4' : 'ml-4'}`}
                  >
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

            {/* Mobile: Trial Button */}
            <div className="pt-4 border-t">
              <TrialCTAButton
                variant="primary"
                size="lg"
                className="w-full"
                href={headerCtaHref}
              />
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
