# Content Inventory for Sanity CMS Migration

## Overview
This document maps all existing content in the Tranzkit website to their target Sanity schema types.

## Content Status Legend
- ✅ Identified
- 🔄 Needs extraction
- 📝 Needs creation in Sanity

---

## 1. GLOBAL CONTENT

### 1.1 Site Settings (Singleton)
**Target Schema:** `siteSettings`
**Status:** 🔄

| Field | Current Location | EN Value | AR Value | Notes |
|-------|-----------------|----------|----------|-------|
| Site Title | messages/en.json, messages/ar.json | "Tranzkit" | "ترانزكِت" | Brand name |
| Site Description | TBD | TBD | TBD | Meta description |
| Logo | public/assets | Logo files | Logo files | SVG/PNG |
| Favicon | src/app/favicon.ico | favicon.ico | favicon.ico | |
| Contact Email | TBD | TBD | TBD | |
| Contact Phone | TBD | TBD | TBD | |
| Social Links | Footer component | TBD | TBD | LinkedIn, Twitter, etc. |

### 1.2 Navigation (Singleton)
**Target Schema:** `navigation`
**Status:** ✅ **Source:** `src/components/layout/header.tsx`, `messages/en.json`, `messages/ar.json`

| Item | EN Label | AR Label | Href | Has Submenu |
|------|----------|----------|------|-------------|
| Home | "Home" | "الرئيسية" | /{locale} | No |
| Solutions | "Solutions" | "الحلول" | /{locale}/solutions | Yes |
| Resources | "Resources" | "الموارد" | /{locale}/resources | Yes |
| Apps | "Apps" | "التطبيقات" | /{locale}/apps | Yes |
| Pricing | "Pricing" | "الأسعار" | /{locale}/pricing | No |
| About | "About Us" | "من نحن" | /{locale}/about | No |
| Contact | "Contact" | "اتصل بنا" | /{locale}/contact | No |

**Solutions Submenu:**
- Enterprises & Passengers
- Operators & Drivers

**Resources Submenu:**
- Help Center
- Blog
- Case Studies
- FAQ
- Webinars
- Whitepapers

**Apps Submenu:**
- Supervisor App
- Driver App
- Rider App
- Operator Dashboard
- Enterprise Dashboard

### 1.3 Footer (Part of Navigation)
**Target Schema:** `navigation.footerNavColumns`
**Status:** ✅ **Source:** `src/components/layout/footer.tsx`

**Footer Columns:**
1. Solutions
2. Resources
3. Company (Apps, About, Careers, Contact)

**Footer Text:**
- Copyright text: "© {year} Tranzkit. All rights reserved."

---

## 2. PAGE CONTENT

### 2.1 Home Page
**Target Schema:** `homePage` (Singleton)
**Status:** ✅ **Source:** `src/app/[locale]/(main)/page.tsx`

**Sections:**
1. **Hero Section** (`HeroSection`)
   - Title: "The Enterprise OS For Workforce Mobility"
   - Subtitle: "The all-in-one platform for operators, enterprises, supervisors, drivers, and passengers"
   - CTA: "Start Your Free Trial"
   - Background: Animated canvas

2. **Overview Section** (`OverviewSection`)
   - Content from `messages/en.json` → `homepage.overview`

3. **Features Section** (`FeaturesSection`)
   - Content from `messages/en.json` → `homepage.featuresSimple.items`
   - Icons: Zap, Shield, Users, BarChart

4. **Feature Tabs** (`FeatureTabs`)
   - Content from `messages/en.json` → `homepage.featureTabs`

5. **Screenshot Carousel** (`ScreenshotCarousel`)
   - Images from `/public/assets/apps_screenshots/`

6. **Logo Bar** (`LogoBarSection`)
   - Partner/client logos

7. **Testimonials** (`TestimonialsSection`)
   - Content from `messages/en.json` → `homepage.testimonials.items`
   - 3 testimonials with quote, author, role

8. **CTA Section** (`CTASection`)
   - Heading: "Ready to Transform Your Business?"
   - Subtitle: "Join thousands of businesses already using Tranzkit..."
   - Buttons: "Start Free Trial", "Book a Demo"

### 2.2 Solutions Page
**Target Schema:** `solutionsPage` (Singleton)
**Status:** ✅ **Source:** `src/app/[locale]/(main)/solutions/page.tsx`

**Sections:**
1. **Hero** (`HeroSectionSolutions`)
   - Title: "Smart Mobility, Practical Results"
   - Subtitle
   - CTA: "Explore Solutions"

