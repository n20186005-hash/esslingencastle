import { officialLinks, sourcesCopy, type Locale } from '@/content/esslinger-burg';

export default function SourcesSection({ locale }: { locale: string }) {
  const lang = (locale === 'de' || locale === 'en' || locale === 'zh' ? locale : 'de') as Locale;
  const copy = sourcesCopy[lang];
  const links = officialLinks[lang];

  return (
    <section id="sources" className="section-padding" style={{ background: 'var(--bg-tertiary)' }}>
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

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {links.map((link, i) => (
            <a
              key={i}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group rounded-xl p-5 flex items-start justify-between gap-4 hover:-translate-y-0.5 transition-transform"
              style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border-color)' }}
            >
              <div>
                <p className="font-display text-base font-semibold" style={{ color: 'var(--text-primary)' }}>
                  {link.name}
                </p>
                <p className="text-sm mt-1 leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                  {link.note}
                </p>
              </div>
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="flex-shrink-0 mt-1 group-hover:translate-x-0.5 transition-transform"
                style={{ color: 'var(--accent)' }}
              >
                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                <polyline points="15 3 21 3 21 9" />
                <line x1="10" y1="14" x2="21" y2="3" />
              </svg>
            </a>
          ))}
        </div>

        <p className="text-xs mt-6" style={{ color: 'var(--text-muted)' }}>
          {copy.note}
        </p>

        <div
          className="mt-8 rounded-xl px-6 py-4 text-sm leading-relaxed"
          style={{ background: 'var(--bg-secondary)', border: '1px dashed var(--border-color)', color: 'var(--text-muted)' }}
        >
          {copy.imageRights}
        </div>
      </div>
    </section>
  );
}
