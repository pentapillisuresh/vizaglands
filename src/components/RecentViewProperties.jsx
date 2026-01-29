import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import {
  MapPin, Bed, Bath, Maximize, ChevronLeft, ChevronRight, Monitor,
  DoorClosed,
  Presentation,
} from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import ApiService from "../hooks/ApiService";
import getPhotoSrc from "../hooks/getPhotos";

const RecentViewProperties = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [properties, setProperties] = useState([]);
  const swiperRef = useRef(null);

  useEffect(() => {
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

      const propertyList = response?.map((item) => item.property) || [];
      setProperties(propertyList);
    } catch (err) {
      console.error("Error fetching properties:", err);
    } finally {
      setLoading(false);
    }
  };

  // Swiper configuration
  const swiperConfig = {
    modules: [Navigation, Pagination, Autoplay],
    spaceBetween: 30,
    slidesPerView: 1,
    navigation: false, // Disable default navigation since we're using custom buttons
    pagination: {
      clickable: true,
      dynamicBullets: true
    },
    autoplay: {
      delay: 5000,
      disableOnInteraction: false,
    },
    breakpoints: {
      640: {
        slidesPerView: 1,
      },
      768: {
        slidesPerView: 2,
      },
      1024: {
        slidesPerView: 3,
      },
    },
    onSwiper: (swiper) => {
      swiperRef.current = swiper;
    },
  };

  return (
    <section className="py-20 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <div className="text-center mb-4">
          <span className="inline-block bg-orange-50 text-orange-600 px-4 py-2 rounded-full font-medium text-sm uppercase tracking-wide">
            Recently Viewed
          </span>
        </div>

        <h2 className="text-4xl md:text-4xl font-serif font-extrabold text-center mb-12 text-gray-900">
          Recently Viewed Properties
        </h2>

        {loading ? (
          <div className="text-center py-10">Loading properties...</div>
        ) : properties.length === 0 ? (
          <div className="text-center py-10 text-gray-500">
            No recently viewed properties.
          </div>
        ) : (
          <div className="relative group">
            {/* Custom Navigation Arrows - Professional Design */}
            <button
              onClick={() => swiperRef.current?.slidePrev()}
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 bg-white border border-gray-200 hover:border-orange-500 text-gray-600 hover:text-orange-600 w-12 h-12 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center group-hover:translate-x-0 opacity-0 group-hover:opacity-100"
              aria-label="Previous properties"
            >
              <ChevronLeft size={24} className="stroke-2" />
            </button>

            <button
              onClick={() => swiperRef.current?.slideNext()}
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 bg-white border border-gray-200 hover:border-orange-500 text-gray-600 hover:text-orange-600 w-12 h-12 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center group-hover:translate-x-0 opacity-0 group-hover:opacity-100"
              aria-label="Next properties"
            >
              <ChevronRight size={24} className="stroke-2" />
            </button>

            <Swiper {...swiperConfig} className="recent-properties-swiper">
              {properties.map((property) => (
                <SwiperSlide key={property.id}>
                  <article
                    className="bg-white rounded-xl shadow-lg overflow-hidden cursor-pointer group-hover:shadow-2xl transition-all duration-300 mx-2 my-4 border border-gray-100 hover:border-orange-200"
                    onClick={() =>
                      navigate(`/property/${property.id}`, { state: { property } })
                    }
                  >
                    {/* Image */}
                    <div className="h-56 overflow-hidden relative">
                      <img
                        src={getPhotoSrc(property.photos)}
                        alt={property.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                      {/* Overlay on hover */}
                      <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-all duration-300" />
                    </div>

                    {/* Content */}
                    <div className="p-6">
                      <h3 className="text-xl font-bold text-[#003366] group-hover:text-orange-600 transition-colors mb-2 line-clamp-2">
                        {property.title}
                      </h3>

                      {property?.address && (
                        <div className="flex items-center gap-2 text-gray-600 mb-4">
                          <MapPin size={16} className="text-orange-500 flex-shrink-0" />
                          <span className="text-sm line-clamp-1">
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
                          {property.profile.workstations > 0 && (
                            <div className="flex items-center gap-1">
                              <Monitor size={16} className="text-[#003366]" />
                              <span>
                                {property.profile.workstations}
                              </span>
                            </div>
                          )}

                          {property.profile.cabins > 0 && (
                            <div className="flex items-center gap-1">
                              <DoorClosed size={16} className="text-[#003366]" />
                              <span>
                                {property.profile.cabins}
                              </span>
                            </div>
                          )}

                          {property.profile.conferenceRooms > 0 && (
                            <div className="flex items-center gap-1">
                              <Presentation size={16} className="text-[#003366]" />
                              <span>
                                {property.profile.conferenceRooms}
                              </span>
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

                      <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                        <div className="text-right">
                          {property.price ? (
                            <div className="text-2xl font-bold text-orange-600">
                              {formatPrice(property.price)}
                            </div>
                          ) : (
                            <button
                              className="bg-blue-600 hover:bg-blue-700 text-white font-medium text-sm px-4 py-2 rounded-lg shadow-md transition-all"
                              onClick={(e) => {
                                e.stopPropagation();
                                alert("Contact us for price!");
                              }}
                            >
                              Contact Us
                            </button>
                          )}
                        </div>
                        <button className="text-[#003366] hover:text-orange-600 font-semibold transition-colors text-sm">
                          View Details →
                        </button>
                      </div>
                    </div>
                  </article>
                </SwiperSlide>
              ))}
            </Swiper>

            {/* Bottom Navigation Dots - Enhanced */}
            <div className="flex justify-center mt-8">
              <div className="bg-white rounded-full px-4 py-2 shadow-lg border border-gray-200">
                <div className="flex items-center gap-6">
                  <button
                    onClick={() => swiperRef.current?.slidePrev()}
                    className="flex items-center gap-2 text-gray-600 hover:text-orange-600 transition-colors group"
                  >
                    <div className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center group-hover:border-orange-500 group-hover:bg-orange-50 transition-all">
                      <ChevronLeft size={16} />
                    </div>
                    <span className="text-sm font-medium">Prev</span>
                  </button>

                  <div className="h-4 w-px bg-gray-300"></div>

                  <button
                    onClick={() => swiperRef.current?.slideNext()}
                    className="flex items-center gap-2 text-gray-600 hover:text-orange-600 transition-colors group"
                  >
                    <span className="text-sm font-medium">Next</span>
                    <div className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center group-hover:border-orange-500 group-hover:bg-orange-50 transition-all">
                      <ChevronRight size={16} />
                    </div>
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      <style jsx>{`
        .recent-properties-swiper {
          padding: 10px 0 40px 0;
        }
        
        .recent-properties-swiper .swiper-pagination-bullet {
          background: #003366;
          opacity: 0.5;
          width: 8px;
          height: 8px;
          transition: all 0.3s ease;
        }
        
        .recent-properties-swiper .swiper-pagination-bullet-active {
          background: #ea580c;
          opacity: 1;
          width: 20px;
          border-radius: 4px;
        }
        
        /* Hide default navigation since we have custom buttons */
        .recent-properties-swiper .swiper-button-next,
        .recent-properties-swiper .swiper-button-prev {
          display: none;
        }
      `}</style>
    </section>
  );
};

export default RecentViewProperties;