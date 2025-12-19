'use client';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card } from '@/components/ui/card';
import { Typography } from '@/components/ui/typography';
import { motion } from 'framer-motion';
import { Building2, Users } from 'lucide-react';
import { useLocale } from 'next-intl';

interface AudienceSwitcherTabsProps {
  data?: {
    tabs?: {
      enterprise?: string;
      passenger?: string;
    };
    enterprise?: {
      title?: string;
      description?: string;
      features?: Array<{
        title?: string;
        description?: string;
      }>;
    };
    passenger?: {
      title?: string;
      description?: string;
      features?: Array<{
        title?: string;
        description?: string;
      }>;
    };
  };
}

export function AudienceSwitcherTabs({ data }: AudienceSwitcherTabsProps) {
  const locale = useLocale();
  const isRTL = locale === 'ar';

  // Render empty if no data to maintain consistent structure
  if (!data) return <div className="w-full max-w-7xl mx-auto px-4 py-16" />;

  return (
    <section className="w-full max-w-7xl mx-auto px-4 py-16">
      <Tabs defaultValue="enterprise" className="w-full" dir={isRTL ? 'rtl' : 'ltr'}>
        <TabsList className="grid w-full max-w-md mx-auto grid-cols-2 mb-12">
          <TabsTrigger value="enterprise" className="gap-2">
            <Building2 className="w-4 h-4" />
            <span>{data.tabs?.enterprise || 'Enterprise'}</span>
          </TabsTrigger>
          <TabsTrigger value="passenger" className="gap-2">
            <Users className="w-4 h-4" />
            <span>{data.tabs?.passenger || 'Passenger'}</span>
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
                {data.enterprise?.title}
              </Typography>
              <Typography variant="body" className="text-muted-foreground max-w-2xl mx-auto">
                {data.enterprise?.description}
              </Typography>
            </div>
            {/* RTL-aware grid - auto-flows in correct direction */}
            <div className={`grid md:grid-cols-2 gap-6 ${isRTL ? 'md:grid-flow-dense' : ''}`}>
              {data.enterprise?.features?.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="p-6 h-full hover:shadow-lg transition-shadow">
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

        <TabsContent value="passenger">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="text-center mb-12">
              <Typography variant="h2" className="mb-4">
                {data.passenger?.title}
              </Typography>
              <Typography variant="body" className="text-muted-foreground max-w-2xl mx-auto">
                {data.passenger?.description}
              </Typography>
            </div>
            {/* RTL-aware grid */}
            <div className={`grid md:grid-cols-2 gap-6 ${isRTL ? 'md:grid-flow-dense' : ''}`}>
              {data.passenger?.features?.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="p-6 h-full hover:shadow-lg transition-shadow">
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
