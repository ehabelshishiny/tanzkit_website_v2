# Sanity Image Debugging Guide

## Step 1: Verify Images in Sanity Studio

1. **Open Sanity Studio**: Navigate to `http://localhost:3000/studio`
2. **Go to Home Page document**
3. **Check Feature Tabs section**:
   - Each tab should have an "Tab Image" field
   - Click on the image field - is there an image uploaded?
   - If not, upload an image
4. **Check Screenshot Carousel section**:
   - Each item should have a "Screenshot Image" field
   - Verify images are uploaded

## Step 2: Check Console Logs

1. **Start dev server**: `npm run dev`
2. **Open browser console** (F12)
3. **Navigate to homepage**: `http://localhost:3000/en`
4. **Look for debug logs**:

```
=== HOME PAGE DATA DEBUG ===
Feature Tabs: {
  "heading": "...",
  "tabs": [
    {
      "_key": "...",
      "label": "...",
      "image": {
        "_type": "image",
        "asset": {
          "_ref": "image-xxx-xxx-xxx",  ← Should see this
          "_type": "reference"
        }
      }
    }
  ]
}
```

## Step 3: Verify Image Data Structure

**Expected structure from Sanity**:
```json
{
  "image": {
    "_type": "image",
    "asset": {
      "_ref": "image-abc123-1920x1080-jpg",
      "_type": "reference"
    },
    "hotspot": { ... },
    "crop": { ... }
  }
}
```

**If you see this instead** (WRONG):
```json
{
  "image": {
    "_type": "image",
    "asset": null  ← Problem: No asset reference
  }
}
```
→ **Solution**: Re-upload the image in Sanity Studio

## Step 4: Test Image URL Generation

Add this to your component temporarily:

```tsx
if (tab.image?.asset) {
  const testUrl = urlFor(tab.image).width(800).url();
  console.log('Generated URL:', testUrl);
}
```

**Expected output**:
```
Generated URL: https://cdn.sanity.io/images/PROJECT_ID/DATASET/IMAGE_ID-1920x1080.jpg?w=800
```

**If you see errors**:
- Check `NEXT_PUBLIC_SANITY_PROJECT_ID` in `.env.local`
- Check `NEXT_PUBLIC_SANITY_DATASET` in `.env.local`

## Step 5: Common Issues & Solutions

### Issue 1: Images not uploaded in Sanity
**Symptom**: `hasImage: false` in console logs
**Solution**: Upload images in Sanity Studio

### Issue 2: Asset reference missing
**Symptom**: `hasAsset: false` but `hasImage: true`
**Solution**: Delete and re-upload the image in Sanity Studio

### Issue 3: urlFor() returns empty string
**Symptom**: `imageUrl` is empty string
**Solution**: 
- Check environment variables
- Verify image asset structure
- Check Sanity project permissions

### Issue 4: Images show in Studio but not on site
**Symptom**: Images visible in Sanity Studio preview, but not on website
**Solution**:
- Clear Next.js cache: `rm -rf .next`
- Rebuild: `npm run build`
- Check if using draft mode vs published content

## Step 6: Verify Query

Check the GROQ query in `src/lib/sanity/queries.ts`:

```groq
image {
  _type,
  asset,      // ← Should NOT have -> (no dereference)
  "alt": coalesce(alt.en, alt.ar),
  hotspot,
  crop
}
```

**Correct**: `asset` (returns reference)
**Wrong**: `asset->` (dereferences, breaks urlFor)

## Step 7: Test with Static Images

If Sanity images still don't work, verify the component works with static images:

```tsx
// Temporarily hardcode an image URL
const imageUrl = '/assets/homepage/features/live_tracking.png';
```

If static images work but Sanity images don't → Problem is in Sanity integration
If static images also don't work → Problem is in component rendering

## Next Steps

After following these steps, you should know:
1. ✅ Are images uploaded in Sanity?
2. ✅ Is the data structure correct?
3. ✅ Are image URLs being generated?
4. ✅ Where exactly is the problem?

Then we can apply the specific fix needed.

