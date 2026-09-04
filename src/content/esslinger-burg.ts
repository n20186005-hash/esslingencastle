// Central single-attraction SEO entity configuration.
// All schema.org / visible-language strings that bind the domain name
// (esslingencastle.com = "Esslingen Castle") to the official landmark
// (Esslinger Burg) are defined here, in one place, for all three locales.

export const LOCALES = ['de', 'en', 'zh'] as const;
export type Locale = (typeof LOCALES)[number];

/**
 * Deployment domain – single source of truth for canonical URLs, hreflang,
 * sitemap and Open Graph metadata.
 *
 * Override per build/deployment without touching any code:
 *   NEXT_PUBLIC_CURRENT_SITE_DOMAIN=example.com npm run build
 * Falls back to the default domain of this project.
 */
export const DEFAULT_SITE_DOMAIN = 'esslingencastle.com';
export const SITE_DOMAIN: string =
  process.env.NEXT_PUBLIC_CURRENT_SITE_DOMAIN || DEFAULT_SITE_DOMAIN;

export const siteFacts = {
  domain: SITE_DOMAIN,
  baseUrl: `https://${SITE_DOMAIN}`,
  // Official / legal name of the landmark (Google listing name)
  officialName: 'Esslinger Burg',
  // Brand name behind the domain name
  brandName: 'Esslingen Castle',
  city: 'Esslingen am Neckar',
  region: 'Baden-Württemberg',
  country: 'Germany',
  countryCode: 'DE',
  postalCode: '73728',
  street: 'Esslinger Burg, Auf dem Schönenberg',
  plusCode: 'P8W5+5X',
  latitude: 48.745412,
  longitude: 9.309966,
  telephone: '+4971141111700',
  ratingValue: '4.7',
  reviewCount: '5857',
  mapsShareUrl: 'https://maps.app.goo.gl/khRRKyGF1aMdSVT69',
  mapsEmbedSrc:
    'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3716.8457936044356!2d9.309965999999998!3d48.74541209999999!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4799c6ccd4853f05%3A0xa8807d6057b13656!2sEsslingen%20Castle!5e1!3m2!1sen!2s!4v1788534980628!5m2!1sen!2s',
  images: [
    '/gallery/esslingen-castle (1).jpg',
    '/gallery/esslingen-castle (2).jpg',
    '/gallery/esslingen-castle (4).jpg',
  ],
} as const;

export const absUrl = (path: string) => `${siteFacts.baseUrl}${path}`;

/** Geographic breadcrumb / hierarchy labels per locale. */
export const placeNames: Record<Locale, { locality: string; region: string; country: string }> = {
  de: { locality: 'Esslingen am Neckar', region: 'Baden-Württemberg', country: 'Deutschland' },
  en: { locality: 'Esslingen am Neckar', region: 'Baden-Württemberg', country: 'Germany' },
  zh: { locality: '内卡河畔埃斯林根', region: '巴登-符腾堡州', country: '德国' },
};

export const placeHierarchy: Record<Locale, string[]> = {
  de: ['Esslinger Burg', 'Esslingen am Neckar', 'Baden-Württemberg', 'Deutschland'],
  en: ['Esslinger Burg', 'Esslingen am Neckar', 'Baden-Württemberg', 'Germany'],
  zh: ['Esslinger Burg（埃斯林根堡）', '内卡河畔埃斯林根', '巴登-符腾堡州', '德国'],
};

/** Nearby landmark cluster (semantic context of the old town). */
export const landmarkNames: Record<Locale, { landmark1: string; landmark2: string }> = {
  de: {
    landmark1: 'dem Marktplatz mit dem Historischen Rathaus',
    landmark2: 'der gotischen Stadtkirche St. Dionys',
  },
  en: {
    landmark1: 'the Marktplatz with its historic Town Hall',
    landmark2: 'the Gothic St. Dionys Church',
  },
  zh: {
    landmark1: '带有历史市政厅的市场广场',
    landmark2: '哥特式圣狄奥尼修斯教堂',
  },
};

/** Copy for the map / location block (semantic paragraph 4.3 + official links). */
export const mapCopy: Record<
  Locale,
  {
    lead: string;
    landmarks: string;
    officialTitle: string;
    officialSubtitle: string;
  }
