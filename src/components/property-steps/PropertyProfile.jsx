import { useState } from "react";

const PropertyProfile = ({ data, updateData, onNext }) => {
  const [propertySubtype] = useState(data.propertySubtype || "");

  // Plot / Land fields
  const [plotArea, setPlotArea] = useState(data.plotArea || "");
  const [plotAreaUnit, setPlotAreaUnit] = useState(data.plotAreaUnit || "sq yards");
  const [length, setLength] = useState(data.length || "");
  const [breadth, setBreadth] = useState(data.breadth || "");
  const [facing, setFacing] = useState(data.facing || "");
  const [frontage, setFrontage] = useState(data.frontage || "");
  const [plotNumber, setPlotNumber] = useState(data.plotNumber || "");

  // Apartment / Villa / Other fields
  const [bedrooms, setBedrooms] = useState(data.bedrooms || "");
  const [bathrooms, setBathrooms] = useState(data.bathrooms || "");
  const [balconies, setBalconies] = useState(data.balconies || "");
  const [poojaRoom, setPoojaRoom] = useState(data.poojaRoom || "");
  const [carpetArea, setCarpetArea] = useState(data.carpetArea || "");
  const [builtArea, setBuiltArea] = useState(data.builtArea || "");
  const [superBuiltArea, setSuperBuiltArea] = useState(data.superBuiltArea || "");
  const [areaUnit, setAreaUnit] = useState(data.areaUnit || "sqft");
  const [parking, setParking] = useState(data.parking || "");
  const [status, setStatus] = useState(data.status || "");
  const [possession, setPossession] = useState(data.possession || "");
  const [ageOfProperty, setAgeOfProperty] = useState(data.ageOfProperty || "");
  const [flatNumber, setFlatNumber] = useState(data.flatNumber || "");
  const [officeNumber, setOfficeNumber] = useState(data.officeNumber || "");
  const [shopNumber, setShopNumber] = useState(data.shopNumber || "");
  
  // Floor details
  const [totalFloors, setTotalFloors] = useState(data.totalFloors || "");
  const [propertyOnFloor, setPropertyOnFloor] = useState(data.propertyOnFloor || "");

  // Toggle states for area types
  const [showBuiltArea, setShowBuiltArea] = useState(!!data.builtArea);
  const [showSuperBuiltArea, setShowSuperBuiltArea] = useState(!!data.superBuiltArea);

  const facingOptions = [
    "East",
    "West",
    "North",
    "South",
    "North-East",
    "North-West",
    "South-East",
    "South-West",
  ];

  // Property type checks
  const isPlotOrLand =
    propertySubtype === "Plot" ||
    propertySubtype === "Land" ||
    propertySubtype === "Commercial Land" ||
    propertySubtype === "Warehouse / Godown" ||
    propertySubtype === "Industrial Building";

  const isLand =
    propertySubtype === "Land" ||
    propertySubtype === "Commercial Land" ||
    propertySubtype === "Warehouse / Godown" ||
    propertySubtype === "Industrial Building";

  // Residential properties
  const isFlatOrVilla = 
    propertySubtype === "Flat/Apartment" || 
    propertySubtype === "Independent House / Villa";

  const isFlat = propertySubtype === "Flat/Apartment";
  const isPlot = propertySubtype === "Plot";

  // Commercial properties that need unit number and floor details
  const isOfficeSpace = propertySubtype === "Office Space";
  const isShopShowroom = propertySubtype === "Shop / Showroom";
  
  // Properties that need floor details
  const needsFloorDetails = 
    isFlatOrVilla || 
    isOfficeSpace || 
    isShopShowroom;

  // Properties that need unit number
  const needsUnitNumber = 
    isFlat || 
    isOfficeSpace || 
    isShopShowroom;

  const handleContinue = () => {
    const payload = { propertySubtype };

    if (isPlotOrLand) {
      Object.assign(payload, {
        plotArea,
        plotAreaUnit,
        length,
        breadth,
      });

      if (isLand) {
        payload.frontage = frontage;
      } else {
        payload.facing = facing;
      }

      // Add plot number for Plot type
      if (isPlot) {
        payload.plotNumber = plotNumber;
      }
    } else {
      Object.assign(payload, {
        bedrooms,
        bathrooms,
        balconies,
        poojaRoom,
        carpetArea,
        builtArea: showBuiltArea ? builtArea : "",
        superBuiltArea: showSuperBuiltArea ? superBuiltArea : "",
        areaUnit,
        parking,
        status,
        possession,
        ageOfProperty: status === "Ready to Move" ? ageOfProperty : "",
      });

      // Add unit numbers based on property type
      if (isFlat) {
        payload.flatNumber = flatNumber;
      }
      if (isOfficeSpace) {
        payload.officeNumber = officeNumber;
      }
      if (isShopShowroom) {
        payload.shopNumber = shopNumber;
      }

      // Add floor details for properties that need them
      if (needsFloorDetails) {
        payload.totalFloors = totalFloors;
        payload.propertyOnFloor = propertyOnFloor;
      }
    }

    updateData(payload);
    onNext();
  };

  const allPlotFieldsFilled =
    plotArea && plotAreaUnit && length && breadth && (isLand ? frontage : facing);

  // At least one area type is mandatory
  const hasAtLeastOneArea = carpetArea || builtArea || superBuiltArea;

  // Base validation for residential properties
  const baseResidentialValidation = 
    bedrooms &&
    bathrooms &&
    balconies !== "" &&
    poojaRoom !== "" &&
    hasAtLeastOneArea &&
    areaUnit &&
    parking &&
    status &&
    (status === "Ready to Move" && ageOfProperty ? true : 
     status === "Under Construction" && possession ? true : false);

  // Additional validation for properties with floor details
  const floorDetailsValidation = !needsFloorDetails || (totalFloors && propertyOnFloor);

  // Additional validation for unit numbers
  const unitNumberValidation = 
    !needsUnitNumber || 
    (isFlat && flatNumber) || 
    (isOfficeSpace && officeNumber) || 
    (isShopShowroom && shopNumber);

  const allApartmentFieldsFilled = 
    baseResidentialValidation && 
    floorDetailsValidation && 
    unitNumberValidation;

  const isFormComplete = isPlotOrLand ? allPlotFieldsFilled : allApartmentFieldsFilled;

  // Get appropriate label for unit number
  const getUnitNumberLabel = () => {
    if (isFlat) return "Flat Number";
    if (isOfficeSpace) return "Office Number";
    if (isShopShowroom) return "Shop Number";
    return "Unit Number";
  };

  // Get appropriate placeholder for unit number
  const getUnitNumberPlaceholder = () => {
    if (isFlat) return "Enter flat number";
    if (isOfficeSpace) return "Enter office number";
    if (isShopShowroom) return "Enter shop number";
    return "Enter unit number";
  };

  // Get appropriate value for unit number
  const getUnitNumberValue = () => {
    if (isFlat) return flatNumber;
    if (isOfficeSpace) return officeNumber;
    if (isShopShowroom) return shopNumber;
    return "";
  };

  // Handle unit number change
  const handleUnitNumberChange = (value) => {
    if (isFlat) setFlatNumber(value);
    if (isOfficeSpace) setOfficeNumber(value);
    if (isShopShowroom) setShopNumber(value);
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

      {/* ===== Conditional Rendering ===== */}
      {isPlotOrLand ? (
        // ✅ Plot / Land / Commercial Land / Warehouse / Industrial Building
        <div className="space-y-6">
          {/* Plot Number for Plot type */}
          {isPlot && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Plot Number
              </label>
              <input
                type="text"
                value={plotNumber}
                onChange={(e) => setPlotNumber(e.target.value)}
                placeholder="Enter plot number"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
              />
            </div>
          )}

          {/* Land Area */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Land Area <span className="text-red-500">*</span>
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
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Unit <span className="text-red-500">*</span>
              </label>
              <select
                value={plotAreaUnit}
                onChange={(e) => setPlotAreaUnit(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-white focus:ring-2 focus:ring-orange-500"
              >
                <option value="">Select</option>
                <option value="sq yards">Sq Yards</option>
                <option value="sq ft">Sq Ft</option>
                <option value="sq meters">Sq Meters</option>
                <option value="acres">Acres</option>
                <option value="cents">Cents</option>
              </select>
            </div>
          </div>

          {/* Length & Breadth */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Length (ft) <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                value={length}
                onChange={(e) => setLength(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Breadth (ft) <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                value={breadth}
                onChange={(e) => setBreadth(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
              />
            </div>
          </div>

          {/* Facing / Roadfacing */}
          {!isLand ? (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Facing <span className="text-red-500">*</span>
              </label>
              <div className="flex flex-wrap gap-3">
                {facingOptions.map((option) => (
                  <button
                    key={option}
                    onClick={() => setFacing(option)}
                    className={`px-5 py-2.5 rounded-full border-2 font-roboto transition-all ${
                      facing === option
                        ? "bg-orange-500 border-orange-500 text-white"
                        : "bg-white border-gray-300 text-gray-700 hover:border-orange-300"
                    }`}
                  >
                    {option}
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Roadfacing (in ft) <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                value={frontage}
                onChange={(e) => setFrontage(e.target.value)}
                placeholder="e.g., 100"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
              />
            </div>
          )}
        </div>
      ) : (
        // ✅ Apartment / Villa / Office / Shop etc.
        <div className="space-y-6">
          {/* Unit Number for Flat, Office, Shop */}
          {needsUnitNumber && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {getUnitNumberLabel()}
              </label>
              <input
                type="text"
                value={getUnitNumberValue()}
                onChange={(e) => handleUnitNumberChange(e.target.value)}
                placeholder={getUnitNumberPlaceholder()}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
              />
            </div>
          )}

          {/* Bedrooms - Only for residential properties */}
          {(isFlatOrVilla || propertySubtype === "Farmhouse") && (
            <div>
              <label className="block font-medium text-gray-700 mb-2">
                Bedrooms <span className="text-red-500">*</span>
              </label>
              <div className="flex flex-wrap gap-3">
                {[1, 2, 3, 4, 5].map((num) => (
                  <button
                    key={num}
                    onClick={() => setBedrooms(num)}
                    className={`px-4 py-2 rounded-full border-2 ${
                      bedrooms === num
                        ? "bg-orange-500 text-white border-orange-500"
                        : "border-gray-300"
                    }`}
                  >
                    {num} BHK
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Bathrooms - Only for residential properties */}
          {(isFlatOrVilla || propertySubtype === "Farmhouse") && (
            <div>
              <label className="block font-medium text-gray-700 mb-2">
                Bathrooms <span className="text-red-500">*</span>
              </label>
              <div className="flex flex-wrap gap-3">
                {[1, 2, 3, 4, 5].map((num) => (
                  <button
                    key={num}
                    onClick={() => setBathrooms(num)}
                    className={`px-4 py-2 rounded-full border-2 ${
                      bathrooms === num
                        ? "bg-orange-500 text-white border-orange-500"
                        : "border-gray-300"
                    }`}
                  >
                    {num}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Balconies - Only for residential properties */}
          {(isFlatOrVilla || propertySubtype === "Farmhouse") && (
            <div>
              <label className="block font-medium text-gray-700 mb-2">
                Balconies <span className="text-red-500">*</span>
              </label>
              <div className="flex flex-wrap gap-3">
                {[0, 1, 2, 3].map((num) => (
                  <button
                    key={num}
                    onClick={() => setBalconies(num)}
                    className={`px-4 py-2 rounded-full border-2 ${
                      balconies === num
                        ? "bg-orange-500 text-white border-orange-500"
                        : "border-gray-300"
                    }`}
                  >
                    {num}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Pooja Room - Only for residential properties */}
          {(isFlatOrVilla || propertySubtype === "Farmhouse") && (
            <div>
              <label className="block font-medium text-gray-700 mb-2">
                Pooja Room <span className="text-red-500">*</span>
              </label>
              <div className="flex gap-3">
                {["Yes", "No"].map((option) => (
                  <button
                    key={option}
                    onClick={() => setPoojaRoom(option)}
                    className={`px-5 py-2 rounded-full border-2 ${
                      poojaRoom === option
                        ? "bg-orange-500 text-white border-orange-500"
                        : "border-gray-300"
                    }`}
                  >
                    {option}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Area Details Section */}
          <div className="space-y-6 pt-4 border-t border-gray-200">
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Add Area Details</h3>
              <p className="text-sm text-gray-600 mb-4">At least one area type is mandatory</p>
              
              {/* Carpet Area */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Carpet Area <span className="text-red-500">*</span>
                </label>
                <div className="grid grid-cols-2 gap-4">
                  <input
                    type="number"
                    value={carpetArea}
                    onChange={(e) => setCarpetArea(e.target.value)}
                    placeholder="Enter area"
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-orange-500"
                  />
                  <select
                    value={areaUnit}
                    onChange={(e) => setAreaUnit(e.target.value)}
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 bg-white focus:ring-2 focus:ring-orange-500"
                  >
                    <option value="sqft">sq.ft.</option>
                    <option value="sqyd">sq.yd.</option>
                    <option value="sqm">sq.m.</option>
                  </select>
                </div>
              </div>

              {/* Add Area Buttons */}
              <div className="flex flex-wrap gap-3 mb-6">
                {!showBuiltArea && (
                  <button
                    onClick={() => setShowBuiltArea(true)}
                    className="px-4 py-2 border-2 border-dashed border-orange-500 text-orange-500 rounded-lg font-medium hover:bg-orange-50 transition-colors"
                  >
                    + Add Built-up Area
                  </button>
                )}
                {!showSuperBuiltArea && (
                  <button
                    onClick={() => setShowSuperBuiltArea(true)}
                    className="px-4 py-2 border-2 border-dashed border-orange-500 text-orange-500 rounded-lg font-medium hover:bg-orange-50 transition-colors"
                  >
                    + Add Super Built-up Area
                  </button>
                )}
              </div>

              {/* Built-up Area (Conditional) */}
              {showBuiltArea && (
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Built-up Area
                  </label>
                  <div className="grid grid-cols-2 gap-4">
                    <input
                      type="number"
                      value={builtArea}
                      onChange={(e) => setBuiltArea(e.target.value)}
                      placeholder="Enter area"
                      className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-orange-500"
                    />
                    <div className="flex items-center">
                      <span className="text-gray-600">{areaUnit}</span>
                      <button
                        onClick={() => {
                          setShowBuiltArea(false);
                          setBuiltArea("");
                        }}
                        className="ml-4 text-red-500 hover:text-red-700 font-medium"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* Super Built-up Area (Conditional) */}
              {showSuperBuiltArea && (
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Super Built-up Area
                  </label>
                  <div className="grid grid-cols-2 gap-4">
                    <input
                      type="number"
                      value={superBuiltArea}
                      onChange={(e) => setSuperBuiltArea(e.target.value)}
                      placeholder="Enter area"
                      className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-orange-500"
                    />
                    <div className="flex items-center">
                      <span className="text-gray-600">{areaUnit}</span>
                      <button
                        onClick={() => {
                          setShowSuperBuiltArea(false);
                          setSuperBuiltArea("");
                        }}
                        className="ml-4 text-red-500 hover:text-red-700 font-medium"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Floor Details for Flat/Apartment, Villa, Office, Shop */}
          {needsFloorDetails && (
            <div className="space-y-4 pt-4 border-t border-gray-200">
              <h3 className="text-lg font-semibold text-gray-800">Floor Details</h3>
              <p className="text-sm text-gray-600">Total no of floors and your floor details</p>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Total Floors <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="number"
                    value={totalFloors}
                    onChange={(e) => setTotalFloors(e.target.value)}
                    placeholder="Enter total floors"
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-orange-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Property on Floor <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="number"
                    value={propertyOnFloor}
                    onChange={(e) => setPropertyOnFloor(e.target.value)}
                    placeholder="Enter floor number"
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-orange-500"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Parking */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Parking <span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              value={parking}
              onChange={(e) => setParking(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-orange-500"
            />
          </div>

          {/* Status */}
          <div>
            <label className="block font-medium text-gray-700 mb-2">
              Availability Status <span className="text-red-500">*</span>
            </label>
            <div className="flex gap-3">
              {["Ready to Move", "Under Construction"].map((opt) => (
                <button
                  key={opt}
                  onClick={() => setStatus(opt)}
                  className={`px-5 py-2 rounded-full border-2 ${
                    status === opt
                      ? "bg-orange-500 text-white border-orange-500"
                      : "border-gray-300"
                  }`}
                >
                  {opt}
                </button>
              ))}
            </div>
          </div>

          {/* Age of Property (for Ready to Move) */}
          {status === "Ready to Move" && (
            <div>
              <label className="block font-medium text-gray-700 mb-2">
                Age of Property (in years) <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                value={ageOfProperty}
                onChange={(e) => setAgeOfProperty(e.target.value)}
                placeholder="Enter age in years"
                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-orange-500"
              />
            </div>
          )}

          {/* Possession (for Under Construction) */}
          {status === "Under Construction" && (
            <div>
              <label className="block font-medium text-gray-700 mb-2">
                Possession (in months) <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                value={possession}
                onChange={(e) => setPossession(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-orange-500"
              />
            </div>
          )}
        </div>
      )}

      {/* Continue Button */}
      <button
        onClick={handleContinue}
        disabled={!isFormComplete}
        className={`bg-blue-900 hover:bg-blue-800 text-white font-roboto font-medium px-10 py-3 rounded-lg transition-colors ${
          !isFormComplete ? "opacity-50 cursor-not-allowed" : ""
        }`}
      >
        Continue
      </button>
    </div>
  );
};

export default PropertyProfile;