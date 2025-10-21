import { useState, useEffect } from "react";

const LocationDetails = ({ data, updateData, onNext }) => {
  const [city, setCity] = useState(data.city || "");
  const [locality, setLocality] = useState(data.locality || "");
  const [subLocality, setSubLocality] = useState(data.subLocality || "");
  const [apartmentSociety, setApartmentSociety] = useState(data.apartmentSociety || "");
  const [roadFacing, setRoadFacing] = useState(data.roadFacing || "");

  // ✅ Initial advantages list (two default info fields)
  const [advantages, setAdvantages] = useState(
    data.advantages || [
      { info: "", distance: "250 m" },
      { info: "", distance: "250 m" },
    ]
  );

  // ✅ Normalize subtype safely and check for land-like types
  const subtype = (data.propertySubtype || "").trim().toLowerCase();
  const isLand =
    subtype.includes("land") ||
    subtype.includes("plot") ||
    subtype === "farmhouse";

  useEffect(() => {
    if (isLand) setApartmentSociety("");
  }, [data.propertySubtype, isLand]);

  const handleContinue = () => {
    updateData({
      city,
      locality,
      subLocality,
      apartmentSociety: isLand ? "" : apartmentSociety,
      roadFacing,
      advantages,
    });
    onNext();
  };

  // ✅ Save advantages to parent
  const handleSave = () => {
    updateData({ advantages });
  };

  // ✅ Handle dynamic field change
  const handleAdvantageChange = (index, key, value) => {
    const updated = [...advantages];
    updated[index][key] = value;
    setAdvantages(updated);
  };

  // ✅ Add new info field
  const handleAddMore = () => {
    setAdvantages([...advantages, { info: "", distance: "250 m" }]);
  };

  // ✅ Remove an info field
  const handleRemove = (index) => {
    const updated = advantages.filter((_, i) => i !== index);
    setAdvantages(updated);
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
            City <span className="text-red-500">*</span>
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
            Locality <span className="text-red-500">*</span>
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

        {/* Apartment / Society */}
        {!isLand && (
          <div>
            <label className="block font-roboto text-sm font-medium text-gray-700 mb-2">
              Apartment / Society <span className="text-red-500">*</span>
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

        {/* Road Facing */}
        <div>
          <label className="block font-roboto text-sm font-medium text-gray-700 mb-2">
            Road Facing <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={roadFacing}
            onChange={(e) => setRoadFacing(e.target.value)}
            placeholder="e.g., 100 ft road"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg 
                       focus:ring-2 focus:ring-orange-500 focus:border-transparent 
                       outline-none font-roboto"
          />
        </div>
      </div>

      {/* ✅ Location Advantages Section */}
      <div className="pt-10 border-t border-gray-200">
        <h2 className="font-serif text-2xl font-bold text-blue-900 mb-2">
          Location Advantages
        </h2>
        <p className="font-roboto text-gray-600 mb-6">
          Add key nearby landmarks and distances
        </p>

        {advantages.map((item, index) => (
          <div
            key={index}
            className="flex flex-col sm:flex-row sm:items-center sm:space-x-2 mb-4"
          >
            {/* Info field */}
            <input
              type="text"
              value={item.info}
              onChange={(e) => handleAdvantageChange(index, "info", e.target.value)}
              placeholder="e.g., Near Hospital, Bus Stop, Airport"
              className="flex-1 px-4 py-3 border border-gray-300 rounded-lg 
                         focus:ring-2 focus:ring-orange-500 focus:border-transparent mb-2 sm:mb-0"
            />

            {/* Distance dropdown */}
            <select
              value={item.distance}
              onChange={(e) =>
                handleAdvantageChange(index, "distance", e.target.value)
              }
              className="px-3 py-3 border border-gray-300 rounded-lg text-gray-600 focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            >
              <option>250 m</option>
              <option>500 m</option>
              <option>1 km</option>
              <option>2 km</option>
              <option>5 km</option>
            </select>

            {/* Remove Button */}
            {advantages.length > 2 && (
              <button
                onClick={() => handleRemove(index)}
                className="bg-red-600 hover:bg-red-500 text-white font-medium px-4 py-3 rounded-lg ml-0 sm:ml-2"
              >
                Remove
              </button>
            )}
          </div>
        ))}

        {/* Add More Button */}
        <button
          onClick={handleAddMore}
          className="text-blue-900 font-medium mt-4 border border-blue-900 px-6 py-2 rounded-lg hover:bg-blue-900 hover:text-white transition"
        >
          + Add More
        </button>

        {/* Save Button */}
        <div className="mt-6">
          <button
            onClick={handleSave}
            className="bg-blue-900 hover:bg-blue-800 text-white font-medium px-8 py-3 rounded-lg"
          >
            Save Advantages
          </button>
        </div>
      </div>

      {/* Continue Button */}
      <button
        onClick={handleContinue}
        disabled={!city || !locality || (!isLand && !apartmentSociety) || !roadFacing}
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