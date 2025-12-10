import type { NextConfig } from 'next';
import createNextIntlPlugin from 'next-intl/plugin';
import createMDX from '@next/mdx';

const withNextIntl = createNextIntlPlugin('./src/i18n.ts');

const withMDX = createMDX({
  extension: /\.mdx?$/,
  options: {
    remarkPlugins: [],
    rehypePlugins: [],
  },
});

const nextConfig: NextConfig = {
  pageExtensions: ['js', 'jsx', 'ts', 'tsx', 'md', 'mdx'],
images: {
    formats: ['image/avif', 'image/webp'],
    minimumCacheTTL: 60,
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    dangerouslyAllowSVG: false, // Security
    contentDispositionType: 'attachment',
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
  
  // Add compression
  compress: true,
  
  // Enable production optimizations
  reactStrictMode: true,
  
  // Remove test pages in production
  experimental: {
    optimizePackageImports: ['lucide-react', '@radix-ui/react-icons'],
  },
};

export default withNextIntl(withMDX(nextConfig));
