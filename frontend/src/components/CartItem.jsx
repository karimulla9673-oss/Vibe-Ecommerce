import { useState } from 'react';
import { useCart } from '../context/CartContext';
import { formatINR } from '../utils/currency';
import './CartItem.css';

const CartItem = ({ item }) => {
  const { updateCartItem, removeFromCart } = useCart();
  const [isUpdating, setIsUpdating] = useState(false);

  const handleQuantityChange = async (newQuantity) => {
    if (newQuantity < 1) return;
    setIsUpdating(true);
    await updateCartItem(item._id, newQuantity);
    setIsUpdating(false);
  };

  const handleRemove = async () => {
    setIsUpdating(true);
    await removeFromCart(item._id);
  };

  if (!item.productId) return null;

  const subtotal = item.productId.price * item.quantity;

  return (
    <div className="cart-item">
      <img 
        src={item.productId.image} 
        alt={item.productId.name}
        className="cart-item-image"
      />
      
      <div className="cart-item-details">
        <h3 className="cart-item-name">{item.productId.name}</h3>
        <p className="cart-item-category">{item.productId.category}</p>
        <p className="cart-item-price">{formatINR(item.productId.price)} each</p>
      </div>

      <div className="cart-item-actions">
        <div className="quantity-controls">
          <button
            className="quantity-btn"
            onClick={() => handleQuantityChange(item.quantity - 1)}
            disabled={isUpdating || item.quantity <= 1}
          >
            −
          </button>
          <span className="quantity-display">{item.quantity}</span>
          <button
            className="quantity-btn"
            onClick={() => handleQuantityChange(item.quantity + 1)}
            disabled={isUpdating}
          >
            +
          </button>
        </div>

        <div className="cart-item-subtotal">
          <span className="subtotal-label">Subtotal:</span>
          <span className="subtotal-amount">{formatINR(subtotal)}</span>
        </div>

        <button
          className="btn btn-danger remove-btn"
          onClick={handleRemove}
          disabled={isUpdating}
        >
          🗑️ Remove
        </button>
      </div>
    </div>
  );
};

export default CartItem;