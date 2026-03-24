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
    };
    options: {
      corporate: string;
      activation: string;
      workshop: string;
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
  };
}

const EventRequestForm = ({ dictionary }: EventRequestFormProps) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    eventType: 'corporate',
    date: '',
    guests: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    alert('¡Gracias! Tu solicitud ha sido enviada. Nos pondremos en contacto contigo pronto.');
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <section id="contacto" className="section-spacing" style={{ backgroundColor: 'transparent', position: 'relative', overflow: 'hidden' }}>
      <div style={{ maxWidth: '1000px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
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

        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          style={{ 
            backgroundColor: 'rgba(28, 27, 27, 0.6)', 
            backdropFilter: 'blur(15px)',
            padding: '3rem',
            borderRadius: '1rem',
            border: '1px solid var(--outline-variant)',
            boxShadow: '0 20px 40px rgba(0,0,0,0.4)'
          }}
        >
          <form onSubmit={handleSubmit} style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1.5rem' }}>
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
                <Star size={14} color="var(--primary)" /> {dictionary.labels.eventType}
              </label>
              <select 
                name="eventType"
                value={formData.eventType}
                onChange={handleChange}
                style={{ ...inputStyle, appearance: 'none' }}
              >
                <option value="corporate" style={{ backgroundColor: '#1c1b1b' }}>{dictionary.options.corporate}</option>
                <option value="activation" style={{ backgroundColor: '#1c1b1b' }}>{dictionary.options.activation}</option>
                <option value="workshop" style={{ backgroundColor: '#1c1b1b' }}>{dictionary.options.workshop}</option>
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
                value={formData.guests}
                onChange={handleChange}
                style={inputStyle}
              />
            </div>

            <div className="form-group" style={{ gridColumn: 'span 2', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <label style={{ fontSize: '0.85rem', fontWeight: '600', opacity: 0.9, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <MessageSquare size={14} color="var(--primary)" /> {dictionary.labels.message}
              </label>
              <textarea 
                name="message"
                placeholder={dictionary.placeholders.message}
                rows={4}
                value={formData.message}
                onChange={handleChange}
                style={{ ...inputStyle, resize: 'none' }}
              />
            </div>

            <div style={{ gridColumn: 'span 2', textAlign: 'center', marginTop: '1rem' }}>
              <button 
                type="submit" 
                className="gradient-btn" 
                style={{ width: '100%', padding: '1.25rem', fontSize: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.75rem' }}
              >
                <Send size={18} /> {dictionary.button}
              </button>
            </div>
          </form>
        </motion.div>
      </div>

      <style jsx>{`
        @media (max-width: 768px) {
          form {
            grid-template-columns: 1fr !important;
          }
          .form-group {
            grid-column: auto !important;
          }
        }
      `}</style>
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
