import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { LayoutDashboard, Home, TrendingUp, Eye, Heart, Phone } from 'lucide-react';

const Dashboard = () => {
  const navigate = useNavigate();
  const [stats, setStats] = useState({
    totalListings: 0,
    activeListings: 0,
    totalViews: 0,
    totalInquiries: 0,
    savedByUsers: 0,
    monthlyViews: 0
  });

  const [recentListings, setRecentListings] = useState([]);
  const [recentActivity, setRecentActivity] = useState([]);

  useEffect(() => {
    setStats({
      totalListings: 12,
      activeListings: 10,
      totalViews: 3456,
      totalInquiries: 87,
      savedByUsers: 234,
      monthlyViews: 1203
    });

    setRecentListings([
      {
        id: 1,
        title: '3BHK Luxury Apartment',
        location: 'Rushikonda, Visakhapatnam',
        price: '₹85 Lakhs',
        views: 234,
        inquiries: 12,
        status: 'active',
        image: 'https://images.pexels.com/photos/1643383/pexels-photo-1643383.jpeg?auto=compress&cs=tinysrgb&w=400'
      },
      {
        id: 2,
        title: 'Independent Villa',
        location: 'Madhurawada, Visakhapatnam',
        price: '₹1.2 Cr',
        views: 189,
        inquiries: 8,
        status: 'active',
        image: 'https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg?auto=compress&cs=tinysrgb&w=400'
      },
      {
        id: 3,
        title: 'Commercial Plot',
        location: 'Dwaraka Nagar, Visakhapatnam',
        price: '₹65 Lakhs',
        views: 156,
        inquiries: 15,
        status: 'pending',
        image: 'https://images.pexels.com/photos/8293778/pexels-photo-8293778.jpeg?auto=compress&cs=tinysrgb&w=400'
      }
    ]);

    setRecentActivity([
      { id: 1, type: 'view', message: 'Your property "3BHK Luxury Apartment" was viewed', time: '2 hours ago' },
      { id: 2, type: 'inquiry', message: 'New inquiry for "Independent Villa"', time: '5 hours ago' },
      { id: 3, type: 'saved', message: '"Commercial Plot" was saved by a user', time: '1 day ago' },
      { id: 4, type: 'view', message: 'Your property "2BHK Sea View" was viewed', time: '1 day ago' },
      { id: 5, type: 'inquiry', message: 'New inquiry for "3BHK Luxury Apartment"', time: '2 days ago' }
    ]);
  }, []);

  const StatCard = ({ icon: Icon, title, value, change, color }) => (
    <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-gray-500 text-sm font-medium">{title}</p>
          <h3 className="text-3xl font-bold text-gray-800 mt-2">{value}</h3>
          {change && (
            <p className={`text-sm mt-2 ${change > 0 ? 'text-green-500' : 'text-red-500'}`}>
              {change > 0 ? '↑' : '↓'} {Math.abs(change)}% from last month
            </p>
          )}
        </div>
        <div className={`${color} p-4 rounded-full`}>
          <Icon className="w-8 h-8 text-white" />
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600 mt-2">Welcome back! Here's what's happening with your properties.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <StatCard
            icon={Home}
            title="Total Listings"
            value={stats.totalListings}
            color="bg-blue-500"
          />
          <StatCard
            icon={TrendingUp}
            title="Active Listings"
            value={stats.activeListings}
            color="bg-green-500"
          />
          <StatCard
            icon={Eye}
            title="Total Views"
            value={stats.totalViews.toLocaleString()}
            change={12}
            color="bg-orange-500"
          />
          <StatCard
            icon={Phone}
            title="Inquiries"
            value={stats.totalInquiries}
            change={8}
            color="bg-purple-500"
          />
          <StatCard
            icon={Heart}
            title="Saved by Users"
            value={stats.savedByUsers}
            color="bg-red-500"
          />
          <StatCard
            icon={TrendingUp}
            title="This Month Views"
            value={stats.monthlyViews.toLocaleString()}
            change={15}
            color="bg-indigo-500"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-md p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-900">Recent Listings</h2>
                <button
                  onClick={() => navigate('/vendor/manage-listings')}
                  className="text-orange-600 hover:text-orange-700 font-medium text-sm"
                >
                  View All →
                </button>
              </div>

              <div className="space-y-4">
                {recentListings.map((listing) => (
                  <div key={listing.id} className="flex items-center gap-4 p-4 border border-gray-200 rounded-lg hover:border-orange-300 transition-colors">
                    <img
                      src={listing.image}
                      alt={listing.title}
                      className="w-24 h-24 object-cover rounded-lg"
                    />
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900">{listing.title}</h3>
                      <p className="text-sm text-gray-600">{listing.location}</p>
                      <p className="text-orange-600 font-bold mt-1">{listing.price}</p>
                    </div>
                    <div className="text-right">
                      <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${
                        listing.status === 'active' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                      }`}>
                        {listing.status}
                      </span>
                      <div className="flex items-center gap-4 mt-3 text-sm text-gray-600">
                        <span className="flex items-center gap-1">
                          <Eye className="w-4 h-4" />
                          {listing.views}
                        </span>
                        <span className="flex items-center gap-1">
                          <Phone className="w-4 h-4" />
                          {listing.inquiries}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-md p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Recent Activity</h2>
              <div className="space-y-4">
                {recentActivity.map((activity) => (
                  <div key={activity.id} className="flex items-start gap-3 pb-4 border-b border-gray-100 last:border-0">
                    <div className={`p-2 rounded-full ${
                      activity.type === 'inquiry' ? 'bg-orange-100' :
                      activity.type === 'view' ? 'bg-blue-100' : 'bg-red-100'
                    }`}>
                      {activity.type === 'inquiry' ? <Phone className="w-4 h-4 text-orange-600" /> :
                       activity.type === 'view' ? <Eye className="w-4 h-4 text-blue-600" /> :
                       <Heart className="w-4 h-4 text-red-600" />}
                    </div>
                    <div className="flex-1">
                      <p className="text-sm text-gray-800">{activity.message}</p>
                      <p className="text-xs text-gray-500 mt-1">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 bg-gradient-to-r from-orange-500 to-orange-600 rounded-xl shadow-md p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-xl font-bold">Ready to add more properties?</h3>
              <p className="text-orange-100 mt-1">Reach more buyers by listing your properties with us</p>
            </div>
            <button
              onClick={() => navigate('/post-property')}
              className="bg-white text-orange-600 px-6 py-3 rounded-full font-semibold hover:bg-gray-100 transition-colors"
            >
              Post New Property
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
