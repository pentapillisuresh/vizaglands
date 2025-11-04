import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { propertiesData } from "../data/propertiesData";
import { MapPin, Bed, Bath, Maximize, ChevronLeft, ChevronRight } from "lucide-react";
import AOS from "aos";
import "aos/dist/aos.css";
import ApiService from "../hooks/ApiService";
import getPhotoSrc from "../hooks/getPhotos";

const FeaturedProperties = () => {
  const navigate = useNavigate();
  // const featuredProperties = propertiesData.filter((p) => p.featured);
  const itemsPerPage = 5;
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [properties, setProperties] = useState([]);

  useEffect(() => {
    AOS.init({ duration: 800, once: true });
  }, []);

  const totalPages = Math.ceil(properties?.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentItems = properties?.slice(startIndex, startIndex + itemsPerPage);

  const formatPrice = (price) => {
    if (price >= 10000000) {
      return `₹${(price / 10000000).toFixed(2)} Cr`;
    }
    return `₹${(price / 100000).toFixed(2)} Lac`;
  };

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage((prev) => prev + 1);
  };

  const handlePrev = () => {
    if (currentPage > 1) setCurrentPage((prev) => prev - 1);
  };

  const getPropertiesData = async (e) => {
    setLoading(true);

    try {
      const response = await ApiService.get(`/dashboard?limit=5&page=${currentPage}`);

      const propertyData = response.data
      setProperties(propertyData?.mostViewedProperties?.properties);

    } catch (err) {
      console.error("Properties error:", err);

    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getPropertiesData()
  }, [currentPage])

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <div className="text-center mb-4" data-aos="fade-up">
          <span className="inline-block bg-orange-50 text-orange-600 px-4 py-2 rounded-full font-medium text-sm uppercase tracking-wide">
            Featured
          </span>
        </div>

        <h2
          className="text-4xl md:text-5xl font-serif font-extrabold text-center mb-2 text-gray-900"
          data-aos="fade-up"
          data-aos-delay="100"
        >
          Featured Properties
        </h2>
        <p
          className="text-gray-600 text-center mb-12 max-w-2xl mx-auto"
          data-aos="fade-up"
          data-aos-delay="200"
        >
          Handpicked properties that offer exceptional value
        </p>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {currentItems.map((property, idx) => (
            <article
              key={property.id}
              data-aos="fade-up"
              data-aos-delay={100 + idx * 100}
              className="bg-white rounded-xl shadow-lg overflow-hidden cursor-pointer group hover:shadow-2xl transition-shadow duration-300"
              onClick={() => navigate(`/property/${property.id}`, { state: { property } })}


            >
              {/* Image */}
              <div className="h-56 overflow-hidden">
                <img
                  src={getPhotoSrc(property.photos)}
                    alt={property.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
              </div>

              {/* Content */}
              <div className="p-6">
                <div className="flex items-start justify-between mb-3">
                  <h3 className="text-xl font-bold text-[#003366] group-hover:text-orange-600 transition-colors">
                    {property.title}
                  </h3>
                </div>

                <div className="flex items-center gap-2 text-gray-600 mb-4">
                  <MapPin size={16} className="text-orange-500" />
                  <span className="text-sm">
                    {property.address.city}, {property.address.locality}
                  </span>
                </div>

                {property?.profile && <div className="flex items-center gap-4 mb-4 text-sm text-gray-600">
                  {property.profile.bedrooms > 0 && (
                    <div className="flex items-center gap-1">
                      <Bed size={16} className="text-[#003366]" />
                      <span>{property.profile.bedrooms}</span>
                    </div>
                  )}
                  {property.profile.bathrooms > 0 && (
                    <div className="flex items-center gap-1">
                      <Bath size={16} className="text-[#003366]" />
                      <span>{property.profile.bathrooms}</span>
                    </div>
                  )}
                  <div className="flex items-center gap-1">
                    <Maximize size={16} className="text-[#003366]" />
                    <span>
                      {property.profile.carpetArea} {property.profile.areaUnit}
                    </span>
                  </div>
                </div>}

                <div className="flex items-center justify-between pt-4 border-t">
                <div className="text-right">
                  {property?.price ? (
                    <div className="text-3xl font-bold text-orange-600">{formatPrice(property?.price)}</div>

                  ) : (
                    <button
                      className="bg-blue-600 hover:bg-blue-700 text-white font-medium text-sm px-5 py-2.5 rounded-lg shadow-md transition-all"
                      onClick={() => alert("Contact us for price!")}
                    >
                      Contact Us for Price
                    </button>
                  )}
                </div>
                  <button className="text-[#003366] hover:text-orange-600 font-semibold transition-colors">
                    View Details →
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Pagination */}
        <div
          className="flex justify-center items-center gap-4 mt-12"
          data-aos="fade-up"
          data-aos-delay="300"
        >
          <button
            onClick={handlePrev}
            disabled={currentPage === 1}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg border text-sm font-medium transition-all ${currentPage === 1
              ? "text-gray-400 border-gray-200 cursor-not-allowed"
              : "text-[#003366] border-gray-300 hover:bg-orange-50 hover:text-orange-600"
              }`}
          >
            <ChevronLeft size={18} /> Previous
          </button>

          <span className="text-gray-600 font-medium">
            Page {currentPage} of {totalPages}
          </span>

          <button
            onClick={handleNext}
            disabled={currentPage === totalPages}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg border text-sm font-medium transition-all ${currentPage === totalPages
              ? "text-gray-400 border-gray-200 cursor-not-allowed"
              : "text-[#003366] border-gray-300 hover:bg-orange-50 hover:text-orange-600"
              }`}
          >
            Next <ChevronRight size={18} />
          </button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProperties;
