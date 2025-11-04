import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { MapPin, Bed, Bath, Maximize } from "lucide-react";
import AOS from "aos";
import "aos/dist/aos.css";
import ApiService from "../hooks/ApiService";
import getPhotoSrc from "../hooks/getPhotos";

const RecentViewProperties = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [properties, setProperties] = useState([]);

  useEffect(() => {
    AOS.init({ duration: 800, once: true });
    getPropertiesData();
  }, []);

  const formatPrice = (price) => {
    if (!price) return "N/A";
    const num = parseFloat(price);
    if (num >= 10000000) return `₹${(num / 10000000).toFixed(2)} Cr`;
    return `₹${(num / 100000).toFixed(2)} Lac`;
  };

  const getPropertiesData = async () => {
    setLoading(true);
    const clientToken = localStorage.getItem("token");

    try {
      const response = await ApiService.get(`/propertyView/user`, {
        headers: {
          Authorization: `Bearer ${clientToken}`,
          "Content-Type": "application/json",
        },
      });

      // Extract nested property objects
      const propertyList = response?.map((item) => item.property) || [];
      setProperties(propertyList);
    } catch (err) {
      console.error("Error fetching properties:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <div className="text-center mb-4" data-aos="fade-up">
          <span className="inline-block bg-orange-50 text-orange-600 px-4 py-2 rounded-full font-medium text-sm uppercase tracking-wide">
            Recently Viewed
          </span>
        </div>

        <h2
          className="text-4xl md:text-5xl font-serif font-extrabold text-center mb-2 text-gray-900"
          data-aos="fade-up"
          data-aos-delay="100"
        >
          Recently Viewed Properties
        </h2>

        {loading ? (
          <div className="text-center py-10">Loading properties...</div>
        ) : properties.length === 0 ? (
          <div className="text-center py-10 text-gray-500">
            No recently viewed properties.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {properties.map((property, idx) => (
              <article
                key={property.id}
                data-aos="fade-up"
                data-aos-delay={100 + idx * 100}
                className="bg-white rounded-xl shadow-lg overflow-hidden cursor-pointer group hover:shadow-2xl transition-shadow duration-300"
                onClick={() =>
                  navigate(`/property/${property.id}`, { state: { property } })
                }
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
                  <h3 className="text-xl font-bold text-[#003366] group-hover:text-orange-600 transition-colors mb-2">
                    {property.title}
                  </h3>

                  {property?.address && (
                    <div className="flex items-center gap-2 text-gray-600 mb-4">
                      <MapPin size={16} className="text-orange-500" />
                      <span className="text-sm">
                        {property.address.locality}, {property.address.city}
                      </span>
                    </div>
                  )}

                  {property?.profile && (
                    <div className="flex items-center gap-4 mb-4 text-sm text-gray-600">
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
                          {property.profile.carpetArea}{" "}
                          {property.profile.areaUnit || ""}
                        </span>
                      </div>
                    </div>
                  )}

                  <div className="flex items-center justify-between pt-4 border-t">
                    <div className="text-right">
                      {property.price ? (
                        <div className="text-3xl font-bold text-orange-600">
                          {formatPrice(property.price)}
                        </div>
                      ) : (
                        <button
                          className="bg-blue-600 hover:bg-blue-700 text-white font-medium text-sm px-5 py-2.5 rounded-lg shadow-md transition-all"
                          onClick={(e) => {
                            e.stopPropagation();
                            alert("Contact us for price!");
                          }}
                        >
                          Contact Us
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
        )}
      </div>
    </section>
  );
};

export default RecentViewProperties;
