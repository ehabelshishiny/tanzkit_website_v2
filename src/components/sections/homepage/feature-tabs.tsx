'use client';

import { useTranslations, useLocale } from 'next-intl';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card } from '@/components/ui/card';
import { motion } from 'framer-motion';
import { ScrollReveal } from '@/components/animations/scroll-reveal';
import { Typography } from '@/components/ui/typography';
import Image from 'next/image';
import { urlFor } from '@/lib/sanity/image';
import { getLucideIcon } from '@/lib/lucide-icons';

// Default icon names for fallback
const defaultIconMap: Record<string, string> = {
  realtime: 'Zap',
  security: 'Shield',
  analytics: 'TrendingUp',
  collaboration: 'Users'
};

const imageMap = {
  realtime: '/assets/homepage/features/live_tracking.png',
  security: '/assets/homepage/features/advanced_security.png',
  analytics: '/assets/homepage/features/smart_Analytics.png',
  collaboration: '/assets/homepage/features/team_collaboration.png'
};

interface FeatureTabsProps {
  data?: {
    heading?: string;
    subtitle?: string;
    tabs?: Array<{
      _key: string;
      label: string;
      title: string;
      description: string;
      icon?: string;
      features?: Array<{
        _key: string;
        text: string;
      }>;
      image?: any;
    }>;
  };
}

export function FeatureTabs({ data }: FeatureTabsProps) {
  const t = useTranslations('homepage.features');
  const locale = useLocale();
  const isRTL = locale === 'ar';

  // Debug logging
  if (process.env.NODE_ENV === 'development' && data?.tabs) {
    console.log('FeatureTabs - Received data:', {
      tabsCount: data.tabs.length,
      firstTab: data.tabs[0],
      hasImages: data.tabs.map(tab => ({
        key: tab._key,
        hasImage: !!tab.image,
        hasAsset: !!tab.image?.asset
      }))
    });
  }

  // Use Sanity data if available, otherwise fall back to translations
  const featureTabs = data?.tabs || ['realtime', 'security', 'analytics', 'collaboration'];
  const usingSanityData = !!data?.tabs;

  const firstTabId = usingSanityData && data.tabs ? data.tabs[0]._key : 'realtime';

  return (
    <ScrollReveal className="w-full max-w-6xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
      <div className="text-center mb-8 sm:mb-12">
        <Typography variant="h2" align="center" className="mb-3 sm:mb-4">
          {data?.heading || t('heading')}
        </Typography>
        <Typography variant="subtitle" align="center" className="text-muted-foreground max-w-2xl mx-auto px-4">
          {data?.subtitle || t('subtitle')}
        </Typography>
      </div>

      <Tabs defaultValue={firstTabId} className="w-full" dir={isRTL ? 'rtl' : 'ltr'}>
        {/* TabsList with RTL support */}
        <TabsList className="grid w-full grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-3 mb-6 sm:mb-8 h-auto p-2 bg-muted/50">
          {featureTabs.map((tab) => {
            const featureId = typeof tab === 'string' ? tab : tab._key;

            // Get icon name from Sanity data or use default
            const iconName = (typeof tab !== 'string' && tab.icon)
              ? tab.icon
              : defaultIconMap[featureId] || 'Zap';
            const Icon = getLucideIcon(iconName, 'Zap');

            const label = typeof tab === 'string' ? t(`tabs.${featureId}.label`) : tab.label;
            return (
              <TabsTrigger
                key={featureId}
                value={featureId}
                className="flex items-center justify-center gap-2 py-3 px-4 data-[state=active]:bg-background data-[state=active]:shadow-sm min-h-[48px] w-full"
              >
                <Icon className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" />
                <Typography variant="button" className={isRTL ? "leading-relaxed" : "truncate"}>
                  {label}
                </Typography>
              </TabsTrigger>
            );
          })}
        </TabsList>

        {featureTabs.map((tab, index) => {
          const featureId = typeof tab === 'string' ? tab : tab._key;

          // Get icon name from Sanity data or use default
          const iconName = (typeof tab !== 'string' && tab.icon)
            ? tab.icon
            : defaultIconMap[featureId] || 'Zap';
          const Icon = getLucideIcon(iconName, 'Zap');

          const title = typeof tab === 'string' ? t(`tabs.${featureId}.title`) : tab.title;
          const description = typeof tab === 'string' ? t(`tabs.${featureId}.description`) : tab.description;
          const benefits = typeof tab === 'string'
            ? (t.raw(`tabs.${featureId}.benefits`) as string[])
            : (tab.features?.map(f => f.text) || []);

          // Check if we have a valid Sanity image with asset
          const tabImage = (typeof tab !== 'string' && tab.image?.asset) ? tab.image : null;

          return (
            <TabsContent key={featureId} value={featureId}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <Card className="p-6 lg:p-8">
  {/* Use flexbox - RTL auto-reverses the layout naturally */}
  <div className="flex flex-col md:flex-row gap-8">
    {/* Image - First in DOM order for mobile (top position) */}
    <div className="w-full md:w-1/2 md:order-2 flex-shrink-0 p-4">
      {tabImage ? (
        <Image
          src={urlFor(tabImage).width(1200).fit('max').url() || ''}
          alt={title}
          width={1200}
          height={800}
          className="w-full h-auto object-contain"
          priority={index === 0}
        />
      ) : (
        <Image
          src={imageMap[featureId as keyof typeof imageMap]}
          alt={title}
          width={1200}
          height={800}
          className="w-full h-auto object-contain"
          priority={featureId === 'realtime' || featureId === firstTabId}
        />
      )}
    </div>

    {/* Text Content - Second in DOM order for mobile (bottom position) */}
    <div className="w-full md:w-1/2 md:order-1 flex-shrink-0">
      <div className="flex items-center gap-3 mb-4">
        <div className="p-2.5 sm:p-3 bg-primary/10 rounded-lg flex-shrink-0">
          <Icon className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
        </div>
        <Typography variant="h3">
          {title}
        </Typography>
      </div>
      <Typography variant="body" className="text-muted-foreground mb-6">
        {description}
      </Typography>
      <ul className="space-y-3">
        {benefits.map((benefit, index) => (
          <motion.li
            key={`${featureId}-benefit-${index}`}
            initial={{ opacity: 0, x: isRTL ? 20 : -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className="flex items-start gap-2.5"
          >
            <div className="w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center mt-0.5 flex-shrink-0">
              <div className="w-2 h-2 rounded-full bg-primary" />
            </div>
            <Typography variant="body">
              {benefit}
            </Typography>
          </motion.li>
        ))}
      </ul>
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
