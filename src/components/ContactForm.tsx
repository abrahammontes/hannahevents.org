'use client';

import React, { useActionState } from 'react';
import { submitContactForm } from '../app/[locale]/actions';

interface ContactFormProps {
  dictionary: {
    title: string;
    name: string;
    email: string;
    subject: string;
    message: string;
    send: string;
    sending: string;
    success: string;
    error: string;
  };
}

const ContactForm = ({ dictionary }: ContactFormProps) => {
  const [state, formAction, isPending] = useActionState(submitContactForm, null);

  return (
    <section id="contacto-form" className="section-spacing" style={{ position: 'relative', zIndex: 10 }}>
      <div style={{ maxWidth: '800px', margin: '0 auto', padding: '0 1rem' }}>
        <div style={{ 
          backgroundColor: 'rgba(20, 20, 20, 0.4)', 
          backdropFilter: 'blur(10px)', 
          padding: '3rem', 
          borderRadius: '1.5rem', 
          border: '1px solid var(--outline-variant)',
          boxShadow: '0 20px 40px rgba(0,0,0,0.3)'
        }}>
          <h2 className="serif" style={{ fontSize: '2.5rem', marginBottom: '2rem', textAlign: 'center' }}>
            {dictionary.title}
          </h2>
          
          <form action={formAction} style={{ display: 'grid', gap: '1.5rem' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
              <div className="form-group">
                <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', opacity: 0.8 }}>{dictionary.name}</label>
                <input 
                  type="text" 
                  name="name" 
                  required 
                  className="form-input" 
                />
              </div>
              <div className="form-group">
                <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', opacity: 0.8 }}>{dictionary.email}</label>
                <input 
                  type="email" 
                  name="email" 
                  required 
                  className="form-input" 
                />
              </div>
            </div>
            
            <div className="form-group">
              <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', opacity: 0.8 }}>{dictionary.subject}</label>
              <input 
                type="text" 
                name="subject" 
                required 
                className="form-input" 
              />
            </div>
            
            <div className="form-group">
              <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', opacity: 0.8 }}>{dictionary.message}</label>
              <textarea 
                name="message" 
                required 
                rows={5} 
                className="form-input" 
                style={{ resize: 'vertical' }}
              />
            </div>
            
            <button 
              type="submit" 
              disabled={isPending}
              className="gradient-btn"
              style={{ width: '100%', padding: '1.25rem', marginTop: '1rem' }}
            >
              {isPending ? dictionary.sending : dictionary.send}
            </button>

            {state?.success && (
              <div style={{ 
                padding: '1rem', 
                backgroundColor: 'rgba(34, 197, 94, 0.1)', 
                border: '1px solid rgb(34, 197, 94)', 
                borderRadius: '0.5rem', 
                color: '#4ade80',
                textAlign: 'center',
                marginTop: '1rem' 
              }}>
                {dictionary.success}
              </div>
            )}

            {state?.error && (
              <div style={{ 
                padding: '1rem', 
                backgroundColor: 'rgba(239, 68, 68, 0.1)', 
                border: '1px solid rgb(239, 68, 68)', 
                borderRadius: '0.5rem', 
                color: '#f87171',
                textAlign: 'center',
                marginTop: '1rem' 
              }}>
                {dictionary.error}
              </div>
            )}
          </form>
        </div>
      </div>

      <style jsx>{`
        .form-input {
          width: 100%;
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid var(--outline-variant);
          padding: 1rem;
          border-radius: 0.75rem;
          color: white;
          font-family: inherit;
          transition: all 0.3s ease;
        }
        .form-input:focus {
          outline: none;
          border-color: var(--primary);
          background: rgba(255, 255, 255, 0.05);
          box-shadow: 0 0 0 2px rgba(212, 175, 55, 0.2);
        }
        @media (max-width: 600px) {
          div[style*="gridTemplateColumns"] {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
};

export default ContactForm;
