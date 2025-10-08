import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { propertiesData } from "../data/propertiesData";
import {
  Home,
  MapPin,
  Maximize,
  Bed,
  Bath,
  Phone,
  Mail,
  Share2,
  Heart,
  Calendar,
  Building,
  CheckCircle,
  ArrowLeft,
  ArrowRight,
} from "lucide-react";

function PropertyDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [property, setProperty] = useState(null);
  const [selectedImage, setSelectedImage] = useState(0);
  const [showContact, setShowContact] = useState(false);

  useEffect(() => {
    const prop = propertiesData.find(p => p.id === parseInt(id));
    setProperty(prop);
    window.scrollTo(0, 0);
  }, [id]);

  if (!property) {
    return <div>Loading...</div>;
  }

  const formatPrice = (price) => {
    if (price >= 10000000) {
      return `₹${(price / 10000000).toFixed(2)} Cr`;
    }
    return `₹${(price / 100000).toFixed(2)} Lac`;
  };

  const similarProperties = propertiesData
    .filter(p => p.categorySlug === property.categorySlug && p.id !== property.id)
    .slice(0, 3);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-[#003366] text-white py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-white hover:text-orange-400 transition-colors"
          >
            <Home size={20} />
            <span>Back to Listings</span>
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-lg overflow-hidden mb-6">
              <div className="relative h-96 bg-gray-900">
                <img
                  src={property.galleryImages[selectedImage]}
                  alt={property.title}
                  className="w-full h-full object-cover"
                />
                {selectedImage > 0 && (
                  <button
                    onClick={() => setSelectedImage(selectedImage - 1)}
                    className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white p-2 rounded-full transition-colors"
                  >
                    <ArrowLeft size={24} className="text-[#003366]" />
                  </button>
                )}
                {selectedImage < property.galleryImages.length - 1 && (
                  <button
                    onClick={() => setSelectedImage(selectedImage + 1)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white p-2 rounded-full transition-colors"
                  >
                    <ArrowRight size={24} className="text-[#003366]" />
                  </button>
                )}
                <div className="absolute top-4 right-4 flex gap-2">
                  <button className="bg-white/90 hover:bg-white p-2 rounded-full transition-colors">
                    <Heart size={20} className="text-orange-600" />
                  </button>
                  <button className="bg-white/90 hover:bg-white p-2 rounded-full transition-colors">
                    <Share2 size={20} className="text-[#003366]" />
                  </button>
                </div>
              </div>

              <div className="p-4 flex gap-2 overflow-x-auto">
                {property.galleryImages.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImage(idx)}
                    className={`flex-shrink-0 w-24 h-24 rounded-lg overflow-hidden border-2 transition-all ${
                      selectedImage === idx
                        ? "border-orange-600 ring-2 ring-orange-200"
                        : "border-gray-300 hover:border-orange-400"
                    }`}
                  >
                    <img src={img} alt={`View ${idx + 1}`} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h1 className="text-3xl font-bold text-[#003366] mb-2">{property.title}</h1>
                  <div className="flex items-center gap-2 text-gray-600">
                    <MapPin size={18} className="text-orange-500" />
                    <span className="text-lg">{property.location}, {property.city}, {property.state}</span>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-3xl font-bold text-orange-600">{formatPrice(property.price)}</div>
                  <div className="text-sm text-gray-500 mt-1">
                    ₹{Math.round(property.price / property.area)}/{property.areaUnit}
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 py-6 border-y">
                {property.bedrooms > 0 && (
                  <div className="text-center">
                    <div className="flex justify-center mb-2">
                      <div className="bg-blue-50 p-3 rounded-full">
                        <Bed size={24} className="text-[#003366]" />
                      </div>
                    </div>
                    <div className="text-lg font-bold text-[#003366]">{property.bedrooms}</div>
                    <div className="text-sm text-gray-600">Bedrooms</div>
                  </div>
                )}
                {property.bathrooms > 0 && (
                  <div className="text-center">
                    <div className="flex justify-center mb-2">
                      <div className="bg-blue-50 p-3 rounded-full">
                        <Bath size={24} className="text-[#003366]" />
                      </div>
                    </div>
                    <div className="text-lg font-bold text-[#003366]">{property.bathrooms}</div>
                    <div className="text-sm text-gray-600">Bathrooms</div>
                  </div>
                )}
                <div className="text-center">
                  <div className="flex justify-center mb-2">
                    <div className="bg-blue-50 p-3 rounded-full">
                      <Maximize size={24} className="text-[#003366]" />
                    </div>
                  </div>
                  <div className="text-lg font-bold text-[#003366]">{property.area}</div>
                  <div className="text-sm text-gray-600">{property.areaUnit}</div>
                </div>
                <div className="text-center">
                  <div className="flex justify-center mb-2">
                    <div className="bg-blue-50 p-3 rounded-full">
                      <Building size={24} className="text-[#003366]" />
                    </div>
                  </div>
                  <div className="text-lg font-bold text-[#003366]">{property.status}</div>
                  <div className="text-sm text-gray-600">Status</div>
                </div>
              </div>

              <div className="mt-6">
                <h2 className="text-2xl font-bold text-[#003366] mb-4">Overview</h2>
                <p className="text-gray-700 leading-relaxed">{property.description}</p>
              </div>

              <div className="mt-6">
                <h2 className="text-2xl font-bold text-[#003366] mb-4">Property Details</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex justify-between py-3 border-b">
                    <span className="text-gray-600">Property Type</span>
                    <span className="font-semibold text-[#003366]">{property.propertyType}</span>
                  </div>
                  <div className="flex justify-between py-3 border-b">
                    <span className="text-gray-600">Location</span>
                    <span className="font-semibold text-[#003366]">{property.location}</span>
                  </div>
                  <div className="flex justify-between py-3 border-b">
                    <span className="text-gray-600">City</span>
                    <span className="font-semibold text-[#003366]">{property.city}</span>
                  </div>
                  <div className="flex justify-between py-3 border-b">
                    <span className="text-gray-600">Posted Date</span>
                    <span className="font-semibold text-[#003366]">
                      {new Date(property.postedDate).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              </div>

              <div className="mt-6">
                <h2 className="text-2xl font-bold text-[#003366] mb-4">Amenities & Features</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {property.amenities.map((amenity, idx) => (
                    <div key={idx} className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg">
                      <CheckCircle size={20} className="text-orange-600 flex-shrink-0" />
                      <span className="text-[#003366] font-medium">{amenity}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {similarProperties.length > 0 && (
              <div className="bg-white rounded-lg shadow-lg p-6">
                <h2 className="text-2xl font-bold text-[#003366] mb-6">Similar Properties</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {similarProperties.map(prop => (
                    <div
                      key={prop.id}
                      onClick={() => navigate(`/property/${prop.id}`)}
                      className="bg-white border border-gray-200 rounded-lg overflow-hidden cursor-pointer hover:shadow-lg transition-shadow"
                    >
                      <img
                        src={prop.mainImage}
                        alt={prop.title}
                        className="w-full h-40 object-cover"
                      />
                      <div className="p-4">
                        <h3 className="font-bold text-[#003366] mb-2 line-clamp-1">{prop.title}</h3>
                        <p className="text-sm text-gray-600 mb-2 flex items-center gap-1">
                          <MapPin size={14} className="text-orange-500" />
                          {prop.location}
                        </p>
                        <div className="text-lg font-bold text-orange-600">{formatPrice(prop.price)}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-lg p-6 sticky top-8">
              <div className="text-center mb-6">
                <div className="w-20 h-20 bg-gradient-to-br from-[#003366] to-[#004d99] rounded-full mx-auto mb-4 flex items-center justify-center">
                  <Building size={36} className="text-white" />
                </div>
                <h3 className="text-xl font-bold text-[#003366] mb-1">Contact Property Advisor</h3>
                <p className="text-sm text-gray-600">Get expert assistance</p>
              </div>

              {!showContact ? (
                <button
                  onClick={() => setShowContact(true)}
                  className="w-full bg-orange-600 hover:bg-orange-700 text-white py-3 rounded-lg font-semibold transition-colors flex items-center justify-center gap-2 mb-4"
                >
                  <Phone size={20} />
                  Show Contact Details
                </button>
              ) : (
                <div className="space-y-4 mb-4">
                  <div className="flex items-center gap-3 p-4 bg-blue-50 rounded-lg">
                    <Phone size={20} className="text-orange-600" />
                    <div>
                      <div className="text-xs text-gray-600">Call Now</div>
                      <div className="font-bold text-[#003366]">+91 98765 43210</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-4 bg-blue-50 rounded-lg">
                    <Mail size={20} className="text-orange-600" />
                    <div>
                      <div className="text-xs text-gray-600">Email</div>
                      <div className="font-bold text-[#003366] text-sm">info@realestate.com</div>
                    </div>
                  </div>
                </div>
              )}

              <div className="border-t pt-6">
                <h4 className="font-bold text-[#003366] mb-4">Schedule a Visit</h4>
                <form className="space-y-4">
                  <input
                    type="text"
                    placeholder="Your Name"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                  />
                  <input
                    type="email"
                    placeholder="Your Email"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                  />
                  <input
                    type="tel"
                    placeholder="Your Phone"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                  />
                  <textarea
                    placeholder="Message (Optional)"
                    rows="3"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                  ></textarea>
                  <button
                    type="submit"
                    className="w-full bg-[#003366] hover:bg-[#004d99] text-white py-3 rounded-lg font-semibold transition-colors"
                  >
                    Request a Callback
                  </button>
                </form>
              </div>

              <div className="border-t mt-6 pt-6">
                <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
                  <Calendar size={16} className="text-orange-500" />
                  <span>Posted: {new Date(property.postedDate).toLocaleDateString()}</span>
                </div>
                <p className="text-xs text-gray-500 mt-4">
                  All information provided is deemed reliable but is not guaranteed. Buyers should verify all details.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PropertyDetail;
