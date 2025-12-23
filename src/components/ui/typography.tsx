import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';
import { useLocale } from 'next-intl';

// Typography variant definitions using CVA (Class Variance Authority)
const typographyVariants = cva('', {
  variants: {
    variant: {
      // Display - Hero headlines (Alarabia for Arabic, Geist for English)
      display: 'text-5xl md:text-6xl lg:text-7xl font-bold leading-tight',
      
      // Headings - All use Alarabia for Arabic, Geist for English
      h1: 'text-4xl md:text-5xl lg:text-6xl font-bold leading-tight',
      h2: 'text-3xl md:text-4xl lg:text-5xl font-semibold leading-snug',
      h3: 'text-2xl md:text-3xl font-semibold leading-normal',
      h4: 'text-xl md:text-2xl font-semibold leading-normal',
      
      // Button text - Uses IBM Plex for Arabic
      button: 'text-sm md:text-base font-semibold leading-none',
      
      // Body text - Uses IBM Plex for Arabic, Geist for English
      body: 'text-base md:text-lg font-normal leading-relaxed',
      subtitle: 'text-lg md:text-xl font-medium leading-normal',
      caption: 'text-xs md:text-sm font-normal leading-snug',
      overline: 'text-xs font-semibold uppercase tracking-wider leading-relaxed',
    },
    align: {
      left: 'text-left rtl:text-right',
      center: 'text-center',
      right: 'text-right rtl:text-left',
    },
  },
  defaultVariants: {
    variant: 'body',
  },
});

// Font family mapping based on locale
const getFontClass = (variant: string, locale: string) => {
  const isArabic = locale === 'ar';
  
  // Headings and Display use DIN Next Font
  const dinVariants = ['display', 'h1', 'h2', 'h3', 'h4'];
  
  // Body, Subtitle, Caption, Overline, and Button use IBM Plex Sans Arabic
  const ibmVariants = ['body', 'subtitle', 'caption', 'overline', 'button'];
  
  if (isArabic) {
    if (dinVariants.includes(variant)) {
      return 'font-din'; // DIN Next Font
    }
    if (ibmVariants.includes(variant)) {
      return 'font-ibm-arabic'; // IBM Plex Sans Arabic
    }
  }
  
  // English uses Geist for all
  return 'font-sans';
};


// HTML element mapping for semantic correctness
const variantToElement = {
  display: 'h1',
  h1: 'h1',
  h2: 'h2',
  h3: 'h3',
  h4: 'h4',
  button: 'span',
  body: 'p',
  subtitle: 'p',
  caption: 'span',
  overline: 'span',
} as const;

type ElementType = typeof variantToElement[keyof typeof variantToElement];

export interface TypographyProps
  extends React.HTMLAttributes<HTMLElement>,
    VariantProps<typeof typographyVariants> {
  /**
   * The HTML element to render. Defaults to semantic element based on variant.
   */
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span' | 'div' | 'label';
  
  /**
   * Typography variant style
   */
  variant?: 'display' | 'h1' | 'h2' | 'h3' | 'h4' | 'button' | 'body' | 'subtitle' | 'caption' | 'overline';
  
  /**
   * Text alignment
   */
  align?: 'left' | 'center' | 'right';
   htmlFor?: string;
}

/**
 * Typography Component
 * 
 * Provides consistent text styling across the application with automatic
 * font switching between English (Geist) and Arabic (DIN Next/IBM Plex Arabic).
 * 
 * Font Assignment:
 * - Headings (display, h1-h4): DIN Next Font
 * - Body text (body, subtitle, caption, overline, button): IBM Plex Sans Arabic
 * 
 * RTL Support:
 * - Automatically applies RTL direction for Arabic text
 * - Auto-aligns to right for Arabic, left for English
 * 
 * @example
 * ```
 * <Typography variant="h1">Page Title</Typography>
 * <Typography variant="body" className="text-muted-foreground">
 *   This is body text that will use Geist for English and IBM Plex for Arabic.
 * </Typography>
 * ```
 */

export const Typography = React.forwardRef<HTMLElement, TypographyProps>(
  ({ className, variant = 'body', align, as, children, ...props }, ref) => {
    const locale = useLocale();
    const isRTL = locale === 'ar';
    
    // Determine which HTML element to render
    const elementType = as || variantToElement[variant || 'body'] || 'p';
    
    // Get the appropriate font class based on variant and locale
    const fontClass = getFontClass(variant || 'body', locale);
    
    // Auto-detect alignment based on locale if not explicitly set
    const effectiveAlign = align || undefined; // Let CSS handle default via rtl: prefix
    
    // Use React.createElement to avoid JSX type issues
    return React.createElement(
      elementType,
      {
        ref,
        className: cn(
          typographyVariants({ variant, align: effectiveAlign }),
          fontClass,
          className
        ),
        dir: isRTL ? 'rtl' : 'ltr', // Explicitly set direction
        ...props,
      },
      children
    );
  }
);

Typography.displayName = 'Typography';
