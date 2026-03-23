'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface HeroProps {
  dictionary: {
    title: string;
    titleAccent: string;
    description: string;
    ctaPrimary: string;
    ctaSecondary: string;
  };
}

const Hero = ({ dictionary }: HeroProps) => {
  return (
    <section className="hero" style={{ height: '100vh', width: '100%', position: 'relative', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: 'transparent' }}>
      {/* Content */}
      <div 
        className="hero-content" 
        style={{ 
          textAlign: 'center', 
          maxWidth: '900px', 
          padding: '0 2rem', 
          zIndex: 10,
          position: 'relative'
        }}
      >
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="serif" 
          style={{ 
            fontSize: 'max(3rem, 5vw)', 
            lineHeight: '1.1', 
            marginBottom: '1.5rem', 
            color: 'white',
            fontWeight: '700'
          }}
        >
          {dictionary.title} <span style={{ color: 'var(--primary)' }}>{dictionary.titleAccent}</span>
        </motion.h1>
        
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          style={{ 
            fontSize: '1.25rem', 
            fontWeight: '300', 
            lineHeight: '1.6', 
            marginBottom: '2.5rem',
            color: '#e5e2e1',
            letterSpacing: '0.02em'
          }}
        >
          {dictionary.description}
        </motion.p>
        
        <motion.div
           initial={{ opacity: 0, y: 20 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
           style={{ display: 'flex', gap: '1.5rem', justifyContent: 'center' }}
        >
          <button className="gradient-btn" style={{ padding: '1rem 2.5rem', fontSize: '1rem' }}>{dictionary.ctaPrimary}</button>
          <button style={{ 
            background: 'transparent', 
            border: '1px solid var(--outline)', 
            color: 'white', 
            padding: '1rem 2.5rem', 
            borderRadius: '0.25rem',
            textTransform: 'uppercase',
            letterSpacing: '0.1em',
            fontSize: '0.875rem',
            fontWeight: '600',
            cursor: 'pointer'
          }}>{dictionary.ctaSecondary}</button>
        </motion.div>
      </div>

      <div style={{
        position: 'absolute',
        bottom: '2rem',
        left: '50%',
        transform: 'translateX(-50%)',
        opacity: 0.6
      }}>
        <div style={{
          width: '24px',
          height: '40px',
          borderRadius: '12px',
          border: '2px solid white',
          display: 'flex',
          justifyContent: 'center',
          paddingTop: '6px'
        }}>
          <motion.div 
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
            style={{ width: '4px', height: '8px', backgroundColor: 'white', borderRadius: '2px' }} 
          />
        </div>
      </div>
    </section>
  );
};

export default Hero;
