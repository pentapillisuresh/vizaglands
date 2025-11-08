
import React, { useEffect, useState } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import {
  ArrowLeft, ArrowRight, Home, Heart, Share2, Bed, Bath, Maximize,
  Building, MapPin, CheckCircle, Phone, Mail, Calendar
} from "lucide-react";
import { propertiesData } from "../data/propertiesData";
import ApiService from "../hooks/ApiService";
import AOS from "aos";
import PropertyMap from "../components/PropertyMap";
import getPhotoSrc from "../hooks/getPhotos";

function ClientPropertyDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const [loading, setLoading] = useState(false);
  const [property, setProperty] = useState(null);
  const [selectedImage, setSelectedImage] = useState(0);
  const [showContact, setShowContact] = useState(false);
  const [page, setPage] = useState(1);
  const [similarProperties, setSimilarProperties] = useState(propertiesData);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phoneNumber: "",
    message: "",
  });

  const [status, setStatus] = useState("");

  // Handle input changes
  const handleChange = (e) => {
    const { value, name } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus("");
    const payload = {
      propertyId: property.id || null, // fallback if not provided
      name: formData.name,
      email: formData.email,
      phoneNumber: formData.phoneNumber,
      message: formData.message,
      leadType: "callback", // or "inquiry" / "callback" etc.
    }
    try {
      const response = await ApiService.post("/leads", payload, {
        headers: {
          "Content-Type": "application/json"
        }
      });

      if (response) {
        // setStatus("✅ ", request.message);

        setFormData({
          name: "",
          email: "",
          phoneNumber: "",
          message: "",
        });
        alert("Thankyou for contacting us,our team will contact you very soon ")
        setTimeout(() => {
          setStatus("")
        }, 2000);
      } else {
        setStatus("❌ Failed to submit. Please try again.");
      }
    } catch (error) {
      console.error("Error submitting lead:", error);
      setStatus("⚠️ Something went wrong. Please try again later.");
    } finally {
      setLoading(false);
    }
  };


  useEffect(() => {
    AOS.init({ duration: 800, once: true });
  }, []);

  // ✅ Get property from navigation state
  useEffect(() => {
    const prop = location.state?.property;
    if (prop) {
      setProperty(prop);
      window.scrollTo(0, 0);
    } else {
      // Optional: fetch property from backend if not passed via navigate
      // fetch(`/api/properties/${id}`).then(res => res.json()).then(data => setProperty(data));
    }
  }, [location.state, id]);

  useEffect(() => {
    fetchPropertyDetails()
  }, [location.state, id]);


  const fetchPropertyDetails = async () => {

    try {
      const response = await ApiService.get(`/properties/${id}`, {
        headers: {
          'Content-Type': 'application/json'
        }
      });

      console.log("Dashboard API Response:", response);

      // ✅ Access nested response.data.data safely
      if (response?.property) {
        const propertyDetails = response.property;
        setProperty(propertyDetails);
      } else {
        console.warn("Unexpected response format:", response);
      }

    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setLoading(false);
    }
  }

  const getpropertyByCategory = async () => {
    const payload = {
      page: page,
      limit: 3,
      categoryId: property?.categoryId,
      marketType: property?.marketType,
      // city:,
      // locality,
    }
    try {
      const response = await ApiService.get('/properties', payload, {
        headers: {
          'Content-Type': 'application/json'
        }
      });

      console.log("Dashboard API Response:", response);

      // ✅ Access nested response.data.data safely
      if (response?.properties) {
        const data = response.properties;
        const rrr = data.filter((item) => item.id !== property?.id)

        setSimilarProperties(data || []);
      } else {
        console.warn("Unexpected response format:", response);
      }

    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setLoading(false);
    }
  }

  const addViewProperty = async () => {
    try {
      const clientToken = localStorage.getItem("token");

      const response = await ApiService.post(
        `/propertyView`,              // URL
        { propertyId: id },           // Request body
        {                             // Config (headers)
          headers: {
            Authorization: `Bearer ${clientToken}`,
            'Content-Type': 'application/json',
          },
        }
      );

      console.log('Property view recorded:', response.data);
    } catch (err) {
      console.log(err.response?.data?.message || err.message);
    }
  };

  const updateViewCount = async () => {
    try {
      const clientToken = localStorage.getItem("token");

      const response = await ApiService.put(`/properties/updateView/${id}`,
        {
          headers: {
            Authorization: `Bearer ${clientToken}`,
            'Content-Type': 'application/json'
          }
        },
      )

      if (response) {
        navigate('./')
      } else {
        console.log("rrr::", response?.message)
      }
    } catch (err) {
      alert(err.message);
    }
  };

  useEffect(() => {
    const userDetails = localStorage.getItem("clientDetails");
    const isLogin = localStorage.getItem("isLogin");
    if (isLogin) {
      addViewProperty()
    } else {

    }

    setTimeout(() => {
      updateViewCount()
    }, 5000);
  }, [id])

  useEffect(() => {
    getpropertyByCategory()
  }, [])

  // ✅ Utility: Format price
  const formatPrice = (price) => {
    if (!price) return "-";
    const num = parseFloat(price);
    if (num >= 10000000) return `₹${(num / 10000000).toFixed(2)} Cr`;
    if (num >= 100000) return `₹${(num / 100000).toFixed(2)} Lac`;
    return `₹${num.toLocaleString()}`;
  };

  // ✅ Simplify access
  const profile = property?.profile || {};
  const address = property?.address || {};
  const category = property?.category || {};
  const client = property?.client || {};

  let galleryImages = [];

  try {
    if (Array.isArray(property?.photos)) {
      // Already an array
      galleryImages = property.photos;
    } else if (typeof property?.photos === 'string' && property.photos.startsWith('[')) {
      // JSON string
      galleryImages = JSON.parse(property.photos);
    } else if (property?.photos) {
      // Single image URL (not array)
      galleryImages = [property.photos];
    } else {
      // Fallback
      galleryImages = [category?.photo];
    }
  } catch (err) {
    console.error('Error parsing photos:', err);
    galleryImages = [category?.photo];
  }

  const safeShow = (val) => val !== null && val !== undefined && val !== "" && val !== 0;


  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Bar */}
      <div className="bg-[#003366] text-white py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-white hover:text-orange-400 transition-colors"
          >
            <Home size={20} />
            <span>Back to Listings</span>
          </button>
          <h2 className="font-semibold text-lg">{category.name || "Property Details"}</h2>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="gap-5">
          {/* Left Section */}
          <div className="lg:col-span-2">
            {/* Image Gallery */}
            <div className="bg-white rounded-lg shadow-lg overflow-hidden mb-6">
              <div className="relative h-96 bg-gray-900">
                <img
                  src={galleryImages[selectedImage]}
                  alt={property?.title}
                  className="w-full h-full object-cover"
                />
                {selectedImage > 0 && (
                  <button
                    onClick={() => setSelectedImage(selectedImage - 1)}
                    className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white p-2 rounded-full"
                  >
                    <ArrowLeft size={24} className="text-[#003366]" />
                  </button>
                )}
                {selectedImage < galleryImages.length - 1 && (
                  <button
                    onClick={() => setSelectedImage(selectedImage + 1)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white p-2 rounded-full"
                  >
                    <ArrowRight size={24} className="text-[#003366]" />
                  </button>
                )}
              </div>

              {/* Thumbnails */}
              <div className="p-4 flex gap-2 overflow-x-auto">
                {galleryImages.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImage(idx)}
                    className={`flex-shrink-0 w-24 h-24 rounded-lg overflow-hidden border-2 transition-all ${selectedImage === idx
                      ? "border-orange-600 ring-2 ring-orange-200"
                      : "border-gray-300 hover:border-orange-400"
                      }`}
                  >
                    <img src={img} alt={`View ${idx + 1}`} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            </div>

            {/* Main Details */}
            <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h1 className="text-3xl font-bold text-[#003366] mb-2">{property?.title}</h1>
                  <h3 className="text-sm font-bold text-[#003366] mb-2">{property?.propertyName}</h3>
                  <div className="flex items-center gap-2 text-gray-600">
                    <MapPin size={18} className="text-orange-500" />
                    <span className="text-lg">
                      {address?.locality && `${address?.locality}, `}
                      {address?.city && `${address?.city}`}
                    </span>
                  </div>
                </div>
                <div className="text-right">
                  {property?.price ? (
                    <div className="text-3xl font-bold text-orange-600">{formatPrice(property?.price)}</div>

                  ) : (
                    <button
                      className="bg-blue-600 hover:bg-blue-700 text-white font-medium text-sm px-5 py-2.5 rounded-lg shadow-md transition-all"
                      onClick={() => alert("Contact us for price!")}
                    >
                      Contact Us for Price
                    </button>
                  )}
                </div>
              </div>

              {/* Key Features */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 py-6 border-y">
                {safeShow(profile?.bedrooms) && (
                  <FeatureCard icon={<Bed size={24} />} label="Bedrooms" value={profile?.bedrooms} />
                )}
                {safeShow(profile?.bathrooms) && (
                  <FeatureCard icon={<Bath size={24} />} label="Bathrooms" value={profile?.bathrooms} />
                )}
                {safeShow(profile?.carpetArea) && (
                  <FeatureCard
                    icon={<Maximize size={24} />}
                    label="Carpet Area"
                    value={`${profile?.carpetArea} ${profile?.areaUnit || "sqft"}`}
                  />
                )}
                {safeShow(profile?.status) && (
                  <FeatureCard icon={<Building size={24} />} label="Status" value={profile?.status} />
                )}
              </div>

              {/* Overview */}
              {safeShow(property?.description) && (
                <Section title="Overview">
                  <p className="text-gray-700 leading-relaxed">{property?.description}</p>
                </Section>
              )}

              {/* Property Details */}
              <Section title="Property Details">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {safeShow(category.name) && (
                    <Detail label="Property Type" value={category.name} />
                  )}
                  {safeShow(address?.locality) && (
                    <Detail label="Locality" value={address?.locality} />
                  )}
                  {safeShow(address?.city) && (
                    <Detail label="City" value={address?.city} />
                  )}
                  {safeShow(profile?.totalFloors) && (
                    <Detail label="Total Floors" value={profile?.totalFloors} />
                  )}
                </div>
              </Section>
              {/* Nearby Details */}
              {Array.isArray(address?.near_by) && address.near_by.length > 0 && (
                <Section title="Nearby Places">
                  <ul className="list-disc list-inside space-y-2 text-gray-700">
                    {address.near_by.map((place, idx) => (
                      <li key={idx} className="flex justify-between">
                        <span>{place.info}</span>
                        {place.distance && (
                          <span className="text-sm text-gray-500">{place.distance}</span>
                        )}
                      </li>
                    ))}
                  </ul>
                </Section>
              )}

              {/* Map Section */}
              <Section title="Location on Map">
                <PropertyMap lat={address?.lat} lon={address?.lon} />
              </Section>

              {/* Amenities */}
              {Array.isArray(property?.amenities) && property?.amenities.length > 0 && (
                <Section title="Amenities & Features">
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                    {property?.amenities.map((a, idx) => (
                      <div key={idx} className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg">
                        <CheckCircle size={20} className="text-orange-600" />
                        <span className="text-[#003366] font-medium">{a}</span>
                      </div>
                    ))}
                  </div>
                </Section>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* 🧩 Small Reusable Components */
const FeatureCard = ({ icon, label, value }) => (
  <div className="text-center">
    <div className="flex justify-center mb-2">
      <div className="bg-blue-50 p-3 rounded-full text-[#003366]">{icon}</div>
    </div>
    <div className="text-lg font-bold text-[#003366]">{value}</div>
    <div className="text-sm text-gray-600">{label}</div>
  </div>
);

const Section = ({ title, children }) => (
  <div className="mt-6">
    <h2 className="text-2xl font-bold text-[#003366] mb-4">{title}</h2>
    {children}
  </div>
);

const Detail = ({ label, value }) => (
  <div className="flex justify-between py-3 border-b">
    <span className="text-gray-600">{label}</span>
    <span className="font-semibold text-[#003366]" style={{ textTransform: 'capitalize' }}>{value}</span>
  </div>
);

const ContactCard = ({ icon, label, value }) => (
  <div className="flex items-center gap-3 p-4 bg-blue-50 rounded-lg">
    {icon}
    <div>
      <div className="text-xs text-gray-600">{label}</div>
      <div className="font-bold text-[#003366]">{value}</div>
    </div>
  </div>
);

export default ClientPropertyDetail;

