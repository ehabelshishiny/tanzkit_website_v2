'use client';

import { useTranslations, useLocale } from 'next-intl';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card } from '@/components/ui/card';
import { motion } from 'framer-motion';
import { ScrollReveal } from '@/components/animations/scroll-reveal';
import { Zap, Shield, TrendingUp, Users } from 'lucide-react';

const iconMap = {
  realtime: Zap,
  security: Shield,
  analytics: TrendingUp,
  collaboration: Users
};

export function FeatureTabs() {
  const t = useTranslations('features');
  const locale = useLocale();
  const isRTL = locale === 'ar';

  // Get feature tabs from translations
  const featureTabs = ['realtime', 'security', 'analytics', 'collaboration'];

  return (
    <ScrollReveal className="w-full max-w-6xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
      <div className="text-center mb-8 sm:mb-12">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4">
          {t('heading')}
        </h2>
        <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto px-4">
          {t('subtitle')}
        </p>
      </div>

      <Tabs defaultValue="realtime" className="w-full" dir={isRTL ? 'rtl' : 'ltr'}>
        {/* TabsList with RTL support */}
        <TabsList className="grid w-full grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-3 mb-6 sm:mb-8 h-auto p-2 bg-muted/50">
          {featureTabs.map((featureId) => {
            const Icon = iconMap[featureId as keyof typeof iconMap];
            return (
              <TabsTrigger 
                key={featureId} 
                value={featureId} 
                className="flex items-center justify-center gap-2 py-3 px-4 data-[state=active]:bg-background data-[state=active]:shadow-sm min-h-[48px] w-full"
              >
                <Icon className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" />
                <span className="text-sm sm:text-base font-medium truncate">
                  {t(`tabs.${featureId}.label`)}
                </span>
              </TabsTrigger>
            );
          })}
        </TabsList>

        {featureTabs.map((featureId) => {
          const Icon = iconMap[featureId as keyof typeof iconMap];
          const benefits = t.raw(`tabs.${featureId}.benefits`) as string[];

          return (
            <TabsContent key={featureId} value={featureId}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <Card className="p-4 sm:p-6 lg:p-8">
                  {/* Use flexbox with conditional direction instead of grid */}
                  <div className={`flex flex-col md:flex-row gap-6 sm:gap-8 ${isRTL ? 'md:flex-row-reverse' : ''}`}>
                    {/* Text Content - Always first in DOM order */}
                    <div className="flex-1 md:w-1/2">
                      <div className={`flex items-center gap-3 mb-4 ${isRTL ? 'flex-row-reverse' : ''}`}>
                        <div className="p-2.5 sm:p-3 bg-primary/10 rounded-lg flex-shrink-0">
                          <Icon className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
                        </div>
                        <h3 className={`text-xl sm:text-2xl font-bold ${isRTL ? 'text-right' : 'text-left'}`}>
                          {t(`tabs.${featureId}.title`)}
                        </h3>
                      </div>
                      <p className={`text-sm sm:text-base text-muted-foreground mb-6 ${isRTL ? 'text-right' : 'text-left'}`}>
                        {t(`tabs.${featureId}.description`)}
                      </p>
                      <ul className="space-y-3">
                        {benefits.map((benefit, index) => (
                          <motion.li
                            key={index}
                            initial={{ opacity: 0, x: isRTL ? 20 : -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className={`flex items-start gap-2.5 ${isRTL ? 'flex-row-reverse text-right' : 'text-left'}`}
                          >
                            <div className="w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center mt-0.5 flex-shrink-0">
                              <div className="w-2 h-2 rounded-full bg-primary" />
                            </div>
                            <span className="text-sm sm:text-base">{benefit}</span>
                          </motion.li>
                        ))}
                      </ul>
                    </div>

                    {/* Visualization - Always second in DOM order */}
                    <div className="flex-1 md:w-1/2 bg-muted rounded-lg flex items-center justify-center p-6 sm:p-8 min-h-[200px] sm:min-h-[300px]">
                      <div className="text-center text-muted-foreground">
                        <Icon className="w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 mx-auto mb-4 opacity-20" />
                        <p className="text-xs sm:text-sm">{t('visualizationPlaceholder')}</p>
                      </div>
                    </div>
                  </div>
                </Card>
              </motion.div>
            </TabsContent>
          );
        })}
      </Tabs>
    </ScrollReveal>
  );
}