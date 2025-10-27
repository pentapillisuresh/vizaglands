import { useEffect, useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import ApiService from '../../hooks/ApiService';


const BasicDetails = ({ data, updateData, onNext }) => {
  const { userProfile } = useAuth();

  const [listingType, setListingType] = useState(data.marketType || 'sale'); // sale, rent, lease
  const [propertyType, setPropertyType] = useState(data.propertyKind || 'residential'); // residential/commercial
  const [propertySubtype, setPropertySubtype] = useState(data.propertySubtype || '');
  const [customSubtype, setCustomSubtype] = useState('');
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [title, setTitle] = useState(data.title || '');
  const [price, setPrice] = useState(data.price || '');
  const [selectedCategoryId, setSelectedCategoryId] = useState(data.categoryId || '');

  // ✅ Fetch categories from backend
  useEffect(() => {
    const fetchCategories = async () => {
      const clientToken = localStorage.getItem('token');

      try {
        const response = await ApiService.get('/categories', {
          headers: {
            Authorization: `Bearer ${clientToken}`,
            'Content-Type': 'application/json',
          },
        });

        if (response?.categories) {
          setCategories(response.categories);
        }
      } catch (error) {
        console.error('Error fetching categories:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  // ✅ Handle Continue button click
  const handleContinue = () => {
    // Find selected category object for additional info
    const selectedCategory = categories.find(
      (cat) => cat.name === propertySubtype
    );

    updateData({
      categoryId: selectedCategory?.id || '',
      propertyName: title,
      title,
      marketType: listingType,
      propertyKind: propertyType,
      catType: selectedCategory?.catType || propertyType === 'residential' ? 'Residential' : 'Commercial',
      price: Number(price),
      propertySubtype,
    });

    onNext();
  };

  // ✅ Filter categories by type
  const residentialTypes = categories.filter(
    (cat) => cat.catType?.toLowerCase() === 'residential'
  );

  const commercialTypes = categories.filter(
    (cat) => cat.catType?.toLowerCase() === 'commercial'
  );

  const subtypes = propertyType === 'residential' ? residentialTypes : commercialTypes;

  return (
    <div className="space-y-8">
      <div>
        <h2 className="font-serif text-3xl font-bold text-blue-900 mb-2">
          Welcome back {userProfile?.full_name || 'User'},
        </h2>
        <h3 className="font-serif text-2xl font-semibold text-blue-900 mb-4">
          Fill out basic details
        </h3>
      </div>

      {/* 🏠 Property Title */}
      <div className="mt-4">
        <label className="block font-roboto text-base font-medium text-gray-700 mb-3">
          Property Title
        </label>
        <input
          type="text"
          placeholder="Enter property title (e.g. 3BHK Villa in Gated Community)"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg font-roboto focus:outline-none focus:ring-2 focus:ring-orange-400"
        />
      </div>

      {/* 💰 Listing Type */}
      <div>
        <label className="block font-roboto text-base font-medium text-gray-700 mb-3">
          I'm looking to
        </label>
        <div className="flex flex-wrap gap-3">
          {['sale', 'rent', 'lease'].map((type) => (
            <button
              key={type}
              onClick={() => setListingType(type)}
              className={`px-6 py-2.5 rounded-full border-2 font-roboto capitalize transition-all ${
                listingType === type
                  ? 'bg-orange-500 border-orange-500 text-white'
                  : 'bg-white border-gray-300 text-gray-700 hover:border-orange-300'
              }`}
            >
              {type.charAt(0).toUpperCase() + type.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* 🏗️ Property Kind */}
      <div>
        <label className="block font-roboto text-base font-medium text-gray-700 mb-3">
          What kind of property do you have?
        </label>
        <div className="flex gap-6 mb-4">
          {['residential', 'commercial'].map((type) => (
            <label key={type} className="flex items-center space-x-2 cursor-pointer">
              <input
                type="radio"
                name="propertyType"
                value={type}
                checked={propertyType === type}
                onChange={(e) => {
                  setPropertyType(e.target.value);
                  setPropertySubtype('');
                  setCustomSubtype('');
                }}
                className="w-5 h-5 text-orange-500 focus:ring-orange-500"
              />
              <span className="font-roboto text-gray-700 capitalize">{type}</span>
            </label>
          ))}
        </div>

        {/* 🏘️ Property Subtypes */}
        {loading ? (
          <p className="text-gray-500">Loading property types...</p>
        ) : (
          <div className="flex flex-wrap gap-3">
            {subtypes.map((subtype) => (
              <button
                key={subtype.id}
                onClick={() => {
                  setPropertySubtype(subtype.name);
                  setSelectedCategoryId(subtype.id);
                }}
                className={`px-5 py-2.5 rounded-full border-2 font-roboto transition-all ${
                  propertySubtype === subtype.name
                    ? 'bg-orange-500 border-orange-500 text-white'
                    : 'bg-white border-gray-300 text-gray-700 hover:border-orange-300'
                }`}
              >
                {subtype.name}
              </button>
            ))}
          </div>
        )}

        {/* 💵 Price Input */}
        <div>
          <label className="block font-roboto text-sm font-medium text-gray-700 mt-8 mb-4">
            Price (₹) <span className="text-red-500">*</span>
          </label>
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            placeholder="Enter property price"
            className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none font-roboto"
          />
        </div>
      </div>

      {/* Continue */}
      <button
        onClick={handleContinue}
        disabled={!propertySubtype || !title || !price}
        className="bg-blue-900 hover:bg-blue-800 text-white font-roboto font-medium px-10 py-3 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Continue
      </button>
    </div>
  );
};

export default BasicDetails;
