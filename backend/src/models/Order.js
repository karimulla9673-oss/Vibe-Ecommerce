import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
  userId: {
    type: String,
    default: 'guest-user',
  },
  items: [{
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product',
    },
    name: String,
    price: Number,
    quantity: Number,
  }],
  totalAmount: {
    type: Number,
    required: true,
  },
  customerName: {
    type: String,
    required: true,
  },
  customerEmail: {
    type: String,
    required: true,
  },
  orderNumber: {
    type: String,
    unique: true,
  },
}, {
  timestamps: true,
});

export default mongoose.model('Order', orderSchema);