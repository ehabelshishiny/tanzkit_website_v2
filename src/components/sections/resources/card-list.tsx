'use client';

import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { FileText, BookOpen, TrendingUp } from 'lucide-react';
import { useTranslations, useLocale } from 'next-intl';

// Icon mapping for resource types
const iconMap = {
  blog: FileText,
  whitepaper: BookOpen,
  caseStudy: TrendingUp,
};

export function CardList() {
  const t = useTranslations('resources.main.cards');
  const tTypes = useTranslations('resources.main.cards.types');
  const locale = useLocale();
  
  // Get resources from translations
  const resources = t.raw('items');

  return (
    <section className="w-full max-w-7xl mx-auto px-4 py-8">
      <div 
        key={locale}
        className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        {resources.map((resource: any, index: number) => {
          const IconComponent = iconMap[resource.type as keyof typeof iconMap];
          
          return (
            <div
              key={`${locale}-${index}`}
              className="animate-in fade-in slide-in-from-bottom-4 duration-500 fill-mode-both"
              style={{ 
                animationDelay: `${index * 100}ms`,
                opacity: 1
              }}
            >
              <Card className="p-6 h-full hover:shadow-lg transition-shadow cursor-pointer">
                <div className="flex items-start justify-between mb-4">
                  <div className="p-3 bg-primary/10 rounded-lg">
                    <IconComponent className="w-6 h-6 text-primary" />
                  </div>
                  <Badge variant="secondary">{tTypes(resource.type)}</Badge>
                </div>
                <h3 className="text-xl font-semibold mb-2">{resource.title}</h3>
                <p className="text-muted-foreground text-sm mb-4">{resource.excerpt}</p>
                <div className="text-xs text-muted-foreground">{resource.date}</div>
              </Card>
            </div>
          );
        })}
      </div>
    </section>
  );
}
