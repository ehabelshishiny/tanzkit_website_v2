# Apps Refactoring Implementation Plan

## Overview

This document outlines the step-by-step plan to migrate all app content from hardcoded files and translation keys to Sanity CMS.

---

## Phase 1: Populate App Documents in Sanity ✅

### Step 1.1: Run Migration Script

```bash
cd sanity-studio
npx sanity exec migrations/populate-apps-data.ts --with-user-token
```

**What this does:**
- Creates/updates 5 app documents in Sanity
- Populates: name, slug, tagline, description, category, layoutType, benefits, platforms, steps, order
- Uses data extracted from `apps-data.ts` and translation files

**Expected Output:**
```
🚀 Starting apps data population...

📱 Processing: Operator Dashboard (operator-dashboard)
   📝 Creating new document
   ✅ Created: app-xxx

📱 Processing: Enterprise Dashboard (enterprise-dashboard)
   📝 Creating new document
   ✅ Created: app-xxx

... (3 more apps)

🎉 All apps populated successfully!
```

### Step 1.2: Upload Screenshots

**Manual Upload (Recommended):**
1. Open Sanity Studio: http://localhost:3333
2. Navigate to "Apps" collection
3. For each app, upload screenshots from `/public/assets/apps_screenshots/[app-name]/`
4. Upload in order: 1.png, 2.png, 3.png, etc.

**Reference:** See `sanity-studio/SCREENSHOT_UPLOAD_GUIDE.md` for detailed instructions

**Checklist:**
- [ ] Operator Dashboard - 18 screenshots
- [ ] Enterprise Dashboard - 13 screenshots
- [ ] Supervisor App - 8 screenshots
- [ ] Driver App - 6 screenshots
- [ ] Rider App - 5 screenshots

### Step 1.3: Add Store URLs (Optional)

For mobile apps, add App Store and Play Store URLs in Sanity Studio:
- Supervisor App
- Driver App
- Rider App

---

## Phase 2: Update Frontend Components

### Step 2.1: Update AppsShowcase Component

**File:** `src/components/sections/apps/AppsShowcase.tsx`

**Changes needed:**
1. Remove all `useTranslations` calls for app-specific content
2. Use app data from Sanity props instead of translation keys
3. Keep only generic UI labels in translations (if any)

**Before:**
```typescript
const t = useTranslations('apps.main.showcase');
// Uses t('segments.operators.dashboard.name')
```

**After:**
```typescript
// Use app.name directly from Sanity data
{app.name}
```

### Step 2.2: Update StepSection Component

**File:** `src/components/sections/apps/step-section.tsx`

**Changes needed:**
1. Remove fallback to translation keys
2. Always use `steps` from Sanity
3. Remove `useTranslations('apps.template.steps')`

**Before:**
```typescript
const defaultSteps = t('apps.template.steps.items');
const stepsToDisplay = steps || defaultSteps;
```

**After:**
```typescript
// Always use steps from Sanity (required field)
const stepsToDisplay = steps;
```

### Step 2.3: Update AppHero Component

**File:** `src/components/sections/apps/app-hero.tsx`

**Changes needed:**
1. Remove hardcoded button text
2. Add button labels to app CTA section in Sanity
3. Or keep generic button labels in translations (e.g., "Download", "Get Started")

### Step 2.4: Remove apps-data.ts Fallback

**File:** `src/components/sections/apps/app-detail-original-template.tsx`

**Changes needed:**
1. Remove import of `appsData` from `@/config/apps-data`
2. Remove fallback logic: `const screenshots = appData.screenshots?.length > 0 ? appData.screenshots : fallbackScreenshots`
3. Always use Sanity data

**Before:**
```typescript
import { appsData } from '@/config/apps-data';
const fallbackScreenshots = appsData[appData.slug]?.screenshots || [];
```

**After:**
```typescript
// Remove fallback - always use Sanity screenshots
const screenshots = appData.screenshots;
```

---

## Phase 3: Clean Up Translation Files

