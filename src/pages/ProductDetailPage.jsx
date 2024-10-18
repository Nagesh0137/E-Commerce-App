import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const ProductDetailPage = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    fetch(`https://dummyjson.com/products/${productId}`)
      .then((res) => res.json())
      .then((data) => setProduct(data));
  }, [productId]);

  if (!product) return <div>Loading...</div>;

  return (
    <div className="container">
      <div className="product-details">
        <img src={product.images[0]} alt={product.title} />
        <div className="product-info">
          <h1>{product.title}</h1>
          <p>{product.description}</p>
          <p className="product-price">${product.price}</p>
          {product.discountPercentage && (
            <p className="product-discount">
              Discount: {product.discountPercentage}%
            </p>
          )}
          <p className="product-rating">Rating: {product.rating}/5</p>
          <p>Brand: {product.brand}</p>
          <p>Category: {product.category}</p>
          <button className="buy-now-btn">Buy Now</button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;
