# Tranzkit Website - Architecture Documentation

## 🏗️ Project Overview

This is a modern, high-performance Next.js website for Tranzkit, built with the latest web technologies and best practices.

## 📚 Technology Stack

### Core Framework
- **Next.js 16** (App Router) - React framework with server-side rendering, static site generation, and optimal performance
- **React 19** - UI library with React Compiler enabled for automatic optimizations
- **TypeScript** - Type-safe development

### UI & Styling
- **Tailwind CSS v4** - Utility-first CSS framework
- **shadcn/ui** - High-quality, accessible component library
- **Framer Motion** - Production-ready animation library

### Internationalization
- **next-intl** - Type-safe internationalization for Next.js
- Supports English (en) and Arabic (ar) with RTL support

### State Management & Data Fetching
- **Zustand** - Lightweight state management for global UI state
- **TanStack Query (React Query)** - Powerful data fetching and caching
- **React Hook Form** - Performant form handling
- **Zod** - TypeScript-first schema validation

### Performance Optimizations
- **Sharp** - High-performance image optimization
- **Turbopack** - Next-generation bundler (development)
- **React Compiler** - Automatic React optimizations

## 📁 Project Structure

```
tranzkit_website/
├── src/
│   ├── app/                          # Next.js App Router
│   │   ├── [locale]/                 # Internationalized routes
│   │   │   ├── (main)/              # Main layout group
│   │   │   │   ├── page.tsx         # Home page
│   │   │   │   ├── solutions/       # Solutions page
│   │   │   │   ├── resources/       # Resources hub
│   │   │   │   │   ├── blog/
│   │   │   │   │   ├── case-studies/
│   │   │   │   │   ├── faq/
│   │   │   │   │   ├── help-center/
│   │   │   │   │   ├── webinars/
│   │   │   │   │   └── whitepapers/
│   │   │   │   ├── apps/            # Apps showcase
│   │   │   │   ├── contact/         # Contact page
│   │   │   │   ├── pricing/         # Pricing page
│   │   │   │   └── about/           # About us
│   │   │   │       └── careers/     # Careers section
│   │   │   └── layout.tsx           # Locale-specific layout
│   │   ├── layout.tsx               # Root layout
│   │   └── globals.css              # Global styles
│   ├── components/
│   │   ├── layout/                  # Layout components
│   │   │   ├── header.tsx
│   │   │   ├── footer.tsx
│   │   │   └── language-switcher.tsx
│   │   ├── sections/                # Page sections
│   │   │   ├── hero-section.tsx
│   │   │   ├── features-section.tsx
│   │   │   ├── testimonials-section.tsx
│   │   │   └── cta-section.tsx
│   │   ├── forms/                   # Form components
│   │   │   └── contact-form.tsx
│   │   ├── animations/              # Animation wrappers
│   │   │   ├── fade-in.tsx
│   │   │   └── slide-in.tsx
│   │   └── ui/                      # shadcn/ui components
│   ├── lib/
│   │   ├── api/                     # API client configuration
│   │   ├── hooks/                   # Custom React hooks
│   │   ├── store/                   # Zustand stores
│   │   ├── validations/             # Zod schemas
│   │   └── utils.ts                 # Utility functions
│   ├── config/
│   │   └── site.ts                  # Site configuration
│   ├── types/
│   │   └── index.ts                 # TypeScript types
│   ├── i18n.ts                      # i18n configuration
│   └── middleware.ts                # Next.js middleware
├── messages/                         # Translation files
│   ├── en.json
│   └── ar.json
└── public/                          # Static assets
```

## 🎨 Design Patterns & Best Practices

### 1. **Server Components by Default**
- All components are Server Components unless marked with `'use client'`
- Client components are used only when needed (interactivity, hooks, browser APIs)

### 2. **Route Groups**
- `(main)` route group for shared layouts without affecting URL structure

### 3. **Internationalization**
- All routes are prefixed with locale (`/en/`, `/ar/`)
- Automatic RTL support for Arabic
- Type-safe translations with next-intl

### 4. **Performance Optimizations**
- **Image Optimization**: Automatic WebP/AVIF conversion with Sharp
- **Code Splitting**: Automatic with Next.js App Router
- **Prefetching**: Link prefetching for instant navigation
- **Caching**: React Query for intelligent data caching
- **React Compiler**: Automatic memoization and optimizations

