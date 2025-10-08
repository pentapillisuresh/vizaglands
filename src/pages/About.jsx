import React from 'react';
import { motion } from 'framer-motion';

function About() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      style={{ paddingTop: '100px', minHeight: '80vh' }}
    >
      <div className="container">
        <div style={{ textAlign: 'center', padding: '4rem 0' }}>
          <h1 className="section-title">About Us</h1>
          <p className="section-subtitle">
            Learn more about our mission and the team behind RealEstate Pro
          </p>
          <div style={{ 
            background: '#F9FAFB', 
            padding: '3rem', 
            borderRadius: '15px',
            marginTop: '2rem'
          }}>
            <h3 style={{ color: '#059669', marginBottom: '1rem' }}>Our Story</h3>
            <p style={{ color: '#6B7280', lineHeight: '1.8' }}>
              RealEstate Pro was founded with the vision of making property transactions 
              seamless and transparent. With over a decade of combined experience in the 
              real estate industry, our team is dedicated to helping clients find their 
              perfect properties and achieve their real estate goals.
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default About;