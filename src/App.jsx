import { HashRouter as Router, Routes, Route } from "react-router-dom";
import ProductsPage from "./pages/ProductsPage";
import ProductDetailPage from "./pages/ProductDetailPage";
import 'bootstrap/dist/css/bootstrap.min.css';
import AOS from 'aos';
import 'aos/dist/aos.css';
import "./App.css";

import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import { useEffect } from "react";
function App() {
  useEffect(()=>{
    AOS.init();
  })
  return (
    <Router>
      <Navbar></Navbar>
      <Routes>
        <Route path="/" element={<ProductsPage />} />
        <Route path="/products/:productId" element={<ProductDetailPage />} />
      </Routes>
      <Footer></Footer>
    </Router>
  );
}

export default App;
