import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { propertiesData, propertyCategories } from "../data/propertiesData";
import { Home, MapPin, Maximize, Bed, Bath, Phone, ChevronDown } from "lucide-react";

function Properties() {
  const { categorySlug } = useParams();
  const navigate = useNavigate();
  const [filteredProperties, setFilteredProperties] = useState([]);
  const [category, setCategory] = useState(null);
  const [priceRange, setPriceRange] = useState("all");
  const [sortBy, setSortBy] = useState("newest");

  useEffect(() => {
    const cat = propertyCategories.find(c => c.slug === categorySlug);
    setCategory(cat);

    let properties = propertiesData.filter(p => p.categorySlug === categorySlug);

    if (priceRange !== "all") {
      const [min, max] = priceRange.split("-").map(Number);
      properties = properties.filter(p => {
        if (max) {
          return p.price >= min && p.price <= max;
        }
        return p.price >= min;
      });
    }

    if (sortBy === "price-low") {
      properties.sort((a, b) => a.price - b.price);
    } else if (sortBy === "price-high") {
      properties.sort((a, b) => b.price - a.price);
    } else if (sortBy === "newest") {
      properties.sort((a, b) => new Date(b.postedDate) - new Date(a.postedDate));
    }

    setFilteredProperties(properties);
  }, [categorySlug, priceRange, sortBy]);

  const formatPrice = (price) => {
    if (price >= 10000000) {
      return `₹${(price / 10000000).toFixed(2)} Cr`;
    }
    return `₹${(price / 100000).toFixed(2)} Lac`;
  };

  if (!category) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-gradient-to-r from-[#003366] to-[#004d99] text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <button
            onClick={() => navigate("/")}
            className="flex items-center gap-2 text-white hover:text-orange-400 transition-colors mb-6"
          >
            <Home size={20} />
            <span>Back to Home</span>
          </button>
          <h1 className="text-4xl md:text-5xl font-bold mb-3">{category.name}</h1>
          <p className="text-lg text-blue-100">{category.description}</p>
          <p className="text-sm text-blue-200 mt-2">{filteredProperties.length} Properties Available</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          <aside className="lg:w-72 flex-shrink-0">
            <div className="bg-white rounded-lg shadow-md p-6 sticky top-8">
              <h3 className="text-xl font-bold text-[#003366] mb-4">Filters</h3>

              <div className="mb-6">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Price Range
                </label>
                <select
                  value={priceRange}
                  onChange={(e) => setPriceRange(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                >
                  <option value="all">All Prices</option>
                  <option value="0-5000000">Under ₹50 Lac</option>
                  <option value="5000000-10000000">₹50 Lac - ₹1 Cr</option>
                  <option value="10000000-20000000">₹1 Cr - ₹2 Cr</option>
                  <option value="20000000-99999999">Above ₹2 Cr</option>
                </select>
              </div>

              <div className="mb-6">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Sort By
                </label>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                >
                  <option value="newest">Newest First</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                </select>
              </div>

              <div className="border-t pt-4">
                <h4 className="text-sm font-semibold text-gray-700 mb-3">Other Categories</h4>
                <div className="space-y-2">
                  {propertyCategories
                    .filter(c => c.slug !== categorySlug)
                    .map(cat => (
                      <button
                        key={cat.id}
                        onClick={() => navigate(`/properties/${cat.slug}`)}
                        className="w-full text-left px-3 py-2 text-sm text-gray-600 hover:bg-orange-50 hover:text-orange-600 rounded transition-colors"
                      >
                        {cat.name}
                      </button>
                    ))}
                </div>
              </div>
            </div>
          </aside>

          <main className="flex-1">
            {filteredProperties.length === 0 ? (
              <div className="bg-white rounded-lg shadow-md p-12 text-center">
                <p className="text-gray-500 text-lg">No properties found matching your criteria.</p>
              </div>
            ) : (
              <div className="space-y-6">
                {filteredProperties.map(property => (
                  <article
                    key={property.id}
                    className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 cursor-pointer"
                    onClick={() => navigate(`/property/${property.id}`)}
                  >
                    <div className="flex flex-col md:flex-row">
                      <div className="md:w-80 h-64 md:h-auto flex-shrink-0">
                        <img
                          src={property.mainImage}
                          alt={property.title}
                          className="w-full h-full object-cover"
                        />
                      </div>

                      <div className="flex-1 p-6">
                        <div className="flex items-start justify-between mb-3">
                          <div>
                            <h2 className="text-2xl font-bold text-[#003366] mb-2 hover:text-orange-600 transition-colors">
                              {property.title}
                            </h2>
                            <div className="flex items-center gap-2 text-gray-600 mb-2">
                              <MapPin size={16} className="text-orange-500" />
                              <span>{property.location}, {property.city}</span>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="text-2xl font-bold text-orange-600">
                              {formatPrice(property.price)}
                            </div>
                            <div className="text-xs text-gray-500 mt-1">
                              ₹{Math.round(property.price / property.area)}/{property.areaUnit}
                            </div>
                          </div>
                        </div>

                        <div className="flex flex-wrap gap-4 mb-4">
                          {property.bedrooms > 0 && (
                            <div className="flex items-center gap-2 text-gray-700">
                              <Bed size={18} className="text-[#003366]" />
                              <span className="text-sm font-medium">{property.bedrooms} Beds</span>
                            </div>
                          )}
                          {property.bathrooms > 0 && (
                            <div className="flex items-center gap-2 text-gray-700">
                              <Bath size={18} className="text-[#003366]" />
                              <span className="text-sm font-medium">{property.bathrooms} Baths</span>
                            </div>
                          )}
                          <div className="flex items-center gap-2 text-gray-700">
                            <Maximize size={18} className="text-[#003366]" />
                            <span className="text-sm font-medium">{property.area} {property.areaUnit}</span>
                          </div>
                        </div>

                        <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                          {property.description}
                        </p>

                        <div className="flex flex-wrap gap-2 mb-4">
                          {property.amenities.slice(0, 4).map((amenity, idx) => (
                            <span
                              key={idx}
                              className="px-3 py-1 bg-blue-50 text-[#003366] text-xs rounded-full font-medium"
                            >
                              {amenity}
                            </span>
                          ))}
                          {property.amenities.length > 4 && (
                            <span className="px-3 py-1 bg-gray-100 text-gray-600 text-xs rounded-full font-medium">
                              +{property.amenities.length - 4} more
                            </span>
                          )}
                        </div>

                        <div className="flex items-center justify-between pt-4 border-t">
                          <span className="text-xs text-gray-500">
                            Posted: {new Date(property.postedDate).toLocaleDateString()}
                          </span>
                          <button className="bg-orange-600 hover:bg-orange-700 text-white px-6 py-2 rounded-lg font-semibold transition-colors flex items-center gap-2">
                            <Phone size={16} />
                            Contact
                          </button>
                        </div>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}

export default Properties;
