'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useTranslations, useLocale } from 'next-intl';
import { Menu, X, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

export function MobileNav() {
  const t = useTranslations('nav');
  const locale = useLocale();
  const [open, setOpen] = useState(false);

  const solutionsSubPages = [
    {
      name: 'Enterprises & Passengers',
      href: `/${locale}/solutions/enterprises-passengers`,
    },
    {
      name: 'Operators & Drivers',
      href: `/${locale}/solutions/operators-drivers`,
    },
  ];

  const navItems = [
    { name: t('home'), href: `/${locale}` },
    { name: t('solutions'), href: `/${locale}/solutions`, subPages: solutionsSubPages },
    { name: t('apps'), href: `/${locale}/apps` },
    { name: t('resources'), href: `/${locale}/resources` },
    { name: t('pricing'), href: `/${locale}/pricing` },
    { name: t('about'), href: `/${locale}/about` },
    { name: t('contact'), href: `/${locale}/contact` },
  ];

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="md:hidden">
          <Menu className="h-6 w-6" />
          <span className="sr-only">Toggle menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-[300px] sm:w-[400px]">
        <SheetHeader>
          <SheetTitle>{t('menu')}</SheetTitle>
        </SheetHeader>
        <nav className="flex flex-col gap-4 mt-8">
          <Accordion type="single" collapsible className="w-full">
            {navItems.map((item, index) => (
              item.subPages ? (
                <AccordionItem key={index} value={`item-${index}`}>
                  <AccordionTrigger className="text-base font-medium">
                    {item.name}
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="flex flex-col gap-2 pl-4">
                      {item.subPages.map((subPage, subIndex) => (
                        <Link
                          key={subIndex}
                          href={subPage.href}
                          onClick={() => setOpen(false)}
                          className="text-sm text-muted-foreground hover:text-foreground transition-colors py-2"
                        >
                          {subPage.name}
                        </Link>
                      ))}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              ) : (
                <div key={index} className="py-3 border-b">
                  <Link
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className="text-base font-medium hover:text-primary transition-colors"
                  >
                    {item.name}
                  </Link>
                </div>
              )
            ))}
          </Accordion>

          <div className="flex flex-col gap-3 mt-6 pt-6 border-t">
            <Button asChild variant="outline" className="w-full">
              <Link href={`/${locale}/contact`} onClick={() => setOpen(false)}>
                {t('getStarted')}
              </Link>
            </Button>
          </div>
        </nav>
      </SheetContent>
    </Sheet>
  );
}

