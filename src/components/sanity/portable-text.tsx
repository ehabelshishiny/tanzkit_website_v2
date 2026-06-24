import {
  PortableText as SanityPortableText,
  PortableTextComponents,
} from '@portabletext/react';
import { Typography } from '@/components/ui/typography';
import { cn } from '@/lib/utils';
import { localizeInternalHref } from '@/lib/localize-internal-href';

/**
 * Custom components for rendering Sanity Portable Text
 */
function createComponents(locale: string): PortableTextComponents {
  return {
    block: {
      normal: ({ children }) => (
        <Typography variant="body" className="mb-4 leading-relaxed">
          {children}
        </Typography>
      ),
      h2: ({ children }) => (
        <Typography variant="h2" className="mt-8 mb-4">
          {children}
        </Typography>
      ),
      h3: ({ children }) => (
        <Typography variant="h3" className="mt-6 mb-3">
          {children}
        </Typography>
      ),
      h4: ({ children }) => (
        <Typography variant="h4" className="mt-4 mb-2">
          {children}
        </Typography>
      ),
      blockquote: ({ children }) => (
        <blockquote className="border-l-4 border-primary pl-4 py-2 my-6 italic text-muted-foreground">
          {children}
        </blockquote>
      ),
    },
    list: {
      bullet: ({ children }) => (
        <ul className="list-disc list-inside mb-4 space-y-2 text-muted-foreground">
          {children}
        </ul>
      ),
      number: ({ children }) => (
        <ol className="list-decimal list-inside mb-4 space-y-2 text-muted-foreground">
          {children}
        </ol>
      ),
    },
    listItem: {
      bullet: ({ children }) => <li className="leading-relaxed">{children}</li>,
      number: ({ children }) => <li className="leading-relaxed">{children}</li>,
    },
    marks: {
      strong: ({ children }) => (
        <strong className="font-semibold text-foreground">{children}</strong>
      ),
      em: ({ children }) => <em className="italic">{children}</em>,
      code: ({ children }) => (
        <code className="bg-muted px-2 py-1 rounded text-sm font-mono">
          {children}
        </code>
      ),
      link: ({ value, children }) => {
        const href = value?.href || '';
        const localizedHref = localizeInternalHref(href, locale);
        const target = href.startsWith('http') ? '_blank' : undefined;

        return (
          <a
            href={localizedHref}
            target={target}
            rel={target === '_blank' ? 'noopener noreferrer' : undefined}
            className="text-primary hover:underline"
          >
            {children}
          </a>
        );
      },
    },
  };
}

interface PortableTextProps {
  value: any;
  className?: string;
  locale?: string;
}

/**
 * Portable Text Component
 * Renders Sanity Portable Text (rich text) content with custom styling
 *
 * @example
 * ```tsx
 * <PortableText value={job.fullDescription} />
 * ```
 */
export function PortableText({
  value,
  className,
  locale = 'en',
}: PortableTextProps) {
  if (!value || !Array.isArray(value)) {
    return null;
  }

  return (
    <div
      className={cn('prose prose-lg max-w-none dark:prose-invert', className)}
    >
      <SanityPortableText value={value} components={createComponents(locale)} />
    </div>
  );
}
