'use client';

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { Card } from '@/components/ui/card';
import { ScrollReveal } from '@/components/animations/scroll-reveal';
import { BarChart3, Map, Users, DollarSign, TrendingUp, Settings } from 'lucide-react';

const dashboards = [
  {
    id: 1,
    icon: BarChart3,
    title: 'Analytics Dashboard',
    description: 'Comprehensive metrics and KPIs for data-driven decisions',
    metrics: ['Revenue', 'Trips', 'Efficiency']
  },
  {
    id: 2,
    icon: Map,
    title: 'Live Fleet Map',
    description: 'Real-time vehicle tracking with heat maps and zones',
    metrics: ['Active Vehicles', 'Coverage', 'Demand']
  },
  {
    id: 3,
    icon: Users,
    title: 'Driver Management',
    description: 'Monitor driver performance, schedules, and availability',
    metrics: ['Active Drivers', 'Rating', 'Earnings']
  },
  {
    id: 4,
    icon: DollarSign,
    title: 'Revenue Dashboard',
    description: 'Track earnings, expenses, and profitability in real-time',
    metrics: ['Daily Revenue', 'Profit Margin', 'Growth']
  },
  {
    id: 5,
    icon: TrendingUp,
    title: 'Performance Insights',
    description: 'Identify trends and optimize operations with AI insights',
    metrics: ['Efficiency', 'Utilization', 'Satisfaction']
  },
  {
    id: 6,
    icon: Settings,
    title: 'Operations Control',
    description: 'Configure pricing, zones, and operational parameters',
    metrics: ['Active Rules', 'Zones', 'Pricing']
  }
];

export function DashboardPreviewCarousel() {
  return (
    <section className="w-full max-w-7xl mx-auto px-4 py-16 bg-muted/30">
      <ScrollReveal>
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Powerful Dashboard Views
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Everything you need to manage your operations efficiently
          </p>
        </div>
      </ScrollReveal>

      <Carousel
        opts={{
          align: 'start',
          loop: true,
        }}
        className="w-full"
      >
        <CarouselContent className="-ml-4">
          {dashboards.map((dashboard) => (
            <CarouselItem key={dashboard.id} className="pl-4 md:basis-1/2 lg:basis-1/3">
              <Card className="overflow-hidden h-full">
                <div className="aspect-video bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center relative group p-8">
                  <div className="absolute inset-0 bg-grid-pattern opacity-10" />
                  <div className="text-center z-10">
                    <div className="w-20 h-20 mx-auto mb-4 rounded-2xl bg-background/80 backdrop-blur-sm flex items-center justify-center shadow-lg">
                      <dashboard.icon className="w-10 h-10 text-primary" />
                    </div>
                    <div className="flex gap-2 justify-center flex-wrap">
                      {dashboard.metrics.map((metric, idx) => (
                        <div key={idx} className="px-3 py-1 bg-primary/10 backdrop-blur-sm rounded-full text-xs font-medium">
                          {metric}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="font-semibold text-lg mb-2">{dashboard.title}</h3>
                  <p className="text-sm text-muted-foreground">
                    {dashboard.description}
                  </p>
                </div>
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="hidden md:flex" />
        <CarouselNext className="hidden md:flex" />
      </Carousel>
    </section>
  );
}

