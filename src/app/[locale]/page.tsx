import Image from "next/image";
import Hero from '@/components/Hero';
import DiscoverMore from '@/components/DiscoverMore';
import Stats from '@/components/Stats';
import Services from '@/components/Services';
import WhyChooseUs from '@/components/WhyChooseUs';
import EventRequestForm from '@/components/EventRequestForm';
import Ticketing from '@/components/Ticketing';
import Footer from '@/components/Footer';
import { getDictionary } from '@/dictionaries/dictionaries';

export default async function Home({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const dictionary = await getDictionary(locale as 'en' | 'es');

  return (
    <main>
      <Hero dictionary={dictionary.hero} />
      <DiscoverMore dictionary={dictionary.discoverMore} />
      <Stats dictionary={dictionary.stats} />
      <WhyChooseUs dictionary={dictionary.whyChooseUs} />
      <Services dictionary={dictionary.services} />
      <Ticketing dictionary={dictionary.ticketing} />
      <EventRequestForm dictionary={dictionary.requestForm} />
      <Footer dictionary={dictionary.footer} />
    </main>
  );
}
