# Sanity CMS Image Guidelines for Content Editors

This guide provides recommended image specifications for all image fields in the Tranzkit website's Sanity CMS.

## 📐 General Best Practices

- **File Format**: Use PNG for screenshots/UI images, JPEG for photos, SVG for logos
- **Color Space**: sRGB
- **Compression**: Optimize images before upload (use tools like TinyPNG, ImageOptim)
- **Max File Size**: Keep under 2MB per image (500KB recommended for web performance)
- **Naming**: Use descriptive names (e.g., `dashboard-overview.png` not `IMG_1234.png`)

---

## 🏠 Home Page Images

### 1. Hero Background Image
- **Field**: `homePage.hero.backgroundImage`
- **Recommended Size**: 1920×1080px (16:9)
- **Aspect Ratio**: 16:9
- **Format**: JPEG or PNG
- **Usage**: Background image for hero section (currently using animated canvas)
- **Notes**: Optional - currently not displayed

### 2. Feature Tabs Images
- **Field**: `homePage.featureTabs.tabs[].image`
- **Recommended Size**: 1600×1000px or any aspect ratio
- **Aspect Ratio**: Flexible (any aspect ratio works)
- **Format**: PNG (for screenshots) or JPEG (for photos)
- **Display**: `object-contain` in 400px height container - shows full image with padding
- **Usage**: Feature demonstration images/screenshots
- **Examples**: Dashboard screenshots, feature highlights, UI mockups
- **Notes**: ✅ Full image will ALWAYS be visible. Images scale to fit 400px height. No cropping occurs regardless of aspect ratio.

### 3. Screenshot Carousel Images
- **Field**: `homePage.screenshotCarousel.items[].image`
- **Recommended Size**: 1600×1000px or any aspect ratio
- **Aspect Ratio**: Flexible (any aspect ratio works)
- **Format**: PNG (for screenshots)
- **Display**: `object-contain` in 400px height container - shows full image with padding
- **Usage**: App screenshots, product demos
- **Examples**: Dashboard views, mobile app screens, feature showcases
- **Notes**: ✅ Full screenshot will ALWAYS be visible. Images scale to fit 400px height. No cropping occurs regardless of aspect ratio.

### 4. Logo Bar - Partner Logos
- **Field**: `homePage.logoBar.logos[]`
- **Recommended Size**: 400×200px (2:1) or 300×300px (1:1)
- **Aspect Ratio**: Flexible (logos vary)
- **Format**: PNG with transparent background or SVG
- **Display**: `object-contain` - shows full logo with padding
- **Usage**: Partner/client company logos
- **Notes**: Logos should have transparent backgrounds. Will be displayed with padding.

### 5. Testimonials - Avatar Images
- **Field**: `homePage.testimonials.items[].avatar`
- **Recommended Size**: 400×400px (1:1)
- **Aspect Ratio**: 1:1 (square)
- **Format**: JPEG
- **Display**: Circular crop
- **Usage**: Customer/testimonial author photos
- **Notes**: Will be displayed as circular avatars. Center faces in the image.

---

## 📱 App Pages

### 6. App Screenshots
- **Field**: `app.screenshots[]`
- **Recommended Size**: 1600×1000px (16:10) for desktop, 750×1334px (9:16) for mobile
- **Aspect Ratio**: 16:10 (desktop) or 9:16 (mobile)
- **Format**: PNG
- **Display**: `object-contain` - shows full screenshot with padding
- **Usage**: App screenshot galleries, feature showcases
- **Notes**: Use high-quality screenshots. Remove sensitive data. Full screenshots will be visible.

---

## 🎯 Solutions Pages

### 7. Solutions Hero Background
- **Field**: Various solution pages may have hero backgrounds
- **Recommended Size**: 1920×1080px (16:9)
- **Aspect Ratio**: 16:9
- **Format**: JPEG or PNG
- **Usage**: Hero section backgrounds
- **Notes**: Should be subtle/low contrast to not interfere with text

### 8. Dashboard Preview Carousels
- **Recommended Size**: 1600×1000px (16:10)
- **Aspect Ratio**: 16:10
- **Format**: PNG
- **Usage**: Dashboard screenshots for operators/enterprises
- **Notes**: Currently using hardcoded images, will be migrated to Sanity

---

## 👥 About/Team Pages

### 9. Team Member Photos
- **Field**: `teamMember.image`
- **Recommended Size**: 800×800px (1:1)
- **Aspect Ratio**: 1:1 (square)
- **Format**: JPEG
- **Display**: May be displayed as circular or rounded square
- **Usage**: Team member profile photos
- **Notes**: Professional headshots with neutral backgrounds work best

