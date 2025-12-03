'use client';

import { useTranslations } from 'next-intl';
import { FadeIn } from '@/components/animations/fade-in';
import { Typography } from '@/components/ui/typography';

export function LogoBarSection() {
  const t = useTranslations('homepage.logoBar');

  // Placeholder for partner logos - now 8 partners
  const partners = [
    'Partner 1', 
    'Partner 2', 
    'Partner 3', 
    'Partner 4', 
    'Partner 5',
    'Partner 6',
    'Partner 7',
    'Partner 8'
  ];

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
            {partners.map((partner) => (
              <div 
                key={`group1-${partner}`}
                className="flex h-16 w-32 md:h-20 md:w-40 items-center justify-center rounded-lg bg-muted flex-shrink-0"
              >
                <Typography variant="caption" className="font-medium text-muted-foreground">
                  {partner}
                </Typography>
              </div>
            ))}
          </div>

          {/* Second Group (Duplicate for seamless infinite loop) */}
          <div className="logo-marquee-group" aria-hidden="true">
            {partners.map((partner) => (
              <div 
                key={`group2-${partner}`}
                className="flex h-16 w-32 md:h-20 md:w-40 items-center justify-center rounded-lg bg-muted flex-shrink-0"
              >
                <Typography variant="caption" className="font-medium text-muted-foreground">
                  {partner}
                </Typography>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
