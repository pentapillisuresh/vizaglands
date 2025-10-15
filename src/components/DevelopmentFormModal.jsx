import { useState } from 'react';
import { X, Image as ImageIcon, Trash2 } from 'lucide-react';

const DevelopmentFormModal = ({ isOpen, onClose, property }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phoneNumber: '',
    investmentBudget: '',
    city: '',
    location: '',
    sublocation: '',
    propertyType: '',
    areaSize: '',
    remarks: '',
    images: []
  });

  // Handle text inputs
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  // Handle image upload
  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    const newImages = files.map((file) => ({
      file,
      preview: URL.createObjectURL(file)
    }));
    setFormData((prev) => ({
      ...prev,
      images: [...prev.images, ...newImages]
    }));
  };

  // Remove a selected image
  const handleRemoveImage = (index) => {
    setFormData((prev) => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index)
    }));
  };

  // Submit form
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Development Form Data:', formData, 'Property:', property);
    alert('Development inquiry submitted successfully!');
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-xl">
        {/* Header */}
        <div className="bg-orange-500 text-white p-6 flex justify-between items-center sticky top-0 z-10">
          <div>
            <h2 className="text-2xl font-bold">Development Inquiry</h2>
            {property && (
              <p className="text-orange-100 text-sm mt-1">{property.title}</p>
            )}
          </div>
          <button
            onClick={onClose}
            className="text-white hover:bg-orange-600 p-2 rounded-full transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {/* Name */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Name <span className="text-orange-500">*</span>
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none"
              placeholder="Enter your full name"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Email <span className="text-orange-500">*</span>
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none"
              placeholder="Enter your email"
            />
          </div>

          {/* Phone Number */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Phone Number <span className="text-orange-500">*</span>
            </label>
            <input
              type="tel"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none"
              placeholder="Enter your phone number"
            />
          </div>

          {/* Investment Budget */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Investment Budget <span className="text-orange-500">*</span>
            </label>
            <input
              type="text"
              name="investmentBudget"
              value={formData.investmentBudget}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none"
              placeholder="e.g., ₹1,00,00,000"
            />
          </div>

          {/* City */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              City <span className="text-orange-500">*</span>
            </label>
            <input
              type="text"
              name="city"
              value={formData.city}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none"
              placeholder="Enter city"
            />
          </div>

          {/* Location */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Location <span className="text-orange-500">*</span>
            </label>
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none"
              placeholder="Enter location/area"
            />
          </div>

          {/* Sublocation */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Sublocation
            </label>
            <input
              type="text"
              name="sublocation"
              value={formData.sublocation}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none"
              placeholder="Enter specific sublocation or landmark"
            />
          </div>

          {/* Property Type */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Property Type <span className="text-orange-500">*</span>
            </label>
            <select
              name="propertyType"
              value={formData.propertyType}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none"
            >
              <option value="">Select property type</option>
              <option value="Plot">Plot</option>
              <option value="Land">Land</option>
            </select>
          </div>

          {/* Conditional Area Input */}
          {formData.propertyType && (
            <div>
              <label className="block text-gray-700 font-medium mb-2">
                {formData.propertyType === 'Plot'
                  ? 'Enter Plot Size (sq.mt)'
                  : 'Enter Land Area (sq.mt)'}{' '}
                <span className="text-orange-500">*</span>
              </label>
              <input
                type="number"
                name="areaSize"
                value={formData.areaSize}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none"
                placeholder={`Enter ${formData.propertyType.toLowerCase()} area in sq.mt`}
              />
            </div>
          )}

          {/* Image Upload Section */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Upload Property Images
            </label>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-orange-500 transition-colors">
              <input
                type="file"
                accept="image/*"
                multiple
                onChange={handleImageUpload}
                className="hidden"
                id="imageUpload"
              />
              <label
                htmlFor="imageUpload"
                className="cursor-pointer text-orange-500 font-medium flex flex-col items-center"
              >
                <ImageIcon className="w-10 h-10 mb-2 text-orange-500" />
                <span>Click to upload or drag and drop</span>
                <span className="text-gray-500 text-sm mt-1">
                  PNG, JPG up to 5MB each
                </span>
              </label>
            </div>

            {/* Image Preview Grid */}
            {formData.images.length > 0 && (
              <div className="grid grid-cols-3 sm:grid-cols-4 gap-3 mt-4">
                {formData.images.map((img, index) => (
                  <div
                    key={index}
                    className="relative group border rounded-lg overflow-hidden"
                  >
                    <img
                      src={img.preview}
                      alt={`Upload ${index + 1}`}
                      className="w-full h-24 object-cover"
                    />
                    <button
                      type="button"
                      onClick={() => handleRemoveImage(index)}
                      className="absolute top-1 right-1 bg-black bg-opacity-60 p-1 rounded-full text-white opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Remarks */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Remarks / Development Requirements
            </label>
            <textarea
              name="remarks"
              value={formData.remarks}
              onChange={handleChange}
              rows="4"
              className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none resize-none"
              placeholder="Describe your development plans, requirements, or any specific information..."
            />
          </div>

          {/* Submit Button */}
          <div className="mt-6 flex gap-3">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 bg-gray-200 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-300 transition-colors font-medium"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 bg-orange-500 text-white px-6 py-3 rounded-lg hover:bg-orange-600 transition-colors font-medium"
            >
              Submit Development Inquiry
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default DevelopmentFormModal;
