import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ProductsPage from "./pages/ProductsPage";
import ProductDetailPage from "./pages/ProductDetailPage";
import "./App.css";
import Navbar from "./components/navbar";
function App() {
  return (
    <Router>
      <Navbar></Navbar>
      <Routes>
        <Route path="/" element={<ProductsPage />} />
        <Route path="/products/:productId" element={<ProductDetailPage />} />
      </Routes>
    </Router>
  );
}

export default App;
