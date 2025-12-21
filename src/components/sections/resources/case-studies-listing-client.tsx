'use client';

import { useState, useMemo } from 'react';
import { CaseStudyCard } from './case-study-card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { X, SlidersHorizontal } from 'lucide-react';

interface CaseStudiesListingClientProps {
  caseStudies: any[];
  locale: string;
  heroTitle?: string;
  heroSubtitle?: string;
  heroDescription?: string;
  translations: {
    filterCaseStudies: string;
    categories: string;
    industries: string;
    clearFilters: string;
    noResults: string;
    tryAdjustingFilters: string;
    caseStudiesTitle: string;
  };
}

export function CaseStudiesListingClient({
  caseStudies,
  locale,
  heroTitle,
  heroSubtitle,
  heroDescription,
  translations,
}: CaseStudiesListingClientProps) {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedIndustry, setSelectedIndustry] = useState<string | null>(null);

  // Extract unique categories and industries
  const categories = useMemo(() => {
    const cats = new Map();
    caseStudies.forEach((cs) => {
      cs.categories?.forEach((cat: any) => {
        if (!cats.has(cat.slug.current)) {
          cats.set(cat.slug.current, cat);
        }
      });
    });
    return Array.from(cats.values());
  }, [caseStudies]);

  const industries = useMemo(() => {
    const inds = new Set<string>();
    caseStudies.forEach((cs) => {
      if (cs.industry) {
        inds.add(cs.industry);
      }
    });
    return Array.from(inds);
  }, [caseStudies]);

  // Filter case studies
  const filteredCaseStudies = useMemo(() => {
    return caseStudies.filter((cs) => {
      const categoryMatch = !selectedCategory || cs.categories?.some((cat: any) => cat.slug.current === selectedCategory);
      const industryMatch = !selectedIndustry || cs.industry === selectedIndustry;
      return categoryMatch && industryMatch;
    });
  }, [caseStudies, selectedCategory, selectedIndustry]);

  const clearFilters = () => {
    setSelectedCategory(null);
    setSelectedIndustry(null);
  };

  const hasActiveFilters = selectedCategory || selectedIndustry;

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="w-full px-4 sm:px-6 md:px-8 py-16 border-b bg-muted/30">
        <div className="max-w-7xl mx-auto text-center">
          {heroSubtitle && (
            <p className="text-primary font-semibold mb-4">{heroSubtitle}</p>
          )}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            {heroTitle || translations.caseStudiesTitle}
          </h1>
          {heroDescription && (
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              {heroDescription}
            </p>
          )}
        </div>
      </div>

      {/* Filters Section */}
      <div className="w-full px-4 sm:px-6 md:px-8 py-8 border-b bg-background sticky top-0 z-10 shadow-sm">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-4 mb-4">
            <SlidersHorizontal className="h-5 w-5 text-muted-foreground" />
            <h2 className="text-lg font-semibold">{translations.filterCaseStudies}</h2>
          </div>

          {/* Category Filter */}
          {categories.length > 0 && (
            <div className="mb-4">
              <p className="text-sm font-medium text-muted-foreground mb-2">{translations.categories}</p>
              <div className="flex flex-wrap gap-2">
                {categories.map((category: any) => (
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
                    {category.name}
                  </Badge>
                ))}
              </div>
            </div>
          )}

          {/* Industry Filter */}
          {industries.length > 0 && (
            <div className="mb-4">
              <p className="text-sm font-medium text-muted-foreground mb-2">{translations.industries}</p>
              <div className="flex flex-wrap gap-2">
                {industries.map((industry) => (
                  <Badge
                    key={industry}
                    variant={selectedIndustry === industry ? 'default' : 'outline'}
                    className="cursor-pointer hover:bg-primary/10 transition-colors"
                    onClick={() => setSelectedIndustry(selectedIndustry === industry ? null : industry)}
                  >
                    {industry}
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

      {/* Case Studies Grid */}
      <div className="w-full px-4 sm:px-6 md:px-8 py-12">
        <div className="max-w-7xl mx-auto">
          {filteredCaseStudies.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredCaseStudies.map((caseStudy) => (
                <CaseStudyCard key={caseStudy._id} caseStudy={caseStudy} locale={locale} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <p className="text-muted-foreground text-lg mb-2">{translations.noResults}</p>
              <p className="text-sm text-muted-foreground mb-4">{translations.tryAdjustingFilters}</p>
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

