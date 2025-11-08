import Order from '../models/Order.js';
import Cart from '../models/Cart.js';

export const checkout = async (req, res) => {
  try {
    const { cartItems, customerName, customerEmail, userId = 'guest-user' } = req.body;

    // Validate input
    if (!cartItems || cartItems.length === 0) {
      return res.status(400).json({ message: 'Cart is empty' });
    }

    if (!customerName || !customerEmail) {
      return res.status(400).json({ message: 'Customer details are required' });
    }

    // Calculate total
    const totalAmount = cartItems.reduce((sum, item) => {
      return sum + (item.price * item.quantity);
    }, 0);

    // Generate order number
    const orderNumber = `ORD-${Date.now()}-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;

    // Create order
    const order = await Order.create({
      userId,
      items: cartItems.map(item => ({
        productId: item.productId,
        name: item.name,
        price: item.price,
        quantity: item.quantity,
      })),
      totalAmount,
      customerName,
      customerEmail,
      orderNumber,
    });

    // Clear cart after successful order
    await Cart.findOneAndUpdate(
      { userId },
      { items: [], totalAmount: 0 }
    );

    // Calculate tax and shipping
    const taxRate = 0.1; // 10% tax
    const taxAmount = totalAmount * taxRate;
    const shippingCost = 0; // Free shipping
    const finalTotal = totalAmount + taxAmount + shippingCost;

    // Generate receipt with detailed breakdown
    res.status(201).json({
      success: true,
      message: 'Order placed successfully',
      receipt: {
        orderNumber: order.orderNumber,
        customerName: order.customerName,
        customerEmail: order.customerEmail,
        items: order.items,
        subtotal: totalAmount,
        tax: taxAmount,
        shipping: shippingCost,
        totalAmount: finalTotal,
        orderDate: order.createdAt,
        estimatedDelivery: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days from now
        timestamp: new Date().toISOString(),
        paymentStatus: 'Paid',
        paymentMethod: 'Card', // Mock payment method
      },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all orders (bonus feature)
export const getOrders = async (req, res) => {
  try {
    const userId = req.query.userId || 'guest-user';
    const orders = await Order.find({ userId }).sort({ createdAt: -1 });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};