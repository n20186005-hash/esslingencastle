import { useTranslations, useMessages } from 'next-intl';

export default function LocalTipsSection() {
  const t = useTranslations('localTips');
  const messages = useMessages() as any;
  const kidsBullets: string[] = messages?.localTips?.kids?.bullets || [];
  const regionBullets: string[] = messages?.localTips?.region?.bullets || [];
  const practicalBullets: string[] = messages?.localTips?.practical?.bullets || [];

  return (
    <section className="section-padding" style={{ background: 'var(--bg-secondary)' }}>
      <div className="max-w-5xl mx-auto">
        <div className="max-w-4xl mb-10">
          <p className="text-sm font-semibold tracking-wide uppercase mb-3" style={{ color: 'var(--accent)' }}>
            {t('eyebrow')}
          </p>
          <h2
            className="font-display text-3xl sm:text-4xl font-semibold mb-5"
            style={{ color: 'var(--text-primary)' }}
          >
            {t('title')}
          </h2>
          <div className="w-12 h-0.5 mb-6" style={{ background: 'var(--accent)' }} />
          <p className="text-lg leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
            {t('description')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div
            className="rounded-xl p-6 sm:p-7"
            style={{ background: 'var(--bg-tertiary)', border: '1px solid var(--border-color)' }}
          >
            <div className="flex items-center gap-3 mb-4" style={{ color: 'var(--accent)' }}>
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
                <circle cx="9" cy="7" r="4"/>
                <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
                <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
              </svg>
              <h3 className="font-display text-lg font-semibold" style={{ color: 'var(--text-primary)' }}>
                {t('kids.title')}
              </h3>
            </div>
            <p className="text-sm leading-relaxed mb-4" style={{ color: 'var(--text-secondary)' }}>
              {t('kids.text')}
            </p>
            <ul className="space-y-2.5">
              {kidsBullets.map((item, i) => (
                <li key={i} className="flex items-start gap-2.5">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="3" className="flex-shrink-0 mt-0.5">
                    <polyline points="20 6 9 17 4 12"/>
                  </svg>
                  <span className="text-sm" style={{ color: 'var(--text-secondary)' }}>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div
            className="rounded-xl p-6 sm:p-7"
            style={{ background: 'var(--bg-tertiary)', border: '1px solid var(--border-color)' }}
          >
            <div className="flex items-center gap-3 mb-4" style={{ color: 'var(--accent)' }}>
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M3 11h19v2H3z"/>
                <path d="M6 13l-3 8h18l-3-8"/>
                <circle cx="12" cy="5" r="2"/>
                <path d="M9 21c0-2 1.5-3 3-3s3 1 3 3"/>
              </svg>
              <h3 className="font-display text-lg font-semibold" style={{ color: 'var(--text-primary)' }}>
                {t('region.title')}
              </h3>
            </div>
            <p className="text-sm leading-relaxed mb-4" style={{ color: 'var(--text-secondary)' }}>
              {t('region.text')}
            </p>
            <ul className="space-y-2.5">
              {regionBullets.map((item, i) => (
                <li key={i} className="flex items-start gap-2.5">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="3" className="flex-shrink-0 mt-0.5">
                    <polyline points="20 6 9 17 4 12"/>
                  </svg>
                  <span className="text-sm" style={{ color: 'var(--text-secondary)' }}>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div
            className="rounded-xl p-6 sm:p-7"
            style={{ background: 'var(--bg-tertiary)', border: '1px solid var(--border-color)' }}
          >
            <div className="flex items-center gap-3 mb-4" style={{ color: 'var(--accent)' }}>
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10"/>
                <line x1="12" y1="16" x2="12" y2="12"/>
                <line x1="12" y1="8" x2="12.01" y2="8"/>
              </svg>
              <h3 className="font-display text-lg font-semibold" style={{ color: 'var(--text-primary)' }}>
                {t('practical.title')}
              </h3>
            </div>
            <ul className="space-y-3">
              {practicalBullets.map((item, i) => (
                <li key={i} className="flex items-start gap-2.5">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="3" className="flex-shrink-0 mt-0.5">
                    <polyline points="20 6 9 17 4 12"/>
                  </svg>
                  <span className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
