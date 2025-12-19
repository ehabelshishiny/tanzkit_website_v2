# Sanity Integration Analysis & Fixes

## Architecture Overview

### Current Setup ✅
```
Server Component (page.tsx)
  ↓ fetches data with await getHomePage(locale)
  ↓ passes data as props
Client Components (sections)
  ↓ use 'use client' for:
    - useTranslations() - i18n
    - Framer Motion animations
    - useState, useEffect
    - Interactive features (Tabs, Carousel)
```

**This architecture is CORRECT** for Next.js 13+ App Router.

## Issues Identified

### 1. Hydration Warnings (Radix UI Tabs)
**Root Cause**: Radix UI generates random IDs on server vs client
- Server: `radix-_R_a8lrl5rcd5rlb_`
- Client: `radix-_R_194lrl5rcd5rlb_`

**Solution**: ✅ `suppressHydrationWarning` on TabsTrigger and TabsContent
- This is the CORRECT approach for this specific issue
- Not a hack - it's the recommended React solution for non-critical hydration mismatches

### 2. Images Not Showing from Sanity
**Possible Root Causes**:
1. Images not uploaded in Sanity Studio
2. Image query not returning correct data structure
3. `urlFor()` function not handling data correctly
4. Component not checking for image.asset properly

**Current Image Projection**:
```groq
image {
  _type,
  asset,      // ← Returns reference { _ref: "image-xxx", _type: "reference" }
  "alt": coalesce(alt.en, alt.ar),
  hotspot,
  crop
}
```

**This is CORRECT** - `urlFor()` needs the reference, not the dereferenced asset.

### 3. Performance Considerations
**Current**: All section components are Client Components
**Impact**: 
- ✅ Necessary for animations and interactivity
- ✅ Data is still fetched on server
- ✅ Only the rendering is client-side
- ⚠️ Could optimize by pre-processing image URLs on server

## Recommended Fixes

### Fix 1: Add Server-Side Image URL Processing
**Why**: Avoid client-side `urlFor()` calls, reduce client bundle size

**Implementation**: Create a data transformer in the server component

### Fix 2: Better Error Handling & Logging
**Why**: Understand what data is actually being received

### Fix 3: Validate Sanity Data Structure
**Why**: Ensure images are properly uploaded and structured

### Fix 4: Type Safety
**Why**: Catch data structure issues at compile time

## Next Steps

1. **Verify Sanity Studio**: Check if images are actually uploaded
2. **Add Logging**: See what data is being received
3. **Test Image URLs**: Verify urlFor() is generating valid URLs
4. **Consider Server-Side Processing**: Pre-process image URLs

