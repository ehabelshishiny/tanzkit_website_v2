'use client';

import { useState, useMemo } from 'react';
import { BlogCard } from './blog-card';
import { SectionContainer } from '@/components/ui/section-container';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Filter, X } from 'lucide-react';

interface BlogListingClientProps {
  blogPosts: any[];
  blogPage: any;
  locale: string;
  translations: {
    categories: string;
    sortBy: string;
    newest: string;
    oldest: string;
    clearFilters: string;
    noResults: string;
    tryAdjustingFilters: string;
    blogTitle: string;
  };
}

export function BlogListingClient({ blogPosts, blogPage, locale, translations }: BlogListingClientProps) {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState<'newest' | 'oldest'>('newest');

  // Extract all unique categories and tags
  const { categories, tags } = useMemo(() => {
    const categoriesSet = new Set<string>();
    const tagsSet = new Set<string>();

    blogPosts.forEach((post) => {
      post.categories?.forEach((cat: any) => {
        categoriesSet.add(JSON.stringify({ name: cat.name, slug: cat.slug.current, color: cat.color }));
      });
      post.tags?.forEach((tag: string) => {
        tagsSet.add(tag);
      });
    });

    return {
      categories: Array.from(categoriesSet).map((cat) => JSON.parse(cat)),
      tags: Array.from(tagsSet),
    };
  }, [blogPosts]);

  // Filter and sort posts
  const filteredPosts = useMemo(() => {
    let filtered = [...blogPosts];

    // Filter by category
    if (selectedCategory) {
      filtered = filtered.filter((post) =>
        post.categories?.some((cat: any) => cat.slug.current === selectedCategory)
      );
    }

    // Filter by tag
    if (selectedTag) {
      filtered = filtered.filter((post) => post.tags?.includes(selectedTag));
    }

    // Sort by date
    filtered.sort((a, b) => {
      const dateA = new Date(a.publishedAt).getTime();
      const dateB = new Date(b.publishedAt).getTime();
      return sortBy === 'newest' ? dateB - dateA : dateA - dateB;
    });

    return filtered;
  }, [blogPosts, selectedCategory, selectedTag, sortBy]);

  const clearFilters = () => {
    setSelectedCategory(null);
    setSelectedTag(null);
  };

  const hasActiveFilters = selectedCategory || selectedTag;

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="w-full px-4 sm:px-6 md:px-8 py-20 bg-gradient-to-b from-primary/5 to-background">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              {blogPage?.hero?.title || translations.blogTitle}
            </h1>
            {blogPage?.hero?.subtitle && (
              <p className="text-xl md:text-2xl text-muted-foreground mb-4">
                {blogPage.hero.subtitle}
              </p>
            )}
            {blogPage?.hero?.description && (
              <p className="text-lg text-muted-foreground">
                {blogPage.hero.description}
              </p>
            )}
          </div>
        </div>
      </section>

      {/* Filters Section */}
      <SectionContainer className="py-8 border-b">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Categories Filter */}
          {categories.length > 0 && (
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-3">
                <Filter className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm font-medium">{translations.categories}</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {categories.map((category: any) => (
                  <Badge
                    key={category.slug}
                    variant={selectedCategory === category.slug ? 'default' : 'outline'}
                    className="cursor-pointer"
                    style={
                      selectedCategory === category.slug
                        ? { backgroundColor: category.color, borderColor: category.color }
                        : {}
                    }
                    onClick={() =>
                      setSelectedCategory(selectedCategory === category.slug ? null : category.slug)
                    }
                  >
                    {category.name}
                  </Badge>
                ))}
              </div>
            </div>
          )}

          {/* Sort Options */}
          <div className="lg:w-48">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-sm font-medium">{translations.sortBy}</span>
            </div>
            <div className="flex gap-2">
              <Button
                variant={sortBy === 'newest' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setSortBy('newest')}
              >
                {translations.newest}
              </Button>
              <Button
                variant={sortBy === 'oldest' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setSortBy('oldest')}
              >
                {translations.oldest}
              </Button>
            </div>
          </div>
        </div>

        {/* Active Filters */}
        {hasActiveFilters && (
          <div className="mt-4 flex items-center gap-2">
            <Button variant="ghost" size="sm" onClick={clearFilters}>
              <X className="h-4 w-4 mr-1" />
              {translations.clearFilters}
            </Button>
          </div>
        )}
      </SectionContainer>

      {/* Blog Posts Grid */}
      <SectionContainer className="py-16">
        {filteredPosts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPosts.map((post: any) => (
              <BlogCard key={post._id} post={post} locale={locale} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <p className="text-muted-foreground text-lg mb-2">
              {translations.noResults}
            </p>
            <p className="text-sm text-muted-foreground mb-4">
              {translations.tryAdjustingFilters}
            </p>
            {hasActiveFilters && (
              <Button variant="outline" onClick={clearFilters}>
                {translations.clearFilters}
              </Button>
            )}
          </div>
        )}
      </SectionContainer>
    </div>
  );
}

