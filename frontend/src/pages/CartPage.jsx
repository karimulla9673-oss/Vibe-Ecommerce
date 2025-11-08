// placeholder
import { useCart } from '../context/CartContext';
import Cart from '../components/Cart';
import Loader from '../components/Loader';
import './CartPage.css';

const CartPage = () => {
  const { loading } = useCart();

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="cart-page">
      <Cart />
    </div>
  );
};

export default CartPage;