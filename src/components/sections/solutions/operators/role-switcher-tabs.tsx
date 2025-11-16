'use client';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card } from '@/components/ui/card';
import { motion } from 'framer-motion';
import { Building, Car } from 'lucide-react';

const operatorContent = {
  title: 'For Fleet Operators',
  description: 'Complete control over your transportation operations',
  features: [
    {
      title: 'Fleet Management Dashboard',
      description: 'Monitor and manage your entire fleet from a centralized command center'
    },
    {
      title: 'Driver Management',
      description: 'Recruit, onboard, and manage drivers with comprehensive tools'
    },
    {
      title: 'Revenue Optimization',
      description: 'Maximize earnings with dynamic pricing and demand forecasting'
    },
    {
      title: 'Compliance & Safety',
      description: 'Ensure regulatory compliance and maintain safety standards'
    }
  ]
};

const driverContent = {
  title: 'For Drivers',
  description: 'Earn more with flexible schedules and powerful tools',
  features: [
    {
      title: 'Flexible Earnings',
      description: 'Drive on your schedule and maximize your income with smart routing'
    },
    {
      title: 'Easy Navigation',
      description: 'Turn-by-turn navigation with real-time traffic updates'
    },
    {
      title: 'Instant Payments',
      description: 'Get paid quickly with multiple payout options'
    },
    {
      title: 'Driver Support',
      description: '24/7 support team ready to help with any issues'
    }
  ]
};

export function RoleSwitcherTabs() {
  return (
    <section className="w-full max-w-7xl mx-auto px-4 py-16">
      <Tabs defaultValue="operator" className="w-full">
        <TabsList className="grid w-full max-w-md mx-auto grid-cols-2 mb-12">
          <TabsTrigger value="operator" className="gap-2">
            <Building className="w-4 h-4" />
            <span>Operators</span>
          </TabsTrigger>
          <TabsTrigger value="driver" className="gap-2">
            <Car className="w-4 h-4" />
            <span>Drivers</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="operator">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                {operatorContent.title}
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                {operatorContent.description}
              </p>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              {operatorContent.features.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="p-6 h-full hover:shadow-lg transition-shadow">
                    <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                    <p className="text-muted-foreground">{feature.description}</p>
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
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                {driverContent.title}
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                {driverContent.description}
              </p>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              {driverContent.features.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="p-6 h-full hover:shadow-lg transition-shadow">
                    <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                    <p className="text-muted-foreground">{feature.description}</p>
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

