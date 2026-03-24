import Image from "next/image";
import Hero from '@/components/Hero';
import Stats from '@/components/Stats';
import Services from '@/components/Services';
import WhyChooseUs from '@/components/WhyChooseUs';
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
      <Stats dictionary={dictionary.stats} />
      <WhyChooseUs dictionary={dictionary.whyChooseUs} />
      <Services dictionary={dictionary.services} />
      <Footer dictionary={dictionary.footer} />
    </main>
  );
}
