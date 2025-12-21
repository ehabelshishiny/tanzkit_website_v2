'use client';

import { useLocale } from 'next-intl';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Globe } from 'lucide-react';
import { useEffect } from 'react';

const SCROLL_STORAGE_KEY = 'tranzkit_scroll_position';
const SCROLL_TIMESTAMP_KEY = 'tranzkit_scroll_timestamp';
const SCROLL_EXPIRY_MS = 5000; // 5 seconds expiry

export function LanguageSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Restore scroll position on mount (after navigation)
  useEffect(() => {
    const restoreScroll = () => {
      try {
        const savedPosition = sessionStorage.getItem(SCROLL_STORAGE_KEY);
        const savedTimestamp = sessionStorage.getItem(SCROLL_TIMESTAMP_KEY);

        if (savedPosition && savedTimestamp) {
          const timestamp = parseInt(savedTimestamp, 10);
          const now = Date.now();

          // Check if the saved position is still valid (within expiry time)
          if (now - timestamp < SCROLL_EXPIRY_MS) {
            const scrollY = parseInt(savedPosition, 10);

            // Use multiple attempts to ensure scroll restoration
            // This handles cases where content is still loading
            const attemptScroll = (attempt = 0) => {
              if (attempt > 10) {
                // Max 10 attempts (about 500ms total)
                sessionStorage.removeItem(SCROLL_STORAGE_KEY);
                sessionStorage.removeItem(SCROLL_TIMESTAMP_KEY);
                return;
              }

              requestAnimationFrame(() => {
                window.scrollTo({
                  top: scrollY,
                  behavior: 'instant' as ScrollBehavior,
                });

                // Verify scroll was successful
                // If page is still loading, actual scroll might be less than intended
                const currentScroll = window.scrollY;
                if (Math.abs(currentScroll - scrollY) > 10 && attempt < 10) {
                  // Try again after a short delay
                  setTimeout(() => attemptScroll(attempt + 1), 50);
                } else {
                  // Success! Clean up
                  sessionStorage.removeItem(SCROLL_STORAGE_KEY);
                  sessionStorage.removeItem(SCROLL_TIMESTAMP_KEY);
                }
              });
            };

            attemptScroll();
          } else {
            // Expired, clean up
            sessionStorage.removeItem(SCROLL_STORAGE_KEY);
            sessionStorage.removeItem(SCROLL_TIMESTAMP_KEY);
          }
        }
      } catch (error) {
        // Fail silently if sessionStorage is not available
        console.warn('Could not restore scroll position:', error);
      }
    };

    // Small delay to ensure DOM is ready
    setTimeout(restoreScroll, 50);
  }, [pathname, searchParams]); // Re-run when route changes

  const switchLocale = () => {
    try {
      // Save current scroll position to sessionStorage
      const scrollY = window.scrollY;
      sessionStorage.setItem(SCROLL_STORAGE_KEY, scrollY.toString());
      sessionStorage.setItem(SCROLL_TIMESTAMP_KEY, Date.now().toString());

      const newLocale = locale === 'en' ? 'ar' : 'en';
      
      // Preserve search params and hash if they exist
      const currentSearch = searchParams.toString();
      const currentHash = window.location.hash;
      
      // Build the new path
      let newPath = pathname.replace(`/${locale}`, `/${newLocale}`);
      
      // Append search params if they exist
      if (currentSearch) {
        newPath += `?${currentSearch}`;
      }
      
      // Append hash if it exists
      if (currentHash) {
        newPath += currentHash;
      }

      // Navigate with scroll disabled
      router.push(newPath, { scroll: false });
    } catch (error) {
      // If sessionStorage fails, still allow navigation
      console.warn('Could not save scroll position:', error);
      const newLocale = locale === 'en' ? 'ar' : 'en';
      const newPath = pathname.replace(`/${locale}`, `/${newLocale}`);
      router.push(newPath, { scroll: false });
    }
  };

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={switchLocale}
      className="gap-2 hover:bg-transparent dark:hover:bg-transparent hover:text-primary transition-colors"
      aria-label={locale === 'en' ? 'Switch to Arabic' : 'Switch to English'}
    >
      <Globe className="h-4 w-4" />
      {locale === 'en' ? 'العربية' : 'English'}
    </Button>
  );
}
