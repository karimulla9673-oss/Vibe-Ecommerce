import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import CartItem from './CartItem';
import './Cart.css';

const Cart = () => {
  const { cart } = useCart();
  const navigate = useNavigate();

  if (!cart || !cart.items || cart.items.length === 0) {

    return (
      <div className="empty-cart">
        <div className="empty-cart-icon">🛒</div>
        <h2>Your cart is empty</h2>
        <p>Add some products to get started!</p>
        <button 
          className="btn btn-primary"
          onClick={() => navigate('/')}
        >
          Browse Products
        </button>
      </div>
    );
  }

  return (
    <div className="cart-container">
      <div className="cart-items">
        <h2 className="cart-title">Shopping Cart ({cart.items.length} items)</h2>
        {cart.items.map((item) => (
          <CartItem key={item._id} item={item} />
        ))}
      </div>

      <div className="cart-summary">
        <h3 className="summary-title">Order Summary</h3>
        
        <div className="summary-row">
          <span>Subtotal</span>
          <span>{cart.totalAmount.toFixed(2)}</span>
        </div>
        
        <div className="summary-row">
          <span>Shipping</span>
          <span className="free-shipping">FREE</span>
        </div>
        
        <div className="summary-row">
          <span>Tax (10%)</span>
          <span>{(cart.totalAmount * 0.1).toFixed(2)}</span>
        </div>
        
        <div className="summary-divider"></div>
        
        <div className="summary-row summary-total">
          <span>Total</span>
          <span>{(cart.totalAmount * 1.1).toFixed(2)}</span>
        </div>

        <button
          className="btn btn-primary checkout-btn"
          onClick={() => navigate('/checkout')}
        >
          Proceed to Checkout →
        </button>
        
        <button
          className="btn btn-secondary continue-shopping-btn"
          onClick={() => navigate('/')}
        >
          Continue Shopping
        </button>
      </div>
    </div>
  );
};

export default Cart;