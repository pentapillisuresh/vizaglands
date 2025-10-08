import { useState, useRef, useEffect } from "react";

const Header = () => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const searchRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setIsSearchOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={searchRef}>
      <header className="shadow-sm" style={{backgroundColor:"rgb(244, 245, 249)"}}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <div className="flex items-center">
              <div className="flex items-center">
              
                <div>
                  <img src="/images/logo.jpg" alt="Real Estate Logo" className="h-12 w-auto" />
                </div>
              </div>
            </div>

            {/* Desktop Nav */}
            <nav className="hidden lg:flex items-center space-x-8">
              <a href="#home" className="text-orange-500 font-medium hover:text-orange-600 transition-colors">
                Home
              </a>
              <a href="#properties" className="text-gray-700 hover:text-orange-500 transition-colors">
                Properties
              </a>
              <a href="#services" className="text-gray-700 hover:text-orange-500 transition-colors">
                Services
              </a>
              <a href="#about" className="text-gray-700 hover:text-orange-500 transition-colors">
                About
              </a>
              <a href="#contact" className="text-gray-700 hover:text-orange-500 transition-colors">
                Contact
              </a>
            </nav>

            {/* Right Side Buttons */}
            <div className="hidden lg:flex items-center space-x-4">
              <button
                onClick={() => setIsSearchOpen(!isSearchOpen)}
                className="flex items-center space-x-2 text-gray-700 hover:text-orange-500 transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <span>Property Search</span>
              </button>
              <button className="bg-orange-500 text-white px-6 py-2.5 rounded-full hover:bg-orange-600 transition-all duration-300 flex items-center space-x-2">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                <span>Get Started</span>
              </button>
            </div>

            {/* Mobile Menu Button */}
            <button className="lg:hidden text-gray-700">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </header>

      {/* Search Section - Expands Below Header */}
      {isSearchOpen && (
        <div className="border-t border-b border-gray-200 shadow-md" style={{backgroundColor:"rgb(244, 245, 249)"}}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="flex items-end gap-4">
              {/* Location */}
              <div className="flex-1">
                <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                  <svg className="w-5 h-5 text-orange-500 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  Location
                </label>
                <input
                  type="text"
                  placeholder="Enter city, neighborhood, or address..."
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-orange-400 focus:border-transparent outline-none"
                />
              </div>

              {/* Property Type */}
              <div className="w-64">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Property Type
                </label>
                <select className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-orange-400 focus:border-transparent outline-none bg-white">
                  <option>All Types</option>
                  <option>Apartment</option>
                  <option>Villa</option>
                  <option>Plot</option>
                  <option>Commercial</option>
                </select>
              </div>

              {/* Price Range */}
              <div className="w-64">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Price Range
                </label>
                <select className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-orange-400 focus:border-transparent outline-none bg-white">
                  <option>Any Price</option>
                  <option>Below ₹25L</option>
                  <option>₹25L - ₹50L</option>
                  <option>₹50L - ₹1Cr</option>
                  <option>Above ₹1Cr</option>
                </select>
              </div>

              {/* Search Button */}
              <button className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-3 rounded-lg flex items-center justify-center transition-colors">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Header;
