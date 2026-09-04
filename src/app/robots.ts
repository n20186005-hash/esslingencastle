import { MetadataRoute } from 'next';
import { SITE_DOMAIN } from '@/content/esslinger-burg';

export const dynamic = 'force-static';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
    },
    sitemap: `https://${SITE_DOMAIN}/sitemap.xml`,
  };
}
