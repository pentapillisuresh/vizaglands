import { useState, useEffect } from "react";

const LocationDetails = ({ data, updateData, onNext }) => {
  const [city, setCity] = useState(data.address?.city || "");
  const [locality, setLocality] = useState(data.address?.locality || "");
  const [subLocality, setSubLocality] = useState(data.address?.subLocality || "");
  const [apartmentDoorNo, setApartmentDoorNo] = useState(data.address?.apartmentDoorNo || "");
  const [nearby, setNearby] = useState(data.address?.nearby || "");
  const [landmark, setLandmark] = useState(data.address?.landmark || "");
  const [pincode, setPincode] = useState(data.address?.pincode || "");

  // ✅ Normalize subtype safely and check for land-like types
  const subtype = (data.propertySubtype || "").trim().toLowerCase();
  const isLand =
    subtype.includes("land") ||
    subtype.includes("plot") ||
    subtype === "farmhouse";

  // If land, no apartmentDoorNo is required
  useEffect(() => {
    if (isLand) setApartmentDoorNo("");
  }, [isLand]);

  const handleContinue = () => {
    updateData({
      address: {
        city,
        locality,
        subLocality,
        apartmentDoorNo: isLand ? "" : apartmentDoorNo,
        nearby,
        landmark,
        pincode,
      },
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
            placeholder="e.g., Madhurawada"
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
            placeholder="e.g., Sector 5"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg 
                       focus:ring-2 focus:ring-orange-500 focus:border-transparent 
                       outline-none font-roboto"
          />
        </div>

        {/* Apartment / Door No */}
        {!isLand && (
          <div>
            <label className="block font-roboto text-sm font-medium text-gray-700 mb-2">
              Apartment / Door No
            </label>
            <input
              type="text"
              value={apartmentDoorNo}
              onChange={(e) => setApartmentDoorNo(e.target.value)}
              placeholder="e.g., D-201 or Flat No. 3B"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg 
                         focus:ring-2 focus:ring-orange-500 focus:border-transparent 
                         outline-none font-roboto"
            />
          </div>
        )}

        {/* Nearby */}
        <div>
          <label className="block font-roboto text-sm font-medium text-gray-700 mb-2">
            Nearby (Optional)
          </label>
          <input
            type="text"
            value={nearby}
            onChange={(e) => setNearby(e.target.value)}
            placeholder="e.g., Near Beach Road"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg 
                       focus:ring-2 focus:ring-orange-500 focus:border-transparent 
                       outline-none font-roboto"
          />
        </div>

        {/* Landmark */}
        <div>
          <label className="block font-roboto text-sm font-medium text-gray-700 mb-2">
            Landmark (Optional)
          </label>
          <input
            type="text"
            value={landmark}
            onChange={(e) => setLandmark(e.target.value)}
            placeholder="e.g., Opposite Mall"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg 
                       focus:ring-2 focus:ring-orange-500 focus:border-transparent 
                       outline-none font-roboto"
          />
        </div>

        {/* Pincode */}
        <div>
          <label className="block font-roboto text-sm font-medium text-gray-700 mb-2">
            Pincode <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={pincode}
            onChange={(e) => setPincode(e.target.value)}
            placeholder="e.g., 530048"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg 
                       focus:ring-2 focus:ring-orange-500 focus:border-transparent 
                       outline-none font-roboto"
          />
        </div>
      </div>

      {/* Continue Button */}
      <div className="pt-8">
        <button
          onClick={handleContinue}
          disabled={!city || !locality || !pincode}
          className="bg-blue-900 hover:bg-blue-800 text-white font-roboto font-medium 
                     px-10 py-3 rounded-lg transition-colors 
                     disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Continue
        </button>
      </div>
    </div>
  );
};

export default LocationDetails;