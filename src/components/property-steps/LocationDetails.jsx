import { useState, useEffect } from 'react';

const LocationDetails = ({ data, updateData, onNext }) => {
  const [city, setCity] = useState(data.city || '');
  const [locality, setLocality] = useState(data.locality || '');
  const [subLocality, setSubLocality] = useState(data.subLocality || '');
  const [apartmentSociety, setApartmentSociety] = useState(data.apartmentSociety || '');

  // ✅ Normalize subtype safely and check for land-like types
  const subtype = (data.propertySubtype || '').trim().toLowerCase();
  const isLand =
    subtype.includes('land') ||
    subtype.includes('plot') ||
    subtype === 'farmhouse'; // optional: include farmhouse as non-society type

  useEffect(() => {
    console.log('Property Subtype:', data.propertySubtype);
    console.log('isLand:', isLand);
    if (isLand) setApartmentSociety('');
  }, [data.propertySubtype, isLand]);

  const handleContinue = () => {
    updateData({
      city,
      locality,
      subLocality,
      apartmentSociety: isLand ? '' : apartmentSociety,
    });
    onNext();
  };

  return (
    <div className="space-y-8">
      <div>
        <h2 className="font-serif text-3xl font-bold text-blue-900 mb-2">
          Where is your property located?
        </h2>
        <p className="font-roboto text-gray-600">
          An accurate location helps you connect with the right buyers
        </p>
      </div>

      <div className="space-y-6">
        {/* City */}
        <div>
          <label className="block font-roboto text-sm font-medium text-gray-700 mb-2">
            City
          </label>
          <input
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            placeholder="e.g., Visakhapatnam"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg 
                       focus:ring-2 focus:ring-orange-500 focus:border-transparent 
                       outline-none font-roboto"
          />
        </div>

        {/* Locality */}
        <div>
          <label className="block font-roboto text-sm font-medium text-gray-700 mb-2">
            Locality
          </label>
          <input
            type="text"
            value={locality}
            onChange={(e) => setLocality(e.target.value)}
            placeholder="e.g., Duvvada"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg 
                       focus:ring-2 focus:ring-orange-500 focus:border-transparent 
                       outline-none font-roboto"
          />
        </div>

        {/* Sub Locality */}
        <div>
          <label className="block font-roboto text-sm font-medium text-gray-700 mb-2">
            Sub Locality (Optional)
          </label>
          <input
            type="text"
            value={subLocality}
            onChange={(e) => setSubLocality(e.target.value)}
            placeholder="Enter sub locality"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg 
                       focus:ring-2 focus:ring-orange-500 focus:border-transparent 
                       outline-none font-roboto"
          />
        </div>

        {/* Apartment / Society – Hidden for land-like types */}
        {!isLand && (
          <div>
            <label className="block font-roboto text-sm font-medium text-gray-700 mb-2">
              Apartment / Society
            </label>
            <input
              type="text"
              value={apartmentSociety}
              onChange={(e) => setApartmentSociety(e.target.value)}
              placeholder="Enter apartment or society name"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg 
                         focus:ring-2 focus:ring-orange-500 focus:border-transparent 
                         outline-none font-roboto"
            />
          </div>
        )}
      </div>

      {/* Continue Button */}
      <button
        onClick={handleContinue}
        disabled={!city || !locality}
        className="bg-blue-900 hover:bg-blue-800 text-white font-roboto font-medium 
                   px-10 py-3 rounded-lg transition-colors 
                   disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Continue
      </button>
    </div>
  );
};

export default LocationDetails;
