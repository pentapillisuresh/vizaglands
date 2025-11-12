import React from "react";
import { useNavigate } from "react-router-dom";

const PropertyCategories = ({ categories }) => {
  const navigate = useNavigate();

  const residentialCategories = categories.filter(
    (cat) => cat.catType === "Residential"
  );
  
  const commercialCategories = categories.filter(
    (cat) => cat.catType === "Commercial"
  );

  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="text-center mb-16" data-aos="fade-up">
          <span className="inline-block bg-gradient-to-r from-orange-500 to-red-500 text-white px-6 py-2 rounded-full font-semibold text-sm uppercase tracking-wider shadow-lg">
            Services
          </span>
        </div>

        <h2
          className="text-4xl md:text-5xl font-serif font-bold text-center mb-4 text-gray-900"
          data-aos="fade-up"
          data-aos-delay="100"
        >
          Property Categories
        </h2>
        <p
          className="text-gray-600 text-center mb-16 max-w-2xl mx-auto text-lg leading-relaxed"
          data-aos="fade-up"
          data-aos-delay="200"
        >
          Discover exceptional real estate opportunities crafted for your lifestyle
        </p>

        {/* Residential Section */}
    {/* Residential Section */}
<div className="mb-20">
  {/* <h2
    className="text-3xl font-serif font-bold text-center mb-12 text-gray-800 relative inline-block mx-auto"
    data-aos="fade-up"
  >
    Residential Properties
    <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-20 h-1 bg-gradient-to-r from-orange-500 to-red-500 rounded-full"></span>
  </h2> */}

  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
    {residentialCategories.map((cat, idx) => (
      <article
        key={cat.id}
        data-aos="zoom-in"
        data-aos-delay={100 + idx * 100}
        className="group cursor-pointer flex flex-col h-full"
        onClick={() =>
          navigate("/properties-list", {
            state: {
              categoryId: cat.id,
            },
          })
        }
      >
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden transform transition-all duration-500 group-hover:-translate-y-3 group-hover:shadow-2xl flex flex-col h-full border border-gray-200 hover:border-orange-200">
          {/* Image Container */}
          <div className="relative w-full h-48 flex items-center justify-center bg-gray-50">
            {/* Hover Gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            
            {/* Full Image Visible */}
            <img
              src={cat.photo}
              alt={cat.name}
              className="max-w-full max-h-full object-contain transform transition-all duration-700 group-hover:scale-105 group-hover:rotate-1"
              loading="lazy"
            />

            {/* Hover Overlay */}
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all duration-500 z-20"></div>
          </div>

          {/* Content Section */}
          <div className="px-5 py-4 text-center flex flex-col flex-grow justify-center">
            <h3 className="text-sm font-serif font-bold text-gray-900 group-hover:text-orange-600 transition-colors duration-300">
              {cat.name}
            </h3>
          </div>
        </div>
      </article>
    ))}

    {/* Additional Commercial Card */}
    <article
      data-aos="zoom-in"
      data-aos-delay={100 + residentialCategories.length * 100}
      className="group cursor-pointer flex flex-col h-full"
      onClick={() => navigate("/properties-commertial")}
    >
      <div className="bg-white rounded-2xl shadow-lg overflow-hidden transform transition-all duration-500 group-hover:-translate-y-3 group-hover:shadow-2xl flex flex-col h-full border border-gray-200 hover:border-orange-200">
        {/* Image Container */}
        <div className="relative w-full h-48 flex items-center justify-center bg-gray-50">
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          
          <img
            src="https://backendservice.vmrdaplots.in/uploads/category/commercial.png"
            alt="Commercial"
            className="max-w-full max-h-full object-contain transform transition-all duration-700 group-hover:scale-105 group-hover:rotate-1"
            loading="lazy"
          />

          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all duration-500 z-20"></div>
        </div>

       
        <div className="px-5 py-4 text-center flex flex-col flex-grow justify-center">
          <h3 className="text-sm font-serif font-bold text-gray-900 group-hover:text-orange-600 transition-colors duration-300">
            Commercial
          </h3>
        </div>
      </div>
    </article>
  </div>
</div>

        {/* Footer Section */}
        <div
          className="text-center mt-16"
          data-aos="fade-up"
          data-aos-delay="600"
        >
          {/* <div className="inline-flex items-center justify-center space-x-2 text-gray-600">
            <svg className="w-5 h-5 text-orange-500" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            <p className="text-lg font-medium">
              Curated especially for you
            </p>
          </div> */}
        </div>
      </div>
    </section>
  );
};

export default PropertyCategories;