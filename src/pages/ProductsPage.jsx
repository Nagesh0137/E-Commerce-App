import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Pagination from "../components/pagination";
import Skeleton from "react-loading-skeleton"; // Import skeleton loader
import "react-loading-skeleton/dist/skeleton.css"; // Skeleton loader styles
import "./product_page_style.css";

// Extracted Error and Loading Components for Better Organization
const ErrorComponent = ({ error }) => (
  <div className="error-container">
    <h2>Error: {error}</h2>
    <p>There was an issue fetching the products. Please try again later.</p>
  </div>
);

const LoadingSkeleton = ({ count }) => (
  <div className="loading-container">
    <h2>Loading Products...</h2>
    <div className="product-grid">
      {[...Array(count)].map((_, index) => (
        <div className="product-card" key={index}>
          <Skeleton height={200} width={300} />
          <div className="product-card-body">
            <Skeleton height={20} width={150} />
            <Skeleton height={15} width={100} />
            <Skeleton height={30} width={80} />
          </div>
        </div>
      ))}
    </div>
  </div>
);

const ProductsPage = () => {
  // Destructured states for cleaner code
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const productsPerPage = 10;

  // Fetch products from the API
  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const res = await fetch("https://dummyjson.com/products");
        if (!res.ok) throw new Error("Failed to fetch products.");
        const data = await res.json();
        setProducts(data.products);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Calculate the number of pages
  const totalPages = Math.ceil(products.length / productsPerPage);

  // the products for the current page
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = products.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  // Change page with pagination
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Render loading state
  if (loading) {
    return <LoadingSkeleton count={productsPerPage} />;
  }

  // Render error state
  if (error) {
    return <ErrorComponent error={error} />;
  }

  return (
    <div className="container">
      <h1>Products</h1>

      {/* Display current products */}
      <div className="product-grid">
        {currentProducts.map((product) => (
          <div
            className="product-card"
            data-aos="zoom-in-up"
            data-aos-duration="1200"
            key={product.id}
          >
            <img src={product.thumbnail} alt={product.title} />
            <div className="product-card-body">
              <h2 className="product-title">{product.title}</h2>
              <p className="product-price">${product.price}</p>
              <Link to={`/products/${product.id}`} className="view-btn badge">
                <button>View Details</button>
              </Link>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <Pagination
        totalPages={totalPages}
        currentPage={currentPage}
        paginate={paginate}
      />
    </div>
  );
};

export default ProductsPage;
