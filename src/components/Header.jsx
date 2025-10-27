import { useState, useRef, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { LayoutDashboard, Home, BarChart3, User, LogOut, Users } from "lucide-react";
import BuyFormModal from "./BuyFormModal";
import DevelopmentFormModal from "./DevelopmentFormModal";
import SearchBar from "../hooks/searchBar";
import ApiService from "../hooks/ApiService";

const Header = () => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isVendorMenuOpen, setIsVendorMenuOpen] = useState(false);
  const searchRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();
  const [searchResults, setSearchResults] = useState([]);

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

  const clientDashboards=()=>{
    const isLogin=localStorage.getItem("isLogin");
    if (isLogin) {
      const clientData=localStorage.getItem("clientData");
      navigate('/vendor/dashboard');
    } else{
      navigate("/login-register")
    }
  }

  return (
    <div ref={searchRef}>
      <header className="shadow-sm bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <div className="flex items-center">
              <img src="/images/logo.jpg" alt="Vizaglands Logo" className="h-10 w-auto" />
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-8">
              {[{ path: "/", label: "Home" },
              { path: "/about", label: "About" },
              { path: "/contact", label: "Contact" },
              { path: "/blog", label: "Blog" }].map(({ path, label }) => (
                <a
                  key={path}
                  href={path}
                  className={`relative font-medium font-roboto transition-colors ${isActive(path)
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
              {/* Search Button */}
              <button
                onClick={() => setIsSearchOpen(!isSearchOpen)}
                className={`${isSearchOpen ? "bg-orange-600" : "bg-orange-500"
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
                <span>Buy Property</span>
              </button>

              {/* Sell Button */}
              <button
                onClick={clientDashboards}
                className="bg-orange-100 text-orange-600 font-roboto px-5 py-2 rounded-full hover:bg-orange-200 transition-all duration-300 flex items-center space-x-2 border border-orange-400"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                </svg>
                <span>Sell Property</span>
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
                    className={`w-4 h-4 transform transition-transform ${isVendorMenuOpen ? "rotate-180" : ""
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

      {/* Search Bar */}
      {isSearchOpen && (
        <div>
          <SearchBar setResults={setSearchResults} />
          {/* <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {searchResults.map((property) => (
              <div key={property.id} className="bg-white shadow rounded-lg p-4">
                <h3 className="font-bold text-lg mb-2">{property.propertyName}</h3>
                <p>{property?.address?.city}, {property?.address?.locality}</p>
                <p>₹{property.price}</p>
              </div>
            ))}
          </div> */}
        </div>
)}



    </div>
  );
};

export default Header;
