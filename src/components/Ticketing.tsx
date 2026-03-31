'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Ticket, ShieldCheck, Zap } from 'lucide-react';

interface TicketingProps {
  dictionary: {
    title: string;
    description: string;
    cta: string;
    featureTitle: string;
    featureDesc: string;
  };
}

const Ticketing = ({ dictionary }: TicketingProps) => {
  const highlights = [
    { icon: <Ticket size={24} />, title: "Control total" },
    { icon: <ShieldCheck size={24} />, title: "Seguridad bancaria" },
    { icon: <Zap size={24} />, title: "Acceso rápido" }
  ];

  return (
    <section id="boletaje" className="ticketing-section" style={{ position: 'relative', overflow: 'hidden', padding: '10rem 1.5rem', backgroundColor: '#020d21' }}>
      {/* Background Decor */}
      <div style={{
        position: 'absolute',
        bottom: '-10%',
        left: '-5%',
        width: '500px',
        height: '500px',
        background: 'radial-gradient(circle, rgba(178, 181, 224, 0.04) 0%, transparent 70%)',
        filter: 'blur(80px)',
        zIndex: 0,
        pointerEvents: 'none'
      }}></div>

      <div style={{ maxWidth: '1200px', margin: '0 auto', position: 'relative', zIndex: 1, display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) minmax(0, 1fr)', gap: '4rem', alignItems: 'center' }} className="ticketing-grid">
        
        {/* Left: Text Content */}
        <motion.div
           initial={{ opacity: 0, x: -30 }}
           whileInView={{ opacity: 1, x: 0 }}
           viewport={{ once: true }}
           transition={{ duration: 0.8 }}
        >
          <p className="serif" style={{ color: 'var(--primary)', textTransform: 'uppercase', letterSpacing: '0.2em', fontSize: '0.875rem', fontWeight: '600', marginBottom: '1.5rem' }}>
            Servicio especializado
          </p>
          <h2 className="serif" style={{ fontSize: 'max(2.5rem, 4vw)', fontWeight: '700', marginBottom: '2.5rem', lineHeight: '1.1', color: 'white' }}>
            {dictionary.title}
          </h2>
          <p style={{ opacity: 0.7, fontSize: '1.25rem', lineHeight: '1.8', color: '#d4d4d8', marginBottom: '3rem', fontWeight: '300' }}>
            {dictionary.description}
          </p>

          <div style={{ display: 'flex', gap: '2rem', marginBottom: '3rem' }}>
            {highlights.map((h, i) => (
              <div key={i} style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                <div style={{ color: 'var(--primary)', opacity: 0.8 }}>{h.icon}</div>
                <span style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.1em', opacity: 0.6 }}>{h.title}</span>
              </div>
            ))}
          </div>

          <button className="gradient-btn" style={{ padding: '1.25rem 3.5rem', fontSize: '1rem' }}>{dictionary.cta}</button>
        </motion.div>

        {/* Right: Visual Element (Glass Card) */}
        <motion.div
           initial={{ opacity: 0, scale: 0.9 }}
           whileInView={{ opacity: 1, scale: 1 }}
           viewport={{ once: true }}
           transition={{ duration: 1 }}
           style={{ 
             background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.03) 0%, rgba(255, 255, 255, 0.01) 100%)',
             padding: '4rem',
             borderRadius: '2rem',
             border: '1px solid rgba(255, 255, 255, 0.05)',
             backdropFilter: 'blur(20px)',
             boxShadow: '0 40px 100px -20px rgba(0,0,0,0.5)',
             display: 'flex',
             flexDirection: 'column',
             alignItems: 'center',
             justifyContent: 'center',
             textAlign: 'center'
           }}
        >
          <div style={{ position: 'relative', width: '200px', height: '120px', marginBottom: '2rem' }}>
             {/* Abstract Ticket Shape */}
             <div style={{ position: 'absolute', inset: 0, border: '2px dashed var(--primary)', borderRadius: '1rem', opacity: 0.3 }}></div>
             <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}>
               <Ticket size={80} strokeWidth={1} color="var(--primary)" />
             </div>
          </div>
          <h3 className="serif" style={{ fontSize: '2rem', marginBottom: '1rem', color: 'white' }}>{dictionary.featureTitle}</h3>
          <p style={{ opacity: 0.5, fontSize: '0.875rem' }}>{dictionary.featureDesc}</p>
        </motion.div>

      </div>

      <style jsx>{`
        @media (max-width: 900px) {
          .ticketing-grid {
            grid-template-columns: 1fr !important;
            gap: 4rem !important;
            text-align: center;
          }
          .ticketing-grid > div:first-child div {
            justify-content: center;
          }
        }
      `}</style>
    </section>
  );
};

export default Ticketing;
