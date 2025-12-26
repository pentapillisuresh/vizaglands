import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { MapPin, Bed, Bath, Maximize, ChevronLeft, Heart, ChevronRight, AreaChart, Compass } from "lucide-react";
import AOS from "aos";
import "aos/dist/aos.css";
import ApiService from "../hooks/ApiService";
import getPhotoSrc from "../hooks/getPhotos";

const FeaturedProjects = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [properties, setProperties] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [translateX, setTranslateX] = useState(0);
  const carouselRef = useRef(null);

  const [favorites, setFavorites] = useState(() => {
    const saved = localStorage.getItem("favorites");
    return saved ? JSON.parse(saved) : [];
  });
  const isFavorite = (id) => favorites.some(item => item.id === id);

  const toggleFavorite = (listing) => {
    let updatedFavs = [...favorites];

    const exists = updatedFavs.find(item => item.id === listing.id);

    if (exists) {
      // remove
      updatedFavs = updatedFavs.filter(item => item.id !== listing.id);
    } else {
      // add
      updatedFavs.push(listing);
    }

    setFavorites(updatedFavs);
    localStorage.setItem("favorites", JSON.stringify(updatedFavs));
  };

  useEffect(() => {
    AOS.init({ duration: 800, once: true });
  }, []);

  const formatPrice = (price) => {
    if (price >= 10000000) {
      return `₹${(price / 10000000).toFixed(2)} Cr`;
    }
    return `₹${(price / 100000).toFixed(2)} Lac`;
  };

  const getPropertiesData = async () => {
    setLoading(true);
    try {
      const response = await ApiService.get(`/dashboard?limit=10`);
      const propertyData = response.data;
      setProperties(propertyData?.mostViewedProjects?.projects || []);
    } catch (err) {
      console.error("Properties error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getPropertiesData();
  }, []);

  const getItemsPerSlide = () => {
    if (typeof window === 'undefined') return 3;
    if (window.innerWidth < 768) return 1;
    if (window.innerWidth < 1024) return 2;
    return 3;
  };

  const [itemsPerSlide, setItemsPerSlide] = useState(getItemsPerSlide());

  useEffect(() => {
    const handleResize = () => {
      setItemsPerSlide(getItemsPerSlide());
      setCurrentIndex(0);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const maxIndex = Math.max(0, properties.length - itemsPerSlide);

  const handleNext = () => {
    setCurrentIndex((prev) => Math.min(prev + 1, maxIndex));
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => Math.max(prev - 1, 0));
  };

  const handleTouchStart = (e) => {
    setTouchStart(e.touches[0].clientX);
    setIsDragging(true);
  };

  const handleTouchMove = (e) => {
    if (!isDragging) return;
    setTouchEnd(e.touches[0].clientX);
    const diff = e.touches[0].clientX - touchStart;
    setTranslateX(diff);
  };

  const handleTouchEnd = () => {
    if (!isDragging) return;
    setIsDragging(false);

    const diff = touchStart - touchEnd;
    const threshold = 50;

    if (Math.abs(diff) > threshold) {
      if (diff > 0 && currentIndex < maxIndex) {
        handleNext();
      } else if (diff < 0 && currentIndex > 0) {
        handlePrev();
      }
    }

    setTranslateX(0);
    setTouchStart(0);
    setTouchEnd(0);
  };

  const handleMouseDown = (e) => {
    setTouchStart(e.clientX);
    setIsDragging(true);
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    setTouchEnd(e.clientX);
    const diff = e.clientX - touchStart;
    setTranslateX(diff);
  };

  const handleMouseUp = () => {
    if (!isDragging) return;
    setIsDragging(false);

    const diff = touchStart - touchEnd;
    const threshold = 50;

    if (Math.abs(diff) > threshold) {
      if (diff > 0 && currentIndex < maxIndex) {
        handleNext();
      } else if (diff < 0 && currentIndex > 0) {
        handlePrev();
      }
    }

    setTranslateX(0);
    setTouchStart(0);
    setTouchEnd(0);
  };

  const handleMouseLeave = () => {
    if (isDragging) {
      handleMouseUp();
    }
  };

  const calculateTransform = () => {
    const cardWidth = carouselRef.current ? carouselRef.current.offsetWidth / itemsPerSlide : 0;
    const baseTranslate = -(currentIndex * cardWidth);
    return baseTranslate + (isDragging ? translateX : 0);
  };

  if (loading) {
    return (
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-gray-600">Loading Projects...</p>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-4" data-aos="fade-up">
          <span className="inline-block bg-orange-50 text-orange-600 px-4 py-2 rounded-full font-medium text-sm uppercase tracking-wide">
            Projects
          </span>
        </div>

        <h2
          className="text-4xl md:text-4xl font-serif font-extrabold text-center mb-2 text-gray-900"
          data-aos="fade-up"
          data-aos-delay="100"
        >
          Featured Projects
        </h2>
        <p
          className="text-gray-600 text-center mb-12 max-w-2xl mx-auto"
          data-aos="fade-up"
          data-aos-delay="200"
        >
          Handpicked projects that offer exceptional value
        </p>

        <div className="relative">
          <div
            ref={carouselRef}
            className="overflow-hidden"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseLeave}
          >
            <div
              className="flex transition-transform duration-300 ease-out mb-2"
              style={{
                transform: `translateX(${calculateTransform()}px)`,
                cursor: isDragging ? 'grabbing' : 'grab'
              }}
            >
              {properties.map((property, idx) => (
                <div
                  key={property.id}
                  className="flex-shrink-0 px-4"
                  style={{ width: `${100 / itemsPerSlide}%` }}
                  data-aos="fade-up"
                  data-aos-delay={100 + (idx % itemsPerSlide) * 100}
                >
                  <article
                    className="bg-white rounded-xl shadow-lg overflow-hidden cursor-pointer group hover:shadow-2xl transition-shadow duration-300 h-full"
                    onClick={(e) => {
                      if (!isDragging && Math.abs(translateX) < 10) {
                        navigate(`/property/${property.id}`, { state: { property } });
                      }
                    }}
                  >
                    <div className="relative h-56 overflow-hidden">

                      {/* ❤️ Favorite Button */}
                      <button
                        onClick={(e) => {
                          e.stopPropagation(); // prevent navigation
                          toggleFavorite(property);
                        }}
                        className="absolute top-3 right-3 z-10"
                      >
                        <Heart
                          className={`w-7 h-7 drop-shadow-md transition ${isFavorite(property.id)
                            ? "text-red-600 fill-red-600"
                            : "text-white hover:text-red-400"
                            }`}
                        />
                      </button>

                      <img
                        src={getPhotoSrc(property.photos)}
                        alt={property.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                        draggable="false"
                      />
                    </div>


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
                            {property.profile.carpetArea > 0 && (
                          <div className="flex items-center gap-1">
                            <Maximize size={16} className="text-[#003366]" />
                            <span>
                              {property.profile.carpetArea} {property.profile.areaUnit}
                            </span>
                          </div>
                            )}
                            {property.profile.plotArea > 0 && (
                          <div className="flex items-center gap-1">
                            <Maximize size={16} className="text-[#003366]" />
                            <span>
                              {property.profile.plotArea} {property.profile.areaUnit}
                            </span>
                          </div>
                            )}
                            {property.profile.facing  && (
                          <div className="flex items-center gap-1">
                            <Compass size={16} className="text-[#003366]" />
                            <span>
                              {property.profile.facing}
                            </span>
                          </div>
                            )}
                        </div>
                      )}

                      <div className="flex items-center justify-between pt-4 border-t">
                        <div className="text-right">
                          {property?.price ? (
                            <div className="text-3xl font-bold text-orange-600">
                              {formatPrice(property?.price)}
                            </div>
                          ) : (
                            <button
                              className="bg-blue-600 hover:bg-blue-700 text-white font-medium text-sm px-5 py-2.5 rounded-lg shadow-md transition-all"
                              onClick={(e) => {
                                e.stopPropagation();
                                alert("Contact us for price!");
                              }}
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
                </div>
              ))}
            </div>
          </div>

          {currentIndex > 0 && (
            <button
              onClick={handlePrev}
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 bg-white text-[#003366] p-3 rounded-full shadow-lg hover:bg-orange-50 hover:text-orange-600 transition-all z-10"
              aria-label="Previous"
            >
              <ChevronLeft size={24} />
            </button>
          )}

          {currentIndex < maxIndex && (
            <button
              onClick={handleNext}
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 bg-white text-[#003366] p-3 rounded-full shadow-lg hover:bg-orange-50 hover:text-orange-600 transition-all z-10"
              aria-label="Next"
            >
              <ChevronRight size={24} />
            </button>
          )}
        </div>

        <div className="flex justify-center items-center gap-2 mt-8">
          {Array.from({ length: maxIndex + 1 }).map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentIndex(idx)}
              className={`h-2 rounded-full transition-all ${idx === currentIndex
                ? "bg-orange-600 w-8"
                : "bg-gray-300 w-2 hover:bg-gray-400"
                }`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedProjects;
