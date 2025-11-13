# 🚀 Tranzkit Website

A modern, high-performance, bilingual website built with Next.js 16, TypeScript, and cutting-edge web technologies.

## ✨ Features

- 🌐 **Bilingual Support** - English and Arabic with automatic RTL
- ⚡ **Blazing Fast** - Optimized with Next.js App Router, React Compiler, and Turbopack
- 🎨 **Beautiful UI** - Built with shadcn/ui and Tailwind CSS v4
- 🎭 **Smooth Animations** - Framer Motion for delightful user experience
- 📱 **Fully Responsive** - Mobile-first design
- ♿ **Accessible** - WCAG compliant components
- 🔍 **SEO Optimized** - Meta tags, Open Graph, and structured data
- 🖼️ **Image Optimization** - Automatic WebP/AVIF conversion
- 📊 **Type-Safe** - Full TypeScript coverage

## 🛠️ Technology Stack

### Core
- **Next.js 16** - React framework with App Router
- **React 19** - UI library with React Compiler
- **TypeScript** - Type safety

### UI & Styling
- **Tailwind CSS v4** - Utility-first CSS
- **shadcn/ui** - Component library
- **Framer Motion** - Animations

### State & Data
- **next-intl** - Internationalization
- **TanStack Query** - Data fetching & caching
- **Zustand** - State management
- **React Hook Form** - Form handling
- **Zod** - Schema validation

## 📋 Prerequisites

- Node.js 18.17 or later
- npm, yarn, or pnpm

## 🚀 Getting Started

### 1. Install Dependencies

```bash
npm install
```

### 2. Set Up Environment Variables

Create a `.env.local` file in the root directory:

```env
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NEXT_PUBLIC_API_URL=https://api.tranzkit.com
```

### 3. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000/en](http://localhost:3000/en) in your browser.

### 4. Build for Production

```bash
npm run build
npm start
```

## 📁 Project Structure

```
src/
├── app/                    # Next.js App Router
│   ├── [locale]/          # Internationalized routes
│   │   └── (main)/        # Main layout group
│   │       ├── page.tsx   # Home page
│   │       ├── solutions/
│   │       ├── resources/
│   │       ├── apps/
│   │       ├── contact/
│   │       ├── pricing/
│   │       └── about/
├── components/
│   ├── layout/            # Header, Footer, etc.
│   ├── sections/          # Page sections
│   ├── forms/             # Form components
│   ├── animations/        # Animation wrappers
│   └── ui/                # shadcn/ui components
├── lib/
│   ├── api/               # API client
│   ├── hooks/             # Custom hooks
│   ├── store/             # State management
│   └── validations/       # Zod schemas
├── config/                # Configuration
├── types/                 # TypeScript types
└── messages/              # Translations (en.json, ar.json)
```

## 🌐 Internationalization

The website supports English and Arabic with automatic RTL layout switching.

### Access Different Locales
- English: `http://localhost:3000/en`
- Arabic: `http://localhost:3000/ar`

### Adding Translations

Edit the JSON files in the `messages/` directory:
- `messages/en.json` - English translations
- `messages/ar.json` - Arabic translations

## 🎨 Adding Components

### Install shadcn/ui Components

```bash
npx shadcn@latest add [component-name]
```

Example:
```bash
npx shadcn@latest add dialog
```

### Create Custom Components

Components are organized by purpose:
- **Layout components** → `src/components/layout/`
- **Section components** → `src/components/sections/`
- **Form components** → `src/components/forms/`
- **UI components** → `src/components/ui/`

## 🎭 Using Animations

```tsx
import { FadeIn } from '@/components/animations/fade-in';
import { SlideIn } from '@/components/animations/slide-in';

<FadeIn delay={0.2}>
  <h1>Animated Content</h1>
</FadeIn>

<SlideIn direction="left" delay={0.3}>
  <p>Slides in from the left</p>
</SlideIn>
```

## 📝 Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server with Turbopack |
| `npm run build` | Build for production |
| `npm start` | Start production server |
| `npm run lint` | Run ESLint |
| `npm run type-check` | Run TypeScript compiler check |

## 🏗️ Architecture

See [ARCHITECTURE.md](./ARCHITECTURE.md) for detailed documentation on:
- Project structure
- Design patterns
- Performance optimizations
- Animation guidelines
- Best practices

## 📦 Key Libraries

| Library | Purpose |
|---------|---------|
| Next.js | React framework |
| Framer Motion | Animations |
| next-intl | Internationalization |
| TanStack Query | Data fetching |
| Zustand | State management |
| React Hook Form | Forms |
| Zod | Validation |
| shadcn/ui | UI components |
| Tailwind CSS | Styling |

## 🚀 Deployment

### Deploy to Vercel (Recommended)

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new)

1. Push your code to GitHub
2. Import your repository in Vercel
3. Configure environment variables
4. Deploy!

### Other Platforms
- **Netlify**: Supports Next.js with zero config
- **AWS Amplify**: For AWS infrastructure
- **Docker**: Use the included Dockerfile (if added)

## 🔧 Configuration

### Site Configuration
Edit `src/config/site.ts` to update:
- Site name and description
- Social media links
- Contact information

### Tailwind Configuration
Customize `tailwind.config.ts` for:
- Colors
- Fonts
- Breakpoints
- Custom utilities

## 📄 License

This project is proprietary and confidential.

## 🤝 Contributing

1. Create a feature branch
2. Make your changes
3. Submit a pull request

## 📞 Support

For questions or issues, contact: info@tranzkit.com

---

Built with ❤️ by the Tranzkit team
