import type { MDXComponents } from 'mdx/types';
import { Card } from '@/components/ui/card';

/**
 * MDX Components Configuration
 * Customize how MDX renders HTML elements
 */
export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    // Custom heading styles
    h1: ({ children }) => (
      <h1 className="text-4xl font-bold mb-6 mt-8">{children}</h1>
    ),
    h2: ({ children }) => (
      <h2 className="text-3xl font-semibold mb-4 mt-6">{children}</h2>
    ),
    h3: ({ children }) => (
      <h3 className="text-2xl font-semibold mb-3 mt-4">{children}</h3>
    ),
    
    // Custom paragraph style
    p: ({ children }) => (
      <p className="text-muted-foreground leading-relaxed mb-4">{children}</p>
    ),
    
    // Custom list styles
    ul: ({ children }) => (
      <ul className="list-disc list-inside mb-4 space-y-2">{children}</ul>
    ),
    ol: ({ children }) => (
      <ol className="list-decimal list-inside mb-4 space-y-2">{children}</ol>
    ),
    
    // Custom link style
    a: ({ href, children }) => (
      <a
        href={href}
        className="text-primary hover:underline"
        target="_blank"
        rel="noopener noreferrer"
      >
        {children}
      </a>
    ),
    
    // Custom code block
    code: ({ children }) => (
      <code className="bg-muted px-2 py-1 rounded text-sm font-mono">
        {children}
      </code>
    ),
    
    // Custom pre block
    pre: ({ children }) => (
      <pre className="bg-muted p-4 rounded-lg overflow-x-auto mb-4">
        {children}
      </pre>
    ),
    
    // Custom blockquote
    blockquote: ({ children }) => (
      <Card className="border-l-4 border-primary p-4 mb-4 bg-muted/50">
        {children}
      </Card>
    ),
    
    // Custom table
    table: ({ children }) => (
      <div className="overflow-x-auto mb-4">
        <table className="w-full border-collapse">{children}</table>
      </div>
    ),
    
    ...components,
  };
}

