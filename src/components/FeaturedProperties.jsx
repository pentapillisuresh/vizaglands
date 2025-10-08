import React from "react";
import { useNavigate } from "react-router-dom";
import { propertiesData } from "../data/propertiesData";
import { MapPin, Bed, Bath, Maximize } from "lucide-react";

const FeaturedProperties = () => {
  const navigate = useNavigate();
  const featuredProperties = propertiesData.filter(p => p.featured).slice(0, 6);

  const formatPrice = (price) => {
    if (price >= 10000000) {
      return `₹${(price / 10000000).toFixed(2)} Cr`;
    }
    return `₹${(price / 100000).toFixed(2)} Lac`;
  };

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredProperties.map((property, idx) => (
            <article
              key={property.id}
              data-aos="fade-up"
              data-aos-delay={100 + idx * 100}
              className="bg-white rounded-xl shadow-lg overflow-hidden cursor-pointer group hover:shadow-2xl transition-shadow duration-300"
              onClick={() => navigate(`/property/${property.id}`)}
            >
              <div className="h-56 overflow-hidden">
                <img
                  src={property.mainImage}
                  alt={property.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
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
                  <span className="text-sm">{property.location}, {property.city}</span>
                </div>
                <div className="flex items-center gap-4 mb-4 text-sm text-gray-600">
                  {property.bedrooms > 0 && (
                    <div className="flex items-center gap-1">
                      <Bed size={16} className="text-[#003366]" />
                      <span>{property.bedrooms}</span>
                    </div>
                  )}
                  {property.bathrooms > 0 && (
                    <div className="flex items-center gap-1">
                      <Bath size={16} className="text-[#003366]" />
                      <span>{property.bathrooms}</span>
                    </div>
                  )}
                  <div className="flex items-center gap-1">
                    <Maximize size={16} className="text-[#003366]" />
                    <span>{property.area} {property.areaUnit}</span>
                  </div>
                </div>
                <div className="flex items-center justify-between pt-4 border-t">
                  <div className="text-2xl font-bold text-orange-600">
                    {formatPrice(property.price)}
                  </div>
                  <button className="text-[#003366] hover:text-orange-600 font-semibold transition-colors">
                    View Details →
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedProperties;
