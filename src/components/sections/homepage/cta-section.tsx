'use client';

import Link from 'next/link';
import { useLocale, useTranslations } from 'next-intl';
import { Button } from '@/components/ui/button';
import { FadeIn } from '@/components/animations/fade-in';
import { TrialCTAButton } from '@/components/ui/trial-cta-button';
import { SectionContainer } from '@/components/layout/SectionContainer';
import { Typography } from '@/components/ui/typography';
import { localizeInternalHref } from '@/lib/localize-internal-href';

interface CTASectionProps {
  data?: {
    heading?: string;
    subtitle?: string;
    primaryCta?: {
      text?: string;
      href?: string;
      variant?: string;
      openInNewTab?: boolean;
    };
    secondaryCta?: {
      text?: string;
      href?: string;
      variant?: string;
      openInNewTab?: boolean;
    };
  };
}

export function CTASection({ data }: CTASectionProps) {
  const locale = useLocale();
  const t = useTranslations('homepage.cta');
  const tCommon = useTranslations('common');
  const secondaryHref = data?.secondaryCta?.href
    ? localizeInternalHref(data.secondaryCta.href, locale)
    : undefined;

  return (
    <section className="py-16 md:py-24">
      <SectionContainer>
        <FadeIn>
          <div className="mx-auto max-w-2xl text-center">
            <Typography variant="h2" align="center" className="tracking-tight">
              {data?.heading || t('heading')}
            </Typography>
            <Typography
              variant="subtitle"
              align="center"
              className="mt-4 text-muted-foreground"
            >
              {data?.subtitle || t('subtitle')}
            </Typography>
            <div className="mt-8 flex items-center justify-center gap-4">
              <TrialCTAButton
                variant="secondary"
                size="lg"
                customText={data?.primaryCta?.text}
                href={data?.primaryCta?.href}
                openInNewTab={data?.primaryCta?.openInNewTab}
              />
              {secondaryHref ? (
                <Button size="lg" variant="outline" asChild>
                  <Link
                    href={secondaryHref}
                    target={
                      data?.secondaryCta?.openInNewTab ? '_blank' : undefined
                    }
                    rel={
                      data?.secondaryCta?.openInNewTab
                        ? 'noopener noreferrer'
                        : undefined
                    }
                  >
                    {data?.secondaryCta?.text || tCommon('bookDemo')}
                  </Link>
                </Button>
              ) : (
                <Button size="lg" variant="outline">
                  {data?.secondaryCta?.text || tCommon('bookDemo')}
                </Button>
              )}
            </div>
          </div>
        </FadeIn>
      </SectionContainer>
    </section>
  );
}
