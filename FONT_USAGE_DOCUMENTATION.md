# 🎨 Font Usage Documentation - Tranzkit Website

**Project:** Tranzkit Website v2  
**Last Updated:** December 18, 2025  
**Locale Support:** English (en) & Arabic (ar)

---

## 📋 Table of Contents

1. [Executive Summary](#executive-summary)
2. [Font Inventory](#font-inventory)
3. [Font Assignment Matrix](#font-assignment-matrix)
4. [Detailed Usage by Element](#detailed-usage-by-element)
5. [Technical Implementation](#technical-implementation)
6. [Code Examples](#code-examples)
7. [File References](#file-references)
8. [Visual Hierarchy Summary](#visual-hierarchy-summary)
9. [RTL Support](#rtl-support)
10. [Best Practices](#best-practices)
11. [Migration Guide](#migration-guide)
12. [Performance Notes](#performance-notes)
13. [Troubleshooting](#troubleshooting)

---

## 📊 Executive Summary

The Tranzkit website uses a **locale-aware typography system** that automatically switches fonts based on the user's selected language (English or Arabic). The system is built using:

- **Typography Component** (`src/components/ui/typography.tsx`) - Smart font switching logic
- **Next.js Font Optimization** - Automatic font loading and optimization
- **CSS Variables** - Dynamic font family assignment
- **RTL Support** - Full right-to-left layout support for Arabic

### Quick Overview

| Language | Primary Font | Secondary Font | Monospace |
|----------|--------------|----------------|-----------|
| **English** | Geist Sans | Geist Sans | Geist Mono |
| **Arabic** | DIN Next (Alarabia) | IBM Plex Sans Arabic | Geist Mono |

---

## 🗂️ Font Inventory

### English Fonts

#### 1. **Geist Sans** (Primary)

- **Source:** Google Fonts (via `next/font/google`)
- **Subsets:** Latin
- **Display:** Swap
- **CSS Variable:** `--font-geist-sans`
- **CSS Class:** `.font-sans`
- **Usage:** All text elements (headings, body, buttons, UI)
- **Weights:** Auto-optimized by Next.js

```typescript
const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
  display: 'swap',
});
```

#### 2. **Geist Mono** (Monospace)

- **Source:** Google Fonts (via `next/font/google`)
- **Subsets:** Latin
- **Display:** Swap
- **CSS Variable:** `--font-geist-mono`
- **CSS Class:** `.font-mono`
- **Usage:** Code snippets, technical content
- **Weights:** Auto-optimized by Next.js

```typescript
const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
  display: 'swap',
});
```

---

### Arabic Fonts

#### 1. **DIN Next LT W23** (Primary - Headers)

- **Type:** Local Custom Font
- **Source:** `/public/fonts/din-next/`
- **CSS Variable:** `--font-alarabia`
- **CSS Class:** `.font-alarabia`
- **Display:** Swap
- **Usage:** Display headings, titles (H1-H4)

**Available Weights:**

| Weight | File |
|--------|------|
| 200 (Ultra Light) | `din-next-lt-w23-ultra-light.ttf` |
| 300 (Light) | `din-next-lt-w23-light.ttf` |
| 400 (Regular) | `din-next-lt-w23-regular.ttf` |
| 500 (Medium) | `din-next-lt-w23-medium.ttf` |
| 700 (Bold) | `din-next-lt-w23-bold.ttf` |
| 800 (Heavy) | `din-next-lt-w23-heavy.ttf` |
| 900 (Black) | `din-next-lt-w23-black.ttf` |

```typescript
const alarabiaFont = localFont({
  src: [
    { path: '../../../public/fonts/din-next/din-next-lt-w23-ultra-light.ttf', weight: '200', style: 'normal' },
    { path: '../../../public/fonts/din-next/din-next-lt-w23-light.ttf', weight: '300', style: 'normal' },
    { path: '../../../public/fonts/din-next/din-next-lt-w23-regular.ttf', weight: '400', style: 'normal' },
    { path: '../../../public/fonts/din-next/din-next-lt-w23-medium.ttf', weight: '500', style: 'normal' },
    { path: '../../../public/fonts/din-next/din-next-lt-w23-bold.ttf', weight: '700', style: 'normal' },
    { path: '../../../public/fonts/din-next/din-next-lt-w23-heavy.ttf', weight: '800', style: 'normal' },
    { path: '../../../public/fonts/din-next/din-next-lt-w23-black.ttf', weight: '900', style: 'normal' },
  ],
  variable: '--font-alarabia',
  display: 'swap',
});
```

#### 2. **IBM Plex Sans Arabic** (Secondary - Body Text)

- **Source:** Google Fonts (via `next/font/google`)
- **Subsets:** Arabic
- **CSS Variable:** `--font-ibm-plex-arabic`
- **CSS Class:** `.font-ibm-arabic`
- **Display:** Swap
- **Usage:** Body text, subtitles, captions, buttons
- **Available Weights:** 300, 400, 500, 600, 700

```typescript
const ibmPlexSansArabic = IBM_Plex_Sans_Arabic({
  variable: '--font-ibm-plex-arabic',
  subsets: ['arabic'],
  weight: ['300', '400', '500', '600', '700'],
  display: 'swap',
});
```

#### 3. **Alternative Arabic Fonts** (Not Currently Active)

These fonts are available in the repository but not currently used:

- **Al Mosmak** - `/public/fonts/Al_Mosmak_Font.otf`
- **Alarabia** (Single Weight) - `/public/fonts/Alarabia_font.ttf`
- **Aljazeera** - `/public/fonts/Aljazeera_font.ttf`
- **Hacen Tunisia** - `/public/fonts/hacen-tunisia/`

---

## 🎯 Font Assignment Matrix

### English Version

| Element Type | Font Family | Weight | Size (Desktop) | Usage Context |
|--------------|-------------|--------|----------------|---------------|
| **Display** | Geist Sans | Bold (700) | 4rem - 7rem | Hero headlines |
| **H1** | Geist Sans | Bold (700) | 2.5rem - 6rem | Page titles |
| **H2** | Geist Sans | Semibold (600) | 1.875rem - 5rem | Section titles |
| **H3** | Geist Sans | Semibold (600) | 1.5rem - 3rem | Subsection titles |
| **H4** | Geist Sans | Semibold (600) | 1.25rem - 2rem | Card titles |
| **Body** | Geist Sans | Normal (400) | 1rem - 1.125rem | Paragraphs, descriptions |
| **Subtitle** | Geist Sans | Medium (500) | 1.125rem - 1.25rem | Secondary headings |
| **Button** | Geist Sans | Semibold (600) | 0.875rem - 1rem | CTA buttons, links |
| **Caption** | Geist Sans | Normal (400) | 0.75rem - 0.875rem | Small text, labels |
| **Overline** | Geist Sans | Semibold (600) | 0.75rem | All caps labels |
| **Code** | Geist Mono | Normal (400) | 0.875rem | Code blocks |

---

### Arabic Version

| Element Type | Font Family | Weight | Size (Desktop) | Usage Context |
|--------------|-------------|--------|----------------|---------------|
| **Display** | DIN Next (Alarabia) | Bold (700) | 4rem - 7rem | عناوين البطل الرئيسية |
| **H1** | DIN Next (Alarabia) | Bold (700) | 2.5rem - 6rem | عناوين الصفحات |
| **H2** | DIN Next (Alarabia) | Semibold (600) | 1.875rem - 5rem | عناوين الأقسام |
| **H3** | DIN Next (Alarabia) | Semibold (600) | 1.5rem - 3rem | عناوين الأقسام الفرعية |
| **H4** | DIN Next (Alarabia) | Semibold (600) | 1.25rem - 2rem | عناوين البطاقات |
| **Body** | IBM Plex Sans Arabic | Normal (400) | 1rem - 1.125rem | الفقرات والأوصاف |
| **Subtitle** | IBM Plex Sans Arabic | Medium (500) | 1.125rem - 1.25rem | العناوين الثانوية |
| **Button** | IBM Plex Sans Arabic | Semibold (600) | 0.875rem - 1rem | أزرار الدعوة للعمل |
| **Caption** | IBM Plex Sans Arabic | Normal (400) | 0.75rem - 0.875rem | نص صغير، تسميات |
| **Overline** | IBM Plex Sans Arabic | Semibold (600) | 0.75rem | تسميات بأحرف كبيرة |
| **Code** | Geist Mono | Normal (400) | 0.875rem | كتل التعليمات البرمجية |

---

## 📐 Detailed Usage by Element

### Display (Hero Headlines)

**Variant:** `display`  
**Classes:** `text-5xl md:text-6xl lg:text-7xl font-bold leading-tight`

**English:**
- Font: Geist Sans
- Use: Landing page hero, major campaign headlines

**Arabic:**
- Font: DIN Next (Alarabia)
- Direction: RTL
- Use: الصفحة الرئيسية، العناوين الرئيسية للحملات

---

### H1 (Page Titles)

**Variant:** `h1`  
**Classes:** `text-4xl md:text-5xl lg:text-6xl font-bold leading-tight`

**English:** Geist Sans  
**Arabic:** DIN Next (Alarabia)

Use: Page headers, main content titles

---

### H2 (Section Titles)

**Variant:** `h2`  
**Classes:** `text-3xl md:text-4xl lg:text-5xl font-semibold leading-snug`

**English:** Geist Sans  
**Arabic:** DIN Next (Alarabia)

Use: Section headings, feature titles

---

### H3 (Subsection Titles)

**Variant:** `h3`  
**Classes:** `text-2xl md:text-3xl font-semibold leading-normal`

**English:** Geist Sans  
**Arabic:** DIN Next (Alarabia)

Use: Card titles, subsection headers

---

### H4 (Card/Component Titles)

**Variant:** `h4`  
**Classes:** `text-xl md:text-2xl font-semibold leading-normal`

**English:** Geist Sans  
**Arabic:** DIN Next (Alarabia)

Use: Card headings, small component titles

---

### Body Text

**Variant:** `body`  
**Classes:** `text-base md:text-lg font-normal leading-relaxed`

**English:**
- Font: Geist Sans
- Use: Page copy, descriptions, long-form content

**Arabic:**
- Font: IBM Plex Sans Arabic
- Direction: RTL, auto right-aligned
- Use: نص الفقرات، الأوصاف، المحتوى الطويل

---

### Subtitle

**Variant:** `subtitle`  
**Classes:** `text-lg md:text-xl font-medium leading-normal`

**English:** Geist Sans  
**Arabic:** IBM Plex Sans Arabic

Use: Section subtitles, supporting headlines

---

### Button Text

**Variant:** `button`  
**Classes:** `text-sm md:text-base font-semibold leading-none`

**English:** Geist Sans  
**Arabic:** IBM Plex Sans Arabic

Use: CTA buttons, navigation links, action buttons

---

### Caption (Small Text)

**Variant:** `caption`  
**Classes:** `text-xs md:text-sm font-normal leading-snug`

**English:** Geist Sans  
**Arabic:** IBM Plex Sans Arabic

Use: Image captions, helper text, metadata

---

### Overline (Labels)

**Variant:** `overline`  
**Classes:** `text-xs font-semibold uppercase tracking-wider leading-relaxed`

**English:** Geist Sans  
**Arabic:** IBM Plex Sans Arabic

Use: Category labels, section tags

---

## 🔧 Technical Implementation

### Font Loading Configuration

**File:** `src/app/[locale]/layout.tsx`

```typescript
import { Geist, Geist_Mono, IBM_Plex_Sans_Arabic } from 'next/font/google';
import localFont from 'next/font/local';

// English Fonts (Google Fonts)
const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
  display: 'swap',
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
  display: 'swap',
});

// Arabic Font - IBM Plex Sans Arabic (Google Fonts)
const ibmPlexSansArabic = IBM_Plex_Sans_Arabic({
  variable: '--font-ibm-plex-arabic',
  subsets: ['arabic'],
  weight: ['300', '400', '500', '600', '700'],
  display: 'swap',
});

// Arabic Font - DIN Next (Local Custom Font)
const alarabiaFont = localFont({
  src: [
    { path: '../../../public/fonts/din-next/din-next-lt-w23-ultra-light.ttf', weight: '200', style: 'normal' },
    { path: '../../../public/fonts/din-next/din-next-lt-w23-light.ttf', weight: '300', style: 'normal' },
    { path: '../../../public/fonts/din-next/din-next-lt-w23-regular.ttf', weight: '400', style: 'normal' },
    { path: '../../../public/fonts/din-next/din-next-lt-w23-medium.ttf', weight: '500', style: 'normal' },
    { path: '../../../public/fonts/din-next/din-next-lt-w23-bold.ttf', weight: '700', style: 'normal' },
    { path: '../../../public/fonts/din-next/din-next-lt-w23-heavy.ttf', weight: '800', style: 'normal' },
    { path: '../../../public/fonts/din-next/din-next-lt-w23-black.ttf', weight: '900', style: 'normal' },
  ],
  variable: '--font-alarabia',
  display: 'swap',
});

export default async function LocaleLayout({ children, params }) {
  const { locale } = await params;
  
  return (
    <html lang={locale} dir={locale === 'ar' ? 'rtl' : 'ltr'}>
      <body className={`${geistSans.variable} ${geistMono.variable} ${ibmPlexSansArabic.variable} ${alarabiaFont.variable}`}>
        {children}
      </body>
    </html>
  );
}
```

---

### CSS Variable System

**File:** `src/app/globals.css`

```css
@theme inline {
  --font-sans: var(--font-geist-sans);
  --font-mono: var(--font-geist-mono);
}

/* English - Geist Sans (default) */
.font-sans {
  font-family: var(--font-geist-sans), sans-serif;
}

/* Arabic - DIN Next (Alarabia) - for headers/titles */
.font-alarabia {
  font-family: var(--font-alarabia), var(--font-geist-sans), sans-serif;
}

/* Arabic - IBM Plex Sans Arabic - for body/UI */
.font-ibm-arabic {
  font-family: var(--font-ibm-plex-arabic), var(--font-geist-sans), sans-serif;
}

/* Monospace (unchanged for both languages) */
.font-mono {
  font-family: var(--font-geist-mono), monospace;
}
```

---

### Typography Component Logic

**File:** `src/components/ui/typography.tsx`

```typescript
const getFontClass = (variant: string, locale: string) => {
  const isArabic = locale === 'ar';
  
  // Headings and Display use DIN Next (Alarabia)
  const alarabiaVariants = ['display', 'h1', 'h2', 'h3', 'h4'];
  
  // Body, Subtitle, Caption, Overline, Button use IBM Plex Sans Arabic
  const ibmVariants = ['body', 'subtitle', 'caption', 'overline', 'button'];
  
  if (isArabic) {
    if (alarabiaVariants.includes(variant)) {
      return 'font-alarabia'; // DIN Next
    }
    if (ibmVariants.includes(variant)) {
      return 'font-ibm-arabic'; // IBM Plex Sans Arabic
    }
  }
  
  // English uses Geist Sans for all
  return 'font-sans';
};
```

**Font Assignment Rules:**

| Variant | English Font | Arabic Font | Rationale |
|---------|--------------|-------------|-----------|
| `display`, `h1`, `h2`, `h3`, `h4` | Geist Sans | DIN Next (Alarabia) | Display fonts need strong visual presence |
| `body`, `subtitle`, `caption`, `overline`, `button` | Geist Sans | IBM Plex Sans Arabic | Readable font for UI and body text |

---

## 💡 Code Examples

### Example 1: Using Typography Component

```tsx
import { Typography } from '@/components/ui/typography';

// Automatically uses Geist Sans (English) or DIN Next (Arabic)
<Typography variant="h1">
  Welcome to Tranzkit
</Typography>

// Automatically uses Geist Sans (English) or IBM Plex Arabic (Arabic)
<Typography variant="body">
  This is body text that will adapt based on the locale.
</Typography>

// Button text
<Typography variant="button">
  Get Started
</Typography>
```

---

### Example 2: Manual Font Class Usage

```tsx
// For Arabic headings (when not using Typography component)
<h1 className="font-alarabia text-4xl font-bold">
  عنوان الصفحة
</h1>

// For Arabic body text
<p className="font-ibm-arabic text-base">
  هذا نص عادي
</p>

// For English (default)
<h1 className="font-sans text-4xl font-bold">
  Page Title
</h1>
```

---

### Example 3: Locale-Aware Component

```tsx
import { useLocale } from 'next-intl';

function MyComponent() {
  const locale = useLocale();
  const isArabic = locale === 'ar';
  
  return (
    <div className={isArabic ? 'font-alarabia' : 'font-sans'}>
      <h1>Dynamic Font Based on Locale</h1>
    </div>
  );
}
```

---

### Example 4: Responsive Typography

```tsx
<Typography 
  variant="h1" 
  className="text-3xl md:text-5xl lg:text-6xl"
>
  Responsive Heading
</Typography>

// Mobile: 3rem (48px)
// Tablet: 5rem (80px)
// Desktop: 6rem (96px)
```

---

## 📂 File References

### Configuration Files

| File Path | Purpose |
|-----------|---------|
| `src/app/[locale]/layout.tsx` | Font imports and initialization |
| `src/app/globals.css` | Font CSS variables and utility classes |
| `src/components/ui/typography.tsx` | Typography component with auto font-switching |
| `src/i18n.ts` | Locale configuration (en, ar) |

---

### Font Files

#### English Fonts (Google Fonts - Auto-loaded)
- Geist Sans - Auto-optimized by Next.js
- Geist Mono - Auto-optimized by Next.js

#### Arabic Fonts

**Active Fonts:**

| Font File | Path | Weight | Status |
|-----------|------|--------|--------|
| DIN Next Ultra Light | `/public/fonts/din-next/din-next-lt-w23-ultra-light.ttf` | 200 | ✅ Active |
| DIN Next Light | `/public/fonts/din-next/din-next-lt-w23-light.ttf` | 300 | ✅ Active |
| DIN Next Regular | `/public/fonts/din-next/din-next-lt-w23-regular.ttf` | 400 | ✅ Active |
| DIN Next Medium | `/public/fonts/din-next/din-next-lt-w23-medium.ttf` | 500 | ✅ Active |
| DIN Next Bold | `/public/fonts/din-next/din-next-lt-w23-bold.ttf` | 700 | ✅ Active |
| DIN Next Heavy | `/public/fonts/din-next/din-next-lt-w23-heavy.ttf` | 800 | ✅ Active |
| DIN Next Black | `/public/fonts/din-next/din-next-lt-w23-black.ttf` | 900 | ✅ Active |
| IBM Plex Sans Arabic | Google Fonts CDN | 300-700 | ✅ Active |

**Alternative Fonts (Available but Not Used):**

| Font File | Path | Status |
|-----------|------|--------|
| Al Mosmak Font | `/public/fonts/Al_Mosmak_Font.otf` | 🔄 Available |
| Alarabia Font (Single) | `/public/fonts/Alarabia_font.ttf` | 🔄 Available |
| Aljazeera Font | `/public/fonts/Aljazeera_font.ttf` | 🔄 Available |
| Hacen Tunisia | `/public/fonts/hacen-tunisia/` | 🔄 Available |

---

## 🎨 Visual Hierarchy Summary

### English Typography Hierarchy

```
┌──────────────────────────────────────────────────┐
│ DISPLAY (Geist Sans Bold - 7rem)                │
│ ↓                                                │
│ H1 (Geist Sans Bold - 6rem)                     │
│ ↓                                                │
│ H2 (Geist Sans Semibold - 5rem)                 │
│ ↓                                                │
│ H3 (Geist Sans Semibold - 3rem)                 │
│ ↓                                                │
│ H4 (Geist Sans Semibold - 2rem)                 │
│ ↓                                                │
│ SUBTITLE (Geist Sans Medium - 1.25rem)          │
│ ↓                                                │
│ BODY (Geist Sans Regular - 1.125rem)            │
│ ↓                                                │
│ BUTTON (Geist Sans Semibold - 1rem)             │
│ ↓                                                │
│ CAPTION (Geist Sans Regular - 0.875rem)         │
│ ↓                                                │
│ OVERLINE (Geist Sans Semibold - 0.75rem)        │
└──────────────────────────────────────────────────┘
```

### Arabic Typography Hierarchy

```
┌──────────────────────────────────────────────────┐
│ DISPLAY (DIN Next Bold - 7rem)                  │
│ ↓                                                │
│ H1 (DIN Next Bold - 6rem)                       │
│ ↓                                                │
│ H2 (DIN Next Semibold - 5rem)                   │
│ ↓                                                │
│ H3 (DIN Next Semibold - 3rem)                   │
│ ↓                                                │
│ H4 (DIN Next Semibold - 2rem)                   │
│ ↓                                                │
│ SUBTITLE (IBM Plex Arabic Medium - 1.25rem)     │
│ ↓                                                │
│ BODY (IBM Plex Arabic Regular - 1.125rem)       │
│ ↓                                                │
│ BUTTON (IBM Plex Arabic Semibold - 1rem)        │
│ ↓                                                │
│ CAPTION (IBM Plex Arabic Regular - 0.875rem)    │
│ ↓                                                │
│ OVERLINE (IBM Plex Arabic Semibold - 0.75rem)   │
└──────────────────────────────────────────────────┘
```

---

## 🌐 RTL Support

The website automatically applies RTL layout and text direction for Arabic:

- **HTML Direction:** `<html dir="rtl" lang="ar">`
- **Text Alignment:** Auto-aligned to right for Arabic
- **Layout Flow:** Reversed (flexbox, grid automatically flip)
- **Navigation:** Icons and menus flip direction
- **Typography Component:** Sets `dir="rtl"` on elements for Arabic

---

## 📝 Best Practices

### Do's ✅

1. **Always use the Typography component** for text elements
2. **Let the system handle font switching** - don't hardcode font classes
3. **Use semantic HTML elements** (h1, h2, p) via the `as` prop
4. **Respect the typography hierarchy** - don't skip heading levels
5. **Test in both locales** before deploying

### Don'ts ❌

1. **Don't override fonts manually** unless absolutely necessary
2. **Don't use inline styles** for font families
3. **Don't mix font families** within the same text block
4. **Don't hardcode text direction** - let the locale determine it
5. **Don't use non-responsive font sizes** - always use responsive scale

---

## 🔄 Migration Guide

### Changing English Font

1. Update import in `src/app/[locale]/layout.tsx`
2. Update CSS variable in `src/app/globals.css`
3. Test all typography variants

### Changing Arabic Font

1. Add font files to `/public/fonts/`
2. Update `localFont` configuration in `src/app/[locale]/layout.tsx`
3. Update CSS variable mappings
4. Update `getFontClass` logic in `typography.tsx`
5. Test all Arabic variants thoroughly

### Adding New Typography Variant

1. Add variant to `typographyVariants` in `typography.tsx`
2. Add HTML element mapping in `variantToElement`
3. Update `getFontClass` logic if needed
4. Document the new variant in this file

---

## 📊 Performance Notes

- **Font Loading Strategy:** `display: swap` for all fonts (prevents FOIT)
- **Google Fonts:** Auto-optimized by Next.js Font Optimization
- **Local Fonts:** Preloaded with multiple weights for DIN Next
- **Fallback Chain:** Custom font → Geist Sans → System Sans-Serif
- **Total Font Files:** 10 files (7 DIN Next weights + 2 Geist + IBM Plex from CDN)
- **Approximate Total Size:** ~1.2 MB (optimized and lazy-loaded)

---

## 🐛 Troubleshooting

### Fonts Not Loading?

1. Check browser console for 404 errors
2. Verify font file paths in `layout.tsx`
3. Clear browser cache and Next.js cache (`.next` folder)
4. Check network tab for font loading

### Wrong Font Displaying?

1. Verify locale is correctly set (`useLocale()` hook)
2. Check Typography component `variant` prop
3. Inspect element to see applied CSS classes
4. Verify `getFontClass` logic in `typography.tsx`

### RTL Issues?

1. Ensure `<html dir="rtl">` is set for Arabic
2. Check Tailwind RTL utilities (`rtl:` prefix)
3. Verify layout direction in browser DevTools

---

## 📞 Support

For questions or issues related to typography:

1. Check this documentation first
2. Review the Typography component code
3. Test in both English and Arabic locales
4. Consult with the design team for visual approval

---

**Document Version:** 1.0  
**Last Updated:** December 18, 2025  
**Maintained By:** Tranzkit Development Team