2. **Intro Section** (`IntroSection`)
3. **Audience Cards** (`AudienceCardsSection`)
4. **Technology Section** (`TechnologySection`)
5. **Why Tranzkit** (`WhyTranzkitSection`)
6. **CTA Section** (`CtaSection`)

### 2.3 Solutions Detail Pages
**Target Schema:** `solution` (Collection)
**Status:** ✅

**Pages:**
1. **Enterprises & Passengers** (`/solutions/enterprises-passengers`)
   - Source: `src/app/[locale]/(main)/solutions/enterprises-passengers/page.tsx`
   - Sections: Hero, Audience Switcher, Feature Showcase, Workflow, App Screens, Features, Testimonial, AI Impact, CTA

2. **Operators & Drivers** (`/solutions/operators-drivers`)
   - Source: `src/app/[locale]/(main)/solutions/operators-drivers/page.tsx`
   - Similar structure

### 2.4 Apps Page
**Target Schema:** `appsPage` (Singleton) + `app` (Collection)
**Status:** ✅ **Source:** `src/app/[locale]/(main)/apps/page.tsx`

**Sections:**
1. **Apps Hero** (`AppsHeroSection`) - Parallax hero with app screenshots
2. **Apps Showcase** (`AppsShowcase`) - Grid of app cards
3. **CTA Section**

**App Detail Pages (Collection):**
- Rider App (`/apps/rider`)
- Driver App (`/apps/driver`)
- Supervisor App (`/apps/supervisor`)
- Operator Dashboard (`/apps/operator-dashboard`)
- Enterprise Dashboard (`/apps/enterprise-dashboard`)

**Data Source:** `src/config/apps-data.ts`

### 2.5 About Page
**Target Schema:** `aboutPage` (Singleton)
**Status:** ✅ **Source:** `src/app/[locale]/(main)/about/page.tsx`

**Sections:**
1. **About Hero** (`AboutHero`)
2. **Story Section** (`StorySection`) - Company story/mission
3. **Timeline** (`Timeline`) - Company milestones
4. **Team Grid** (`TeamGrid`) - Team members
5. **Careers List** (`CareersList`) - Open positions
6. **CTA Section**

**Related Schema:** `teamMember` (Collection)

### 2.6 Contact Page
**Target Schema:** `contactPage` (Singleton)
**Status:** ✅ **Source:** `src/app/[locale]/(main)/contact/page.tsx`

**Sections:**
1. **Contact Hero** (`ContactHero`)
   - Heading, description
   - Contact info icons (Mail, Phone, MapPin)
2. **Contact Form** (`ContactForm`)
   - Form labels/placeholders from translations
   - Validation messages (keep in code)
3. **Social Links** (`SocialLinks`)

**Translation Keys:** `contact.hero.*`, `contact.form.*`

### 2.7 Pricing Page
**Target Schema:** `pricingPage` (Singleton)
**Status:** ✅ **Source:** `src/app/[locale]/(main)/pricing/page.tsx`

**Sections:**
1. **Pricing Hero** (`PricingHero`)
   - Highlights: No Setup Fees, Cancel Anytime, Free Trial
2. **Pricing Cards** (`PricingCards`)
   - Plans: Starter, Professional, Enterprise
   - Features lists, prices, badges
3. **Comparison Table** (`ComparisonTable`)
4. **CTA Section**

**Translation Keys:** `pricing.hero.*`, `pricing.cards.*`

### 2.8 Resources Hub
**Target Schema:** `resourcesPage` (Singleton)
**Status:** ✅ **Source:** `src/app/[locale]/(main)/resources/page.tsx`

**Sections:**
1. **Animated Header** (`AnimatedHeader`)
2. **Filter Tabs** (`FilterTabs`) - Blog, Case Studies, FAQ, etc.
3. **Card List** (`CardList`) - Resource cards
4. **CTA Section**

**Sub-pages (Collections):**
- Blog (`blogPost`)
- Case Studies (`caseStudy`)
- FAQ (`faqItem`)
- Webinars (`webinar`)
- Whitepapers (`whitepaper`)
- Help Center (`helpArticle`)

### 2.9 Trial Page
**Target Schema:** `trialPage` (Singleton)
**Status:** ✅ **Source:** `src/app/[locale]/(main)/trial/page.tsx`

**Content:**
- Heading: "Redirecting to Application..."
- Subtitle: "Please wait while we prepare your trial experience"
- Loading spinner

