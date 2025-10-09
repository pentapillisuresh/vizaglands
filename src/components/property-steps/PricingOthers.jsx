import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
// import { supabase } from '../../lib/supabase';

const PricingOthers = ({ data, updateData }) => {
  const [price, setPrice] = useState(data.price || '');
  const [projectName, setProjectName] = useState(data.projectName || '');
  const [description, setDescription] = useState(data.description || '');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const navigate = useNavigate();
  const { user } = useAuth();

  const calculateScore = () => {
    let score = 0;
    if (data.listingType) score += 10;
    if (data.propertyType) score += 10;
    if (data.propertySubtype) score += 12;
    if (data.city) score += 12;
    if (data.locality) score += 12;
    if (data.plotArea) score += 12;
    if (data.facing) score += 8;
    if (price) score += 12;
    if (description) score += 8;
    if (data.photos.length > 0) score += 4;
    return score;
  };

  const handleSubmit = async (status) => {
    setLoading(true);
    setError('');

    try {
      const propertyData = {
        user_id: user.id,
        listing_type: data.listingType,
        property_type: data.propertyType,
        property_subtype: data.propertySubtype,
        city: data.city,
        locality: data.locality,
        sub_locality: data.subLocality || null,
        apartment_society: data.apartmentSociety || null,
        plot_area: parseFloat(data.plotArea) || null,
        plot_area_unit: data.plotAreaUnit,
        length: parseFloat(data.length) || null,
        breadth: parseFloat(data.breadth) || null,
        facing: data.facing,
        price: parseFloat(price) || null,
        project_name: projectName || null,
        description: description || null,
        photos: data.photos || [],
        property_score: calculateScore(),
        status: status,
      };

      const { error: insertError } = await supabase
        .from('properties')
        .insert([propertyData]);

      if (insertError) throw insertError;

      navigate('/');
    } catch (err) {
      setError(err.message);
      console.error('Error saving property:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8">
      <div>
        <h2 className="font-serif text-3xl font-bold text-blue-900 mb-2">
          Pricing & Others
        </h2>
        <p className="font-roboto text-gray-600">
          Set your price and add additional details
        </p>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg font-roboto text-sm">
          {error}
        </div>
      )}

      <div className="space-y-6">
        <div>
          <label className="block font-roboto text-sm font-medium text-gray-700 mb-2">
            Price (₹)
          </label>
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            placeholder="Enter price"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none font-roboto"
          />
        </div>

        <div>
          <label className="block font-roboto text-sm font-medium text-gray-700 mb-2">
            Project Name (Optional)
          </label>
          <input
            type="text"
            value={projectName}
            onChange={(e) => setProjectName(e.target.value)}
            placeholder="Enter project name"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none font-roboto"
          />
        </div>

        <div>
          <label className="block font-roboto text-sm font-medium text-gray-700 mb-2">
            Property Description
          </label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Describe your property..."
            rows="5"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none font-roboto resize-none"
          />
        </div>
      </div>

      {/* Property Summary */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
        <h3 className="font-serif text-lg font-bold text-blue-900 mb-4">
          Property Summary
        </h3>
        <div className="grid grid-cols-2 gap-4 font-roboto text-sm">
          <div>
            <span className="text-gray-600">Type:</span>
            <span className="ml-2 font-medium text-gray-900">{data.propertySubtype}</span>
          </div>
          <div>
            <span className="text-gray-600">Location:</span>
            <span className="ml-2 font-medium text-gray-900">{data.city}</span>
          </div>
          <div>
            <span className="text-gray-600">Area:</span>
            <span className="ml-2 font-medium text-gray-900">
              {data.plotArea} {data.plotAreaUnit}
            </span>
          </div>
          <div>
            <span className="text-gray-600">Facing:</span>
            <span className="ml-2 font-medium text-gray-900">{data.facing}</span>
          </div>
          <div>
            <span className="text-gray-600">Property Score:</span>
            <span className="ml-2 font-medium text-orange-500">{calculateScore()}%</span>
          </div>
        </div>
      </div>

      <div className="flex gap-4">
        <button
          onClick={() => handleSubmit('draft')}
          disabled={loading}
          className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 font-roboto font-medium px-8 py-3 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? 'Saving...' : 'Save as Draft'}
        </button>
        <button
          onClick={() => handleSubmit('published')}
          disabled={loading || !price}
          className="flex-1 bg-blue-700 hover:bg-blue-800 text-white font-roboto font-medium px-8 py-3 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? 'Publishing...' : 'Publish Property'}
        </button>
      </div>
    </div>
  );
};

export default PricingOthers;
