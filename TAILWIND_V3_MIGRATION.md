# Tailwind CSS v4 → v3 Migration Guide

## Why Migrate?

**Current Issue**: Tailwind CSS v4 is experimental/alpha and causing:
- ❌ Missing utility classes (`object-cover`, `object-contain`)
- ❌ Incomplete CSS generation
- ❌ Potential compatibility issues with Next.js 16
- ❌ Unpredictable behavior in production

**Solution**: Downgrade to Tailwind CSS v3 (stable, production-ready)

## Migration Steps

### Step 1: Update package.json

**Remove v4 packages**:
```json
"@tailwindcss/postcss": "^4",
"tailwindcss": "^4",
```

**Add v3 packages**:
```json
"tailwindcss": "^3.4.17",
"autoprefixer": "^10.4.20",
```

### Step 2: Update postcss.config.mjs

**Current (v4)**:
```js
const config = {
  plugins: {
    "@tailwindcss/postcss": {},
  },
};
```

**New (v3)**:
```js
const config = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
};
```

### Step 3: Create tailwind.config.ts

Create a new file with v3 configuration (see below)

### Step 4: Update globals.css

**Current (v4)**:
```css
@import "tailwindcss";
@import "tw-animate-css";

@theme inline {
  /* ... */
}
```

**New (v3)**:
```css
@tailwind base;
@tailwind components;
@tailwind utilities;

/* Keep all custom CSS */
```

### Step 5: Clean and Rebuild

```bash
rm -rf .next node_modules package-lock.json
npm install
npm run dev
```

## Expected Results

After migration:
- ✅ All Tailwind utilities work (`object-cover`, `object-contain`, etc.)
- ✅ Consistent CSS generation
- ✅ Better Next.js compatibility
- ✅ Production-ready stability
- ✅ Proper image styling

## Files to Modify

1. `package.json` - Update dependencies
2. `postcss.config.mjs` - Update PostCSS plugins
3. `tailwind.config.ts` - Create new config file
4. `src/app/globals.css` - Update Tailwind directives

## Estimated Time

- 10-15 minutes for migration
- 5 minutes for testing
- **Total: ~20 minutes**

## Risk Assessment

- **Risk**: Low (downgrading to stable version)
- **Impact**: High (fixes fundamental CSS issues)
- **Reversibility**: High (can upgrade back if needed)

## Next Steps

1. Approve migration
2. I'll make all necessary changes
3. Test that utilities work
4. Verify images display correctly

