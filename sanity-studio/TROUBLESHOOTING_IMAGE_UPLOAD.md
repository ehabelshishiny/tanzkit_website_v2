# Troubleshooting Sanity Image Upload Issues

## Common Causes & Solutions

### 1. CORS Configuration (Most Common)

**Problem:** Sanity Studio can't upload images due to CORS restrictions.

**Solution:**
1. Go to https://www.sanity.io/manage
2. Select your project: **Tranzkit CMS** (Project ID: `1dovcqcz`)
3. Navigate to **Settings** → **API**
4. Under **CORS Origins**, add your Studio URL:
   - **Origin:** `http://localhost:3000` (or your Studio URL)
   - **Allow credentials:** ✅ Checked
   - Click **Add CORS origin**

**Also add:**
- `http://localhost:3333` (if running Studio separately)
- Your production domain when deploying

---

### 2. Browser Console Errors

**Check for errors:**
1. Open browser DevTools (F12 or Cmd+Option+I)
2. Go to **Console** tab
3. Try uploading an image
4. Look for error messages

**Common errors:**

**Error:** `Failed to fetch` or `CORS error`
- **Fix:** Add CORS origin (see #1 above)

**Error:** `413 Payload Too Large`
- **Fix:** Image file is too large (Sanity limit is 5MB for free tier)
- Compress the image or upgrade plan

**Error:** `401 Unauthorized`
- **Fix:** You're not logged in to Sanity
- Run: `npx sanity login` in terminal

---

### 3. Sanity Studio Not Running Properly

**Check if Studio is running:**
```bash
cd sanity-studio
npm run dev
```

**Expected output:**
```
Content Studio successfully compiled! Go to http://localhost:3333
```

**If not running:**
1. Stop the process (Ctrl+C)
2. Clear cache: `rm -rf node_modules/.cache`
3. Restart: `npm run dev`

---

### 4. Network/Firewall Issues

**Check network:**
1. Ensure you have internet connection
2. Try disabling VPN if using one
3. Check if firewall is blocking Sanity CDN

**Test Sanity connection:**
```bash
curl https://1dovcqcz.api.sanity.io/v2021-10-21/data/query/production
```

Should return JSON response (not an error)

---

### 5. Browser Cache Issues

**Clear browser cache:**
1. Open DevTools (F12)
2. Right-click the refresh button
3. Select **Empty Cache and Hard Reload**

**Or try:**
- Incognito/Private browsing mode
- Different browser (Chrome, Firefox, Safari)

---

### 6. File Type/Size Issues

**Supported formats:**
- PNG, JPG, JPEG, GIF, SVG, WebP

**File size limits:**
- Free tier: 5MB per image
- Growth/Enterprise: Higher limits

**Check your file:**
```bash
# Check file size
ls -lh /path/to/your/image.png

# If too large, compress it:
# Use online tools or ImageOptim, TinyPNG, etc.
```

---

## Quick Diagnostic Steps

### Step 1: Check Sanity Login
```bash
cd sanity-studio
npx sanity login
```

### Step 2: Check CORS Settings
```bash
npx sanity cors list
```

**Expected output:**
```
https://your-domain.com
http://localhost:3000
http://localhost:3333
```

**If missing, add:**
```bash
npx sanity cors add http://localhost:3000 --credentials
npx sanity cors add http://localhost:3333 --credentials
```

### Step 3: Restart Studio
```bash
# Stop current process (Ctrl+C)
npm run dev
```

### Step 4: Test Upload
1. Open http://localhost:3333 (or your Studio URL)
2. Navigate to Apps → Operator Dashboard
3. Scroll to Screenshots field
4. Click **Upload** or drag & drop an image
5. Check browser console for errors

---

## Alternative Upload Methods

### Method 1: Use Sanity CLI to Upload

Create a script to upload images programmatically:

```bash
# Install Sanity client
npm install @sanity/client

# Run upload script (to be created)
npx sanity exec migrations/upload-screenshots.ts --with-user-token
```

### Method 2: Use Sanity Asset API Directly

Upload via API:
```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -F "file=@/path/to/image.png" \
  https://1dovcqcz.api.sanity.io/v2021-06-07/assets/images/production
```

---

## Still Not Working?

### Get More Help:

1. **Check Sanity Status:** https://status.sanity.io
2. **Sanity Slack Community:** https://slack.sanity.io
3. **Sanity Support:** support@sanity.io

### Provide This Info:
- Project ID: `1dovcqcz`
- Dataset: `production`
- Studio URL: (your URL)
- Browser: (Chrome/Firefox/Safari)
- Error message from console
- Screenshot of the issue

