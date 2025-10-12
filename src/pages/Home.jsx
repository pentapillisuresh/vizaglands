import React, { useEffect } from "react";
import Header from "../components/Header";
import Hero from "../components/Hero";
import PropertyCategories from "../components/PropertyCategories";
import FeaturedProperties from "../components/FeaturedProperties";
import HowItWorks from "../components/HowItWorks";
import Testimonials from "../components/Testimonials";
import LocationsSection from "../components/LocationsSection";
import Footer from "../components/Footer";
import CommercialAdSection from "../components/CommercialAdSection";
import ViewedProperties from "../components/ViewedProperties";

import AOS from "aos";
import "aos/dist/aos.css";

function Home() {
  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  return (
    <div className="min-h-screen">
      {/* Header is already rendered in App.js, you can remove it here if duplicated */}
      <Hero />
      <ViewedProperties />
      <PropertyCategories />
      <FeaturedProperties />
      <HowItWorks />
      <CommercialAdSection />
      <Testimonials />
      <LocationsSection />
      {/* <Footer /> */}
    </div>
  );
}

export default Home;
