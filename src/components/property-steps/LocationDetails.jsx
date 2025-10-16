import { useState, useEffect } from "react";

const LocationDetails = ({ data, updateData, onNext }) => {
  const [city, setCity] = useState(data.city || "");
  const [locality, setLocality] = useState(data.locality || "");
  const [subLocality, setSubLocality] = useState(data.subLocality || "");
  const [apartmentSociety, setApartmentSociety] = useState(data.apartmentSociety || "");
  const [roadFacing, setRoadFacing] = useState(data.roadFacing || "");

  // ✅ Location Advantages state
  const [advantages, setAdvantages] = useState(
    data.advantages || {
      metro: "",
      school: "",
      hospital: "",
      market: "",
      landmark: "",
    }
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
      advantages, // ✅ include new data
    });
    onNext();
  };

  // ✅ Handle saving for each field
  const handleSave = (key) => {
    updateData({ advantages: { ...advantages } });
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

        {/* Apartment / Society */}
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

        {/* Road Facing */}
        <div>
          <label className="block font-roboto text-sm font-medium text-gray-700 mb-2">
            Road Facing (Optional)
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

      {/* ✅ New Section: Location Advantages */}
      <div className="pt-10 border-t border-gray-200">
        <h2 className="font-serif text-2xl font-bold text-blue-900 mb-2">
          Location Advantages
        </h2>
        <p className="font-roboto text-gray-600 mb-6">
          Highlight the nearby landmarks
        </p>

        {/* Metro */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-2 mb-4">
          <input
            type="text"
            value={advantages.metro}
            onChange={(e) => setAdvantages({ ...advantages, metro: e.target.value })}
            placeholder="Add the name of Metro"
            className="flex-1 px-4 py-3 border border-gray-300 rounded-lg 
                       focus:ring-2 focus:ring-orange-500 focus:border-transparent mb-2 sm:mb-0"
          />
          <select className="px-3 py-3 border border-gray-300 rounded-lg text-gray-600 focus:ring-2 focus:ring-orange-500 focus:border-transparent">
            <option>Nearby</option>
            <option>Within 1 km</option>
            <option>Within 5 km</option>
          </select>
          <button
            onClick={() => handleSave("metro")}
            className="bg-blue-900 hover:bg-blue-800 text-white font-medium px-5 py-3 rounded-lg ml-0 sm:ml-2"
          >
            Save
          </button>
        </div>

        {/* School */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-2 mb-4">
          <input
            type="text"
            value={advantages.school}
            onChange={(e) => setAdvantages({ ...advantages, school: e.target.value })}
            placeholder="Add the name of School"
            className="flex-1 px-4 py-3 border border-gray-300 rounded-lg 
                       focus:ring-2 focus:ring-orange-500 focus:border-transparent mb-2 sm:mb-0"
          />
          <select className="px-3 py-3 border border-gray-300 rounded-lg text-gray-600 focus:ring-2 focus:ring-orange-500 focus:border-transparent">
            <option>Nearby</option>
            <option>Within 1 km</option>
            <option>Within 5 km</option>
          </select>
          <button
            onClick={() => handleSave("school")}
            className="bg-blue-900 hover:bg-blue-800 text-white font-medium px-5 py-3 rounded-lg ml-0 sm:ml-2"
          >
            Save
          </button>
        </div>

        {/* Hospital */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-2 mb-4">
          <input
            type="text"
            value={advantages.hospital}
            onChange={(e) => setAdvantages({ ...advantages, hospital: e.target.value })}
            placeholder="Add the name of Hospital"
            className="flex-1 px-4 py-3 border border-gray-300 rounded-lg 
                       focus:ring-2 focus:ring-orange-500 focus:border-transparent mb-2 sm:mb-0"
          />
          <select className="px-3 py-3 border border-gray-300 rounded-lg text-gray-600 focus:ring-2 focus:ring-orange-500 focus:border-transparent">
            <option>Nearby</option>
            <option>Within 1 km</option>
            <option>Within 5 km</option>
          </select>
          <button
            onClick={() => handleSave("hospital")}
            className="bg-blue-900 hover:bg-blue-800 text-white font-medium px-5 py-3 rounded-lg ml-0 sm:ml-2"
          >
            Save
          </button>
        </div>

        {/* Market */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-2 mb-4">
          <input
            type="text"
            value={advantages.market}
            onChange={(e) => setAdvantages({ ...advantages, market: e.target.value })}
            placeholder="Add the name of Market"
            className="flex-1 px-4 py-3 border border-gray-300 rounded-lg 
                       focus:ring-2 focus:ring-orange-500 focus:border-transparent mb-2 sm:mb-0"
          />
          <select className="px-3 py-3 border border-gray-300 rounded-lg text-gray-600 focus:ring-2 focus:ring-orange-500 focus:border-transparent">
            <option>Nearby</option>
            <option>Within 1 km</option>
            <option>Within 5 km</option>
          </select>
          <button
            onClick={() => handleSave("market")}
            className="bg-blue-900 hover:bg-blue-800 text-white font-medium px-5 py-3 rounded-lg ml-0 sm:ml-2"
          >
            Save
          </button>
        </div>

        {/* Landmark */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-2 mb-4">
          <input
            type="text"
            value={advantages.landmark}
            onChange={(e) => setAdvantages({ ...advantages, landmark: e.target.value })}
            placeholder="Add the name of the Landmark"
            className="flex-1 px-4 py-3 border border-gray-300 rounded-lg 
                       focus:ring-2 focus:ring-orange-500 focus:border-transparent mb-2 sm:mb-0"
          />
          <select className="px-3 py-3 border border-gray-300 rounded-lg text-gray-600 focus:ring-2 focus:ring-orange-500 focus:border-transparent">
            <option>Nearby</option>
            <option>Within 1 km</option>
            <option>Within 5 km</option>
          </select>
          <button
            onClick={() => handleSave("landmark")}
            className="bg-blue-900 hover:bg-blue-800 text-white font-medium px-5 py-3 rounded-lg ml-0 sm:ml-2"
          >
            Save
          </button>
        </div>
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