### 5. **Animation Strategy**
- Framer Motion for smooth, performant animations
- Viewport-based animations (trigger on scroll)
- Staggered animations for lists
- Reduced motion support for accessibility

### 6. **Form Handling**
- React Hook Form for performance
- Zod for type-safe validation
- Optimistic UI updates
- Error handling and user feedback

## 🚀 Performance Features

### Static Site Generation (SSG)
- Home page and marketing pages are pre-rendered at build time
- Incremental Static Regeneration (ISR) for dynamic content

### Image Optimization
- Automatic format conversion (WebP, AVIF)
- Responsive images with srcset
- Lazy loading by default
- Blur placeholder for better UX

### Caching Strategy
```typescript
// React Query Configuration
{
  staleTime: 5 * 60 * 1000,      // 5 minutes
  gcTime: 10 * 60 * 1000,         // 10 minutes
  refetchOnWindowFocus: true,
  refetchOnReconnect: true,
}
```

### Bundle Optimization
- Tree shaking for unused code
- Dynamic imports for code splitting
- Turbopack for faster development builds

## 🌐 Internationalization

### Supported Locales
- English (en) - LTR
- Arabic (ar) - RTL

### Translation Files
Located in `/messages/`:
- `en.json` - English translations
- `ar.json` - Arabic translations

### Usage
```typescript
import { useTranslations } from 'next-intl';

const t = useTranslations('nav');
t('home'); // Returns translated text
```

## 🎭 Animation Guidelines

### When to Use Animations
1. **Hero sections** - Fade in + slide up
2. **Feature cards** - Staggered fade in
3. **Testimonials** - Slide in from sides
4. **CTAs** - Scale + fade on hover
5. **Page transitions** - Smooth fade

### Animation Components
- `<FadeIn>` - Fade in with optional slide
- `<SlideIn>` - Slide from any direction

### Performance Considerations
- Use `viewport={{ once: true }}` to animate only once
- Keep animations under 500ms
- Use CSS transforms (not layout properties)
- Respect `prefers-reduced-motion`

## 📦 Key Libraries & Their Purpose

| Library | Purpose | Why Chosen |
|---------|---------|------------|
| Next.js 16 | Framework | Best-in-class React framework with excellent DX |
| Framer Motion | Animations | Production-ready, performant animations |
| next-intl | i18n | Type-safe, Next.js-optimized i18n |
| TanStack Query | Data fetching | Intelligent caching and state management |
| Zustand | State management | Lightweight, simple API |
| React Hook Form | Forms | Best performance for forms |
| Zod | Validation | Type-safe schema validation |
| shadcn/ui | Components | High-quality, customizable components |
| Tailwind CSS | Styling | Utility-first, highly performant |

## 🔒 SEO Optimization

### Metadata
- Dynamic metadata per page
- Open Graph tags
- Twitter Card tags
- Structured data (JSON-LD)

### Performance
- Core Web Vitals optimization
- Fast page loads (< 2s)
- Optimized images
- Minimal JavaScript

## 📱 Responsive Design

### Breakpoints (Tailwind)
- `sm`: 640px
- `md`: 768px
- `lg`: 1024px
- `xl`: 1280px
- `2xl`: 1536px

### Mobile-First Approach
All components are designed mobile-first, then enhanced for larger screens.

## 🧪 Testing Strategy (Recommended)

### Unit Tests
- Component testing with React Testing Library
- Hook testing with @testing-library/react-hooks

### E2E Tests
- Playwright for end-to-end testing
- Test critical user flows

### Performance Testing
- Lighthouse CI
- Core Web Vitals monitoring

## 🚀 Deployment

### Recommended Platform
- **Vercel** - Optimal for Next.js (zero-config)
- **Netlify** - Alternative with good Next.js support
- **AWS Amplify** - For AWS infrastructure

### Environment Variables
```env
NEXT_PUBLIC_SITE_URL=https://tranzkit.com
NEXT_PUBLIC_API_URL=https://api.tranzkit.com
```

## 📈 Future Enhancements

1. **Analytics Integration** - Google Analytics, Plausible, or Vercel Analytics
2. **CMS Integration** - Sanity, Contentful, or Strapi for content management
3. **Search Functionality** - Algolia or Meilisearch
4. **Blog with MDX** - Rich content with embedded components
5. **A/B Testing** - Vercel Edge Config or similar
6. **Progressive Web App** - Service worker for offline support

