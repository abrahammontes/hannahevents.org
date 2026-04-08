'use client';

import React from 'react';
import { motion } from 'framer-motion';

const images = [
  { src: '/images/carousel/HannaH (1).jpeg', span: 'col-span-2 row-span-2' },
  { src: '/images/carousel/HannaH (12).jpeg', span: 'col-span-1 row-span-1' },
  { src: '/images/carousel/HannaH (13).jpeg', span: 'col-span-1 row-span-2' },
  { src: '/images/carousel/HannaH (15).jpeg', span: 'col-span-1 row-span-1' },
  { src: '/images/carousel/HannaH (16).jpeg', span: 'col-span-2 row-span-1' },
  { src: '/images/carousel/HannaH (17).jpeg', span: 'col-span-1 row-span-1' },
  { src: '/images/carousel/HannaH (18).jpeg', span: 'col-span-1 row-span-2' },
  { src: '/images/carousel/HannaH (19).jpeg', span: 'col-span-2 row-span-2' },
  { src: '/images/carousel/HannaH (20).jpeg', span: 'col-span-1 row-span-1' },
  { src: '/images/carousel/HannaH (21).jpeg', span: 'col-span-1 row-span-1' },
  { src: '/images/carousel/HannaH (22).jpeg', span: 'col-span-2 row-span-1' },
  { src: '/images/carousel/HannaH (23).jpeg', span: 'col-span-1 row-span-1' },
];

const ImageMosaic = () => {
  return (
    <div className="mosaic-container" style={{ width: '100%', marginTop: '4rem' }}>
      <div className="bento-grid">
        {images.map((img, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay: i * 0.05 }}
            className={`mosaic-item ${img.span}`}
          >
            <div className="image-wrapper">
              <img 
                src={img.src} 
                alt={`HannaH Event ${i + 1}`} 
                loading="lazy"
              />
              <div className="overlay"></div>
            </div>
          </motion.div>
        ))}
      </div>

      <style jsx>{`
        .bento-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          grid-auto-rows: 200px;
          gap: 1rem;
        }

        .mosaic-item {
          position: relative;
          overflow: hidden;
          border-radius: 1rem;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.1);
        }

        .image-wrapper {
          width: 100%;
          height: 100%;
          position: relative;
          overflow: hidden;
        }

        img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.6s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .mosaic-item:hover img {
          transform: scale(1.05);
        }

        .overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(to top, rgba(0,0,0,0.3) 0%, transparent 60%);
          opacity: 0;
          transition: opacity 0.3s ease;
        }

        .mosaic-item:hover .overlay {
          opacity: 1;
        }

        /* Spans */
        .col-span-2 { grid-column: span 2; }
        .row-span-2 { grid-row: span 2; }
        .col-span-1 { grid-column: span 1; }
        .row-span-1 { grid-row: span 1; }

        @media (max-width: 1024px) {
          .bento-grid {
            grid-template-columns: repeat(3, 1fr);
            grid-auto-rows: 180px;
          }
        }

        @media (max-width: 768px) {
          .bento-grid {
            grid-template-columns: repeat(2, 1fr);
            grid-auto-rows: 150px;
            gap: 0.75rem;
          }
          /* Reset spans for mobile to avoid broken layouts */
          .col-span-2, .row-span-2 {
            grid-column: span 1;
            grid-row: span 1;
          }
          /* Re-apply some strategic spans for mobile */
          .mosaic-item:nth-child(1),
          .mosaic-item:nth-child(8) {
            grid-column: span 2;
            grid-row: span 2;
          }
        }

        @media (max-width: 480px) {
          .bento-grid {
            grid-template-columns: 1fr;
            grid-auto-rows: 250px;
          }
          .col-span-2, .row-span-2 {
            grid-column: span 1;
            grid-row: span 1;
          }
        }
      `}</style>
    </div>
  );
};

export default ImageMosaic;
