'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const images = [
  '/images/event1.png',
  '/images/event2.png',
  '/images/event3.png',
  '/images/event4.png'
];

const Carousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const next = () => setCurrentIndex((prev) => (prev + 1) % images.length);
  const prev = () => setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);

  return (
    <div className="carousel-container" style={{ position: 'relative', width: '100%', borderRadius: '1rem', marginTop: '4rem', overflow: 'hidden' }}>
      <AnimatePresence mode="popLayout">
        <motion.img
          key={currentIndex}
          src={images[currentIndex]}
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.8, ease: 'easeInOut' }}
          style={{ width: '100%', height: '100%', objectFit: 'cover', position: 'absolute', inset: 0 }}
        />
      </AnimatePresence>
      
      {/* Overlay */}
      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.4) 0%, transparent 50%)', pointerEvents: 'none' }}></div>

      <style jsx>{`
        .carousel-container {
          aspect-ratio: 16 / 9;
          height: auto;
        }
        @media (max-width: 768px) {
          .carousel-container {
            aspect-ratio: 4 / 3;
            min-height: 350px;
          }
        }
        @media (min-width: 1400px) {
          .carousel-container {
            height: 600px;
          }
        }
      `}</style>

      {/* Controls */}
      <button 
        onClick={prev}
        style={{ position: 'absolute', left: '1.5rem', top: '50%', transform: 'translateY(-50%)', background: 'rgba(255,255,255,0.1)', backdropFilter: 'blur(10px)', border: 'none', borderRadius: '50%', width: '3rem', height: '3rem', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', zIndex: 10 }}
      >
        <ChevronLeft color="white" />
      </button>
      <button 
        onClick={next}
        style={{ position: 'absolute', right: '1.5rem', top: '50%', transform: 'translateY(-50%)', background: 'rgba(255,255,255,0.1)', backdropFilter: 'blur(10px)', border: 'none', borderRadius: '50%', width: '3rem', height: '3rem', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', zIndex: 10 }}
      >
        <ChevronRight color="white" />
      </button>

      {/* Pagination */}
      <div style={{ position: 'absolute', bottom: '1.5rem', left: '50%', transform: 'translateX(-50%)', display: 'flex', gap: '0.5rem', zIndex: 10 }}>
        {images.map((_, i) => (
          <div 
            key={i} 
            style={{ 
              width: i === currentIndex ? '2rem' : '0.5rem', 
              height: '0.5rem', 
              borderRadius: '1rem', 
              backgroundColor: i === currentIndex ? 'var(--primary)' : 'rgba(255,255,255,0.3)', 
              transition: 'all 0.3s ease' 
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default Carousel;
