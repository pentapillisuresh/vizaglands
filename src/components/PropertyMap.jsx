import React, { useState, useEffect } from "react";
import { Map, Marker } from "pigeon-maps";

export default function PropertyMap({ pin }) {
  const [coords, setCoords] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (pin) {
      fetchCoordinates(pin);
    }
  }, [pin]);

  const fetchCoordinates = async (pincode) => {
    setLoading(true);
    setCoords(null);
console.log("pincode:::",pincode);
    try {
      // Step 1: Fetch location info from Indian Postal API
      const res = await fetch(`https://api.postalpincode.in/pincode/${pincode}`);
      const json = await res.json();

      const postOffice = json[0]?.PostOffice?.[0];

      if (!postOffice) {
        alert("Invalid pincode or no post office found.");
        setLoading(false);
        return;
      }
      const locationQuery = `${postOffice.Name}, ${postOffice.District}, ${postOffice.State}, India`;
      // Step 2: Fetch coordinates from OpenStreetMap (Nominatim)
      const geoRes = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
          locationQuery
        )}`
      );
      const geoJson = await geoRes.json();
      console.log("geoJson:::",geoJson[0].lat);
      console.log("geoJson:::",geoJson[0].lon);
      if (geoJson && geoJson.length > 0) {
        const location = geoJson[0];
        setCoords({
          lat: parseFloat(location.lat),
          lng: parseFloat(location.lon),
        });
      } else {
        alert("Coordinates not found for this location.");
      }
      console.log("coords:::",coords);
    } catch (error) {
      console.error("Error fetching location:", error);
      alert("Failed to fetch coordinates.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ width: "100%", height: "400px", position: "relative" }}>
      {loading && (
        <p style={{ position: "absolute", top: 10, left: 10, zIndex: 10, background: "white", padding: "5px" }}>
          Loading map...
        </p>
      )}

      <Map
        height={400}
        defaultCenter={[17.6868, 83.2185]} // fallback center (Visakhapatnam)
        center={coords ? [coords.lat, coords.lng] : [17.6868, 83.2185]}
        defaultZoom={12}
      >
        {coords && <Marker width={50} anchor={[coords.lat, coords.lng]} />}
      </Map>
    </div>
  );
}
