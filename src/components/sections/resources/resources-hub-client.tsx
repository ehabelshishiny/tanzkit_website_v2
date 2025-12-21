'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { SectionContainer } from '@/components/ui/section-container';
import { BlogCard } from './blog-card';
import { Button } from '@/components/ui/button';
import { ArrowRight, BookOpen, FileText, HelpCircle, Briefcase } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { PortableText } from '@/components/ui/portable-text';

interface ResourcesHubClientProps {
  resourcesPage: any;
  blogPosts: any[];
  caseStudies: any[];
  faqs: any[];
  careers: any[];
  featuredBlogs: any[];
  featuredCaseStudies: any[];
  locale: string;
  translations: {
    all: string;
    blogs: string;
    caseStudies: string;
    faq: string;
    careers: string;
    viewAll: string;
    noResources: string;
    noBlogPosts: string;
    noCaseStudies: string;
    noFAQs: string;
    noCareers: string;
    applyNow: string;
    latestBlogPosts: string;
    featuredCaseStudies: string;
    frequentlyAskedQuestions: string;
    openPositions: string;
  };
}

export function ResourcesHubClient({
  resourcesPage,
  blogPosts,
  caseStudies,
  faqs,
  careers,
  featuredBlogs,
  featuredCaseStudies,
  locale,
  translations,
}: ResourcesHubClientProps) {
  const [activeTab, setActiveTab] = useState('all');

  // Combine all resources for "All" tab
  const allResources = [
    ...blogPosts.map((post: any) => ({ ...post, type: 'blog' })),
    ...caseStudies.map((study: any) => ({ ...study, type: 'caseStudy' })),
  ].sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="w-full px-4 sm:px-6 md:px-8 py-20 bg-gradient-to-b from-primary/5 to-background">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              {resourcesPage?.hero?.title || 'Resources Hub'}
            </h1>
            {resourcesPage?.hero?.subtitle && (
              <p className="text-xl md:text-2xl text-muted-foreground mb-4">
                {resourcesPage.hero.subtitle}
              </p>
            )}
            {resourcesPage?.hero?.description && (
              <p className="text-lg text-muted-foreground">
                {resourcesPage.hero.description}
              </p>
            )}
          </div>
        </div>
      </section>

      {/* Tabs Section */}
      <SectionContainer className="py-12">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full max-w-3xl mx-auto grid-cols-5 mb-12">
            <TabsTrigger value="all">{translations.all}</TabsTrigger>
            <TabsTrigger value="blog">
              <FileText className="h-4 w-4 mr-2" />
              {translations.blogs}
            </TabsTrigger>
            <TabsTrigger value="caseStudies">
              <BookOpen className="h-4 w-4 mr-2" />
              {translations.caseStudies}
            </TabsTrigger>
            <TabsTrigger value="faq">
              <HelpCircle className="h-4 w-4 mr-2" />
              {translations.faq}
            </TabsTrigger>
            <TabsTrigger value="careers">
              <Briefcase className="h-4 w-4 mr-2" />
              {translations.careers}
            </TabsTrigger>
          </TabsList>

          {/* All Tab */}
          <TabsContent value="all" className="mt-0">
            {allResources.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {allResources.slice(0, 9).map((resource: any) => {
                  if (resource.type === 'blog') {
                    return <BlogCard key={resource._id} post={resource} locale={locale} />;
                  }
                  // We'll create CaseStudyCard later
                  return null;
                })}
              </div>
            ) : (
              <div className="text-center py-16">
                <p className="text-muted-foreground text-lg">{translations.noResources}</p>
              </div>
            )}
          </TabsContent>

          {/* Blog Tab */}
          <TabsContent value="blog" className="mt-0">
            <div className="mb-8">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold">
                  {resourcesPage?.blogSection?.title || translations.latestBlogPosts}
                </h2>
                <Link href={`/${locale}/resources/blog`}>
                  <Button variant="outline">
                    {translations.viewAll}
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </div>
              {resourcesPage?.blogSection?.description && (
                <p className="text-muted-foreground mb-8">{resourcesPage.blogSection.description}</p>
              )}
            </div>

            {blogPosts.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {blogPosts.slice(0, 6).map((post: any) => (
                  <BlogCard key={post._id} post={post} locale={locale} />
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <p className="text-muted-foreground text-lg">{translations.noBlogPosts}</p>
              </div>
            )}
          </TabsContent>

          {/* Case Studies Tab */}
          <TabsContent value="caseStudies" className="mt-0">
            <div className="mb-8">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold">
                  {resourcesPage?.caseStudiesSection?.title || translations.featuredCaseStudies}
                </h2>
                <Link href={`/${locale}/resources/case-studies`}>
                  <Button variant="outline">
                    {translations.viewAll}
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </div>
              {resourcesPage?.caseStudiesSection?.description && (
                <p className="text-muted-foreground mb-8">
                  {resourcesPage.caseStudiesSection.description}
                </p>
              )}
            </div>

            <div className="text-center py-16">
              <p className="text-muted-foreground text-lg">
                {translations.noCaseStudies}
              </p>
            </div>
          </TabsContent>

          {/* FAQ Tab */}
          <TabsContent value="faq" className="mt-0">
            <div className="mb-8">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold">
                  {resourcesPage?.faqSection?.title || translations.frequentlyAskedQuestions}
                </h2>
                <Link href={`/${locale}/resources/faq`}>
                  <Button variant="outline">
                    {translations.viewAll}
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </div>
              {resourcesPage?.faqSection?.description && (
                <p className="text-muted-foreground mb-8">{resourcesPage.faqSection.description}</p>
              )}
            </div>

            {faqs && faqs.length > 0 ? (
              <div className="space-y-6">
                {faqs.slice(0, 2).map((category: any) => (
                  <div key={category._id}>
                    {/* Category Header */}
                    <div className="flex items-center gap-3 mb-4">
                      <Badge
                        variant="secondary"
                        style={{
                          backgroundColor: category.color ? `${category.color}20` : undefined,
                          color: category.color || undefined,
                        }}
                      >
                        {category.name}
                      </Badge>
                      <span className="text-sm text-muted-foreground">
                        {category.items.length} {category.items.length === 1 ? 'question' : 'questions'}
                      </span>
                    </div>

                    {/* FAQ Accordion */}
                    <Accordion type="single" collapsible className="w-full">
                      {category.items.slice(0, 3).map((faq: any) => (
                        <AccordionItem key={faq._id} value={faq._id}>
                          <AccordionTrigger className="text-left font-semibold hover:text-primary">
                            {faq.question}
                          </AccordionTrigger>
                          <AccordionContent>
                            <div className="prose prose-sm max-w-none text-muted-foreground pt-2">
                              <PortableText value={faq.answer} />
                            </div>
                          </AccordionContent>
                        </AccordionItem>
                      ))}
                    </Accordion>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <p className="text-muted-foreground text-lg">
                  {translations.noFAQs}
                </p>
              </div>
            )}
          </TabsContent>

          {/* Careers Tab */}
          <TabsContent value="careers" className="mt-0">
            <div className="mb-8">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold">
                  {translations.openPositions}
                </h2>
                <Link href={`/${locale}/resources/careers`}>
                  <Button variant="outline">
                    {translations.viewAll}
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </div>

              {careers && careers.length > 0 ? (
                <div className="space-y-4">
                  {careers.slice(0, 5).map((job: any) => (
                    <Card key={job._key} className="p-6 hover:shadow-lg transition-shadow">
                      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                        <div className="flex-grow">
                          <h3 className="text-xl font-bold mb-2">{job.title}</h3>
                          <p className="text-muted-foreground text-sm mb-3">{job.description}</p>
                          <div className="flex flex-wrap gap-2">
                            <Badge variant="secondary" className="flex items-center gap-1">
                              <Briefcase className="w-3 h-3" />
                              {job.department}
                            </Badge>
                            <Badge variant="outline">{job.location}</Badge>
                            <Badge variant="outline">{job.type}</Badge>
                          </div>
                        </div>
                        <Button asChild className="md:flex-shrink-0">
                          <Link href={`/${locale}/careers/${job.slug.current}`}>
                            {translations.applyNow}
                          </Link>
                        </Button>
                      </div>
                    </Card>
                  ))}
                </div>
              ) : (
                <div className="text-center py-16">
                  <p className="text-muted-foreground text-lg">
                    {translations.noCareers}
                  </p>
                </div>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </SectionContainer>
    </div>
  );
}

