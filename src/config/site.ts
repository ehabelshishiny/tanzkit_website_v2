/**
 * Site-wide configuration
 */

export const siteConfig = {
  name: 'Tranzkit',
  description: 'Transform your transportation business with our comprehensive platform',
  url: process.env.NEXT_PUBLIC_SITE_URL || 'https://tranzkit.com',
  ogImage: '/og-image.jpg',
  links: {
    twitter: 'https://twitter.com/tranzkit',
    linkedin: 'https://linkedin.com/company/tranzkit',
    facebook: 'https://facebook.com/tranzkit',
  },
  contact: {
    email: 'info@tranzkit.com',
    phone: '+1 (555) 123-4567',
    address: '123 Business St, City, Country',
  },
};

export type SiteConfig = typeof siteConfig;

