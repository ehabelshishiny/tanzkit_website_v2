'use client';

import { useTranslations } from 'next-intl';
import { useLocale } from 'next-intl';
import { FadeIn } from '@/components/animations/fade-in';
import { Typography } from '@/components/ui/typography';
import Image from 'next/image';
import { urlFor } from '@/lib/sanity/image';

interface LogoBarSectionProps {
  data?: {
    heading?: string;
    subtitle?: string;
    logos?: Array<any>; // Array of Sanity image objects
  };
}

export function LogoBarSection({ data }: LogoBarSectionProps) {
  const t = useTranslations('homepage.logoBar');
  const locale = useLocale();
  const isRTL = locale === 'ar';

  // Use Sanity logos if available, otherwise fallback to hardcoded
  const usingSanityData = !!data?.logos && data.logos.length > 0;
  const logos = usingSanityData ? data.logos : null;

  // Render logo items
  const renderLogos = (keyPrefix: string) => {
    if (usingSanityData && logos) {
      return logos
        .filter((logo) => logo && logo._ref) // Filter out null/undefined logos
        .map((logo, index) => (
          <div
            key={`${keyPrefix}-${index}`}
            className="h-16 w-32 md:h-20 md:w-40 flex items-center justify-center rounded-lg bg-background flex-shrink-0 p-3"
          >
            <div className="relative w-full h-full">
              <Image
                src={urlFor(logo).width(200).fit('max').url()}
                alt={`Partner ${index + 1}`}
                fill
                className="object-contain"
              />
            </div>
          </div>
        ));
    }

    return [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((i) => (
      <div
        key={`${keyPrefix}-${i}`}
        className="h-16 w-32 md:h-30 md:w-30 flex items-center justify-center rounded-lg bg-background flex-shrink-0 p-3"
      >
        <div className="relative w-full h-full">
          <Image
            src={`/assets/homepage/logos/${i}.png`}
            alt={`Partner ${i}`}
            fill
            className="object-contain"
          />
        </div>
      </div>
    ));
  };

  return (
    <section className="py-16 md:py-24 overflow-hidden">
      <style jsx>{`
        @keyframes marquee {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }

        @keyframes marquee-rtl {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(50%);
          }
        }

        .marquee-container {
          display: flex;
          animation: ${isRTL ? 'marquee-rtl' : 'marquee'} 30s linear infinite;
        }

        .marquee-container:hover {
          animation-play-state: paused;
        }
      `}</style>

      <div className="container">
        <FadeIn>
          <div className="text-center mb-12">
            <Typography variant="h3" align="center" className="mb-4">
              {data?.heading || t('heading')}
            </Typography>
            <Typography variant="body" align="center" className="text-muted-foreground">
              {data?.subtitle || t('subtitle')}
            </Typography>
          </div>
        </FadeIn>

        {/* Infinite Marquee Container */}
        <div className="relative flex overflow-hidden">
          <div className="marquee-container flex gap-8">
            {renderLogos('group1')}
            {renderLogos('group2')}
          </div>
        </div>
      </div>
    </section>
  );
}
