'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface DiscoverMoreProps {
  dictionary: {
    title: string;
    description: string;
  };
}

const videos = [
  { src: '/videos/event-1.mp4', delay: 0 },
  { src: '/videos/event-2.mp4', delay: 2 },
  { src: '/videos/event-3.mp4', delay: 1 }
];

const DiscoverMore = ({ dictionary }: DiscoverMoreProps) => {
  return (
    <section id="descubre-mas" className="discover-more" style={{ 
      padding: '10rem 2rem', 
      position: 'relative', 
      overflow: 'hidden',
      backgroundColor: 'rgba(0, 0, 0, 0.4)', // Subtle tint for the 'fuzzy' effect
      backdropFilter: 'blur(15px)',
      WebkitBackdropFilter: 'blur(15px)',
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center'
    }}>
      {/* Background Decor */}
      <div style={{
        position: 'absolute',
        top: '0',
        left: '0',
        width: '100%',
        height: '100%',
        background: 'radial-gradient(circle at 50% 50%, rgba(178, 181, 224, 0.05) 0%, transparent 80%)',
        pointerEvents: 'none',
        zIndex: 0
      }}></div>

      <div style={{ maxWidth: '1000px', textAlign: 'center', marginBottom: '8rem', zIndex: 10, position: 'relative' }}>
        <motion.p 
          initial={{ opacity: 0, y: -10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          style={{ color: 'var(--primary)', textTransform: 'uppercase', letterSpacing: '0.3em', fontSize: '0.75rem', fontWeight: '700', marginBottom: '1.5rem' }}
        >
          Visualiza nuestra excelencia
        </motion.p>
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="serif"
          style={{ fontSize: 'max(3rem, 5vw)', color: 'white', marginBottom: '2rem', fontWeight: '800', lineHeight: '1.1' }}
        >
          {dictionary.title}
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          style={{ fontSize: '1.25rem', color: '#d1d1d6', lineHeight: '1.8', maxWidth: '700px', margin: '0 auto', fontWeight: '300' }}
        >
          {dictionary.description}
        </motion.p>
      </div>

      <div className="videos-grid-container" style={{ 
        width: '100%', 
        maxWidth: '1400px', 
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gap: '2.5rem',
        alignItems: 'center',
        zIndex: 5,
        position: 'relative'
      }}>
        {videos.map((vid, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.8, delay: index * 0.2 }}
            whileHover={{ scale: 1.05, transition: { duration: 0.4 } }}
            style={{ 
              width: '100%',
              display: 'flex',
              flexDirection: 'column',
              marginTop: index === 1 ? '4rem' : '0', // Stagger effect
              marginBottom: index === 1 ? '0' : '4rem'
            }}
          >
            <motion.div
              style={{
                width: '100%',
                aspectRatio: '16/9',
                borderRadius: '1.5rem',
                overflow: 'hidden',
                boxShadow: '0 30px 60px -15px rgba(0, 0, 0, 0.7)',
                border: '1px solid rgba(255, 255, 255, 0.03)',
                background: 'rgba(255, 255, 255, 0.01)',
                backdropFilter: 'blur(10px)',
                cursor: 'pointer',
                position: 'relative'
              }}
            >
              <video 
                autoPlay 
                loop 
                muted 
                playsInline
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              >
                <source src={vid.src} type="video/mp4" />
              </video>
              
              {/* Glossy Overlay */}
              <div style={{
                position: 'absolute',
                inset: 0,
                background: 'linear-gradient(135deg, rgba(255,255,255,0.05) 0%, transparent 50%)',
                pointerEvents: 'none'
              }}></div>
            </motion.div>
            
            {/* Optional Small Label */}
            <motion.div 
               initial={{ opacity: 0 }} 
               whileInView={{ opacity: 0.4 }} 
               style={{ marginTop: '1.5rem', textAlign: 'center', fontSize: '0.875rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'white' }}
            >
               {index === 0 ? "Diseño de élite" : index === 1 ? "Impacto Global" : "Momentos Únicos"}
            </motion.div>
          </motion.div>
        ))}
      </div>

      <style jsx>{`
        @media (max-width: 1100px) {
          .videos-grid-container {
            grid-template-columns: 1fr 1fr !important;
            gap: 2rem !important;
          }
          .videos-grid-container > div:last-child {
            grid-column: span 2;
            width: 50% !important;
            margin: 0 auto !important;
          }
          .videos-grid-container > div {
            margin-top: 0 !important;
            margin-bottom: 0 !important;
          }
        }
        @media (max-width: 768px) {
          .discover-more {
             padding: 6rem 1.5rem !important;
          }
          .videos-grid-container {
            grid-template-columns: 1fr !important;
            gap: 3rem !important;
          }
          .videos-grid-container > div:last-child {
            width: 100% !important;
          }
          .videos-grid-container > div {
            margin: 0 !important;
          }
        }
      `}</style>
    </section>
  );
};

export default DiscoverMore;
