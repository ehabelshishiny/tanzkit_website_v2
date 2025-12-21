# How to Use Sanity Preview Feature

## 🎯 Quick Start Guide

### Step 1: Access Sanity Studio

1. Make sure your dev server is running:
   ```bash
   npm run dev
   ```

2. Open Sanity Studio in your browser:
   ```
   http://localhost:3000/studio
   ```

### Step 2: Open Presentation View

1. In the Sanity Studio, you'll see the main navigation at the top
2. Click on any document type in the sidebar (e.g., "Home Page", "About Page", "Pricing Page")
3. Click on a specific document to edit it
4. Look for the **"Presentation"** tab in the top navigation (next to "Content" and "Vision")
5. Click the **"Presentation"** tab

### Step 3: Use the Preview

You'll now see a **split-screen view**:

**Left Side:** Sanity Studio editor
- Edit any field
- Add/remove content
- Change text, images, etc.

**Right Side:** Live preview
- Shows your website in real-time
- Updates automatically as you type
- Displays draft content (unpublished changes)

---

## 🎨 Features

### Real-Time Updates
- Type in any field on the left
- See changes instantly on the right
- No need to save or publish

### Draft Mode
- Preview unpublished changes
- Test before going live
- Safe to experiment

### Responsive Preview
- Resize the preview pane
- Test mobile, tablet, desktop views
- Use the device selector (if available)

### Locale Support
- Preview both English and Arabic versions
- Switch locales to see translations
- Verify RTL layout for Arabic

---

## 📄 Supported Pages

All pages support preview:

### Singleton Pages (One instance each):
- ✅ **Home Page** (`/`)
- ✅ **About Page** (`/about`)
- ✅ **Solutions Page** (`/solutions`)
- ✅ **Solutions: Enterprises & Passengers** (`/solutions/enterprises-passengers`)
- ✅ **Solutions: Operators & Drivers** (`/solutions/operators-drivers`)
- ✅ **Apps Page** (`/apps`)
- ✅ **Contact Page** (`/contact`)
- ✅ **Pricing Page** (`/pricing`)

### Collection Pages (Multiple instances):
- ✅ **Apps** (`/apps/[slug]`)
- ✅ **Careers** (`/careers/[slug]`)

---

## 🔧 Tips & Tricks

### Tip 1: Use Preview for Content Editing
Instead of publishing changes immediately, use preview to:
1. Draft new content
2. Review changes
3. Get feedback from team members
4. Publish when ready

### Tip 2: Test Responsive Design
- Drag the preview pane divider to resize
- Test how content looks on different screen sizes
- Verify mobile navigation works correctly

### Tip 3: Preview Locale-Specific Content
- Edit English content and see it in preview
- Switch to Arabic fields and verify RTL layout
- Ensure translations are consistent

### Tip 4: Exit Preview Mode
To exit preview mode and return to normal editing:
- Click the "Content" tab at the top
- Or close the Presentation view

---

## 🐛 Troubleshooting

### Preview shows "Loading..." forever
- Check that your dev server is running (`npm run dev`)
- Verify `SANITY_API_READ_TOKEN` is set in `.env.local`
- Check browser console for errors

### Preview shows published content instead of drafts
- Make sure you're in the Presentation tab
- Draft mode should be enabled automatically
- Try refreshing the preview

### Preview URL is wrong
- Check `NEXT_PUBLIC_SITE_URL` in `.env.local`
- Default is `http://localhost:3000`
- Verify the URL in `sanity-studio/lib/resolve-preview-url.ts`

### Changes don't appear in preview
- Wait a moment (updates are near-instant but not immediate)
- Check if the field you're editing is actually used in the page component
- Verify the query includes the field you're editing

---

## 🎉 Benefits

Using the preview feature provides:

1. **Faster Content Editing** - See changes without publishing
2. **Better Quality Control** - Catch errors before they go live
3. **Improved Collaboration** - Share preview links with team members
4. **Reduced Risk** - Test changes in a safe environment
5. **Better UX** - Content editors can work more confidently

---

## 📚 Next Steps

Now that you have preview set up:

1. Try editing the Home Page and see changes in real-time
2. Test creating a new career posting and preview it
3. Experiment with different content types
4. Share the preview feature with your content team

Enjoy your new preview-powered content editing workflow! 🚀

