import { faqCopy, buildFaqLd, type Locale } from '@/content/esslinger-burg';

function JsonLd({ data }: { data: object }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export default function FaqSection({ locale }: { locale: string }) {
  const lang = (locale === 'de' || locale === 'en' || locale === 'zh' ? locale : 'de') as Locale;
  const copy = faqCopy[lang];

  return (
    <>
      <JsonLd data={buildFaqLd(lang)} />
      <section
        id="faq"
        className="section-padding"
        style={{ background: 'var(--bg-primary)' }}
      >
        <div className="max-w-4xl mx-auto">
          <h2
            className="font-display text-3xl sm:text-4xl font-semibold mb-5"
            style={{ color: 'var(--text-primary)' }}
          >
            {copy.title}
          </h2>
          <div className="w-12 h-0.5 mb-6" style={{ background: 'var(--accent)' }} />
          <p className="text-lg leading-relaxed mb-10" style={{ color: 'var(--text-secondary)' }}>
            {copy.subtitle}
          </p>

          <div className="space-y-3">
            {copy.items.map((item, i) => (
              <details
                key={i}
                className="group rounded-xl overflow-hidden"
                style={{ background: 'var(--bg-tertiary)', border: '1px solid var(--border-color)' }}
              >
                <summary
                  className="flex items-center justify-between gap-4 cursor-pointer list-none marker:hidden px-6 py-4"
                  style={{ color: 'var(--text-primary)' }}
                >
                  <span className="font-display text-base sm:text-lg font-semibold">{item.q}</span>
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    className="flex-shrink-0 transition-transform group-open:rotate-45"
                    style={{ color: 'var(--accent)' }}
                  >
                    <line x1="12" y1="5" x2="12" y2="19" />
                    <line x1="5" y1="12" x2="19" y2="12" />
                  </svg>
                </summary>
                <div className="px-6 pb-5">
                  <p className="text-base leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                    {item.a}
                  </p>
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
