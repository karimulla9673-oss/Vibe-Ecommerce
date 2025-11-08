// placeholder
import { createContext, useContext, useState, useEffect } from 'react';
import { getCart, addToCart as addToCartAPI, removeFromCart as removeFromCartAPI, updateCartItem as updateCartItemAPI } from '../services/api';
import toast from 'react-hot-toast';

const CartContext = createContext();

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within CartProvider');
  }
  return context;
};

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(null);
  const [loading, setLoading] = useState(true);
  const userId = 'guest-user';

  const fetchCart = async () => {
    try {
      const data = await getCart(userId);
      setCart(data);
    } catch (error) {
      console.error('Error fetching cart:', error);
      toast.error('Failed to load cart');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  const addToCart = async (productId, quantity = 1) => {
  try {
    console.log('🛒 Adding to cart:', { productId, quantity, userId }); // DEBUG
    const data = await addToCartAPI(productId, quantity, userId);
    setCart(data);
    toast.success('Added to cart!');
  } catch (error) {
    console.error('❌ Error adding to cart:', error);
    console.error('❌ Error response:', error.response); // DEBUG
    console.error('❌ Request URL:', error.config?.url); // DEBUG
    toast.error('Failed to add to cart');
  }
};

  const removeFromCart = async (itemId) => {
    try {
      const data = await removeFromCartAPI(itemId, userId);
      setCart(data);
      toast.success('Removed from cart');
    } catch (error) {
      console.error('Error removing from cart:', error);
      toast.error('Failed to remove item');
    }
  };

  const updateCartItem = async (itemId, quantity) => {
    try {
      const data = await updateCartItemAPI(itemId, quantity, userId);
      setCart(data);
    } catch (error) {
      console.error('Error updating cart:', error);
      toast.error('Failed to update quantity');
    }
  };

  const getCartCount = () => {
    if (!cart || !cart.items) return 0;
    return cart.items.reduce((total, item) => total + item.quantity, 0);
  };

  const value = {
    cart,
    loading,
    addToCart,
    removeFromCart,
    updateCartItem,
    refreshCart: fetchCart,
    getCartCount,
    userId,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};