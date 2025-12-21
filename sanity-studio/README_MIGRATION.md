# Apps Page Migration Guide

## 🎯 What Changed

The Apps Page schema has been refactored to better match the frontend structure:

### New Schema Structure:
1. **Hero Section** - Editable gradient text fields (3 parts) + subtitle
2. **Apps Showcase** - Direct references to App documents (max 3 operators, max 2 enterprise)
3. **CTA Section** - Unchanged (existing structure)

---

## 🚀 Quick Start

### Option 1: Run the Complete Setup Script (Recommended)

This script will check for existing apps and set up the Apps Page automatically:

```bash
cd sanity-studio
npx sanity exec migrations/setup-apps-page-complete.ts --with-user-token
```

**What it does:**
- ✅ Checks for existing App documents
- ✅ Creates Apps Page document if it doesn't exist
- ✅ Populates hero section with default values
- ✅ Auto-selects apps for showcase (if apps exist)
- ✅ Preserves existing CTA section
- ✅ Shows detailed status report

---

### Option 2: Manual Setup in Sanity Studio

If you prefer to set everything up manually:

1. **Open Sanity Studio** (usually at `http://localhost:3333`)

2. **Create App Documents First** (if they don't exist):
   - Go to "Apps" collection
   - Create apps with:
     - Name (English & Arabic)
     - Category: "operators" or "enterprise"
     - Slug, description, etc.

3. **Open Apps Page Document**:
   - Find "Apps Page" in the document list
   - Fill in the Hero Section fields (see APPS_PAGE_SETUP.md for values)
   - Select apps in the Showcase Section
   - Add CTA section content
   - Publish

---

## 📋 What You Need to Do

### Before Running Migration:

1. **Check if you have App documents**:
   - Open Sanity Studio
   - Go to "Apps" collection
   - You should have apps with categories "operators" and "enterprise"

2. **If you don't have apps yet**:
   - Create them in Sanity Studio first, OR
   - Run the migration anyway (it will set up the hero section)
   - Add apps to the showcase later

### After Running Migration:

1. **Verify in Sanity Studio**:
   - Open the Apps Page document
   - Check that hero section is populated
   - Verify apps are selected in showcase
   - Add/update CTA section if needed

2. **Test on Frontend**:
   - Visit `/apps` page
   - Verify hero text displays correctly
   - Check that apps showcase shows selected apps
   - Make changes in Studio and verify they reflect

---

## 🔍 Troubleshooting

### "No apps found" message
**Problem:** The database doesn't have any App documents yet.

**Solution:** 
- Create App documents in Sanity Studio first
- Then run the migration again, OR
- Manually add apps to the Apps Page in Studio

### Hero section not showing on frontend
**Problem:** Data not fetched or component not updated.

**Solution:**
- Make sure you published the Apps Page in Sanity Studio
- Clear browser cache and hard refresh
- Check browser console for errors

### Apps not appearing in showcase
**Problem:** Apps might not have the correct category set.

**Solution:**
- Check that apps have `category` field set to "operators" or "enterprise"
- Verify apps are published in Sanity Studio
- Check the Apps Page document has the app references

### Array limit errors
**Problem:** Trying to add more than 3 operator apps or 2 enterprise apps.

**Solution:**
- The schema enforces these limits
- Remove extra items to stay within limits
- This is by design per the requirements

---

## 📁 Files Changed

- `sanity-studio/schemaTypes/documents/appsPage.ts` - Updated schema
- `src/lib/sanity/queries.ts` - Updated query to fetch new fields
- `src/components/sections/apps/apps-hero-section.tsx` - Now accepts Sanity data
- `src/app/[locale]/(main)/apps/page.tsx` - Passes hero data to component
- `src/components/sections/apps/AppsShowcase.tsx` - Simplified props

---

## 🎨 Default Values

The migration populates these default values (from translation files):

**Hero Title:**
- Part 1: "Intelligent" / "نظام" (Blue gradient)
- Part 2: "Application" / "التطبيقات" (Green gradient)
- Part 3: "Ecosystem" / "الذكية" (Default color)

**Hero Subtitle:**
- EN: "Discover our comprehensive suite of mobile and web applications..."
- AR: "اكتشف مجموعتنا الشاملة من تطبيقات الهاتف المحمول..."

You can edit these in Sanity Studio after migration.

---

## ✅ Verification Checklist

- [ ] Migration script ran successfully
- [ ] Apps Page document exists in Sanity
- [ ] Hero section has all 4 fields populated
- [ ] Showcase section has app references (if apps exist)
- [ ] CTA section is configured
- [ ] Frontend displays hero text correctly
- [ ] Apps showcase shows selected apps
- [ ] Changes in Studio reflect on frontend

