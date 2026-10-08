import { defineRouting } from 'next-intl/routing';
import { createNavigation } from 'next-intl/navigation';

export const routing = defineRouting({
  locales: ['de', 'en', 'zh'],
  defaultLocale: 'de',
  localePrefix: 'always',
  pathnames: {
    '/': '/',
    '/privacy-policy': '/privacy-policy',
    '/terms-of-service': '/terms-of-service',
    '/cookie-settings': '/cookie-settings',
    '/esslingen-sehenswuerdigkeiten': '/esslingen-sehenswuerdigkeiten',
    '/esslinger-burg-parken-anreise': '/esslinger-burg-parken-anreise',
    '/esslinger-burg-geschichte': '/esslinger-burg-geschichte',
    '/esslingen-mit-kindern': '/esslingen-mit-kindern',
    '/esslingen-castle-guide': '/esslingen-castle-guide',
  },
});

export type Locale = (typeof routing.locales)[number];

export const { Link, redirect, usePathname, useRouter, getPathname } = createNavigation(routing);
