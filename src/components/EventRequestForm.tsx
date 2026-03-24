'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, Calendar, Users, Mail, Phone, User, MessageSquare, Star } from 'lucide-react';

interface EventRequestFormProps {
  dictionary: {
    tag: string;
    title: string;
    titleAccent: string;
    description: string;
    labels: {
      name: string;
      email: string;
      phone: string;
      eventType: string;
      date: string;
      guests: string;
      message: string;
      country: string;
    };
    options: {
      corporate: string;
      activation: string;
      workshop: string;
      productLaunch: string;
      galaDinner: string;
      other: string;
    };
    countries: {
      mx: string;
      us: string;
      es: string;
      co: string;
      ar: string;
      cl: string;
      pe: string;
      other: string;
    };
    placeholders: {
      name: string;
      email: string;
      phone: string;
      guests: string;
      message: string;
    };
    button: string;
    status: {
      sending: string;
      success: string;
      successDesc: string;
      error: string;
      errorDesc: string;
      retry: string;
    };
  };
}

const EventRequestForm = ({ dictionary }: EventRequestFormProps) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    country: 'mx',
    eventType: 'corporate',
    date: '',
    guests: '',
    message: ''
  });

  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');

  const countryCodes: Record<string, string> = {
    mx: '+52 ',
    us: '+1 ',
    es: '+34 ',
    co: '+57 ',
    ar: '+54 ',
    cl: '+56 ',
    pe: '+51 ',
    other: ''
  };

  // Update phone prefix when country changes
  React.useEffect(() => {
    const newPrefix = countryCodes[formData.country];
    if (!formData.phone || Object.values(countryCodes).some(code => code && formData.phone.startsWith(code))) {
      // If phone is empty or has a previous prefix, replace it
      // Find which prefix it currently has (if any)
      const currentPrefix = Object.values(countryCodes).find(code => code && formData.phone.startsWith(code)) || '';
      const phoneWithoutPrefix = formData.phone.slice(currentPrefix.length);
      setFormData(prev => ({ ...prev, phone: newPrefix + phoneWithoutPrefix }));
    }
  }, [formData.country]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('sending');
    
    try {
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setStatus('success');
        setFormData({ name: '', email: '', phone: '', country: 'mx', eventType: 'corporate', date: '', guests: '', message: '' });
      } else {
        setStatus('error');
      }
    } catch (error) {
      console.error('Email error:', error);
      setStatus('error');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <section id="contacto" className="section-spacing" style={{ backgroundColor: 'transparent', position: 'relative', overflow: 'hidden' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
        <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <p className="serif" style={{ color: 'var(--primary)', textTransform: 'uppercase', letterSpacing: '0.2em', fontSize: '0.875rem', fontWeight: '600', marginBottom: '1rem' }}>
            {dictionary.tag}
          </p>
          <h2 className="serif" style={{ fontSize: 'max(2.5rem, 4vw)', fontWeight: '700', marginBottom: '1.5rem' }}>
            {dictionary.title} <span style={{ color: 'var(--primary)' }}>{dictionary.titleAccent}</span>
          </h2>
          <p style={{ opacity: 0.7, maxWidth: '600px', margin: '0 auto', lineHeight: '1.7' }}>
            {dictionary.description}
          </p>
        </div>

        {/* Glass Container */}
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="glass"
        style={{ 
          maxWidth: '1200px', 
          margin: '0 auto', 
          padding: '3rem', 
          borderRadius: '1.5rem',
          border: '1px solid var(--outline-variant)',
          marginBottom: '1.5rem' 
        }}
      >
          {status === 'success' ? (
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              style={{ textAlign: 'center', padding: '2rem' }}
            >
              <div style={{ width: '80px', height: '80px', borderRadius: '50%', border: '2px solid var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 2rem' }}>
                <Star size={40} color="var(--primary)" />
              </div>
              <h3 className="serif" style={{ fontSize: '2rem', marginBottom: '1rem' }}>{dictionary.status.success}</h3>
              <p style={{ opacity: 0.8, marginBottom: '2rem' }}>{dictionary.status.successDesc}</p>
              <button 
                onClick={() => setStatus('idle')}
                className="gradient-btn"
                style={{ padding: '0.75rem 2rem' }}
              >
                OK
              </button>
            </motion.div>
          ) : status === 'error' ? (
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              style={{ textAlign: 'center', padding: '2rem' }}
            >
              <h3 className="serif" style={{ fontSize: '2rem', marginBottom: '1rem', color: '#ff4d4d' }}>{dictionary.status.error}</h3>
              <p style={{ opacity: 0.8, marginBottom: '2rem' }}>{dictionary.status.errorDesc}</p>
              <button 
                onClick={() => setStatus('idle')}
                className="gradient-btn"
                style={{ padding: '0.75rem 2rem' }}
              >
                {dictionary.status.retry}
              </button>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="REALLY_STACK_THIS_FORM_PLEASE" style={{ 
              opacity: status === 'sending' ? 0.5 : 1, 
              pointerEvents: status === 'sending' ? 'none' : 'auto' 
            }}>
              <div className="form-group" style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <label style={{ fontSize: '0.85rem', fontWeight: '600', opacity: 0.9, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <User size={14} color="var(--primary)" /> {dictionary.labels.name}
                </label>
                <input 
                  type="text" 
                  name="name"
                  placeholder={dictionary.placeholders.name}
                  required
                  value={formData.name}
                  onChange={handleChange}
                  style={inputStyle}
                />
              </div>

              <div className="form-group" style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <label style={{ fontSize: '0.85rem', fontWeight: '600', opacity: 0.9, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <Mail size={14} color="var(--primary)" /> {dictionary.labels.email}
                </label>
                <input 
                  type="email" 
                  name="email"
                  placeholder={dictionary.placeholders.email}
                  required
                  value={formData.email}
                  onChange={handleChange}
                  style={inputStyle}
                />
              </div>

              <div className="form-group" style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <label style={{ fontSize: '0.85rem', fontWeight: '600', opacity: 0.9, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <Phone size={14} color="var(--primary)" /> {dictionary.labels.phone}
                </label>
                <input 
                  type="tel" 
                  name="phone"
                  placeholder={dictionary.placeholders.phone}
                  value={formData.phone}
                  onChange={handleChange}
                  style={inputStyle}
                />
              </div>

              <div className="form-group" style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <label style={{ fontSize: '0.85rem', fontWeight: '600', opacity: 0.9, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <Star size={14} color="var(--primary)" /> {dictionary.labels.country}
                </label>
                <select 
                  name="country"
                  required
                  value={formData.country}
                  onChange={handleChange}
                  style={{ ...inputStyle, appearance: 'none' }}
                >
                  <option value="mx" style={{ backgroundColor: '#1c1b1b' }}>{dictionary.countries.mx}</option>
                  <option value="us" style={{ backgroundColor: '#1c1b1b' }}>{dictionary.countries.us}</option>
                  <option value="es" style={{ backgroundColor: '#1c1b1b' }}>{dictionary.countries.es}</option>
                  <option value="co" style={{ backgroundColor: '#1c1b1b' }}>{dictionary.countries.co}</option>
                  <option value="ar" style={{ backgroundColor: '#1c1b1b' }}>{dictionary.countries.ar}</option>
                  <option value="cl" style={{ backgroundColor: '#1c1b1b' }}>{dictionary.countries.cl}</option>
                  <option value="pe" style={{ backgroundColor: '#1c1b1b' }}>{dictionary.countries.pe}</option>
                  <option value="other" style={{ backgroundColor: '#1c1b1b' }}>{dictionary.countries.other}</option>
                </select>
              </div>

              <div className="form-group" style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <label style={{ fontSize: '0.85rem', fontWeight: '600', opacity: 0.9, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <Star size={14} color="var(--primary)" /> {dictionary.labels.eventType}
                </label>
                <select 
                  name="eventType"
                  required
                  value={formData.eventType}
                  onChange={handleChange}
                  style={{ ...inputStyle, appearance: 'none' }}
                >
                  <option value="" disabled style={{ backgroundColor: '#1c1b1b' }}>{dictionary.labels.eventType}</option>
                  <option value="corporate" style={{ backgroundColor: '#1c1b1b' }}>{dictionary.options.corporate}</option>
                  <option value="activation" style={{ backgroundColor: '#1c1b1b' }}>{dictionary.options.activation}</option>
                  <option value="workshop" style={{ backgroundColor: '#1c1b1b' }}>{dictionary.options.workshop}</option>
                  <option value="productLaunch" style={{ backgroundColor: '#1c1b1b' }}>{dictionary.options.productLaunch}</option>
                  <option value="galaDinner" style={{ backgroundColor: '#1c1b1b' }}>{dictionary.options.galaDinner}</option>
                  <option value="other" style={{ backgroundColor: '#1c1b1b' }}>{dictionary.options.other}</option>
                </select>
              </div>

              <div className="form-group" style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <label style={{ fontSize: '0.85rem', fontWeight: '600', opacity: 0.9, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <Calendar size={14} color="var(--primary)" /> {dictionary.labels.date}
                </label>
                <input 
                  type="date" 
                  name="date"
                  required
                  value={formData.date}
                  onChange={handleChange}
                  style={{ ...inputStyle, colorScheme: 'dark' }}
                />
              </div>

              <div className="form-group" style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <label style={{ fontSize: '0.85rem', fontWeight: '600', opacity: 0.9, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <Users size={14} color="var(--primary)" /> {dictionary.labels.guests}
                </label>
                <input 
                  type="number" 
                  name="guests"
                  placeholder={dictionary.placeholders.guests}
                  required
                  value={formData.guests}
                  onChange={handleChange}
                  style={inputStyle}
                />
              </div>

              <div className="form-group span-2" style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <label style={{ fontSize: '0.85rem', fontWeight: '600', opacity: 0.9, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <MessageSquare size={14} color="var(--primary)" /> {dictionary.labels.message}
                </label>
                <textarea 
                  name="message"
                  placeholder={dictionary.placeholders.message}
                  rows={4}
                  required
                  value={formData.message}
                  onChange={handleChange}
                  style={{ ...inputStyle, resize: 'none' }}
                />
              </div>

              <div className="span-2" style={{ textAlign: 'center', marginTop: '1rem' }}>
                <button 
                  type="submit" 
                  className="gradient-btn" 
                  style={{ width: '100%', padding: '1.25rem', fontSize: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.75rem' }}
                >
                  <Send size={18} /> {status === 'sending' ? dictionary.status.sending : dictionary.button}
                </button>
              </div>
            </form>
          )}
        </motion.div>
      </div>

    </section>
  );
};

const inputStyle: React.CSSProperties = {
  padding: '1rem',
  backgroundColor: 'rgba(255, 255, 255, 0.05)',
  border: '1px solid rgba(154, 143, 128, 0.2)',
  borderRadius: '0.5rem',
  color: 'var(--foreground)',
  fontSize: '0.875rem',
  outline: 'none',
  transition: 'all 0.3s ease',
};


export default EventRequestForm;
