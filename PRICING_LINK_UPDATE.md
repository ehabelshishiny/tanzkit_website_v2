# Pricing Link Update - External URL with Theme & Language Parameters

## Overview
Updated the Pricing navigation link to open an external URL in a new tab instead of navigating to the internal pricing page. The external URL includes dynamic theme and language parameters.

## Changes Made

### 1. Updated `src/components/layout/header-client.tsx`

**Added:**
- Import `useTheme` from `next-themes` and `useEffect` from `react`
- `mounted` state to prevent hydration mismatch
- `useEffect` hook to set mounted state after client-side hydration
- Helper function `isPricingLink()` to detect pricing links
- Helper function `getPricingUrl()` to build the external URL with theme and language
- Helper function `handlePricingClick()` to handle the click event and open in new tab

**Modified:**
- Desktop navigation: Added conditional rendering for pricing link to use `<a>` tag with `target="_blank"`
- Mobile navigation: Added conditional rendering for pricing link with same behavior

**Hydration Fix:**
- Uses `mounted` state to ensure theme value is only used after client-side mount
- Prevents server/client mismatch by defaulting to 'light' theme during SSR

### 2. Updated `src/components/navigation/mobile-nav.tsx`

**Added:**
- Import `useTheme` from `next-themes` and `useEffect` from `react`
- `mounted` state to prevent hydration mismatch
- `useEffect` hook to set mounted state after client-side hydration
- Same helper functions as header-client.tsx

**Modified:**
- Mobile sheet navigation: Added conditional rendering for pricing link

**Hydration Fix:**
- Same hydration mismatch prevention as header-client.tsx

## URL Format

The pricing link now opens:
```
https://operator.tranzkit.com/signup?theme={theme}&lang={lang}
```

### Parameters
- `theme`: `dark` | `light` (dynamically set based on current theme)
- `lang`: `en` | `ar` (dynamically set based on current locale)

### Examples
- English + Light theme: `https://operator.tranzkit.com/signup?theme=light&lang=en`
- Arabic + Dark theme: `https://operator.tranzkit.com/signup?theme=dark&lang=ar`

## Behavior

1. **Desktop Navigation**: Clicking "Pricing" opens the external URL in a new tab
2. **Mobile Navigation**: Clicking "Pricing" opens the external URL in a new tab and closes the mobile menu
3. **Design**: All styling remains unchanged - the link looks and behaves exactly like other navigation items
4. **Accessibility**: Proper `rel="noopener noreferrer"` attributes added for security

## Testing Checklist

- [ ] Desktop navigation - Pricing link opens in new tab
- [ ] Mobile navigation - Pricing link opens in new tab
- [ ] Theme parameter is correct (light/dark)
- [ ] Language parameter is correct (en/ar)
- [ ] Styling matches other navigation items
- [ ] Mobile menu closes after clicking pricing link
- [ ] No console errors
- [ ] Works in both English and Arabic locales

## Files Modified

1. `src/components/layout/header-client.tsx`
2. `src/components/navigation/mobile-nav.tsx`

## Notes

- The internal pricing page at `/${locale}/pricing` still exists but is no longer linked from the navigation
- If you want to remove the internal pricing page entirely, you can delete `src/app/[locale]/(main)/pricing/page.tsx` and related components
- The implementation follows the same pattern as the existing `trial-cta-button.tsx` component

