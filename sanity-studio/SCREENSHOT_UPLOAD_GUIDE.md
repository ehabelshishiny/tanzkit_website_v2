# Screenshot Upload Guide

## Overview

All app screenshots need to be uploaded to Sanity to replace the hardcoded local file paths.

## Screenshot Inventory

### Operator Dashboard (18 screenshots)
- **Location:** `/public/assets/apps_screenshots/operator-dashboard/`
- **Files:** 1.png through 18.png
- **Layout:** Landscape (1920 × 1080 px recommended)
- **Category:** Operators

### Enterprise Dashboard (13 screenshots)
- **Location:** `/public/assets/apps_screenshots/enterprise-dashboard/`
- **Files:** 1.png through 13.png
- **Layout:** Landscape (1920 × 1080 px recommended)
- **Category:** Enterprise

### Supervisor App (8 screenshots)
- **Location:** `/public/assets/apps_screenshots/supervisor/`
- **Files:** 1.png through 8.png
- **Layout:** Portrait (1080 × 1920 px recommended)
- **Category:** Operators

### Driver App (6 screenshots)
- **Location:** `/public/assets/apps_screenshots/driver/`
- **Files:** 1.png through 6.png
- **Layout:** Portrait (1080 × 1920 px recommended)
- **Category:** Operators

### Rider App (5 screenshots)
- **Location:** `/public/assets/apps_screenshots/rider/`
- **Files:** 1.png through 5.png
- **Layout:** Portrait (1080 × 1920 px recommended)
- **Category:** Enterprise

**Total:** 50 screenshots

---

## Upload Methods

### Method 1: Manual Upload via Sanity Studio (Recommended)

1. **Navigate to Sanity Studio**
   - Open http://localhost:3333 (or your Sanity Studio URL)
   - Go to "Apps" collection

2. **For each app:**
   - Open the app document (e.g., "Operator Dashboard")
   - Scroll to "Screenshots" field
   - Click "Upload" or drag and drop images
   - Upload screenshots in order (1.png, 2.png, etc.)
   - Save the document

3. **Verify:**
   - Check that all screenshots appear in the correct order
   - Ensure images are properly displayed in the preview

### Method 2: Programmatic Upload (Advanced)

Use the Sanity CLI to upload images programmatically:

```bash
# Install dependencies
npm install @sanity/client

# Run the upload script (to be created)
npx sanity exec migrations/upload-screenshots.ts --with-user-token
```

---

## Upload Checklist

- [ ] **Operator Dashboard** - 18 screenshots uploaded
- [ ] **Enterprise Dashboard** - 13 screenshots uploaded
- [ ] **Supervisor App** - 8 screenshots uploaded
- [ ] **Driver App** - 6 screenshots uploaded
- [ ] **Rider App** - 5 screenshots uploaded

---

## After Upload

1. **Verify in Sanity Studio:**
   - All screenshots are visible
   - Screenshots are in correct order
   - No broken images

2. **Test on Frontend:**
   - Navigate to each app page
   - Verify screenshots load from Sanity
   - Check carousel functionality

3. **Remove Local Files (Optional):**
   - Once verified, you can remove `/public/assets/apps_screenshots/` directory
   - Update `.gitignore` if needed

---

## Troubleshooting

**Issue:** Images not uploading
- Check file size (Sanity has limits)
- Ensure images are valid PNG/JPG files
- Check Sanity project permissions

**Issue:** Images in wrong order
- Delete and re-upload in correct sequence
- Or use drag-and-drop to reorder in Sanity Studio

**Issue:** Images not showing on frontend
- Clear Next.js cache: `rm -rf .next`
- Restart dev server
- Check GROQ query includes screenshots field

