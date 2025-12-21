'use client';

import { useState, useMemo } from 'react';
import { Search, X } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { PortableText } from '@/components/ui/portable-text';

interface FAQListingClientProps {
  faqCategories: any[];
  locale: string;
  heroTitle?: string;
  heroSubtitle?: string;
  heroDescription?: string;
  translations: {
    searchPlaceholder: string;
    filterByCategory: string;
    clearFilters: string;
    noQuestionsFound: string;
    noQuestionsMatching: string;
    faqTitle: string;
  };
}

export function FAQListingClient({
  faqCategories,
  locale,
  heroTitle,
  heroSubtitle,
  heroDescription,
  translations,
}: FAQListingClientProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  // Flatten all FAQs for search
  const allFAQs = useMemo(() => {
    return faqCategories.flatMap((category) =>
      category.items.map((item: any) => ({
        ...item,
        categoryName: category.name,
        categorySlug: category.slug.current,
        categoryColor: category.color,
      }))
    );
  }, [faqCategories]);

  // Filter FAQs based on search and category
  const filteredFAQs = useMemo(() => {
    let filtered = allFAQs;

    // Filter by category
    if (selectedCategory) {
      filtered = filtered.filter((faq) => faq.categorySlug === selectedCategory);
    }

    // Filter by search query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter((faq) => {
        const questionMatch = faq.question?.toLowerCase().includes(query);
        const tagsMatch = faq.tags?.some((tag: string) => tag.toLowerCase().includes(query));
        // For answer, we need to check if it's an array (Portable Text) or string
        const answerText = Array.isArray(faq.answer)
          ? faq.answer.map((block: any) => block.children?.map((child: any) => child.text).join(' ')).join(' ')
          : String(faq.answer || '');
        const answerMatch = answerText.toLowerCase().includes(query);

        return questionMatch || tagsMatch || answerMatch;
      });
    }

    return filtered;
  }, [allFAQs, searchQuery, selectedCategory]);

  // Group filtered FAQs by category
  const groupedFAQs = useMemo(() => {
    const groups: { [key: string]: any } = {};

    filteredFAQs.forEach((faq) => {
      if (!groups[faq.categorySlug]) {
        groups[faq.categorySlug] = {
          name: faq.categoryName,
          slug: faq.categorySlug,
          color: faq.categoryColor,
          items: [],
        };
      }
      groups[faq.categorySlug].items.push(faq);
    });

    return Object.values(groups);
  }, [filteredFAQs]);

  const clearFilters = () => {
    setSearchQuery('');
    setSelectedCategory(null);
  };

  const hasActiveFilters = searchQuery || selectedCategory;

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="w-full px-4 sm:px-6 md:px-8 py-16 border-b bg-muted/30">
        <div className="max-w-4xl mx-auto text-center">
          {heroSubtitle && (
            <p className="text-primary font-semibold mb-4">{heroSubtitle}</p>
          )}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            {heroTitle || translations.faqTitle}
          </h1>
          {heroDescription && (
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              {heroDescription}
            </p>
          )}
        </div>
      </div>

      {/* Search and Filters */}
      <div className="w-full px-4 sm:px-6 md:px-8 py-8 border-b bg-background sticky top-0 z-10 shadow-sm">
        <div className="max-w-4xl mx-auto">
          {/* Search Bar */}
          <div className="relative mb-6">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
              type="text"
              placeholder={translations.searchPlaceholder}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-10 h-12 text-base"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
              >
                <X className="h-5 w-5" />
              </button>
            )}
          </div>

          {/* Category Filter */}
          {faqCategories.length > 0 && (
            <div className="mb-4">
              <p className="text-sm font-medium text-muted-foreground mb-2">{translations.filterByCategory}</p>
              <div className="flex flex-wrap gap-2">
                {faqCategories.map((category: any) => (
                  <Badge
                    key={category.slug.current}
                    variant={selectedCategory === category.slug.current ? 'default' : 'outline'}
                    className="cursor-pointer hover:bg-primary/10 transition-colors"
                    style={{
                      backgroundColor: selectedCategory === category.slug.current && category.color ? category.color : undefined,
                      borderColor: category.color || undefined,
                    }}
                    onClick={() => setSelectedCategory(selectedCategory === category.slug.current ? null : category.slug.current)}
                  >
                    {category.name} ({category.items.length})
                  </Badge>
                ))}
              </div>
            </div>
          )}

          {/* Active Filters & Clear */}
          {hasActiveFilters && (
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={clearFilters}
                className="text-muted-foreground hover:text-foreground"
              >
                <X className="h-4 w-4 mr-1" />
                {translations.clearFilters}
              </Button>
            </div>
          )}
        </div>
      </div>

      {/* FAQ Content */}
      <div className="w-full px-4 sm:px-6 md:px-8 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <p className="text-muted-foreground">
              Showing {filteredFAQs.length} of {allFAQs.length} questions
            </p>
          </div>

          {filteredFAQs.length > 0 ? (
            <div className="space-y-8">
              {groupedFAQs.map((category: any) => (
                <div key={category.slug}>
                  {/* Category Header */}
                  <div className="mb-4">
                    <div className="flex items-center gap-3 mb-2">
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
                  </div>

                  {/* FAQ Accordion */}
                  <Accordion type="single" collapsible className="w-full">
                    {category.items.map((faq: any) => (
                      <AccordionItem key={faq._id} value={faq._id}>
                        <AccordionTrigger className="text-left text-lg font-semibold hover:text-primary">
                          {faq.question}
                        </AccordionTrigger>
                        <AccordionContent>
                          <div className="prose prose-sm max-w-none text-muted-foreground pt-2">
                            <PortableText value={faq.answer} />
                          </div>
                          {faq.tags && faq.tags.length > 0 && (
                            <div className="flex flex-wrap gap-2 mt-4 pt-4 border-t">
                              {faq.tags.map((tag: string, index: number) => (
                                <Badge key={index} variant="outline" className="text-xs">
                                  {tag}
                                </Badge>
                              ))}
                            </div>
                          )}
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <p className="text-muted-foreground text-lg mb-4">
                {searchQuery
                  ? `${translations.noQuestionsMatching} "${searchQuery}"`
                  : translations.noQuestionsFound}
              </p>
              <Button variant="outline" onClick={clearFilters}>
                {translations.clearFilters}
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

