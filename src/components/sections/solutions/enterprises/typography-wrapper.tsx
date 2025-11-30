'use client';

import { Sora, Inter, IBM_Plex_Sans_Arabic, Noto_Sans_Arabic } from 'next/font/google';
import { ReactNode } from 'react';
import { useLocale } from 'next-intl';

// English fonts
const sora = Sora({
  weight: '600',
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-sora',
});

const inter = Inter({
  weight: ['400', '500'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

// Arabic fonts
const ibmPlexArabic = IBM_Plex_Sans_Arabic({
  weight: ['400', '500'],
  subsets: ['arabic'],
  display: 'swap',
  variable: '--font-ibm-plex-arabic',
});

const notoSansArabic = Noto_Sans_Arabic({
  weight: ['600', '700'],
  subsets: ['arabic'],
  display: 'swap',
  variable: '--font-noto-sans-arabic',
});

interface TypographyWrapperProps {
  children: ReactNode;
}

export function TypographyWrapper({ children }: TypographyWrapperProps) {
  const locale = useLocale();
  const isArabic = locale === 'ar';

  // Select fonts based on locale
  const headingFont = isArabic ? 'var(--font-noto-sans-arabic)' : 'var(--font-sora)';
  const bodyFont = isArabic ? 'var(--font-ibm-plex-arabic)' : 'var(--font-inter)';

  return (
    <div
      className={`${sora.variable} ${inter.variable} ${ibmPlexArabic.variable} ${notoSansArabic.variable}`}
      style={{
        // Define custom CSS variables for typography
        // @ts-ignore
        '--font-heading': headingFont,
        '--font-body': bodyFont,
      }}
    >
      <style jsx global>{`
        /* Scoped typography styles for Enterprises page only */
        .enterprises-typography h1 {
          font-family: var(--font-heading), sans-serif;
          font-size: 3rem; /* 48px */
          line-height: 3.5rem; /* 56px */
          font-weight: 600;
        }

        .enterprises-typography h2 {
          font-family: var(--font-heading), sans-serif;
          font-size: 2.25rem; /* 36px */
          line-height: 2.625rem; /* 42px */
          font-weight: 600;
        }

        .enterprises-typography h3 {
          font-family: var(--font-heading), sans-serif;
          font-size: 1.5rem; /* 24px */
          line-height: 1.875rem; /* 30px */
          font-weight: 600;
        }

        .enterprises-typography .subheading,
        .enterprises-typography .button-text,
        .enterprises-typography .label {
          font-family: var(--font-body), sans-serif;
          font-size: 1.125rem; /* 18px */
          line-height: 1.5rem; /* 24px */
          font-weight: 500;
        }

        .enterprises-typography p,
        .enterprises-typography .body-text {
          font-family: var(--font-body), sans-serif;
          font-size: 1rem; /* 16px */
          line-height: 1.5rem; /* 24px */
          font-weight: 400;
        }

        .enterprises-typography .small-text,
        .enterprises-typography .caption {
          font-family: var(--font-body), sans-serif;
          font-size: 0.875rem; /* 14px */
          line-height: 1.375rem; /* 22px */
          font-weight: 400;
        }

        .enterprises-typography .feature-list-text {
          font-family: var(--font-body), sans-serif;
          font-size: 1rem; /* 16px */
          line-height: 1.5rem; /* 24px */
          font-weight: 400;
        }

        /* Responsive typography for mobile */
        @media (max-width: 768px) {
          .enterprises-typography h1 {
            font-size: 2rem; /* 32px on mobile */
            line-height: 2.5rem; /* 40px */
          }

          .enterprises-typography h2 {
            font-size: 1.75rem; /* 28px on mobile */
            line-height: 2.25rem; /* 36px */
          }

          .enterprises-typography h3 {
            font-size: 1.25rem; /* 20px on mobile */
            line-height: 1.625rem; /* 26px */
          }

          .enterprises-typography .subheading,
          .enterprises-typography .button-text,
          .enterprises-typography .label {
            font-size: 1rem; /* 16px on mobile */
            line-height: 1.375rem; /* 22px */
          }

          .enterprises-typography p,
          .enterprises-typography .body-text {
            font-size: 0.9375rem; /* 15px on mobile */
            line-height: 1.375rem; /* 22px */
          }
        }
      `}</style>
      <div className="enterprises-typography">{children}</div>
    </div>
  );
}
