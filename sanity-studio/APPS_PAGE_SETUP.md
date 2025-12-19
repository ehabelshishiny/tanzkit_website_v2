# Apps Page Setup Guide

## Quick Setup in Sanity Studio

Since the schema has been updated, you need to populate the Apps Page document in Sanity Studio. Here's how:

### Step 1: Open Sanity Studio

1. Navigate to your Sanity Studio (usually at `http://localhost:3333`)
2. Find "Apps Page" in the document list

### Step 2: Populate Hero Section

Fill in the **Hero Section** fields:

**Title Part 1 (Blue Gradient):**
- English: `Intelligent`
- Arabic: `نظام`

**Title Part 2 (Green Gradient):**
- English: `Application`
- Arabic: `التطبيقات`

**Title Part 3 (Default Color):**
- English: `Ecosystem`
- Arabic: `الذكية`

**Subtitle:**
- English: `Discover our comprehensive suite of mobile and web applications designed to revolutionize workforce mobility across every role`
- Arabic: `اكتشف مجموعتنا الشاملة من تطبيقات الهاتف المحمول والويب المصممة لإحداث ثورة في تنقل القوى العاملة عبر كل دور`

### Step 3: Populate Apps Showcase Section

**Operator Apps** (Select up to 3):
- Click "Add item" and select apps with category "operators"
- Recommended: Operator Dashboard, Supervisor App, Driver App

**Enterprise Apps** (Select up to 2):
- Click "Add item" and select apps with category "enterprise"
- Recommended: Enterprise Dashboard, Rider App

> **Note:** If you don't see any apps to select, you need to create App documents first in the "Apps" collection.

### Step 4: Populate CTA Section

Fill in the **CTA Section** fields:

**Heading:**
- English: Your CTA heading
- Arabic: Your CTA heading in Arabic

**Subtitle:**
- English: Your CTA subtitle
- Arabic: Your CTA subtitle in Arabic

**Primary CTA:**
- Text (English): e.g., "Get Started"
- Text (Arabic): e.g., "ابدأ الآن"
- Link: Your link URL
- Open in New Tab: Check if needed

**Secondary CTA (optional):**
- Same structure as Primary CTA

### Step 5: Save and Publish

Click "Publish" to save your changes.

---

## Alternative: Run Migration Script

If you prefer to use the migration script (requires apps to already exist in your database):

```bash
cd sanity-studio
npx sanity exec migrations/update-apps-page-schema.ts --with-user-token
```

This will:
- ✅ Create the Apps Page document if it doesn't exist
- ✅ Populate hero section with default values
- ✅ Auto-select first 3 operator apps and 2 enterprise apps
- ⚠️ You'll still need to manually add the CTA section in Studio

---

## Troubleshooting

**No apps showing in the showcase selectors?**
- Make sure you have created App documents in the "Apps" collection
- Ensure apps have the correct `category` field set to either "operators" or "enterprise"

**Changes not reflecting on frontend?**
- Make sure you've published the document in Sanity Studio
- Check that your frontend is running and connected to Sanity
- Clear your browser cache or do a hard refresh

**Array limit errors?**
- The schema enforces max 3 operator apps and max 2 enterprise apps
- Remove extra items if you exceed these limits

