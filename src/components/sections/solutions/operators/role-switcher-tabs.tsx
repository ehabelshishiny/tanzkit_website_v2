'use client';

import { useTranslations } from 'next-intl';
import { useLocale } from 'next-intl';
import { Typography } from '@/components/ui/typography';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card } from '@/components/ui/card';
import { motion } from 'framer-motion';
import { Building, Car } from 'lucide-react';

export function RoleSwitcherTabs() {
  const t = useTranslations('solutions.operatorsDrivers.roleSwitcher');
  const locale = useLocale();
  const isRTL = locale === 'ar';

  return (
    <section className="w-full max-w-7xl mx-auto px-4 py-16" dir={isRTL ? 'rtl' : 'ltr'}>
      <Tabs defaultValue="operator" className="w-full">
        <TabsList className="grid w-full max-w-md mx-auto grid-cols-2 mb-12">
          {/* Conditionally render tabs in reverse order for RTL */}
          {isRTL ? (
            <>
              <TabsTrigger value="driver" className="gap-2">
                <Car className="w-4 h-4" />
                <span>{t('tabs.driver')}</span>
              </TabsTrigger>
              <TabsTrigger value="operator" className="gap-2">
                <Building className="w-4 h-4" />
                <span>{t('tabs.operator')}</span>
              </TabsTrigger>
            </>
          ) : (
            <>
              <TabsTrigger value="operator" className="gap-2">
                <Building className="w-4 h-4" />
                <span>{t('tabs.operator')}</span>
              </TabsTrigger>
              <TabsTrigger value="driver" className="gap-2">
                <Car className="w-4 h-4" />
                <span>{t('tabs.driver')}</span>
              </TabsTrigger>
            </>
          )}
        </TabsList>

        <TabsContent value="operator">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="text-center mb-12">
              <Typography variant="h2" className="mb-4">
                {t('operator.title')}
              </Typography>
              <Typography variant="body" className="text-muted-foreground max-w-2xl mx-auto">
                {t('operator.description')}
              </Typography>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              {[0, 1, 2, 3].map((index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className={`p-6 h-full hover:shadow-lg transition-shadow ${isRTL ? 'text-right' : 'text-left'}`}>
                    <Typography variant="h3" className="mb-3">
                      {t(`operator.features.${index}.title`)}
                    </Typography>
                    <Typography variant="body" className="text-muted-foreground">
                      {t(`operator.features.${index}.description`)}
                    </Typography>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </TabsContent>

        <TabsContent value="driver">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="text-center mb-12">
              <Typography variant="h2" className="mb-4">
                {t('driver.title')}
              </Typography>
              <Typography variant="body" className="text-muted-foreground max-w-2xl mx-auto">
                {t('driver.description')}
              </Typography>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              {[0, 1, 2, 3].map((index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className={`p-6 h-full hover:shadow-lg transition-shadow ${isRTL ? 'text-right' : 'text-left'}`}>
                    <Typography variant="h3" className="mb-3">
                      {t(`driver.features.${index}.title`)}
                    </Typography>
                    <Typography variant="body" className="text-muted-foreground">
                      {t(`driver.features.${index}.description`)}
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
