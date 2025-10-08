import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const slides = [
  {
    id: 1,
    image:
      "./images/image3.jpg",
    title: "Luxury Homes Await",
    subtitle: "Discover timeless elegance in every corner.",
  },
  {
    id: 2,
    image:
      "./images/image2.jpg",
    title: "Find Your Perfect Villa",
    subtitle: "Experience comfort and beauty like never before.",
  },
  {
    id: 3,
    image:
      "./images/image1.jpg",
    title: "Modern Living Redefined",
    subtitle: "Step into homes designed for luxury and style.",
  },
];

const Hero = () => {
  const [current, setCurrent] = useState(0);

  // Auto-slide every 6 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative h-screen overflow-hidden">
      <AnimatePresence>
        <motion.img
          key={slides[current].id}
          src={slides[current].image}
          alt={slides[current].title}
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 1.05 }}
          transition={{ duration: 1.2, ease: "easeInOut" }}
          className="absolute inset-0 w-full h-full object-cover"
        />
      </AnimatePresence>

      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/80 to-black/40 z-10" />

      {/* Text Content */}
      <div className="absolute inset-0 z-20 flex items-center justify-center text-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={slides[current].id}
            initial={{ opacity: 0, y: -40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 40 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-white px-4"
          >
            <h1 className="text-4xl md:text-6xl font-serif font-bold mb-4 drop-shadow-lg">
              {slides[current].title}
            </h1>
            <p className="text-lg md:text-xl font-light text-gray-200 mb-8">
              {slides[current].subtitle}
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-white text-gray-900 px-6 py-3 rounded-full font-semibold shadow-lg hover:bg-gray-100 transition"
            >
              Explore Now
            </motion.button>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Subtle dots at bottom */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-30 flex space-x-3">
        {slides.map((_, index) => (
          <div
            key={index}
            className={`w-3 h-3 rounded-full transition-all duration-500 ${
              current === index
                ? "bg-white scale-125 shadow-md"
                : "bg-white/40 hover:bg-white/60"
            }`}
          ></div>
        ))}
      </div>
    </div>
  );
};

export default Hero;
