# New Website Project Prompt - Tranzkit Tech Stack

> **Copy and paste this prompt to an AI assistant to build a new website using the Tranzkit tech stack**

---

## 🚀 Project Setup Prompt

```
I want to build a new website with the following tech stack:

**Framework & Core:**
- Next.js 16.0.1 (App Router, Server Components, Turbopack)
- React 19.2.0
- TypeScript 5 (strict mode)
- Path aliases: @/* → ./src/*

**Styling:**
- Tailwind CSS v4 with OKLCH color space
- CSS variables for theming
- Dark mode support with next-themes 0.4.6
- tw-animate-css for animations

**UI Components:**
- shadcn/ui components (Radix UI primitives)
- Lucide React icons
- Custom components with class-variance-authority

**Animation:**
- Framer Motion 12.23.24 for complex animations
- CSS keyframes for simple effects
- GSAP 3.13.0 for advanced timelines
- Lenis 1.3.15 for smooth scrolling

**Internationalization:**
- next-intl 4.5.1 for i18n
- Support for multiple languages (specify: English, Arabic, etc.)
- RTL support for Arabic/Hebrew

**Forms & Validation:**
- React Hook Form 7.66.0
- Zod 4.1.12 for schema validation
- @hookform/resolvers for integration

**State Management:**
- Zustand 5.0.8 for global state
- TanStack Query 5.90.8 for server state

**Additional Features:**
- MDX support for content
- Embla Carousel for sliders
- Sharp for image optimization
- Three.js + React Three Fiber (if 3D graphics needed)

**Project Requirements:**
[DESCRIBE YOUR PROJECT HERE]

Example:
- Project Name: [Your Project Name]
- Industry: [e.g., SaaS, E-commerce, Portfolio]
- Pages Needed: [e.g., Home, About, Services, Contact]
- Key Features: [e.g., Dark mode, Multi-language, Contact form, Blog]
- Brand Colors: [e.g., Primary: #1F6FB2, Secondary: #27B889]
- Design Style: [e.g., Modern, Minimal, Corporate]

**Setup Instructions:**
1. Initialize Next.js project with TypeScript, Tailwind, App Router, and Turbopack
2. Install all dependencies from the tech stack above
3. Set up folder structure: src/app, src/components, src/lib
4. Configure internationalization with next-intl
5. Set up theming with next-themes and CSS variables
6. Create reusable animation variants
7. Build responsive, accessible components
8. Implement dark mode
9. Add smooth scrolling and animations
10. Optimize for performance (AVIF/WebP images, code splitting)

**Code Style:**
- Use TypeScript strict mode
- Use Server Components by default, Client Components only when needed
- Use the cn() utility for className merging
- Follow shadcn/ui patterns for component structure
- Use Framer Motion variants for animations
- Implement proper error handling and loading states
- Ensure WCAG AA accessibility compliance

**Reference:**
Use the LIBRARIES_REFERENCE.md file for detailed documentation on each library, configuration examples, and best practices.

Please proceed with setting up the project and building the website according to these specifications.
```

---

## 📋 Quick Customization Checklist

Before using the prompt, customize these sections:

- [ ] **Project Name**: Replace `[Your Project Name]`
- [ ] **Industry**: Specify your industry/niche
- [ ] **Pages Needed**: List all required pages
- [ ] **Key Features**: List specific features you need
- [ ] **Brand Colors**: Provide your color palette (hex or OKLCH)
- [ ] **Design Style**: Describe your desired aesthetic
- [ ] **Languages**: Specify which languages to support
- [ ] **Special Requirements**: Add any unique requirements

---

## 🎯 Example Usage

### Example 1: SaaS Landing Page

```
Project Name: CloudSync Pro
Industry: SaaS (Cloud Storage)
Pages Needed: Home, Features, Pricing, About, Contact, Blog
Key Features: 
  - Dark mode toggle
  - Multi-language (English, Spanish)
  - Animated hero section with 3D elements
  - Pricing comparison table
  - Contact form with validation
  - Blog with MDX support
Brand Colors: 
  - Primary: #2563EB (Blue)
  - Secondary: #10B981 (Green)
  - Accent: #F59E0B (Amber)
Design Style: Modern, Clean, Tech-focused
```

### Example 2: E-commerce Store

```
Project Name: Artisan Marketplace
Industry: E-commerce (Handmade Goods)
Pages Needed: Home, Shop, Product Details, Cart, Checkout, About, Contact
Key Features:
  - Product carousel with Embla
  - Shopping cart with Zustand
  - Product filtering and search
  - Image galleries with lightbox
  - Contact form
  - Dark mode
Brand Colors:
  - Primary: #7C3AED (Purple)
  - Secondary: #EC4899 (Pink)
  - Accent: #F97316 (Orange)
Design Style: Artistic, Warm, Inviting
```

### Example 3: Portfolio Website

```
Project Name: Jane Doe Design
Industry: Creative Portfolio
Pages Needed: Home, Work, About, Services, Contact
Key Features:
  - Smooth scrolling with Lenis
  - Parallax effects
  - Project showcase with animations
  - Contact form
  - Dark mode
  - Minimal, elegant design
Brand Colors:
  - Primary: #0F172A (Dark Navy)
  - Secondary: #64748B (Slate)
  - Accent: #06B6D4 (Cyan)
Design Style: Minimal, Elegant, Professional
```

---

## 💡 Pro Tips

1. **Be Specific**: The more details you provide, the better the AI can build your site
2. **Reference Existing Sites**: Mention websites you like for inspiration
3. **Prioritize Features**: List features in order of importance
4. **Provide Assets**: Have logos, images, and content ready
5. **Iterate**: Start with core features, then add enhancements

---

## 📚 Additional Resources

- Full tech stack documentation: `LIBRARIES_REFERENCE.md`
- Component examples: `src/components/ui/`
- Animation patterns: `src/lib/animation-variants.ts`
- Configuration files: `next.config.ts`, `tsconfig.json`, `globals.css`