> = {
  de: {
    lead: 'Die Esslinger Burg (Esslingen Castle) liegt auf dem Schönenberg direkt über der Altstadt von Esslingen am Neckar – Adresse: Esslinger Burg, 73728 Esslingen am Neckar, Baden-Württemberg, Deutschland.',
    landmarks:
      'Vom Burgplatz lassen sich die wichtigsten Sehenswürdigkeiten der mittelalterlichen Fachwerkstadt bequem zu Fuß erkunden – insbesondere den Marktplatz mit dem Historischen Rathaus und die gotische Stadtkirche St. Dionys.',
    officialTitle: 'Offizielle Informationen',
    officialSubtitle:
      'Amtliche und touristische Informationen rund um die Stadt Esslingen am Neckar und die Region.',
  },
  en: {
    lead: 'Esslinger Burg (Esslingen Castle) sits on the Schönenberg hill directly above the old town of Esslingen am Neckar – address: Esslinger Burg, 73728 Esslingen am Neckar, Baden-Württemberg, Germany.',
    landmarks:
      'From the Burgplatz you can comfortably explore the key sights of the medieval half-timbered old town on foot – especially the Marktplatz with its historic Town Hall and the Gothic St. Dionys Church.',
    officialTitle: 'Official Information',
    officialSubtitle:
      'Official and tourist information about the town of Esslingen am Neckar and the region.',
  },
  zh: {
    lead: '埃斯林根堡（Esslingen Castle）位于内卡河畔埃斯林根老城上方的 Schönenberg 山坡，地址：Esslinger Burg, 73728 Esslingen am Neckar, 德国巴登-符腾堡州。',
    landmarks:
      '从城堡广场步行即可轻松探访老城的重要地标——带有历史市政厅的市场广场与哥特式圣狄奥尼修斯教堂均在几分钟路程内。',
    officialTitle: '官方信息',
    officialSubtitle: '内卡河畔埃斯林根市及周边地区的官方旅游信息。',
  },
};

export const schemaDescription: Record<Locale, string> = {
  de: 'Esslinger Burg ist das Wahrzeichen von Esslingen am Neckar in Baden-Württemberg – eine mittelalterliche Stadtbefestigung mit Burggarten, Panoramablick über die Altstadt und kostenlosem Zugang.',
  en: 'Esslinger Burg is the landmark of Esslingen am Neckar in Baden-Württemberg – a medieval fortification with a castle garden, panoramic views over the old town and free access.',
  zh: '埃斯林根堡是巴登-符腾堡州埃斯林根的地标，是一座中世纪城市防御工事，拥有城堡花园、老城全景视野，并免费向公众开放。',
};

