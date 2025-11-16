'use client';

import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { StaggerChildren, StaggerItem } from '@/components/animations/stagger-children';
import { FileText, BookOpen, TrendingUp } from 'lucide-react';

const resources = [
  {
    type: 'Blog',
    icon: FileText,
    title: 'The Future of Urban Transportation',
    excerpt: 'Exploring trends and innovations shaping the future of mobility',
    date: 'March 15, 2024'
  },
  {
    type: 'Whitepaper',
    icon: BookOpen,
    title: 'Fleet Management Best Practices',
    excerpt: 'Comprehensive guide to optimizing fleet operations',
    date: 'March 10, 2024'
  },
  {
    type: 'Case Study',
    icon: TrendingUp,
    title: 'How TechCorp Reduced Costs by 30%',
    excerpt: 'Success story of enterprise transportation transformation',
    date: 'March 5, 2024'
  },
  {
    type: 'Blog',
    icon: FileText,
    title: 'AI in Transportation: A Deep Dive',
    excerpt: 'Understanding the role of artificial intelligence in modern mobility',
    date: 'February 28, 2024'
  },
  {
    type: 'Whitepaper',
    icon: BookOpen,
    title: 'Sustainability in Fleet Operations',
    excerpt: 'Strategies for reducing environmental impact',
    date: 'February 20, 2024'
  },
  {
    type: 'Case Study',
    icon: TrendingUp,
    title: 'Global Logistics: Scaling Across Regions',
    excerpt: 'Multi-region expansion success story',
    date: 'February 15, 2024'
  }
];

export function CardList() {
  return (
    <section className="w-full max-w-7xl mx-auto px-4 py-8">
      <StaggerChildren className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {resources.map((resource, index) => (
          <StaggerItem key={index}>
            <Card className="p-6 h-full hover:shadow-lg transition-shadow cursor-pointer">
              <div className="flex items-start justify-between mb-4">
                <div className="p-3 bg-primary/10 rounded-lg">
                  <resource.icon className="w-6 h-6 text-primary" />
                </div>
                <Badge variant="secondary">{resource.type}</Badge>
              </div>
              <h3 className="text-xl font-semibold mb-2">{resource.title}</h3>
              <p className="text-muted-foreground text-sm mb-4">{resource.excerpt}</p>
              <div className="text-xs text-muted-foreground">{resource.date}</div>
            </Card>
          </StaggerItem>
        ))}
      </StaggerChildren>
    </section>
  );
}

