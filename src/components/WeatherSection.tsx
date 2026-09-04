'use client';

import { useTranslations, useLocale, useMessages } from 'next-intl';
import { useEffect, useState } from 'react';

type Forecast = {
  current: {
    temperature_2m: number;
    apparent_temperature: number;
    relative_humidity_2m: number;
    weather_code: number;
    wind_speed_10m: number;
  };
  daily: {
    time: string[];
    weather_code: number[];
    temperature_2m_max: number[];
    temperature_2m_min: number[];
    precipitation_probability_max: (number | null)[];
  };
};

const API_URL =
  'https://api.open-meteo.com/v1/forecast?latitude=48.7396&longitude=9.3047&current=temperature_2m,apparent_temperature,relative_humidity_2m,precipitation,weather_code,wind_speed_10m&daily=weather_code,temperature_2m_max,temperature_2m_min,precipitation_probability_max&timezone=Europe%2FBerlin&forecast_days=7&wind_speed_unit=kmh';

function codeToType(code: number): string {
  if (code === 0) return 'sun';
  if (code === 1 || code === 2) return 'partly';
  if (code === 3) return 'cloud';
  if (code === 45 || code === 48) return 'fog';
  if (code >= 51 && code <= 57) return 'drizzle';
  if (code >= 61 && code <= 67) return 'rain';
  if (code >= 71 && code <= 77) return 'snow';
  if (code >= 80 && code <= 82) return 'showers';
  if (code === 85 || code === 86) return 'snow';
  if (code >= 95) return 'storm';
  return 'cloud';
}

function WeatherIcon({ type, size = 22 }: { type: string; size?: number }) {
  const s = { width: size, height: size, flexShrink: 0 } as const;
  const svgProps = {
    style: s,
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: 1.8,
    strokeLinecap: 'round',
    strokeLinejoin: 'round',
  } as const;

  switch (type) {
    case 'sun':
      return (
        <svg {...svgProps}>
          <circle cx="12" cy="12" r="4.2" />
          <path d="M12 2v2.2M12 19.8V22M2 12h2.2M19.8 12H22M4.9 4.9l1.6 1.6M17.5 17.5l1.6 1.6M19.1 4.9l-1.6 1.6M6.5 17.5l-1.6 1.6" />
        </svg>
      );
    case 'partly':
      return (
        <svg {...svgProps}>
          <circle cx="8.5" cy="7.5" r="3.4" />
          <path d="M8.5 1.6v1.4M8.5 12v1.4M1.6 7.5H3M13.4 7.5h1.4M3.6 3.6l1 1M12.4 10.4l1 1M13.4 3.6l-1 1M4.6 10.4l-1 1" />
          <path d="M20 14.5h-1.1a5.6 5.6 0 0 0-9.9-3.5 3.4 3.4 0 0 0-.4 6.7H20a3.8 3.8 0 0 0 0-3.2z" />
        </svg>
      );
    case 'cloud':
      return (
        <svg {...svgProps}>
          <path d="M18.5 15.5H6.8A4.3 4.3 0 0 1 7 6.9a5.6 5.6 0 0 1 10.6-.8 4.5 4.5 0 0 1 .9 9.4z" />
        </svg>
      );
    case 'fog':
      return (
        <svg {...svgProps}>
          <path d="M18.5 15.5H6.8A4.3 4.3 0 0 1 7 6.9a5.6 5.6 0 0 1 10.6-.8 4.5 4.5 0 0 1 .9 9.4z" />
          <path d="M5 18.5h14M7.5 21h9" />
        </svg>
      );
    case 'drizzle':
      return (
        <svg {...svgProps}>
          <path d="M18.5 15.5H6.8A4.3 4.3 0 0 1 7 6.9a5.6 5.6 0 0 1 10.6-.8 4.5 4.5 0 0 1 .9 9.4z" />
          <path d="M8.5 17.5l-.8 1.6M12.5 17.5l-.8 1.6M16.5 17.5l-.8 1.6" />
        </svg>
      );
    case 'showers':
    case 'rain':
      return (
        <svg {...svgProps}>
          <path d="M18.5 15.5H6.8A4.3 4.3 0 0 1 7 6.9a5.6 5.6 0 0 1 10.6-.8 4.5 4.5 0 0 1 .9 9.4z" />
          <path d="M8 17.5v3M12.2 17.5v3M16.4 17.5v3" />
        </svg>
      );
    case 'snow':
      return (
        <svg {...svgProps}>
          <path d="M18.5 15.5H6.8A4.3 4.3 0 0 1 7 6.9a5.6 5.6 0 0 1 10.6-.8 4.5 4.5 0 0 1 .9 9.4z" />
          <path d="M9 18.5l.01.01M13 20l.01.01M17 18.5l.01.01" />
        </svg>
      );
    case 'storm':
      return (
        <svg {...svgProps}>
          <path d="M18.5 15.5H6.8A4.3 4.3 0 0 1 7 6.9a5.6 5.6 0 0 1 10.6-.8 4.5 4.5 0 0 1 .9 9.4z" />
          <path d="M13.5 15l-3.5 5h3.2L12 24l5-6.5h-3.5z" transform="translate(0 -1)" />
        </svg>
      );
    default:
      return (
        <svg {...svgProps}>
          <path d="M18.5 15.5H6.8A4.3 4.3 0 0 1 7 6.9a5.6 5.6 0 0 1 10.6-.8 4.5 4.5 0 0 1 .9 9.4z" />
        </svg>
      );
  }
}

