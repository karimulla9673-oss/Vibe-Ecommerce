import { useNavigate } from 'react-router-dom';
import { formatINR } from '../utils/currency';
import './ReceiptModal.css';

const ReceiptModal = ({ receipt, onClose }) => {
  const navigate = useNavigate();

  const handleContinueShopping = () => {
    onClose();
    navigate('/');
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="receipt-header">
          <div className="success-icon">✓</div>
          <h2>Order Confirmed!</h2>
          <p>Thank you for your purchase</p>
        </div>

        <div className="receipt-body">
          <div className="receipt-section">
            <h3>Order Details</h3>
            <div className="receipt-row">
              <span>Order Number:</span>
              <span className="order-number">{receipt.orderNumber}</span>
            </div>
            <div className="receipt-row">
              <span>Order Date:</span>
              <span>{new Date(receipt.orderDate).toLocaleString()}</span>
            </div>
            <div className="receipt-row">
              <span>Estimated Delivery:</span>
              <span>{new Date(receipt.estimatedDelivery).toLocaleDateString()}</span>
            </div>
          </div>

          <div className="receipt-section">
            <h3>Customer Information</h3>
            <div className="receipt-row">
              <span>Name:</span>
              <span>{receipt.customerName}</span>
            </div>
            <div className="receipt-row">
              <span>Email:</span>
              <span>{receipt.customerEmail}</span>
            </div>
          </div>

          <div className="receipt-section">
            <h3>Items Ordered</h3>
            {receipt.items.map((item, index) => (
              <div key={index} className="receipt-item">
                <div className="receipt-item-info">
                  <span className="item-name">{item.name}</span>
                  <span className="item-qty">Qty: {item.quantity}</span>
                </div>
                <span className="item-price">{formatINR(item.price * item.quantity)}</span>
              </div>
            ))}
          </div>

          <div className="receipt-totals">
            <div className="receipt-row">
              <span>Subtotal:</span>
              <span>{formatINR(receipt.subtotal)}</span>
            </div>
            <div className="receipt-row">
              <span>Shipping:</span>
              <span>{receipt.shipping === 0 ? 'FREE' : formatINR(receipt.shipping)}</span>
            </div>
            <div className="receipt-row">
              <span>Tax (10%):</span>
              <span>{formatINR(receipt.tax)}</span>
            </div>
            <div className="receipt-row total">
              <span>Total Amount:</span>
              <span className="total-amount">{formatINR(receipt.totalAmount)}</span>
            </div>
            <div className="receipt-row payment">
              <span>Payment Status:</span>
              <span className="status-paid">{receipt.paymentStatus}</span>
            </div>
            <div className="receipt-row">
              <span>Payment Method:</span>
              <span>{receipt.paymentMethod}</span>
            </div>
          </div>
        </div>

        <div className="receipt-footer">
          <button className="btn btn-primary" onClick={handleContinueShopping}>
            Continue Shopping
          </button>
          <button className="btn btn-secondary" onClick={onClose}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReceiptModal;