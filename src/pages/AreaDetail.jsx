import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import areaData from '../data/areaData';
import { ArrowLeft, MapPin, TrendingUp, IndianRupee, Home, Target } from 'lucide-react';

const AreaDetail = () => {
  const { areaName } = useParams();
  const [area, setArea] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Convert URL parameter back to area name
    const formattedName = areaName
      .replace(/-/g, ' ')
      .split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');

    const foundArea = areaData.find(a => 
      a.name.toLowerCase() === formattedName.toLowerCase()
    );
    
    setArea(foundArea);
    setLoading(false);
  }, [areaName]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#001F3F]"></div>
      </div>
    );
  }

  if (!area) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-white">
        <h1 className="text-3xl font-bold text-[#001F3F] mb-4">Area not found</h1>
        <Link to="/" className="text-[#001F3F] hover:text-orange-500 font-medium">
          ← Back to Home
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Back Button */}
      <div className="container mx-auto px-4 py-6">
        <Link
          to="/"
          className="inline-flex items-center text-[#001F3F] hover:text-orange-500 font-medium"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          Back to All Areas
        </Link>
      </div>

      {/* Hero Section */}
      <div className="relative h-96 overflow-hidden">
        <img
          src={area.image}
          alt={area.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent">
          <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
            <div className="container mx-auto">
              <div className="flex flex-wrap items-center gap-4 mb-4">
                <span className="bg-[#001F3F] text-white text-sm font-semibold px-4 py-2 rounded-full">
                  {area.areaType}
                </span>
                <span className={`text-sm font-semibold px-4 py-2 rounded-full ${
                  area.demand === 'Very High' ? 'bg-red-500' :
                  area.demand === 'High' ? 'bg-orange-500' :
                  area.demand === 'Medium' ? 'bg-yellow-500' :
                  'bg-green-500'
                }`}>
                  {area.demand} Demand
                </span>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold mb-4">{area.name}</h1>
              <div className="flex items-center text-gray-300">
                <MapPin className="w-5 h-5 mr-2" />
                <p className="text-lg">{area.location}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8 -mt-16 relative z-10">
        <div className="bg-white rounded-2xl shadow-2xl p-6 md:p-8 border border-gray-200">
          {/* Quick Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-[#001F3F] text-white p-4 rounded-xl text-center">
              <IndianRupee className="w-8 h-8 text-white mx-auto mb-2" />
              <p className="text-sm text-gray-300">Average Price</p>
              <p className="text-xl font-bold text-white">{area.avgPrice}</p>
            </div>
            <div className="bg-orange-500 text-white p-4 rounded-xl text-center">
              <TrendingUp className="w-8 h-8 text-white mx-auto mb-2" />
              <p className="text-sm text-gray-300">Annual Growth</p>
              <p className="text-xl font-bold text-white">{area.growth}</p>
            </div>
            <div className="bg-[#001F3F] text-white p-4 rounded-xl text-center">
              <Home className="w-8 h-8 text-white mx-auto mb-2" />
              <p className="text-sm text-gray-300">Best For</p>
              <p className="text-xl font-bold text-white">{area.bestFor}</p>
            </div>
            <div className="bg-orange-500 text-white p-4 rounded-xl text-center">
              <Target className="w-8 h-8 text-white mx-auto mb-2" />
              <p className="text-sm text-gray-300">Investment Potential</p>
              <p className="text-xl font-bold text-white">{area.demand}</p>
            </div>
          </div>

          {/* Description */}
          <div className="mb-10">
            <h2 className="text-2xl font-bold text-[#001F3F] mb-4">About {area.name}</h2>
            <div className="prose prose-lg max-w-none">
              <p className="text-gray-700 leading-relaxed text-lg">{area.description}</p>
            </div>
          </div>

          {/* SEO Keywords */}
          <div className="mb-10">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-[#001F3F]"> {area.name}</h2>
              <span className="bg-orange-100 text-orange-800 text-sm font-semibold px-4 py-2 rounded-full">
                High Search Volume
              </span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {area.keywords.map((keyword, index) => (
                <div
                  key={index}
                  className="bg-gray-50 hover:bg-orange-50 transition-all duration-300 p-5 rounded-xl border border-gray-200 hover:border-orange-300 group"
                >
                  <div className="flex items-start">
                    <div className="flex-shrink-0 mt-1">
                      <div className="w-3 h-3 bg-[#001F3F] rounded-full group-hover:scale-125 transition-transform"></div>
                    </div>
                    <div className="ml-4">
                      <p className="text-[#001F3F] font-medium text-lg group-hover:text-orange-600 transition-colors">
                        {keyword}
                      </p>
                      <p className="text-sm text-gray-500 mt-1">
                        Monthly searches: 100-1K
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Investment Analysis */}
          <div className="bg-[#001F3F] rounded-2xl p-6 mb-10 text-white">
            <h2 className="text-2xl font-bold mb-6">Investment Analysis</h2>
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold text-white mb-2">Why Invest in {area.name}?</h3>
                <ul className="list-disc list-inside space-y-2 text-gray-300">
                  <li>VMRDA-approved layouts ensure legal security</li>
                  <li>Excellent connectivity to major landmarks</li>
                  <li>Growing social infrastructure (schools, hospitals, malls)</li>
                  <li>Proximity to employment hubs</li>
                  <li>Stable appreciation with {area.growth} growth rate</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Nearby Areas */}
          <div className="mb-10">
            <h2 className="text-2xl font-bold text-[#001F3F] mb-6">Explore Nearby Areas</h2>
            <div className="flex flex-wrap gap-3">
              {areaData
                .filter(a => a.id !== area.id)
                .slice(0, 4)
                .map(nearbyArea => (
                  <Link
                    key={nearbyArea.id}
                    to={`/area/${nearbyArea.name.toLowerCase().replace(/\s+/g, '-')}`}
                    className="bg-gray-100 hover:bg-orange-100 text-[#001F3F] hover:text-orange-600 px-4 py-2 rounded-full transition-all duration-300 border border-gray-300"
                  >
                    {nearbyArea.name}
                  </Link>
                ))}
            </div>
          </div>

          {/* CTA */}
          <div className="bg-[#001F3F] rounded-2xl p-8 text-center text-white">
            <h3 className="text-2xl font-bold mb-3">Ready to Invest in {area.name}?</h3>
            <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
              Get exclusive access to VMRDA-approved plots, expert guidance, and special pricing
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-orange-500 text-white hover:bg-orange-600 font-bold py-3 px-8 rounded-full transition-all duration-300 transform hover:scale-105">
                Book Site Visit
              </button>
              <button className="bg-transparent border-2 border-white text-white hover:bg-white/10 font-bold py-3 px-8 rounded-full transition-all duration-300">
                Download Brochure
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AreaDetail;