/** Authority links (official / governmental / cultural heritage) for schema sameAs + footer + sources. */
export const officialLinks: Record<Locale, { name: string; url: string; note: string }[]> = {
  de: [
    {
      name: 'Stadt Esslingen am Neckar',
      url: 'https://www.esslingen.de/start',
      note: 'Offizielles Stadtportal der Stadt Esslingen am Neckar',
    },
    {
      name: 'Tourismus Baden-Württemberg',
      url: 'https://www.visit-bw.com/de',
      note: 'Landesmarketing Baden-Württemberg mbH',
    },
    {
      name: 'Landesamt für Denkmalpflege im RP Stuttgart',
      url: 'https://www.denkmalpflege-bw.de/',
      note: 'Landesbehörde für Bau- und Kulturdenkmale in Baden-Württemberg',
    },
    {
      name: 'Deutsche Digitale Bibliothek',
      url: 'https://www.deutsche-digitale-bibliothek.de/',
      note: 'Zentraler Kulturportal für Kulturerbe in Deutschland',
    },
    {
      name: 'Wikipedia – Esslinger Burg',
      url: 'https://de.wikipedia.org/wiki/Esslinger_Burg',
      note: 'Enzyklopädischer Überblick mit weiterführenden Belegen',
    },
    {
      name: 'Google Maps – Esslinger Burg',
      url: 'https://maps.app.goo.gl/khRRKyGF1aMdSVT69',
      note: 'Standort- und Bewertungsdaten (4,7/5 aus 5.857 Bewertungen)',
    },
  ],
  en: [
    {
      name: 'City of Esslingen am Neckar',
      url: 'https://www.esslingen.de/start',
      note: 'Official portal of the city of Esslingen am Neckar',
    },
    {
      name: 'Tourism in Baden-Württemberg',
      url: 'https://www.visit-bw.com/de',
      note: 'State marketing organisation of Baden-Württemberg',
    },
    {
      name: 'Baden-Württemberg State Office for Monument Preservation',
      url: 'https://www.denkmalpflege-bw.de/',
      note: 'State authority for historic buildings and monuments',
    },
    {
      name: 'German Digital Library',
      url: 'https://www.deutsche-digitale-bibliothek.de/',
      note: 'Central portal for Germany\u2019s cultural heritage',
    },
    {
      name: 'Wikipedia – Esslinger Burg',
      url: 'https://de.wikipedia.org/wiki/Esslinger_Burg',
      note: 'Encyclopedic overview with further references',
    },
    {
      name: 'Google Maps – Esslinger Burg',
      url: 'https://maps.app.goo.gl/khRRKyGF1aMdSVT69',
      note: 'Location and review data (4.7/5 from 5,857 reviews)',
    },
  ],
  zh: [
    {
      name: '埃斯林根市政府官网',
      url: 'https://www.esslingen.de/start',
      note: '埃斯林根市官方门户',
    },
    {
      name: '巴登-符腾堡州旅游局',
      url: 'https://www.visit-bw.com/de',
      note: '巴登-符腾堡州官方旅游推广机构',
    },
    {
      name: '巴登-符腾堡州文物保护局',
      url: 'https://www.denkmalpflege-bw.de/',
      note: '负责巴符州建筑与文化遗产的州立机构',
    },
    {
      name: '德国数字图书馆',
      url: 'https://www.deutsche-digitale-bibliothek.de/',
      note: '德国文化遗产中央数字门户',
    },
    {
      name: '维基百科 – Esslinger Burg',
      url: 'https://de.wikipedia.org/wiki/Esslinger_Burg',
      note: '词条综述，含延伸参考资料',
    },
    {
      name: 'Google 地图 – Esslinger Burg',
      url: 'https://maps.app.goo.gl/khRRKyGF1aMdSVT69',
      note: '位置与点评数据（4.7/5，共 5,857 条点评）',
    },
  ],
};

/** FAQ (visible on page and mirrored into FAQPage schema). */
export interface FaqItem {
  q: string;
  a: string;
}

