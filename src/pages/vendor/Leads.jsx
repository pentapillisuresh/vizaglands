import { useState, useEffect } from 'react';
import { Phone, Mail, MapPin, Home, Calendar, MessageSquare, Filter, Search, ExternalLink, Star } from 'lucide-react';

const Leads = () => {
  const [leads, setLeads] = useState([]);
  const [filteredLeads, setFilteredLeads] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [selectedLead, setSelectedLead] = useState(null);
  const [showDetailModal, setShowDetailModal] = useState(false);

  useEffect(() => {
    const mockLeads = [
      {
        id: 1,
        customerName: 'Priya Sharma',
        email: 'priya.sharma@example.com',
        phone: '+91 98765 43210',
        property: {
          title: '3BHK Luxury Apartment with Sea View',
          location: 'Rushikonda, Visakhapatnam',
          price: '₹85 Lakhs',
          image: 'https://images.pexels.com/photos/1643383/pexels-photo-1643383.jpeg?auto=compress&cs=tinysrgb&w=400'
        },
        message: 'I am interested in visiting this property. Please share available time slots for site visit.',
        submittedDate: '2025-10-12',
        submittedTime: '10:30 AM',
        status: 'new',
        priority: 'high',
        source: 'Website'
      },
      {
        id: 2,
        customerName: 'Arun Kumar',
        email: 'arun.k@example.com',
        phone: '+91 99887 76543',
        property: {
          title: 'Independent Villa with Garden',
          location: 'Madhurawada, Visakhapatnam',
          price: '₹1.2 Cr',
          image: 'https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg?auto=compress&cs=tinysrgb&w=400'
        },
        message: 'Looking for immediate possession. Is this property ready to move in? Also, need loan assistance.',
        submittedDate: '2025-10-12',
        submittedTime: '02:15 PM',
        status: 'contacted',
        priority: 'high',
        source: 'Mobile App'
      },
      {
        id: 3,
        customerName: 'Sneha Reddy',
        email: 'sneha.reddy@example.com',
        phone: '+91 97654 32109',
        property: {
          title: '2BHK Modern Apartment',
          location: 'MVP Colony, Visakhapatnam',
          price: '₹55 Lakhs',
          image: 'https://images.pexels.com/photos/1457842/pexels-photo-1457842.jpeg?auto=compress&cs=tinysrgb&w=400'
        },
        message: 'Can you provide more details about the amenities? Is parking included?',
        submittedDate: '2025-10-11',
        submittedTime: '04:45 PM',
        status: 'contacted',
        priority: 'medium',
        source: 'Website'
      },
      {
        id: 4,
        customerName: 'Vikram Patel',
        email: 'vikram.patel@example.com',
        phone: '+91 96543 21098',
        property: {
          title: 'Commercial Plot - Main Road',
          location: 'Dwaraka Nagar, Visakhapatnam',
          price: '₹65 Lakhs',
          image: 'https://images.pexels.com/photos/8293778/pexels-photo-8293778.jpeg?auto=compress&cs=tinysrgb&w=400'
        },
        message: 'Interested in this plot for commercial purposes. What are the zoning regulations?',
        submittedDate: '2025-10-11',
        submittedTime: '11:20 AM',
        status: 'new',
        priority: 'medium',
        source: 'Referral'
      },
      {
        id: 5,
        customerName: 'Lakshmi Naidu',
        email: 'lakshmi.n@example.com',
        phone: '+91 95432 10987',
        property: {
          title: 'Duplex House with Parking',
          location: 'Gajuwaka, Visakhapatnam',
          price: '₹95 Lakhs',
          image: 'https://images.pexels.com/photos/323780/pexels-photo-323780.jpeg?auto=compress&cs=tinysrgb&w=400'
        },
        message: 'Would like to schedule a site visit this weekend. Please confirm availability.',
        submittedDate: '2025-10-10',
        submittedTime: '09:00 AM',
        status: 'completed',
        priority: 'low',
        source: 'Website'
      },
      {
        id: 6,
        customerName: 'Rajesh Rao',
        email: 'rajesh.rao@example.com',
        phone: '+91 94321 09876',
        property: {
          title: '3BHK Luxury Apartment with Sea View',
          location: 'Rushikonda, Visakhapatnam',
          price: '₹85 Lakhs',
          image: 'https://images.pexels.com/photos/1643383/pexels-photo-1643383.jpeg?auto=compress&cs=tinysrgb&w=400'
        },
        message: 'Is negotiation possible on the price? Looking for a 3BHK near the beach.',
        submittedDate: '2025-10-10',
        submittedTime: '03:30 PM',
        status: 'contacted',
        priority: 'high',
        source: 'Website'
      },
      {
        id: 7,
        customerName: 'Anita Desai',
        email: 'anita.desai@example.com',
        phone: '+91 93210 98765',
        property: {
          title: 'Residential Plot Near Beach',
          location: 'Beach Road, Visakhapatnam',
          price: '₹45 Lakhs',
          image: 'https://images.pexels.com/photos/2724749/pexels-photo-2724749.jpeg?auto=compress&cs=tinysrgb&w=400'
        },
        message: 'Want to build a custom home. Can you share the plot dimensions and site plan?',
        submittedDate: '2025-10-09',
        submittedTime: '01:15 PM',
        status: 'new',
        priority: 'medium',
        source: 'Mobile App'
      }
    ];

    setLeads(mockLeads);
    setFilteredLeads(mockLeads);
  }, []);

  useEffect(() => {
    let filtered = leads;

    if (searchQuery) {
      filtered = filtered.filter(lead =>
        lead.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        lead.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        lead.phone.includes(searchQuery) ||
        lead.property.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (filterStatus !== 'all') {
      filtered = filtered.filter(lead => lead.status === filterStatus);
    }

    setFilteredLeads(filtered);
  }, [searchQuery, filterStatus, leads]);

  const handleViewDetails = (lead) => {
    setSelectedLead(lead);
    setShowDetailModal(true);
  };

  const getStatusBadge = (status) => {
    const statusConfig = {
      new: { bg: 'bg-blue-100', text: 'text-blue-700', label: 'New' },
      contacted: { bg: 'bg-yellow-100', text: 'text-yellow-700', label: 'Contacted' },
      completed: { bg: 'bg-green-100', text: 'text-green-700', label: 'Completed' }
    };
    const config = statusConfig[status] || statusConfig.new;
    return (
      <span className={`px-3 py-1 rounded-full text-xs font-medium ${config.bg} ${config.text}`}>
        {config.label}
      </span>
    );
  };

  const getPriorityBadge = (priority) => {
    const priorityConfig = {
      high: { bg: 'bg-red-100', text: 'text-red-700', icon: '🔥' },
      medium: { bg: 'bg-orange-100', text: 'text-orange-700', icon: '⚡' },
      low: { bg: 'bg-gray-100', text: 'text-gray-700', icon: '📋' }
    };
    const config = priorityConfig[priority] || priorityConfig.medium;
    return (
      <span className={`px-3 py-1 rounded-full text-xs font-medium ${config.bg} ${config.text}`}>
        {config.icon} {priority.charAt(0).toUpperCase() + priority.slice(1)}
      </span>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Lead Generation</h1>
          <p className="text-gray-600 mt-2">Manage and track customer inquiries for your properties</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white rounded-lg shadow-md p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Total Leads</p>
                <p className="text-2xl font-bold text-gray-900">{leads.length}</p>
              </div>
              <div className="bg-blue-100 p-3 rounded-lg">
                <Star className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-md p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">New Leads</p>
                <p className="text-2xl font-bold text-blue-600">
                  {leads.filter(l => l.status === 'new').length}
                </p>
              </div>
              <div className="bg-blue-100 p-3 rounded-lg">
                <MessageSquare className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-md p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Contacted</p>
                <p className="text-2xl font-bold text-yellow-600">
                  {leads.filter(l => l.status === 'contacted').length}
                </p>
              </div>
              <div className="bg-yellow-100 p-3 rounded-lg">
                <Phone className="w-6 h-6 text-yellow-600" />
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-md p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Completed</p>
                <p className="text-2xl font-bold text-green-600">
                  {leads.filter(l => l.status === 'completed').length}
                </p>
              </div>
              <div className="bg-green-100 p-3 rounded-lg">
                <Calendar className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-md p-6 mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search by name, email, phone, or property..."
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
                <option value="new">New</option>
                <option value="contacted">Contacted</option>
                <option value="completed">Completed</option>
              </select>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          <div className="p-6 border-b border-gray-200">
            <p className="text-gray-600">
              Showing <span className="font-semibold text-gray-900">{filteredLeads.length}</span> of {leads.length} leads
            </p>
          </div>

          <div className="divide-y divide-gray-200">
            {filteredLeads.map((lead) => (
              <div key={lead.id} className="p-6 hover:bg-gray-50 transition-colors">
                <div className="flex flex-col lg:flex-row gap-6">
                  <img
                    src={lead.property.image}
                    alt={lead.property.title}
                    className="w-full lg:w-48 h-32 object-cover rounded-lg"
                  />

                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-lg font-bold text-gray-900">{lead.customerName}</h3>
                          {getStatusBadge(lead.status)}
                          {getPriorityBadge(lead.priority)}
                        </div>
                        <div className="flex flex-wrap gap-4 text-sm text-gray-600 mb-3">
                          <span className="flex items-center gap-1">
                            <Mail className="w-4 h-4" />
                            {lead.email}
                          </span>
                          <span className="flex items-center gap-1">
                            <Phone className="w-4 h-4" />
                            {lead.phone}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="bg-gray-50 rounded-lg p-3 mb-3">
                      <div className="flex items-start gap-2 mb-2">
                        <Home className="w-4 h-4 text-orange-600 mt-1" />
                        <div>
                          <h4 className="font-semibold text-gray-900">{lead.property.title}</h4>
                          <div className="flex items-center text-sm text-gray-600 mt-1">
                            <MapPin className="w-3 h-3 mr-1" />
                            {lead.property.location}
                          </div>
                          <p className="text-orange-600 font-bold mt-1">{lead.property.price}</p>
                        </div>
                      </div>
                    </div>

                    <div className="bg-blue-50 border-l-4 border-blue-500 p-3 mb-3">
                      <div className="flex items-start gap-2">
                        <MessageSquare className="w-4 h-4 text-blue-600 mt-1" />
                        <p className="text-sm text-gray-700 italic">"{lead.message}"</p>
                      </div>
                    </div>

                    <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        {lead.submittedDate} at {lead.submittedTime}
                      </span>
                      <span className="px-2 py-1 bg-gray-100 rounded text-xs">
                        Source: {lead.source}
                      </span>
                    </div>

                    <div className="flex items-center gap-3 mt-4">
                      <button
                        onClick={() => handleViewDetails(lead)}
                        className="flex items-center gap-2 px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors text-sm font-medium"
                      >
                        <ExternalLink className="w-4 h-4" />
                        View Full Details
                      </button>
                      <a
                        href={`tel:${lead.phone}`}
                        className="flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors text-sm font-medium"
                      >
                        <Phone className="w-4 h-4" />
                        Call Now
                      </a>
                      <a
                        href={`mailto:${lead.email}`}
                        className="flex items-center gap-2 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium"
                      >
                        <Mail className="w-4 h-4" />
                        Send Email
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredLeads.length === 0 && (
            <div className="p-12 text-center">
              <div className="text-gray-400 mb-4">
                <Search className="w-16 h-16 mx-auto" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No leads found</h3>
              <p className="text-gray-600">Try adjusting your search or filters</p>
            </div>
          )}
        </div>
      </div>

      {showDetailModal && selectedLead && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-gray-200 p-6 flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-900">Lead Details</h2>
              <button
                onClick={() => setShowDetailModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="p-6 space-y-6">
              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-4">Customer Information</h3>
                <div className="bg-gray-50 rounded-lg p-4 space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="bg-orange-100 p-2 rounded-lg">
                      <User className="w-5 h-5 text-orange-600" />
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Name</p>
                      <p className="font-semibold text-gray-900">{selectedLead.customerName}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="bg-blue-100 p-2 rounded-lg">
                      <Mail className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Email</p>
                      <p className="font-semibold text-gray-900">{selectedLead.email}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="bg-green-100 p-2 rounded-lg">
                      <Phone className="w-5 h-5 text-green-600" />
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Phone</p>
                      <p className="font-semibold text-gray-900">{selectedLead.phone}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-4">Property Interest</h3>
                <div className="border border-gray-200 rounded-lg overflow-hidden">
                  <img
                    src={selectedLead.property.image}
                    alt={selectedLead.property.title}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-4">
                    <h4 className="font-bold text-gray-900 mb-2">{selectedLead.property.title}</h4>
                    <div className="flex items-center text-gray-600 text-sm mb-2">
                      <MapPin className="w-4 h-4 mr-1" />
                      {selectedLead.property.location}
                    </div>
                    <p className="text-xl font-bold text-orange-600">{selectedLead.property.price}</p>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-4">Customer Message</h3>
                <div className="bg-blue-50 border-l-4 border-blue-500 p-4">
                  <p className="text-gray-700">{selectedLead.message}</p>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-4">Lead Details</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-xs text-gray-500 mb-1">Status</p>
                    {getStatusBadge(selectedLead.status)}
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 mb-1">Priority</p>
                    {getPriorityBadge(selectedLead.priority)}
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 mb-1">Submitted Date</p>
                    <p className="font-semibold text-gray-900">{selectedLead.submittedDate}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 mb-1">Submitted Time</p>
                    <p className="font-semibold text-gray-900">{selectedLead.submittedTime}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 mb-1">Source</p>
                    <p className="font-semibold text-gray-900">{selectedLead.source}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 mb-1">Lead ID</p>
                    <p className="font-semibold text-gray-900">#{selectedLead.id.toString().padStart(4, '0')}</p>
                  </div>
                </div>
              </div>

              <div className="flex gap-3 pt-4">
                <a
                  href={`tel:${selectedLead.phone}`}
                  className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors font-medium"
                >
                  <Phone className="w-5 h-5" />
                  Call Customer
                </a>
                <a
                  href={`mailto:${selectedLead.email}`}
                  className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors font-medium"
                >
                  <Mail className="w-5 h-5" />
                  Send Email
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const User = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
  </svg>
);

export default Leads;
