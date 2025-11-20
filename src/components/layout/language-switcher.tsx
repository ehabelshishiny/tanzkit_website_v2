'use client';

import { useLocale } from 'next-intl';
import { usePathname, useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Globe } from 'lucide-react';
import { useEffect, useRef } from 'react';

export function LanguageSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const scrollPositionRef = useRef<number>(0);
  const isNavigatingRef = useRef<boolean>(false);

  // Restore scroll position after language switch
  useEffect(() => {
    if (isNavigatingRef.current) {
      // Use requestAnimationFrame to ensure DOM is ready
      requestAnimationFrame(() => {
        window.scrollTo({
          top: scrollPositionRef.current,
          behavior: 'instant' as ScrollBehavior,
        });
        isNavigatingRef.current = false;
      });
    }
  }, [pathname]);

  const switchLocale = () => {
    // Save current scroll position
    scrollPositionRef.current = window.scrollY;
    isNavigatingRef.current = true;

    const newLocale = locale === 'en' ? 'ar' : 'en';
    const newPath = pathname.replace(`/${locale}`, `/${newLocale}`);

    // Push with scroll: false to prevent automatic scroll to top
    router.push(newPath, { scroll: false });
  };

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={switchLocale}
      className="gap-2 hover:bg-transparent dark:hover:bg-transparent hover:text-primary transition-colors"
    >
      <Globe className="h-4 w-4" />
      {locale === 'en' ? 'العربية' : 'English'}
    </Button>
  );
}

