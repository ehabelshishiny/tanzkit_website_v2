'use client';

import Link from 'next/link';
import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLocale } from 'next-intl';

interface SubPage {
  name: string;
  href: string;
  description?: string;
  isParent?: boolean;
}

interface NavDropdownProps {
  label: string;
  href: string;
  subPages: SubPage[];
}

export function NavDropdown({ label, href, subPages }: NavDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const locale = useLocale();
  const isRTL = locale === 'ar';

  return (
    <div
      className="relative"
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      {/* Main Nav Link */}
      <Link
        href={href}
        className="flex items-center gap-1 text-sm font-medium transition-colors hover:text-primary"
      >
        {label}
        <ChevronDown
          className={`w-4 h-4 transition-transform duration-200 ${
            isOpen ? 'rotate-180' : ''
          }`}
        />
      </Link>

      {/* Dropdown Menu with RTL Support */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className={`absolute top-full mt-2 w-64 bg-background border rounded-lg shadow-lg overflow-hidden z-50 ${
              isRTL ? 'right-0' : 'left-0'
            }`}
            dir={isRTL ? 'rtl' : 'ltr'}
          >
            <div className="pb-2">
              {subPages.map((subPage, index) => (
                <Link
                  key={subPage.href}
                  href={subPage.href}
                  className={`block px-4 py-3 text-sm hover:bg-muted transition-colors ${
                    isRTL ? 'text-right' : 'text-left'
                  } ${
                    subPage.isParent ? 'bg-primary/5 border-b font-semibold text-primary' : ''
                  }`}
                >
                  <div className="font-medium">{subPage.name}</div>
                  {subPage.description && (
                    <div className="text-xs text-muted-foreground mt-1">
                      {subPage.description}
                    </div>
                  )}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
