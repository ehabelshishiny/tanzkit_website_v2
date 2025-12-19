import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, Building2, MapPin, TrendingUp, Quote } from 'lucide-react';
import { getCaseStudyBySlug } from '@/lib/sanity/queries';
import { generateResourceMetadata } from '@/lib/seo/metadata';
import { generateCaseStudySchema } from '@/lib/seo/structuredData';
import { StructuredData } from '@/components/seo/structured-data';
import { PortableText } from '@/components/ui/portable-text';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent } from '@/components/ui/card';
import * as LucideIcons from 'lucide-react';

interface CaseStudyPageProps {
  params: Promise<{
    locale: string;
    slug: string;
  }>;
}

export async function generateMetadata({ params }: CaseStudyPageProps): Promise<Metadata> {
  const { locale, slug } = await params;
  const caseStudy = await getCaseStudyBySlug(slug, locale);

  if (!caseStudy) {
    return {
      title: 'Case Study Not Found',
    };
  }

  return generateResourceMetadata(
    {
      metaTitle: caseStudy.seo?.metaTitle,
      metaDescription: caseStudy.seo?.metaDescription,
      keywords: caseStudy.seo?.keywords,
      ogImage: caseStudy.seo?.ogImage?.[locale]?.asset?.url || caseStudy.featuredImage?.image?.asset?.url,
      canonicalUrl: `resources/case-studies/${slug}`,
    },
    locale,
    caseStudy.title,
    caseStudy.excerpt
  );
}

