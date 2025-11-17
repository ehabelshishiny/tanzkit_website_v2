'use client';

import { Card } from '@/components/ui/card';
import { ScrollReveal } from '@/components/animations/scroll-reveal';
import { HoverTilt } from '@/components/animations/hover-tilt';
import { BarChart3, Shield, Zap, Users, Globe, Clock } from 'lucide-react';

const features = [
  {
    icon: BarChart3,
    title: 'Advanced Analytics',
    description: 'Real-time insights and predictive analytics for data-driven decisions',
    size: 'large'
  },
  {
    icon: Shield,
    title: 'Enterprise Security',
    description: 'Bank-level encryption and compliance certifications',
    size: 'large'
  },
  {
    icon: Zap,
    title: 'Instant Dispatch',
    description: 'Automated routing and real-time driver allocation',
    size: 'medium'
  },
  {
    icon: Users,
    title: 'Team Management',
    description: 'Comprehensive tools for managing drivers and staff',
    size: 'medium'
  },
  {
    icon: Globe,
    title: 'Multi-location Support',
    description: 'Manage operations across multiple cities and regions',
    size: 'medium'
  },
  {
    icon: Clock,
    title: '24/7 Operations',
    description: 'Round-the-clock support and monitoring',
    size: 'full'
  }
];

export function FeatureShowcaseBentoGrid() {
  return (
    <section className="w-full max-w-7xl mx-auto px-4 py-16">
      <ScrollReveal>
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Everything You Need to Succeed
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Powerful features designed for enterprise-scale transportation management
          </p>
        </div>
      </ScrollReveal>

      <div className="flex flex-col gap-6">
        {/* Row 1: 65% / 35% */}
        <div className="flex flex-col md:flex-row md:items-stretch gap-6">
          <ScrollReveal delay={0} className="flex-[60] min-w-0">
            <HoverTilt>
              <Card className="p-8 h-full bg-gradient-to-br from-background to-muted/20 border-2 hover:border-primary/50 transition-colors">
                <div className="flex flex-col h-full">
                  <div className="p-4 bg-primary/10 rounded-lg w-fit mb-4">
                    <BarChart3 className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="text-2xl font-bold mb-3">{features[0].title}</h3>
                  <p className="text-muted-foreground flex-grow">
                    {features[0].description}
                  </p>
                  <div className="mt-6 pt-6 border-t">
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-success" />
                        <span>Active</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-primary" />
                        <span>Enterprise Ready</span>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            </HoverTilt>
          </ScrollReveal>
          <ScrollReveal delay={0.1} className="flex-[40] min-w-0">
            <HoverTilt>
              <Card className="p-8 h-full bg-gradient-to-br from-background to-muted/20 border-2 hover:border-primary/50 transition-colors">
                <div className="flex flex-col h-full">
                  <div className="p-4 bg-primary/10 rounded-lg w-fit mb-4">
                    <Shield className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="text-2xl font-bold mb-3">{features[1].title}</h3>
                  <p className="text-muted-foreground flex-grow">
                    {features[1].description}
                  </p>
                  <div className="mt-6 pt-6 border-t">
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-success" />
                        <span>Active</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-primary" />
                        <span>Enterprise Ready</span>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            </HoverTilt>
          </ScrollReveal>
        </div>

        {/* Row 2: 45% / 55% */}
        <div className="flex flex-col md:flex-row gap-6">
          <ScrollReveal delay={0.2} className="flex-[45] min-w-0">
            <HoverTilt>
              <Card className="p-8 h-full bg-gradient-to-br from-background to-muted/20 border-2 hover:border-primary/50 transition-colors">
                <div className="flex flex-col h-full">
                  <div className="p-4 bg-primary/10 rounded-lg w-fit mb-4">
                    <Zap className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="text-2xl font-bold mb-3">{features[2].title}</h3>
                  <p className="text-muted-foreground flex-grow">
                    {features[2].description}
                  </p>
                </div>
              </Card>
            </HoverTilt>
          </ScrollReveal>
          <ScrollReveal delay={0.3} className="flex-[55] min-w-0">
            <HoverTilt>
              <Card className="p-8 h-full bg-gradient-to-br from-background to-muted/20 border-2 hover:border-primary/50 transition-colors">
                <div className="flex flex-col h-full">
                  <div className="p-4 bg-primary/10 rounded-lg w-fit mb-4">
                    <Users className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="text-2xl font-bold mb-3">{features[3].title}</h3>
                  <p className="text-muted-foreground flex-grow">
                    {features[3].description}
                  </p>
                </div>
              </Card>
            </HoverTilt>
          </ScrollReveal>
        </div>

        {/* Row 3: 60% / 40% */}
        <div className="flex flex-col md:flex-row gap-6">
          <ScrollReveal delay={0.4} className="flex-[60] min-w-0">
            <HoverTilt>
              <Card className="p-8 h-full bg-gradient-to-br from-background to-muted/20 border-2 hover:border-primary/50 transition-colors">
                <div className="flex flex-col h-full">
                  <div className="p-4 bg-primary/10 rounded-lg w-fit mb-4">
                    <Globe className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="text-2xl font-bold mb-3">{features[4].title}</h3>
                  <p className="text-muted-foreground flex-grow">
                    {features[4].description}
                  </p>
                </div>
              </Card>
            </HoverTilt>
          </ScrollReveal>
          <ScrollReveal delay={0.5} className="flex-[40] min-w-0">
            <HoverTilt>
              <Card className="p-8 h-full bg-gradient-to-br from-background to-muted/20 border-2 hover:border-primary/50 transition-colors">
                <div className="flex flex-col h-full">
                  <div className="p-4 bg-primary/10 rounded-lg w-fit mb-4">
                    <Clock className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="text-2xl font-bold mb-3">{features[5].title}</h3>
                  <p className="text-muted-foreground flex-grow">
                    {features[5].description}
                  </p>
                </div>
              </Card>
            </HoverTilt>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}

