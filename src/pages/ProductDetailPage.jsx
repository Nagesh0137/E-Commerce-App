import React, { useState, useEffect } from "react";
import { FaShoppingCart, FaArrowLeft, FaTag, FaStar, FaTags, FaPercentage } from "react-icons/fa";
import { Link, useParams } from "react-router-dom";
import Skeleton from "react-loading-skeleton"; // Skeleton loader for loading effect
import 'react-loading-skeleton/dist/skeleton.css'; // Skeleton loader styles
import "./product_detail.css";

// Error component for better code organization
const ErrorComponent = ({ message }) => (
  <div className="error" style={{ textAlign: 'center', color: 'red' }}>
    {message === "Product not found" ? "The requested product could not be found." : message}
  </div>
);

// Skeleton loader component to show while data is loading
const SkeletonLoader = () => (
  <div className="skeleton-container">
    <div className="row d-flex justify-content-center">
      <div className="col-md-10">
        <div className="card">
          <div className="row">
            <div className="col-md-6">
              <div className="images p-3">
                <div className="text-center p-4">
                  <Skeleton height={250} width={250} />
                </div>
                <div className="thumbnail text-center">
                  {[...Array(4)].map((_, index) => (
                    <Skeleton key={index} height={70} width={70} className="shadow-sm rounded mx-1" />
                  ))}
                </div>
              </div>
            </div>
            <div className="col-md-6">
              <div className="product p-4 h-100">
                <Skeleton width={200} height={30} />
                <Skeleton width={300} height={20} />
                <Skeleton width={100} height={20} />
                <Skeleton width={250} height={40} />
                <Skeleton width={100} height={40} />
                <Skeleton count={3} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

const ProductDetailPage = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [mainImage, setMainImage] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch product data using useEffect
  useEffect(() => {
    if (!productId) {
      setError("Invalid product ID");
      setLoading(false);
      return;
    }

    fetch(`https://dummyjson.com/products/${productId}`)
      .then((res) => {
        if (res.status === 404) {
          throw new Error("Product not found");
        }
        return res.json();
      })
      .then((data) => {
        setProduct(data);
        setMainImage(data.images ? data.images[0] : "");
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [productId]);

  const changeImage = (src) => {
    setMainImage(src);
  };

  // Display loading skeleton
  if (loading) {
    return <SkeletonLoader />;
  }

  // Display error message if any
  if (error) {
    return <ErrorComponent message={error} />;
  }

  // Display if no product data is available
  if (!product) {
    return <div>No product details available</div>;
  }

  return (
    <div className="container mt-5 mb-5 p-0">
      <div className="row d-flex justify-content-center">
        <div className="col-md-10">
          <div className="card">
            <div className="row">
              <div className="col-md-6">
                <div className="images p-3">
                  {/* Display discount badge if applicable */}
                  {product.discountPercentage && (
                    <div className="discount-badge">
                      {product.discountPercentage}% OFF
                    </div>
                  )}
                  <div className="text-center p-4">
                    <img id="main-image" src={mainImage} width="250" alt="Main product" />
                  </div>
                  <div className="thumbnail text-center">
                    {/* Display product images */}
                    {product.images?.map((image, index) => (
                      <img
                        key={index}
                        onClick={() => changeImage(image)}
                        src={image}
                        style={{ aspectRatio: "2/2", objectFit: "contain" }}
                        className="shadow-sm rounded"
                        width="70"
                        alt={`Thumbnail ${index + 1}`}
                      />
                    ))}
                  </div>
                </div>
              </div>
              <div className="col-md-6">
                <div className="product p-4 h-100">
                  <div className="d-flex justify-content-between align-items-center">
                    <Link to="/" className="text-black fw-bold text-decoration-none">
                      <FaArrowLeft /><span className="ms-1">Back</span>
                    </Link>
                    <FaShoppingCart className="text-muted global-color" />
                  </div>
                  <div className="mt-4 mb-3">
                    <span className="text-uppercase text-muted brand"> {product.brand}</span>
                    <h5 className="text-uppercase"> {product.title}</h5>
                    <div className="price d-flex flex-row align-items-center">
                      <span className="act-price"><FaTag className="global-color" /> ${product.price}</span>
                      <sub className="ms-2 text-decoration-line-through">
                        ${(product.price / (1 - product.discountPercentage / 100)).toFixed(2)}
                      </sub>
                    </div>
                    <div className="rating mt-2">
                      <FaStar style={{ color: '#ffc107' }} /> {product.rating}/5
                    </div>
                    <div className="category mt-2">
                      <FaTags className="global-color" /> {product.category}
                    </div>
                  </div>
                  <p className="about">{product.description}</p>
                  <div className="cart mt-4">
                    <button className="btn add-cart text-uppercase mr-2 px-4 badge p-2">Add to cart</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;
