import { useTranslations, useMessages } from 'next-intl';

export default function HistorySection() {
  const t = useTranslations('story');
  const messages = useMessages() as any;
  const timeline: { year: string; title: string; text: string }[] = messages?.story?.timeline || [];
  const legends: { title: string; text: string }[] = messages?.story?.legends || [];

  return (
    <section id="history" className="section-padding" style={{ background: 'var(--bg-tertiary)' }}>
      <div className="max-w-4xl mx-auto">
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
        <p className="text-lg leading-relaxed mb-12" style={{ color: 'var(--text-secondary)' }}>
          {t('intro')}
        </p>

        <h3
          className="font-display text-xl sm:text-2xl font-semibold mb-6"
          style={{ color: 'var(--text-primary)' }}
        >
          {t('timelineTitle')}
        </h3>
        <div className="space-y-6 mb-14">
          {timeline.map((item, i) => (
            <div
              key={i}
              className="rounded-xl p-6 sm:p-7"
              style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border-color)' }}
            >
              <div className="flex flex-col sm:flex-row sm:items-baseline gap-2 sm:gap-6 mb-2">
                <span
                  className="inline-flex items-center rounded-full px-3 py-1 text-sm font-semibold whitespace-nowrap"
                  style={{ background: 'var(--tag-bg)', color: 'var(--accent)' }}
                >
                  {item.year}
                </span>
                <h4
                  className="font-display text-lg font-semibold"
                  style={{ color: 'var(--text-primary)' }}
                >
                  {item.title}
                </h4>
              </div>
              <p className="text-base leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                {item.text}
              </p>
            </div>
          ))}
        </div>

        <h3
          className="font-display text-xl sm:text-2xl font-semibold mb-2"
          style={{ color: 'var(--text-primary)' }}
        >
          {t('legendTitle')}
        </h3>
        <p className="text-sm mb-6 italic" style={{ color: 'var(--text-muted)' }}>
          {t('legendNote')}
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-12">
          {legends.map((legend, i) => (
            <div
              key={i}
              className="rounded-xl p-6 sm:p-7"
              style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border-color)' }}
            >
              <h4 className="font-display text-lg font-semibold mb-3" style={{ color: 'var(--text-primary)' }}>
                {legend.title}
              </h4>
              <p className="text-base leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                {legend.text}
              </p>
            </div>
          ))}
        </div>

        <div
          className="rounded-xl p-6 sm:p-8 border"
          style={{ background: 'var(--bg-secondary)', borderColor: 'var(--accent)' }}
        >
          <p className="text-base leading-relaxed font-medium" style={{ color: 'var(--text-primary)' }}>
            {t('closing')}
          </p>
        </div>
      </div>
    </section>
  );
}