export default function WeatherSection() {
  const t = useTranslations('weather');
  const locale = useLocale();
  const messages = useMessages() as any;
  const codes: Record<string, string> = messages?.weather?.codes || {};

  const [data, setData] = useState<Forecast | null>(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    const controller = new AbortController();
    fetch(API_URL, { signal: controller.signal, cache: 'no-store' })
      .then((res) => {
        if (!res.ok) throw new Error('bad response');
        return res.json();
      })
      .then((json: Forecast) => {
        if (!controller.signal.aborted) {
          setData(json);
          setFailed(false);
        }
      })
      .catch(() => {
        if (!controller.signal.aborted) setFailed(true);
      });
    return () => controller.abort();
  }, []);

  const localeIntl =
    locale === 'de' ? 'de-DE' : locale === 'zh' ? 'zh-CN' : 'en-GB';

  function dayLabel(dateStr: string, idx: number) {
    if (idx === 0) return t('today');
    try {
      const d = new Date(`${dateStr}T12:00:00`);
      return new Intl.DateTimeFormat(localeIntl, { weekday: 'short' }).format(d);
    } catch {
      return dateStr;
    }
  }

  const label = (code: number) => codes[String(code)] || '';

  return (
    <section id="weather" className="section-padding" style={{ background: 'var(--bg-primary)' }}>
      <div className="max-w-5xl mx-auto">
        <div className="max-w-3xl mb-10">
          <h2
            className="font-display text-3xl sm:text-4xl font-semibold mb-5"
            style={{ color: 'var(--text-primary)' }}
          >
            {t('title')}
          </h2>
          <div className="w-12 h-0.5 mb-6" style={{ background: 'var(--accent)' }} />
          <p className="text-lg leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
            {t('subtitle')}
          </p>
        </div>

        {failed && (
          <div
            className="rounded-xl p-8 text-center text-sm"
            style={{ background: 'var(--bg-tertiary)', color: 'var(--text-secondary)' }}
          >
            {t('fallback')}
          </div>
        )}

        {!failed && !data && (
          <div className="animate-pulse">
            <div
              className="rounded-xl p-6 mb-6 h-40"
              style={{ background: 'var(--bg-tertiary)' }}
            />
            <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-7 gap-3">
              {Array.from({ length: 7 }).map((_, i) => (
                <div
                  key={i}
                  className="rounded-xl h-36"
                  style={{ background: 'var(--bg-tertiary)' }}
                />
              ))}
            </div>
          </div>
        )}

        {!failed && data && (
          <>
            <div
              className="rounded-xl p-6 sm:p-8 mb-6 flex flex-col sm:flex-row sm:items-center gap-6"
              style={{ background: 'var(--bg-tertiary)', border: '1px solid var(--border-color)' }}
            >
              <div
                className="flex items-center gap-4"
                style={{ color: 'var(--accent)' }}
              >
                <WeatherIcon type={codeToType(data.current.weather_code)} size={52} />
                <div>
                  <div className="font-display text-4xl font-semibold" style={{ color: 'var(--text-primary)' }}>
                    {Math.round(data.current.temperature_2m)}°C
                  </div>
                  <div className="text-sm" style={{ color: 'var(--text-secondary)' }}>
                    {t('now')} · {label(data.current.weather_code)}
                  </div>
                </div>
              </div>
              <div className="flex flex-wrap gap-3 sm:ml-auto">
                <span
                  className="px-4 py-2 rounded-full text-sm font-medium"
                  style={{ background: 'var(--tag-bg)', color: 'var(--tag-text)' }}
                >
                  {t('feelsLike')} {Math.round(data.current.apparent_temperature)}°C
                </span>
                <span
                  className="px-4 py-2 rounded-full text-sm font-medium"
                  style={{ background: 'var(--tag-bg)', color: 'var(--tag-text)' }}
                >
                  {t('humidity')} {data.current.relative_humidity_2m}%
                </span>
                <span
                  className="px-4 py-2 rounded-full text-sm font-medium"
                  style={{ background: 'var(--tag-bg)', color: 'var(--tag-text)' }}
                >
                  {t('wind')} {Math.round(data.current.wind_speed_10m)} km/h
                </span>
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-7 gap-3">
              {data.daily.time.map((day, i) => {
                const rain = data.daily.precipitation_probability_max[i];
                return (
                  <div
                    key={day}
                    className="rounded-xl p-4 flex flex-col items-center gap-2 text-center"
                    style={{ background: 'var(--bg-tertiary)', border: '1px solid var(--border-color)' }}
                  >
                    <span className="text-xs font-medium" style={{ color: 'var(--text-muted)' }}>
                      {dayLabel(day, i)}
                    </span>
                    <div style={{ color: 'var(--accent)' }}>
                      <WeatherIcon type={codeToType(data.daily.weather_code[i])} size={26} />
                    </div>
                    <div className="text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>
                      {Math.round(data.daily.temperature_2m_max[i])}° / {Math.round(data.daily.temperature_2m_min[i])}°
                    </div>
                    <span className="text-xs flex items-center gap-1" style={{ color: 'var(--text-secondary)' }}>
                      <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M12 2.7s6.5 7 6.5 11.6a6.5 6.5 0 0 1-13 0C5.5 9.7 12 2.7 12 2.7z" />
                      </svg>
                      {rain == null ? '–' : `${rain}%`}
                    </span>
                  </div>
                );
              })}
            </div>
          </>
        )}
      </div>
    </section>
  );
}
