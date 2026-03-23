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
    { label: dictionary.projects, value: '150+' },
    { label: dictionary.clients, value: '50+' },
    { label: dictionary.annual, value: '25+' },
  ];

  return (
    <section className="stats" style={{ backgroundColor: 'rgba(28, 27, 27, 0.4)', backdropFilter: 'blur(5px)', borderTop: '1px solid var(--outline-variant)', borderBottom: '1px solid var(--outline-variant)' }}>
      <div className="section-spacing" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '2rem', textAlign: 'center' }}>
        {statsList.map((stat, index) => (
          <motion.div 
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
          >
            <h2 className="serif" style={{ fontSize: '3.5rem', fontWeight: '700', color: 'var(--primary)', marginBottom: '0.5rem' }}>
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
            gap: 4rem !important;
          }
        }
      `}</style>
    </section>
  );
};

export default Stats;
