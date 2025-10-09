import { useState } from 'react';

const PropertyProfile = ({ data, updateData, onNext }) => {
  const [plotArea, setPlotArea] = useState(data.plotArea || '');
  const [plotAreaUnit, setPlotAreaUnit] = useState(data.plotAreaUnit || 'sq yards');
  const [length, setLength] = useState(data.length || '');
  const [breadth, setBreadth] = useState(data.breadth || '');
  const [facing, setFacing] = useState(data.facing || '');

  const handleContinue = () => {
    updateData({
      plotArea,
      plotAreaUnit,
      length,
      breadth,
      facing,
    });
    onNext();
  };

  const facingOptions = ['East', 'West', 'North', 'South', 'North-East', 'North-West', 'South-East', 'South-West'];

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
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none font-roboto"
            />
          </div>
          <div>
            <label className="block font-roboto text-sm font-medium text-gray-700 mb-2">
              Unit
            </label>
            <select
              value={plotAreaUnit}
              onChange={(e) => setPlotAreaUnit(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none font-roboto bg-white"
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
            <label className="block font-roboto text-sm font-medium text-gray-700 mb-2">
              Length (ft)
            </label>
            <input
              type="number"
              value={length}
              onChange={(e) => setLength(e.target.value)}
              placeholder="Enter length"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none font-roboto"
            />
          </div>
          <div>
            <label className="block font-roboto text-sm font-medium text-gray-700 mb-2">
              Breadth (ft)
            </label>
            <input
              type="number"
              value={breadth}
              onChange={(e) => setBreadth(e.target.value)}
              placeholder="Enter breadth"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none font-roboto"
            />
          </div>
        </div>

        <div>
          <label className="block font-roboto text-sm font-medium text-gray-700 mb-3">
            Facing
          </label>
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

      <button
        onClick={handleContinue}
        disabled={!plotArea || !facing}
        className="bg-blue-700 hover:bg-blue-800 text-white font-roboto font-medium px-10 py-3 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Continue
      </button>
    </div>
  );
};

export default PropertyProfile;