export default async function CaseStudyPage({ params }: CaseStudyPageProps) {
  const { locale, slug } = await params;
  const caseStudy = await getCaseStudyBySlug(slug, locale);

  if (!caseStudy) {
    notFound();
  }

  const structuredData = generateCaseStudySchema(caseStudy, locale);

  // Helper to get Lucide icon component
  const getIcon = (iconName: string) => {
    const Icon = (LucideIcons as any)[iconName];
    return Icon || TrendingUp;
  };

  return (
    <>
      <StructuredData data={structuredData} />

      <article className="min-h-screen">
        {/* Back Button */}
        <div className="w-full px-4 sm:px-6 md:px-8 py-6 border-b">
          <div className="max-w-6xl mx-auto">
            <Link
              href={`/${locale}/resources/case-studies`}
              className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Case Studies
            </Link>
          </div>
        </div>

        {/* Hero Section */}
        <header className="w-full px-4 sm:px-6 md:px-8 py-12 bg-muted/30">
          <div className="max-w-6xl mx-auto">
            {/* Categories */}
            {caseStudy.categories && caseStudy.categories.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-6">
                {caseStudy.categories.map((category: any) => (
                  <Badge
                    key={category.slug.current}
                    variant="secondary"
                    style={{ backgroundColor: category.color + '20', color: category.color }}
                  >
                    {category.name}
                  </Badge>
                ))}
              </div>
            )}

            {/* Title */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              {caseStudy.title}
            </h1>

            {/* Excerpt */}
            <p className="text-xl text-muted-foreground mb-8 max-w-3xl">
              {caseStudy.excerpt}
            </p>

            {/* Client Info */}
            <div className="flex flex-wrap items-center gap-6">
              {caseStudy.clientLogo?.asset?.url && (
                <div className="bg-white p-4 rounded-lg shadow-sm">
                  <div className="relative h-12 w-32">
                    <Image
                      src={caseStudy.clientLogo.asset.url}
                      alt={caseStudy.clientName}
                      fill
                      className="object-contain"
                    />
                  </div>
                </div>
              )}
              <div className="flex flex-wrap gap-6 text-muted-foreground">
                <div className="flex items-center gap-2">
                  <Building2 className="h-5 w-5" />
                  <div>
                    <p className="text-xs text-muted-foreground">Client</p>
                    <p className="font-semibold text-foreground">{caseStudy.clientName}</p>
                  </div>
                </div>
                {caseStudy.industry && (
                  <div className="flex items-center gap-2">
                    <TrendingUp className="h-5 w-5" />
                    <div>
                      <p className="text-xs text-muted-foreground">Industry</p>
                      <p className="font-semibold text-foreground">{caseStudy.industry}</p>
                    </div>
                  </div>
                )}
                {caseStudy.location && (
                  <div className="flex items-center gap-2">
                    <MapPin className="h-5 w-5" />
                    <div>
                      <p className="text-xs text-muted-foreground">Location</p>
                      <p className="font-semibold text-foreground">{caseStudy.location}</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </header>


        {/* Featured Image */}
        {caseStudy.featuredImage?.image?.asset?.url && (
          <div className="w-full px-4 sm:px-6 md:px-8 py-12">
            <div className="max-w-6xl mx-auto">
              <div className="relative w-full h-[400px] md:h-[500px] lg:h-[600px] rounded-lg overflow-hidden shadow-2xl">
                <Image
                  src={caseStudy.featuredImage.image.asset.url}
                  alt={caseStudy.featuredImage.alt || caseStudy.title}
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            </div>
          </div>
        )}

        {/* Key Metrics */}
        {caseStudy.metrics && caseStudy.metrics.length > 0 && (
          <div className="w-full px-4 sm:px-6 md:px-8 py-12 bg-primary/5">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-3xl font-bold mb-8 text-center">Key Results</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {caseStudy.metrics.map((metric: any, index: number) => {
                  const IconComponent = metric.icon ? getIcon(metric.icon) : TrendingUp;
                  return (
                    <Card key={index} className="text-center p-6 hover:shadow-lg transition-shadow">
                      <CardContent className="p-0">
                        <div className="flex justify-center mb-4">
                          <div className="p-3 bg-primary/10 rounded-full">
                            <IconComponent className="h-8 w-8 text-primary" />
                          </div>
                        </div>
                        <p className="text-4xl font-bold text-primary mb-2">{metric.value}</p>
                        <p className="text-sm text-muted-foreground">{metric.label}</p>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* Content Sections */}
        <div className="w-full px-4 sm:px-6 md:px-8 py-12">
          <div className="max-w-4xl mx-auto space-y-16">
            {/* Challenge */}
            <section>
              <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
                <div className="h-1 w-12 bg-primary rounded" />
                The Challenge
              </h2>
              <div className="prose prose-lg max-w-none">
                <PortableText value={caseStudy.challenge} />
              </div>
            </section>

            {/* Solution */}
            <section>
              <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
                <div className="h-1 w-12 bg-primary rounded" />
                Our Solution
              </h2>
              <div className="prose prose-lg max-w-none">
                <PortableText value={caseStudy.solution} />
              </div>
            </section>

            {/* Results */}
            <section>
              <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
                <div className="h-1 w-12 bg-primary rounded" />
                The Results
              </h2>
              <div className="prose prose-lg max-w-none">
                <PortableText value={caseStudy.results} />
              </div>
            </section>
          </div>
        </div>

        {/* Testimonial */}
        {caseStudy.testimonial && (
          <div className="w-full px-4 sm:px-6 md:px-8 py-16 bg-muted/30">
            <div className="max-w-4xl mx-auto">
              <Card className="p-8 md:p-12 shadow-xl">
                <CardContent className="p-0">
                  <Quote className="h-12 w-12 text-primary/20 mb-6" />
                  <blockquote className="text-xl md:text-2xl font-medium mb-8 leading-relaxed">
                    "{caseStudy.testimonial.quote}"
                  </blockquote>
                  <div className="flex items-center gap-4">
                    {caseStudy.testimonial.avatar?.asset?.url && (
                      <Avatar className="h-16 w-16">
                        <AvatarImage src={caseStudy.testimonial.avatar.asset.url} alt={caseStudy.testimonial.author} />
                        <AvatarFallback>{caseStudy.testimonial.author.charAt(0)}</AvatarFallback>
                      </Avatar>
                    )}
                    <div>
                      <p className="font-bold text-lg">{caseStudy.testimonial.author}</p>
                      <p className="text-muted-foreground">{caseStudy.testimonial.role}</p>
                      <p className="text-sm text-muted-foreground">{caseStudy.clientName}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        )}

        {/* CTA Section */}
        <div className="w-full px-4 sm:px-6 md:px-8 py-16 border-t">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4">Ready to Transform Your Business?</h2>
            <p className="text-xl text-muted-foreground mb-8">
              Let's discuss how Tranzkit can help you achieve similar results.
            </p>
            <Link
              href={`/${locale}/contact`}
              className="inline-flex items-center justify-center px-8 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors font-semibold"
            >
              Get in Touch
            </Link>
          </div>
        </div>
      </article>
    </>
  );
}
