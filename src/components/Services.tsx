'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Briefcase, Zap, Users } from 'lucide-react';

interface ServicesProps {
  dictionary: {
    tag: string;
    title: string;
    titleAccent: string;
    list: { title: string; desc: string }[];
  };
}

const Services = ({ dictionary }: ServicesProps) => {
  const icons = [<Briefcase size={32} color="var(--primary)" />, <Zap size={32} color="var(--primary)" />, <Users size={32} color="var(--primary)" />];
  
  const servicesList = dictionary.list.map((s, i) => ({
    ...s,
    icon: icons[i] || <Briefcase size={32} color="var(--primary)" />
  }));

  return (
    <section id="servicios" className="section-spacing" style={{ backgroundColor: 'rgba(19, 19, 19, 0.4)' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <p className="serif" style={{ color: 'var(--primary)', textTransform: 'uppercase', letterSpacing: '0.2em', fontSize: '0.875rem', fontWeight: '600', marginBottom: '1rem' }}>{dictionary.tag}</p>
          <h2 className="serif" style={{ fontSize: 'max(2.5rem, 4vw)', fontWeight: '700' }}>{dictionary.title} <span style={{ color: 'var(--primary)' }}>{dictionary.titleAccent}</span></h2>
        </div>

        <div className="responsive-grid">
          {servicesList.map((service, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="service-card"
              whileHover={{ y: -10, borderColor: 'var(--primary)' }}
            >
              <div style={{ marginBottom: '1.5rem' }}>{service.icon}</div>
              <h3 className="serif" style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>{service.title}</h3>
              <p style={{ opacity: 0.7, lineHeight: '1.6' }}>{service.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
      <style jsx>{`
        .service-card {
          padding: 2rem 1.75rem;
          background-color: var(--surface-container-high);
          border-radius: 0.5rem;
          border: 1px solid var(--outline-variant);
          transition: all 0.3s ease;
        }
        
        @media (max-width: 1024px) {
          .service-card {
            display: flex !important;
            flex-direction: column !important;
            align-items: center !important;
            text-align: center !important;
          }
        }
      `}</style>
    </section>
  );
};

export default Services;
