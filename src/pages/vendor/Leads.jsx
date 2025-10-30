import { useState, useEffect } from 'react';
import {
  Phone, Mail, MapPin, Home, Calendar, MessageSquare,
  Filter, Search, ExternalLink, Star
} from 'lucide-react';
import ApiService from '../../hooks/ApiService';
import LeadItem from '../../components/LeadItem';
import LeadDetailModal from '../../components/LeadDetailModal';

const Leads = () => {
  const [leads, setLeads] = useState([]);
  const [filteredLeads, setFilteredLeads] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [selectedLead, setSelectedLead] = useState(null);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [stats, setStats] = useState({
    totalLeads: 0,
    leadsThisMonth: 0,
    contactedLeads: 0,
    completedLeads: 0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // ✅ Fetch data from API
  useEffect(() => {
    const fetchLeads = async () => {
      setLoading(true);
      setError(null);
  
      try {
        const clientToken = localStorage.getItem('token');
        if (!clientToken) {
          throw new Error('Authentication token not found');
        }
  
        // ✅ Await the API call
        const response = await ApiService.get('/dashboard/client/leads', {
          headers: {
            Authorization: `Bearer ${clientToken}`,
            'Content-Type': 'application/json',
          },
        });
  
        // ✅ Handle Axios or Fetch responses
        const result = response.data ? response.data : await response.json();
        const { data } = result || {};
  
        if (!result) {
          throw new Error('Invalid response format from server');
        }
  
        console.log('Fetched Leads Data:',result);
  
        setLeads(result?.leads || []);
        setFilteredLeads(result?.leads || []);
        setStats({
          totalLeads: result?.totalLeads || 0,
          leadsThisMonth: result?.leadsThisMonth || 0,
          contactedLeads: result?.contactedLeads || 0,
          completedLeads: result?.completedLeads || 0,
        });
      } catch (err) {
        console.error('Error fetching leads:', err);
        setError(err.message || 'Something went wrong while fetching leads');
      } finally {
        setLoading(false);
      }
    };
  
    fetchLeads();
  }, []);
  
  // ✅ Filtering logic
  useEffect(() => {
    let filtered = leads;

    if (searchQuery) {
      filtered = filtered.filter(lead =>
        lead.customerName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        lead.email?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        lead.phone?.includes(searchQuery) ||
        lead.property?.title?.toLowerCase().includes(searchQuery.toLowerCase())
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
        {config.icon} {priority?.charAt(0).toUpperCase() + priority?.slice(1)}
      </span>
    );
  };

  // ✅ Loading and error states
  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen text-gray-600">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-orange-500 border-t-transparent mx-auto mb-4"></div>
          <p>Loading leads...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen text-red-600">
        <div className="text-center">
          <p className="font-semibold">Error: {error}</p>
          <button
            onClick={() => window.location.reload()}
            className="mt-4 px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Lead Generation</h1>
          <p className="text-gray-600 mt-2">Manage and track customer inquiries for your properties</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <StatCard label="Total Leads" value={stats.totalLeads} color="blue" icon={<Star />} />
          <StatCard label="New Leads" value={stats.leadsThisMonth} color="blue" icon={<MessageSquare />} />
          <StatCard label="Contacted" value={stats.contactedLeads} color="yellow" icon={<Phone />} />
          <StatCard label="Completed" value={stats.completedLeads} color="green" icon={<Calendar />} />
        </div>

        {/* Filters */}
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

        {/* Leads List */}
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          <div className="p-6 border-b border-gray-200">
            <p className="text-gray-600">
              Showing <span className="font-semibold text-gray-900">{filteredLeads.length}</span> of {stats.totalLeads} leads
            </p>
          </div>

          {filteredLeads.length > 0 ? (
            <div className="divide-y divide-gray-200">
              {filteredLeads.map((lead) => (
                <LeadItem
                key={lead.id}
                lead={lead}
                onViewDetails={() => handleViewDetails(lead)}
                getStatusBadge={getStatusBadge}
                getPriorityBadge={getPriorityBadge}
              />
              
              ))}
            </div>
          ) : (
            <div className="p-12 text-center">
              <Search className="w-16 h-16 mx-auto text-gray-400 mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No leads found</h3>
              <p className="text-gray-600">Try adjusting your search or filters</p>
            </div>
          )}
        </div>
      </div>

      {/* Lead Detail Modal */}
      {showDetailModal && selectedLead && (
        <LeadDetailModal
          lead={selectedLead}
          onClose={() => setShowDetailModal(false)}
          getStatusBadge={getStatusBadge}
          getPriorityBadge={getPriorityBadge}
        />
      )}
    </div>
  );
};

/* --- Subcomponents --- */
const StatCard = ({ label, value, color, icon }) => {
  const colorMap = {
    blue: 'bg-blue-100 text-blue-600',
    yellow: 'bg-yellow-100 text-yellow-600',
    green: 'bg-green-100 text-green-600',
  };
  return (
    <div className="bg-white rounded-lg shadow-md p-4">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-gray-600 text-sm">{label}</p>
          <p className={`text-2xl font-bold ${colorMap[color]?.split(' ')[1]}`}>{value}</p>
        </div>
        <div className={`${colorMap[color]?.split(' ')[0]} p-3 rounded-lg`}>
          {icon}
        </div>
      </div>
    </div>
  );
};

// (LeadItem and LeadDetailModal same as before, unchanged)

const User = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
  </svg>
);

export default Leads;
