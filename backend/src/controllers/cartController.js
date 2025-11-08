import Cart from '../models/Cart.js';
import Product from '../models/Product.js';

// Get cart
export const getCart = async (req, res) => {
  try {
    const userId = req.query.userId || 'guest-user';
    let cart = await Cart.findOne({ userId }).populate('items.productId');
    
    if (!cart) {
      cart = await Cart.create({ userId, items: [] });
    }

    // Calculate total
    const totalAmount = cart.items.reduce((sum, item) => {
      return sum + (item.productId.price * item.quantity);
    }, 0);

    cart.totalAmount = totalAmount;
    await cart.save();

    res.json(cart);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Add to cart
export const addToCart = async (req, res) => {
  try {
    const { productId, quantity = 1 } = req.body;
    const userId = req.body.userId || 'guest-user';

    // Validate product exists
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    // Find or create cart
    let cart = await Cart.findOne({ userId });
    if (!cart) {
      cart = await Cart.create({ userId, items: [] });
    }

    // Check if product already in cart
    const existingItem = cart.items.find(
      item => item.productId.toString() === productId
    );

    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      cart.items.push({ productId, quantity });
    }

    await cart.save();
    await cart.populate('items.productId');

    // Recalculate total
    cart.totalAmount = cart.items.reduce((sum, item) => {
      return sum + (item.productId.price * item.quantity);
    }, 0);
    await cart.save();

    res.status(201).json(cart);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update cart item quantity
export const updateCartItem = async (req, res) => {
  try {
    const { id } = req.params;
    const { quantity } = req.body;
    const userId = req.body.userId || 'guest-user';

    const cart = await Cart.findOne({ userId });
    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }

    const item = cart.items.id(id);
    if (!item) {
      return res.status(404).json({ message: 'Item not found in cart' });
    }

    if (quantity <= 0) {
      item.deleteOne();
    } else {
      item.quantity = quantity;
    }

    await cart.save();
    await cart.populate('items.productId');

    // Recalculate total
    cart.totalAmount = cart.items.reduce((sum, item) => {
      return sum + (item.productId.price * item.quantity);
    }, 0);
    await cart.save();

    res.json(cart);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Remove from cart
export const removeFromCart = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.query.userId || 'guest-user';

    const cart = await Cart.findOne({ userId });
    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }

    cart.items = cart.items.filter(item => item._id.toString() !== id);
    
    await cart.save();
    await cart.populate('items.productId');

    // Recalculate total
    cart.totalAmount = cart.items.reduce((sum, item) => {
      return sum + (item.productId.price * item.quantity);
    }, 0);
    await cart.save();

    res.json(cart);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Clear cart
export const clearCart = async (req, res) => {
  try {
    const userId = req.query.userId || 'guest-user';
    const cart = await Cart.findOne({ userId });
    
    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }

    cart.items = [];
    cart.totalAmount = 0;
    await cart.save();

    res.json({ message: 'Cart cleared successfully', cart });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};