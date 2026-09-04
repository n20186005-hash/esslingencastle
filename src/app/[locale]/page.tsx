import { setRequestLocale } from 'next-intl/server';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import Intro from '@/components/Intro';
import LocalTipsSection from '@/components/LocalTipsSection';
import WeatherSection from '@/components/WeatherSection';
import FacilitiesSection from '@/components/FacilitiesSection';
import HistorySection from '@/components/HistorySection';
import BasicInfo from '@/components/BasicInfo';
import HoursSection from '@/components/HoursSection';
import TicketsSection from '@/components/TicketsSection';
import TransportSection from '@/components/TransportSection';
import Gallery from '@/components/Gallery';
import Reviews from '@/components/Reviews';
import MapEmbed from '@/components/MapEmbed';
import FaqSection from '@/components/FaqSection';
import SourcesSection from '@/components/SourcesSection';
import HomeStructuredData from '@/components/HomeStructuredData';
import Footer from '@/components/Footer';
import { siteFacts } from '@/content/esslinger-burg';

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const pageUrl = `${siteFacts.baseUrl}/${locale}`;

  return (
    <>
      <Header />
      <HomeStructuredData locale={locale} pageUrl={pageUrl} />
      <main>
        <Hero />
        <Intro />
        <LocalTipsSection />
        <WeatherSection />
        <FacilitiesSection />
        <HistorySection />
        <BasicInfo />
        <HoursSection />
        <TicketsSection />
        <TransportSection />
        <Gallery />
        <Reviews />
        <MapEmbed />
        <FaqSection locale={locale} />
        <SourcesSection locale={locale} />
      </main>
      <Footer />
    </>
  );
}
