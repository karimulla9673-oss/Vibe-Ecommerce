import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import './Navbar.css';

const Navbar = () => {
  const { getCartCount } = useCart();
  const cartCount = getCartCount();

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          <span className="logo-icon">🛍️</span>
          <span className="logo-text">Vibe Commerce</span>
        </Link>
        
        <div className="navbar-menu">
          <Link to="/" className="navbar-link">
            Products
          </Link>
          <Link to="/cart" className="navbar-link cart-link">
            <span>🛒</span>
            <span>Cart</span>
            {cartCount > 0 && (
              <span className="cart-badge">{cartCount}</span>
            )}
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;