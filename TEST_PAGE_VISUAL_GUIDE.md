# Test Page Visual Guide

## Header Navigation Changes

### Desktop View
```
┌─────────────────────────────────────────────────────────────────────────┐
│  [Logo]  Home  Solutions  Resources  Apps  Pricing  About  Contact      │
│                                                                           │
│                                    [🌙] [🌐 EN] [Test] [Start Free Trial]│
└─────────────────────────────────────────────────────────────────────────┘
                                              ↑
                                         NEW BUTTON
```

**Location:** Right side of header, between Language Switcher and "Start Free Trial" button
**Style:** Outline button, small size
**Label:** "Test"

### Mobile View
```
┌─────────────────────────────────┐
│  [Logo]              [☰ Menu]   │
└─────────────────────────────────┘

When menu is open:
┌─────────────────────────────────┐
│  Home                           │
│  Solutions                      │
│  Resources                      │
│  Apps                           │
│  Pricing                        │
│  About                          │
│  Contact                        │
│  ─────────────────────────────  │
│  Test (Dev)          ← NEW      │
└─────────────────────────────────┘
```

**Location:** Bottom of mobile menu, below a separator line
**Style:** Muted text link
**Label:** "Test (Dev)"

## Test Page Layout

### Full Page View
```
┌─────────────────────────────────────────────────────────────────────────┐
│                          HEADER (with Test button)                       │
├─────────────────────────────────────────────────────────────────────────┤
│                                                                           │
│    ╔═══════════════════════════════════════════════════════════════╗    │
│    ║                                                               ║    │
│    ║         🚗 ← Animated car moving along S-path                ║    │
│    ║                                                               ║    │
│    ║    ● ─── ● ─── ●  ← Network nodes with connections          ║    │
│    ║                                                               ║    │
│    ║                  ┌─────────────────────────┐                 ║    │
│    ║                  │  Component Testing Area │                 ║    │
│    ║                  │                         │                 ║    │
│    ║                  │  This page uses the     │                 ║    │
│    ║                  │  animated background... │                 ║    │
│    ║                  └─────────────────────────┘                 ║    │
│    ║                                                               ║    │
│    ║         🚗 ← Another car moving opposite direction           ║    │
│    ║                                                               ║    │
│    ║    ● ─── ● ─── ●  ← More network nodes                      ║    │
│    ║                                                               ║    │
│    ╚═══════════════════════════════════════════════════════════════╝    │
│                     ANIMATED BACKGROUND CANVAS                           │
│                                                                           │
├─────────────────────────────────────────────────────────────────────────┤
│                               FOOTER                                     │
└─────────────────────────────────────────────────────────────────────────┘
```

### Background Animation Features

1. **Animated Vehicles (Cars)**
   - Two cars moving along S-shaped paths
   - One blue car (#5090F6) moving top-right to bottom-left
   - One teal car (#7CE3D8) moving bottom-left to top-right
   - Smooth animation with proper rotation
   - SVG-based car graphics

2. **Network Nodes**
   - Pulsing circular nodes
   - Floating animation (gentle up/down movement)
   - Teal color with glow effect
   - Inner white dot for depth

3. **Connection Lines**
   - Dashed lines connecting nearby nodes
   - Animated pulse effect (opacity changes)
   - Simulates road network

4. **Background Pattern**
   - Grid of floating nodes
   - Random positioning with slight offsets
   - Connections between nearby nodes
   - Theme-aware colors (adapts to light/dark mode)

5. **Parallax Effects**
   - Canvas moves slower than scroll (0.2x speed)
   - Creates depth perception

## Theme Support

### Light Mode
```
Background: White/Light gray gradient
Nodes: Teal with lower opacity
Lines: Light gray with subtle teal tint
Cars: Blue and Teal (vibrant)
```

### Dark Mode
```
Background: Dark slate gradient
Nodes: Teal with higher opacity and glow
Lines: Darker gray with teal tint
Cars: Blue and Teal (vibrant)
```

## Usage Scenarios

### Scenario 1: Testing a New Component
```tsx
// Remove the centered message
// Add your component

<div className="relative z-20 container mx-auto px-6 py-20">
  <YourNewComponent />
</div>
```

### Scenario 2: Testing Multiple Components
```tsx
<div className="relative z-20 container mx-auto px-6 py-20 space-y-12">
  <ComponentA />
  <ComponentB />
  <ComponentC />
</div>
```

### Scenario 3: Full-Screen Component Test
```tsx
// Remove the centered message completely
// Add a full-screen component

<div className="absolute inset-0 z-20 flex items-center justify-center">
  <YourFullScreenComponent />
</div>
```

## Key CSS Classes

### Hiding Hero Content
```css
.test-page-hero section > div:not(:first-child) {
  display: none !important;
}
.test-page-hero section > canvas {
  display: block !important;
}
```

This ensures:
- ✅ Canvas (background) remains visible
- ✅ All text content is hidden
- ✅ All buttons are hidden
- ✅ Scroll indicator is hidden

### Z-Index Layers
```
z-0  : Background canvas
z-10 : (Reserved for hero content - hidden)
z-20 : Your test components
z-50 : Header (sticky)
```

## Responsive Behavior

### Desktop (≥768px)
- Full animated background
- Test button visible in header
- Centered message with backdrop blur

### Mobile (<768px)
- Scaled animated background
- Test link in mobile menu
- Responsive centered message

## Performance Notes

- Canvas uses `requestAnimationFrame` for 60fps
- Passive scroll listeners for better performance
- Device pixel ratio handled for sharp rendering
- Animations pause when tab is not visible (browser optimization)

## Cleanup Instructions

When you're done testing and want to remove this feature:

1. **Delete the test page:**
   ```bash
   rm -rf src/app/[locale]/(main)/test
   ```

2. **Remove Test button from header:**
   - Open `src/components/layout/header.tsx`
   - Remove the Test button code (lines with "Test Button" comments)
   - Adjust the `min-w` value back to original

3. **Delete documentation:**
   ```bash
   rm TEST_PAGE_IMPLEMENTATION.md
   rm TEST_PAGE_VISUAL_GUIDE.md
   ```