---

## 🔧 Technology & Features

### 10. Technology Item Images
- **Field**: `technologyItem.image`
- **Recommended Size**: 600×600px (1:1)
- **Aspect Ratio**: 1:1 (square)
- **Format**: PNG or SVG
- **Usage**: Technology logos, integration icons
- **Notes**: Transparent backgrounds recommended

### 11. Feature Item Images
- **Field**: `featureItem.image`
- **Recommended Size**: 800×600px (4:3)
- **Aspect Ratio**: 4:3
- **Format**: PNG or JPEG
- **Usage**: Optional feature illustrations
- **Notes**: Optional field - icons are primary visual

### 12. Workflow Step Images
- **Field**: `workflowStep.image`
- **Recommended Size**: 800×600px (4:3)
- **Aspect Ratio**: 4:3
- **Format**: PNG or JPEG
- **Usage**: Process/workflow illustrations
- **Notes**: Should clearly illustrate the step

---

## 🌐 SEO & Social

### 13. Open Graph Images
- **Field**: `seo.ogImage`
- **Recommended Size**: 1200×630px (1.91:1)
- **Aspect Ratio**: 1.91:1 (Facebook/LinkedIn standard)
- **Format**: JPEG or PNG
- **Usage**: Social media sharing previews
- **Notes**: Include branding and key message. Text should be large and readable.

### 14. Site Logo
- **Field**: `siteSettings.logo`
- **Recommended Size**: 400×100px or SVG
- **Aspect Ratio**: Flexible (typically 4:1 or 3:1)
- **Format**: SVG (preferred) or PNG with transparent background
- **Usage**: Header logo, footer logo
- **Notes**: Should work on both light and dark backgrounds

### 15. Favicon
- **Field**: `siteSettings.favicon`
- **Recommended Size**: 512×512px (1:1)
- **Aspect Ratio**: 1:1 (square)
- **Format**: PNG or ICO
- **Usage**: Browser tab icon
- **Notes**: Should be simple and recognizable at small sizes

---

## 🎨 Image Display Modes

### `object-contain` ⭐ (Recommended for Screenshots)
- **Behavior**: Shows the entire image with padding, no cropping
- **Use When**: You want to show the complete image without any parts cut off
- **Best For**: Screenshots, mockups, UI images, logos, icons
- **Used In**: Feature tabs, screenshot carousel, app screenshots, logo bar, technology items
- **Why**: Ensures users can see the full screenshot/mockup without missing any details

### `object-cover`
- **Behavior**: Fills the entire container, may crop edges
- **Use When**: You want the image to fill the space completely (rare for screenshots)
- **Best For**: Backgrounds, hero images, decorative photos
- **Used In**: Hero backgrounds, decorative images
- **Warning**: Not recommended for screenshots as it will crop important UI elements

---

## ✅ Quick Reference Table

| Image Type | Size | Aspect Ratio | Format | Display Mode |
|------------|------|--------------|--------|--------------|
| Feature Tabs | 1200×900px | 4:3 | PNG/JPEG | object-contain |
| Screenshot Carousel | 1600×1000px | 16:10 | PNG | object-contain |
| Partner Logos | 400×200px | 2:1 | PNG/SVG | object-contain |
| Testimonial Avatars | 400×400px | 1:1 | JPEG | Circular |
| App Screenshots | 1600×1000px | 16:10 | PNG | object-contain |
| Team Photos | 800×800px | 1:1 | JPEG | Circular/Square |
| OG Images | 1200×630px | 1.91:1 | JPEG/PNG | - |
| Site Logo | SVG or 400×100px | 4:1 | SVG/PNG | - |

---

## 🚀 Image Optimization Tips

1. **Compress Before Upload**: Use TinyPNG, ImageOptim, or Squoosh
2. **Remove Metadata**: Strip EXIF data for privacy and smaller file size
3. **Use Correct Format**:
   - PNG: Screenshots, images with transparency, graphics with text
   - JPEG: Photos, images with gradients
   - SVG: Logos, icons, simple graphics
4. **Test on Different Devices**: Check how images look on mobile, tablet, and desktop
5. **Use Hotspot Feature**: In Sanity, set the hotspot to ensure important parts of the image are always visible when cropped

---

## 📝 Notes

- All images are automatically optimized by Sanity's image CDN
- The `urlFor()` function generates responsive images at different sizes
- Images with `object-cover` may be cropped - keep important content centered
- Use Sanity's hotspot feature to control which part of the image is prioritized when cropping

