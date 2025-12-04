'use client';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card } from '@/components/ui/card';
import { Typography } from '@/components/ui/typography';
import { motion } from 'framer-motion';
import { Building2, Users } from 'lucide-react';
import { useTranslations, useLocale } from 'next-intl';

export function AudienceSwitcherTabs() {
  const t = useTranslations('solutions.enterprisesPassengers.audienceSwitcher');
  const locale = useLocale();
  const isRTL = locale === 'ar';

  return (
    <section className="w-full max-w-7xl mx-auto px-4 py-16">
      <Tabs defaultValue="enterprise" className="w-full" dir={isRTL ? 'rtl' : 'ltr'}>
        <TabsList className="grid w-full max-w-md mx-auto grid-cols-2 mb-12">
          <TabsTrigger value="enterprise" className="gap-2">
            <Building2 className="w-4 h-4" />
            <span>{t('tabs.enterprise')}</span>
          </TabsTrigger>
          <TabsTrigger value="passenger" className="gap-2">
            <Users className="w-4 h-4" />
            <span>{t('tabs.passenger')}</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="enterprise">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="text-center mb-12">
              <Typography variant="h2" className="mb-4">
                {t('enterprise.title')}
              </Typography>
              <Typography variant="body" className="text-muted-foreground max-w-2xl mx-auto">
                {t('enterprise.description')}
              </Typography>
            </div>
            {/* RTL-aware grid - auto-flows in correct direction */}
            <div className={`grid md:grid-cols-2 gap-6 ${isRTL ? 'md:grid-flow-dense' : ''}`}>
              {[0, 1, 2, 3].map((index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="p-6 h-full hover:shadow-lg transition-shadow">
                    <Typography variant="h3" className="mb-3">
                      {t(`enterprise.features.${index}.title`)}
                    </Typography>
                    <Typography variant="body" className="text-muted-foreground">
                      {t(`enterprise.features.${index}.description`)}
                    </Typography>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </TabsContent>

        <TabsContent value="passenger">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="text-center mb-12">
              <Typography variant="h2" className="mb-4">
                {t('passenger.title')}
              </Typography>
              <Typography variant="body" className="text-muted-foreground max-w-2xl mx-auto">
                {t('passenger.description')}
              </Typography>
            </div>
            {/* RTL-aware grid */}
            <div className={`grid md:grid-cols-2 gap-6 ${isRTL ? 'md:grid-flow-dense' : ''}`}>
              {[0, 1, 2, 3].map((index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="p-6 h-full hover:shadow-lg transition-shadow">
                    <Typography variant="h3" className="mb-3">
                      {t(`passenger.features.${index}.title`)}
                    </Typography>
                    <Typography variant="body" className="text-muted-foreground">
                      {t(`passenger.features.${index}.description`)}
                    </Typography>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </TabsContent>
      </Tabs>
    </section>
  );
}
