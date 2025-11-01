import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { Home, Users, Handshake } from "lucide-react";
import { useNavigate } from "react-router-dom";

const LocationsSection = ({ cityLocalities }) => {
  const navigate = useNavigate();
  const locations = [
    {
      id: 1,
      name: "Visakhapatnam",
      areas: [
        { name: "MVP Colony", types: ["Flats", "Villas", "Commercial"] },
        { name: "Rushikonda", types: ["Flats", "Lands", "Villas"] },
        { name: "Gajuwaka", types: ["Plots", "Commercial", "Flats"] },
        { name: "Madhurawada", types: ["Flats", "Lands", "Villas"] },
        { name: "Pendurthi", types: ["Plots", "Flats", "Commercial"] },
      ],
    },
    {
      id: 2,
      name: "Vizianagaram",
      areas: [
        { name: "RTC Colony", types: ["Plots", "Flats"] },
        { name: "Nellimarla", types: ["Lands", "Villas"] },
        { name: "Kothapeta", types: ["Flats", "Commercial"] },
        { name: "Balaji Nagar", types: ["Plots", "Flats", "Villas"] },
        { name: "Fort Area", types: ["Commercial", "Flats"] },
      ],
    },
  ];

  useEffect(() => {
    AOS.init({
      duration: 800,
      easing: "ease-out-cubic",
      once: true,
      offset: 100,
    });
  }, []);

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <div
          className="text-center mb-12"
          data-aos="fade-up"
          data-aos-delay="100"
        >
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-gray-900">
            Properties by Locality
          </h2>
          <p className="text-gray-600 mt-2">
            Explore properties in the most popular areas across Vizag &
            Vizianagaram
          </p>
          <div className="w-24 h-1 bg-orange-500 mx-auto mt-4 rounded-full"></div>
        </div>

        {/* Localities */}
        <div
          className="grid grid-cols-1 md:grid-cols-2 gap-12"
          data-aos="fade-up"
          data-aos-delay="200"
        >
          {/* "cityLocalities": [
            {
                "city": "vizag",
                "localities": [
                    "allipuram"
                ]
            }
        ] */}

          {cityLocalities.map((location) => (
            <div key={location.city} className="space-y-4">
              <h3 className="text-xl font-semibold text-gray-900 border-b pb-2">
                {location.city}
              </h3>
              <div className="space-y-4">
                <div className="flex flex-wrap gap-2 text-gray-700 leading-relaxed">
                  {location.localities.map((area, index) => (
                    <React.Fragment key={index}>
                      <span
                        className="hover:text-orange-500 cursor-pointer transition-colors duration-300 text-sm text-gray-600"
                        data-aos="fade-right"
                        data-aos-delay={150 * index}
                        onClick={() =>
                          navigate("/properties-list", {
                            state: {
                              city: location.city,
                              locality: area,
                            },
                          })
                        }
                      >
                        {area}
                      </span>
                      {index < location.localities.length - 1 && (
                        <span className="text-gray-400 mx-2">|</span>
                      )}
                    </React.Fragment>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA Button */}
        <div
          className="text-center mt-16"
          data-aos="zoom-in"
          data-aos-delay="400"
        >
          <button className="bg-orange-500 text-white px-8 py-3 rounded-full font-medium text-sm tracking-wide shadow-md hover:shadow-lg hover:bg-orange-600 transition-all duration-300 transform hover:-translate-y-1">
            Explore All Localities
          </button>
        </div>

        {/* Stats Section */}
        <div
          className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-20"
          data-aos="fade-up"
          data-aos-delay="500"
        >
          {/* Card 1 */}
          <div className="bg-white rounded-lg shadow-md text-center p-8 border border-gray-100 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
            <div
              className="flex justify-center items-center mx-auto w-12 h-12 rounded-full bg-orange-100 mb-4"
              data-aos="zoom-in"
              data-aos-delay="600"
            >
              <Home className="text-orange-500 w-6 h-6" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900">10,000+</h3>
            <p className="text-gray-600 text-sm mt-2">Properties Listed</p>
            <div className="w-10 h-1 bg-orange-500 mx-auto mt-3 rounded-full"></div>
          </div>

          {/* Card 2 */}
          <div className="bg-white rounded-lg shadow-md text-center p-8 border border-gray-100 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
            <div
              className="flex justify-center items-center mx-auto w-12 h-12 rounded-full bg-orange-100 mb-4"
              data-aos="zoom-in"
              data-aos-delay="700"
            >
              <Users className="text-orange-500 w-6 h-6" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900">5,000+</h3>
            <p className="text-gray-600 text-sm mt-2">Happy Clients</p>
            <div className="w-10 h-1 bg-orange-500 mx-auto mt-3 rounded-full"></div>
          </div>

          {/* Card 3 */}
          <div className="bg-white rounded-lg shadow-md text-center p-8 border border-gray-100 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
            <div
              className="flex justify-center items-center mx-auto w-12 h-12 rounded-full bg-orange-100 mb-4"
              data-aos="zoom-in"
              data-aos-delay="800"
            >
              <Handshake className="text-orange-500 w-6 h-6" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900">15,000+</h3>
            <p className="text-gray-600 text-sm mt-2">Successful Deals</p>
            <div className="w-10 h-1 bg-orange-500 mx-auto mt-3 rounded-full"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LocationsSection;
