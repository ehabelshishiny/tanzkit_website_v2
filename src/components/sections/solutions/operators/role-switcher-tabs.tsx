'use client';

import { useLocale } from 'next-intl';
import { Typography } from '@/components/ui/typography';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card } from '@/components/ui/card';
import { motion } from 'framer-motion';
import { Building, Car } from 'lucide-react';

interface RoleSwitcherTabsProps {
  data?: {
    tabs?: {
      operator?: string;
      driver?: string;
    };
    operator?: {
      title?: string;
      description?: string;
      features?: Array<{
        title?: string;
        description?: string;
      }>;
    };
    driver?: {
      title?: string;
      description?: string;
      features?: Array<{
        title?: string;
        description?: string;
      }>;
    };
  };
}

export function RoleSwitcherTabs({ data }: RoleSwitcherTabsProps) {
  const locale = useLocale();
  const isRTL = locale === 'ar';

  // Render empty if no data to maintain consistent structure
  if (!data) return <div className="w-full max-w-7xl mx-auto px-4 py-16" />;

  return (
    <section className="w-full max-w-7xl mx-auto px-4 py-16" dir={isRTL ? 'rtl' : 'ltr'}>
      <Tabs defaultValue="operator" className="w-full">
        <TabsList className="grid w-full max-w-md mx-auto grid-cols-2 mb-12">
          {/* Conditionally render tabs in reverse order for RTL */}
          {isRTL ? (
            <>
              <TabsTrigger value="driver" className="gap-2">
                <Car className="w-4 h-4" />
                <span>{data.tabs?.driver || 'Driver'}</span>
              </TabsTrigger>
              <TabsTrigger value="operator" className="gap-2">
                <Building className="w-4 h-4" />
                <span>{data.tabs?.operator || 'Operator'}</span>
              </TabsTrigger>
            </>
          ) : (
            <>
              <TabsTrigger value="operator" className="gap-2">
                <Building className="w-4 h-4" />
                <span>{data.tabs?.operator || 'Operator'}</span>
              </TabsTrigger>
              <TabsTrigger value="driver" className="gap-2">
                <Car className="w-4 h-4" />
                <span>{data.tabs?.driver || 'Driver'}</span>
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
                {data.operator?.title}
              </Typography>
              <Typography variant="body" className="text-muted-foreground max-w-2xl mx-auto">
                {data.operator?.description}
              </Typography>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              {data.operator?.features?.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className={`p-6 h-full hover:shadow-lg transition-shadow ${isRTL ? 'text-right' : 'text-left'}`}>
                    <Typography variant="h3" className="mb-3">
                      {feature.title}
                    </Typography>
                    <Typography variant="body" className="text-muted-foreground">
                      {feature.description}
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
                {data.driver?.title}
              </Typography>
              <Typography variant="body" className="text-muted-foreground max-w-2xl mx-auto">
                {data.driver?.description}
              </Typography>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              {data.driver?.features?.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className={`p-6 h-full hover:shadow-lg transition-shadow ${isRTL ? 'text-right' : 'text-left'}`}>
                    <Typography variant="h3" className="mb-3">
                      {feature.title}
                    </Typography>
                    <Typography variant="body" className="text-muted-foreground">
                      {feature.description}
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