### Step 3.1: Remove App-Specific Content

**Files to update:**
- `messages/en.json`
- `messages/ar.json`

**Content to remove:**
- `apps.main.showcase.segments.operators` (except tabLabel)
- `apps.main.showcase.segments.enterprise` (except tabLabel)
- `apps.template.steps.items`
- App-specific names, descriptions, benefits

**Content to keep:**
- Generic UI labels (e.g., "Learn More", "Download", "Get Started")
- Section titles (e.g., "Choose Your App")
- Platform labels (e.g., "iOS & Android")

### Step 3.2: Document Removed Content

Create a backup file documenting what was removed:
```bash
cp messages/en.json messages/en.json.backup-before-apps-refactor
cp messages/ar.json messages/ar.json.backup-before-apps-refactor
```

---

## Phase 4: Update Apps Page Schema

### Step 4.1: Verify Apps Page References

**File:** `sanity-studio/schemaTypes/documents/appsPage.ts`

Ensure the showcase section properly references app documents:
```typescript
{
  name: 'operatorApps',
  title: 'Operator Apps',
  type: 'array',
  of: [{ type: 'reference', to: [{ type: 'app' }] }],
  validation: (Rule) => Rule.max(3),
}
```

### Step 4.2: Populate Apps Page Showcase

In Sanity Studio:
1. Open "Apps Page" document
2. In "Showcase Section":
   - Add 3 operator apps: Operator Dashboard, Supervisor, Driver
   - Add 2 enterprise apps: Enterprise Dashboard, Rider
3. Save

---

## Phase 5: Verification & Testing

### Step 5.1: Test All App Pages

Visit each app page and verify:
- [ ] `/apps/operator-dashboard` - All content from Sanity
- [ ] `/apps/enterprise-dashboard` - All content from Sanity
- [ ] `/apps/supervisor` - All content from Sanity
- [ ] `/apps/driver` - All content from Sanity
- [ ] `/apps/rider` - All content from Sanity

**Check:**
- ✅ App name displays correctly (EN/AR)
- ✅ Tagline displays correctly
- ✅ Description displays correctly
- ✅ Screenshots load from Sanity
- ✅ Benefits list displays
- ✅ Getting started steps display
- ✅ Download buttons show (if platforms configured)

### Step 5.2: Test Apps Main Page

Visit `/apps` and verify:
- [ ] Hero section displays (already using Sanity)
- [ ] Apps showcase displays correctly
- [ ] Operator apps section shows 3 apps
- [ ] Enterprise apps section shows 2 apps
- [ ] App cards link to detail pages
- [ ] All text from Sanity (no translation keys)

### Step 5.3: Search for Remaining Translation Keys

```bash
# Search for any remaining app-specific translation usage
grep -r "apps\.main\.showcase\.segments" src/
grep -r "apps\.template\.steps" src/
grep -r "apps\.names\." src/
grep -r "apps\.descriptions\." src/
```

**Expected result:** No matches (or only in backup files)

---

## Phase 6: Final Cleanup

### Step 6.1: Remove Unused Files

```bash
# Remove hardcoded apps data
rm src/config/apps-data.ts

# Remove local screenshots (after verifying Sanity upload)
rm -rf public/assets/apps_screenshots/
```

### Step 6.2: Update Documentation

- [ ] Update README with new content management approach
- [ ] Document how to add new apps in Sanity
- [ ] Create content editor guide

---

## Success Criteria

✅ All 5 app documents populated in Sanity with complete data
✅ All 50 screenshots uploaded to Sanity
✅ Frontend components use only Sanity data
✅ Zero translation keys used for app-specific content
✅ All app pages render correctly in both EN and AR
✅ Apps showcase on main page works correctly
✅ No hardcoded app data in codebase
✅ Local screenshot files removed

---

## Rollback Plan

If issues arise:
1. Restore translation files from backup
2. Restore `apps-data.ts` from git history
3. Revert frontend component changes
4. Keep Sanity data for future retry

