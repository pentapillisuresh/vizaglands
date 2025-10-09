import { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';

const BasicDetails = ({ data, updateData, onNext }) => {
  const { userProfile } = useAuth();
  const [listingType, setListingType] = useState(data.listingType || 'sell');
  const [propertyType, setPropertyType] = useState(data.propertyType || 'residential');
  const [propertySubtype, setPropertySubtype] = useState(data.propertySubtype || '');

  const handleContinue = () => {
    updateData({
      listingType,
      propertyType,
      propertySubtype,
    });
    onNext();
  };

  const residentialTypes = [
    'Flat/Apartment',
    'Independent House / Villa',
    'Independent / Builder Floor',
    'Plot / Land',
    '1 RK/ Studio Apartment',
    'Serviced Apartment',
    'Farmhouse',
    'Other',
  ];

  const commercialTypes = [
    'Office Space',
    'Shop / Showroom',
    'Commercial Land',
    'Warehouse / Godown',
    'Industrial Building',
    'Other',
  ];

  const subtypes = propertyType === 'residential' ? residentialTypes : commercialTypes;

  return (
    <div className="space-y-8">
      <div>
        <h2 className="font-serif text-3xl font-bold text-blue-900 mb-2">
          Welcome back {userProfile?.full_name || 'User'},
        </h2>
        <h3 className="font-serif text-2xl font-semibold text-blue-900 mb-4">
          Fill out basic details
        </h3>
      </div>

      {/* I'm looking to */}
      <div>
        <label className="block font-roboto text-base font-medium text-gray-700 mb-3">
          I'm looking to
        </label>
        <div className="flex flex-wrap gap-3">
          {['sell', 'rent', 'pg'].map((type) => (
            <button
              key={type}
              onClick={() => setListingType(type)}
              className={`px-6 py-2.5 rounded-full border-2 font-roboto capitalize transition-all ${
                listingType === type
                  ? 'bg-orange-500 border-orange-500 text-white'
                  : 'bg-white border-gray-300 text-gray-700 hover:border-orange-300'
              }`}
            >
              {type === 'pg' ? 'PG' : type.charAt(0).toUpperCase() + type.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Property Type */}
      <div>
        <label className="block font-roboto text-base font-medium text-gray-700 mb-3">
          What kind of property do you have?
        </label>
        <div className="flex gap-6 mb-4">
          <label className="flex items-center space-x-2 cursor-pointer">
            <input
              type="radio"
              name="propertyType"
              value="residential"
              checked={propertyType === 'residential'}
              onChange={(e) => {
                setPropertyType(e.target.value);
                setPropertySubtype('');
              }}
              className="w-5 h-5 text-orange-500 focus:ring-orange-500"
            />
            <span className="font-roboto text-gray-700">Residential</span>
          </label>
          <label className="flex items-center space-x-2 cursor-pointer">
            <input
              type="radio"
              name="propertyType"
              value="commercial"
              checked={propertyType === 'commercial'}
              onChange={(e) => {
                setPropertyType(e.target.value);
                setPropertySubtype('');
              }}
              className="w-5 h-5 text-orange-500 focus:ring-orange-500"
            />
            <span className="font-roboto text-gray-700">Commercial</span>
          </label>
        </div>

        {/* Property Subtypes */}
        <div className="flex flex-wrap gap-3">
          {subtypes.map((subtype) => (
            <button
              key={subtype}
              onClick={() => setPropertySubtype(subtype)}
              className={`px-5 py-2.5 rounded-full border-2 font-roboto transition-all ${
                propertySubtype === subtype
                  ? 'bg-orange-500 border-orange-500 text-white'
                  : 'bg-white border-gray-300 text-gray-700 hover:border-orange-300'
              }`}
            >
              {subtype}
            </button>
          ))}
        </div>
      </div>

      <button
        onClick={handleContinue}
        disabled={!propertySubtype}
        className="bg-blue-700 hover:bg-blue-800 text-white font-roboto font-medium px-10 py-3 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Continue
      </button>
    </div>
  );
};

export default BasicDetails;
