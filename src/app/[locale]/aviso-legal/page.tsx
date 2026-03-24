import React from 'react';
import { getDictionary } from '@/dictionaries/dictionaries';

export default async function LegalNotice({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const dictionary = await getDictionary(locale as 'en' | 'es');
  const content = dictionary.legalNotice;

  return (
    <div className="section-spacing" style={{ paddingTop: '10rem' }}>
      <div className="glass" style={{ 
        maxWidth: '800px', 
        margin: '0 auto', 
        padding: '3rem', 
        borderRadius: '1.5rem',
        border: '1px solid var(--outline-variant)'
      }}>
        <h1 className="serif" style={{ fontSize: '2.5rem', marginBottom: '1rem', color: 'var(--primary)' }}>
          {content.title}
        </h1>
        <p style={{ opacity: 0.6, fontSize: '0.875rem', marginBottom: '2.5rem' }}>
          {content.lastUpdated}
        </p>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          {content.sections.map((section: any, index: number) => (
            <div key={index}>
              <h2 className="serif" style={{ fontSize: '1.25rem', marginBottom: '0.75rem', fontWeight: '600' }}>
                {section.title}
              </h2>
              <p style={{ opacity: 0.8, lineHeight: '1.7' }}>
                {section.content}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
