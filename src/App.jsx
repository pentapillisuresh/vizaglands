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
          <Route path="/select-user-type" element={<SelectUserType />} />
          <Route path="/post-property" element={<PostProperty />} />
          <Route path="/properties/:categorySlug" element={<Properties />} />
          <Route path="/property/:id" element={<PropertyDetail />} />
        </Routes>

   
        <Footer />
      </Router>
    </AuthProvider>
  );
}

export default App;
