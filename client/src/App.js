import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ProductListPage from './pages/ProductListPage';
import AddProductPage from './pages/AddProductPage';
import AllProducts from './pages/AllProducts';
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<AllProducts />} />
        <Route path="/add" element={<AddProductPage />} />
        <Route path="/admin" element={<ProductListPage />} />
      </Routes>
    </Router>
  );
}

export default App;
