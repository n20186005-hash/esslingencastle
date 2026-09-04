import { NextIntlClientProvider } from 'next-intl';
import { getMessages, setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';
import PwaRegister from '@/components/PwaRegister';
import { siteFacts, absUrl } from '@/content/esslinger-burg';
import type { Metadata } from 'next';

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

const baseUrl = siteFacts.baseUrl;

function getSelfUrl(locale: string) {
  return `${baseUrl}/${locale}`;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const messages = (await import(`@/messages/${locale}.js`)).default;

  const zhUrl = `${baseUrl}/zh`;
  const enUrl = `${baseUrl}/en`;
  const deUrl = `${baseUrl}/de`;

  let selfUrl = zhUrl;
  if (locale === 'en') selfUrl = enUrl;
  else if (locale === 'de') selfUrl = deUrl;

  const localeMap: Record<string, string> = {
    zh: 'zh_CN',
    en: 'en_US',
    de: 'de_DE',
  };

  const title = messages.meta.title;
  const description = messages.meta.description;
  const ogImage = absUrl('/gallery/esslingen-castle (1).jpg');

  return {
    metadataBase: new URL(baseUrl),
    title,
    description,
    alternates: {
      canonical: selfUrl,
      languages: {
        de: deUrl,
        en: enUrl,
        zh: zhUrl,
        'x-default': deUrl,
      } as Record<string, string>,
    },
    openGraph: {
      title,
      description,
      url: selfUrl,
      siteName: 'Esslinger Burg – Esslingen Castle',
      locale: localeMap[locale] || 'de_DE',
      type: 'website',
      images: [
        {
          url: ogImage,
          alt: `${siteFacts.officialName}, ${siteFacts.city}, ${siteFacts.country}`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [ogImage],
    },
    other: {
      'geo.region': 'DE-BW',
      'geo.placename': `${siteFacts.city}, ${siteFacts.country}`,
      'geo.position': `${siteFacts.latitude};${siteFacts.longitude}`,
      ICBM: `${siteFacts.latitude}, ${siteFacts.longitude}`,
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!routing.locales.includes(locale as any)) {
    notFound();
  }

  setRequestLocale(locale);
  const messages = await getMessages();

  const langMap: Record<string, string> = {
    zh: 'zh-CN',
    en: 'en',
    de: 'de',
  };

  return (
    <html lang={langMap[locale] || 'de'} suppressHydrationWarning>
      <head>
        {/* PWA / installability */}
        <link rel="manifest" href="/manifest.webmanifest" />
        <meta name="theme-color" content="#3a7a8d" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="apple-mobile-web-app-title" content="Esslinger Burg" />
        <link rel="icon" type="image/png" sizes="192x192" href="/icons/icon-192.png" />
        <link rel="apple-touch-icon" href="/icons/apple-touch-icon.png" />

        {/* GA4 with Google Consent Mode – default state follows saved cookie prefs */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag() { dataLayer.push(arguments); }
              var __cookiePrefs = null;
              try { __cookiePrefs = JSON.parse(localStorage.getItem('cookiePrefs') || 'null'); } catch (e) {}
              gtag('consent', 'default', {
                'ad_storage': 'denied',
                'ad_user_data': 'denied',
                'ad_personalization': 'denied',
                'analytics_storage': (__cookiePrefs && __cookiePrefs.analytics) ? 'granted' : 'denied',
                'personalization_storage': (__cookiePrefs && __cookiePrefs.preferences) ? 'granted' : 'denied',
                'functionality_storage': 'granted',
                'security_storage': 'granted'
              });
              gtag('js', new Date());
              gtag('config', 'G-HXM22WWPKP', { 'anonymize_ip': true });
            `,
          }}
        />
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-HXM22WWPKP" />

        {/* Pre-hydration theme read */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var theme = localStorage.getItem('theme');
                  if (theme === 'dark') {
                    document.documentElement.setAttribute('data-theme', 'dark');
                  }
                } catch(e) {}
              })();
            `,
          }}
        />
      </head>
      <body className="min-h-screen">
        <NextIntlClientProvider messages={messages}>
          {children}
          <PwaRegister />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
