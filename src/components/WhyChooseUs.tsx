'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Globe, Lightbulb, UserCheck, Eye } from 'lucide-react';

import Carousel from './Carousel';

interface WhyChooseUsProps {
  dictionary: {
    tag: string;
    title: string;
    titleAccent: string;
    description: string;
    cta: string;
    highlights: { title: string; desc: string }[];
  };
}

const WhyChooseUs = ({ dictionary }: WhyChooseUsProps) => {
  const icons = [<Globe size={24} />, <Lightbulb size={24} />, <UserCheck size={24} />, <Eye size={24} />];
  
  const highlights = dictionary.highlights.map((h, i) => ({
    ...h,
    icon: icons[i] || <Globe size={24} />
  }));

  return (
    <section id="quienes-somos" style={{ backgroundColor: 'rgba(14, 14, 14, 0.6)', backdropFilter: 'blur(10px)' }}>
      <div className="section-spacing" style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{ display: 'flex', gap: '2.5rem', alignItems: 'center', marginBottom: '2.5rem' }}>
          <div style={{ flex: 1 }}>
            <p className="serif" style={{ color: 'var(--primary)', textTransform: 'uppercase', letterSpacing: '0.2em', fontSize: '0.875rem', fontWeight: '600', marginBottom: '1rem' }}>{dictionary.tag}</p>
            <h2 className="serif" style={{ fontSize: 'max(2.5rem, 4vw)', fontWeight: '700', marginBottom: '2rem', lineHeight: '1.2' }}>
              {dictionary.title} <span style={{ color: 'var(--primary)' }}>{dictionary.titleAccent}</span>
            </h2>
            <p style={{ opacity: 0.7, fontSize: '1.125rem', lineHeight: '1.7', marginBottom: '3rem' }}>
              {dictionary.description}
            </p>
            <Link href="#contacto">
              <button className="gradient-btn">{dictionary.cta}</button>
            </Link>
          </div>

          <div style={{ flex: 1.2, display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1.5rem' }}>
            {highlights.map((h, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                style={{ 
                  padding: '2.5rem', 
                  backgroundColor: 'var(--surface-container-low)', 
                  borderRadius: '0.5rem',
                  border: '1px solid var(--outline-variant)'
                }}
              >
                <div style={{ color: 'var(--primary)', marginBottom: '1.25rem' }}>{h.icon}</div>
                <h4 className="serif" style={{ fontSize: '1.25rem', marginBottom: '0.75rem' }}>{h.title}</h4>
                <p style={{ fontSize: '0.875rem', opacity: 0.6, lineHeight: '1.6' }}>{h.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>

        <Carousel />
      </div>
      <style jsx>{`
        @media (max-width: 992px) {
          .section-spacing {
            flex-direction: column !important;
            text-align: center;
          }
          div[style*="gridTemplateColumns"] {
            width: 100%;
          }
        }
        @media (max-width: 600px) {
          div[style*="gridTemplateColumns"] {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
};

export default WhyChooseUs;
