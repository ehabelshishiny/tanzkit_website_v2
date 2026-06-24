import createMiddleware from 'next-intl/middleware';
import { locales } from './i18n';

export default createMiddleware({
  // A list of all locales that are supported
  locales,

  // Used when no locale matches
  defaultLocale: 'en',

  // Always use locale prefix
  localePrefix: 'always',

  // Bare routes should fall back to the default locale instead of a previous locale cookie.
  localeDetection: false,
});

export const config = {
  // Match localized and bare app routes, excluding API, Sanity Studio, Next internals, and static assets.
  matcher: ['/((?!api|studio|_next|_vercel|.*\\..*).*)'],
};
