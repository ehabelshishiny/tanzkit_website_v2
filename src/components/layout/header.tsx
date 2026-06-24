import { getTranslations, getLocale } from 'next-intl/server';
import { HeaderClient } from './header-client';
import { getNavigation, getSiteSettings } from '@/lib/sanity/queries';
import { urlFor } from '@/lib/sanity/image';
import { mapSanityMainNavigation } from '@/lib/sanity/navigation-mapper';

export async function Header() {
  const t = await getTranslations('nav');
  const locale = await getLocale();
  const [sanityNavigation, siteSettings] = await Promise.all([
    getNavigation(locale),
    getSiteSettings(locale),
  ]);
  const logoUrl = siteSettings?.logo?.asset
    ? urlFor(siteSettings.logo).height(96).fit('max').url()
    : undefined;
  const headerCtaHref =
    siteSettings?.announcementBar?.link ||
    (siteSettings?.contactEmail
      ? `mailto:${siteSettings.contactEmail}`
      : undefined);

  // Navigation items with subpages
  const solutionsSubPages = [
    {
      name: t('solutions'),
      href: `/${locale}/solutions`,
      description: t('viewAll.solutions'),
      isParent: true,
    },
    {
      name: t('submenus.solutions.enterprisesPassengers.name'),
      href: `/${locale}/solutions/enterprises-passengers`,
      description: t('submenus.solutions.enterprisesPassengers.description'),
    },
    {
      name: t('submenus.solutions.operatorsDrivers.name'),
      href: `/${locale}/solutions/operators-drivers`,
      description: t('submenus.solutions.operatorsDrivers.description'),
    },
  ];

  const resourcesSubPages = [
    {
      name: t('resources'),
      href: `/${locale}/resources`,
      description: t('viewAll.resources'),
      isParent: true,
    },
    { name: t('submenus.resources.blog'), href: `/${locale}/resources/blog` },
    {
      name: t('submenus.resources.caseStudies'),
      href: `/${locale}/resources/case-studies`,
    },
    { name: t('submenus.resources.faq'), href: `/${locale}/resources/faq` },
    {
      name: t('submenus.resources.careers'),
      href: `/${locale}/resources/careers`,
    },
  ];

  const appsSubPages = [
    {
      name: t('apps'),
      href: `/${locale}/apps`,
      description: t('viewAll.apps'),
      isParent: true,
    },
    { name: t('submenus.apps.supervisor'), href: `/${locale}/apps/supervisor` },
    { name: t('submenus.apps.driver'), href: `/${locale}/apps/driver` },
    { name: t('submenus.apps.rider'), href: `/${locale}/apps/rider` },
    {
      name: t('submenus.apps.operatorDashboard'),
      href: `/${locale}/apps/operator-dashboard`,
    },
    {
      name: t('submenus.apps.enterpriseDashboard'),
      href: `/${locale}/apps/enterprise-dashboard`,
    },
  ];

  const navigation = [
    { name: t('home'), href: `/${locale}`, subPages: [] },
    {
      name: t('solutions'),
      href: `/${locale}/solutions`,
      subPages: solutionsSubPages,
    },
    {
      name: t('resources'),
      href: `/${locale}/resources`,
      subPages: resourcesSubPages,
    },
    { name: t('apps'), href: `/${locale}/apps`, subPages: appsSubPages },
    { name: t('pricing'), href: `/${locale}/pricing`, subPages: [] },
    { name: t('about'), href: `/${locale}/about`, subPages: [] },
    { name: t('contact'), href: `/${locale}/contact`, subPages: [] },
  ];
  const sanityHeaderNavigation = mapSanityMainNavigation(
    sanityNavigation,
    locale,
    navigation,
  );

  return (
    <HeaderClient
      locale={locale}
      navigation={
        sanityHeaderNavigation.length > 0 ? sanityHeaderNavigation : navigation
      }
      logo={{
        src: logoUrl,
        alt: siteSettings?.siteTitle || 'Tranzkit',
      }}
      headerCtaHref={headerCtaHref}
    />
  );
}
