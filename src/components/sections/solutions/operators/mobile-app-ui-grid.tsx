'use client';

import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ScrollReveal } from '@/components/animations/scroll-reveal';
import { HoverTilt } from '@/components/animations/hover-tilt';
import { Smartphone, Navigation, DollarSign, MessageSquare, Star, Bell } from 'lucide-react';

const appFeatures = [
  {
    icon: Navigation,
    title: 'Smart Navigation',
    description: 'Turn-by-turn directions with real-time traffic',
    badge: 'Essential'
  },
  {
    icon: DollarSign,
    title: 'Earnings Tracker',
    description: 'Real-time earnings and payout management',
    badge: 'Popular'
  },
  {
    icon: MessageSquare,
    title: 'In-App Chat',
    description: 'Communicate with passengers and support',
    badge: 'New'
  },
  {
    icon: Star,
    title: 'Rating System',
    description: 'Build your reputation with passenger ratings',
    badge: 'Essential'
  },
  {
    icon: Bell,
    title: 'Smart Notifications',
    description: 'Get alerts for new rides and updates',
    badge: 'Essential'
  },
  {
    icon: Smartphone,
    title: 'Offline Mode',
    description: 'Continue working even without internet',
    badge: 'Premium'
  }
];

export function MobileAppUIGrid() {
  return (
    <section className="w-full max-w-7xl mx-auto px-4 py-16">
      <ScrollReveal>
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Driver App Features
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Everything drivers need in one powerful mobile application
          </p>
        </div>
      </ScrollReveal>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {appFeatures.map((feature, index) => (
          <ScrollReveal key={index} delay={index * 0.1}>
            <HoverTilt>
              <Card className="p-6 h-full hover:shadow-lg transition-shadow relative overflow-hidden">
                <div className="absolute top-4 right-4">
                  <Badge variant={feature.badge === 'New' ? 'default' : 'secondary'}>
                    {feature.badge}
                  </Badge>
                </div>
                
                <div className="p-4 bg-primary/10 rounded-lg w-fit mb-4">
                  <feature.icon className="w-8 h-8 text-primary" />
                </div>
                
                <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </Card>
            </HoverTilt>
          </ScrollReveal>
        ))}
      </div>
    </section>
  );
}

