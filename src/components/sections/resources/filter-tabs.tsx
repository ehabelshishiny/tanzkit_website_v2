'use client';

import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useTranslations, useLocale } from 'next-intl';

export function FilterTabs() {
  const t = useTranslations('resources.main.filters');
  const locale = useLocale();
  const isRTL = locale === 'ar';

  // Define tab order - will be reversed for RTL
  const tabs = [
    { value: 'all', label: t('all') },
    { value: 'blog', label: t('blog') },
    { value: 'whitepapers', label: t('whitepapers') },
    { value: 'case-studies', label: t('caseStudies') },
  ];

  // Reverse the order for RTL languages
  const displayTabs = isRTL ? [...tabs].reverse() : tabs;
  
  return (
    <div className="w-full max-w-4xl mx-auto px-4 py-8">
      <Tabs defaultValue="all" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          {displayTabs.map((tab) => (
            <TabsTrigger key={tab.value} value={tab.value}>
              {tab.label}
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>
    </div>
  );
}
