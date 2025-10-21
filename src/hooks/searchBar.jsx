import { useState } from 'react';
import axios from 'axios';
import ApiService from './ApiService';

const SearchBar = ({ setResults }) => {
  const [location, setLocation] = useState('');
  const [propertyType, setPropertyType] = useState('');
  const [priceRange, setPriceRange] = useState('');

  const handleSearch = async () => {
    let minPrice = '', maxPrice = '';

    // Parse price range string
    switch (priceRange) {
      case 'below25':
        maxPrice = 2500000;
        break;
      case '25to50':
        minPrice = 2500000;
        maxPrice = 5000000;
        break;
      case '50to100':
        minPrice = 5000000;
        maxPrice = 10000000;
        break;
      case 'above100':
        minPrice = 10000000;
        break;
      default:
        break;
    }

    const params = {};
    if (location) params.location = location;
    if (propertyType && propertyType !== 'all') params.type = propertyType;
    if (minPrice) params.minPrice = minPrice;
    if (maxPrice) params.maxPrice = maxPrice;

    try {
      const response = await ApiService.get(`/properties/search`,{ params });

      // const response = await A.get('/properties/search', { params });
      setResults(response.data || []);
    } catch (error) {
      console.error('Search failed:', error);
    }
  };

  return (
    <div className="border-t border-gray-300 shadow-lg bg-orange-500 text-white transition-all duration-300">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10 py-8">
        <div className="flex flex-wrap items-end gap-6">
          {/* Location Input */}
          <div className="flex-1 min-w-[240px]">
            <label className="flex items-center text-sm font-medium text-white mb-2">
              <svg className="w-5 h-5 text-white mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a2 2 0 01-2.828 0l-4.243-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              Location
            </label>
            <input
              type="text"
              placeholder="Enter city, neighborhood, or address..."
              className="w-full border border-gray-200 rounded-lg px-4 py-3 bg-white text-gray-800 focus:ring-2 focus:ring-orange-700 outline-none"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />
          </div>

          {/* Property Type Select */}
          <div className="w-64 min-w-[200px]">
            <label className="block text-sm font-medium text-white mb-2">Property Type</label>
            <select
              className="w-full border border-gray-200 rounded-lg px-4 py-3 bg-white text-gray-800 focus:ring-2 focus:ring-orange-700 outline-none"
              value={propertyType}
              onChange={(e) => setPropertyType(e.target.value.toLowerCase())}
            >
              <option value="all">All Types</option>
              <option value="apartment">Apartment</option>
              <option value="villa">Villa</option>
              <option value="plot">Plot</option>
            </select>
          </div>

          {/* Price Range Select */}
          <div className="w-64 min-w-[200px]">
            <label className="block text-sm font-medium text-white mb-2">Price Range</label>
            <select
              className="w-full border border-gray-200 rounded-lg px-4 py-3 bg-white text-gray-800 focus:ring-2 focus:ring-orange-700 outline-none"
              value={priceRange}
              onChange={(e) => setPriceRange(e.target.value)}
            >
              <option value="">Any Price</option>
              <option value="below25">Below ₹25L</option>
              <option value="25to50">₹25L - ₹50L</option>
              <option value="50to100">₹50L - ₹1Cr</option>
              <option value="above100">Above ₹1Cr</option>
            </select>
          </div>

          {/* Search Button */}
          <button
            onClick={handleSearch}
            className="bg-white hover:bg-gray-100 text-orange-600 px-7 py-2.5 rounded-full flex items-center justify-center transition-colors font-semibold"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            Search
          </button>
        </div>
      </div>
    </div>
  );
};

export default SearchBar;
