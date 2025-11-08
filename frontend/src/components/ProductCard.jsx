import { useState } from 'react';
import { useCart } from '../context/CartContext';
import { formatINR } from '../utils/currency';
import './ProductCard.css';

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();
  const [isAdding, setIsAdding] = useState(false);

  const handleAddToCart = async () => {
    setIsAdding(true);
    await addToCart(product._id);
    setIsAdding(false);
  };

  return (
    <div className="product-card">
      <div className="product-image-wrapper">
        <img 
          src={product.image} 
          alt={product.name}
          className="product-image"
        />
        {product.stock < 20 && (
          <span className="stock-badge">Only {product.stock} left!</span>
        )}
      </div>
      
      <div className="product-info">
        <span className="product-category">{product.category}</span>
        <h3 className="product-name">{product.name}</h3>
        <p className="product-description">{product.description}</p>
        
        <div className="product-footer">
          <span className="product-price">{formatINR(product.price)}</span>
          <button 
            className="btn btn-primary add-to-cart-btn"
            onClick={handleAddToCart}
            disabled={isAdding || product.stock === 0}
          >
            {isAdding ? '➕ Adding...' : '🛒 Add to Cart'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;