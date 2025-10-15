import { useState } from 'react';
import { X } from 'lucide-react';

const BuyFormModal = ({ isOpen, onClose, property }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phoneNumber: '',
    investmentBudget: '',
    city: '',
    location: '',
    remarks: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Buy Form Data:', formData, 'Property:', property);
    // Add your form submission logic here
    alert('Form submitted successfully!');
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="bg-orange-500 text-white p-6 flex justify-between items-center sticky top-0">
          <div>
            <h2 className="text-2xl font-bold">Buy Property</h2>
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
        <form onSubmit={handleSubmit} className="p-6">
          <div className="space-y-4">
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
                placeholder="e.g., ₹50,00,000"
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
                placeholder="Enter preferred location"
              />
            </div>

            {/* Remarks */}
            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Remarks
              </label>
              <textarea
                name="remarks"
                value={formData.remarks}
                onChange={handleChange}
                rows="4"
                className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none resize-none"
                placeholder="Any additional information or requirements..."
              />
            </div>
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
              Submit Inquiry
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BuyFormModal;