export const faqCopy: Record<Locale, { title: string; subtitle: string; items: FaqItem[] }> = {
  de: {
    title: 'Häufige Fragen zur Esslinger Burg',
    subtitle: 'Die wichtigsten Antworten für Ihren Besuch der Esslinger Burg in Esslingen am Neckar.',
    items: [
      {
        q: 'Wo genau liegt die Esslinger Burg?',
        a: 'Die Esslinger Burg liegt oberhalb der historischen Altstadt von Esslingen am Neckar in Baden-Württemberg, Deutschland. Adresse: Esslinger Burg, 73728 Esslingen am Neckar. Der Aufstieg erfolgt zu Fuß über die überdachte Burgstaffel (332 Stufen) oder über die Steige durch die Weinberge.',
      },
      {
        q: 'Wie komme ich am besten zur Esslinger Burg?',
        a: 'Zu Fuß erreichen Sie die Burg in ca. 15 Minuten von der Altstadt über die 332-stufige Burgstaffel. Bequemer ist der Weg über die Serpentinen-Steige durch die Weinberge. Wer mit dem Auto anreist, findet oben auf dem Schönenberg einen gebührenpflichtigen Burgparkplatz – die Plätze sind jedoch begrenzt.',
      },
      {
        q: 'Ist der Eintritt zur Esslinger Burg kostenlos?',
        a: 'Ja. Die Burganlage, der Burggarten, der Burgplatz und die Wehrgänge sind öffentlich zugänglich und ganzjährig kostenlos – die Burg ist sogar rund um die Uhr begehbar.',
      },
      {
        q: 'Wie viel Zeit sollte ich für den Besuch einplanen?',
        a: 'Für einen kurzen Besuch mit Blick auf die Altstadt genügen 30–45 Minuten. Wer den Burggarten, die Wehrgänge und die Spielplätze nutzen oder den Sonnenuntergang erleben möchte, sollte 1,5–2 Stunden einplanen.',
      },
      {
        q: 'Ist die Esslinger Burg für Kinder und Hunde geeignet?',
        a: 'Ja. Auf dem Burgplatz und im Burggarten gibt es große Spielplätze, die sich für Kinder eignen. Die Wege und Stufen sind jedoch stellenweise steil und ohne Absperrungen – Kinder beaufsichtigen. Hunde sind willkommen, sollten aber an der Leine geführt werden.',
      },
      {
        q: 'Gibt es an der Burg Parkplätze, Toiletten oder Gastronomie?',
        a: 'Oben am Burgplatz gibt es einen kleinen gebührenpflichtigen Parkplatz. Öffentliche Toiletten und Gastronomie befinden sich derzeit nicht direkt im Burggelände – nutzen Sie dafür die Angebote in der Altstadt (u. a. in den Parkhäusern und am Bahnhof).',
      },
    ],
  },
  en: {
    title: 'Frequently Asked Questions about Esslinger Burg',
    subtitle: 'Everything you need to know before visiting Esslinger Burg in Esslingen am Neckar.',
    items: [
      {
        q: 'Where exactly is Esslinger Burg located?',
        a: 'Esslinger Burg sits above the historic old town of Esslingen am Neckar in Baden-Württemberg, Germany. Address: Esslinger Burg, 73728 Esslingen am Neckar. Reach it on foot via the roofed Burgstaffel staircase (332 steps) or along the Steige path through the vineyards.',
      },
      {
        q: 'What is the best way to get to Esslinger Burg?',
        a: 'Walking from the old town takes about 15 minutes via the 332-step Burgstaffel. The gentler alternative is the winding Steige path through the vineyards. By car, a paid Burgparkplatz with limited spaces is available on the Schönenberg hill.',
      },
      {
        q: 'Is it free to visit Esslinger Burg?',
        a: 'Yes. The fortification, the Burggarten garden, the Burgplatz square and the rampart walk are publicly accessible and free all year round – the site even stays open around the clock.',
      },
      {
        q: 'How much time should I plan for a visit?',
        a: 'A short stop with a view over the old town takes about 30–45 minutes. Allow 1.5–2 hours if you want to enjoy the castle garden, the rampart walks and the playgrounds, or to watch the sunset.',
      },
      {
        q: 'Is Esslinger Burg suitable for children and dogs?',
        a: 'Yes. The Burgplatz and Burggarten have large playgrounds that children love. Paths and steps are steep in places and not fenced, so supervise children. Dogs are welcome but should stay on a lead.',
      },
      {
        q: 'Are there parking, toilets or food options at the castle?',
        a: 'A small paid car park is available at the Burgplatz. There are currently no public toilets or restaurants directly inside the castle grounds – use the facilities in the old town instead, for example in the car parks or near the railway station.',
      },
    ],
  },
  zh: {
    title: '关于埃斯林根堡的常见问题',
    subtitle: '前往埃斯林根（Esslingen am Neckar）埃斯林根堡前，最实用的答案都在这里。',
    items: [
      {
        q: '埃斯林根堡具体在哪里？',
        a: '埃斯林根堡位于德国巴登-符腾堡州内卡河畔埃斯林根的历史老城上方，地址为 Esslinger Burg, 73728 Esslingen am Neckar。可经带顶棚的“城堡阶梯”（Burgstaffel，332 级台阶）或穿行葡萄园的盘山小径（Steige）步行登顶。',
      },
      {
        q: '去埃斯林根堡最方便的方式是什么？',
        a: '从老城步行经 332 级台阶约 15 分钟即可抵达；不想爬台阶可走穿过葡萄园、坡度较缓的盘山小径。自驾可在山上（Schönenberg）的收费城堡停车场停车，但车位有限。',
      },
      {
        q: '参观埃斯林根堡免费吗？',
        a: '免费。城堡主体、城堡花园（Burggarten）、城堡广场（Burgplatz）与城墙步道全部对公众开放，全年免费，并且可以随时前往。',
      },
      {
        q: '参观需要预留多长时间？',
        a: '只登顶俯瞰老城，30–45 分钟即可；若想逛城堡花园、走城墙步道、带孩子去游乐场或欣赏日落，建议预留 1.5–2 小时。',
      },
      {
        q: '埃斯林根堡适合带孩子或宠物吗？',
        a: '适合。城堡广场与花园内设有大型游乐场。部分路段和台阶较陡且没有围栏，请照看好儿童；宠物可以进入，但建议系好牵引绳。',
      },
      {
        q: '城堡附近有停车、厕所和餐饮吗？',
        a: '城堡广场旁设有小型收费停车场。城堡内目前没有公共厕所与餐饮服务，可提前在老城解决，例如各停车楼和火车站附近都有公共卫生间，老城也有众多咖啡馆与餐厅。',
      },
    ],
  },
};

