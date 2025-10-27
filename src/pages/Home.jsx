import React, { useEffect, useState } from "react";
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
import ApiService from "../hooks/ApiService";

function Home() {
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  const [cityLocalities, setCityLocalities] = useState([]);


  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  const getDashBoardData = async (e) => {
    // e.preventDefault();
    setLoading(true);
const payload={
  
}
    try {
      const response = await ApiService.get(`/dashboard`,);
      console.log("dashboard response:", response.status);
      const dashboardData = response.data
      setCategories(dashboardData?.categories);
      setCityLocalities(dashboardData?.cityLocalities);
    } catch (err) {
      console.error("dashboard data error:", err);
      setError(
        err?.response?.data?.internalMessage ||
        'Failed to get dashboard data.'
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getDashBoardData()
  }, [])

  return (
    <div className="min-h-screen">
      {/* Header is already rendered in App.js, you can remove it here if duplicated */}
      <Hero />
      <PropertyCategories categories={categories} />
      <FeaturedProperties />
      <ViewedProperties />

      {/* <HowItWorks /> */}
      <CommercialAdSection />
      <Testimonials />
      <LocationsSection cityLocalities ={cityLocalities} />
      {/* <Footer /> */}
    </div>
  );
}

export default Home;
