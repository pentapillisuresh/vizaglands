import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import HowItWorks from "../components/HowItWorks";


function About() {
  // ✅ Initialize AOS animation library
  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  return (
    <>
   {/* <Header /> */}
    <div className="bg-white">
      {/* Hero Section */}
   <section
  className="relative bg-cover bg-center text-white py-24 overflow-hidden"
  style={{ backgroundImage: "url('https://img.freepik.com/free-photo/luxurious-villa-with-modern-architectural-design_23-2151694107.jpg?t=st=1760297572~exp=1760301172~hmac=d7f761f6693a8d72ac98925d0780371781af0d97feeb6825ccde93f49fdaa1a5&w=1060')" }}
>
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div className="text-center" data-aos="fade-up">
      <h1 className="text-5xl md:text-6xl font-serif font-bold mb-6">
        About Vizaglands
      </h1>
      <p className="font-roboto text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto">
        Your Premier Real Estate Partner in Visakhapatnam
      </p>
    </div>
  </div>
</section>



      {/* Who We Are */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div data-aos="fade-right">
              <h2 className="text-4xl font-serif font-bold text-[#001F3F] mb-6">
                Who We Are
              </h2>
              <p className="font-roboto text-lg text-gray-700 leading-relaxed mb-4">
                Vizaglands is a leading real estate company dedicated to helping
                you find your dream property in Visakhapatnam and surrounding
                areas. With years of experience and deep local market knowledge,
                we specialize in connecting buyers with exceptional properties.
              </p>
              <p className="font-roboto text-lg text-gray-700 leading-relaxed">
                Our team of experienced professionals is committed to providing
                personalized service, expert guidance, and seamless transactions
                for every client.
              </p>
            </div>

            <div data-aos="fade-left">
              <div className="bg-[#FF6B35] rounded-lg p-12 shadow-xl">
                <h3 className="text-3xl font-serif font-bold text-white mb-6">
                  Our Mission
                </h3>
                <p className="font-roboto text-lg text-white leading-relaxed">
                  To deliver exceptional real estate services that exceed
                  expectations, building lasting relationships based on trust,
                  integrity, and outstanding results.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2
            className="text-4xl font-serif font-bold text-[#001F3F] text-center mb-16"
            data-aos="fade-up"
          >
            Why Choose Us
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Card 1 */}
            <div
              className="text-center p-8 rounded-lg hover:shadow-xl transition-shadow duration-300"
              data-aos="fade-up"
              data-aos-delay="100"
            >
              <div className="w-20 h-20 bg-[#001F3F] rounded-full flex items-center justify-center mx-auto mb-6">
                <svg
                  className="w-10 h-10 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h3 className="text-2xl font-serif font-bold text-[#001F3F] mb-4">
                Expert Knowledge
              </h3>
              <p className="font-roboto text-gray-700 leading-relaxed">
                Deep understanding of the Visakhapatnam real estate market with
                years of local expertise.
              </p>
            </div>

            {/* Card 2 */}
            <div
              className="text-center p-8 rounded-lg hover:shadow-xl transition-shadow duration-300"
              data-aos="fade-up"
              data-aos-delay="200"
            >
              <div className="w-20 h-20 bg-[#FF6B35] rounded-full flex items-center justify-center mx-auto mb-6">
                <svg
                  className="w-10 h-10 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                  />
                </svg>
              </div>
              <h3 className="text-2xl font-serif font-bold text-[#001F3F] mb-4">
                Personalized Service
              </h3>
              <p className="font-roboto text-gray-700 leading-relaxed">
                Tailored solutions that match your unique needs, preferences,
                and investment goals.
              </p>
            </div>

            {/* Card 3 */}
            <div
              className="text-center p-8 rounded-lg hover:shadow-xl transition-shadow duration-300"
              data-aos="fade-up"
              data-aos-delay="300"
            >
              <div className="w-20 h-20 bg-[#001F3F] rounded-full flex items-center justify-center mx-auto mb-6">
                <svg
                  className="w-10 h-10 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                  />
                </svg>
              </div>
              <h3 className="text-2xl font-serif font-bold text-[#001F3F] mb-4">
                Quick Process
              </h3>
              <p className="font-roboto text-gray-700 leading-relaxed">
                Streamlined procedures and efficient handling ensure smooth and
                timely transactions.
              </p>
            </div>
          </div>
        </div>
      </section>


    <HowItWorks /> 

      {/* Stats Section */}
      <section className="py-20 bg-[#001F3F] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div data-aos="zoom-in" data-aos-delay="100">
              <h3 className="text-5xl font-serif font-bold text-[#FF6B35] mb-2">
                500+
              </h3>
              <p className="font-roboto text-lg text-gray-300">
                Properties Sold
              </p>
            </div>
            <div data-aos="zoom-in" data-aos-delay="200">
              <h3 className="text-5xl font-serif font-bold text-[#FF6B35] mb-2">
                1000+
              </h3>
              <p className="font-roboto text-lg text-gray-300">Happy Clients</p>
            </div>
            <div data-aos="zoom-in" data-aos-delay="300">
              <h3 className="text-5xl font-serif font-bold text-[#FF6B35] mb-2">
                15+
              </h3>
              <p className="font-roboto text-lg text-gray-300">
                Years Experience
              </p>
            </div>
            <div data-aos="zoom-in" data-aos-delay="400">
              <h3 className="text-5xl font-serif font-bold text-[#FF6B35] mb-2">
                50+
              </h3>
              <p className="font-roboto text-lg text-gray-300">Expert Agents</p>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2
            className="text-4xl font-serif font-bold text-[#001F3F] mb-8"
            data-aos="fade-up"
          >
            Our Values
          </h2>
          <div className="space-y-8">
            <div data-aos="fade-up" data-aos-delay="100">
              <h3 className="text-2xl font-serif font-bold text-[#FF6B35] mb-3">
                Integrity
              </h3>
              <p className="font-roboto text-lg text-gray-700 leading-relaxed">
                We conduct all business with honesty, transparency, and ethical
                practices.
              </p>
            </div>

            <div data-aos="fade-up" data-aos-delay="200">
              <h3 className="text-2xl font-serif font-bold text-[#FF6B35] mb-3">
                Excellence
              </h3>
              <p className="font-roboto text-lg text-gray-700 leading-relaxed">
                We strive for excellence in every transaction and client
                interaction.
              </p>
            </div>

            <div data-aos="fade-up" data-aos-delay="300">
              <h3 className="text-2xl font-serif font-bold text-[#FF6B35] mb-3">
                Commitment
              </h3>
              <p className="font-roboto text-lg text-gray-700 leading-relaxed">
                We are dedicated to achieving your real estate goals and
                exceeding expectations.
              </p>
            </div>
          </div>
        </div>
        
      </section>

    </div>
    {/* <Footer /> */}
     </>
  );
}

export default About;
