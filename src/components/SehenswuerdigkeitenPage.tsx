import { useTranslations } from 'next-intl';
import { siteFacts } from '@/content/esslinger-burg';

type Attraction = { name: string; desc: string; tag: string };
type FaqItem = { q: string; a: string };

export default function SehenswuerdigkeitenPage({ locale }: { locale: string }) {
  const t = useTranslations('sehenswuerdigkeiten');
  const homeHref = locale === 'zh' ? '/zh' : `/${locale}`;
  const homeLabel = locale === 'de' ? 'Esslinger Burg' : locale === 'en' ? 'Esslinger Burg' : '埃斯林根堡';

  const attractions = t.raw('attractions') as Attraction[];
  const steps = t.raw('routeSteps') as string[];
  const faqItems = t.raw('faq.items') as FaqItem[];

  return (
    <main>
      {/* Hero */}
      <section className="relative min-h-[58vh] flex items-end pb-16 overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="/gallery/esslingen-castle (1).jpg"
            alt={t('heroTitle')}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0" style={{ background: 'var(--hero-overlay)' }} />
        </div>
        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 w-full">
          <nav className="mb-4 text-sm text-white/80">
            <a href={homeHref} className="hover:underline">{homeLabel}</a>
            <span className="mx-2" aria-hidden>·</span>
            {t('heroTitle')}
          </nav>
          <h1 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-white leading-tight mb-3">
            {t('heroTitle')}
          </h1>
          <p className="text-lg text-white/85 max-w-2xl">{t('heroSubtitle')}</p>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-16 space-y-16">
        {/* Intro */}
        <section>
          <p className="text-lg leading-relaxed max-w-3xl" style={{ color: 'var(--text-secondary)' }}>
            {t('intro')}
          </p>
          <p className="mt-4 leading-relaxed max-w-3xl" style={{ color: 'var(--text-muted)' }}>
            {t('introMore')}
          </p>
        </section>

        {/* Attractions */}
        <section>
          <h2 className="font-display text-2xl sm:text-3xl font-bold mb-2" style={{ color: 'var(--text-primary)' }}>
            {t('listTitle')}
          </h2>
          <p className="mb-8" style={{ color: 'var(--text-muted)' }}>{t('listSubtitle')}</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {attractions.map((a, i) => (
              <div
                key={i}
                className="rounded-2xl p-6"
                style={{ background: 'var(--card-bg)', border: '1px solid var(--border-color)' }}
              >
                <span
                  className="inline-block text-xs px-2.5 py-1 rounded-full mb-3"
                  style={{ background: 'var(--tag-bg)', color: 'var(--tag-text)' }}
                >
                  {a.tag}
                </span>
                <h3 className="font-display text-xl font-semibold mb-2" style={{ color: 'var(--text-primary)' }}>
                  {a.name}
                </h3>
                <p className="leading-relaxed" style={{ color: 'var(--text-secondary)' }}>{a.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Route */}
        <section>
          <h2 className="font-display text-2xl sm:text-3xl font-bold mb-2" style={{ color: 'var(--text-primary)' }}>
            {t('routeTitle')}
          </h2>
          <p className="mb-6" style={{ color: 'var(--text-muted)' }}>{t('routeSubtitle')}</p>
          <ol className="space-y-4 max-w-3xl">
            {steps.map((s, i) => (
              <li key={i} className="flex gap-4 items-start">
                <span
                  className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold"
                  style={{ background: 'var(--accent)', color: '#fff' }}
                >
                  {i + 1}
                </span>
                <span className="pt-1 leading-relaxed" style={{ color: 'var(--text-secondary)' }}>{s}</span>
              </li>
            ))}
          </ol>
        </section>

        {/* Map */}
        <section>
          <h2 className="font-display text-2xl sm:text-3xl font-bold mb-2" style={{ color: 'var(--text-primary)' }}>
            {t('mapTitle')}
          </h2>
          <p className="mb-6" style={{ color: 'var(--text-muted)' }}>{t('mapSubtitle')}</p>
          <div className="rounded-2xl overflow-hidden" style={{ border: '1px solid var(--border-color)' }}>
            <iframe
              title={t('mapTitle')}
              src={siteFacts.mapsEmbedSrc}
              className="w-full"
              style={{ height: '420px', border: 0 }}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </section>

        {/* FAQ */}
        <section>
          <h2 className="font-display text-2xl sm:text-3xl font-bold mb-6" style={{ color: 'var(--text-primary)' }}>
            {t('faq.title')}
          </h2>
          <div className="space-y-6 max-w-3xl">
            {faqItems.map((f, i) => (
              <div key={i}>
                <h3 className="font-semibold mb-1.5" style={{ color: 'var(--text-primary)' }}>{f.q}</h3>
                <p className="leading-relaxed" style={{ color: 'var(--text-secondary)' }}>{f.a}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Back link */}
        <div>
          <a
            href={homeHref}
            className="inline-flex items-center gap-2 text-sm font-medium"
            style={{ color: 'var(--accent)' }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="19" y1="12" x2="5" y2="12" />
              <polyline points="12 19 5 12 12 5" />
            </svg>
            {t('backHome')}
          </a>
        </div>
      </div>
    </main>
  );
}
