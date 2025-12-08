'use client';

import { useTranslations, useLocale } from 'next-intl';
import { Card } from '@/components/ui/card';
import { Typography } from '@/components/ui/typography';
import { ScrollReveal } from '@/components/animations/scroll-reveal';
import { Check, X } from 'lucide-react';

export function ComparisonTable() {
  const t = useTranslations('pricing.comparison');
  const locale = useLocale();
  const isRTL = locale === 'ar';

  const features = [
    { key: 'vehicleTracking', starter: true, professional: true, enterprise: true },
    { key: 'mobileApps', starter: true, professional: true, enterprise: true },
    { key: 'basicAnalytics', starter: true, professional: true, enterprise: true },
    { key: 'emailSupport', starter: true, professional: true, enterprise: true },
    { key: 'aiRouteOptimization', starter: false, professional: true, enterprise: true },
    { key: 'prioritySupport', starter: false, professional: true, enterprise: true },
    { key: 'customBranding', starter: false, professional: true, enterprise: true },
    { key: 'apiAccess', starter: false, professional: true, enterprise: true },
    { key: 'whiteLabelSolution', starter: false, professional: false, enterprise: true },
    { key: 'dedicatedAccountManager', starter: false, professional: false, enterprise: true },
    { key: 'customIntegrations', starter: false, professional: false, enterprise: true },
    { key: 'slaGuarantees', starter: false, professional: false, enterprise: true },
    { key: 'multiRegionSupport', starter: false, professional: false, enterprise: true },
  ];

  return (
    <section className="w-full max-w-6xl mx-auto px-4 py-16">
      <ScrollReveal>
        <div className="text-center mb-12">
          <Typography variant="h2" align="center" className="mb-4">
            {t('title')}
          </Typography>
          <Typography variant="subtitle" align="center" className="text-muted-foreground max-w-2xl mx-auto">
            {t('subtitle')}
          </Typography>
        </div>
      </ScrollReveal>

      <ScrollReveal delay={0.2}>
        <Card className="overflow-x-auto">
          <table className="w-full" dir={isRTL ? 'rtl' : 'ltr'}>
            <thead>
              <tr className="border-b">
                <th className={`${isRTL ? 'text-right' : 'text-left'} p-4 font-semibold`}>
                  <Typography variant="body" className="font-semibold">
                    {t('tableHeaders.feature')}
                  </Typography>
                </th>
                <th className="text-center p-4 font-semibold">
                  <Typography variant="body" className="font-semibold">
                    {t('tableHeaders.starter')}
                  </Typography>
                </th>
                <th className="text-center p-4 font-semibold bg-primary/5">
                  <Typography variant="body" className="font-semibold">
                    {t('tableHeaders.professional')}
                  </Typography>
                </th>
                <th className="text-center p-4 font-semibold">
                  <Typography variant="body" className="font-semibold">
                    {t('tableHeaders.enterprise')}
                  </Typography>
                </th>
              </tr>
            </thead>
            <tbody>
              {features.map((feature, index) => (
                <tr 
                  key={index} 
                  className="border-b hover:bg-muted/50 transition-colors"
                >
                  <td className={`p-4 ${isRTL ? 'text-right' : 'text-left'}`}>
                    <Typography variant="body">
                      {t(`features.${feature.key}`)}
                    </Typography>
                  </td>
                  <td className="text-center p-4">
                    {feature.starter ? (
                      <Check className="w-5 h-5 text-success mx-auto" />
                    ) : (
                      <X className="w-5 h-5 text-muted-foreground/30 mx-auto" />
                    )}
                  </td>
                  <td className="text-center p-4 bg-primary/5">
                    {feature.professional ? (
                      <Check className="w-5 h-5 text-success mx-auto" />
                    ) : (
                      <X className="w-5 h-5 text-muted-foreground/30 mx-auto" />
                    )}
                  </td>
                  <td className="text-center p-4">
                    {feature.enterprise ? (
                      <Check className="w-5 h-5 text-success mx-auto" />
                    ) : (
                      <X className="w-5 h-5 text-muted-foreground/30 mx-auto" />
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </Card>
      </ScrollReveal>
    </section>
  );
}
