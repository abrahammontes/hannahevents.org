import type { Metadata } from "next";
import "../globals.css";
import GlobalVideoBackground from "@/components/GlobalVideoBackground";
import Navbar from "@/components/Navbar";
import { getDictionary } from "@/dictionaries/dictionaries";

export async function generateStaticParams() {
  return [{ locale: 'en' }, { locale: 'es' }];
}

export const metadata: Metadata = {
  title: "HannaH Events | Transformamos Ideas en Experiencias Únicas",
  description: "Diseñamos y producimos eventos corporativos estratégicos a nivel nacional e internacional.",
};

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const dictionary = await getDictionary(locale as 'en' | 'es');

  return (
    <html lang={locale}>
      <body style={{ minHeight: '100vh', margin: 0, padding: 0, backgroundColor: 'transparent' }}>
        <GlobalVideoBackground />
        <Navbar dictionary={dictionary.navbar} locale={locale} />
        <main style={{ position: 'relative', zIndex: 10 }}>
          {children}
        </main>
      </body>
    </html>
  );
}