/** Sources / E-E-A-T reference section copy. */
export const sourcesCopy: Record<
  Locale,
  { title: string; subtitle: string; imageRights: string; note: string }
> = {
  de: {
    title: 'Quellen & Referenzen zur Esslinger Burg',
    subtitle:
      'Dieses unabhängige, nicht-kommerzielle Informationsprojekt beruht auf offiziellen, behördlichen und öffentlich zugänglichen Quellen. Historische Darstellungen werden als solche gekennzeichnet, Sagen und Legenden gesondert als ungesicherte Überlieferung ausgewiesen.',
    imageRights: 'Alle auf dieser Website gezeigten Bilder unterliegen den Rechten ihrer jeweiligen Fotografen und Fotografinnen.',
    note: 'Bitte prüfen Sie zeitkritische Angaben (z. B. Gastronomie- oder Öffnungsstatus) vor Ihrer Reise über die offiziellen Quellen.',
  },
  en: {
    title: 'Sources & References on Esslinger Burg',
    subtitle:
      'This independent, non-commercial information project relies on official, governmental and publicly accessible sources. Historical statements are presented as such, while legends and anecdotes are clearly marked as unverified tradition.',
    imageRights: 'All images displayed on this website remain the property and copyright of their respective photographers.',
    note: 'Please verify time-sensitive details (e.g. restaurant or opening status) via the official sources before you travel.',
  },
  zh: {
    title: '资料来源与参考文献',
    subtitle:
      '本非营利独立科普项目基于官方机构与可公开查询的资料来源编写。历史叙述均已标注性质，传说与轶闻则明确注明为“未经考据的口头传说”，与正史区分。',
    imageRights: '本网站所展示的所有图片产权及版权均归原摄影者所有。',
    note: '涉及时效性的信息（如餐饮、开放状态等）请在出行前通过上述官方渠道再次核实。',
  },
};

/** TouristAttraction schema.org payload (per locale). */
export function buildAttractionLd(locale: Locale) {
  const places = placeNames[locale];
  const altNames = [siteFacts.brandName, `${places.locality} ${siteFacts.officialName}`];
  return {
    '@context': 'https://schema.org',
    '@type': ['TouristAttraction', 'HistoricalLandmark'],
    '@id': `${siteFacts.baseUrl}/#attraction`,
    name: siteFacts.officialName,
    alternateName: altNames,
    description: schemaDescription[locale],
    url: siteFacts.baseUrl,
    image: siteFacts.images.map((img) => absUrl(img)),
    inLanguage: locale === 'de' ? 'de' : locale === 'en' ? 'en' : 'zh-CN',
    isAccessibleForFree: true,
    publicAccess: true,
    telephone: siteFacts.telephone,
    address: {
      '@type': 'PostalAddress',
      streetAddress: siteFacts.street,
      addressLocality: places.locality,
      addressRegion: places.region,
      postalCode: siteFacts.postalCode,
      addressCountry: siteFacts.countryCode,
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: siteFacts.latitude,
      longitude: siteFacts.longitude,
    },
    hasMap: siteFacts.mapsShareUrl,
    openingHoursSpecification: {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
      opens: '00:00',
      closes: '23:59',
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: siteFacts.ratingValue,
      reviewCount: siteFacts.reviewCount,
      bestRating: '5',
    },
    sameAs: [
      siteFacts.mapsShareUrl,
      'https://www.esslingen.de/start',
      'https://www.visit-bw.com/de',
      'https://www.denkmalpflege-bw.de/',
      'https://de.wikipedia.org/wiki/Esslinger_Burg',
    ],
  };
}

export function buildFaqLd(locale: Locale) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqCopy[locale].items.map((item) => ({
      '@type': 'Question',
      name: item.q,
      acceptedAnswer: { '@type': 'Answer', text: item.a },
    })),
  };
}

export function buildBreadcrumbLd(locale: Locale, pageUrl: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: placeHierarchy[locale].map((name, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name,
      item: i === 0 ? pageUrl : siteFacts.baseUrl,
    })),
  };
}
