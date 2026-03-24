'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface NavbarProps {
  dictionary: {
    home: string;
    about: string;
    services: string;
    contact: string;
    cta: string;
  };
  locale: string;
}

const Navbar = ({ dictionary, locale }: NavbarProps) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: dictionary.home, href: '/' },
    { name: dictionary.about, href: '#quienes-somos' },
    { name: dictionary.services, href: '#servicios' },
    { name: dictionary.contact, href: '#contacto' },
  ];

  const toggleLanguage = () => {
    const nextLocale = locale === 'es' ? 'en' : 'es';
    // Set cookie for middleware to see
    document.cookie = `NEXT_LOCALE=${nextLocale}; path=/; max-age=31536000`;
    // Refresh to trigger middleware rewrite
    window.location.reload();
  };

  return (
    <nav 
      className={`navbar ${isScrolled ? 'scrolled glass' : ''}`}
      style={{ 
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
        padding: isScrolled ? '1rem 4rem' : '1.5rem 4rem',
        backgroundColor: isScrolled ? 'rgba(28, 27, 27, 0.95)' : 'rgba(0, 0, 0, 0.4)',
        backdropFilter: 'blur(10px)',
        transition: 'all 0.4s ease',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        boxShadow: isScrolled ? '0 10px 30px rgba(0,0,0,0.5)' : 'none'
      }}
    >
      <div className="logo">
        <Link href="/">
          <img src="/images/logo.png" alt="HANNAH EVENTS" style={{ height: '80px', objectFit: 'contain', transition: 'height 0.3s ease' }} />
        </Link>
      </div>

      {/* Desktop Links */}
      <div className="desktop-links" style={{ display: 'flex', gap: '2.5rem', alignItems: 'center' }}>
        {navLinks.map((link) => (
          <Link key={link.name} href={link.href} style={{ fontSize: '0.875rem', fontWeight: '500', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
            {link.name}
          </Link>
        ))}
        
        <button 
          onClick={toggleLanguage}
          style={{ 
            fontSize: '0.75rem', 
            fontWeight: 'bold', 
            textTransform: 'uppercase', 
            letterSpacing: '0.1em', 
            border: '1px solid rgba(233, 193, 118, 0.3)', 
            padding: '0.25rem 0.75rem', 
            borderRadius: '4px', 
            backgroundColor: 'transparent',
            color: 'var(--primary)',
            cursor: 'pointer',
            transition: 'background-color 0.3s ease'
          }}
        >
          {locale === 'es' ? 'English' : 'Español'}
        </button>

        <Link href="#contacto" className="gradient-btn" style={{ padding: '0.5rem 1.25rem', textDecoration: 'none' }}>
          {dictionary.cta}
        </Link>
      </div>

      {/* Mobile Menu Toggle */}
      <div className="mobile-toggle">
        <button 
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          style={{ background: 'none', border: 'none', cursor: 'pointer', zIndex: 1100, position: 'relative' }}
        >
          {mobileMenuOpen ? <X color="var(--foreground)" size={32} /> : <Menu color="var(--foreground)" size={32} />}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            style={{
              position: 'fixed',
              top: 0,
              right: 0,
              width: '100%',
              height: '100vh',
              backgroundColor: 'rgba(19, 19, 19, 0.98)',
              backdropFilter: 'blur(20px)',
              zIndex: 1050,
              display: 'flex',
              flexDirection: 'column',
              padding: '8rem 2rem 2rem'
            }}
          >
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
              {navLinks.map((link) => (
                <Link 
                  key={link.name} 
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  style={{ fontSize: '2rem', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--foreground)' }}
                >
                  {link.name}
                </Link>
              ))}
              
              <div style={{ marginTop: '2rem', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                <button 
                  onClick={() => { toggleLanguage(); setMobileMenuOpen(false); }}
                  style={{ 
                    fontSize: '1rem', 
                    fontWeight: 'bold', 
                    padding: '1rem', 
                    borderRadius: '8px', 
                    border: '1px solid var(--primary)',
                    backgroundColor: 'transparent',
                    color: 'var(--primary)',
                    textAlign: 'center'
                  }}
                >
                  {locale === 'es' ? 'Switch to English' : 'Cambiar a Español'}
                </button>
                
                <Link 
                  href="#contacto" 
                  className="gradient-btn" 
                  onClick={() => setMobileMenuOpen(false)}
                  style={{ padding: '1rem', textAlign: 'center', textDecoration: 'none' }}
                >
                  {dictionary.cta}
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <style jsx>{`
        .mobile-toggle {
          display: none;
        }
        @media (max-width: 1024px) {
          nav {
            padding: 1rem 1.5rem !important;
          }
          .logo img {
            height: 60px !important;
          }
          .desktop-links {
            display: none !important;
          }
          .mobile-toggle {
            display: block !important;
          }
        }
      `}</style>
    </nav>
  );
};

export default Navbar;
