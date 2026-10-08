import type { Metadata } from 'next';
import { SITE_DOMAIN } from '@/content/esslinger-burg';

export const topicLocales = ['de', 'en', 'zh'] as const;
export type TopicLocale = (typeof topicLocales)[number];

export async function loadMessages(locale: string) {
  return (await import(`@/messages/${locale}.js`)).default;
}

const OG_LOCALE: Record<string, string> = {
  de: 'de_DE',
  en: 'en_US',
  zh: 'zh_CN',
};

export function buildTopicMetadata({
  namespace,
  locale,
  messages,
}: {
  namespace: string;
  locale: string;
  messages: any;
}): Metadata {
  const ns = messages[namespace];
  const baseUrl = `https://${SITE_DOMAIN}`;
  const urls: Record<string, string> = {
    de: `${baseUrl}/de/${namespace}`,
    en: `${baseUrl}/en/${namespace}`,
    zh: `${baseUrl}/zh/${namespace}`,
  };
  const selfUrl = urls[locale] ?? urls.de;

  return {
    title: ns.metaTitle,
    description: ns.metaDescription,
    alternates: {
      canonical: selfUrl,
      languages: {
        de: urls.de,
        en: urls.en,
        zh: urls.zh,
        'x-default': urls.de,
      },
    },
    openGraph: {
      title: ns.metaTitle,
      description: ns.metaDescription,
      url: selfUrl,
      siteName: 'Esslinger Burg – Esslingen Castle',
      locale: OG_LOCALE[locale] ?? 'de_DE',
      type: 'website',
    },
    robots: { index: true, follow: true },
  };
}

export function buildTopicJsonLd({
  namespace,
  locale,
  messages,
}: {
  namespace: string;
  locale: string;
  messages: any;
}) {
  const ns = messages[namespace];
  const baseUrl = `https://${SITE_DOMAIN}`;
  const pageUrl = `${baseUrl}/${locale}/${namespace}`;

  const faqLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: ns.faq.items.map((item: { q: string; a: string }) => ({
      '@type': 'Question',
      name: item.q,
      acceptedAnswer: { '@type': 'Answer', text: item.a },
    })),
  };

  const breadcrumbLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Esslinger Burg',
        item: `${baseUrl}/${locale}`,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: ns.heroTitle,
        item: pageUrl,
      },
    ],
  };

  return [faqLd, breadcrumbLd];
}
