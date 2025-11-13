# 🛠️ Development Guide

## Getting Started

### Prerequisites
- Node.js 18.17 or later
- npm, yarn, or pnpm
- Git
- VS Code (recommended)

### Recommended VS Code Extensions
- ESLint
- Prettier
- Tailwind CSS IntelliSense
- TypeScript and JavaScript Language Features
- Auto Rename Tag
- Path Intellisense

## Development Workflow

### 1. Starting Development

```bash
# Install dependencies
npm install

# Start dev server with Turbopack
npm run dev
```

The site will be available at:
- English: http://localhost:3000/en
- Arabic: http://localhost:3000/ar

### 2. Creating New Pages

#### Step 1: Create the page file
```bash
# Example: Creating a new "Services" page
src/app/[locale]/(main)/services/page.tsx
```

#### Step 2: Implement the page
```tsx
import { HeroSection } from '@/components/sections/hero-section';
import { CTASection } from '@/components/sections/cta-section';

export default function ServicesPage() {
  return (
    <>
      <HeroSection 
        title="Our Services"
        subtitle="Comprehensive solutions for your needs"
      />
      {/* Add your content here */}
      <CTASection />
    </>
  );
}
```

#### Step 3: Add translations
Update `messages/en.json` and `messages/ar.json`:
```json
{
  "services": {
    "title": "Our Services",
    "subtitle": "Comprehensive solutions"
  }
}
```

#### Step 4: Add navigation link
Update `src/components/layout/header.tsx` to include the new page in navigation.

### 3. Creating New Components

#### Reusable Section Component
```tsx
// src/components/sections/my-section.tsx
'use client';

import { FadeIn } from '@/components/animations/fade-in';

export function MySection() {
  return (
    <section className="py-16 md:py-24">
      <div className="container">
        <FadeIn>
          <h2 className="text-3xl font-bold">Section Title</h2>
          {/* Content */}
        </FadeIn>
      </div>
    </section>
  );
}
```

#### Form Component
```tsx
// src/components/forms/my-form.tsx
'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const schema = z.object({
  email: z.string().email(),
});

type FormData = z.infer<typeof schema>;

export function MyForm() {
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: FormData) => {
    // Handle submission
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Input {...register('email')} />
      {errors.email && <p>{errors.email.message}</p>}
      <Button type="submit">Submit</Button>
    </form>
  );
}
```

### 4. Adding Animations

```tsx
import { FadeIn } from '@/components/animations/fade-in';
import { SlideIn } from '@/components/animations/slide-in';

// Fade in with delay
<FadeIn delay={0.2}>
  <div>Content</div>
</FadeIn>

// Slide in from direction
<SlideIn direction="left" delay={0.3}>
  <div>Content</div>
</SlideIn>

// Staggered animations for lists
{items.map((item, index) => (
  <FadeIn key={item.id} delay={0.1 * index}>
    <Card>{item.content}</Card>
  </FadeIn>
))}
```

### 5. Working with Translations

```tsx
'use client';

import { useTranslations } from 'next-intl';

export function MyComponent() {
  const t = useTranslations('mySection');
  
  return (
    <div>
      <h1>{t('title')}</h1>
      <p>{t('description')}</p>
    </div>
  );
}
```

### 6. State Management

#### Global UI State (Zustand)
```tsx
// src/lib/store/my-store.ts
import { create } from 'zustand';

interface MyState {
  count: number;
  increment: () => void;
}

export const useMyStore = create<MyState>((set) => ({
  count: 0,
  increment: () => set((state) => ({ count: state.count + 1 })),
}));

// Usage in component
import { useMyStore } from '@/lib/store/my-store';

export function MyComponent() {
  const { count, increment } = useMyStore();
  return <button onClick={increment}>{count}</button>;
}
```

#### Server Data (React Query)
```tsx
'use client';

import { useQuery } from '@tanstack/react-query';
import { apiFetch } from '@/lib/api/client';

export function MyComponent() {
  const { data, isLoading, error } = useQuery({
    queryKey: ['myData'],
    queryFn: () => apiFetch<MyData>('/api/my-endpoint'),
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  
  return <div>{data.title}</div>;
}
```

## Best Practices

### 1. Component Organization
- **Server Components**: Default for all components
- **Client Components**: Only when using hooks, browser APIs, or interactivity
- Mark client components with `'use client'` directive

