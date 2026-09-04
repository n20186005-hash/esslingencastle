import { useTranslations, useLocale, useMessages } from 'next-intl';

export default function Footer() {
  const t = useTranslations('footer');
  const locale = useLocale();
  const prefix = `/${locale}`;
  const messages = useMessages() as any;
  const officialLinks = messages?.footer?.officialLinks
    ? Object.values(messages.footer.officialLinks as Record<string, { name: string; url: string }>)
    : [];
  const exploreLinks: { label: string; id: string }[] = messages?.footer?.exploreLinks || [];

  return (
    <footer
      className="py-12 px-4 sm:px-6"
      style={{ background: 'var(--bg-tertiary)', borderTop: '1px solid var(--border-color)' }}
    >
      <div className="max-w-5xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-10">
          <div>
            <h3 className="font-display text-lg font-semibold mb-2" style={{ color: 'var(--text-primary)' }}>
              Esslingen Castle
            </h3>
            <p className="text-xs" style={{ color: 'var(--text-muted)' }}>
              {locale === 'de' ? 'Esslinger Burg · Esslingen am Neckar' : locale === 'en' ? 'Esslinger Burg · Esslingen am Neckar' : '埃斯林根堡 · 内卡河畔埃斯林根'}
            </p>
          </div>

          <div>
            <p className="text-xs mb-3 uppercase tracking-wide" style={{ color: 'var(--text-muted)' }}>
              {t('exploreTitle')}
            </p>
            <div className="flex flex-col gap-2">
              {exploreLinks.map((link, i) => (
                <a
                  key={i}
                  href={`${prefix}/#${link.id}`}
                  className="text-sm hover:underline"
                  style={{ color: 'var(--accent)' }}
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>

          <div className="md:col-span-2">
            <p className="text-xs mb-3 uppercase tracking-wide" style={{ color: 'var(--text-muted)' }}>
              {t('officialResourcesTitle')}
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2">
              {officialLinks.map((link, i) => (
                <a
                  key={i}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm hover:underline"
                  style={{ color: 'var(--accent)' }}
                >
                  {link.name}
                </a>
              ))}
            </div>
          </div>
        </div>

        <div
          className="pt-6 flex flex-col items-center gap-4 text-sm"
          style={{ borderTop: '1px solid var(--border-color)', color: 'var(--text-muted)' }}
        >
          <div className="flex flex-wrap justify-center gap-x-6 gap-y-2">
            <a href={`${prefix}/privacy-policy`} className="hover:underline">
              {t('privacy')}
            </a>
            <a href={`${prefix}/terms-of-service`} className="hover:underline">
              {t('terms')}
            </a>
            <a href={`${prefix}/cookie-settings`} className="hover:underline">
              {t('cookies')}
            </a>
          </div>
          <p>{t('rights')}</p>
          <p className="text-xs max-w-3xl mx-auto leading-relaxed">{t('imageRights')}</p>
          <p className="text-xs max-w-3xl mx-auto leading-relaxed">{t('disclaimer')}</p>
        </div>
      </div>
    </footer>
  );
}
