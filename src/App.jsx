import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { useState } from 'react';
import Header from './components/Header';  // import here to use globally
import Home from './pages/Home';
import SelectUserType from './pages/SelectUserType';
import PostProperty from './pages/PostProperty';
import Properties from './pages/Properties';
import PropertyDetail from './pages/PropertyDetail';
import About from './pages/About';
import Contact from './pages/Contact';
import Footer from './components/Footer';
import LoginForm from './components/LoginForm';
import RegisterForm from './components/RegisterForm';
import Dashboard from './pages/vendor/Dashboard';
import ManageListings from './pages/vendor/ManageListings';
import Analytics from './pages/vendor/Analytics';
import Profile from './pages/vendor/Profile';
import Leads from './pages/vendor/Leads';
import Blog from './pages/Blog';
import ClientPropertyDetail from './pages/ClientPropertyDetail';

function App() {


  return (
    <AuthProvider>
      <Router>
        {/* Header is global so Get Started works from any page */}
        <Header />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login-register" element={<LoginForm />} />
          <Route path="/register" element={<RegisterForm />} />

          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path='/blog' element={<Blog />} />
          <Route path="/select-user-type" element={<SelectUserType />} />
          <Route path="/post-property" element={<PostProperty />} />
          <Route path="/properties-list/" element={<Properties />} />
          <Route path="/property/:id" element={<PropertyDetail />} />
          <Route path="/Client/property/:id" element={<ClientPropertyDetail />} />
          <Route path="/vendor/dashboard" element={<Dashboard />} />
          <Route path="/vendor/manage-listings" element={<ManageListings />} />
          <Route path="/vendor/analytics" element={<Analytics />} />
          <Route path="/vendor/profile" element={<Profile />} />
          <Route path="/vendor/leads" element={<Leads />} />

        </Routes>
        <Footer />
      </Router>
    </AuthProvider>
  );
}

export default App;
