import type { Metadata } from 'next';
import { locales } from '@/i18n';

export const metadata: Metadata = {
  title: 'Tranzkit - Transform Your Transportation Business',
  description: 'Comprehensive platform for modern mobility solutions',
};

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
