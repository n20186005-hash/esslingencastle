import { buildAttractionLd, buildBreadcrumbLd, type Locale } from '@/content/esslinger-burg';

function JsonLd({ data }: { data: object }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

/** Homepage-only schema.org nodes (entity binding for the search result card). */
export default function HomeStructuredData({
  locale,
  pageUrl,
}: {
  locale: string;
  pageUrl: string;
}) {
  const lang = (locale === 'de' || locale === 'en' || locale === 'zh' ? locale : 'de') as Locale;

  return (
    <>
      <JsonLd data={buildAttractionLd(lang)} />
      <JsonLd data={buildBreadcrumbLd(lang, pageUrl)} />
    </>
  );
}
