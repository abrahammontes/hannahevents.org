'use client';

import React from 'react';

const GlobalVideoBackground = () => {
  return (
    <div 
      className="global-video-container" 
      style={{ 
        position: 'fixed', 
        top: 0, 
        left: 0, 
        width: '100vw', 
        height: '100vh', 
        zIndex: -1,
        overflow: 'hidden',
        backgroundColor: '#000'
      }}
    >
      <iframe
        src="https://www.youtube.com/embed/hmkHPI32D5Y?autoplay=1&mute=1&loop=1&playlist=hmkHPI32D5Y&controls=0&showinfo=0&rel=0&iv_load_policy=3&modestbranding=1"
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          width: '100vw',
          height: '56.25vw',
          minHeight: '100vh',
          minWidth: '177.77vh',
          transform: 'translate(-50%, -50%) scale(1.1)',
          pointerEvents: 'none',
          filter: 'brightness(0.4) contrast(1.1)',
          zIndex: 1
        }}
        frameBorder="0"
        allow="autoplay; encrypted-media"
      ></iframe>
      {/* Semi-transparent overlay for readability */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        background: 'rgba(0, 0, 0, 0.4)',
        zIndex: 2
      }}></div>
    </div>
  );
};

export default GlobalVideoBackground;
