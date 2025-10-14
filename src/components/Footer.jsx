import { FiMail, FiPhone, FiMapPin, FiFacebook, FiTwitter, FiInstagram, FiLinkedin } from 'react-icons/fi';

const Footer = () => {
  const quickLinks = [
    { name: 'About Us', href: '#' },
    { name: 'Contact Us', href: '#' },
    { name: 'Careers', href: '#' },
    { name: 'Blog', href: '#' }
  ];

  const getInTouch = [
    { name: 'Feedback', href: '#' },
    { name: 'Support', href: '#' },
    { name: 'Help Center', href: '#' },
    { name: 'Advertise', href: '#' }
  ];

  const popularCities = [
    { name: 'Properties in Visakhapatnam', href: '#' },
    { name: 'Properties in Vijayawada', href: '#' },
    { name: 'Properties in Hyderabad', href: '#' },
    { name: 'Properties in Guntur', href: '#' }
  ];

  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          <div className="animate-fadeIn">
              <div className="flex items-center mb-4">
              <img
                src="/images/logo.jpg"
                alt="Vizaglands Logo"
                className="h-10 w-auto"
              />
            </div>
            <p className="text-gray-400 mb-6 leading-relaxed">
              We are committed to connect quality homes to quality buyers. Helping you find your dream property.
            </p>
            <div className="flex space-x-4">
              <a
                href="#"
                className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-orange-500 transition-all duration-300 transform hover:scale-110"
              >
                <FiFacebook className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-orange-500 transition-all duration-300 transform hover:scale-110"
              >
                <FiTwitter className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-orange-500 transition-all duration-300 transform hover:scale-110"
              >
                <FiInstagram className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-orange-500 transition-all duration-300 transform hover:scale-110"
              >
                <FiLinkedin className="w-5 h-5" />
              </a>
            </div>
          </div>

          <div className="animate-fadeIn" style={{ animationDelay: '100ms' }}>
            <h3 className="text-white font-serif font-bold text-lg mb-6">Quick Links</h3>
            <ul className="space-y-3">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    className="hover:text-orange-500 transition-colors duration-300 flex items-center group"
                  >
                    <span className="mr-2 transform group-hover:translate-x-1 transition-transform duration-300">→</span>
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="animate-fadeIn" style={{ animationDelay: '200ms' }}>
            <h3 className="text-white font-serif font-bold text-lg mb-6">Get In Touch</h3>
            <ul className="space-y-3">
              {getInTouch.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    className="hover:text-orange-500 transition-colors duration-300 flex items-center group"
                  >
                    <span className="mr-2 transform group-hover:translate-x-1 transition-transform duration-300">→</span>
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="animate-fadeIn" style={{ animationDelay: '300ms' }}>
            <h3 className="text-white font-serif font-bold text-lg mb-6">Popular Cities</h3>
            <ul className="space-y-3">
              {popularCities.map((city, index) => (
                <li key={index}>
                  <a
                    href={city.href}
                    className="hover:text-orange-500 transition-colors duration-300 flex items-center group"
                  >
                    <span className="mr-2 transform group-hover:translate-x-1 transition-transform duration-300">→</span>
                    {city.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="flex items-start space-x-3 animate-fadeIn">
              <FiMapPin className="w-5 h-5 text-orange-500 mt-1 flex-shrink-0" />
              <div>
                <h4 className="text-white font-medium mb-1">Visit Us</h4>
                <p className="text-sm text-gray-400">Visakhapatnam, Andhra Pradesh, India</p>
              </div>
            </div>
            <div className="flex items-start space-x-3 animate-fadeIn" style={{ animationDelay: '100ms' }}>
              <FiPhone className="w-5 h-5 text-orange-500 mt-1 flex-shrink-0" />
              <div>
                <h4 className="text-white font-medium mb-1">Call Us</h4>
                <p className="text-sm text-gray-400">+91 1234567890</p>
              </div>
            </div>
            <div className="flex items-start space-x-3 animate-fadeIn" style={{ animationDelay: '200ms' }}>
              <FiMail className="w-5 h-5 text-orange-500 mt-1 flex-shrink-0" />
              <div>
                <h4 className="text-white font-medium mb-1">Email Us</h4>
                <p className="text-sm text-gray-400">info@vizagland.com</p>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm mb-4 md:mb-0">
              © 2025 Vizagland.com. All rights reserved.
            </p>
            <div className="flex space-x-6">
              <a href="#" className="text-gray-400 hover:text-orange-500 text-sm transition-colors duration-300">
                Privacy Policy
              </a>
              <a href="#" className="text-gray-400 hover:text-orange-500 text-sm transition-colors duration-300">
                Terms & Conditions
              </a>
              <a href="#" className="text-gray-400 hover:text-orange-500 text-sm transition-colors duration-300">
                Sitemap
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
