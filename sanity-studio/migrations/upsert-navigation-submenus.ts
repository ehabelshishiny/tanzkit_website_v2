/**
 * Ensures the navigation singleton includes known submenu routes.
 * Run with: npx sanity exec migrations/upsert-navigation-submenus.ts --with-user-token
 */

import { getCliClient } from 'sanity/cli';

interface LocalizedString {
  en: string;
  ar: string;
}

interface NavigationSubmenuItem {
  _key: string;
  label: LocalizedString;
  description?: LocalizedString;
  href: string;
}

interface NavigationItem {
  _key?: string;
  label?: LocalizedString;
  href?: string;
  submenu?: NavigationSubmenuItem[];
}

interface NavigationDocument {
  _id: string;
  _type: 'navigation';
  mainNav?: NavigationItem[];
}

const client = getCliClient();

const expectedSubmenus: Record<string, NavigationSubmenuItem[]> = {
  '/solutions': [
    {
      _key: 'operators-drivers',
      label: {
        en: 'Operators & Drivers',
        ar: 'المشغلون والسائقون',
      },
      description: {
        en: 'Run efficient fleet operations from dispatch to driver workflow.',
        ar: 'قم بتشغيل عمليات أسطول فعالة من الإرسال إلى سير عمل السائق.',
      },
      href: '/solutions/operators-drivers',
    },
    {
      _key: 'enterprises-passengers',
      label: {
        en: 'Enterprises & Passengers',
        ar: 'المؤسسات والركاب',
      },
      description: {
        en: 'Manage employee transport programs and passenger experience.',
        ar: 'أدر برامج نقل الموظفين وتجربة الركاب.',
      },
      href: '/solutions/enterprises-passengers',
    },
  ],
  '/apps': [
    {
      _key: 'supervisor-app',
      label: { en: 'Supervisor App', ar: 'تطبيق المشرف' },
      href: '/apps/supervisor',
    },
    {
      _key: 'driver-app',
      label: { en: 'Driver App', ar: 'تطبيق السائق' },
      href: '/apps/driver',
    },
    {
      _key: 'rider-app',
      label: { en: 'Rider App', ar: 'تطبيق الراكب' },
      href: '/apps/rider',
    },
    {
      _key: 'operator-dashboard',
      label: { en: 'Operator Dashboard', ar: 'لوحة تحكم المشغل' },
      href: '/apps/operator-dashboard',
    },
    {
      _key: 'enterprise-dashboard',
      label: { en: 'Enterprise Dashboard', ar: 'لوحة تحكم المؤسسة' },
      href: '/apps/enterprise-dashboard',
    },
  ],
  '/resources': [
    {
      _key: 'blog',
      label: { en: 'Blog', ar: 'المدونة' },
      href: '/resources/blog',
    },
    {
      _key: 'case-studies',
      label: { en: 'Case Studies', ar: 'دراسات الحالة' },
      href: '/resources/case-studies',
    },
    {
      _key: 'faq',
      label: { en: 'FAQ', ar: 'الأسئلة الشائعة' },
      href: '/resources/faq',
    },
    {
      _key: 'careers',
      label: { en: 'Careers', ar: 'الوظائف' },
      href: '/resources/careers',
    },
  ],
};

function mergeSubmenus(item: NavigationItem): NavigationItem {
  const expected = item.href ? expectedSubmenus[item.href] : undefined;

  if (!expected) {
    return item;
  }

  const existing = item.submenu || [];
  const existingHrefs = new Set(existing.map((subItem) => subItem.href));

  return {
    ...item,
    submenu: [
      ...existing,
      ...expected.filter((subItem) => !existingHrefs.has(subItem.href)),
    ],
  };
}

async function upsertNavigationSubmenus() {
  console.log('Ensuring navigation singleton has known submenus...');

  const navigation = await client.fetch<NavigationDocument | null>(
    '*[_type == "navigation" && _id == "navigation"][0]',
  );

  if (!navigation) {
    throw new Error('Navigation singleton not found. Create it before running this migration.');
  }

  const mainNav = navigation.mainNav || [];
  const updatedMainNav = mainNav.map(mergeSubmenus);

  await client.patch(navigation._id).set({ mainNav: updatedMainNav }).commit();

  console.log('Navigation submenus are up to date.');
}

upsertNavigationSubmenus().catch((error) => {
  console.error('Navigation submenu migration failed:', error);
  process.exit(1);
});
