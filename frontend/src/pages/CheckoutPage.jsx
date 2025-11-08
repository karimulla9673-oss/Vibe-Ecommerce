// Checkout page component for Vibe Commerce
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import CheckoutForm from '../components/CheckoutForm';
import ReceiptModal from '../components/ReceiptModal';
import { checkout } from '../services/api';
import { formatINR } from '../utils/currency';
import toast from 'react-hot-toast';
import './CheckoutPage.css';

const CheckoutPage = () => {
  const { cart, refreshCart, userId } = useCart();
  const navigate = useNavigate();
  const [isProcessing, setIsProcessing] = useState(false);
  const [receipt, setReceipt] = useState(null);

  if (!cart || cart.items.length === 0) {
    navigate('/cart');
    return null;
  }

  const handleCheckout = async () => {
    setIsProcessing(true);
    try {
      const cartItems = cart.items.map(item => ({
        productId: item.productId._id,
        name: item.productId.name,
        price: item.productId.price,
        quantity: item.quantity,
      }));

      // Generate mock receipt directly
      const mockReceipt = {
        orderNumber: `ORD-${Date.now()}-${Math.random().toString(36).substr(2, 9).toUpperCase()}`,
        orderDate: new Date().toISOString(),
        items: cartItems,
        subtotal: cart.totalAmount,
        tax: cart.totalAmount * 0.1,
        totalAmount: cart.totalAmount * 1.1,
        paymentStatus: 'Paid',
        paymentMethod: 'Card',
        timestamp: new Date().toISOString()
      };

      setReceipt(mockReceipt);
      await refreshCart();
      toast.success('Bill generated successfully!');
    } catch (error) {
      console.error('Checkout error:', error);
      toast.error('Failed to generate bill. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleCloseReceipt = () => {
    setReceipt(null);
    navigate('/');
  };

  return (
    <div className="checkout-page">
      <div className="checkout-container">
        <div className="order-summary">
          <h1 className="checkout-title">Order Summary</h1>
          
          <div className="summary-items">
            {cart.items.map(item => (
              <div key={item._id} className="summary-item">
                <img src={item.productId.image} alt={item.productId.name} />
                <div className="summary-item-info">
                  <p className="summary-item-name">{item.productId.name}</p>
                  <p className="summary-item-qty">Qty: {item.quantity}</p>
                </div>
                <span className="summary-item-price">
                  {formatINR(item.productId.price * item.quantity)}
                </span>
              </div>
            ))}
          </div>

          <div className="summary-totals">
            <div className="summary-row">
              <span>Subtotal</span>
              <span>{formatINR(cart.totalAmount)}</span>
            </div>
            <div className="summary-row">
              <span>Shipping</span>
              <span className="free-text">FREE</span>
            </div>
            <div className="summary-row">
              <span>Tax (10%)</span>
              <span>{formatINR(cart.totalAmount * 0.1)}</span>
            </div>
            <div className="summary-divider"></div>
            <div className="summary-row summary-total">
              <span>Total</span>
              <span>{formatINR(cart.totalAmount * 1.1)}</span>
            </div>
          </div>

          <button
            onClick={handleCheckout}
            className="btn btn-primary proceed-btn"
            disabled={isProcessing}
          >
            {isProcessing ? 'Generating Bill...' : 'Generate Bill'}
          </button>
        </div>
      </div>

      {receipt && (
        <ReceiptModal receipt={receipt} onClose={handleCloseReceipt} />
      )}
    </div>
  );
};

export default CheckoutPage;