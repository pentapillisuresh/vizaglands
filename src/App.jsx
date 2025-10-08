import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Properties from "./pages/Properties";
import PropertyDetail from "./pages/PropertyDetail";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/properties/:categorySlug" element={<Properties />} />
        <Route path="/property/:id" element={<PropertyDetail />} />
      </Routes>
    </Router>
  );
}

export default App;
