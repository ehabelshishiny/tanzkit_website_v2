'use client';

import { Card } from '@/components/ui/card';
import { Typography } from '@/components/ui/typography';
import { ScrollReveal } from '@/components/animations/scroll-reveal';
import { Check, X } from 'lucide-react';
import { useLocale } from 'next-intl';

interface ComparisonFeature {
  feature: string;
  starter: boolean;
  professional: boolean;
  enterprise: boolean;
}

interface ComparisonTableProps {
  data: {
    heading: string;
    subtitle: string;
    tableHeaderFeature: string;
    tableHeaderStarter: string;
    tableHeaderProfessional: string;
    tableHeaderEnterprise: string;
    features: ComparisonFeature[];
  };
}

export function ComparisonTable({ data }: ComparisonTableProps) {
  const locale = useLocale();
  const isRTL = locale === 'ar';

  return (
    <section className="w-full max-w-6xl mx-auto px-4 sm:px-6 md:px-8 py-16">
      <ScrollReveal>
        <div className="text-center mb-12">
          <Typography variant="h2" align="center" className="mb-4">
            {data.heading}
          </Typography>
          <Typography variant="subtitle" align="center" className="text-muted-foreground max-w-2xl mx-auto">
            {data.subtitle}
          </Typography>
        </div>
      </ScrollReveal>

      <ScrollReveal delay={0.2}>
        <Card className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b">
                {isRTL ? (
                  <>
                    <th className="text-center p-4 font-semibold">
                      <Typography variant="body" className="font-semibold">
                        {data.tableHeaderEnterprise}
                      </Typography>
                    </th>
                    <th className="text-center p-4 font-semibold bg-primary/5">
                      <Typography variant="body" className="font-semibold">
                        {data.tableHeaderProfessional}
                      </Typography>
                    </th>
                    <th className="text-center p-4 font-semibold">
                      <Typography variant="body" className="font-semibold">
                        {data.tableHeaderStarter}
                      </Typography>
                    </th>
                    <th className="text-start p-4 font-semibold">
                      <Typography variant="body" className="font-semibold">
                        {data.tableHeaderFeature}
                      </Typography>
                    </th>
                  </>
                ) : (
                  <>
                    <th className="text-start p-4 font-semibold">
                      <Typography variant="body" className="font-semibold">
                        {data.tableHeaderFeature}
                      </Typography>
                    </th>
                    <th className="text-center p-4 font-semibold">
                      <Typography variant="body" className="font-semibold">
                        {data.tableHeaderStarter}
                      </Typography>
                    </th>
                    <th className="text-center p-4 font-semibold bg-primary/5">
                      <Typography variant="body" className="font-semibold">
                        {data.tableHeaderProfessional}
                      </Typography>
                    </th>
                    <th className="text-center p-4 font-semibold">
                      <Typography variant="body" className="font-semibold">
                        {data.tableHeaderEnterprise}
                      </Typography>
                    </th>
                  </>
                )}
              </tr>
            </thead>
            <tbody>
              {data.features.map((feature, index) => (
                <tr
                  key={index}
                  className="border-b hover:bg-muted/50 transition-colors"
                >
                  {isRTL ? (
                    <>
                      <td className="text-center p-4">
                        {feature.enterprise ? (
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
                        {feature.starter ? (
                          <Check className="w-5 h-5 text-success mx-auto" />
                        ) : (
                          <X className="w-5 h-5 text-muted-foreground/30 mx-auto" />
                        )}
                      </td>
                      <td className="p-4 text-start">
                        <Typography variant="body">
                          {feature.feature}
                        </Typography>
                      </td>
                    </>
                  ) : (
                    <>
                      <td className="p-4 text-start">
                        <Typography variant="body">
                          {feature.feature}
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
                    </>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </Card>
      </ScrollReveal>
    </section>
  );
}
