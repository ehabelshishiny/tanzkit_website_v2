import { locales, type Locale } from '@/i18n';

const localeSet = new Set<string>(locales);
const schemePattern = /^[a-z][a-z0-9+.-]*:/i;

export function localizeInternalHref(
  href: string,
  locale: Locale | string,
): string {
  if (!href) return href;

  const trimmedHref = href.trim();
  if (
    trimmedHref.startsWith('#') ||
    trimmedHref.startsWith('?') ||
    trimmedHref.startsWith('//') ||
    schemePattern.test(trimmedHref)
  ) {
    return href;
  }

  const activeLocale = localeSet.has(locale) ? locale : 'en';
  const normalizedHref = trimmedHref.startsWith('/')
    ? trimmedHref
    : `/${trimmedHref}`;
  const firstSegment = normalizedHref.split(/[/?#]/)[1];

  if (localeSet.has(firstSegment)) {
    return normalizedHref;
  }

  if (normalizedHref === '/') {
    return `/${activeLocale}`;
  }

  return `/${activeLocale}${normalizedHref}`;
}
