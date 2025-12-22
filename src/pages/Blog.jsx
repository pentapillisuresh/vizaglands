// function Blog() {
//   const blogPosts = [
//     {
//       id: 1,
//       category: "Investment",
//       title: "Top Strategies for Real Estate Investors in 2025",
//       excerpt:
//         "Discover emerging markets, new financing options, and data-driven investment strategies helping smart investors maximize returns in today’s evolving real estate landscape.",
//       date: "October 15, 2025",
//       readTime: "6 min read",
//     },
//     {
//       id: 2,
//       category: "Architecture",
//       title: "Modern Home Designs that Define Urban Living",
//       excerpt:
//         "Explore cutting-edge architectural trends, from sustainable materials to open-space layouts that blend luxury with eco-conscious design in today’s metropolitan homes.",
//       date: "October 12, 2025",
//       readTime: "5 min read",
//     },
//     {
//       id: 3,
//       category: "Market Trends",
//       title: "How Smart Cities Are Shaping Real Estate Growth",
//       excerpt:
//         "Learn how smart infrastructure, IoT integration, and urban innovation are driving property value appreciation and transforming how we live and invest in cities.",
//       date: "October 10, 2025",
//       readTime: "7 min read",
//     },
//     {
//       id: 4,
//       category: "Property Management",
//       title: "Effective Ways to Manage Rental Properties",
//       excerpt:
//         "A practical guide for landlords and property managers on improving occupancy rates, maintaining tenant satisfaction, and ensuring consistent rental income through smart management tools.",
//       date: "October 8, 2025",
//       readTime: "6 min read",
//     },
//     {
//       id: 5,
//       category: "Luxury Real Estate",
//       title: "The Rise of Premium Villas and Waterfront Homes",
//       excerpt:
//         "Get insights into the growing demand for luxury villas, beachfront properties, and gated communities among high-net-worth individuals and NRIs across India.",
//       date: "October 5, 2025",
//       readTime: "5 min read",
//     },
//     {
//       id: 6,
//       category: "Real Estate Tech",
//       title: "How PropTech is Transforming the Housing Market",
//       excerpt:
//         "From virtual tours to AI-driven valuations, discover how technology is simplifying property buying, selling, and management processes in the digital real estate era.",
//       date: "October 3, 2025",
//       readTime: "6 min read",
//     },
//   ];

//   const featuredPost = {
//     category: "Featured",
//     title: "Building the Future of Real Estate",
//     excerpt:
//       "Explore how innovation, sustainability, and smart planning are reshaping the real estate industry. Learn how visionary developers and investors are creating the cities of tomorrow.",
//     date: "October 16, 2025",
//     readTime: "10 min read",
//   };

//   return (
//     <div className="min-h-screen bg-white">
//       {/* Hero Section */}


// <section
//   className="relative bg-cover bg-center bg-no-repeat text-white h-[500px]"
//   style={{
//     backgroundImage: `url('./images/blog.jpeg')`
//     // ← replace with the URL you pick
//   }}
// >
//   {/* Overlay to darken background for better text contrast */}
//   <div className="absolute inset-0 bg-black bg-opacity-50"></div>

//   <div className="relative z-10 flex items-center justify-center h-full px-4 sm:px-6 lg:px-8">
//     <div className="max-w-4xl text-center">
//       <span className="inline-block bg-orange-500 text-white px-4 py-1.5 rounded-full text-sm font-medium mb-6">
//         Welcome to Realty Insights
//       </span>
//       <h2 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
//         Discover Real Estate Stories That Inspire
//       </h2>
//       <p className="text-xl text-gray-300 leading-relaxed">
//         Explore expert opinions, property market trends, and success stories that shape the future of real estate across residential, commercial, and industrial sectors.
//       </p>
//     </div>
//   </div>
// </section>


