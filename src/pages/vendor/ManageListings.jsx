import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Edit, Trash2, Eye, MapPin, Bed, Bath, Square, Plus, Search, Filter, Tag } from 'lucide-react';
import ApiService from '../../hooks/ApiService';
import PropertyForm from '../../components/PropertyForm';
import getPhotoSrc from '../../hooks/getPhotos';

const ManageListings = () => {
  const navigate = useNavigate();
  const [listings, setListings] = useState([]);
  const [filteredListings, setFilteredListings] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedListing, setSelectedListing] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingProperty, setEditingProperty] = useState(null);

  // ✅ Fetch listings from API
  const fetchListings = async () => {
    try {
      const clientData = localStorage.getItem("clientDetails");
      const clientId = JSON.parse(clientData)?.id;
      if (!clientData) {
        console.error('No clientId found in localStorage');
        setLoading(false);
        return;
      }
      const response = await ApiService.get(`/properties?clientId=${clientId}`,
        { headers: { 'Content-Type': 'application/json' } },
      );
      if (!response) {
        throw new Error('Failed to fetch properties');
      }

      const data = await response.properties;
      setListings(data);
      setFilteredListings(data);
    } catch (error) {
      console.error('Error fetching listings:', error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchListings();
  }, []);

  // ✅ Filter logic (search + status)
  useEffect(() => {
    let filtered = listings;

    if (searchQuery) {
      filtered = filtered.filter(
        (listing) =>
          listing?.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
          listing?.location?.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (filterStatus !== 'all') {
      filtered = filtered.filter((listing) => listing?.status === filterStatus);
    }

    setFilteredListings(filtered);
  }, [searchQuery, filterStatus, listings]);

  // ✅ Handle Delete
  const handleDelete = (listing) => {
    setSelectedListing(listing);
    setShowDeleteModal(true);
  };

  const confirmDelete = async () => {
    if (!selectedListing) return;
    console.log("rrr:::", selectedListing)
    const clientToken = localStorage.getItem('token');
    try {
      const response = await ApiService.delete(`properties/${selectedListing?.id}`,
        {
          headers: {
            Authorization: `Bearer ${clientToken}`,
            'Content-Type': 'application/json'
          }
        },
      );

      if (!response) {
        throw new Error('Failed to delete property');
      }

      // Remove deleted property from list
      setListings((prev) => prev.filter((l) => l.id !== selectedListing?.id));
      setShowDeleteModal(false);
      setSelectedListing(null);
    } catch (error) {
      console.error('Error deleting listing:', error);
      alert('Failed to delete property. Please try again.');
    }
  };

  // ✅ Handle Edit
  const handleEdit = (listing) => {
    // setEditingProperty(listing)
    navigate(`/post-property?edit=${listing.id}`, {
      state: {
        listing, // or any other data you want to send
        mode: 'edit',
      },
    });    // setShowEditModal(true);
  };

  // ✅ Mark as Sold
  const handleStatusChange = (id, newStatus) => {
    const updatedListings = listings.map((listing) =>
      listing?.id === id ? { ...listing, status: newStatus } : listing
    );
    setListings(updatedListings);
  };

  const handleUpdateProperty = async (formData) => {
    console.log("from::", formData)

    try {
      const adminToken = localStorage.getItem("token");

      const response = await ApiService.put(`/properties/${formData.id}`, formData,
        {
          headers: {
            Authorization: `Bearer ${adminToken}`,
            'Content-Type': 'application/json'
          }
        },
      )

      if (response) {
        setShowEditModal(false);
        navigate('./')
      } else {
        console.log("rrr::", response?.message)
      }
      fetchListings();
      setShowEditModal(false);
      setEditingProperty(null);
      alert("Property updated successfully!");
    } catch (err) {
      alert(err.message);
    }
  };

  const handleSold = async (id) => {
    if (
      window.confirm(
        "Are you sure you want to make as SOLD this property? This action cannot be undone."
      )
    ) {
      const clientToken = localStorage.getItem('token');
      try {
        const res = await ApiService.put(`/properties/${id}`, { isSold: true }, {
          headers: {
            Authorization: `Bearer ${clientToken}`,
            "Content-Type": "application/json'"
          }
        });
        if (res) {

          alert("Property update isSold successfully!");
          fetchListings();
        }
      } catch (err) {
        alert("Failed to delete property.");
      }
    }
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
              </select>
            </div>
          </div>
        </div>

        {/* ✅ Loading State */}
        {loading ? (
          <div className="bg-white rounded-xl shadow-md p-12 text-center text-gray-500">
            Loading listings...
          </div>
        ) : (
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
              {filteredListings?.map((listing) => (
                <div key={listing?.id} className="p-6 hover:bg-gray-50 transition-colors">
                  <div className="flex flex-col lg:flex-row gap-6">
                    <img
                      src={getPhotoSrc(listing.photos)}
                      alt={listing?.title}
                      className="w-full lg:w-64 h-48 object-cover rounded-lg"
                    />
                   
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h3 className="text-xl font-bold text-gray-900 mb-2">
                            {listing?.title}
                          </h3>
                          <div className="flex items-center text-gray-600 mb-2">
                            <MapPin className="w-4 h-4 mr-1" />
                            <span className="text-sm">{listing?.address.city}-{listing?.address.locality}</span>
                          </div>
                          <p className="text-2xl font-bold text-orange-600">
                            {listing?.price || "Contact For Price"}
                          </p>
                        </div>
                        <span
                          className={`px-4 py-1 rounded-full text-sm font-medium ${listing?.isSold
                              ? 'bg-red-100 text-red-700'
                              : listing?.status === 'active'
                                ? 'bg-green-100 text-green-700'
                                : listing?.status === 'pending'
                                  ? 'bg-yellow-100 text-yellow-700'
                                  : listing?.status === 'verified'
                                    ? 'bg-blue-100 text-blue-700'
                                    : 'bg-gray-100 text-gray-700'
                            }`}
                        >
                          {listing?.isSold ? 'Sold' : listing?.status?.charAt(0).toUpperCase() + listing?.status?.slice(1) || 'Unknown'}
                        </span>

                      </div>

                      {/* <p className="text-gray-600 mb-4">{listing?.description}</p> */}

                      <div className="flex flex-wrap items-center gap-4 mb-4">
                        {listing?.profile.bedrooms && (
                          <div className="flex items-center text-gray-700">
                            <Bed className="w-5 h-5 mr-2 text-orange-500" />
                            <span className="text-sm font-medium">
                              {listing?.profile.bedrooms} Beds
                            </span>
                          </div>
                        )}
                        {listing?.profile.bathrooms && (
                          <div className="flex items-center text-gray-700">
                            <Bath className="w-5 h-5 mr-2 text-orange-500" />
                            <span className="text-sm font-medium">
                              {listing?.profile.bathrooms} Baths
                            </span>
                          </div>
                        )}
                        {listing?.profile.carpetArea && (
                          <div className="flex items-center text-gray-700">
                            <Square className="w-5 h-5 mr-2 text-orange-500" />
                            <span className="text-sm font-medium">{listing?.carpetArea}</span>
                          </div>
                        )}
                        {listing?.viewCount && (
                          <div className="flex items-center text-gray-700">
                            <Eye className="w-5 h-5 mr-2 text-blue-500" />
                            <span className="text-sm font-medium">
                              {listing?.viewCount} views
                            </span>
                          </div>
                        )}
                      </div>

                      <div className="flex flex-wrap gap-3">
                        <button
                          onClick={() => handleEdit(listing)}
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

                        <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium"
                          onClick={() => {
                            navigate(`../property/${listing?.id}`, { state: { property: listing } })
                          }}>
                          <Eye className="w-4 h-4" />
                          View Details
                        </button>

                        {(!listing.isSold && listing.status === "verified") && (
                          <button
                            onClick={() => handleSold(listing.id)}
                            className="flex items-center gap-2 px-4 py-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-colors text-sm font-medium"
                          >
                            <Tag className="w-4 h-4" />
                            Mark as Sold
                          </button>
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
        )}
      </div>

      {/* ✅ Delete Confirmation Modal */}
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

      {showEditModal && editingProperty && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-4xl max-h-[90vh] overflow-auto">
            <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between rounded-t-xl">
              <h2 className="text-xl font-bold text-gray-900">Edit Property</h2>
              <button
                onClick={() => {
                  setShowEditModal(false);
                  setEditingProperty(null);
                }}
                className="p-2 hover:bg-gray-100 rounded-lg transition"
              >
                <Plus className="w-5 h-5 text-gray-500 rotate-45" />
              </button>
            </div>
            <div className="p-6">
              <PropertyForm
                initialData={editingProperty}
                onSubmit={handleUpdateProperty}
                onCancel={() => {
                  setShowEditModal(false);
                  setEditingProperty(null);
                }}
              />
            </div>
          </div>
        </div>
      )}

      <style>{`
        @keyframes fade-in-down {
          0% {
            opacity: 0;
            transform: translate(-50%, -20px);
          }
          100% {
            opacity: 1;
            transform: translate(-50%, 0);
          }
        }
        .animate-fade-in-down {
          animation: fade-in-down 0.5s ease-out;
        }
      `}</style>
    </div>
  );
};

export default ManageListings;
