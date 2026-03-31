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
  const icons = [<Globe size={28} />, <Lightbulb size={28} />, <UserCheck size={28} />, <Eye size={28} />];
  
  const highlights = dictionary.highlights.map((h, i) => ({
    ...h,
    icon: icons[i] || <Globe size={28} />
  }));

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: 0.6, ease: "easeOut" } 
    }
  };

  return (
    <section id="quienes-somos" style={{ position: 'relative', overflow: 'hidden', padding: '10rem 1.5rem', backgroundColor: '#050505' }}>
      {/* Background Decor */}
      <div style={{
        position: 'absolute',
        top: '10%',
        right: '-5%',
        width: '400px',
        height: '400px',
        background: 'radial-gradient(circle, rgba(178, 181, 224, 0.03) 0%, transparent 70%)',
        filter: 'blur(60px)',
        zIndex: 0,
        pointerEvents: 'none'
      }}></div>

      <div style={{ maxWidth: '1200px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
        {/* Centered Header */}
        <div style={{ textAlign: 'center', maxWidth: '900px', margin: '0 auto 6rem auto' }}>
          <motion.p 
            initial={{ opacity: 0, letterSpacing: '0.1em' }}
            whileInView={{ opacity: 1, letterSpacing: '0.2em' }}
            viewport={{ once: true }}
            className="serif" 
            style={{ 
              color: 'var(--primary)', 
              textTransform: 'uppercase', 
              fontSize: '0.875rem', 
              fontWeight: '600', 
              marginBottom: '1.5rem',
              opacity: 0.8
            }}
          >
            {dictionary.tag}
          </motion.p>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="serif" 
            style={{ 
              fontSize: 'max(2.5rem, 4.5vw)', 
              fontWeight: '700', 
              marginBottom: '2.5rem', 
              lineHeight: '1.1',
              color: 'white'
            }}
          >
            {dictionary.title} <span style={{ color: 'var(--primary)', fontStyle: 'italic' }}>{dictionary.titleAccent}</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.2 }}
            style={{ 
              opacity: 0.7, 
              fontSize: '1.25rem', 
              lineHeight: '1.8', 
              color: '#d4d4d8',
              fontWeight: '300'
            }}
          >
            {dictionary.description}
          </motion.p>
        </div>

        {/* Organized Grid */}
        <motion.div 
          className="highlights-grid"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          style={{ 
            display: 'grid', 
            gap: '2.5rem', 
            marginBottom: '8rem' 
          }}
        >
          {highlights.map((h, i) => (
            <motion.div 
              key={i}
              variants={itemVariants}
              whileHover={{ y: -10, transition: { duration: 0.3 } }}
              className="optimized-highlight-card"
              style={{
                padding: '3.5rem 3rem',
                backgroundColor: 'rgba(255, 255, 255, 0.02)',
                borderRadius: '1.5rem',
                border: '1px solid rgba(255, 255, 255, 0.05)',
                backdropFilter: 'blur(10px)',
                display: 'flex',
                flexDirection: 'column',
                height: '100%',
                transition: 'border-color 0.3s ease, background-color 0.3s ease'
              }}
            >
              <div style={{ 
                color: 'var(--primary)', 
                marginBottom: '2rem', 
                background: 'rgba(255, 255, 255, 0.05)',
                width: 'fit-content',
                padding: '1rem',
                borderRadius: '1rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>{h.icon}</div>
              <h4 className="serif" style={{ fontSize: '1.5rem', marginBottom: '1.25rem', color: 'white', fontWeight: '600' }}>{h.title}</h4>
              <p style={{ fontSize: '1rem', opacity: 0.6, lineHeight: '1.8', color: '#a1a1aa' }}>{h.desc}</p>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
           initial={{ opacity: 0, y: 30 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true }}
           transition={{ duration: 0.8 }}
           style={{ display: 'flex', justifyContent: 'center', marginBottom: '6rem' }}
        >
          <Link href="#contacto">
            <button className="gradient-btn" style={{ padding: '1.25rem 4rem', fontSize: '1rem' }}>{dictionary.cta}</button>
          </Link>
        </motion.div>

        <Carousel />
      </div>
      
      <style jsx>{`
        .highlights-grid {
          grid-template-columns: repeat(2, 1fr);
        }
        .optimized-highlight-card:hover {
          background-color: rgba(255, 255, 255, 0.04) !important;
          border-color: rgba(255, 255, 255, 0.1) !important;
        }
        @media (max-width: 900px) {
          .highlights-grid {
            grid-template-columns: 1fr;
            gap: 1.5rem;
          }
          .optimized-highlight-card {
            padding: 2.5rem 2rem !important;
          }
        }
      `}</style>
    </section>
  );
};

export default WhyChooseUs;
