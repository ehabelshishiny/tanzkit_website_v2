import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { Geist, Geist_Mono, IBM_Plex_Sans_Arabic } from 'next/font/google';
import localFont from 'next/font/local';
import { locales } from '@/i18n';
import { LenisProvider } from '@/components/providers/lenis-provider';
import { ThemeProvider } from '@/components/providers/theme-provider';
import { PageTransitionLayout } from '@/components/providers/page-transition-layout';
import { Toaster } from 'sonner';
import '../globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
  display: 'swap',
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
  display: 'swap',
});

const ibmPlexSansArabic = IBM_Plex_Sans_Arabic({
  variable: '--font-ibm-plex-arabic',
  subsets: ['arabic'],
  weight: ['300', '400', '500', '600', '700'],
  display: 'swap',
});

// Custom DIN Next Font - Multiple Weights
const alarabiaFont = localFont({
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
  variable: '--font-alarabia',
  display: 'swap',
});


// Custom Alarabia Font
// const alarabiaFont = localFont({
//   src: '../../../public/fonts/Alarabia_font.ttf',
//   variable: '--font-alarabia',
//   display: 'swap',
//   weight: '400 700',
// });


export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  // Ensure that the incoming `locale` is valid
  if (!locales.includes(locale as any)) {
    notFound();
  }

  // Providing all messages to the client
  // side is the easiest way to get started
  const messages = await getMessages();

  return (
    <html
      lang={locale}
      dir={locale === 'ar' ? 'rtl' : 'ltr'}
      suppressHydrationWarning
    >
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${ibmPlexSansArabic.variable} ${alarabiaFont.variable} antialiased`}
        suppressHydrationWarning
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <LenisProvider>
            <NextIntlClientProvider messages={messages}>
              <PageTransitionLayout>
                {children}
              </PageTransitionLayout>
            </NextIntlClientProvider>
          </LenisProvider>
          <Toaster position="top-right" richColors />
        </ThemeProvider>
      </body>
    </html>
  );
}
