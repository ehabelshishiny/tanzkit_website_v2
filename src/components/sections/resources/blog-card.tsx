import Link from 'next/link';
import Image from 'next/image';
import { Calendar, Clock, ArrowRight } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

interface BlogCardProps {
  post: any;
  locale: string;
}

export function BlogCard({ post, locale }: BlogCardProps) {
  const publishedDate = new Date(post.publishedAt).toLocaleDateString(locale, {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });

  return (
    <Link href={`/${locale}/resources/blog/${post.slug.current}`} className="group">
      <Card className="h-full overflow-hidden border-2 hover:border-primary/50 transition-all duration-300 hover:shadow-xl">
        {/* Featured Image */}
        {post.featuredImage?.image?.asset?.url && (
          <div className="relative h-56 w-full overflow-hidden bg-muted">
            <Image
              src={post.featuredImage.image.asset.url}
              alt={post.featuredImage.alt || post.title}
              fill
              className="object-cover group-hover:scale-110 transition-transform duration-500"
            />
            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />

            {/* Categories on Image */}
            {post.categories && post.categories.length > 0 && (
              <div className="absolute top-4 left-4 flex flex-wrap gap-2">
                {post.categories.slice(0, 2).map((category: any) => (
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
          </div>
        )}

        {/* Content */}
        <div className="p-6 space-y-4">
          {/* Title */}
          <h3 className="text-xl font-bold line-clamp-2 group-hover:text-primary transition-colors leading-tight">
            {post.title}
          </h3>

          {/* Excerpt */}
          <p className="text-muted-foreground line-clamp-3 text-sm leading-relaxed">
            {post.excerpt}
          </p>

          {/* Divider */}
          <div className="border-t pt-4" />

          {/* Footer */}
          <div className="flex items-center justify-between">
            {/* Author Info */}
            <div className="flex items-center gap-3">
              {post.author && (
                <>
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={post.author.avatar?.asset?.url} alt={post.author.name} />
                    <AvatarFallback className="text-xs">
                      {post.author.name.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col">
                    <span className="text-sm font-medium">{post.author.name}</span>
                    <div className="flex items-center gap-3 text-xs text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        <span>{publishedDate}</span>
                      </div>
                      {post.readingTime && (
                        <div className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          <span>{post.readingTime} min</span>
                        </div>
                      )}
                    </div>
                  </div>
                </>
              )}
            </div>

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

