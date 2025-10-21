import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

const PricingOthers = ({ data, updateData }) => {
  const [price, setPrice] = useState(data.price || '');
  const [projectName, setProjectName] = useState(data.projectName || '');
  const [description, setDescription] = useState(data.description || '');
  const [privateNotes, setPrivateNotes] = useState(data.privateNotes || '');
  const [approvedBy, setApprovedBy] = useState(data.approvedBy || []);
  const [amenities, setAmenities] = useState(data.amenities || []);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [validationErrors, setValidationErrors] = useState({});

  const navigate = useNavigate();
  const { user } = useAuth();

  const approvedOptions = ['VMRDA', 'VUDA', 'DTCP', 'RERA', 'GVMC', 'Bank Loan'];
  const amenitiesOptions = [
    'Security',
    'Maintenance Staff',
    'Clubhouse',
    'Park / Garden',
    'Gym / Rooms',
    'Swimming Pool',
    'Wi-Fi',
    'Restrooms',
  ];

  const handleApprovedChange = (value) => {
    setApprovedBy((prev) =>
      prev.includes(value) ? prev.filter((v) => v !== value) : [...prev, value]
    );
  };

  const handleAmenitiesChange = (value) => {
    setAmenities((prev) =>
      prev.includes(value) ? prev.filter((v) => v !== value) : [...prev, value]
    );
  };

  const validateForm = () => {
    const errors = {};
    
    if (!price || price <= 0) {
      errors.price = 'Price is required and must be greater than 0';
    }
    
    if (!description || description.trim() === '') {
      errors.description = 'Description is required';
    }
    
    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

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
    if (data.photos?.length > 0) score += 4;
    return score;
  };

  const handleSubmit = async (status) => {
    // For published status, validate mandatory fields
    if (status === 'published') {
      if (!validateForm()) {
        setError('Please fill all mandatory fields');
        return;
      }
    }

    setLoading(true);
    setError('');
    setValidationErrors({});
    
    try {
      const propertyDataToSave = {
        ...data,
        price: parseFloat(price) || null,
        project_name: projectName || null,
        description: description || null,
        privateNotes: privateNotes || null,
        approvedBy,
        amenities,
        property_score: status === 'published' ? 100 : calculateScore(),
        status,
      };

      console.log('Property saved (mock):', propertyDataToSave);
      updateData(propertyDataToSave);

      setSuccess(true);
      setTimeout(() => navigate('/'), 2000);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const isPublishDisabled = loading || !price || !description;

  return (
    <div className="space-y-8 relative">
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

      {success && (
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 mt-4 bg-green-100 border border-green-300 text-green-800 px-6 py-4 rounded-lg shadow-lg font-roboto z-50">
          🎉 Property posted successfully!
        </div>
      )}

      {/* PRICE & DETAILS */}
      <div className="space-y-6">
        {/* Price - Mandatory */}
        <div>
          <label className="block font-roboto text-sm font-medium text-gray-700 mb-2">
            Price (₹) <span className="text-red-500">*</span>
          </label>
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            placeholder="Enter price"
            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none font-roboto ${
              validationErrors.price ? 'border-red-500' : 'border-gray-300'
            }`}
          />
          {validationErrors.price && (
            <p className="text-red-500 text-xs mt-1">{validationErrors.price}</p>
          )}
        </div>

        {/* Project Name */}
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

        {/* Description - Mandatory */}
        <div>
          <label className="block font-roboto text-sm font-medium text-gray-700 mb-2">
            Property Description <span className="text-red-500">*</span>
          </label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Describe your property..."
            rows="5"
            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none font-roboto resize-none ${
              validationErrors.description ? 'border-red-500' : 'border-gray-300'
            }`}
          />
          {validationErrors.description && (
            <p className="text-red-500 text-xs mt-1">{validationErrors.description}</p>
          )}
        </div>

        {/* Private Notes Field */}
        <div>
          <label className="block font-roboto text-sm font-medium text-gray-700 mb-2">
            Private Notes
          </label>
          <textarea
            value={privateNotes}
            onChange={(e) => setPrivateNotes(e.target.value)}
            placeholder="Enter private notes (visible only to owner)"
            rows="3"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none font-roboto resize-none"
          />
          <p className="text-xs text-gray-500 mt-1">
            Private notes are only visible to owner. It won't be shown on the frontend.
          </p>
        </div>
      </div>

      {/* CONDITIONAL SECTIONS */}
      {data.propertySubtype === 'Flat/Apartment' && (
        <div className="space-y-6 mt-8">
          <div>
            <h3 className="font-serif text-xl font-semibold text-blue-900 mb-3">
              Approved By
            </h3>
            <div className="flex flex-wrap gap-3">
              {approvedOptions.map((opt) => (
                <button
                  key={opt}
                  type="button"
                  onClick={() => handleApprovedChange(opt)}
                  className={`px-4 py-2.5 rounded-full border-2 transition-all ${
                    approvedBy.includes(opt)
                      ? 'bg-blue-900 border-blue-900 text-white'
                      : 'bg-white border-gray-300 text-gray-700 hover:border-orange-300'
                  }`}
                >
                  {opt}
                </button>
              ))}
            </div>
          </div>

          <div>
            <h3 className="font-serif text-xl font-semibold text-blue-900 mb-3">
              Amenities
            </h3>
            <div className="grid grid-cols-2 gap-3">
              {amenitiesOptions.map((amenity) => (
                <label
                  key={amenity}
                  className="flex items-center gap-2 text-gray-700 cursor-pointer"
                >
                  <input
                    type="checkbox"
                    checked={amenities.includes(amenity)}
                    onChange={() => handleAmenitiesChange(amenity)}
                    className="text-orange-500 focus:ring-orange-500"
                  />
                  {amenity}
                </label>
              ))}
            </div>
          </div>
        </div>
      )}

      {data.propertySubtype === 'Plot' && (
        <div className="space-y-6 mt-8">
          <div>
            <h3 className="font-serif text-xl font-semibold text-blue-900 mb-3">
              Approved By
            </h3>
            <div className="flex flex-wrap gap-3">
              {approvedOptions.map((opt) => (
                <button
                  key={opt}
                  type="button"
                  onClick={() => handleApprovedChange(opt)}
                  className={`px-4 py-2.5 rounded-full border-2 transition-all ${
                    approvedBy.includes(opt)
                      ? 'bg-blue-900 border-blue-900 text-white'
                      : 'bg-white border-gray-300 text-gray-700 hover:border-orange-300'
                  }`}
                >
                  {opt}
                </button>
              ))}
            </div>
          </div>

          <div>
            <h3 className="font-serif text-xl font-semibold text-blue-900 mb-3">
              Amenities
            </h3>
            <div className="grid grid-cols-2 gap-3">
              {amenitiesOptions.map((amenity) => (
                <label
                  key={amenity}
                  className="flex items-center gap-2 text-gray-700 cursor-pointer"
                >
                  <input
                    type="checkbox"
                    checked={amenities.includes(amenity)}
                    onChange={() => handleAmenitiesChange(amenity)}
                    className="text-orange-500 focus:ring-orange-500"
                  />
                  {amenity}
                </label>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* SUMMARY */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mt-10">
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

          {(data.propertySubtype === 'Plot' || data.propertySubtype === 'Flat/Apartment') && (
            <>
              <div>
                <span className="text-gray-600">Approved By:</span>
                <span className="ml-2 font-medium text-gray-900">
                  {approvedBy.join(', ') || 'N/A'}
                </span>
              </div>
              <div className="col-span-2">
                <span className="text-gray-600">Amenities:</span>
                <span className="ml-2 font-medium text-gray-900">
                  {amenities.join(', ') || 'N/A'}
                </span>
              </div>
            </>
          )}

          <div>
            <span className="text-gray-600">Property Score:</span>
            <span className="ml-2 font-medium text-orange-500">
              {success ? 100 : calculateScore()}%
            </span>
          </div>
        </div>
      </div>

      {/* ACTION BUTTONS */}
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
          disabled={isPublishDisabled}
          className="flex-1 bg-blue-900 hover:bg-blue-800 text-white font-roboto font-medium px-8 py-3 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? 'Publishing...' : 'Publish Property'}
        </button>
      </div>

      {/* Mandatory fields note */}
      <div className="text-xs text-gray-500 text-center mt-4">
        <span className="text-red-500">*</span> indicates mandatory fields
      </div>
    </div>
  );
};

export default PricingOthers;