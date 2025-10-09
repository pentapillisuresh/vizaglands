import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import Home from './pages/Home';
import SelectUserType from './pages/SelectUserType';
import PostProperty from './pages/PostProperty';
import Properties from './pages/Properties';
import PropertyDetail from './pages/PropertyDetail';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/select-user-type" element={<SelectUserType />} />
          <Route path="/post-property" element={<PostProperty />} />
          <Route path="/properties/:categorySlug" element={<Properties />} />
          <Route path="/property/:id" element={<PropertyDetail />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
