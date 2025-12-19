import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Building2, MapPin, TrendingUp } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface CaseStudyCardProps {
  caseStudy: any;
  locale: string;
}

export function CaseStudyCard({ caseStudy, locale }: CaseStudyCardProps) {
  return (
    <Link href={`/${locale}/resources/case-studies/${caseStudy.slug.current}`} className="group">
      <Card className="h-full overflow-hidden border-2 hover:border-primary/50 transition-all duration-300 hover:shadow-xl">
        {/* Featured Image */}
        {caseStudy.featuredImage?.image?.asset?.url && (
          <div className="relative h-56 w-full overflow-hidden bg-muted">
            <Image
              src={caseStudy.featuredImage.image.asset.url}
              alt={caseStudy.featuredImage.alt || caseStudy.title}
              fill
              className="object-cover group-hover:scale-110 transition-transform duration-500"
            />
            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
            
            {/* Categories on Image */}
            {caseStudy.categories && caseStudy.categories.length > 0 && (
              <div className="absolute top-4 left-4 flex flex-wrap gap-2">
                {caseStudy.categories.slice(0, 2).map((category: any) => (
                  <Badge
                    key={category.slug.current}
                    className="backdrop-blur-sm bg-white/90 text-foreground border-0 shadow-lg"
                    style={{ 
                      backgroundColor: category.color ? `${category.color}15` : undefined,
                      color: category.color || undefined,
                      borderLeft: category.color ? `3px solid ${category.color}` : undefined
                    }}
                  >
                    {category.name}
                  </Badge>
                ))}
              </div>
            )}

            {/* Client Logo Overlay */}
            {caseStudy.clientLogo?.asset?.url && (
              <div className="absolute bottom-4 right-4 bg-white/95 backdrop-blur-sm p-3 rounded-lg shadow-lg">
                <div className="relative h-8 w-20">
                  <Image
                    src={caseStudy.clientLogo.asset.url}
                    alt={caseStudy.clientName}
                    fill
                    className="object-contain"
                  />
                </div>
              </div>
            )}
          </div>
        )}

        {/* Content */}
        <div className="p-6 space-y-4">
          {/* Client Info */}
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-1.5">
              <Building2 className="h-4 w-4" />
              <span className="font-medium">{caseStudy.clientName}</span>
            </div>
            {caseStudy.industry && (
              <div className="flex items-center gap-1.5">
                <TrendingUp className="h-4 w-4" />
                <span>{caseStudy.industry}</span>
              </div>
            )}
            {caseStudy.location && (
              <div className="flex items-center gap-1.5">
                <MapPin className="h-4 w-4" />
                <span>{caseStudy.location}</span>
              </div>
            )}
          </div>

          {/* Title */}
          <h3 className="text-xl font-bold line-clamp-2 group-hover:text-primary transition-colors leading-tight">
            {caseStudy.title}
          </h3>

          {/* Excerpt */}
          <p className="text-muted-foreground line-clamp-3 text-sm leading-relaxed">
            {caseStudy.excerpt}
          </p>

          {/* Key Metrics Preview */}
          {caseStudy.metrics && caseStudy.metrics.length > 0 && (
            <div className="flex flex-wrap gap-4 pt-2">
              {caseStudy.metrics.slice(0, 2).map((metric: any, index: number) => (
                <div key={index} className="flex flex-col">
                  <span className="text-2xl font-bold text-primary">{metric.value}</span>
                  <span className="text-xs text-muted-foreground">{metric.label}</span>
                </div>
              ))}
            </div>
          )}

          {/* Divider */}
          <div className="border-t pt-4" />

          {/* Footer */}
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-primary">View Case Study</span>
            
            {/* Read More Arrow */}
            <div className="flex items-center justify-center h-10 w-10 rounded-full bg-primary/10 group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300">
              <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>
        </div>
      </Card>
    </Link>
  );
}

