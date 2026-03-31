'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface StatsProps {
  dictionary: {
    projects: string;
    clients: string;
    annual: string;
  };
}

const Stats = ({ dictionary }: StatsProps) => {
  const statsList = [
    { label: dictionary.projects, value: '200+' },
    { label: dictionary.clients, value: '60+' },
    { label: dictionary.annual, value: '50+' },
  ];

  return (
    <section className="stats" style={{ backgroundColor: 'rgba(28, 27, 27, 0.15)', backdropFilter: 'blur(30px)', borderTop: '1px solid var(--outline-variant)', borderBottom: '1px solid var(--outline-variant)' }}>
      <div className="section-spacing responsive-grid" style={{ maxWidth: '1200px', margin: '0 auto', textAlign: 'center' }}>
        {statsList.map((stat, index) => (
          <motion.div 
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
          >
            <h2 className="serif stats-value" style={{ fontWeight: '700', color: 'var(--primary)', marginBottom: '0.5rem' }}>
              {stat.value}
            </h2>
            <p style={{ fontSize: '1rem', textTransform: 'uppercase', letterSpacing: '0.1em', opacity: 0.8, fontWeight: '500' }}>
              {stat.label}
            </p>
          </motion.div>
        ))}
      </div>
      <style jsx>{`
        @media (max-width: 768px) {
          .section-spacing {
            grid-template-columns: 1fr !important;
            gap: 2rem !important;
          }
        }
      `}</style>
    </section>
  );
};

export default Stats;
