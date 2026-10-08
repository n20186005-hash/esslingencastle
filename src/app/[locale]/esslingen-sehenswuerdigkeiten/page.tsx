import { setRequestLocale } from 'next-intl/server';
import type { Metadata } from 'next';
import { SITE_DOMAIN, siteFacts } from '@/content/esslinger-burg';
import SehenswuerdigkeitenPage from '@/components/SehenswuerdigkeitenPage';

export async function generateStaticParams() {
  return [{ locale: 'de' }, { locale: 'en' }, { locale: 'zh' }];
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const messages = (await import(`@/messages/${locale}.js`)).default;
  const baseUrl = `https://${SITE_DOMAIN}`;
  const deUrl = `${baseUrl}/de/esslingen-sehenswuerdigkeiten`;
  const enUrl = `${baseUrl}/en/esslingen-sehenswuerdigkeiten`;
  const zhUrl = `${baseUrl}/zh/esslingen-sehenswuerdigkeiten`;
  const selfUrl = locale === 'de' ? deUrl : locale === 'en' ? enUrl : zhUrl;

  const ns = messages.sehenswuerdigkeiten;

  return {
    title: ns.metaTitle,
    description: ns.metaDescription,
    alternates: {
      canonical: selfUrl,
      languages: {
        de: deUrl,
        en: enUrl,
        zh: zhUrl,
        'x-default': deUrl,
      },
    },
    openGraph: {
      title: ns.metaTitle,
      description: ns.metaDescription,
      url: selfUrl,
      siteName: 'Esslinger Burg – Esslingen Castle',
      locale: locale === 'de' ? 'de_DE' : locale === 'en' ? 'en_US' : 'zh_CN',
      type: 'website',
    },
    robots: { index: true, follow: true },
  };
}

function JsonLd({ data }: { data: object }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export default async function SehenswuerdigkeitenRoute({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const messages = (await import(`@/messages/${locale}.js`)).default;
  const ns = messages.sehenswuerdigkeiten;
  const pageUrl = `${siteFacts.baseUrl}/${locale}/esslingen-sehenswuerdigkeiten`;

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
        item: `${siteFacts.baseUrl}/${locale}`,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: ns.heroTitle,
        item: pageUrl,
      },
    ],
  };

  return (
    <>
      <JsonLd data={faqLd} />
      <JsonLd data={breadcrumbLd} />
      <SehenswuerdigkeitenPage locale={locale} />
    </>
  );
}
