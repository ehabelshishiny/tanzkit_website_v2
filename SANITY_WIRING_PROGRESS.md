# Sanity CMS Wiring Progress

## Overview
This document tracks the progress of wiring all pages to Sanity CMS, removing hardcoded content and translation key dependencies.

---

## ✅ Completed Pages

### 1. Home Page (`/`)
- **Status:** ✅ Fully wired
- **File:** `src/app/[locale]/(main)/page.tsx`
- **Sections:** All sections fetch from Sanity
- **Components Updated:**
  - HeroSection
  - OverviewSection
  - FeaturesSection
  - FeatureTabs
  - ScreenshotCarousel
  - LogoBarSection
  - TestimonialsSection
  - CTASection

### 2. Careers Detail Page (`/careers/[slug]`)
- **Status:** ✅ Fully wired
- **File:** `src/app/[locale]/(main)/careers/[slug]/page.tsx`
- **Data Source:** Sanity (job by slug)
- **Note:** Some hardcoded labels for breadcrumbs (minimal)

---

## 🔄 In Progress

### 3. Apps Page (`/apps`)
- **Status:** 🔄 Partially wired
- **File:** `src/app/[locale]/(main)/apps/page.tsx`
- **Progress:**
  - ✅ Page updated to fetch from Sanity
  - ✅ AppsHeroSection updated to accept props
  - ❌ AppsShowcase needs major refactoring (532 lines, complex)
  - ❌ CTASection needs to accept props

**Next Steps:**
- Simplify AppsShowcase or create new version that uses Sanity app data
- Update CTASection to accept data props

---

## ❌ Not Started

### 4. About Page (`/about`)
- **Status:** ❌ Partially wired (only careers section)
- **File:** `src/app/[locale]/(main)/about/page.tsx`
- **Sections Using Translations:**
  - ❌ AboutHero
  - ❌ StorySection
  - ❌ Timeline
  - ❌ TeamGrid
  - ✅ CareersList (already wired)
  - ❌ CTASection

### 5. Solutions Page (`/solutions`)
- **Status:** ❌ Not wired
- **File:** `src/app/[locale]/(main)/solutions/page.tsx`
- **Sections Using Translations:**
  - ❌ HeroSectionSolutions
  - ❌ IntroSection
  - ❌ AudienceCardsSection
  - ❌ TechnologySection
  - ❌ WhyTranzkitSection
  - ❌ CtaSection

### 6. Solutions: Enterprises & Passengers (`/solutions/enterprises-passengers`)
- **Status:** ❌ Not wired
- **File:** `src/app/[locale]/(main)/solutions/enterprises-passengers/page.tsx`
- **Sections Using Translations:**
  - ❌ EnterprisesHeroSection
  - ❌ AudienceSwitcherTabs
  - ❌ FeatureShowcaseBentoGrid
  - ❌ WorkflowStepper
  - ❌ AppScreensCarousel
  - ❌ EnterprisesFeaturesSection
  - ❌ TestimonialStrip
  - ❌ EnterprisesAiImpactSection
  - ❌ EnterprisesCtaSection

### 7. Solutions: Operators & Drivers (`/solutions/operators-drivers`)
- **Status:** ❌ Not wired
- **File:** `src/app/[locale]/(main)/solutions/operators-drivers/page.tsx`
- **Sections Using Translations:**
  - ❌ OperatorsHeroSection
  - ❌ RoleSwitcherTabs
  - ❌ OperationsTimeline
  - ❌ DashboardPreviewCarousel
  - ❌ MobileAppUIGrid
  - ❌ OperatorsFeaturesSection
  - ❌ OperatorsAiImpactSection
  - ❌ OperatorsCtaSection
  - ❌ FAQAccordion

### 8. Contact Page (`/contact`)
- **Status:** ❌ Not wired
- **File:** `src/app/[locale]/(main)/contact/page.tsx`
- **Sections Using Translations:**
  - ❌ ContactHero
  - ❌ ContactForm (labels)
  - ❌ SocialLinks

### 9. Pricing Page (`/pricing`)
- **Status:** ❌ Not wired
- **File:** `src/app/[locale]/(main)/pricing/page.tsx`
- **Sections Using Translations:**
  - ❌ PricingHero
  - ❌ PricingCards
  - ❌ ComparisonTable
  - ❌ CTASection

---

## 📊 Summary Statistics

- **Total Pages:** 9
- **Fully Wired:** 2 (22%)
- **Partially Wired:** 1 (11%)
- **Not Wired:** 6 (67%)

---

## 🎯 Recommended Approach

Given the large scope, here's the recommended order:

1. **Contact Page** - Simplest, good starting point
2. **Pricing Page** - Medium complexity
3. **About Page** - Update remaining sections
4. **Solutions Page** - Main solutions page
5. **Apps Page** - Complete AppsShowcase refactoring
6. **Solutions Sub-pages** - Most complex, do last

---

## 🚧 Challenges

1. **AppsShowcase Component** - 532 lines, heavily uses translations, needs major refactoring
2. **Solutions Sub-pages** - Many complex components with animations
3. **CTASection** - Used on multiple pages, needs to be flexible
4. **Individual App Pages** - Still using `appsData` config file

---

## 💡 Notes

- All Sanity schemas are already created and migrated
- GROQ queries exist for all pages
- Main work is updating components to accept props instead of using `useTranslations`
- Some components may need simplification to work better with Sanity data structure

