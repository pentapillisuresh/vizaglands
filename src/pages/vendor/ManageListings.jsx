import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Edit,
  Trash2,
  Eye,
  MapPin,
  Bed,
  Bath,
  Square,
  Plus,
  Search,
  Filter,
  Tag
} from 'lucide-react';

const ManageListings = () => {
  const navigate = useNavigate();
  const [listings, setListings] = useState([]);
  const [filteredListings, setFilteredListings] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedListing, setSelectedListing] = useState(null);

  useEffect(() => {
    const mockListings = [
      {
        id: 1,
        title: '3BHK Luxury Apartment with Sea View',
        location: 'Rushikonda, Visakhapatnam',
        price: '₹85 Lakhs',
        type: 'Apartment',
        status: 'active',
        bedrooms: 3,
        bathrooms: 2,
        area: '1650 sq ft',
        views: 234,
        inquiries: 12,
        postedDate: '2025-09-15',
        image:
          'https://images.pexels.com/photos/1643383/pexels-photo-1643383.jpeg?auto=compress&cs=tinysrgb&w=400',
        description:
          'Spacious 3BHK apartment with beautiful sea view, modern amenities'
      },
      {
        id: 2,
        title: 'Independent Villa with Garden',
        location: 'Madhurawada, Visakhapatnam',
        price: '₹1.2 Cr',
        type: 'Villa',
        status: 'active',
        bedrooms: 4,
        bathrooms: 3,
        area: '2800 sq ft',
        views: 189,
        inquiries: 8,
        postedDate: '2025-09-10',
        image:
          'https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg?auto=compress&cs=tinysrgb&w=400',
        description:
          'Beautiful independent villa with private garden and parking'
      },
      {
        id: 3,
        title: 'Commercial Plot - Main Road',
        location: 'Dwaraka Nagar, Visakhapatnam',
        price: '₹65 Lakhs',
        type: 'Plot',
        status: 'pending',
        bedrooms: null,
        bathrooms: null,
        area: '2400 sq ft',
        views: 156,
        inquiries: 15,
        postedDate: '2025-09-20',
        image:
          'https://images.pexels.com/photos/8293778/pexels-photo-8293778.jpeg?auto=compress&cs=tinysrgb&w=400',
        description: 'Prime commercial plot on main road, ideal for business'
      }
    ];

    setListings(mockListings);
    setFilteredListings(mockListings);
  }, []);

  useEffect(() => {
    let filtered = listings;

    if (searchQuery) {
      filtered = filtered.filter(
        (listing) =>
          listing.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          listing.location.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (filterStatus !== 'all') {
      filtered = filtered.filter((listing) => listing.status === filterStatus);
    }

    setFilteredListings(filtered);
  }, [searchQuery, filterStatus, listings]);

  const handleDelete = (listing) => {
    setSelectedListing(listing);
    setShowDeleteModal(true);
  };

  const confirmDelete = () => {
    setListings(listings.filter((l) => l.id !== selectedListing.id));
    setShowDeleteModal(false);
    setSelectedListing(null);
  };

  const handleEdit = (listingId) => {
    navigate(`/post-property?edit=${listingId}`);
  };

  // ✅ NEW: Mark as Sold or Rent
  const handleStatusChange = (id, newStatus) => {
    const updatedListings = listings.map((listing) =>
      listing.id === id ? { ...listing, status: newStatus } : listing
    );
    setListings(updatedListings);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Manage Listings</h1>
            <p className="text-gray-600 mt-2">
              View and manage all your property listings
            </p>
          </div>
          <button
            onClick={() => navigate('/post-property')}
            className="bg-orange-500 text-white px-6 py-3 rounded-full hover:bg-orange-600 transition-colors flex items-center gap-2 font-semibold"
          >
            <Plus className="w-5 h-5" />
            Add New Listing
          </button>
        </div>

        <div className="bg-white rounded-xl shadow-md p-6 mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search by title or location..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none"
              />
            </div>
            <div className="flex items-center gap-2">
              <Filter className="text-gray-400 w-5 h-5" />
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none"
              >
                <option value="all">All Status</option>
                <option value="active">Active</option>
                <option value="pending">Pending</option>
                <option value="inactive">Inactive</option>
                <option value="sold">Sold</option>
                <option value="rented">Rented</option>
              </select>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          <div className="p-6 border-b border-gray-200">
            <p className="text-gray-600">
              Showing{' '}
              <span className="font-semibold text-gray-900">
                {filteredListings.length}
              </span>{' '}
              of {listings.length} listings
            </p>
          </div>

          <div className="divide-y divide-gray-200">
            {filteredListings.map((listing) => (
              <div key={listing.id} className="p-6 hover:bg-gray-50 transition-colors">
                <div className="flex flex-col lg:flex-row gap-6">
                  <img
                    src={listing.image}
                    alt={listing.title}
                    className="w-full lg:w-64 h-48 object-cover rounded-lg"
                  />

                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className="text-xl font-bold text-gray-900 mb-2">
                          {listing.title}
                        </h3>
                        <div className="flex items-center text-gray-600 mb-2">
                          <MapPin className="w-4 h-4 mr-1" />
                          <span className="text-sm">{listing.location}</span>
                        </div>
                        <p className="text-2xl font-bold text-orange-600">
                          {listing.price}
                        </p>
                      </div>
                      <span
                        className={`px-4 py-1 rounded-full text-sm font-medium ${
                          listing.status === 'active'
                            ? 'bg-green-100 text-green-700'
                            : listing.status === 'pending'
                            ? 'bg-yellow-100 text-yellow-700'
                            : listing.status === 'sold'
                            ? 'bg-red-100 text-red-700'
                            : listing.status === 'rented'
                            ? 'bg-purple-100 text-purple-700'
                            : 'bg-gray-100 text-gray-700'
                        }`}
                      >
                        {listing.status.charAt(0).toUpperCase() +
                          listing.status.slice(1)}
                      </span>
                    </div>

                    <p className="text-gray-600 mb-4">{listing.description}</p>

                    <div className="flex flex-wrap items-center gap-4 mb-4">
                      {listing.bedrooms && (
                        <div className="flex items-center text-gray-700">
                          <Bed className="w-5 h-5 mr-2 text-orange-500" />
                          <span className="text-sm font-medium">
                            {listing.bedrooms} Beds
                          </span>
                        </div>
                      )}
                      {listing.bathrooms && (
                        <div className="flex items-center text-gray-700">
                          <Bath className="w-5 h-5 mr-2 text-orange-500" />
                          <span className="text-sm font-medium">
                            {listing.bathrooms} Baths
                          </span>
                        </div>
                      )}
                      <div className="flex items-center text-gray-700">
                        <Square className="w-5 h-5 mr-2 text-orange-500" />
                        <span className="text-sm font-medium">{listing.area}</span>
                      </div>
                      <div className="flex items-center text-gray-700">
                        <Eye className="w-5 h-5 mr-2 text-blue-500" />
                        <span className="text-sm font-medium">
                          {listing.views} views
                        </span>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-3">
                      <button
                        onClick={() => handleEdit(listing.id)}
                        className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors text-sm font-medium"
                      >
                        <Edit className="w-4 h-4" />
                        Edit
                      </button>

                      <button
                        onClick={() => handleDelete(listing)}
                        className="flex items-center gap-2 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors text-sm font-medium"
                      >
                        <Trash2 className="w-4 h-4" />
                        Delete
                      </button>

                      <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium">
                        <Eye className="w-4 h-4" />
                        View Details
                      </button>

                      {/* ✅ Mark as Sold / Rent Buttons */}
                      {listing.status === 'active' && (
                        <>
                          <button
                            onClick={() =>
                              handleStatusChange(listing.id, 'sold')
                            }
                            className="flex items-center gap-2 px-4 py-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-colors text-sm font-medium"
                          >
                            <Tag className="w-4 h-4" />
                            Mark as Sold
                          </button>
                          <button
                            onClick={() =>
                              handleStatusChange(listing.id, 'rented')
                            }
                            className="flex items-center gap-2 px-4 py-2 bg-purple-100 text-purple-700 rounded-lg hover:bg-purple-200 transition-colors text-sm font-medium"
                          >
                            <Tag className="w-4 h-4" />
                            Mark as Rented
                          </button>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredListings.length === 0 && (
            <div className="p-12 text-center">
              <div className="text-gray-400 mb-4">
                <Search className="w-16 h-16 mx-auto" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                No listings found
              </h3>
              <p className="text-gray-600">Try adjusting your search or filters</p>
            </div>
          )}
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-8 max-w-md w-full mx-4">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Confirm Delete
            </h3>
            <p className="text-gray-600 mb-6">
              Are you sure you want to delete "
              {selectedListing?.title}"? This action cannot be undone.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="flex-1 px-4 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                className="flex-1 px-4 py-3 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors font-medium"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageListings;
