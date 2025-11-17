# Tranzkit Website - Libraries & Dependencies Reference

> **Complete reference guide for all components, libraries, and dependencies used in the Tranzkit website project.**

---

## Table of Contents

1. [Project Overview](#project-overview)
2. [Core Dependencies](#core-dependencies)
   - [UI Component Libraries](#ui-component-libraries)
   - [Styling & Design](#styling--design)
   - [Animation Libraries](#animation-libraries)
   - [Internationalization](#internationalization)
   - [Theming](#theming)
   - [Forms & Validation](#forms--validation)
   - [3D Graphics](#3d-graphics)
   - [State Management](#state-management)
   - [Data Fetching](#data-fetching)
3. [Development Dependencies](#development-dependencies)
4. [Custom Utilities & Patterns](#custom-utilities--patterns)
5. [Configuration Files Reference](#configuration-files-reference)
6. [Quick Start Template](#quick-start-template)
7. [Brand-Specific Configurations](#brand-specific-configurations)
8. [Performance Considerations](#performance-considerations)

---

## Project Overview

### Framework & Core Technologies

| Technology | Version | Purpose |
|------------|---------|---------|
| **Next.js** | `16.0.1` | React framework with App Router, Server Components, and Turbopack |
| **React** | `19.2.0` | UI library with latest features (React 19) |
| **TypeScript** | `^5` | Type-safe JavaScript with strict mode enabled |
| **Node.js** | `^20` | Runtime environment |

### Build Configuration

- **Build Tool**: Turbopack (Next.js built-in, faster than Webpack)
- **Dev Server**: `next dev --turbopack`
- **TypeScript**: Strict mode with path aliases (`@/*` → `./src/*`)
- **Module Resolution**: Bundler mode for optimal tree-shaking

### Key Features

✅ **App Router** - Next.js 13+ routing with layouts and server components  
✅ **Server Components** - Default RSC for better performance  
✅ **Turbopack** - Ultra-fast bundler for development  
✅ **TypeScript Strict Mode** - Maximum type safety  
✅ **Path Aliases** - Clean imports with `@/` prefix  
✅ **Image Optimization** - AVIF/WebP with Sharp  
✅ **MDX Support** - Markdown with JSX components  

---

## Core Dependencies

### UI Component Libraries

#### shadcn/ui (Radix UI Primitives)

**Why we chose this**: Unstyled, accessible components built on Radix UI primitives. Fully customizable with Tailwind CSS, no runtime CSS-in-JS overhead.

| Package | Version | Purpose |
|---------|---------|---------|
| `@radix-ui/react-accordion` | `^1.2.12` | Collapsible content sections |
| `@radix-ui/react-avatar` | `^1.1.11` | User avatar with fallback |
| `@radix-ui/react-dialog` | `^1.1.15` | Modal dialogs and overlays |
| `@radix-ui/react-dropdown-menu` | `^2.1.16` | Dropdown menus with keyboard navigation |
| `@radix-ui/react-separator` | `^1.1.8` | Visual dividers |
| `@radix-ui/react-slot` | `^1.2.4` | Polymorphic component composition |
| `@radix-ui/react-tabs` | `^1.1.13` | Tab navigation |

**Installation**:
```bash
npm install @radix-ui/react-accordion @radix-ui/react-avatar @radix-ui/react-dialog @radix-ui/react-dropdown-menu @radix-ui/react-separator @radix-ui/react-slot @radix-ui/react-tabs
```

**Common Import Pattern**:
```tsx
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
```

**Usage Example**:
```tsx
<Dialog>
  <DialogTrigger asChild>
    <Button>Open Dialog</Button>
  </DialogTrigger>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Dialog Title</DialogTitle>
    </DialogHeader>
    <p>Dialog content goes here</p>
  </DialogContent>
</Dialog>
```

#### Custom UI Components Built

Located in `src/components/ui/`:

- **accordion.tsx** - Collapsible sections
- **animated-icon.tsx** - Icons with animation presets
- **audience-card.tsx** - Target audience display cards
- **avatar.tsx** - User avatars with fallback
- **badge.tsx** - Status badges and labels
- **benefits-list.tsx** - Feature benefits grid
- **button.tsx** - Primary button component with variants
- **card.tsx** - Content cards with header/footer
- **carousel.tsx** - Image/content carousel
- **dialog.tsx** - Modal dialogs
- **dropdown-menu.tsx** - Dropdown navigation
- **feature-card.tsx** - Feature showcase cards
- **gradient-button.tsx** - Branded gradient buttons
- **input.tsx** - Form input fields
- **metric-card.tsx** - Statistics display cards
- **section-container.tsx** - Page section wrapper
- **section-header.tsx** - Section title/subtitle
- **separator.tsx** - Visual dividers
- **sheet.tsx** - Slide-out panels
- **tabs.tsx** - Tab navigation
- **textarea.tsx** - Multi-line text input

---

### Styling & Design

#### Tailwind CSS v4

**Version**: `^4`  
**Why we chose this**: Utility-first CSS framework with OKLCH color space support, excellent performance, and minimal runtime overhead.

**Installation**:
```bash
npm install tailwindcss @tailwindcss/postcss
```

**Key Features Used**:
- ✅ **OKLCH Color Space** - Perceptually uniform colors
- ✅ **CSS Variables** - Dynamic theming
- ✅ **Dark Mode** - Class-based dark theme
- ✅ **Custom Animations** - Keyframe animations
- ✅ **Responsive Design** - Mobile-first breakpoints

**Configuration**: No `tailwind.config.ts` needed for v4 - configuration is in `globals.css`

**Import in globals.css**:
```css
@import "tailwindcss";
@import "tw-animate-css";
```

**Usage Example**:
```tsx
<div className="bg-primary text-primary-foreground dark:bg-secondary dark:text-secondary-foreground">
  <h1 className="text-4xl font-bold">Hello World</h1>
</div>
```

#### tw-animate-css

**Version**: `^1.4.0`
**Purpose**: Pre-built CSS animations for Tailwind CSS

**Installation**:
```bash
npm install tw-animate-css
```

**Usage**:
```tsx
<div className="animate-fade-in animate-duration-500">Fades in</div>
```

#### Utility Libraries

| Package | Version | Purpose |
|---------|---------|---------|
| `clsx` | `^2.1.1` | Conditional className composition |
| `tailwind-merge` | `^3.4.0` | Merge Tailwind classes intelligently |
| `class-variance-authority` | `^0.7.1` | Type-safe component variants |

**Combined Utility Function** (`src/lib/utils.ts`):
```tsx
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
```

**Usage**:
```tsx
import { cn } from '@/lib/utils';

<div className={cn(
  "base-class",
  isActive && "active-class",
  "override-class"
)} />
```

#### Icon Library

**Package**: `lucide-react`
**Version**: `^0.553.0`
**Why we chose this**: Beautiful, consistent icons with tree-shaking support. Over 1,000+ icons.

**Installation**:
```bash
npm install lucide-react
```

**Usage**:
```tsx
import { ArrowRight, Check, X, Menu } from 'lucide-react';

<ArrowRight className="w-5 h-5 text-primary" />
```

---

### Animation Libraries

#### Framer Motion

**Version**: `^12.23.24`
**Why we chose this**: Production-ready animation library with declarative API, gesture support, and excellent performance.

**Installation**:
```bash
npm install framer-motion
```

**Key Features Used**:
- ✅ **Variants** - Reusable animation states
- ✅ **Gestures** - Hover, tap, drag interactions
- ✅ **Layout Animations** - Automatic layout transitions
- ✅ **Scroll Animations** - Viewport-based triggers
- ✅ **Stagger Children** - Sequential animations

**Common Import**:
```tsx
import { motion, Variants } from 'framer-motion';
```

**Usage Example**:
```tsx
const fadeIn: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

<motion.div
  initial="hidden"
  whileInView="visible"
  viewport={{ once: true }}
  variants={fadeIn}
>
  Content
</motion.div>
```

**Custom Animation Variants** (`src/lib/animation-variants.ts`):
- `fadeIn`, `fadeInUp`, `fadeInDown`
- `scaleIn`, `scaleOnHover`
- `slideInLeft`, `slideInRight`
- `staggerContainer`, `staggerItem`
- `textRevealContainer`, `textRevealChar`
- `hoverTilt`, `pageTransition`, `accordionExpand`
- `parallaxScroll(offset)`

**Custom Animation Components** (`src/components/animations/`):
- `fade-in.tsx` - Fade in on scroll
- `hover-tilt.tsx` - 3D tilt on hover
- `parallax.tsx` - Parallax scroll effect
- `scale-on-hover.tsx` - Scale animation
- `scroll-reveal.tsx` - Reveal on scroll with direction
- `slide-in.tsx` - Slide in from direction
- `stagger-children.tsx` - Stagger child animations
- `text-reveal.tsx` - Character-by-character reveal

#### GSAP

**Version**: `^3.13.0`
**Purpose**: Professional-grade animation library for complex timelines

**Installation**:
```bash
npm install gsap
```

**Usage** (`src/lib/gsap-utils.ts`):
```tsx
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);
```

#### Lenis

**Version**: `^1.3.15`
**Purpose**: Smooth scroll library for buttery-smooth scrolling experience

**Installation**:
```bash
npm install lenis
```

**Usage**:
```tsx
import Lenis from 'lenis';

const lenis = new Lenis({
  duration: 1.2,
  easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
  smooth: true,
});
```

---

### Internationalization

#### next-intl

**Version**: `^4.5.1`
**Why we chose this**: Type-safe i18n for Next.js App Router with excellent DX and performance.

**Installation**:
```bash
npm install next-intl
```

**Configuration** (`src/i18n.ts`):
```tsx
import { getRequestConfig } from 'next-intl/server';

export const locales = ['en', 'ar'] as const;
export type Locale = (typeof locales)[number];

export default getRequestConfig(async ({ requestLocale }) => {
  let locale = await requestLocale;

  if (!locale || !locales.includes(locale as Locale)) {
    locale = 'en';
  }

  return {
    locale,
    messages: (await import(`../messages/${locale}.json`)).default,
  };
});
```

**Next.js Config** (`next.config.ts`):
```tsx
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./src/i18n.ts');

export default withNextIntl(nextConfig);
```

**Usage**:
```tsx
import { useTranslations, useLocale } from 'next-intl';

function Component() {
  const t = useTranslations('home.hero');
  const locale = useLocale();

  return <h1>{t('title')}</h1>;
}
```

**Message Files Structure**:
```
messages/
  ├── en.json
  └── ar.json
```

**RTL Support**:
```tsx
<html lang={locale} dir={locale === 'ar' ? 'rtl' : 'ltr'}>
```

---

### Theming

#### next-themes

**Version**: `^0.4.6`
**Why we chose this**: Perfect dark mode for Next.js with no flash, system preference detection, and localStorage persistence.

**Installation**:
```bash
npm install next-themes
```

**Setup** (Root Layout):
```tsx
import { ThemeProvider } from 'next-themes';

<ThemeProvider attribute="class" defaultTheme="system" enableSystem>
  {children}
</ThemeProvider>
```

**Usage**:
```tsx
import { useTheme } from 'next-themes';

function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <button onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}>
      Toggle Theme
    </button>
  );
}
```

**CSS Variables** (`globals.css`):
```css
:root {
  --background: oklch(1 0 0);
  --foreground: oklch(0.145 0 0);
}

.dark {
  --background: oklch(0.145 0 0);
  --foreground: oklch(0.985 0 0);
}
```

---

### Forms & Validation

#### React Hook Form

**Version**: `^7.66.0`
**Why we chose this**: Performant, flexible forms with minimal re-renders and excellent TypeScript support.

**Installation**:
```bash
npm install react-hook-form
```

**Usage**:
```tsx
import { useForm } from 'react-hook-form';

function ContactForm() {
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = (data) => console.log(data);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register('email', { required: true })} />
      {errors.email && <span>Email is required</span>}
    </form>
  );
}
```

#### Zod

**Version**: `^4.1.12`
**Purpose**: TypeScript-first schema validation

**Installation**:
```bash
npm install zod
```

**Usage with React Hook Form**:
```tsx
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

const schema = z.object({
  email: z.string().email(),
  name: z.string().min(2),
});

const { register, handleSubmit } = useForm({
  resolver: zodResolver(schema),
});
```

**Validation Schema Example** (`src/lib/validations/contact.ts`):
```tsx
import { z } from 'zod';

export const contactFormSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
});

export type ContactFormData = z.infer<typeof contactFormSchema>;
```

#### @hookform/resolvers

**Version**: `^5.2.2`
**Purpose**: Validation resolvers for React Hook Form (Zod, Yup, etc.)

**Installation**:
```bash
npm install @hookform/resolvers
```

---

### 3D Graphics

#### React Three Fiber

**Version**: `^9.4.0`
**Purpose**: React renderer for Three.js

**Installation**:
```bash
npm install three @react-three/fiber @react-three/drei
```

**Dependencies**:
- `three` `^0.181.1` - 3D graphics library
- `@react-three/drei` `^10.7.7` - Useful helpers for R3F

**Usage**:
```tsx
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';

<Canvas>
  <ambientLight />
  <mesh>
    <boxGeometry />
    <meshStandardMaterial color="hotpink" />
  </mesh>
  <OrbitControls />
</Canvas>
```

---

### State Management

#### Zustand

**Version**: `^5.0.8`
**Why we chose this**: Minimal, fast state management with no boilerplate. Perfect for small to medium apps.

**Installation**:
```bash
npm install zustand
```

**Usage** (`src/lib/store/navigation-store.ts`):
```tsx
import { create } from 'zustand';

interface NavigationState {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

export const useNavigationStore = create<NavigationState>((set) => ({
  isOpen: false,
  setIsOpen: (isOpen) => set({ isOpen }),
}));
```

**In Components**:
```tsx
import { useNavigationStore } from '@/lib/store/navigation-store';

function Component() {
  const { isOpen, setIsOpen } = useNavigationStore();

  return <button onClick={() => setIsOpen(!isOpen)}>Toggle</button>;
}
```

---

### Data Fetching

#### TanStack Query (React Query)

**Version**: `^5.90.8`
**Why we chose this**: Powerful data synchronization for server state with caching, background updates, and optimistic updates.

**Installation**:
```bash
npm install @tanstack/react-query
```

**Setup**:
```tsx
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

<QueryClientProvider client={queryClient}>
  {children}
</QueryClientProvider>
```

**Usage**:
```tsx
import { useQuery } from '@tanstack/react-query';

function Component() {
  const { data, isLoading, error } = useQuery({
    queryKey: ['todos'],
    queryFn: () => fetch('/api/todos').then(res => res.json()),
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return <div>{data.map(todo => <div key={todo.id}>{todo.title}</div>)}</div>;
}
```

---

### MDX Support

#### MDX

**Versions**:
- `@mdx-js/loader` `^3.1.1`
- `@mdx-js/react` `^3.1.1`
- `@next/mdx` `^16.0.3`
- `@types/mdx` `^2.0.13`

**Why we chose this**: Write JSX in Markdown for rich, interactive documentation and content.

**Installation**:
```bash
npm install @mdx-js/loader @mdx-js/react @next/mdx @types/mdx
```

**Next.js Config**:
```tsx
import createMDX from '@next/mdx';

const withMDX = createMDX({
  extension: /\.mdx?$/,
  options: {
    remarkPlugins: [],
    rehypePlugins: [],
  },
});

export default withMDX({
  pageExtensions: ['js', 'jsx', 'ts', 'tsx', 'md', 'mdx'],
});
```

**Usage**:
```mdx
# Hello World

<Button>Click me</Button>

import { CustomComponent } from './components';

<CustomComponent />
```

---

### Carousel

#### Embla Carousel

**Version**: `^8.6.0`
**Purpose**: Lightweight, extensible carousel library

**Installation**:
```bash
npm install embla-carousel-react
```

**Usage**:
```tsx
import useEmblaCarousel from 'embla-carousel-react';

function Carousel() {
  const [emblaRef] = useEmblaCarousel({ loop: true });

  return (
    <div ref={emblaRef} className="overflow-hidden">
      <div className="flex">
        <div className="flex-[0_0_100%]">Slide 1</div>
        <div className="flex-[0_0_100%]">Slide 2</div>
      </div>
    </div>
  );
}
```

---

### Image Optimization

#### Sharp

**Version**: `^0.34.5`
**Purpose**: High-performance image processing for Next.js Image Optimization

**Installation**:
```bash
npm install sharp
```

**Next.js Config**:
```tsx
export default {
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
};
```

**Usage**:
```tsx
import Image from 'next/image';

<Image
  src="/hero.jpg"
  alt="Hero"
  width={1200}
  height={600}
  priority
/>
```

---

## Development Dependencies

### TypeScript

**Version**: `^5`
**Configuration**: Strict mode enabled

**tsconfig.json**:
```json
{
  "compilerOptions": {
    "target": "ES2017",
    "lib": ["dom", "dom.iterable", "esnext"],
    "strict": true,
    "jsx": "react-jsx",
    "moduleResolution": "bundler",
    "paths": {
      "@/*": ["./src/*"]
    }
  }
}
```

### ESLint

**Version**: `^9`
**Config**: `eslint-config-next` `16.0.1`

**eslint.config.mjs**:
```js
import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  globalIgnores([".next/**", "out/**", "build/**"]),
]);

export default eslintConfig;
```

**Run Linting**:
```bash
npm run lint
```

### Prettier (Optional)

**Scripts**:
```bash
npm run format        # Format all files
npm run format:check  # Check formatting
```

---

## Custom Utilities & Patterns

### Animation Variants

**File**: `src/lib/animation-variants.ts`

**Available Variants**:

```tsx
import {
  fadeIn,
  fadeInUp,
  fadeInDown,
  scaleIn,
  scaleOnHover,
  slideInLeft,
  slideInRight,
  staggerContainer,
  staggerItem,
  textRevealContainer,
  textRevealChar,
  hoverTilt,
  pageTransition,
  accordionExpand,
  parallaxScroll,
} from '@/lib/animation-variants';
```

**Usage**:
```tsx
<motion.div variants={fadeInUp} initial="hidden" animate="visible">
  Content
</motion.div>
```

### Custom Hooks

**File**: `src/lib/hooks/use-scroll-animation.ts`

**Usage**:
```tsx
import { useScrollAnimation } from '@/lib/hooks/use-scroll-animation';

function Component() {
  const { ref, isInView } = useScrollAnimation();

  return <div ref={ref}>{isInView ? 'Visible' : 'Hidden'}</div>;
}
```

### Utility Functions

**File**: `src/lib/utils.ts`

```tsx
import { cn } from '@/lib/utils';

// Merge Tailwind classes intelligently
<div className={cn("base", condition && "conditional", "override")} />
```

### Canvas Animation Patterns

**Custom Animations**:
- **Gradient Shift**: 15-second smooth background gradient animation
- **Floating Orbs**: Independent float cycles (20s & 25s)
- **Network Visualization**: Canvas-based node/connection animations

**CSS Keyframes** (`globals.css`):
```css
@keyframes gradientShift {
  0%, 100% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
}

@keyframes floatSlow {
  0%, 100% { transform: translate(0, 0) scale(1); }
  33% { transform: translate(30px, -30px) scale(1.05); }
  66% { transform: translate(-20px, 20px) scale(0.95); }
}
```

**Usage**:
```tsx
<div className="animate-gradient-shift" style={{ backgroundSize: '200% 200%' }}>
  Content
</div>
```

---

## Configuration Files Reference

### 1. `next.config.ts`

**Purpose**: Next.js configuration with MDX and i18n support

```tsx
import type { NextConfig } from 'next';
import createNextIntlPlugin from 'next-intl/plugin';
import createMDX from '@next/mdx';

const withNextIntl = createNextIntlPlugin('./src/i18n.ts');

const withMDX = createMDX({
  extension: /\.mdx?$/,
  options: {
    remarkPlugins: [],
    rehypePlugins: [],
  },
});

const nextConfig: NextConfig = {
  pageExtensions: ['js', 'jsx', 'ts', 'tsx', 'md', 'mdx'],
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
};

export default withNextIntl(withMDX(nextConfig));
```

### 2. `tsconfig.json`

**Purpose**: TypeScript configuration with strict mode and path aliases

```json
{
  "compilerOptions": {
    "target": "ES2017",
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "react-jsx",
    "incremental": true,
    "plugins": [{ "name": "next" }],
    "paths": {
      "@/*": ["./src/*"]
    }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
  "exclude": ["node_modules"]
}
```

### 3. `src/app/globals.css`

**Purpose**: Global styles with Tailwind CSS v4, brand colors, and custom animations

**Key Sections**:

#### Imports
```css
@import "tailwindcss";
@import "tw-animate-css";

@custom-variant dark (&:is(.dark *));
```

#### Theme Configuration
```css
@theme inline {
  --color-background: var(--background);
  --color-foreground: var(--foreground);
  --color-brand-navy: var(--brand-navy);
  --color-brand-ocean: var(--brand-ocean);
  --color-brand-emerald: var(--brand-emerald);
  --color-brand-lime: var(--brand-lime);
  /* ... more theme tokens */
}
```

#### CSS Variables (Light Mode)
```css
:root {
  --radius: 0.625rem;
  --background: oklch(1 0 0);
  --foreground: oklch(0.145 0 0);

  /* Tranzkit Brand Colors - Light Mode */
  --brand-navy: oklch(0.28 0.08 250);        /* #0F2E63 - Deep Navy */
  --brand-ocean: oklch(0.52 0.12 240);       /* #1F6FB2 - Ocean Blue */
  --brand-emerald: oklch(0.65 0.12 165);     /* #27B889 - Emerald */
  --brand-lime: oklch(0.78 0.14 130);        /* #7ED977 - Lime Mint */

  /* Semantic Colors */
  --primary: oklch(0.52 0.12 240);           /* Ocean Blue */
  --secondary: oklch(0.28 0.08 250);         /* Deep Navy */
  --accent: oklch(0.65 0.12 165);            /* Emerald */
}
```

#### CSS Variables (Dark Mode)
```css
.dark {
  --background: oklch(0.145 0 0);
  --foreground: oklch(0.985 0 0);

  /* Tranzkit Brand Colors - Dark Mode (adjusted for contrast) */
  --brand-navy: oklch(0.35 0.10 250);
  --brand-ocean: oklch(0.60 0.14 240);
  --brand-emerald: oklch(0.70 0.14 165);
  --brand-lime: oklch(0.82 0.16 130);

  /* Semantic Colors */
  --primary: oklch(0.60 0.14 240);
  --secondary: oklch(0.35 0.10 250);
  --accent: oklch(0.70 0.14 165);
}
```

#### Custom Animations
```css
@keyframes gradientShift {
  0%, 100% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
}

@keyframes floatSlow {
  0%, 100% { transform: translate(0, 0) scale(1); }
  33% { transform: translate(30px, -30px) scale(1.05); }
  66% { transform: translate(-20px, 20px) scale(0.95); }
}

@keyframes floatSlower {
  0%, 100% { transform: translate(0, 0) scale(1); }
  33% { transform: translate(-25px, 25px) scale(1.03); }
  66% { transform: translate(20px, -15px) scale(0.97); }
}

.animate-gradient-shift {
  animation: gradientShift 15s ease infinite;
}

.animate-float-slow {
  animation: floatSlow 20s ease-in-out infinite;
}

.animate-float-slower {
  animation: floatSlower 25s ease-in-out infinite;
}
```

### 4. `eslint.config.mjs`

**Purpose**: ESLint configuration for Next.js with TypeScript

```js
import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  globalIgnores([
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
  ]),
]);

export default eslintConfig;
```

### 5. `src/i18n.ts`

**Purpose**: Internationalization configuration for next-intl

```tsx
import { getRequestConfig } from 'next-intl/server';
import { notFound } from 'next/navigation';

export const locales = ['en', 'ar'] as const;
export type Locale = (typeof locales)[number];

export default getRequestConfig(async ({ requestLocale }) => {
  let locale = await requestLocale;

  if (!locale || !locales.includes(locale as Locale)) {
    locale = 'en';
  }

  return {
    locale,
    messages: (await import(`../messages/${locale}.json`)).default,
  };
});
```

### 6. `package.json` Scripts

```json
{
  "scripts": {
    "dev": "next dev --turbopack",
    "build": "next build",
    "start": "next start",
    "lint": "eslint",
    "type-check": "tsc --noEmit",
    "format": "prettier --write \"src/**/*.{ts,tsx,js,jsx,json,css,md}\"",
    "format:check": "prettier --check \"src/**/*.{ts,tsx,js,jsx,json,css,md}\""
  }
}
```

---

## Quick Start Template

### Step-by-Step Guide to Start a New Project with This Stack

#### 1. Initialize Next.js Project

```bash
npx create-next-app@latest my-project --typescript --tailwind --app --turbopack
cd my-project
```

#### 2. Install All Dependencies

```bash
# Core UI & Styling
npm install @radix-ui/react-accordion @radix-ui/react-avatar @radix-ui/react-dialog @radix-ui/react-dropdown-menu @radix-ui/react-separator @radix-ui/react-slot @radix-ui/react-tabs
npm install clsx tailwind-merge class-variance-authority
npm install lucide-react

# Animation
npm install framer-motion gsap lenis
npm install tw-animate-css

# Internationalization & Theming
npm install next-intl next-themes

# Forms & Validation
npm install react-hook-form @hookform/resolvers zod

# State Management & Data Fetching
npm install zustand @tanstack/react-query

# 3D Graphics (Optional)
npm install three @react-three/fiber @react-three/drei

# MDX Support (Optional)
npm install @mdx-js/loader @mdx-js/react @next/mdx @types/mdx

# Carousel (Optional)
npm install embla-carousel-react

# Image Optimization
npm install sharp
```

#### 3. Copy Configuration Files

**Create `src/lib/utils.ts`**:
```tsx
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
```

**Create `src/i18n.ts`**:
```tsx
import { getRequestConfig } from 'next-intl/server';

export const locales = ['en', 'ar'] as const;
export type Locale = (typeof locales)[number];

export default getRequestConfig(async ({ requestLocale }) => {
  let locale = await requestLocale;

  if (!locale || !locales.includes(locale as Locale)) {
    locale = 'en';
  }

  return {
    locale,
    messages: (await import(`../messages/${locale}.json`)).default,
  };
});
```

**Update `next.config.ts`**:
```tsx
import type { NextConfig } from 'next';
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./src/i18n.ts');

const nextConfig: NextConfig = {
  images: {
    formats: ['image/avif', 'image/webp'],
  },
};

export default withNextIntl(nextConfig);
```

**Update `src/app/globals.css`**:
```css
@import "tailwindcss";
@import "tw-animate-css";

@custom-variant dark (&:is(.dark *));

/* Add CSS variables and custom animations here */
```

#### 4. Set Up Folder Structure

```
src/
├── app/
│   ├── [locale]/
│   │   ├── layout.tsx
│   │   └── page.tsx
│   └── globals.css
├── components/
│   ├── ui/
│   ├── animations/
│   └── layout/
├── lib/
│   ├── utils.ts
│   ├── animation-variants.ts
│   ├── hooks/
│   ├── store/
│   └── validations/
├── i18n.ts
└── messages/
    ├── en.json
    └── ar.json
```

#### 5. Configure Theming

**Root Layout** (`src/app/[locale]/layout.tsx`):
```tsx
import { ThemeProvider } from 'next-themes';

export default function RootLayout({ children, params: { locale } }) {
  return (
    <html lang={locale} dir={locale === 'ar' ? 'rtl' : 'ltr'}>
      <body>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
```

#### 6. Create Message Files

**`messages/en.json`**:
```json
{
  "home": {
    "hero": {
      "title": "Welcome",
      "subtitle": "Get started with our platform"
    }
  }
}
```

**`messages/ar.json`**:
```json
{
  "home": {
    "hero": {
      "title": "مرحبا",
      "subtitle": "ابدأ مع منصتنا"
    }
  }
}
```

#### 7. Run Development Server

```bash
npm run dev
```

Visit `http://localhost:3000/en` or `http://localhost:3000/ar`

---

## Brand-Specific Configurations

### Tranzkit Brand Colors (OKLCH)

**⚠️ Replace these with your own brand colors in `globals.css`**

#### Light Mode
```css
:root {
  --brand-navy: oklch(0.28 0.08 250);        /* #0F2E63 - Deep Navy */
  --brand-ocean: oklch(0.52 0.12 240);       /* #1F6FB2 - Ocean Blue */
  --brand-emerald: oklch(0.65 0.12 165);     /* #27B889 - Emerald */
  --brand-lime: oklch(0.78 0.14 130);        /* #7ED977 - Lime Mint */
}
```

#### Dark Mode
```css
.dark {
  --brand-navy: oklch(0.35 0.10 250);
  --brand-ocean: oklch(0.60 0.14 240);
  --brand-emerald: oklch(0.70 0.14 165);
  --brand-lime: oklch(0.82 0.16 130);
}
```

### Font Configuration

**Tranzkit uses Geist Sans & Geist Mono** (Next.js default fonts)

**To change fonts**, update `src/app/[locale]/layout.tsx`:
```tsx
import { Inter, Roboto_Mono } from 'next/font/google';

const inter = Inter({ subsets: ['latin'], variable: '--font-sans' });
const robotoMono = Roboto_Mono({ subsets: ['latin'], variable: '--font-mono' });

<body className={`${inter.variable} ${robotoMono.variable}`}>
```

### Custom CSS Variables to Replace

**In `globals.css`**, search and replace:
- `--brand-navy` → Your primary brand color
- `--brand-ocean` → Your secondary brand color
- `--brand-emerald` → Your accent color
- `--brand-lime` → Your highlight color

### Message Files

**Replace content in `messages/en.json` and `messages/ar.json`** with your own translations.

---

## Performance Considerations

### Best Practices We Discovered

#### 1. **Framer Motion Performance**

✅ **Use `whileInView` instead of `useInView` hook** for scroll animations:
```tsx
// Good - Declarative, better performance
<motion.div whileInView={{ opacity: 1 }} viewport={{ once: true }}>

// Avoid - Imperative, more re-renders
const { ref, inView } = useInView();
<div ref={ref}>{inView && <motion.div />}</div>
```

✅ **Use `viewport={{ once: true }}`** to prevent re-triggering animations:
```tsx
<motion.div whileInView="visible" viewport={{ once: true }} />
```

✅ **Avoid animating `width` and `height`** - use `scale` instead:
```tsx
// Good
<motion.div animate={{ scale: 1.2 }} />

// Avoid
<motion.div animate={{ width: 200 }} />
```

#### 2. **Canvas Animations**

✅ **Use `requestAnimationFrame`** for smooth 60fps animations
✅ **Set proper DPR** for high-resolution displays:
```tsx
const dpr = window.devicePixelRatio || 1;
canvas.width = width * dpr;
canvas.height = height * dpr;
ctx.scale(dpr, dpr);
```

✅ **Clean up animations** on unmount:
```tsx
useEffect(() => {
  const animate = () => {
    // animation code
    animationRef.current = requestAnimationFrame(animate);
  };
  animate();

  return () => {
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
    }
  };
}, []);
```

#### 3. **Theme Detection**

✅ **Use mounted state** to avoid hydration mismatch:
```tsx
const { theme } = useTheme();
const [mounted, setMounted] = useState(false);

useEffect(() => {
  setMounted(true);
}, []);

const isDark = mounted && theme === 'dark';
```

#### 4. **Image Optimization**

✅ **Use Next.js Image component** with `priority` for above-the-fold images:
```tsx
<Image src="/hero.jpg" alt="Hero" width={1200} height={600} priority />
```

✅ **Use AVIF/WebP formats** (configured in `next.config.ts`)

#### 5. **CSS Animations vs JavaScript**

✅ **Prefer CSS animations** for simple effects (better performance):
```css
.animate-gradient-shift {
  animation: gradientShift 15s ease infinite;
}
```

✅ **Use Framer Motion** for complex, interactive animations

#### 6. **Bundle Size**

✅ **Tree-shaking**: Import only what you need:
```tsx
// Good
import { Button } from '@/components/ui/button';

// Avoid
import * as UI from '@/components/ui';
```

✅ **Dynamic imports** for heavy components:
```tsx
const HeavyComponent = dynamic(() => import('./HeavyComponent'), {
  loading: () => <Skeleton />,
});
```

#### 7. **Internationalization**

✅ **Use Server Components** for translations when possible (better performance)
✅ **Keep message files small** - split by page/section if needed

---

## Additional Resources

### Official Documentation

- **Next.js**: https://nextjs.org/docs
- **React**: https://react.dev
- **TypeScript**: https://www.typescriptlang.org/docs
- **Tailwind CSS**: https://tailwindcss.com/docs
- **Framer Motion**: https://www.framer.com/motion
- **Radix UI**: https://www.radix-ui.com
- **next-intl**: https://next-intl-docs.vercel.app
- **next-themes**: https://github.com/pacocoursey/next-themes
- **React Hook Form**: https://react-hook-form.com
- **Zod**: https://zod.dev
- **TanStack Query**: https://tanstack.com/query
- **Zustand**: https://zustand-demo.pmnd.rs
- **Lucide Icons**: https://lucide.dev

### Community Resources

- **shadcn/ui**: https://ui.shadcn.com
- **Tailwind CSS Components**: https://tailwindui.com
- **Framer Motion Examples**: https://www.framer.com/motion/examples

---

## Version Compatibility

### Peer Dependencies

| Package | Requires |
|---------|----------|
| `@radix-ui/*` | React 18+ |
| `framer-motion` | React 18+ |
| `next-intl` | Next.js 13+ (App Router) |
| `next-themes` | Next.js 13+ |
| `@tanstack/react-query` | React 18+ |

### Known Issues & Workarounds

#### 1. **Framer Motion + React 19**

✅ **Works perfectly** - Framer Motion `^12.23.24` is compatible with React 19

#### 2. **Tailwind CSS v4 + PostCSS**

✅ **Use `@tailwindcss/postcss`** instead of standalone PostCSS config

#### 3. **next-themes Hydration**

✅ **Use mounted state** to avoid flash of unstyled content (see Performance section)

---

## Summary

This project uses a modern, performance-optimized stack:

- ⚡ **Next.js 16** with Turbopack for blazing-fast development
- 🎨 **Tailwind CSS v4** with OKLCH color space for beautiful, accessible colors
- 🎭 **Framer Motion** for smooth, professional animations
- 🌍 **next-intl** for type-safe internationalization (English/Arabic)
- 🌓 **next-themes** for seamless dark mode
- 📝 **React Hook Form + Zod** for performant, type-safe forms
- 🎯 **TypeScript Strict Mode** for maximum type safety
- 🚀 **Optimized for Performance** with best practices throughout

**Total Dependencies**: 28 production + 6 development
**Bundle Size**: Optimized with tree-shaking and code splitting
**Browser Support**: Modern browsers (ES2017+)

---

**Last Updated**: 2025-01-17
**Project**: Tranzkit Website
**Version**: 0.1.0

