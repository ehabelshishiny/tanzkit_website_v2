# Card Components Reference - Tranzkit Website

This document provides a comprehensive reference for all card components used in the Tranzkit website.

---

## Table of Contents

1. [3D Card Base Components](#1-3d-card-base-components)
2. [AppCard3DVariant](#2-appcard3dvariant)
3. [AppCard (with use3D flag)](#3-appcard-with-use3d-flag)
4. [AppCard (Standard)](#4-appcard-standard)
5. [Standard Card (shadcn/ui)](#5-standard-card-shadcnui)
6. [AudienceCard](#6-audiencecard)
7. [Usage Summary](#7-usage-summary)

---

## 1. 3D Card Base Components

### Component Names
- `CardContainer`
- `CardBody`
- `CardItem`

### File Location
`src/components/ui/3d-card.tsx`

### Purpose/Description
These are the foundational 3D card components that provide perspective-based hover effects. They create an interactive 3D tilt effect that follows the user's mouse movement.

### Key Props/Configuration

**CardContainer:**
```typescript
{
  children?: React.ReactNode;
  className?: string;
  containerClassName?: string;
}
```

**CardBody:**
```typescript
{
  children?: React.ReactNode;
  className?: string;
}
```

**CardItem:**
```typescript
{
  as?: React.ElementType; // Default: "div"
  children?: React.ReactNode;
  className?: string;
  translateX?: number; // Default: 0
  translateY?: number; // Default: 0
  translateZ?: number; // Default: 0 (higher values appear closer)
  rotateX?: number; // Default: 0
  rotateY?: number; // Default: 0
  rotateZ?: number; // Default: 0
}
```

### Visual Characteristics
- **3D Perspective Effect**: Card tilts based on mouse position
- **Depth Layering**: Elements with higher `translateZ` values appear closer to the viewer
- **Smooth Transitions**: All transforms animate smoothly on mouse enter/leave
- **Mouse Tracking**: Card rotation follows cursor movement within the card bounds
- **Reset on Leave**: Card returns to original position when mouse leaves

### Where It's Used
- Base component for `AppCard3DVariant`
- Base component for `AppCard` with `use3D={true}`
- Testimonials section (all 3 testimonial cards)

### Technical Implementation
- Uses CSS `perspective: 1000px` for 3D space
- Uses `transform-style: preserve-3d` to maintain 3D transforms on children
- Calculates rotation angles based on mouse position relative to card center
- Context API to share mouse enter state between components

---

## 2. AppCard3DVariant

### Component Name
`AppCard3DVariant`

### File Location
`src/components/ui/app-card-3d-variant.tsx`

### Purpose/Description
A specialized 3D card variant designed for the apps showcase page. Features a clean layout with title, tagline, image, description, and dual CTA buttons. Supports different image aspect ratios for mobile vs desktop apps.

### Key Props/Configuration
```typescript
{
  id: string;
  name: string;
  tagline: string;
  description: string;
  iconName: IconName;
  image?: string;
  appType?: 'mobile' | 'desktop'; // Determines image aspect ratio
  gradient: string;
  accentColor: string;
}
```

### Visual Characteristics
- **Layout Structure**: Title → Tagline → Image → Description → Dual CTAs
- **3D Hover Effect**: Full perspective tilt with mouse tracking
- **Image Aspect Ratios**:
  - Desktop apps: `h-40` (landscape/shorter height)
  - Mobile apps: `h-60` (portrait/taller height)
- **Fixed Width**: `sm:w-[24rem]` on larger screens
- **Depth Layers**:
  - Title: `translateZ="50"`
  - Tagline: `translateZ="60"`
  - Image: `translateZ="100"` (most prominent)
  - Description: `translateZ="60"`
  - CTA Buttons: `translateZ={20}`
- **Styling**: Light gray background (`bg-gray-50`) in light mode, black (`dark:bg-black`) in dark mode
- **Shadow Effects**: Enhanced shadow on hover (`dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1]`)
- **Dual CTAs**: "Learn More" link and "Get Started" button at the bottom

### Where It's Used
- **Apps Showcase Page** (`/apps`):
  - All 5 app cards (Supervisor, Driver, Rider, Operator Dashboard, Enterprise Dashboard)
  - Desktop apps (Operator Dashboard, Enterprise Dashboard) in top row (2 cards side-by-side)
  - Mobile apps (Supervisor, Driver, Rider) in bottom row (3 cards in a row)

### Configuration in Apps Config
All apps in `src/config/apps.ts` have `use3DVariant: true` flag set.

### Example Usage
```tsx
<AppCard3DVariant
  id="rider"
  name="Rider App"
  tagline="Book rides in seconds"
  description="Fast, safe, and reliable transportation"
  iconName="UserCircle"
  image="/testimage.jpg"
  appType="mobile"
  gradient="from-purple-500/10 via-pink-500/10 to-purple-600/10"
  accentColor="#A855F7"
/>
```

---

## 3. AppCard (with use3D flag)

### Component Name
`AppCard` (with `use3D={true}`)

### File Location
`src/components/ui/app-card.tsx` (lines 74-138)

### Purpose/Description
An alternative 3D card layout for app showcase cards. Features image at the top, followed by icon badge, title, tagline, description, and a single CTA. This variant is no longer actively used in the apps showcase but remains available.

### Key Props/Configuration
```typescript
{
  id: string;
  name: string;
  tagline: string;
  description: string;
  iconName: IconName;
  image?: string;
  appType?: 'mobile' | 'desktop';
  gradient: string;
  accentColor: string;
  use3D: true; // Activates this variant
  use3DVariant?: boolean;
}
```

### Visual Characteristics
- **Layout Structure**: Image → Icon Badge → Title/Tagline → Description → CTA
- **3D Hover Effect**: Full perspective tilt with mouse tracking
- **Image Position**: Top of card (full-width, `h-48`)
- **Icon Badge**: Rounded square with backdrop blur effect (`bg-card/80 backdrop-blur-sm`)
- **Depth Layers**:
  - Container: `translateZ="50"`
  - Image: `translateZ="70"`
  - Icon Badge: `translateZ="80"` (most prominent)
  - Title/Tagline: `translateZ="60"`
  - Description: `translateZ="40"`
  - CTA: `translateZ="50"`
- **Gradient Background**: Uses gradient from app config
- **Content Padding**: `px-8 pb-8`
- **Single CTA**: "Learn More" link with arrow icon

### Where It's Used
- Previously used for Supervisor and Driver apps
- Currently not actively used (all apps now use `AppCard3DVariant`)
- Code remains available for future use

---

## 4. AppCard (Standard)

### Component Name
`AppCard` (standard variant, no 3D flags)

### File Location
`src/components/ui/app-card.tsx` (lines 140-203)

### Purpose/Description
A standard non-3D card variant for app showcase. Uses Framer Motion for subtle hover animations instead of 3D perspective effects.

### Key Props/Configuration
```typescript
{
  id: string;
  name: string;
  tagline: string;
  description: string;
  iconName: IconName;
  image?: string;
  appType?: 'mobile' | 'desktop';
  gradient: string;
  accentColor: string;
  use3D: false; // Default
  use3DVariant: false; // Default
}
```

### Visual Characteristics
- **Layout Structure**: Image → Icon Badge → Title/Tagline → Description → CTA
- **Hover Animation**: Subtle scale (`scale: 1.02`) and lift (`y: -4`) on hover
- **No 3D Effect**: Flat card with standard hover animations
- **Framer Motion**: Fade-in animation on scroll into view
- **Gradient Background**: Uses gradient from app config
- **Shadow Effects**: `shadow-lg` default, `hover:shadow-2xl` on hover

### Where It's Used
- Currently not actively used in the apps showcase
- Available as a fallback option

---

## 5. Standard Card (shadcn/ui)

### Component Names
- `Card`
- `CardHeader`
- `CardTitle`
- `CardDescription`
- `CardContent`
- `CardFooter`

### File Location
`src/components/ui/card.tsx`

### Purpose/Description
Standard shadcn/ui card components for general-purpose content containers. Provides a consistent card design system across the website.

### Key Props/Configuration
All components accept standard React div props plus:
```typescript
{
  className?: string;
  ...props: React.ComponentProps<"div">
}
```

### Visual Characteristics
- **Background**: `bg-card` (theme-aware)
- **Border**: Standard border with `border` class
- **Rounded Corners**: `rounded-xl`
- **Shadow**: `shadow-sm`
- **Padding**: `py-6` on card, `px-6` on header/content/footer
- **Gap**: `gap-6` between sections
- **Text Color**: `text-card-foreground`

### Where It's Used
- Previously used in testimonials section (now replaced with 3D cards)
- General content sections throughout the website
- Form containers
- Information panels

### Example Usage
```tsx
<Card>
  <CardHeader>
    <CardTitle>Card Title</CardTitle>
    <CardDescription>Card description text</CardDescription>
  </CardHeader>
  <CardContent>
    <p>Card content goes here</p>
  </CardContent>
  <CardFooter>
    <Button>Action</Button>
  </CardFooter>
</Card>
```

---

## 6. AudienceCard

### Component Name
`AudienceCard`

### File Location
`src/components/ui/audience-card.tsx`

### Purpose/Description
A specialized card component for the Solutions page audience cards section. Features large clickable cards with benefits lists and CTAs for different audience segments (Operators & Drivers, Enterprises & Passengers).

### Key Props/Configuration
```typescript
{
  title: string;
  description: string;
  benefits: string[];
  ctaText: string;
  ctaLink: string;
  icon?: ReactNode;
  gradient?: string; // Default: 'from-primary/10 to-accent/10'
  className?: string;
}
```

### Visual Characteristics
- **Large Clickable Card**: Entire card is a link
- **Gradient Background**: Customizable gradient backgrounds
- **Hover Effects**: Scale (`scale: 1.03`) and lift (`y: -8`) on hover
- **Icon Support**: Optional icon with rounded background
- **Benefits List**: Checkmark-style list of benefits
- **CTA Button**: Arrow icon with text
- **Framer Motion**: Fade-in animation on scroll
- **Padding**: `p-8 md:p-10` for spacious layout
- **Border**: `border border-border`
- **Shadow**: `shadow-lg` default, `hover:shadow-2xl` on hover

### Where It's Used
- **Solutions Page** (`/solutions`):
  - Operators & Drivers card
  - Enterprises & Passengers card
- **Audience Cards Section**: `src/components/sections/solutions/audience-cards-section.tsx`

### Example Usage
```tsx
<AudienceCard
  title="For Operators & Drivers"
  description="Manage fleets with precision"
  benefits={[
    'Dynamic routing and scheduling',
    'Live dashboards and alerts',
    'Automated dispatch',
    'Driver-friendly mobile experience'
  ]}
  ctaText="Optimize Your Fleet"
  ctaLink="/solutions/operators-drivers"
  gradient="from-primary/10 to-chart-1/10"
/>
```

---

## 7. Usage Summary

### Current Active Card Components

| Component | Location | Used In | Count |
|-----------|----------|---------|-------|
| **AppCard3DVariant** | `app-card-3d-variant.tsx` | Apps showcase page (`/apps`) | 5 cards |
| **3D Card Base** | `3d-card.tsx` | Testimonials section | 3 cards |
| **AudienceCard** | `audience-card.tsx` | Solutions page | 2 cards |
| **Standard Card** | `card.tsx` | Various sections | Multiple |

### Apps Showcase Layout (`/apps`)

**Desktop Apps (Top Row - 2 cards):**
- Operator Dashboard (`appType: 'desktop'`, landscape image)
- Enterprise Dashboard (`appType: 'desktop'`, landscape image)

**Mobile Apps (Bottom Row - 3 cards):**
- Supervisor App (`appType: 'mobile'`, portrait image)
- Driver App (`appType: 'mobile'`, portrait image)
- Rider App (`appType: 'mobile'`, portrait image)

All use `AppCard3DVariant` with `use3DVariant: true`.

### Testimonials Section

All 3 testimonial cards use the 3D card base components:
- John Doe (CEO, Transport Co.)
- Jane Smith (Operations Manager)
- Mike Johnson (Fleet Director)

### Key Configuration Flags

**In `src/config/apps.ts`:**
- `use3DVariant: true` - All 5 apps use this flag
- `appType: 'mobile' | 'desktop'` - Determines image aspect ratio
- `image: '/testimage.jpg'` - Placeholder image for all apps

**Removed Flags:**
- `use3DCard` - No longer used (replaced by `use3DVariant`)

---

## Technical Notes

### 3D Card Implementation Details

1. **Perspective**: All 3D cards use `perspective: 1000px` for depth
2. **Transform Style**: `preserve-3d` maintains 3D transforms on children
3. **Mouse Tracking**: Rotation calculated as `(mousePos - center) / 25`
4. **Smooth Transitions**: All transforms use `transition-all duration-200 ease-linear`
5. **Reset Behavior**: Cards return to `rotateY(0deg) rotateX(0deg)` on mouse leave

### Image Aspect Ratios

- **Desktop Apps**: `h-40` (160px) - Landscape orientation
- **Mobile Apps**: `h-60` (240px) - Portrait orientation
- **Standard Cards**: `h-48` (192px) - Default height

### Responsive Behavior

**Apps Grid:**
- Mobile: Stack all cards vertically
- Tablet: 2 columns for mobile apps
- Desktop: 2 columns for desktop apps, 3 columns for mobile apps

**Testimonials:**
- Mobile: Stack vertically
- Desktop: 3 columns

---

## Migration History

### Recent Changes

1. **All Apps to 3D Variant**: Changed all 5 apps from mixed card types to `AppCard3DVariant`
2. **Testimonials to 3D**: Applied 3D card effect to all 3 testimonial cards
3. **Layout Redesign**: Implemented 2-top + 3-bottom layout for apps grid
4. **Image Aspect Ratios**: Added `appType` prop to support landscape/portrait images

### Deprecated Patterns

- `use3DCard: true` flag (replaced by `use3DVariant: true`)
- Mixed card types in apps showcase (now all use same variant)
- Standard cards in testimonials (now all use 3D cards)

---

**Last Updated**: 2025-11-20
**Maintained By**: Tranzkit Development Team

