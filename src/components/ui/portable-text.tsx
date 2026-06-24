'use client';

import {
  PortableText as SanityPortableText,
  PortableTextComponents,
} from '@portabletext/react';
import Link from 'next/link';
import { useLocale } from 'next-intl';
import { localizeInternalHref } from '@/lib/localize-internal-href';

function createComponents(locale: string): PortableTextComponents {
  return {
    block: {
      h2: ({ children }) => (
        <h2 className="text-3xl font-bold mt-12 mb-6 scroll-mt-20">
          {children}
        </h2>
      ),
      h3: ({ children }) => (
        <h3 className="text-2xl font-bold mt-10 mb-4 scroll-mt-20">
          {children}
        </h3>
      ),
      h4: ({ children }) => (
        <h4 className="text-xl font-bold mt-8 mb-3 scroll-mt-20">{children}</h4>
      ),
      normal: ({ children }) => (
        <p className="mb-6 leading-relaxed">{children}</p>
      ),
      blockquote: ({ children }) => (
        <blockquote className="border-l-4 border-primary pl-6 py-2 my-8 italic text-lg">
          {children}
        </blockquote>
      ),
    },
    list: {
      bullet: ({ children }) => (
        <ul className="list-disc list-outside ml-6 mb-6 space-y-2">
          {children}
        </ul>
      ),
      number: ({ children }) => (
        <ol className="list-decimal list-outside ml-6 mb-6 space-y-2">
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
        <strong className="font-bold">{children}</strong>
      ),
      em: ({ children }) => <em className="italic">{children}</em>,
      code: ({ children }) => (
        <code className="bg-muted px-2 py-1 rounded text-sm font-mono">
          {children}
        </code>
      ),
      link: ({ children, value }) => {
        const href = value?.href || '';
        const localizedHref = localizeInternalHref(href, locale);
        const isExternal = href.startsWith('http');

        return (
          <Link
            href={localizedHref}
            target={isExternal ? '_blank' : undefined}
            rel={isExternal ? 'noopener noreferrer' : undefined}
            className="text-primary hover:underline font-medium"
          >
            {children}
          </Link>
        );
      },
    },
  };
}

interface PortableTextProps {
  value: any;
}

export function PortableText({ value }: PortableTextProps) {
  const locale = useLocale();

  if (!value) return null;

  return (
    <div className="prose prose-lg max-w-none dark:prose-invert">
      <SanityPortableText value={value} components={createComponents(locale)} />
    </div>
  );
}
