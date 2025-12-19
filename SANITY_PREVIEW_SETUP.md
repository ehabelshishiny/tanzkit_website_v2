# Sanity Preview Setup Guide (2025 Version)

## ✅ What Has Been Implemented

The Sanity Preview/Presentation feature has been **fully implemented** using the latest 2025 Next.js App Router approach with visual editing support.

### 1. Draft Mode API Routes ✅
- **`src/app/api/draft/route.ts`** - Enables draft mode using `defineEnableDraftMode` from `next-sanity/draft-mode`
- **`src/app/api/disable-draft/route.ts`** - Disables draft mode

### 2. Sanity Client with Visual Editing ✅
- **`src/lib/sanity/client.ts`** - Updated to use `createClient` from `next-sanity` with:
  - `stega` configuration for automatic visual editing overlays
  - `studioUrl` pointing to Sanity Studio
  - `token` for accessing draft content

### 3. Visual Editing Component ✅
- **`src/app/[locale]/layout.tsx`** - Added `VisualEditing` component from `next-sanity/visual-editing`
  - Conditionally renders when draft mode is enabled
  - Provides interactive overlays for content editing

### 4. Presentation Tool Configuration ✅
- **`sanity-studio/sanity.config.ts`** - Configured with:
  - Presentation tool from `sanity/presentation`
  - Preview URL configuration
  - Draft mode enable endpoint

### 5. Environment Variables ✅
- **`.env.local`** - Configured with:
  - `SANITY_API_READ_TOKEN` - For accessing draft content
  - `NEXT_PUBLIC_SANITY_STUDIO_URL` - For visual editing overlays

---

## 🎯 How It Works (2025 Architecture)

The 2025 implementation uses a modern approach with automatic visual editing overlays:

1. **Stega Encoding**: The Sanity client automatically encodes content with metadata when `stega` is enabled
2. **Visual Editing Component**: The `VisualEditing` component creates interactive overlays on content
3. **Draft Mode**: Next.js draft mode fetches draft content instead of published content
4. **Presentation Tool**: Sanity Studio's Presentation tool provides the side-by-side editing interface

---

## 🚀 How to Use Preview

### In Sanity Studio:

1. **Navigate to Sanity Studio:**
   ```
   http://localhost:3000/studio
   ```

2. **Click the "Presentation" tab** in the top navigation

3. **You'll see a side-by-side view:**
   - **Left:** Preview of your website
   - **Right:** Sanity Studio editor (can be toggled)

4. **Navigate to any page** in the preview (e.g., `/about`, `/pricing`)
   - The Studio will automatically show the corresponding document

5. **Edit content in real-time:**
   - Click on any field in the Studio
   - Type your changes
   - See them update instantly in the preview
   - No need to publish!

### Features:

- ✅ **Real-time updates** - Changes appear instantly in the preview
- ✅ **Draft content** - See unpublished changes before going live
- ✅ **Bilingual support** - Preview both English and Arabic versions
- ✅ **All pages supported** - Home, About, Solutions, Apps, Contact, Pricing, Careers
- ✅ **Interactive overlays** - Click on content in the preview to jump to the field in the Studio

---

## 📝 Files Created/Modified

### Created Files:
1. `src/app/api/draft/route.ts` - Draft mode enable endpoint
2. `src/app/api/disable-draft/route.ts` - Draft mode disable endpoint

### Modified Files:
1. `src/lib/sanity/client.ts` - Updated to use `next-sanity` with `stega`
2. `src/app/[locale]/layout.tsx` - Added `VisualEditing` component
3. `sanity-studio/sanity.config.ts` - Configured Presentation tool
4. `.env.local` - Added `NEXT_PUBLIC_SANITY_STUDIO_URL`

---

## 🔧 Troubleshooting

### Preview not loading?
- Check that `SANITY_API_READ_TOKEN` is set in `.env.local`
- Verify the token has **Viewer** permissions
- Restart the dev server after adding the token

### "Unable to connect to visual editing" error?
- Make sure `NEXT_PUBLIC_SANITY_STUDIO_URL` is set in `.env.local`
- Verify the URL matches your Studio URL (e.g., `http://localhost:3000/studio`)
- Check that the `VisualEditing` component is added to the root layout

### Preview shows published content instead of drafts?
- Check that draft mode is enabled (should happen automatically when using Presentation tool)
- Verify the Sanity client has `token` configured

### Interactive overlays not working?
- Make sure `stega` is configured in the Sanity client
- Verify the `VisualEditing` component is rendering (check browser console)

---

## 🎉 What's Next?

The preview feature is now fully functional! Content editors can:

1. **Edit content in real-time** - See changes instantly without publishing
2. **Preview on different devices** - Resize the preview pane to test responsive design
3. **Navigate between pages** - The Studio automatically switches to the correct document
4. **Work with drafts** - Make changes without affecting the live site

Enjoy your new preview feature! 🚀
