import { useEffect, useState } from 'react';
import { Eye, Bed, Bath, MapPin, IndianRupee } from 'lucide-react';
import { useViewedProperties } from '../hooks/useViewedProperties';
import { propertiesData } from '../data/propertiesData';

const ViewedProperties = () => {
  const { viewedPropertyIds } = useViewedProperties();
  const [viewedProperties, setViewedProperties] = useState([]);

  useEffect(() => {
    const properties = viewedPropertyIds
      .map(id => propertiesData.find(p => p.id === id))
      .filter(Boolean);
    setViewedProperties(properties);
  }, [viewedPropertyIds]);

  if (viewedProperties.length === 0) {
    return null;
  }

  const formatPrice = (price) => {
    if (price >= 10000000) {
      return `${(price / 10000000).toFixed(2)} Cr`;
    } else if (price >= 100000) {
      return `${(price / 100000).toFixed(2)} L`;
    }
    return price.toLocaleString('en-IN');
  };

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-8">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Eye className="w-6 h-6 text-orange-500" />
              <h2 className="text-3xl font-bold text-gray-900">Recently Viewed</h2>
            </div>
            <p className="text-gray-600">Properties you've recently checked out</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {viewedProperties.map((property) => (
            <div
              key={property.id}
              className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300"
            >
              <div className="relative h-48 overflow-hidden group">
                <img
                  src={property.mainImages[0]}
                  alt={property.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute top-3 left-3">
                  <span className="bg-orange-500 text-white px-3 py-1 rounded-full text-xs font-semibold">
                    {property.status}
                  </span>
                </div>
              </div>

              <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-1">
                  {property.title}
                </h3>

                <div className="flex items-center text-gray-600 text-sm mb-3">
                  <MapPin className="w-4 h-4 mr-1" />
                  <span className="line-clamp-1">{property.location}, {property.city}</span>
                </div>

                <div className="flex items-center justify-between mb-3 pb-3 border-b border-gray-200">
                  {property.bedrooms > 0 && (
                    <div className="flex items-center text-gray-600 text-sm">
                      <Bed className="w-4 h-4 mr-1" />
                      <span>{property.bedrooms} BHK</span>
                    </div>
                  )}
                  {property.bathrooms > 0 && (
                    <div className="flex items-center text-gray-600 text-sm">
                      <Bath className="w-4 h-4 mr-1" />
                      <span>{property.bathrooms} Bath</span>
                    </div>
                  )}
                  <div className="text-gray-600 text-sm">
                    {property.area} {property.areaUnit}
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center text-orange-600 font-bold text-lg">
                    <IndianRupee className="w-5 h-5" />
                    <span>{formatPrice(property.price)}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ViewedProperties;
