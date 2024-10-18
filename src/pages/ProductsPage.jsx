import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const ProductsPage = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch("https://dummyjson.com/products")
      .then((res) => res.json())
      .then((data) => setProducts(data.products));
  }, []);

  return (
    <div className="container">
      <h1>Products</h1>
      <div className="product-grid">
        {products.map((product) => (
          <div className="product-card" key={product.id}>
            <img src={product.thumbnail} alt={product.title} />
            <div className="product-card-body">
              <h2 className="product-title">{product.title}</h2>
              <p className="product-price">${product.price}</p>
              <Link to={`/products/${product.id}`} className="view-details">
                View Details
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductsPage;
