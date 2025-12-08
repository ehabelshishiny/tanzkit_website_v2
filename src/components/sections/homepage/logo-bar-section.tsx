'use client';

import { useTranslations } from 'next-intl';
import { FadeIn } from '@/components/animations/fade-in';
import { Typography } from '@/components/ui/typography';
import Image from 'next/image';

export function LogoBarSection() {
  const t = useTranslations('homepage.logoBar');

  // Partner logos - 8 partners
  const partnerCount = [1, 2, 3, 4, 5, 6, 7, 8];

  return (
    <section className="py-16 md:py-24 overflow-hidden">
      <div className="container">
        <FadeIn>
          <div className="text-center mb-12">
            <Typography variant="h3" align="center" className="mb-4">
              {t('heading')}
            </Typography>
            <Typography variant="body" align="center" className="text-muted-foreground">
              {t('subtitle')}
            </Typography>
          </div>
        </FadeIn>

        {/* Infinite Marquee Container */}
        <div className="logo-marquee">
          {/* First Group */}
          <div className="logo-marquee-group">
            {partnerCount.map((index) => (
              <div 
                key={`group1-${index}`}
                className="relative h-16 w-32 md:h-20 md:w-40 flex items-center justify-center rounded-lg bg-background flex-shrink-0 p-4"
              >
                <Image
                  src={`/assets/homepage/logos/${index}.png`}
                  alt={`Partner ${index}`}
                  fill
                  className="object-contain p-2"
                  sizes="160px"
                />
              </div>
            ))}
          </div>

          {/* Second Group (Duplicate for seamless infinite loop) */}
          <div className="logo-marquee-group" aria-hidden="true">
            {partnerCount.map((index) => (
              <div 
                key={`group2-${index}`}
                className="relative h-16 w-32 md:h-20 md:w-40 flex items-center justify-center rounded-lg bg-background flex-shrink-0 p-4"
              >
                <Image
                  src={`/assets/homepage/logos/${index}.png`}
                  alt={`Partner ${index}`}
                  fill
                  className="object-contain p-2"
                  sizes="160px"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
