# Environment Variable Implementation for CTA Buttons

## ✅ Implementation Complete

**Date**: 2025-01-18  
**Task**: Connect "Start Free Trial" CTA buttons to real application URL using environment variables  
**Application URL**: `https://app.tranzkit.com`  
**Status**: Ready for Testing  
**Type Check**: ✅ Passed  

---

## 📋 What Was Implemented

### **Objective**
Connect all "Start Free Trial" CTA buttons to the real Tranzkit application URL (`https://app.tranzkit.com`) using environment variables, with a fallback to the placeholder trial page if the environment variable is not set.

---

## 📝 Files Created/Modified (2 files)

### 1. `.env.local` (Created)

**Purpose**: Store the external application URL as an environment variable

**Content**:
```env
# Tranzkit Application URL
# This URL is used for the "Start Free Trial" CTA buttons
# When set, users will be redirected to this external application URL
# If not set, users will be redirected to the placeholder trial page
NEXT_PUBLIC_APP_TRIAL_URL=https://app.tranzkit.com
```

**Key Points**:
- ✅ Uses `NEXT_PUBLIC_` prefix (required for client-side access in Next.js)
- ✅ Already in `.gitignore` (line 34: `.env*`)
- ✅ Will not be committed to version control
- ✅ Can be different for development, staging, and production environments

---

### 2. `src/components/ui/trial-cta-button.tsx` (Modified)

**Purpose**: Update the `handleClick` function to use the environment variable

**Before**:
```tsx
const handleClick = () => {
  if (!disabled) {
    router.push(`/${locale}/trial`);
  }
};
```

**After**:
```tsx
const handleClick = () => {
  if (!disabled) {
    // Check if external app URL is configured
    const appUrl = process.env.NEXT_PUBLIC_APP_TRIAL_URL;
    
    if (appUrl && typeof window !== 'undefined') {
      // Redirect to external application URL
      window.location.href = appUrl;
    } else {
      // Fallback to placeholder trial page
      router.push(`/${locale}/trial`);
    }
  }
};
```

**Key Changes**:
- ✅ Reads `NEXT_PUBLIC_APP_TRIAL_URL` from environment variables
- ✅ Checks if `window` is defined (prevents SSR errors)
- ✅ Uses `window.location.href` for external redirect (full page navigation)
- ✅ Falls back to placeholder trial page if environment variable is not set
- ✅ Type-safe implementation
- ✅ Handles edge cases (disabled state, SSR)

---

## 🎯 How It Works

### **Flow Diagram**

```
User clicks "Start Free Trial" button
           ↓
    handleClick() is called
           ↓
    Check if button is disabled
           ↓
    Read NEXT_PUBLIC_APP_TRIAL_URL
           ↓
    ┌─────────────────────────┐
    │ Is environment variable │
    │ set and window defined? │
    └─────────────────────────┘
           ↓                ↓
         YES              NO
           ↓                ↓
    window.location.href   router.push()
    = app URL              to /[locale]/trial
           ↓                ↓
    External redirect      Internal redirect
    to app.tranzkit.com    to placeholder page
```

---

## 🔍 Technical Details

### **Environment Variable Naming**

- **Prefix**: `NEXT_PUBLIC_` is required for client-side access in Next.js
- **Without prefix**: Variable is only available on the server-side
- **With prefix**: Variable is embedded in the client-side bundle at build time

### **Redirect Methods**

1. **External Redirect** (`window.location.href`):
   - Full page navigation
   - Leaves the current website
   - Navigates to external application
   - Browser history is updated

2. **Internal Redirect** (`router.push()`):
   - Client-side navigation
   - Stays within the Next.js app
   - No full page reload
   - Faster navigation

### **SSR Safety Check**

```tsx
if (appUrl && typeof window !== 'undefined') {
  window.location.href = appUrl;
}
```

- `typeof window !== 'undefined'` ensures code only runs in the browser
- Prevents errors during server-side rendering (SSR)
- Next.js pre-renders pages on the server where `window` is not available

---

## 🧪 Testing Instructions

### **1. Restart Development Server**

**Important**: Environment variables are loaded at build time, so you must restart the dev server:

```bash
# Stop the current dev server (Ctrl+C)
npm run dev
```

### **2. Test External Redirect (With Environment Variable)**

1. Start the dev server: `npm run dev`
2. Visit: `http://localhost:3000/en`
3. Click any "Start Free Trial" button (header, hero, pricing, etc.)
4. **Expected**: Browser redirects to `https://app.tranzkit.com`
5. **Verify**: URL in address bar changes to `https://app.tranzkit.com`

### **3. Test Fallback (Without Environment Variable)**

