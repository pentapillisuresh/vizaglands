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
  const [isLogin, setIsLogin] = useState(false);
  const [profileData, setProfileData] = useState(null);
  const [searchResults, setSearchResults] = useState([]);
  
  const searchRef = useRef(null);
  const vendorMenuRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();

  // Enhanced login state management with profile sync
  useEffect(() => {
    const checkLoginStatus = () => {
      const loginStatus = localStorage.getItem('isLogin');
      const clientDataStr = localStorage.getItem('clientData');
      const clientDetailsStr = localStorage.getItem('clientDetails');
      
      setIsLogin(loginStatus === 'true');
      
      if (loginStatus === 'true') {
        try {
          // Try clientData first, then clientDetails as fallback
          let clientData = null;
          if (clientDataStr) {
            clientData = JSON.parse(clientDataStr);
          } else if (clientDetailsStr) {
            clientData = JSON.parse(clientDetailsStr);
          }
          setProfileData(clientData);
        } catch (error) {
          console.error('Error parsing client data:', error);
          setProfileData(null);
        }
      } else {
        setProfileData(null);
      }
    };

    // Check immediately
    checkLoginStatus();

    // Listen for storage changes (for cross-tab synchronization)
    const handleStorageChange = () => {
      checkLoginStatus();
    };

    // Listen for custom profile update events from Profile component
    const handleProfileUpdate = (event) => {
      if (event.detail) {
        setProfileData(event.detail);
      }
    };

    window.addEventListener('storage', handleStorageChange);
    window.addEventListener('profileUpdate', handleProfileUpdate);
    
    // Also check when page becomes visible again
    const handleVisibilityChange = () => {
      if (!document.hidden) {
        checkLoginStatus();
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('profileUpdate', handleProfileUpdate);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      // Close search
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setIsSearchOpen(false);
      }
      
      // Close mobile menu
      if (isMobileMenuOpen) {
        setIsMobileMenuOpen(false);
      }
      
      // Close vendor menu
      if (vendorMenuRef.current && !vendorMenuRef.current.contains(event.target)) {
        setIsVendorMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isMobileMenuOpen]);

  const isActive = (path) => location.pathname === path;

  const handleLogout = () => {
    localStorage.removeItem('isLogin');
    localStorage.removeItem('clientData');
    localStorage.removeItem('clientDetails');
    localStorage.removeItem('token');
    setIsLogin(false);
    setProfileData(null);
    setIsVendorMenuOpen(false);
    navigate("/login-register");
  };

  const clientDashboards = () => {
    if (isLogin) {
      navigate('/vendor/dashboard');
    } else {
      navigate("/login-register");
    }
  };

  const handleVendorMenuToggle = () => {
    setIsVendorMenuOpen(!isVendorMenuOpen);
  };

  const handleVendorMenuClose = () => {
    setIsVendorMenuOpen(false);
  };

  const handleNavigation = (path) => {
    navigate(path);
    handleVendorMenuClose();
    setIsMobileMenuOpen(false);
  };

  // Navigation items for reusability
  const navItems = [
    { path: "/", label: "Home" },
    { path: "/about", label: "About" },
    { path: "/contact", label: "Contact" },
    { path: "/blog", label: "Blog" }
  ];

  const vendorMenuItems = [
    { path: "/vendor/dashboard", label: "Dashboard", icon: LayoutDashboard },
    { path: "/vendor/manage-listings", label: "Manage Listings", icon: Home },
    { path: "/vendor/leads", label: "Leads", icon: Users },
    { path: "/vendor/profile", label: "Profile", icon: User }
  ];

  return (
    <div ref={searchRef}>
      <header className="shadow-sm bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <div className="flex items-center">
              <img 
                src="/images/logo.jpg" 
                alt="Vizaglands Logo" 
                className="h-10 w-auto cursor-pointer"
                onClick={() => navigate("/")}
              />
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-8">
              {navItems.map(({ path, label }) => (
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
              {/* Search Button */}
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
              <div className="relative" ref={vendorMenuRef}>
                <button
                  onClick={handleVendorMenuToggle}
                  className="bg-orange-500 text-white font-roboto px-5 py-2 rounded-full hover:bg-orange-600 transition-all duration-300 flex items-center space-x-2 min-w-[120px] justify-center"
                >
                  <User className="w-4 h-4" />
                  <span className="truncate max-w-[80px]">
                    {isLogin && profileData?.fullName ? profileData.fullName : "Login"}
                  </span>
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
                      {isLogin ? (
                        <>
                          {vendorMenuItems.map(({ path, label, icon: Icon }) => (
                            <button
                              key={path}
                              onClick={() => handleNavigation(path)}
                              className="w-full text-left px-4 py-2 flex items-center text-gray-700 hover:bg-orange-50 hover:text-orange-600 transition-colors"
                            >
                              <Icon className="w-4 h-4 mr-2" /> 
                              {label}
                            </button>
                          ))}
                          <hr className="my-1 border-gray-200" />
                          <button
                            onClick={handleLogout}
                            className="w-full text-left px-4 py-2 flex items-center text-red-500 hover:bg-red-50 transition-colors"
                          >
                            <LogOut className="w-4 h-4 mr-2" /> 
                            Logout
                          </button>
                        </>
                      ) : (
                        <button
                          onClick={() => handleNavigation("/login-register")}
                          className="w-full text-left px-4 py-2 flex items-center text-orange-600 hover:bg-orange-50 transition-colors"
                        >
                          <User className="w-4 h-4 mr-2" /> 
                          Login / Register
                        </button>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Mobile Menu Toggle */}
            <button
              className="lg:hidden text-gray-700 p-2"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden bg-white border-t border-gray-200 shadow-lg">
            <div className="px-4 py-3 space-y-3">
              {/* Mobile Navigation */}
              {navItems.map(({ path, label }) => (
                <a
                  key={path}
                  href={path}
                  className={`block font-medium font-roboto transition-colors py-2 px-3 rounded-lg ${
                    isActive(path)
                      ? "text-orange-500 bg-orange-50"
                      : "text-gray-700 hover:text-orange-500 hover:bg-gray-50"
                  }`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {label}
                </a>
              ))}

              <div className="border-t border-gray-200 pt-3 mt-3">
                {/* Mobile Search Button */}
                <button
                  onClick={() => {
                    setIsSearchOpen(!isSearchOpen);
                    setIsMobileMenuOpen(false);
                  }}
                  className={`w-full text-left font-roboto py-2 px-3 rounded-lg flex items-center space-x-2 ${
                    isSearchOpen 
                      ? "text-white bg-orange-600" 
                      : "text-gray-700 bg-orange-500 text-white"
                  }`}
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

                {/* Mobile Sell Button */}
                <button
                  onClick={() => {
                    clientDashboards();
                    setIsMobileMenuOpen(false);
                  }}
                  className="w-full text-left font-roboto py-2 px-3 rounded-lg flex items-center space-x-2 bg-orange-100 text-orange-600 border border-orange-400 mt-2"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                  </svg>
                  <span>Sell Property</span>
                </button>

                {/* Mobile Vendor Menu */}
                <div className="mt-3 space-y-1">
                  {isLogin ? (
                    <>
                      <div className="px-3 py-2 text-sm font-medium text-gray-500">
                        Welcome, {profileData?.fullName || "User"}
                      </div>
                      {vendorMenuItems.map(({ path, label, icon: Icon }) => (
                        <button
                          key={path}
                          onClick={() => handleNavigation(path)}
                          className="w-full text-left py-2 px-3 rounded-lg flex items-center text-gray-700 hover:bg-orange-50 hover:text-orange-600 transition-colors"
                        >
                          <Icon className="w-4 h-4 mr-2" />
                          {label}
                        </button>
                      ))}
                      <button
                        onClick={handleLogout}
                        className="w-full text-left py-2 px-3 rounded-lg flex items-center text-red-500 hover:bg-red-50 transition-colors"
                      >
                        <LogOut className="w-4 h-4 mr-2" />
                        Logout
                      </button>
                    </>
                  ) : (
                    <button
                      onClick={() => handleNavigation("/login-register")}
                      className="w-full text-left py-2 px-3 rounded-lg flex items-center text-orange-600 hover:bg-orange-50 transition-colors"
                    >
                      <User className="w-4 h-4 mr-2" />
                      Login / Register
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Search Bar */}
      {isSearchOpen && (
        <div className="bg-white border-b border-gray-200 shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <SearchBar setResults={setSearchResults} />
          </div>
        </div>
      )}
    </div>
  );
};

export default Header;