//       {/* Featured Article */}
//       <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-16 relative z-10">
//         <div className="bg-white rounded-2xl shadow-2xl overflow-hidden border border-gray-100 hover:shadow-3xl transition-shadow duration-300">
//           <div className="md:flex">
//             <div className="md:w-1/2 bg-gradient-to-br from-slate-800 to-slate-900 p-12 flex items-center justify-center">
//               <div className="text-center">
//                 <span className="inline-block bg-orange-500 text-white px-4 py-1.5 rounded-full text-sm font-medium mb-4">
//                   {featuredPost.category}
//                 </span>
//                 <div className="text-6xl font-bold text-white mb-2">Featured</div>
//                 <div className="text-2xl text-orange-500 font-semibold">Property</div>
//               </div>
//             </div>
//             <div className="md:w-1/2 p-12">
//               <span className="inline-block bg-slate-100 text-slate-800 px-3 py-1 rounded-full text-sm font-medium mb-4">
//                 {featuredPost.category}
//               </span>
//               <h3 className="text-3xl font-bold text-slate-900 mb-4 leading-tight">
//                 {featuredPost.title}
//               </h3>
//               <p className="text-gray-600 mb-6 leading-relaxed text-lg">
//                 {featuredPost.excerpt}
//               </p>
//               <div className="flex items-center justify-between">
//                 <div className="flex items-center space-x-4 text-sm text-gray-500">
//                   <span>{featuredPost.date}</span>
//                   <span>•</span>
//                   <span>{featuredPost.readTime}</span>
//                 </div>
//                 <button className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2.5 rounded-lg font-medium transition-all duration-300">
//                   Read More
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* Blog Grid */}
//       <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
//         <div className="text-center mb-16">
//           <h2 className="text-4xl md:text-4xl font-bold text-slate-900 mb-4">
//             Latest Real Estate Articles
//           </h2>
//           <p className="text-xl text-gray-600 max-w-2xl mx-auto">
//             Stay informed with expert-written blogs covering investment insights,
//             architectural trends, and property management tips.
//           </p>
//         </div>

//         <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
//           {blogPosts.map((post) => (
//             <article
//               key={post.id}
//               className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100 hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 flex flex-col"
//             >
//               <div className="bg-gradient-to-br from-slate-800 to-slate-900 h-48 flex items-center justify-center">
//                 <div className="text-center">
//                   <div className="text-4xl font-bold text-white mb-1">Property</div>
//                   <div className="text-lg text-orange-500 font-semibold">
//                     {post.category}
//                   </div>
//                 </div>
//               </div>
//               <div className="p-6 flex-1 flex flex-col">
//                 <span className="inline-block bg-orange-50 text-orange-600 px-3 py-1 rounded-full text-sm font-medium mb-3 self-start">
//                   {post.category}
//                 </span>
//                 <h3 className="text-2xl font-bold text-slate-900 mb-3 leading-tight">
//                   {post.title}
//                 </h3>
//                 <p className="text-gray-600 mb-6 leading-relaxed flex-1">
//                   {post.excerpt}
//                 </p>
//                 <div className="flex items-center justify-between pt-4 border-t border-gray-100">
//                   <div className="text-sm text-gray-500">
//                     <div>{post.date}</div>
//                     <div className="text-xs mt-1">{post.readTime}</div>
//                   </div>
//                   <button className="text-orange-500 hover:text-orange-600 font-semibold transition-colors duration-300">
//                     Read More →
//                   </button>
//                 </div>
//               </div>
//             </article>
//           ))}
//         </div>
//       </section>

//       {/* Newsletter Section */}
//       <section className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 py-20">
//         <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
//           <h2 className="text-4xl md:text-4xl font-bold text-white mb-6">
//             Stay Ahead in Real Estate
//           </h2>
//           <p className="text-xl text-gray-300 mb-10 leading-relaxed">
//             Subscribe to our newsletter and get expert insights, investment trends, and
//             property news straight to your inbox.
//           </p>
//           <div className="flex flex-col sm:flex-row gap-4 max-w-xl mx-auto">
//             <input
//               type="email"
//               placeholder="Enter your email address"
//               className="flex-1 px-6 py-4 rounded-lg text-gray-900 focus:outline-none focus:ring-4 focus:ring-orange-500 transition-all"
//             />
//             <button className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-4 rounded-lg font-semibold transition-all duration-300 shadow-lg hover:shadow-xl">
//               Subscribe Now
//             </button>
//           </div>
//         </div>
//       </section>


//     </div>
//   );
// }

// export default Blog;


import { useEffect, useState } from "react";
import axios from "axios";
import ApiService from "../hooks/ApiService";

