# Blog Image Size Guide for Tranzkit

This guide provides recommended image sizes and specifications for blog posts to ensure optimal display across all devices and contexts.

---

## 📸 Featured Image Specifications

### **Recommended Size: 1200 x 675 pixels (16:9 aspect ratio)**

This is the **optimal size** that works perfectly for both:
- Blog listing cards
- Individual blog post hero images
- Social media sharing (Open Graph)

### Why 16:9 Aspect Ratio?
- **Universal standard** - Works across all platforms
- **Responsive** - Scales well on all screen sizes
- **Professional** - Industry standard for blog featured images
- **Social media** - Perfect for Facebook, Twitter, LinkedIn sharing

---

## 🎯 Image Usage Breakdown

### 1. **Blog Card (Listing Page)**
- **Display size**: 
  - Mobile: Full width × 224px height
  - Tablet: ~350px × 224px
  - Desktop: ~400px × 224px
- **Aspect ratio**: 16:9 (maintained via object-cover)
- **Recommended upload**: 1200 × 675px
- **File format**: JPG or WebP
- **File size**: < 200KB (optimized)

### 2. **Blog Post Hero Image**
- **Display size**:
  - Mobile: Full width × 400px height
  - Tablet: Full width × 500px height
  - Desktop: 1280px max-width × 600px height
- **Aspect ratio**: 16:9 (maintained via object-cover)
- **Recommended upload**: 1200 × 675px (same as card)
- **File format**: JPG or WebP
- **File size**: < 300KB (optimized)

### 3. **Social Media Sharing (Open Graph)**
- **Display size**: 1200 × 630px (Facebook/LinkedIn standard)
- **Recommended upload**: 1200 × 675px works well
- **Alternative**: 1200 × 630px for perfect social media fit
- **File format**: JPG or PNG
- **File size**: < 300KB

---

## 📐 Detailed Size Recommendations

### **Option 1: Single Size for Everything (Recommended)**
```
Dimensions: 1200 × 675 pixels
Aspect Ratio: 16:9
Format: JPG (optimized) or WebP
File Size: 150-250KB
Quality: 80-85%
```

**Pros:**
- ✅ One size fits all contexts
- ✅ Easy to manage
- ✅ Consistent look across site
- ✅ Good for social sharing

**Cons:**
- ⚠️ Slightly smaller than ideal for Open Graph (1200×630)

---

### **Option 2: Dual Size System (Advanced)**

#### **Featured Image (Primary)**
```
Dimensions: 1200 × 675 pixels
Aspect Ratio: 16:9
Use: Blog cards, blog post hero
```

#### **Social Share Image (Optional)**
```
Dimensions: 1200 × 630 pixels
Aspect Ratio: 1.91:1
Use: Open Graph, Twitter Cards
```

**Pros:**
- ✅ Perfect for social media
- ✅ Optimized for each context

**Cons:**
- ⚠️ Requires managing two images per post
- ⚠️ More work for content creators

---

## 🎨 Image Quality Guidelines

### **Resolution**
- **Minimum**: 1200 × 675px
- **Recommended**: 1200 × 675px
- **Maximum**: 1920 × 1080px (will be scaled down)

### **File Format**
1. **WebP** (Best) - Modern format, smaller file size, great quality
2. **JPG** (Good) - Universal support, good compression
3. **PNG** (Avoid) - Too large for photos, use only for graphics

### **Compression**
- **Quality**: 80-85% (sweet spot for JPG)
- **Target file size**: 150-250KB
- **Maximum file size**: 500KB

### **Color Space**
- **sRGB** (required for web)
- Avoid CMYK or other color spaces

---

## 🛠️ Image Optimization Tools

### **Online Tools (Free)**
1. **TinyPNG** - https://tinypng.com/
   - Excellent compression
   - Supports JPG and PNG
   
2. **Squoosh** - https://squoosh.app/
   - Google's image optimizer
   - WebP conversion
   - Side-by-side comparison

3. **ImageOptim** (Mac) - https://imageoptim.com/
   - Desktop app
   - Batch processing

### **Sanity Studio Integration**
Sanity automatically handles:
- ✅ Image hosting on CDN
- ✅ Automatic format conversion
- ✅ Responsive image URLs
- ✅ Lazy loading

---

## 📱 Responsive Behavior

### **How Images Display**

#### **Blog Card**
```
Mobile (< 768px):    Full width × 224px (16:9 crop)
Tablet (768-1024px): ~350px × 224px (16:9 crop)
Desktop (> 1024px):  ~400px × 224px (16:9 crop)
```

#### **Blog Post Hero**
```
Mobile (< 768px):    Full width × 400px (16:9 crop)
Tablet (768-1024px): Full width × 500px (16:9 crop)
Desktop (> 1024px):  1280px max × 600px (16:9 crop)
```

**Note**: All images use `object-fit: cover` which means:
- Image fills the container
- Maintains aspect ratio
- Crops excess (centered)

---

## ✅ Quick Checklist for Content Creators

Before uploading a blog featured image:

- [ ] **Size**: 1200 × 675 pixels (16:9)
- [ ] **Format**: JPG or WebP
- [ ] **File size**: < 250KB
- [ ] **Quality**: 80-85%
- [ ] **Color space**: sRGB
- [ ] **Subject**: Centered and visible when cropped
- [ ] **Text**: Avoid text on images (may be cropped)
- [ ] **Alt text**: Descriptive alt text added in Sanity

---

## 🎯 Best Practices

### **Composition**
1. **Keep important content centered** - Edges may be cropped on different screens
2. **Avoid text on images** - May become unreadable when scaled
3. **Use high contrast** - Ensures visibility with gradient overlay
4. **Consider the gradient** - Bottom portion will have dark overlay on cards

### **Content Guidelines**
1. **Relevant imagery** - Image should relate to blog content
2. **Professional quality** - Use high-quality stock photos or custom graphics
3. **Consistent style** - Maintain visual consistency across blog posts
4. **Brand colors** - Consider using brand colors when possible

### **Accessibility**
1. **Alt text** - Always provide descriptive alt text
2. **Contrast** - Ensure sufficient contrast for overlaid text
3. **File names** - Use descriptive file names (e.g., `blog-ai-transportation-2025.jpg`)

---

## 📊 Summary Table

| Context | Dimensions | Aspect Ratio | Max File Size | Format |
|---------|-----------|--------------|---------------|---------|
| **Blog Card** | 1200 × 675px | 16:9 | 200KB | JPG/WebP |
| **Blog Hero** | 1200 × 675px | 16:9 | 300KB | JPG/WebP |
| **Social Share** | 1200 × 630px | 1.91:1 | 300KB | JPG/PNG |
| **Recommended** | **1200 × 675px** | **16:9** | **150-250KB** | **JPG/WebP** |

---

## 🚀 Implementation in Sanity

When uploading images in Sanity Studio:

1. Go to your blog post
2. Upload featured image (1200 × 675px recommended)
3. Add descriptive alt text
4. Sanity will automatically:
   - Host on CDN
   - Generate responsive URLs
   - Optimize delivery
   - Enable lazy loading

---

## 💡 Pro Tips

1. **Use Unsplash or Pexels** for high-quality free stock photos
2. **Optimize before upload** - Don't rely on Sanity to compress
3. **Test on mobile** - Always check how images look on small screens
4. **Consistent style** - Use similar color palettes across posts
5. **Update old posts** - Gradually update old posts to new size standard

---

**Last Updated**: December 19, 2025
**Version**: 1.0

