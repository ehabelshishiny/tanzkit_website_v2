import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { Calendar, Clock, User, ArrowLeft } from 'lucide-react';
import { getBlogPostBySlug } from '@/lib/sanity/queries';
import { generateResourceMetadata } from '@/lib/seo/metadata';
import { generateBlogPostSchema } from '@/lib/seo/structuredData';
import { StructuredData } from '@/components/seo/structured-data';
import { PortableText } from '@/components/ui/portable-text';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { SectionContainer } from '@/components/ui/section-container';
import { BlogCard } from '@/components/sections/resources/blog-card';

interface BlogPostPageProps {
  params: Promise<{
    locale: string;
    slug: string;
  }>;
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { locale, slug } = await params;
  const post = await getBlogPostBySlug(slug, locale);

  if (!post) {
    return {
      title: 'Blog Post Not Found',
    };
  }

  return generateResourceMetadata(
    {
      metaTitle: post.seo?.metaTitle,
      metaDescription: post.seo?.metaDescription,
      keywords: post.seo?.keywords,
      ogImage: post.seo?.ogImage?.[locale]?.asset?.url || post.featuredImage?.image?.asset?.url,
      canonicalUrl: `resources/blog/${slug}`,
    },
    locale,
    post.title,
    post.excerpt
  );
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { locale, slug } = await params;
  const post = await getBlogPostBySlug(slug, locale);

  if (!post) {
    notFound();
  }

  const publishedDate = new Date(post.publishedAt).toLocaleDateString(locale, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  const structuredData = generateBlogPostSchema(post, locale);

  return (
    <>
      <StructuredData data={structuredData} />

      <article className="min-h-screen">
        {/* Back Button */}
        <div className="w-full px-4 sm:px-6 md:px-8 py-6 border-b">
          <div className="max-w-5xl mx-auto">
            <Link
              href={`/${locale}/resources/blog`}
              className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Blogs
            </Link>
          </div>
        </div>

        {/* Hero Section */}
        <header className="w-full px-4 sm:px-6 md:px-8 py-12">
          <div className="max-w-5xl mx-auto">
            {/* Categories */}
            {post.categories && post.categories.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-6">
                {post.categories.map((category: any) => (
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
              {post.title}
            </h1>

            {/* Excerpt */}
            <p className="text-xl text-muted-foreground mb-8">
              {post.excerpt}
            </p>

            {/* Meta Info */}
            <div className="flex flex-wrap items-center gap-6 text-muted-foreground">
              {/* Author */}
              {post.author && (
                <div className="flex items-center gap-3">
                  <Avatar>
                    <AvatarImage src={post.author.avatar?.asset?.url} alt={post.author.name} />
                    <AvatarFallback>{post.author.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium text-foreground">{post.author.name}</p>
                    {post.author.role && (
                      <p className="text-sm">{post.author.role}</p>
                    )}
                  </div>
                </div>
              )}

              {/* Published Date */}
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                <span>{publishedDate}</span>
              </div>

              {/* Reading Time */}
              {post.readingTime && (
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  <span>{post.readingTime} min read</span>
                </div>
              )}
            </div>
          </div>
        </header>

        {/* Featured Image */}
        {post.featuredImage?.image?.asset?.url && (
          <div className="w-full px-4 sm:px-6 md:px-8 mb-12">
            <div className="max-w-5xl mx-auto">
              <div className="relative w-full h-[400px] md:h-[500px] lg:h-[600px] rounded-lg overflow-hidden">
                <Image
                  src={post.featuredImage.image.asset.url}
                  alt={post.featuredImage.alt || post.title}
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            </div>
          </div>
        )}

        {/* Content */}
        <div className="w-full px-4 sm:px-6 md:px-8 pb-16">
          <div className="max-w-5xl mx-auto">
            <PortableText value={post.content} />
          </div>
        </div>

        {/* Related Posts */}
        {post.relatedPosts && post.relatedPosts.length > 0 && (
          <SectionContainer className="py-16 border-t">
            <h2 className="text-3xl font-bold mb-8">Related Posts</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {post.relatedPosts.map((relatedPost: any) => (
                <BlogCard key={relatedPost._id} post={relatedPost} locale={locale} />
              ))}
            </div>
          </SectionContainer>
        )}
      </article>
    </>
  );
}
