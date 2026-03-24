'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';

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
    { name: dictionary.home, href: `/${locale}` },
    { name: dictionary.about, href: `/${locale}#quienes-somos` },
    { name: dictionary.services, href: `/${locale}#servicios` },
    { name: dictionary.contact, href: `/${locale}#contacto` },
  ];

  const toggleLanguage = () => {
    const nextLocale = locale === 'es' ? 'en' : 'es';
    const currentPath = window.location.pathname;
    // Basic replacement for the root locale segment
    const segments = currentPath.split('/');
    segments[1] = nextLocale;
    const newPath = segments.join('/');
    window.location.href = newPath;
  };

  return (
    <nav 
      className={isScrolled ? 'glass' : ''} 
      style={{ 
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
        padding: isScrolled ? '1rem 4rem' : '2rem 4rem',
        backgroundColor: isScrolled ? 'rgba(28, 27, 27, 0.8)' : 'rgba(0, 0, 0, 0.4)',
        backdropFilter: 'blur(10px)',
        transition: 'all 0.4s ease',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        boxShadow: isScrolled ? '0 10px 30px rgba(0,0,0,0.3)' : 'none'
      }}
    >
      <div className="logo">
        <Link href={`/${locale}`}>
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
        
        {/* Language Switcher */}
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
          onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgba(233, 193, 118, 0.1)'}
          onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
        >
          {locale === 'es' ? 'English' : 'Español'}
        </button>

        <Link href={`/${locale}#contacto`} className="gradient-btn" style={{ padding: '0.5rem 1.25rem', textDecoration: 'none' }}>
          {dictionary.cta}
        </Link>
      </div>

      {/* Mobile Menu Toggle (Simplified for now) */}
      <div className="mobile-toggle" style={{ display: 'none' }}>
        <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
          {mobileMenuOpen ? <X color="var(--foreground)" /> : <Menu color="var(--foreground)" />}
        </button>
      </div>

      <style jsx>{`
        @media (max-width: 768px) {
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