export default function Blog() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedBlog, setSelectedBlog] = useState(null);

  // Fetch blogs from API
  const fetchBlogs = async () => {
    try {
      const adminToken = localStorage.getItem('token');
      const res = await ApiService.get("/blogs", {
        headers: {
          Authorization: `Bearer ${adminToken}`,
          'Content-Type': 'application/json',
        },
      });
      setBlogs(res.blogs);
    } catch (err) {
      console.error("Error fetching blogs:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section
        className="relative bg-cover bg-center bg-no-repeat text-white h-[500px]"
        style={{
          backgroundImage: `url('./images/blog.jpeg')`,
        }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>

        <div className="relative z-10 flex items-center justify-center h-full px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl text-center">
            <span className="inline-block bg-orange-500 text-white px-4 py-1.5 rounded-full text-sm font-medium mb-6">
              Welcome to Realty Insights
            </span>
            <h2 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              Discover Real Estate Stories That Inspire
            </h2>
            <p className="text-xl text-gray-300 leading-relaxed">
              Explore expert opinions, property market trends, and success stories that
              shape the future of real estate across residential, commercial, and
              industrial sectors.
            </p>
          </div>
        </div>
      </section>

      {/* Blog Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-4xl font-bold text-slate-900 mb-4">
            Latest Real Estate Articles
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Stay informed with expert-written blogs covering investment insights,
            architectural trends, and property management tips.
          </p>
        </div>

        {loading ? (
          <p className="text-center text-gray-500 text-lg">Loading blogs...</p>
        ) : blogs.length === 0 ? (
          <p className="text-center text-gray-400 text-lg">No blogs available</p>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogs.map((blog) => (
              <article
                key={blog.id}
                className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100 hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 flex flex-col"
              >
                <div className="h-48 overflow-hidden bg-gray-100">
                  {blog.photo ? (
                    <img
                      src={blog.photo}
                      alt={blog.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="flex items-center justify-center h-full bg-gradient-to-br from-slate-800 to-slate-900 text-white text-2xl font-bold">
                      No Image
                    </div>
                  )}
                </div>
                <div className="p-6 flex-1 flex flex-col">
                  <span className="inline-block bg-orange-50 text-orange-600 px-3 py-1 rounded-full text-sm font-medium mb-3 self-start capitalize">
                    {blog.status}
                  </span>
                  <h3 className="text-2xl font-bold text-slate-900 mb-3 leading-tight">
                    {blog.name}
                  </h3>
                  <p className="text-gray-600 mb-6 leading-relaxed flex-1 line-clamp-3">
                    {blog.description || "No description available."}
                  </p>
                  <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                    <div className="text-sm text-gray-500">
                      {new Date(blog.createdAt).toLocaleDateString()}
                    </div>
                    <button
                      onClick={() => setSelectedBlog(blog)}
                      className="text-orange-500 hover:text-orange-600 font-semibold transition-colors duration-300"
                    >
                      Read More →
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>

      {/* Newsletter Section */}
      <section className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-4xl font-bold text-white mb-6">
            Stay Ahead in Real Estate
          </h2>
          <p className="text-xl text-gray-300 mb-10 leading-relaxed">
            Subscribe to our newsletter and get expert insights, investment trends, and
            property news straight to your inbox.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-xl mx-auto">
            <input
              type="email"
              placeholder="Enter your email address"
              className="flex-1 px-6 py-4 rounded-lg text-gray-900 focus:outline-none focus:ring-4 focus:ring-orange-500 transition-all"
            />
            <button className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-4 rounded-lg font-semibold transition-all duration-300 shadow-lg hover:shadow-xl">
              Subscribe Now
            </button>
          </div>
        </div>
      </section>

      {/* Blog Details Popup */}
      {selectedBlog && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-3xl w-full p-6 overflow-y-auto max-h-[90vh] relative">
            <button
              onClick={() => setSelectedBlog(null)}
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 text-xl"
            >
              ✕
            </button>

            <div className="mb-6">
              {selectedBlog.photo && (
                <img
                  src={selectedBlog.photo}
                  alt={selectedBlog.name}
                  className="w-full h-64 object-cover rounded-lg"
                />
              )}
            </div>

            <h2 className="text-3xl font-bold text-slate-900 mb-3">
              {selectedBlog.name}
            </h2>
            <p className="text-sm text-gray-500 mb-2">
              Published on {new Date(selectedBlog.createdAt).toLocaleDateString()}
            </p>
            <p className="text-gray-600 mb-6">{selectedBlog.description}</p>

            <div
              className="prose prose-slate max-w-none"
              dangerouslySetInnerHTML={{ __html: selectedBlog.content }}
            />

            <div className="mt-8 text-right">
              <button
                onClick={() => setSelectedBlog(null)}
                className="px-5 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-lg font-medium transition-all"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
