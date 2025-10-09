import React, { useState,useEffect } from "react";
import Header from "../components/Header";
import Hero from "../components/Hero";
import PropertyCategories from "../components/PropertyCategories";
import FeaturedProperties from "../components/FeaturedProperties";
import HowItWorks from "../components/HowItWorks";
import Testimonials from "../components/Testimonials";
import LocationsSection from "../components/LocationsSection";
import Footer from "../components/Footer";
import CommercialAdSection from "../components/CommercialAdSection";
import AuthModel from "../components/AuthModal";

import AOS from "aos";
import "aos/dist/aos.css";

function Home() {

  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  // ✅ move useEffect INSIDE App component
  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  const handleGetStartedClick = () => {
    setIsAuthModalOpen(true);
  }
  const handleCloseModal = () => {
    setIsAuthModalOpen(false);
  }

  return (
    <div className="min-h-screen">
      <Header  onGetStartedClick={handleGetStartedClick}/>
      <Hero />
      <PropertyCategories />
      <FeaturedProperties />
      <HowItWorks />
      <CommercialAdSection />
      <Testimonials />
      <LocationsSection />
      <Footer />
      <AuthModel isOpen={isAuthModalOpen} onClose={handleCloseModal} />
    </div>
  );
}

export default Home;
