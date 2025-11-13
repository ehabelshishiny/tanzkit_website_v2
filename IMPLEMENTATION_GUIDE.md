# 📋 Implementation Guide

This guide provides step-by-step instructions for implementing the content from `tranzkit_website_structure.md` into the website.

## Overview

The website structure has been set up with:
- ✅ Next.js 16 with App Router
- ✅ TypeScript for type safety
- ✅ Bilingual support (English/Arabic) with RTL
- ✅ shadcn/ui components
- ✅ Framer Motion animations
- ✅ Performance optimizations
- ✅ Responsive layouts

## 📄 Pages Implementation Status

### ✅ Completed Structure
- [x] Home page route (`/[locale]/page.tsx`)
- [x] Solutions page route
- [x] Resources page route (with subpages)
- [x] Apps page route
- [x] Contact page route
- [x] Pricing page route
- [x] About page route (with careers)

### 🔄 Next Steps: Content Population

## 1. Home Page Implementation

### File: `src/app/[locale]/(main)/page.tsx`

#### Sections to Populate:

**1.1 Hero Section**
- Update `messages/en.json` and `messages/ar.json` with:
  - Headline (1-2 lines)
  - Sub-headline
  - CTA button text

**1.2 Overview Section**
- Add 3 key features/values
- Short introductory paragraph

**1.3 Features Section**
- Add feature titles and descriptions
- Consider adding icons from `lucide-react`

**1.4 Logo Bar Section**
- Replace placeholder partner names with actual logos
- Add partner/client information

**1.5 Testimonials Section**
- Add real client testimonials
- Include author names, roles, and companies

**1.6 CTA Section**
- Customize final call-to-action message

## 2. Solutions Page Implementation

### File: `src/app/[locale]/(main)/solutions/page.tsx`

#### Content Needed:

**2.1 Hero Section**
- Headline and subheadline
- CTA text

**2.2 Solution Cards**
Create three clickable cards for:
1. **For Drivers & Passengers**
   - Title + 1-2 lines description
   - 3-5 feature bullets
   - CTA button

2. **For Enterprises**
   - Title + 1-2 lines description
   - 3-5 feature bullets
   - CTA button

3. **For Transport Operators**
   - Title + 1-2 lines description
   - 3-5 feature bullets
   - CTA button

**Implementation Example:**
```tsx
// Create a new component: src/components/sections/solution-cards.tsx
export function SolutionCards() {
  const solutions = [
    {
      title: "For Drivers & Passengers",
      description: "...",
      features: ["Feature 1", "Feature 2", "Feature 3"],
      href: "#drivers"
    },
    // ... more solutions
  ];
  
  return (
    <div className="grid gap-6 md:grid-cols-3">
      {solutions.map((solution) => (
        <Card key={solution.title}>
          {/* Card content */}
        </Card>
      ))}
    </div>
  );
}
```

## 3. Resources Page Implementation

### File: `src/app/[locale]/(main)/resources/page.tsx`

#### Subpages to Implement:

**3.1 Help Center** (`/resources/help-center`)
- Create page with documentation structure
- Add search functionality (optional)

**3.2 Webinars/Videos** (`/resources/webinars`)
- Create video grid layout
- Add video player integration

**3.3 Blog** (`/resources/blog`)
- Create blog listing page
- Create dynamic blog post page: `blog/[slug]/page.tsx`

**3.4 Whitepapers/eBooks** (`/resources/whitepapers`)
- Create downloadable resources grid
- Add download forms

**3.5 Case Studies** (`/resources/case-studies`)
- Create case study listing
- Create dynamic case study page: `case-studies/[slug]/page.tsx`

**3.6 FAQ** (`/resources/faq`)
- Create accordion-style FAQ
- Group by categories

**Dynamic Content Template Example:**
```tsx
// src/app/[locale]/(main)/resources/blog/[slug]/page.tsx
export default async function BlogPost({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  // Fetch blog post data
  return (
    <article>
      {/* Blog post content */}
    </article>
  );
}
```

## 4. Apps Page Implementation

### File: `src/app/[locale]/(main)/apps/page.tsx`

#### App Sections:
1. Passenger App
2. Driver App
3. Supervisor/Operations App
4. Transport Operator App
5. Enterprise/Client App

Each section needs:
- Subheader
- 2-3 paragraphs description
- 3-5 feature bullets
- CTA (Download/Learn More)
- App screenshots (optional)

## 5. Contact Page Implementation

### File: `src/app/[locale]/(main)/contact/page.tsx`

#### Sections:

**5.1 Contact Information**
- Address with map integration (Google Maps)
- Phone number
- Email
- Business hours

**5.2 Contact Form**
- Already implemented in `src/components/forms/contact-form.tsx`
- Connect to backend API

**5.3 Additional Forms**
Create separate form components:
- Free Trial Form
- Book a Demo Form

## 6. Pricing Page Implementation

### File: `src/app/[locale]/(main)/pricing/page.tsx`

#### Content Needed:

**6.1 Pricing Cards**
Create pricing tiers with:
- Plan name
- Price
- Features list
- CTA button

**6.2 Forms**
- Start Free Trial Form
- Request Custom Quote Form

**Implementation Example:**
```tsx
// src/components/sections/pricing-cards.tsx
export function PricingCards() {
  const plans = [
    {
      name: "Starter",
      price: "$99/mo",
      features: ["Feature 1", "Feature 2"],
    },
    // ... more plans
  ];
  
  return (
    <div className="grid gap-6 md:grid-cols-3">
      {plans.map((plan) => (
        <Card key={plan.name}>
          {/* Pricing card content */}
        </Card>
      ))}
    </div>
  );
}
```

