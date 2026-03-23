import Hero from '@/components/Hero';
import Stats from '@/components/Stats';
import Services from '@/components/Services';
import WhyChooseUs from '@/components/WhyChooseUs';
import Footer from '@/components/Footer';
import ContactForm from '@/components/ContactForm';
import { getDictionary } from '@/dictionaries/dictionaries';
import type { Metadata } from 'next';

export async function generateStaticParams() {
  return [{ locale: 'en' }, { locale: 'es' }];
}

export const metadata: Metadata = {
  title: "HannaH Events | Transformamos Ideas en Experiencias Únicas",
  description: "Diseñamos y producimos eventos corporativos estratégicos a nivel nacional e internacional.",
};

export const dynamicParams = false;

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
      <ContactForm dictionary={dictionary.contactForm} />
      <Footer dictionary={dictionary.footer} />
    </main>
  );
}