---

## 3. TRANSLATION FILES ANALYSIS

### 3.1 messages/en.json Structure
**Status:** ✅ **Total Keys:** ~1500+ lines

**Major Sections:**
- `nav` - Navigation labels
- `common` - Common UI strings (Learn More, Get Started, etc.)
- `homepage` - All homepage sections
- `solutions` - Solutions page content
- `apps` - Apps page content
- `about` - About page content
- `contact` - Contact page content
- `pricing` - Pricing page content
- `resources` - Resources hub content
- `footer` - Footer content

**Decision:**
- ✅ **Move to Sanity:** All page-specific content (hero titles, descriptions, feature lists, etc.)
- ❌ **Keep in code:** System UI strings (buttons like "Learn More", form validation messages)

### 3.2 messages/ar.json Structure
**Status:** ✅ **Mirror of en.json**

All content has Arabic translations ready for migration.

---

## 4. STATIC DATA FILES

### 4.1 Apps Data
**Source:** `src/config/apps-data.ts`
**Target Schema:** `app` (Collection)
**Status:** 🔄

**Apps to migrate:**
1. Rider App
2. Driver App
3. Supervisor App
4. Operator Dashboard
5. Enterprise Dashboard

**Fields per app:**
- Name, tagline, description
- Features list
- Screenshots
- Platform info (iOS/Android/Web)
- Store URLs

### 4.2 Images & Assets
**Source:** `/public/assets/`
**Status:** 🔄

**Categories:**
- App screenshots (`/public/assets/apps_screenshots/`)
- Hero images
- Feature icons
- Partner logos
- Team photos (if any)

**Action:** Upload to Sanity assets, reference in documents

---

## 5. COMPONENTS WITH HARDCODED CONTENT

### 5.1 Hero Sections
**Files:**
- `src/components/sections/homepage/hero-section.tsx`
- `src/components/sections/solutions/hero-section-solutions.tsx`
- `src/components/sections/apps/apps-hero-section.tsx`
- `src/components/sections/about/about-hero.tsx`
- `src/components/sections/contact/contact-hero.tsx`
- `src/components/sections/pricing/pricing-hero.tsx`

**Content:** Titles, subtitles, CTAs - all from translations

### 5.2 Feature Sections
**Files:**
- `src/components/sections/homepage/features-section.tsx`
- `src/components/sections/solutions/enterprises/features-section.tsx`
- `src/components/sections/solutions/operators/features-section.tsx`

**Content:** Feature titles, descriptions, icons - from translations

### 5.3 CTA Sections
**Files:**
- `src/components/sections/homepage/cta-section.tsx`
- `src/components/sections/solutions/cta-section.tsx`
- `src/components/sections/solutions/enterprises/cta-section.tsx`

**Content:** Headings, subtitles, button labels - from translations

### 5.4 Testimonials
**File:** `src/components/sections/homepage/testimonials-section.tsx`
**Content:** From `messages/en.json` → `homepage.testimonials.items`

---

## 6. SCHEMA MAPPING SUMMARY

| Content Type | Current Source | Target Sanity Schema | Priority |
|--------------|----------------|---------------------|----------|
| Site Settings | Various | `siteSettings` | High |
| Navigation | header.tsx, footer.tsx | `navigation` | High |
| Home Page | page.tsx + translations | `homePage` | High |
| Solutions Page | page.tsx + translations | `solutionsPage` | High |
| Solution Details | page.tsx + translations | `solution` | High |
| Apps Page | page.tsx + translations | `appsPage` | High |
| App Details | apps-data.ts | `app` | High |
| About Page | page.tsx + translations | `aboutPage` | Medium |
| Contact Page | page.tsx + translations | `contactPage` | Medium |
| Pricing Page | page.tsx + translations | `pricingPage` | Medium |
| Resources Hub | page.tsx + translations | `resourcesPage` | Medium |
| Blog Posts | TBD | `blogPost` | Low |
| Case Studies | TBD | `caseStudy` | Low |
| FAQ Items | TBD | `faqItem` | Low |
| Team Members | TBD | `teamMember` | Low |
| Testimonials | translations | `testimonial` | Medium |

---

## 7. NEXT STEPS

1. ✅ Complete content inventory
2. 🔄 Create Sanity schemas (Phase 2)
3. 🔄 Extract content from translations and components
4. 🔄 Populate Sanity Studio with default content
5. 🔄 Wire up pages to fetch from Sanity
6. 🔄 Test and validate


