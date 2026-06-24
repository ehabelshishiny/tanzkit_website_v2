import { localizeInternalHref } from '@/lib/localize-internal-href';

export interface HeaderNavigationItem {
  name: string;
  href: string;
  subPages: Array<{
    name: string;
    href: string;
    description?: string;
    isParent?: boolean;
  }>;
}

export interface FooterNavigationColumn {
  title: string;
  links: Array<{
    name: string;
    href: string;
  }>;
}

interface SanityNavigationItem {
  _key?: string;
  label?: string;
  href?: string;
  description?: string;
  submenu?: SanityNavigationItem[];
}

interface SanityFooterColumn {
  _key?: string;
  title?: string;
  heading?: string;
  links?: SanityNavigationItem[];
}

interface SanityNavigation {
  mainNav?: SanityNavigationItem[];
  footerNavColumns?: SanityFooterColumn[];
  footerText?: string;
}

export function mapSanityMainNavigation(
  navigation: SanityNavigation | null | undefined,
  locale: string,
  fallbackNavigation: HeaderNavigationItem[] = [],
): HeaderNavigationItem[] {
  return (navigation?.mainNav || [])
    .filter((item) => item.label && item.href)
    .map((item) => {
      const href = localizeInternalHref(item.href as string, locale);
      const fallbackItem = fallbackNavigation.find(
        (fallback) => fallback.href === href,
      );
      const sanitySubPages = (item.submenu || [])
        .filter((subPage) => subPage.label && subPage.href)
        .map((subPage) => ({
          name: subPage.label as string,
          href: localizeInternalHref(subPage.href as string, locale),
          description: subPage.description,
        }));
      const sanitySubPageHrefs = new Set(
        sanitySubPages.map((subPage) => subPage.href),
      );
      const fallbackSubPages = (fallbackItem?.subPages || []).filter(
        (subPage) => !sanitySubPageHrefs.has(subPage.href),
      );

      return {
        name: item.label as string,
        href,
        subPages: [...sanitySubPages, ...fallbackSubPages],
      };
    });
}

export function mapSanityFooterColumns(
  navigation: SanityNavigation | null | undefined,
  locale: string,
) {
  const currentYear = String(new Date().getFullYear());

  return {
    columns: (navigation?.footerNavColumns || [])
      .filter(
        (column) => (column.heading || column.title) && column.links?.length,
      )
      .map((column) => ({
        title: (column.heading || column.title) as string,
        links: (column.links || [])
          .filter((link) => link.label && link.href)
          .map((link) => ({
            name: link.label as string,
            href: localizeInternalHref(link.href as string, locale),
          })),
      }))
      .filter((column) => column.links.length > 0),
    footerText: navigation?.footerText?.replace('{year}', currentYear),
  };
}
