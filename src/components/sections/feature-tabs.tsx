'use client';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card } from '@/components/ui/card';
import { motion } from 'framer-motion';
import { ScrollReveal } from '@/components/animations/scroll-reveal';
import { Zap, Shield, TrendingUp, Users } from 'lucide-react';

const features = [
  {
    id: 'realtime',
    label: 'Real-time Tracking',
    icon: Zap,
    title: 'Live Fleet Monitoring',
    description: 'Track your entire fleet in real-time with GPS precision and instant updates.',
    benefits: [
      'Real-time vehicle location tracking',
      'Live driver status updates',
      'Instant route optimization',
      'Automated dispatch notifications'
    ]
  },
  {
    id: 'security',
    label: 'Advanced Security',
    icon: Shield,
    title: 'Enterprise-Grade Protection',
    description: 'Bank-level security with end-to-end encryption and compliance certifications.',
    benefits: [
      'End-to-end data encryption',
      'Multi-factor authentication',
      'Role-based access control',
      'SOC 2 Type II certified'
    ]
  },
  {
    id: 'analytics',
    label: 'Smart Analytics',
    icon: TrendingUp,
    title: 'Data-Driven Insights',
    description: 'Make informed decisions with comprehensive analytics and reporting tools.',
    benefits: [
      'Custom dashboard creation',
      'Predictive maintenance alerts',
      'Performance metrics tracking',
      'Automated report generation'
    ]
  },
  {
    id: 'collaboration',
    label: 'Team Collaboration',
    icon: Users,
    title: 'Seamless Communication',
    description: 'Connect drivers, dispatchers, and passengers with integrated communication tools.',
    benefits: [
      'In-app messaging system',
      'Automated notifications',
      'Shared trip information',
      'Multi-language support'
    ]
  }
];

export function FeatureTabs() {
  return (
    <ScrollReveal className="w-full max-w-6xl mx-auto px-4 py-16">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          Powerful Features for Modern Transportation
        </h2>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Everything you need to manage your fleet efficiently and delight your passengers
        </p>
      </div>

      <Tabs defaultValue="realtime" className="w-full">
        <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 mb-8">
          {features.map((feature) => (
            <TabsTrigger key={feature.id} value={feature.id} className="gap-2">
              <feature.icon className="w-4 h-4" />
              <span className="hidden sm:inline">{feature.label}</span>
            </TabsTrigger>
          ))}
        </TabsList>

        {features.map((feature) => (
          <TabsContent key={feature.id} value={feature.id}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Card className="p-8">
                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <div className="flex items-center gap-3 mb-4">
                      <div className="p-3 bg-primary/10 rounded-lg">
                        <feature.icon className="w-6 h-6 text-primary" />
                      </div>
                      <h3 className="text-2xl font-bold">{feature.title}</h3>
                    </div>
                    <p className="text-muted-foreground mb-6">
                      {feature.description}
                    </p>
                    <ul className="space-y-3">
                      {feature.benefits.map((benefit, index) => (
                        <motion.li
                          key={index}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.1 }}
                          className="flex items-start gap-2"
                        >
                          <div className="w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center mt-0.5 flex-shrink-0">
                            <div className="w-2 h-2 rounded-full bg-primary" />
                          </div>
                          <span>{benefit}</span>
                        </motion.li>
                      ))}
                    </ul>
                  </div>
                  <div className="bg-muted rounded-lg flex items-center justify-center p-8">
                    <div className="text-center text-muted-foreground">
                      <feature.icon className="w-24 h-24 mx-auto mb-4 opacity-20" />
                      <p className="text-sm">Feature visualization placeholder</p>
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>
          </TabsContent>
        ))}
      </Tabs>
    </ScrollReveal>
  );
}

