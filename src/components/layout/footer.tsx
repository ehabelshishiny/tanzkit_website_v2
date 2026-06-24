import Link from 'next/link';
import { getLocale, getTranslations } from 'next-intl/server';
import { getNavigation, getSiteSettings } from '@/lib/sanity/queries';
import { mapSanityFooterColumns } from '@/lib/sanity/navigation-mapper';

export async function Footer() {
  const locale = await getLocale();
  const [t, tFooter, sanityNavigation, siteSettings] = await Promise.all([
    getTranslations('nav'),
    getTranslations('footer'),
    getNavigation(locale),
    getSiteSettings(locale),
  ]);
  const isRTL = locale === 'ar';
  const sanityFooter = mapSanityFooterColumns(sanityNavigation, locale);
  const fallbackColumns = [
    {
      title: t('solutions'),
      href: `/${locale}/solutions`,
      links: [
        {
          name: tFooter('solutions.enterprisesPassengers'),
          href: `/${locale}/solutions/enterprises-passengers`,
        },
        {
          name: tFooter('solutions.operatorsDrivers'),
          href: `/${locale}/solutions/operators-drivers`,
        },
      ],
    },
    {
      title: t('resources'),
      href: `/${locale}/resources`,
      links: [
        { name: tFooter('resources.blog'), href: `/${locale}/resources/blog` },
        {
          name: tFooter('resources.caseStudies'),
          href: `/${locale}/resources/case-studies`,
        },
        { name: tFooter('resources.faq'), href: `/${locale}/resources/faq` },
        {
          name: tFooter('resources.careers'),
          href: `/${locale}/resources/careers`,
        },
      ],
    },
    {
      title: t('company'),
      links: [
        { name: t('apps'), href: `/${locale}/apps` },
        { name: t('about'), href: `/${locale}/about` },
        { name: t('contact'), href: `/${locale}/contact` },
      ],
    },
  ];
  const footerColumns =
    sanityFooter.columns.length > 0 ? sanityFooter.columns : fallbackColumns;
  const footerText =
    sanityFooter.footerText ||
    `© ${new Date().getFullYear()} ${isRTL ? 'ترانزكِت' : 'Tranzkit'}. ${tFooter('copyright')}`;
  const footerGridColumns =
    footerColumns.length >= 4 ? 'lg:grid-cols-5' : 'lg:grid-cols-4';

  return (
    <footer className="border-t bg-muted/50">
      <div className="container mx-auto pt-10 sm:pt-12 md:pt-16 pb-4 md:pb-6 px-4 sm:px-6 md:px-8">
        <div
          className={`grid grid-cols-1 sm:grid-cols-2 ${footerGridColumns} gap-8 sm:gap-6 lg:gap-8 ${
            isRTL ? 'text-right' : 'text-left'
          }`}
        >
          <div className="space-y-3 sm:space-y-4">
            <h3 className="text-xl sm:text-2xl font-bold">
              {siteSettings?.siteTitle || (isRTL ? 'ترانزكِت' : 'Tranzkit')}
            </h3>
            <p className="text-sm text-muted-foreground max-w-xs">
              {siteSettings?.siteDescription || tFooter('brand.tagline')}
            </p>
          </div>

          {footerColumns.map((column) => (
            <div key={column.title} className="space-y-3 sm:space-y-4">
              {'href' in column && column.href ? (
                <Link href={column.href} className="block">
                  <h4 className="font-semibold text-base sm:text-lg hover:text-foreground transition-colors cursor-pointer m-0">
                    {column.title}
                  </h4>
                </Link>
              ) : (
                <span className="block">
                  <h4 className="font-semibold text-base sm:text-lg m-0">
                    {column.title}
                  </h4>
                </span>
              )}
              <ul className="space-y-2 sm:space-y-3">
                {column.links.map((link) => (
                  <li key={`${column.title}-${link.href}`}>
                    <Link
                      href={link.href}
                      className="text-sm text-muted-foreground hover:text-foreground transition-colors inline-block"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-8 sm:mt-10 border-t pt-4 sm:pt-6 pb-2 text-center text-xs sm:text-sm text-muted-foreground">
          <p>{footerText}</p>
        </div>
      </div>
    </footer>
  );
}
