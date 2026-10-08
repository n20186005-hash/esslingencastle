import { setRequestLocale } from 'next-intl/server';
import type { Metadata } from 'next';
import TopicPage from '@/components/TopicPage';
import {
  buildTopicMetadata,
  buildTopicJsonLd,
  loadMessages,
  topicLocales,
} from '@/lib/topic';

const NAMESPACE = 'esslingen-mit-kindern';

export async function generateStaticParams() {
  return topicLocales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const messages = await loadMessages(locale);
  return buildTopicMetadata({ namespace: NAMESPACE, locale, messages });
}

export default async function Route({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const messages = await loadMessages(locale);
  const jsonLd = buildTopicJsonLd({ namespace: NAMESPACE, locale, messages });

  return (
    <>
      {jsonLd.map((data, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
        />
      ))}
      <TopicPage
        namespace={NAMESPACE}
        locale={locale}
        heroImage="/gallery/esslingen-castle (5).jpg"
      />
    </>
  );
}
