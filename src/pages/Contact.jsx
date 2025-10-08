import React from 'react';
import { motion } from 'framer-motion';
import { FaPhone, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';

function Contact() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      style={{ paddingTop: '100px', minHeight: '80vh' }}
    >
      <div className="container">
        <div style={{ padding: '4rem 0' }}>
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <h1 className="section-title">Contact Us</h1>
            <p className="section-subtitle">
              Get in touch with our real estate experts today
            </p>
          </div>

          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
            gap: '2rem' 
          }}>
            <div style={{ 
              background: '#F9FAFB', 
              padding: '2rem', 
              borderRadius: '15px',
              textAlign: 'center'
            }}>
              <FaPhone style={{ 
                fontSize: '2rem', 
                color: '#059669', 
                marginBottom: '1rem' 
              }} />
              <h3 style={{ color: '#1F2937', marginBottom: '0.5rem' }}>Phone</h3>
              <p style={{ color: '#6B7280' }}>+1 (555) 123-4567</p>
            </div>

            <div style={{ 
              background: '#F9FAFB', 
              padding: '2rem', 
              borderRadius: '15px',
              textAlign: 'center'
            }}>
              <FaEnvelope style={{ 
                fontSize: '2rem', 
                color: '#059669', 
                marginBottom: '1rem' 
              }} />
              <h3 style={{ color: '#1F2937', marginBottom: '0.5rem' }}>Email</h3>
              <p style={{ color: '#6B7280' }}>info@realestatepro.com</p>
            </div>

            <div style={{ 
              background: '#F9FAFB', 
              padding: '2rem', 
              borderRadius: '15px',
              textAlign: 'center'
            }}>
              <FaMapMarkerAlt style={{ 
                fontSize: '2rem', 
                color: '#059669', 
                marginBottom: '1rem' 
              }} />
              <h3 style={{ color: '#1F2937', marginBottom: '0.5rem' }}>Office</h3>
              <p style={{ color: '#6B7280' }}>123 Real Estate Ave<br />New York, NY 10001</p>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default Contact;