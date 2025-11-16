'use client';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card } from '@/components/ui/card';
import { motion } from 'framer-motion';
import { Building2, Users } from 'lucide-react';

const enterpriseContent = {
  title: 'Enterprise Solutions',
  description: 'Comprehensive fleet management and corporate transportation solutions',
  features: [
    {
      title: 'Centralized Fleet Management',
      description: 'Manage your entire corporate fleet from a single dashboard with real-time visibility'
    },
    {
      title: 'Employee Transportation',
      description: 'Streamline employee commute programs with automated scheduling and routing'
    },
    {
      title: 'Cost Optimization',
      description: 'Reduce transportation costs with AI-powered route optimization and analytics'
    },
    {
      title: 'Compliance & Reporting',
      description: 'Automated compliance tracking and comprehensive reporting for stakeholders'
    }
  ]
};

const passengerContent = {
  title: 'Passenger Experience',
  description: 'Seamless, reliable, and comfortable transportation for your employees',
  features: [
    {
      title: 'Easy Booking',
      description: 'Book rides in seconds with our intuitive mobile app interface'
    },
    {
      title: 'Real-time Tracking',
      description: 'Track your ride in real-time with accurate ETAs and driver information'
    },
    {
      title: 'Safety First',
      description: 'Verified drivers, emergency SOS button, and trip sharing for peace of mind'
    },
    {
      title: 'Flexible Options',
      description: 'Choose from various vehicle types and ride-sharing options to suit your needs'
    }
  ]
};

export function AudienceSwitcherTabs() {
  return (
    <section className="w-full max-w-7xl mx-auto px-4 py-16">
      <Tabs defaultValue="enterprise" className="w-full">
        <TabsList className="grid w-full max-w-md mx-auto grid-cols-2 mb-12">
          <TabsTrigger value="enterprise" className="gap-2">
            <Building2 className="w-4 h-4" />
            <span>Enterprises</span>
          </TabsTrigger>
          <TabsTrigger value="passenger" className="gap-2">
            <Users className="w-4 h-4" />
            <span>Passengers</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="enterprise">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                {enterpriseContent.title}
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                {enterpriseContent.description}
              </p>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              {enterpriseContent.features.map((feature, index) => (
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

        <TabsContent value="passenger">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                {passengerContent.title}
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                {passengerContent.description}
              </p>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              {passengerContent.features.map((feature, index) => (
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

