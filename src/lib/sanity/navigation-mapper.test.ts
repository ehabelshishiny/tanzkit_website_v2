import assert from 'node:assert/strict';
import { describe, it } from 'node:test';
import {
  mapSanityFooterColumns,
  mapSanityMainNavigation,
} from './navigation-mapper';

describe('Sanity navigation mapping', () => {
  it('maps only Sanity main nav items and localizes internal hrefs', () => {
    const navigation = mapSanityMainNavigation(
      {
        mainNav: [
          { _key: 'home', label: 'Home', href: '/' },
          { _key: 'solutions', label: 'Solutions', href: '/solutions' },
          { _key: 'external', label: 'Login', href: 'https://app.example.com' },
        ],
      },
      'ar',
    );

    assert.deepEqual(navigation, [
      { name: 'Home', href: '/ar', subPages: [] },
      { name: 'Solutions', href: '/ar/solutions', subPages: [] },
      { name: 'Login', href: 'https://app.example.com', subPages: [] },
    ]);
  });

  it('maps submenu and footer links from Sanity without adding hardcoded top-level items', () => {
    const headerNav = mapSanityMainNavigation(
      {
        mainNav: [
          {
            _key: 'resources',
            label: 'Resources',
            href: '/resources',
            submenu: [
              {
                _key: 'blog',
                label: 'Blog',
                href: '/resources/blog',
                description: 'Latest updates',
              },
            ],
          },
        ],
      },
      'en',
    );

    const footerColumns = mapSanityFooterColumns(
      {
        footerNavColumns: [
          {
            _key: 'platform',
            heading: 'Platform',
            links: [{ _key: 'apps', label: 'Apps', href: '/apps' }],
          },
        ],
        footerText: '© {year} Test',
      },
      'en',
    );

    assert.deepEqual(headerNav, [
      {
        name: 'Resources',
        href: '/en/resources',
        subPages: [
          {
            name: 'Blog',
            href: '/en/resources/blog',
            description: 'Latest updates',
          },
        ],
      },
    ]);
    assert.deepEqual(footerColumns.columns, [
      {
        title: 'Platform',
        links: [{ name: 'Apps', href: '/en/apps' }],
      },
    ]);
    assert.equal(footerColumns.footerText, '© 2026 Test');
  });

  it('uses Sanity top-level nav while preserving known fallback submenus by href', () => {
    const fallbackNavigation = [
      {
        name: 'Solutions',
        href: '/en/solutions',
        subPages: [
          { name: 'All solutions', href: '/en/solutions' },
          {
            name: 'Operators & Drivers',
            href: '/en/solutions/operators-drivers',
          },
        ],
      },
      {
        name: 'Apps',
        href: '/en/apps',
        subPages: [
          { name: 'Supervisor', href: '/en/apps/supervisor' },
          { name: 'Driver', href: '/en/apps/driver' },
        ],
      },
      {
        name: 'Pricing',
        href: '/en/pricing',
        subPages: [],
      },
    ];

    const navigation = mapSanityMainNavigation(
      {
        mainNav: [
          { _key: 'solutions', label: 'Use Cases', href: '/solutions' },
          {
            _key: 'apps',
            label: 'Products',
            href: '/apps',
            submenu: [
              {
                _key: 'supervisor',
                label: 'Supervisor App',
                href: '/apps/supervisor',
              },
            ],
          },
        ],
      },
      'en',
      fallbackNavigation,
    );

    assert.deepEqual(navigation, [
      {
        name: 'Use Cases',
        href: '/en/solutions',
        subPages: [
          { name: 'All solutions', href: '/en/solutions' },
          {
            name: 'Operators & Drivers',
            href: '/en/solutions/operators-drivers',
          },
        ],
      },
      {
        name: 'Products',
        href: '/en/apps',
        subPages: [
          {
            name: 'Supervisor App',
            href: '/en/apps/supervisor',
            description: undefined,
          },
          { name: 'Driver', href: '/en/apps/driver' },
        ],
      },
    ]);
  });
});
