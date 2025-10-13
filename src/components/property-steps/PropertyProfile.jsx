import { useState } from 'react';

const PropertyProfile = ({ data, updateData, onNext }) => {
  // Common state
  const [propertySubtype] = useState(data.propertySubtype || '');

  // Plot/Land fields
  const [plotArea, setPlotArea] = useState(data.plotArea || '');
  const [plotAreaUnit, setPlotAreaUnit] = useState(data.plotAreaUnit || 'sq yards');
  const [length, setLength] = useState(data.length || '');
  const [breadth, setBreadth] = useState(data.breadth || '');
  const [facing, setFacing] = useState(data.facing || '');

  // Apartment/Villa fields
  const [bedrooms, setBedrooms] = useState(data.bedrooms || '');
  const [bathrooms, setBathrooms] = useState(data.bathrooms || '');
  const [balconies, setBalconies] = useState(data.balconies || '');
  const [carpetArea, setCarpetArea] = useState(data.carpetArea || '');
  const [builtArea, setBuiltArea] = useState(data.builtArea || '');
  const [superBuiltArea, setSuperBuiltArea] = useState(data.superBuiltArea || '');
  const [areaUnit, setAreaUnit] = useState(data.areaUnit || 'sqft');
  const [parking, setParking] = useState(data.parking || '');
  const [status, setStatus] = useState(data.status || '');
  const [possession, setPossession] = useState(data.possession || '');

  const facingOptions = ['East', 'West', 'North', 'South', 'North-East', 'North-West', 'South-East', 'South-West'];

  const handleContinue = () => {
    const payload = { propertySubtype };

    if (propertySubtype === 'Plot / Land') {
      Object.assign(payload, { plotArea, plotAreaUnit, length, breadth, facing });
    } else {
      Object.assign(payload, {
        bedrooms,
        bathrooms,
        balconies,
        carpetArea,
        builtArea,
        superBuiltArea,
        areaUnit,
        parking,
        status,
        possession,
      });
    }

    updateData(payload);
    onNext();
  };

  return (
    <div className="space-y-8">
      <div>
        <h2 className="font-serif text-3xl font-bold text-blue-900 mb-2">
          Property Profile
        </h2>
        <p className="font-roboto text-gray-600">
          Tell us more about your property specifications
        </p>
      </div>

      {/* Conditional Rendering */}
      {propertySubtype === 'Plot / Land' ? (
        // ===== Plot / Land Fields =====
        <div className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block font-roboto text-sm font-medium text-gray-700 mb-2">
                Plot Area
              </label>
              <input
                type="number"
                value={plotArea}
                onChange={(e) => setPlotArea(e.target.value)}
                placeholder="Enter area"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
              />
            </div>
            <div>
              <label className="block font-roboto text-sm font-medium text-gray-700 mb-2">
                Unit
              </label>
              <select
                value={plotAreaUnit}
                onChange={(e) => setPlotAreaUnit(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-white focus:ring-2 focus:ring-orange-500"
              >
                <option value="sq yards">Sq Yards</option>
                <option value="sq ft">Sq Ft</option>
                <option value="sq meters">Sq Meters</option>
                <option value="acres">Acres</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block font-roboto text-sm font-medium text-gray-700 mb-2">Length (ft)</label>
              <input
                type="number"
                value={length}
                onChange={(e) => setLength(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
              />
            </div>
            <div>
              <label className="block font-roboto text-sm font-medium text-gray-700 mb-2">Breadth (ft)</label>
              <input
                type="number"
                value={breadth}
                onChange={(e) => setBreadth(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
              />
            </div>
          </div>

          <div>
            <label className="block font-roboto text-sm font-medium text-gray-700 mb-3">Facing</label>
            <div className="flex flex-wrap gap-3">
              {facingOptions.map((option) => (
                <button
                  key={option}
                  onClick={() => setFacing(option)}
                  className={`px-5 py-2.5 rounded-full border-2 font-roboto transition-all ${
                    facing === option
                      ? 'bg-orange-500 border-orange-500 text-white'
                      : 'bg-white border-gray-300 text-gray-700 hover:border-orange-300'
                  }`}
                >
                  {option}
                </button>
              ))}
            </div>
          </div>
        </div>
      ) : (
        // ===== Apartment / Villa / Other Fields =====
        <div className="space-y-6">
          {/* Bedrooms, Bathrooms, Balconies */}
          <div>
            <label className="block font-medium text-gray-700 mb-2">Bedrooms</label>
            <div className="flex flex-wrap gap-3">
              {[1, 2, 3, 4, 5].map((num) => (
                <button
                  key={num}
                  onClick={() => setBedrooms(num)}
                  className={`px-4 py-2 rounded-full border-2 ${
                    bedrooms === num ? 'bg-orange-500 text-white border-orange-500' : 'border-gray-300'
                  }`}
                >
                  {num} BHK
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block font-medium text-gray-700 mb-2">Bathrooms</label>
            <div className="flex flex-wrap gap-3">
              {[1, 2, 3, 4, 5].map((num) => (
                <button
                  key={num}
                  onClick={() => setBathrooms(num)}
                  className={`px-4 py-2 rounded-full border-2 ${
                    bathrooms === num ? 'bg-orange-500 text-white border-orange-500' : 'border-gray-300'
                  }`}
                >
                  {num}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block font-medium text-gray-700 mb-2">Balconies</label>
            <div className="flex flex-wrap gap-3">
              {[0, 1, 2, 3].map((num) => (
                <button
                  key={num}
                  onClick={() => setBalconies(num)}
                  className={`px-4 py-2 rounded-full border-2 ${
                    balconies === num ? 'bg-orange-500 text-white border-orange-500' : 'border-gray-300'
                  }`}
                >
                  {num}
                </button>
              ))}
            </div>
          </div>

          {/* Area details */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Carpet Area</label>
              <input
                type="number"
                value={carpetArea}
                onChange={(e) => setCarpetArea(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-orange-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Built Area</label>
              <input
                type="number"
                value={builtArea}
                onChange={(e) => setBuiltArea(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-orange-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Super Built-up Area</label>
              <input
                type="number"
                value={superBuiltArea}
                onChange={(e) => setSuperBuiltArea(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-orange-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Area Unit</label>
              <select
                value={areaUnit}
                onChange={(e) => setAreaUnit(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 bg-white focus:ring-2 focus:ring-orange-500"
              >
                <option value="sqft">Sq Ft</option>
                <option value="sqyd">Sq Yards</option>
                <option value="sqm">Sq Meters</option>
              </select>
            </div>
          </div>

          {/* Parking */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Parking</label>
            <input
              type="number"
              value={parking}
              onChange={(e) => setParking(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-orange-500"
            />
          </div>

          {/* Status */}
          <div>
            <label className="block font-medium text-gray-700 mb-2">Status</label>
            <div className="flex gap-3">
              {['Ready to Move', 'Under Construction'].map((opt) => (
                <button
                  key={opt}
                  onClick={() => setStatus(opt)}
                  className={`px-5 py-2 rounded-full border-2 ${
                    status === opt ? 'bg-orange-500 text-white border-orange-500' : 'border-gray-300'
                  }`}
                >
                  {opt}
                </button>
              ))}
            </div>
          </div>

          {/* Possession */}
          {status === 'Under Construction' && (
            <div>
              <label className="block font-medium text-gray-700 mb-2">Possession (in months)</label>
              <input
                type="number"
                value={possession}
                onChange={(e) => setPossession(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-orange-500"
              />
            </div>
          )}
        </div>
      )}

      <button
        onClick={handleContinue}
        disabled={propertySubtype === 'Plot / Land' ? !plotArea || !facing : !bedrooms}
        className="bg-blue-900 hover:bg-blue-800 text-white font-roboto font-medium px-10 py-3 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Continue
      </button>
    </div>
  );
};

export default PropertyProfile;
