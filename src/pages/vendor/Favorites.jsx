import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Heart, Trash2, MapPin, Bed, Bath, Maximize } from "lucide-react";

const Favorites = () => {
  const navigate = useNavigate();
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const saved = localStorage.getItem("favorites");
    setFavorites(saved ? JSON.parse(saved) : []);
  }, []);

  const removeFavorite = (id) => {
    const updated = favorites.filter((item) => item.id !== id);
    setFavorites(updated);
    localStorage.setItem("favorites", JSON.stringify(updated));
  };

  const formatPrice = (price) => {
    if (!price) return "Contact Us";
    if (price >= 10000000) return `₹${(price / 10000000).toFixed(2)} Cr`;
    return `₹${(price / 100000).toFixed(2)} Lac`;
  };

  const getPhotoSrc = (photos) => {
    if (!photos || photos.length === 0) return "/no-image-found.png";
    return photos[0].url || photos[0];
  };

  return (
    <section className="py-16 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4">

        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900">My Favorites</h2>
          <p className="text-gray-600 mt-2">
            Properties you saved for later viewing.
          </p>
        </div>

        {/* Empty State */}
        {favorites.length === 0 ? (
          <div className="text-center py-20">
            <Heart className="w-16 h-16 mx-auto text-gray-400 mb-4" />
            <h3 className="text-2xl font-semibold text-gray-700">No Favorites Yet</h3>
            <p className="text-gray-500 mt-2">
              Explore properties and tap the ❤️ icon to save your favorites.
            </p>

            <button
              onClick={() => navigate("/")}
              className="mt-6 px-6 py-3 bg-orange-600 text-white rounded-lg shadow hover:bg-orange-700 transition"
            >
              Browse Properties
            </button>
          </div>
        ) : (
          <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {favorites.map((property) => (
              <div
                key={property.id}
                className="bg-white rounded-xl shadow hover:shadow-xl transition overflow-hidden cursor-pointer group"
                onClick={() =>
                  navigate(`/property/${property.id}`, { state: { property } })
                }
              >
                <div className="relative h-56 overflow-hidden">
                  <img
                    src={getPhotoSrc(property.photos)}
                    alt={property.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition duration-300"
                  />

                  {/* Remove Button */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      removeFavorite(property.id);
                    }}
                    className="absolute top-3 right-3 bg-white/80 hover:bg-red-500 hover:text-white text-red-500 p-2 rounded-full shadow transition"
                  >
                    <Trash2 size={18} />
                  </button>

                  {/* Favorite Icon */}
                  <div className="absolute top-3 left-3">
                    <Heart className="w-7 h-7 text-red-600 fill-red-600" />
                  </div>
                </div>

                <div className="p-5">
                  <h3 className="text-xl font-bold text-[#003366] mb-2">
                    {property.title}
                  </h3>

                  <div className="flex items-center gap-2 text-gray-600 text-sm mb-4">
                    <MapPin size={16} className="text-orange-600" />
                    {property.address?.city}, {property.address?.locality}
                  </div>

                  {property.profile && (
                    <div className="flex items-center gap-5 text-gray-700 text-sm mb-4">
                      {property.profile.bedrooms > 0 && (
                        <div className="flex items-center gap-1">
                          <Bed size={16} className="text-[#003366]" />
                          {property.profile.bedrooms}
                        </div>
                      )}
                      {property.profile.bathrooms > 0 && (
                        <div className="flex items-center gap-1">
                          <Bath size={16} className="text-[#003366]" />
                          {property.profile.bathrooms}
                        </div>
                      )}
                      <div className="flex items-center gap-1">
                        <Maximize size={16} className="text-[#003366]" />
                        {property.profile.carpetArea} {property.profile.areaUnit}
                      </div>
                    </div>
                  )}

                  <div className="mt-2">
                    <span className="text-2xl font-bold text-orange-600">
                      {formatPrice(property.price)}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default Favorites;
