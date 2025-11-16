'use client';

import { Card } from '@/components/ui/card';
import { ScrollReveal } from '@/components/animations/scroll-reveal';
import { Check, X } from 'lucide-react';

const features = [
  { name: 'Vehicle Tracking', starter: true, professional: true, enterprise: true },
  { name: 'Mobile Apps', starter: true, professional: true, enterprise: true },
  { name: 'Basic Analytics', starter: true, professional: true, enterprise: true },
  { name: 'Email Support', starter: true, professional: true, enterprise: true },
  { name: 'AI Route Optimization', starter: false, professional: true, enterprise: true },
  { name: 'Priority Support (24/7)', starter: false, professional: true, enterprise: true },
  { name: 'Custom Branding', starter: false, professional: true, enterprise: true },
  { name: 'API Access', starter: false, professional: true, enterprise: true },
  { name: 'White-label Solution', starter: false, professional: false, enterprise: true },
  { name: 'Dedicated Account Manager', starter: false, professional: false, enterprise: true },
  { name: 'Custom Integrations', starter: false, professional: false, enterprise: true },
  { name: 'SLA Guarantees', starter: false, professional: false, enterprise: true },
  { name: 'Multi-region Support', starter: false, professional: false, enterprise: true },
];

export function ComparisonTable() {
  return (
    <section className="w-full max-w-6xl mx-auto px-4 py-16">
      <ScrollReveal>
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Compare Plans
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            See which features are included in each plan
          </p>
        </div>
      </ScrollReveal>

      <ScrollReveal delay={0.2}>
        <Card className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="text-left p-4 font-semibold">Feature</th>
                <th className="text-center p-4 font-semibold">Starter</th>
                <th className="text-center p-4 font-semibold bg-primary/5">Professional</th>
                <th className="text-center p-4 font-semibold">Enterprise</th>
              </tr>
            </thead>
            <tbody>
              {features.map((feature, index) => (
                <tr 
                  key={index} 
                  className="border-b hover:bg-muted/50 transition-colors"
                >
                  <td className="p-4">{feature.name}</td>
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