### 2. Styling Guidelines
- Use Tailwind utility classes
- Follow mobile-first approach
- Use semantic color tokens (e.g., `bg-primary`, `text-muted-foreground`)
- Avoid arbitrary values unless necessary

### 3. Performance
- Use `next/image` for all images
- Implement lazy loading for heavy components
- Minimize client-side JavaScript
- Use Server Components when possible

### 4. Accessibility
- Use semantic HTML
- Include ARIA labels where needed
- Ensure keyboard navigation works
- Test with screen readers
- Maintain color contrast ratios

### 5. TypeScript
- Always define types for props
- Use type inference where possible
- Avoid `any` type
- Create reusable types in `src/types/`

### 6. Git Workflow
```bash
# Create feature branch
git checkout -b feature/my-feature

# Make changes and commit
git add .
git commit -m "feat: add new feature"

# Push and create PR
git push origin feature/my-feature
```

## Common Tasks

### Adding a New shadcn/ui Component
```bash
npx shadcn@latest add [component-name]
```

### Adding a New Page
1. Create page file in `src/app/[locale]/(main)/[page-name]/page.tsx`
2. Add translations to `messages/en.json` and `messages/ar.json`
3. Update navigation in `src/components/layout/header.tsx`
4. Add metadata for SEO

### Creating Dynamic Routes
```tsx
// src/app/[locale]/(main)/blog/[slug]/page.tsx
export default async function BlogPost({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  // Fetch and render blog post
}
```

### Adding API Routes
```tsx
// src/app/api/contact/route.ts
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const data = await request.json();
  // Process data
  return NextResponse.json({ success: true });
}
```

## Troubleshooting

### Issue: Translations not working
**Solution**:
1. Check that locale is in the URL (`/en/` or `/ar/`)
2. Verify translation keys exist in JSON files
3. Ensure `useTranslations` is used in client components

### Issue: Styles not applying
**Solution**:
1. Check Tailwind class names are correct
2. Verify `globals.css` is imported
3. Clear `.next` cache: `rm -rf .next`

### Issue: Build errors
**Solution**:
1. Run `npm run type-check` to find TypeScript errors
2. Run `npm run lint` to find linting issues
3. Clear cache and reinstall: `rm -rf .next node_modules && npm install`

### Issue: Slow development server
**Solution**:
1. Ensure Turbopack is enabled (default with `npm run dev`)
2. Close unnecessary applications
3. Increase Node.js memory: `NODE_OPTIONS='--max-old-space-size=4096' npm run dev`

## Testing

### Manual Testing Checklist
- [ ] Test on mobile, tablet, and desktop
- [ ] Test in Chrome, Firefox, Safari
- [ ] Test both English and Arabic versions
- [ ] Test RTL layout in Arabic
- [ ] Test all forms and validation
- [ ] Test navigation and links
- [ ] Check console for errors
- [ ] Verify images load correctly
- [ ] Test animations and interactions

### Performance Testing
```bash
# Run Lighthouse audit
npm run build
npm start
# Open Chrome DevTools > Lighthouse > Run audit
```

## Deployment Checklist

- [ ] All tests passing
- [ ] No console errors
- [ ] Environment variables configured
- [ ] Build succeeds: `npm run build`
- [ ] Images optimized
- [ ] Meta tags and SEO configured
- [ ] Analytics integrated (if applicable)
- [ ] Error tracking configured (if applicable)

## Resources

### Documentation
- [Next.js Docs](https://nextjs.org/docs)
- [React Docs](https://react.dev)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [shadcn/ui Docs](https://ui.shadcn.com)
- [Framer Motion Docs](https://www.framer.com/motion)
- [next-intl Docs](https://next-intl-docs.vercel.app)

### Tools
- [Tailwind CSS IntelliSense](https://marketplace.visualstudio.com/items?itemName=bradlc.vscode-tailwindcss)
- [React Developer Tools](https://react.dev/learn/react-developer-tools)
- [Lighthouse](https://developers.google.com/web/tools/lighthouse)

## Getting Help

- Check [ARCHITECTURE.md](./ARCHITECTURE.md) for system design
- Review existing components for examples
- Search [Next.js discussions](https://github.com/vercel/next.js/discussions)
- Contact the development team

