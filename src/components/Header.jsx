import { useState, useRef, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { LayoutDashboard, Home, BarChart3, User, LogOut } from "lucide-react";

const Header = ({ onGetStartedClick }) => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isVendorMenuOpen, setIsVendorMenuOpen] = useState(false);
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
      {/* HEADER */}
      <header className="shadow-sm bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* LOGO */}
            <div className="flex items-center">
              <img src="images/logo.jpg" alt="Vizaglands Logo" className="h-10 w-auto" />
            </div>

            {/* DESKTOP NAVIGATION */}
            <nav className="hidden lg:flex items-center space-x-8">
              <a
                href="/"
                className={`relative font-medium font-roboto transition-colors ${
                  isActive("/") ? "text-orange-500" : "text-gray-700 hover:text-orange-500"
                }`}
              >
                Home
                {isActive("/") && (
                  <span className="absolute left-0 -bottom-1 w-full h-0.5 bg-orange-500 rounded-full" />
                )}
              </a>
              <a
                href="/about"
                className={`relative font-medium font-roboto transition-colors ${
                  isActive("/about") ? "text-orange-500" : "text-gray-700 hover:text-orange-500"
                }`}
              >
                About
                {isActive("/about") && (
                  <span className="absolute left-0 -bottom-1 w-full h-0.5 bg-orange-500 rounded-full" />
                )}
              </a>
              <a
                href="/contact"
                className={`relative font-medium font-roboto transition-colors ${
                  isActive("/contact") ? "text-orange-500" : "text-gray-700 hover:text-orange-500"
                }`}
              >
                Contact
                {isActive("/contact") && (
                  <span className="absolute left-0 -bottom-1 w-full h-0.5 bg-orange-500 rounded-full" />
                )}
              </a>
            </nav>

            {/* DESKTOP ACTION BUTTONS */}
            <div className="hidden lg:flex items-center space-x-4">
              {/* Property Search Button */}
              <button
                onClick={() => setIsSearchOpen(!isSearchOpen)}
                className={`${
                  isSearchOpen ? "bg-orange-600" : "bg-orange-500"
                } text-white font-roboto px-6 py-2.5 rounded-full hover:bg-orange-600 transition-all duration-300 flex items-center space-x-2`}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
                <span>Property Search</span>
              </button>

              {/* Post Property Button */}
              <button
                onClick={() => navigate("/select-user-type")}
                className="bg-orange-100 text-orange-600 font-roboto px-6 py-2.5 rounded-full hover:bg-orange-200 transition-all duration-300 flex items-center space-x-2 border border-orange-400"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                </svg>
                <span>Post Property</span>
              </button>

              {/* Vendor Dropdown Menu */}
              <div className="relative">
                <button
                  onClick={() => setIsVendorMenuOpen(!isVendorMenuOpen)}
                  className="bg-orange-500 text-white font-roboto px-6 py-2.5 rounded-full hover:bg-orange-600 transition-all duration-300 flex items-center space-x-2"
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
                        className="w-full text-left px-4 py-2 flex items-center space-x-2 text-gray-700 hover:bg-orange-50 hover:text-orange-600"
                      >
                        <LayoutDashboard className="w-4 h-4" />
                        <span>Dashboard</span>
                      </button>
                      <button
                        onClick={() => navigate("/vendor/manage-listings")}
                        className="w-full text-left px-4 py-2 flex items-center space-x-2 text-gray-700 hover:bg-orange-50 hover:text-orange-600"
                      >
                        <Home className="w-4 h-4" />
                        <span>Manage Listings</span>
                      </button>
                      <button
                        onClick={() => navigate("/vendor/analytics")}
                        className="w-full text-left px-4 py-2 flex items-center space-x-2 text-gray-700 hover:bg-orange-50 hover:text-orange-600"
                      >
                        <BarChart3 className="w-4 h-4" />
                        <span>Analytics</span>
                      </button>
                      <button
                        onClick={() => navigate("/vendor/profile")}
                        className="w-full text-left px-4 py-2 flex items-center space-x-2 text-gray-700 hover:bg-orange-50 hover:text-orange-600"
                      >
                        <User className="w-4 h-4" />
                        <span>Profile</span>
                      </button>

                      {/* Login/Register Button with same orange style */}
                      <button
                        onClick={() => navigate("/login-register")}
                        className="w-full text-left px-4 py-2 flex items-center space-x-2 text-orange-600 hover:bg-orange-50"
                      >
                        <User className="w-4 h-4" />
                        <span>Login / Register</span>
                      </button>

                      <hr className="my-1 border-gray-200" />
                      <button
                        onClick={handleLogout}
                        className="w-full text-left px-4 py-2 flex items-center space-x-2 text-red-500 hover:bg-red-50"
                      >
                        <LogOut className="w-4 h-4" />
                        <span>Logout</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* MOBILE MENU ICON */}
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

      {/* MOBILE MENU */}
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
          </nav>
        </div>
      )}

      {/* PROPERTY SEARCH DROPDOWN */}
      {isSearchOpen && (
        <div className="border-t border-gray-300 shadow-lg bg-orange-500 text-white transition-all duration-300">
          <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10 py-8">
            <div className="flex flex-wrap items-end gap-6">
              {/* Location Input */}
              <div className="flex-1 min-w-[240px]">
                <label className="flex items-center text-sm font-medium font-roboto text-white mb-2">
                  <svg
                    className="w-5 h-5 text-white mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
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
                  className="w-full border border-gray-200 rounded-lg px-4 py-3 font-roboto bg-white text-gray-800 focus:ring-2 focus:ring-orange-700 focus:border-transparent outline-none"
                />
              </div>

              {/* Property Type */}
              <div className="w-64 min-w-[200px]">
                <label className="block text-sm font-medium font-roboto text-white mb-2">
                  Property Type
                </label>
                <select className="w-full border border-gray-200 rounded-lg px-4 py-3 font-roboto bg-white text-gray-800 focus:ring-2 focus:ring-orange-700 focus:border-transparent outline-none">
                  <option>All Types</option>
                  <option>Apartment</option>
                  <option>Villa</option>
                  <option>Plot</option>
                  <option>Commercial</option>
                </select>
              </div>

              {/* Price Range */}
              <div className="w-64 min-w-[200px]">
                <label className="block text-sm font-medium font-roboto text-white mb-2">
                  Price Range
                </label>
                <select className="w-full border border-gray-200 rounded-lg px-4 py-3 font-roboto bg-white text-gray-800 focus:ring-2 focus:ring-orange-700 focus:border-transparent outline-none">
                  <option>Any Price</option>
                  <option>Below ₹25L</option>
                  <option>₹25L - ₹50L</option>
                  <option>₹50L - ₹1Cr</option>
                  <option>Above ₹1Cr</option>
                </select>
              </div>

              {/* Search Button */}
              <button className="bg-white hover:bg-gray-100 text-orange-600 px-8 py-3 rounded-full flex items-center justify-center transition-colors font-semibold">
                <svg
                  className="w-5 h-5 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
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
    </div>
  );
};

export default Header;
