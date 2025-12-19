# Sanity Images Audit & Wiring Status

## Summary

This document tracks all image fields in Sanity schemas and their wiring status in frontend components.

## ✅ Properly Wired (Using Sanity Images)

### 1. Home Page - Feature Tabs
- **Schema:** `homePage.featureTabs.tabs[].image`
- **Query:** ✅ Fetches with `imageProjection`
- **Component:** `src/components/sections/homepage/feature-tabs.tsx`
- **Status:** ✅ Using `urlFor(tabImage).width(800).height(600).url()`

### 2. Home Page - Screenshot Carousel
- **Schema:** `homePage.screenshotCarousel.items[].image`
- **Query:** ✅ Fetches with `imageProjection`
- **Component:** `src/components/sections/homepage/screenshot-carousel.tsx`
- **Status:** ✅ Using `urlFor(screenshot.image).width(600).height(400).url()`

### 3. Apps - Screenshots Array
- **Schema:** `app.screenshots[]` (array of images)
- **Query:** ✅ Fetches with `imageProjection`
- **Component:** Not yet wired (see below)
- **Status:** ⚠️ Query ready, component needs update

## ⚠️ Partially Wired (Schema + Query Ready, Component Not Using)

### 4. Home Page - Logo Bar
- **Schema:** `homePage.logoBar.logos[]` (array of images)
- **Query:** ✅ Fetches with `imageProjection`
- **Component:** `src/components/sections/homepage/logo-bar-section.tsx`
- **Current:** Using hardcoded `/assets/homepage/logos/${index}.png`
- **Action Needed:** Update component to use Sanity images

### 5. Home Page - Hero Section
- **Schema:** `homePage.hero.backgroundImage`
- **Query:** ✅ Fetches with `imageProjection`
- **Component:** `src/components/sections/homepage/hero-section.tsx`
- **Current:** Not using background image (uses canvas animation)
- **Action Needed:** Decide if background image should be used

### 6. Home Page - Testimonials
- **Schema:** `homePage.testimonials.items[].avatar`
- **Query:** ✅ Fetches with `imageProjection`
- **Component:** `src/components/sections/homepage/testimonials-section.tsx`
- **Current:** Not checked yet
- **Action Needed:** Verify component uses Sanity images

## ❌ Not Wired (Using Hardcoded Images)

### 7. Solutions - Operator Dashboard Carousel
- **Component:** `src/components/sections/solutions/operators/dashboard-preview-carousel.tsx`
- **Current:** Using `/assets/apps_screenshots/operator-dashboard/${index + 1}.png`
- **Schema:** Should use `app.screenshots[]` from operator-dashboard app
- **Action Needed:** Fetch operator-dashboard app data and use screenshots

### 8. Solutions - Enterprise Dashboard Carousel
- **Component:** `src/components/sections/solutions/enterprises/app-screens-carousel.tsx`
- **Current:** Using `/assets/apps_screenshots/enterprise-dashboard/${index + 1}.png`
- **Schema:** Should use `app.screenshots[]` from enterprise-dashboard app
- **Action Needed:** Fetch enterprise-dashboard app data and use screenshots

### 9. Apps - Hero Section
- **Component:** `src/components/sections/apps/apps-hero-section.tsx`
- **Current:** Using hardcoded paths for 5 app screenshots
- **Schema:** Should use `app.screenshots[0]` from each app
- **Action Needed:** Accept apps data as prop and use first screenshot

### 10. Apps - Showcase GIFs
- **Component:** `src/components/sections/apps/AppsShowcase.tsx`
- **Current:** Using hardcoded GIF paths
- **Schema:** Could add `gif` field to app schema or use screenshots
- **Action Needed:** Major refactor needed - component doesn't accept props

## 📋 Schema Image Fields Reference

### Documents with Images

1. **siteSettings**
   - `logo` - Site logo
   - `favicon` - Site favicon

2. **homePage**
   - `hero.backgroundImage`
   - `featureTabs.tabs[].image` ✅
   - `screenshotCarousel.items[].image` ✅
   - `logoBar.logos[]`
   - `testimonials.items[].avatar`

3. **app**
   - `screenshots[]` - Array of app screenshots

4. **seo** (shared object)
   - `ogImage` - Open Graph image for social sharing

### Objects with Images

1. **heroSection**
   - `backgroundImage`

2. **featureItem**
   - `image` - Optional feature image

3. **testimonial**
   - `avatar` - Author photo

4. **teamMember**
   - `image` - Team member photo

5. **technologyItem**
   - `image` - Technology illustration

6. **workflowStep**
   - `image` - Step illustration

7. **ctaSection**
   - `backgroundImage`

## 🎯 Priority Action Items

### High Priority (User Reported)
1. ✅ Fix feature tabs images - DONE
2. ✅ Fix screenshot carousel images - DONE
3. ⚠️ Fix logo bar images - PENDING
4. ⚠️ Fix apps showcase images - PENDING (complex refactor)

### Medium Priority
5. Wire solutions page carousels to use app screenshots
6. Wire apps hero section to use app screenshots
7. Verify testimonials component uses avatars

### Low Priority
8. Add team member images support (if about page has team section)
9. Add technology/workflow images support (if used)
10. Add OG images for SEO

## 📝 Notes

- All queries use `imageProjection` which fetches: `_type`, `asset->`, `alt`, `hotspot`, `crop`
- Image URL builder is in `src/lib/sanity/image.ts`
- Use `urlFor(image).width(W).height(H).url()` to generate optimized URLs
- Client components can safely import `urlFor` (no draft mode dependency)

