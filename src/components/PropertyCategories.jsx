import React from "react";
import { useNavigate } from "react-router-dom";
import { propertyCategories } from "../data/propertiesData";

const PropertyCategories = ({categories}) => {
  const navigate = useNavigate();

  return (
    <section className="py-20 bg-[#f6f7f9]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-4" data-aos="fade-up">
          <span className="inline-block bg-orange-50 text-orange-600 px-4 py-2 rounded-full font-medium text-sm uppercase tracking-wide">
            Services
          </span>
        </div>

        <h2
          className="text-4xl md:text-5xl font-serif font-extrabold text-center mb-2 text-gray-900"
          data-aos="fade-up"
          data-aos-delay="100"
        >
          Our Property Categories
        </h2>
        <p
          className="text-gray-600 text-center mb-12 max-w-2xl mx-auto"
          data-aos="fade-up"
          data-aos-delay="200"
        >
          Explore a wide range of real estate options tailored to your needs
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
          {categories.map((cat, idx) => (
            <article
              key={cat.id}
              data-aos="zoom-in"
              data-aos-delay={100 + idx * 100}
              className="group cursor-pointer"
              onClick={() => navigate(`/properties/${cat.slug}`)}
            >
              <div className="bg-white rounded-xl shadow-md overflow-hidden transform transition-all duration-400 group-hover:-translate-y-2 group-hover:shadow-2xl">
                <div className="w-full h-34 md:h-44 lg:h-46">
                  <img
                    src={cat.image}
                    alt={cat.name}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>

                <div className="px-5 py-4 text-center">
                  <h3 className="text-lg font-serif font-semibold text-gray-900">
                    {cat.name}
                  </h3>
                  <p className="text-sm text-gray-500 mt-1">({cat.count})</p>
                </div>
              </div>
            </article>
          ))}
        </div>

        <div
          className="text-center mt-12"
          data-aos="fade-up"
          data-aos-delay="600"
        >
          <p className="text-gray-600 mt-4 text-sm">
            Curated especially for you
          </p>
        </div>
      </div>
    </section>
  );
};

export default PropertyCategories;
