import { useState, useRef, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { LayoutDashboard, Home, BarChart3, User, LogOut, Users } from "lucide-react";
import BuyFormModal from './BuyFormModal';
import DevelopmentFormModal from './DevelopmentFormModal';

const Header = ({ onGetStartedClick }) => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isVendorMenuOpen, setIsVendorMenuOpen] = useState(false);
  const [isBuyModalOpen, setIsBuyModalOpen] = useState(false);
  const [isDevelopmentModalOpen, setIsDevelopmentModalOpen] = useState(false);
  const searchRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setIsSearchOpen(false);
        setIsMobileMenuOpen(false);
        setIsVendorMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const isActive = (path) => location.pathname === path;

  const handleLogout = () => {
    localStorage.removeItem("vendorToken");
    navigate("/");
  };

  return (
    <div ref={searchRef}>
      <header className="shadow-sm bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            <div className="flex items-center">
              <img src="/images/logo.jpg" alt="Vizaglands Logo" className="h-10 w-auto" />
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-8">
              {[
                { path: "/", label: "Home" },
                { path: "/about", label: "About" },
                { path: "/contact", label: "Contact" },
              ].map(({ path, label }) => (
                <a
                  key={path}
                  href={path}
                  className={`relative font-medium font-roboto transition-colors ${
                    isActive(path)
                      ? "text-orange-500"
                      : "text-gray-700 hover:text-orange-500"
                  }`}
                >
                  {label}
                  {isActive(path) && (
                    <span className="absolute left-0 -bottom-1 w-full h-0.5 bg-orange-500 rounded-full" />
                  )}
                </a>
              ))}
            </nav>

            {/* Desktop Buttons */}
            <div className="hidden lg:flex items-center space-x-3">
              <button
                onClick={() => setIsSearchOpen(!isSearchOpen)}
                className={`${
                  isSearchOpen ? "bg-orange-600" : "bg-orange-500"
                } text-white font-roboto px-5 py-2 rounded-full hover:bg-orange-600 transition-all duration-300 flex items-center space-x-2`}
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
                <span>Property Search</span>
              </button>

              <button
                onClick={() => navigate("/select-user-type")}
                className="bg-orange-100 text-orange-600 font-roboto px-5 py-2 rounded-full hover:bg-orange-200 transition-all duration-300 flex items-center space-x-2 border border-orange-400"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                </svg>
                <span>Sell Property</span>
              </button>

              <button
                onClick={() => setIsBuyModalOpen(true)}
                className="bg-orange-500 text-white font-roboto px-5 py-2 rounded-full hover:bg-orange-600 transition-all duration-300"
              >
                Buy
              </button>

              <button
                onClick={() => setIsDevelopmentModalOpen(true)}
                className="bg-orange-500 text-white font-roboto px-5 py-2 rounded-full hover:bg-orange-600 transition-all duration-300"
              >
                Development
              </button>

              {/* Vendor Dropdown */}
              <div className="relative">
                <button
                  onClick={() => setIsVendorMenuOpen(!isVendorMenuOpen)}
                  className="bg-orange-500 text-white font-roboto px-5 py-2 rounded-full hover:bg-orange-600 transition-all duration-300 flex items-center space-x-2"
                >
                  <User className="w-4 h-4" />
                  <span>Login</span>
                  <svg
                    className={`w-4 h-4 transform transition-transform ${
                      isVendorMenuOpen ? "rotate-180" : ""
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                {isVendorMenuOpen && (
                  <div className="absolute right-0 mt-2 w-56 bg-white shadow-lg rounded-lg border border-gray-200 z-50">
                    <div className="py-2">
                      <button
                        onClick={() => navigate("/vendor/dashboard")}
                        className="w-full text-left px-4 py-2 flex items-center text-gray-700 hover:bg-orange-50 hover:text-orange-600"
                      >
                        <LayoutDashboard className="w-4 h-4 mr-2" /> Dashboard
                      </button>
                      <button
                        onClick={() => navigate("/vendor/manage-listings")}
                        className="w-full text-left px-4 py-2 flex items-center text-gray-700 hover:bg-orange-50 hover:text-orange-600"
                      >
                        <Home className="w-4 h-4 mr-2" /> Manage Listings
                      </button>
                      <button
                        onClick={() => navigate("/vendor/leads")}
                        className="w-full text-left px-4 py-2 flex items-center text-gray-700 hover:bg-orange-50 hover:text-orange-600"
                      >
                        <Users className="w-4 h-4 mr-2" /> Leads
                      </button>
                      <button
                        onClick={() => navigate("/vendor/analytics")}
                        className="w-full text-left px-4 py-2 flex items-center text-gray-700 hover:bg-orange-50 hover:text-orange-600"
                      >
                        <BarChart3 className="w-4 h-4 mr-2" /> Analytics
                      </button>
                      <button
                        onClick={() => navigate("/vendor/profile")}
                        className="w-full text-left px-4 py-2 flex items-center text-gray-700 hover:bg-orange-50 hover:text-orange-600"
                      >
                        <User className="w-4 h-4 mr-2" /> Profile
                      </button>
                      <button
                        onClick={() => navigate("/login-register")}
                        className="w-full text-left px-4 py-2 flex items-center text-orange-600 hover:bg-orange-50"
                      >
                        <User className="w-4 h-4 mr-2" /> Login / Register
                      </button>
                      <hr className="my-1 border-gray-200" />
                      <button
                        onClick={handleLogout}
                        className="w-full text-left px-4 py-2 flex items-center text-red-500 hover:bg-red-50"
                      >
                        <LogOut className="w-4 h-4 mr-2" /> Logout
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Mobile Menu Toggle */}
            <button
              className="lg:hidden text-gray-700"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-gray-50 shadow-md">
          <nav className="flex flex-col space-y-2 p-4">
            {["/", "/about", "/contact"].map((path) => (
              <a
                key={path}
                href={path}
                className={`relative font-medium font-roboto transition-colors py-2 px-4 rounded ${
                  isActive(path) ? "text-orange-500 bg-orange-50" : "text-gray-700 hover:text-orange-500"
                }`}
              >
                {path === "/" ? "Home" : path.substring(1).charAt(0).toUpperCase() + path.substring(2)}
              </a>
            ))}

            <hr className="my-2 border-gray-200" />

            <button
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              className="w-full bg-orange-500 text-white px-4 py-2 rounded-full hover:bg-orange-600 transition-all"
            >
              Property Search
            </button>

            <button
              onClick={() => navigate("/select-user-type")}
              className="w-full bg-orange-100 text-orange-600 px-4 py-2 rounded-full border border-orange-400 hover:bg-orange-200 transition-all"
            >
              Post Property
            </button>

            <button
              onClick={() => setIsBuyModalOpen(true)}
              className="w-full bg-orange-500 text-white px-4 py-2 rounded-full hover:bg-orange-600 transition-all"
            >
              Buy
            </button>

            <button
              onClick={() => setIsDevelopmentModalOpen(true)}
              className="w-full bg-orange-500 text-white px-4 py-2 rounded-full hover:bg-orange-600 transition-all"
            >
              Development
            </button>

            {/* Vendor Menu in Mobile */}
            <div className="relative">
              <button
                onClick={() => setIsVendorMenuOpen(!isVendorMenuOpen)}
                className="w-full bg-orange-500 text-white px-4 py-2 rounded-full hover:bg-orange-600 transition-all flex items-center justify-between"
              >
                <div className="flex items-center space-x-2">
                  <User className="w-4 h-4" />
                  <span>Login</span>
                </div>
                <svg
                  className={`w-4 h-4 transform transition-transform ${
                    isVendorMenuOpen ? "rotate-180" : ""
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {isVendorMenuOpen && (
                <div className="mt-2 w-full bg-white shadow-md rounded-lg border border-gray-200 z-40">
                  <div className="py-2">
                    <button
                      onClick={() => navigate("/vendor/dashboard")}
                      className="w-full text-left px-4 py-2 flex items-center text-gray-700 hover:bg-orange-50 hover:text-orange-600"
                    >
                      <LayoutDashboard className="w-4 h-4 mr-2" /> Dashboard
                    </button>
                    <button
                      onClick={() => navigate("/vendor/manage-listings")}
                      className="w-full text-left px-4 py-2 flex items-center text-gray-700 hover:bg-orange-50 hover:text-orange-600"
                    >
                      <Home className="w-4 h-4 mr-2" /> Manage Listings
                    </button>
                    <button
                      onClick={() => navigate("/vendor/leads")}
                      className="w-full text-left px-4 py-2 flex items-center text-gray-700 hover:bg-orange-50 hover:text-orange-600"
                    >
                      <Users className="w-4 h-4 mr-2" /> Leads
                    </button>
                    <button
                      onClick={() => navigate("/vendor/analytics")}
                      className="w-full text-left px-4 py-2 flex items-center text-gray-700 hover:bg-orange-50 hover:text-orange-600"
                    >
                      <BarChart3 className="w-4 h-4 mr-2" /> Analytics
                    </button>
                    <button
                      onClick={() => navigate("/vendor/profile")}
                      className="w-full text-left px-4 py-2 flex items-center text-gray-700 hover:bg-orange-50 hover:text-orange-600"
                    >
                      <User className="w-4 h-4 mr-2" /> Profile
                    </button>
                    <hr className="my-1 border-gray-200" />
                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-2 flex items-center text-red-500 hover:bg-red-50"
                    >
                      <LogOut className="w-4 h-4 mr-2" /> Logout
                    </button>
                  </div>
                </div>
              )}
            </div>
          </nav>
        </div>
      )}

      {/* Search Bar */}
      {isSearchOpen && (
        <div className="border-t border-gray-300 shadow-lg bg-orange-500 text-white transition-all duration-300">
          <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10 py-8">
            <div className="flex flex-wrap items-end gap-6">
              <div className="flex-1 min-w-[240px]">
                <label className="flex items-center text-sm font-medium text-white mb-2">
                  <svg className="w-5 h-5 text-white mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M17.657 16.657L13.414 20.9a2 2 0 01-2.828 0l-4.243-4.243a8 8 0 1111.314 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                  Location
                </label>
                <input
                  type="text"
                  placeholder="Enter city, neighborhood, or address..."
                  className="w-full border border-gray-200 rounded-lg px-4 py-3 bg-white text-gray-800 focus:ring-2 focus:ring-orange-700 outline-none"
                />
              </div>

              <div className="w-64 min-w-[200px]">
                <label className="block text-sm font-medium text-white mb-2">Property Type</label>
                <select className="w-full border border-gray-200 rounded-lg px-4 py-3 bg-white text-gray-800 focus:ring-2 focus:ring-orange-700 outline-none">
                  <option>All Types</option>
                  <option>Apartment</option>
                  <option>Villa</option>
                  <option>Plot</option>
                  <option>Commercial</option>
                </select>
              </div>

              <div className="w-64 min-w-[200px]">
                <label className="block text-sm font-medium text-white mb-2">Price Range</label>
                <select className="w-full border border-gray-200 rounded-lg px-4 py-3 bg-white text-gray-800 focus:ring-2 focus:ring-orange-700 outline-none">
                  <option>Any Price</option>
                  <option>Below ₹25L</option>
                  <option>₹25L - ₹50L</option>
                  <option>₹50L - ₹1Cr</option>
                  <option>Above ₹1Cr</option>
                </select>
              </div>

              <button className="bg-white hover:bg-gray-100 text-orange-600 px-7 py-2.5 rounded-full flex items-center justify-center transition-colors font-semibold">
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
                Search
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modals */}
      <BuyFormModal
        isOpen={isBuyModalOpen}
        onClose={() => setIsBuyModalOpen(false)}
      />
      <DevelopmentFormModal
        isOpen={isDevelopmentModalOpen}
        onClose={() => setIsDevelopmentModalOpen(false)}
      />
    </div>
  );
};

export default Header;
