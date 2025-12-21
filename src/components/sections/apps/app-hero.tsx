'use client';

import { motion } from 'framer-motion';
import { Download } from 'lucide-react';
import Image from 'next/image';
import { Typography } from '@/components/ui/typography';
import { Button } from '@/components/ui/button';
import { useLocale } from 'next-intl';

interface AppHeroProps {
  appName: string;
  tagline?: string;
  appDescription: string;
  heroImage: string;
  layoutType: 'portrait' | 'landscape';
  platforms?: {
    ios?: boolean;
    android?: boolean;
    web?: boolean;
  };
  storeUrls?: {
    appStore?: string;
    playStore?: string;
    webApp?: string;
  };
}

export function AppHero({
  appName,
  tagline,
  appDescription,
  heroImage,
  layoutType,
  platforms,
  storeUrls
}: AppHeroProps) {
  const locale = useLocale();

  const downloadPrefix = locale === 'ar' ? 'حمّل' : 'Download';
  const defaultSubtitle = locale === 'ar' ? 'تجربة إدارة نقل سلسة' : 'Experience seamless transportation management';
  const appStoreText = locale === 'ar' ? 'آب ستور' : 'App Store';
  const googlePlayText = locale === 'ar' ? 'جوجل بلاي' : 'Google Play';
  const webAppText = locale === 'ar' ? 'تطبيق الويب' : 'Web App';

  // Use tagline if available, otherwise use default subtitle
  const subtitle = tagline || defaultSubtitle;

  // Determine which buttons to show based on platforms
  const showAppStore = platforms?.ios;
  const showPlayStore = platforms?.android;
  const showWebApp = platforms?.web;

  return (
    <section className="w-full bg-gradient-to-b from-primary/5 to-background py-20">
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Typography variant="h2" className="mb-6">
              {downloadPrefix} {appName}
            </Typography>
            <Typography variant="subtitle" className="text-muted-foreground mb-8">
              {subtitle}
            </Typography>
            <div className="flex flex-wrap gap-4">
              {showAppStore && (
                <Button
                  size="lg"
                  className="gap-2"
                  asChild={!!storeUrls?.appStore}
                >
                  {storeUrls?.appStore ? (
                    <a href={storeUrls.appStore} target="_blank" rel="noopener noreferrer">
                      <Download className="w-5 h-5" />
                      {appStoreText}
                    </a>
                  ) : (
                    <>
                      <Download className="w-5 h-5" />
                      {appStoreText}
                    </>
                  )}
                </Button>
              )}
              {showPlayStore && (
                <Button
                  size="lg"
                  variant="outline"
                  className="gap-2"
                  asChild={!!storeUrls?.playStore}
                >
                  {storeUrls?.playStore ? (
                    <a href={storeUrls.playStore} target="_blank" rel="noopener noreferrer">
                      <Download className="w-5 h-5" />
                      {googlePlayText}
                    </a>
                  ) : (
                    <>
                      <Download className="w-5 h-5" />
                      {googlePlayText}
                    </>
                  )}
                </Button>
              )}
              {showWebApp && (
                <Button
                  size="lg"
                  variant="outline"
                  className="gap-2"
                  asChild={!!storeUrls?.webApp}
                >
                  {storeUrls?.webApp ? (
                    <a href={storeUrls.webApp} target="_blank" rel="noopener noreferrer">
                      <Download className="w-5 h-5" />
                      {webAppText}
                    </a>
                  ) : (
                    <>
                      <Download className="w-5 h-5" />
                      {webAppText}
                    </>
                  )}
                </Button>
              )}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex justify-center"
          >
            <div className="relative">
              <div className="rounded-4xl shadow-2xl relative bg-transparent">
                <Image
                  src={heroImage}
                  alt={`${appName} Screenshot`}
                  width={layoutType === 'portrait' ? 256 : 500}
                  height={layoutType === 'portrait' ? 500 : 256}
                  className="object-contain"
                  priority
                />
              </div>
              <div className="absolute -top-4 -right-4 w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center shadow-lg">
                <Download className="w-10 h-10 text-primary" />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
