'use client';

import { Card } from '@/components/ui/card';
import { Typography } from '@/components/ui/typography';
import { ScrollReveal } from '@/components/animations/scroll-reveal';
import { Check, X } from 'lucide-react';
import { useLocale } from 'next-intl';

interface PlanFeature {
  text: string;
  included: boolean;
}

interface Plan {
  id: string;
  name: string;
  features: PlanFeature[];
}

interface ComparisonTableProps {
  data: {
    heading: string;
    subtitle: string;
    tableHeaderFeature: string;
    tableHeaderProfessional: string;
    tableHeaderEnterprise: string;
  };
  plans: Plan[];
}

function normalizeFeature(text: string): string {
  return text.trim().toLowerCase();
}

function isPricingLine(text: string): boolean {
  const normalized = text.toLowerCase();
  return (
    normalized.includes('egp') ||
    normalized.includes('per user/month') ||
    normalized.includes('per month') ||
    text.includes('جنيه') ||
    text.includes('لكل مستخدم/شهر') ||
    text.includes('شهري')
  );
}

function includesAllProfessionalFeature(text: string): boolean {
  const normalized = text.trim().toLowerCase();
  return (
    normalized.includes('everything in professional') ||
    normalized.includes('كل ما في professional')
  );
}

export function ComparisonTable({ data, plans }: ComparisonTableProps) {
  const locale = useLocale();
  const isRTL = locale === 'ar';

  const professionalPlan = plans.find((p) => p.id === 'professional') || plans[0];
  const premiumPlan = plans.find((p) => p.id === 'premium') || plans[1];

  if (!professionalPlan || !premiumPlan) return null;

  const proFeatures = professionalPlan.features.filter((f) => f.included && !isPricingLine(f.text));
  const premiumFeatures = premiumPlan.features.filter((f) => f.included && !isPricingLine(f.text));
  const premiumIncludesAllProfessional = premiumFeatures.some((f) =>
    includesAllProfessionalFeature(f.text)
  );

  const featureMap = new Map<string, string>();

  proFeatures.forEach((f) => {
    featureMap.set(normalizeFeature(f.text), f.text);
  });

  premiumFeatures.forEach((f) => {
    const key = normalizeFeature(f.text);
    if (!featureMap.has(key)) {
      featureMap.set(key, f.text);
    }
  });

  const features = Array.from(featureMap.entries()).map(([key, label]) => ({
    label,
    professional: proFeatures.some((f) => normalizeFeature(f.text) === key),
    premium:
      premiumIncludesAllProfessional ||
      premiumFeatures.some((f) => normalizeFeature(f.text) === key),
  }));

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
                        {premiumPlan.name || data.tableHeaderEnterprise}
                      </Typography>
                    </th>
                    <th className="text-center p-4 font-semibold bg-primary/5">
                      <Typography variant="body" className="font-semibold">
                        {professionalPlan.name || data.tableHeaderProfessional}
                      </Typography>
                    </th>
                    <th className="text-end p-4 font-semibold">
                      <Typography variant="body" className="font-semibold text-right">
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
                    <th className="text-center p-4 font-semibold bg-primary/5">
                      <Typography variant="body" className="font-semibold">
                        {professionalPlan.name || data.tableHeaderProfessional}
                      </Typography>
                    </th>
                    <th className="text-center p-4 font-semibold">
                      <Typography variant="body" className="font-semibold">
                        {premiumPlan.name || data.tableHeaderEnterprise}
                      </Typography>
                    </th>
                  </>
                )}
              </tr>
            </thead>
            <tbody>
              {features.map((feature, index) => (
                <tr
                  key={index}
                  className="border-b hover:bg-muted/50 transition-colors"
                >
                  {isRTL ? (
                    <>
                      <td className="text-center p-4">
                        {feature.premium ? (
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
                      <td className="p-4 text-end">
                        <Typography variant="body" className="text-right">
                          {feature.label}
                        </Typography>
                      </td>
                    </>
                  ) : (
                    <>
                      <td className="p-4 text-start">
                        <Typography variant="body">{feature.label}</Typography>
                      </td>
                      <td className="text-center p-4 bg-primary/5">
                        {feature.professional ? (
                          <Check className="w-5 h-5 text-success mx-auto" />
                        ) : (
                          <X className="w-5 h-5 text-muted-foreground/30 mx-auto" />
                        )}
                      </td>
                      <td className="text-center p-4">
                        {feature.premium ? (
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