1. Stop the dev server
2. Rename `.env.local` to `.env.local.backup` (temporarily disable)
3. Start the dev server: `npm run dev`
4. Click any "Start Free Trial" button
5. **Expected**: Browser redirects to `http://localhost:3000/en/trial` (placeholder page)
6. **Verify**: Tranzkit logo, spinner, and "Redirecting to Application..." text appear
7. Rename `.env.local.backup` back to `.env.local`

### **4. Test Both Locales**

**English**:
- Visit: `http://localhost:3000/en`
- Click "Start Free Trial"
- **Expected**: Redirects to `https://app.tranzkit.com`

**Arabic**:
- Visit: `http://localhost:3000/ar`
- Click "ابدأ النسخة التجريبية المجانية"
- **Expected**: Redirects to `https://app.tranzkit.com`

### **5. Test All CTA Button Locations**

Click "Start Free Trial" buttons in these locations and verify redirect:

- [ ] Header navbar (all pages)
- [ ] Hero section (homepage)
- [ ] Pricing cards - Starter plan
- [ ] Pricing cards - Professional plan
- [ ] CTA section (homepage)
- [ ] Solutions main page
- [ ] Enterprises solutions page
- [ ] Operators solutions page

---

## 🔧 Configuration for Different Environments

### **Development** (`.env.local`)
```env
NEXT_PUBLIC_APP_TRIAL_URL=https://app.tranzkit.com
```

### **Staging** (`.env.staging` or Vercel environment variables)
```env
NEXT_PUBLIC_APP_TRIAL_URL=https://staging.app.tranzkit.com
```

### **Production** (`.env.production` or Vercel environment variables)
```env
NEXT_PUBLIC_APP_TRIAL_URL=https://app.tranzkit.com
```

### **Vercel Deployment**

When deploying to Vercel, add the environment variable in the Vercel dashboard:

1. Go to your project settings
2. Navigate to "Environment Variables"
3. Add:
   - **Key**: `NEXT_PUBLIC_APP_TRIAL_URL`
   - **Value**: `https://app.tranzkit.com`
   - **Environment**: Production, Preview, Development (select as needed)
4. Redeploy your application

---

## 📊 Implementation Stats

| Metric | Value |
|--------|-------|
| Files Created | 1 (`.env.local`) |
| Files Modified | 1 (`trial-cta-button.tsx`) |
| Lines Changed | 13 lines (added logic) |
| Type Check | ✅ Passed |
| Breaking Changes | None |
| Backward Compatible | ✅ Yes (fallback to placeholder) |

---

## ✅ Benefits of This Approach

1. **Flexibility**: Easy to change the application URL without modifying code
2. **Environment-Specific**: Different URLs for dev, staging, and production
3. **Security**: `.env.local` is not committed to version control
4. **Fallback**: Gracefully falls back to placeholder if environment variable is missing
5. **Type-Safe**: TypeScript-compatible implementation
6. **SSR-Safe**: Checks for `window` to prevent server-side errors
7. **Maintainable**: Single source of truth for the application URL

---

## 🔄 How to Change the Application URL

### **Option 1: Update `.env.local`**

Simply change the URL in `.env.local`:
```env
NEXT_PUBLIC_APP_TRIAL_URL=https://new-app-url.com
```

Then restart the dev server:
```bash
npm run dev
```

### **Option 2: Add Query Parameters**

If you need to pass additional data (e.g., referral source, campaign):

Update `.env.local`:
```env
NEXT_PUBLIC_APP_TRIAL_URL=https://app.tranzkit.com?source=website&campaign=free-trial
```

### **Option 3: Dynamic URL with Locale**

If you need locale-specific URLs, update `trial-cta-button.tsx`:

```tsx
const handleClick = () => {
  if (!disabled) {
    const appUrl = process.env.NEXT_PUBLIC_APP_TRIAL_URL;
    
    if (appUrl && typeof window !== 'undefined') {
      // Append locale to URL
      const urlWithLocale = `${appUrl}?lang=${locale}`;
      window.location.href = urlWithLocale;
    } else {
      router.push(`/${locale}/trial`);
    }
  }
};
```

---

## 🎉 Implementation Complete!

The "Start Free Trial" CTA buttons are now connected to the real Tranzkit application URL (`https://app.tranzkit.com`) using environment variables. The implementation is:

- ✅ **Flexible**: Easy to configure for different environments
- ✅ **Secure**: Environment variables not committed to version control
- ✅ **Robust**: Fallback to placeholder page if environment variable is missing
- ✅ **Type-Safe**: TypeScript-compatible
- ✅ **SSR-Safe**: Prevents server-side rendering errors
- ✅ **Tested**: Type check passed, no diagnostics

**Next Steps**:
1. Restart the dev server: `npm run dev`
2. Test clicking "Start Free Trial" buttons
3. Verify redirect to `https://app.tranzkit.com`
4. Test in both English and Arabic locales
5. Deploy to production with environment variable configured in Vercel

