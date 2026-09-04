import { setRequestLocale } from 'next-intl/server';
import type { Metadata } from 'next';
import { SITE_DOMAIN } from '@/content/esslinger-burg';
import CookieSettingsClient from './CookieSettingsClient';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const baseUrl = `https://${SITE_DOMAIN}`;
  const deUrl = `${baseUrl}/de/cookie-settings`;
  const enUrl = `${baseUrl}/en/cookie-settings`;
  const zhUrl = `${baseUrl}/zh/cookie-settings`;
  const selfUrl = locale === 'de' ? deUrl : locale === 'en' ? enUrl : zhUrl;

  return {
    alternates: {
      canonical: selfUrl,
      languages: {
        'de': deUrl,
        'en': enUrl,
        'zh': zhUrl,
        'x-default': deUrl,
      },
    },
  };
}

export default async function CookiePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <CookieSettingsClient />;
}
