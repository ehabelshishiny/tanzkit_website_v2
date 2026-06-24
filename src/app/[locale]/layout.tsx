import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { draftMode } from 'next/headers';
import localFont from 'next/font/local';
import Script from 'next/script';
import { locales } from '@/i18n';
import { LenisProvider } from '@/components/providers/lenis-provider';
import { ThemeProvider } from '@/components/providers/theme-provider';
import { PageTransitionLayout } from '@/components/providers/page-transition-layout';
import { ScrollToTopButton } from '@/components/ui/ScrollToTopButton';
import { Toaster } from 'sonner';
import { VisualEditing } from 'next-sanity/visual-editing';
import type { Metadata } from 'next';
import { getSiteSettings } from '@/lib/sanity/queries';
import { urlFor } from '@/lib/sanity/image';
import '../globals.css';

// ============================================
// Font Configuration - Starting Simple
// ============================================

// Geist Sans - English Primary Font (Start with just Regular)
const geistSans = localFont({
  src: [
    {
      path: '../../../public/fonts/geist-sans/Geist-Light.ttf',
      weight: '300',
      style: 'normal',
    },
    {
      path: '../../../public/fonts/geist-sans/Geist-Regular.ttf',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../../../public/fonts/geist-sans/Geist-Medium.ttf',
      weight: '500',
      style: 'normal',
    },
    {
      path: '../../../public/fonts/geist-sans/Geist-SemiBold.ttf',
      weight: '600',
      style: 'normal',
    },
    {
      path: '../../../public/fonts/geist-sans/Geist-Bold.ttf',
      weight: '700',
      style: 'normal',
    },
  ],
  variable: '--font-geist-sans',
  display: 'swap',
});

// Geist Mono - Monospace Font (Start with just Regular)
const geistMono = localFont({
  src: [
    {
      path: '../../../public/fonts/geist-mono/GeistMono-Regular.ttf',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../../../public/fonts/geist-mono/GeistMono-Medium.ttf',
      weight: '500',
      style: 'normal',
    },
    {
      path: '../../../public/fonts/geist-mono/GeistMono-SemiBold.ttf',
      weight: '600',
      style: 'normal',
    },
    {
      path: '../../../public/fonts/geist-mono/GeistMono-Bold.ttf',
      weight: '700',
      style: 'normal',
    },
  ],
  variable: '--font-geist-mono',
  display: 'swap',
});

// IBM Plex Sans Arabic - Arabic Body Text Font (Keep what works)
const ibmPlexSansArabic = localFont({
  src: [
    {
      path: '../../../public/fonts/ibm-plex-sans-arabic/IBMPlexSansArabic-Light.ttf',
      weight: '300',
      style: 'normal',
    },
    {
      path: '../../../public/fonts/ibm-plex-sans-arabic/IBMPlexSansArabic-Regular.ttf',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../../../public/fonts/ibm-plex-sans-arabic/IBMPlexSansArabic-Medium.ttf',
      weight: '500',
      style: 'normal',
    },
    {
      path: '../../../public/fonts/ibm-plex-sans-arabic/IBMPlexSansArabic-SemiBold.ttf',
      weight: '600',
      style: 'normal',
    },
    {
      path: '../../../public/fonts/ibm-plex-sans-arabic/IBMPlexSansArabic-Bold.ttf',
      weight: '700',
      style: 'normal',
    },
  ],
  variable: '--font-ibm-plex-arabic',
  display: 'swap',
});

// DIN Next - Arabic Headers Font (Keep what works)
const dinFont = localFont({
  src: [
    {
      path: '../../../public/fonts/din-next/din-next-lt-w23-ultra-light.ttf',
      weight: '200',
      style: 'normal',
    },
    {
      path: '../../../public/fonts/din-next/din-next-lt-w23-light.ttf',
      weight: '300',
      style: 'normal',
    },
    {
      path: '../../../public/fonts/din-next/din-next-lt-w23-regular.ttf',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../../../public/fonts/din-next/din-next-lt-w23-medium.ttf',
      weight: '500',
      style: 'normal',
    },
    {
      path: '../../../public/fonts/din-next/din-next-lt-w23-bold.ttf',
      weight: '700',
      style: 'normal',
    },
    {
      path: '../../../public/fonts/din-next/din-next-lt-w23-heavy.ttf',
      weight: '800',
      style: 'normal',
    },
    {
      path: '../../../public/fonts/din-next/din-next-lt-w23-black.ttf',
      weight: '900',
      style: 'normal',
    },
  ],
  variable: '--font-din',
  display: 'swap',
});

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const siteSettings = await getSiteSettings(locale);
  const faviconUrl = siteSettings?.favicon?.asset
    ? urlFor(siteSettings.favicon).width(32).height(32).fit('max').url()
    : undefined;

  return {
    title: siteSettings?.siteTitle,
    description: siteSettings?.siteDescription,
    icons: faviconUrl ? { icon: faviconUrl } : undefined,
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!locales.includes(locale as any)) {
    notFound();
  }

  const messages = await getMessages();

  return (
    <html
      lang={locale}
      dir={locale === 'ar' ? 'rtl' : 'ltr'}
      suppressHydrationWarning
    >
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${ibmPlexSansArabic.variable} ${dinFont.variable} antialiased`}
        suppressHydrationWarning
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem={false}
          disableTransitionOnChange
          storageKey="tranzkit-theme"
        >
          <LenisProvider>
            <NextIntlClientProvider messages={messages}>
              <PageTransitionLayout>{children}</PageTransitionLayout>
            </NextIntlClientProvider>
          </LenisProvider>
          <Toaster position="top-right" richColors />
        </ThemeProvider>
        <ScrollToTopButton />
        {(await draftMode()).isEnabled && <VisualEditing />}
        <Script id="codefy-widget" strategy="lazyOnload">
          {`
          (function() {
            var script = document.createElement('script');
            script.src = 'https://www.codefyhub.com/api/widget-loader.js';
            script.setAttribute('data-embed-key', 'widget_5be6d0527d374f7aba06595df38a909e2eb843bcccf58a7e');
            script.setAttribute('data-position', 'bottom-right');
            document.head.appendChild(script);
          })();
        `}
        </Script>
      </body>
    </html>
  );
}
