import { Link } from "react-router-dom";

const ProductCard = ({ product }) => {
  return (
    <div className="product-card">
      <img src={product.thumbnail} alt={product.title} />
      <h3>{product.title}</h3>
      <p>Price: ${product.price}</p>
      <Link to={`/products/${product.id}`}>View Details</Link>
    </div>
  );
};

export default ProductCard;
