'use client';

import React from 'react';
import Link from 'next/link';
import { Mail, Phone, MapPin, Globe, Briefcase, MessageCircle } from 'lucide-react';

interface FooterProps {
  dictionary: {
    description: string;
    nav: string;
    legal: string;
    contact: string;
    phone: string;
    whatsapp: string;
    email: string;
    location: string;
    rights: string;
    madeBy: string;
  };
}

const Footer = ({ dictionary }: FooterProps) => {
  return (
    <footer id="contacto" style={{ backgroundColor: 'rgba(3, 22, 55, 0.8)', backdropFilter: 'blur(20px)', borderTop: '1px solid var(--outline-variant)', color: 'var(--foreground)', position: 'relative', zIndex: 10 }}>
      <div className="section-spacing" style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <div className="responsive-grid desktop-grid-footer" style={{ gap: '4rem' }}>
          
          <div className="footer-brand">
            <img src="/images/logo.png" alt="HANNAH EVENTS" style={{ height: '100px', objectFit: 'contain', marginBottom: '1.5rem' }} />
            <p style={{ opacity: 0.7, lineHeight: '1.7', marginBottom: '2rem' }}>
              {dictionary.description}
            </p>
          </div>
          
          <div>
            <h4 className="serif" style={{ fontSize: '1.125rem', marginBottom: '1.5rem' }}>{dictionary.nav}</h4>
            <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <li><Link href="#inicio" style={{ opacity: 0.7 }}>Inicio</Link></li>
              <li><Link href="#quienes-somos" style={{ opacity: 0.7 }}>Quiénes Somos</Link></li>
              <li><Link href="#servicios" style={{ opacity: 0.7 }}>Servicios</Link></li>
              <li><Link href="#contacto" style={{ opacity: 0.7 }}>Contacto</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="serif" style={{ fontSize: '1.125rem', marginBottom: '1.5rem' }}>{dictionary.legal}</h4>
            <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <li><Link href="/politica-privacidad" style={{ opacity: 0.7 }}>Política de Privacidad</Link></li>
              <li><Link href="/aviso-legal" style={{ opacity: 0.7 }}>Aviso Legal</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="serif" style={{ fontSize: '1.125rem', marginBottom: '1.5rem' }}>{dictionary.contact}</h4>
            <ul className="footer-contacto-list" style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <li style={{ display: 'flex', gap: '0.75rem', alignItems: 'center', opacity: 0.7 }}>
                <Phone size={18} color="var(--primary)" /> 
                <a href={`tel:${dictionary.phone.replace(/\s/g, '')}`} style={{ color: 'inherit' }}>
                  {dictionary.phone}
                </a>
              </li>
              <li style={{ display: 'flex', gap: '0.75rem', alignItems: 'center', opacity: 0.7 }}>
                <MessageCircle size={18} color="var(--primary)" /> 
                <a href={`https://${dictionary.whatsapp}`} target="_blank" rel="noopener noreferrer" style={{ color: 'inherit' }}>
                  WhatsApp
                </a>
              </li>
              <li style={{ display: 'flex', gap: '0.75rem', alignItems: 'center', opacity: 0.7 }}>
                <Mail size={18} color="var(--primary)" /> <span>{dictionary.email}</span>
              </li>
              <li style={{ display: 'flex', gap: '0.75rem', alignItems: 'center', opacity: 0.7 }}>
                <MapPin size={18} color="var(--primary)" /> <span>{dictionary.location}</span>
              </li>
            </ul>
          </div>
        </div>

        <div style={{ marginTop: '5rem', paddingTop: '2.5rem', borderTop: '1px solid var(--outline-variant)', textAlign: 'center', opacity: 0.5, fontSize: '0.875rem' }}>
          <p>
            © {new Date().getFullYear()} HannaH Events, {dictionary.rights}. {dictionary.madeBy}{' '}
            <a href="https://www.montes.digital" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--primary)', fontWeight: '600', textDecoration: 'underline' }}>
              Montes.Digital
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
