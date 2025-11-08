import Product from '../models/Product.js';

// Mock products to seed database
const mockProducts = [
  {
    name: 'Wireless Headphones',
    price: 79.99,
    description: 'Premium noise-cancelling wireless headphones',
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500',
    category: 'Electronics',
    stock: 50,
  },
  {
    name: 'Smart Watch',
    price: 199.99,
    description: 'Fitness tracking smartwatch with heart rate monitor',
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500',
    category: 'Electronics',
    stock: 30,
  },
  {
    name: 'Laptop Backpack',
    price: 49.99,
    description: 'Durable backpack with laptop compartment',
    image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500',
    category: 'Accessories',
    stock: 75,
  },
  {
    name: 'Coffee Maker',
    price: 89.99,
    description: 'Programmable coffee maker with thermal carafe',
    image: 'https://images.unsplash.com/photo-1517668808822-9ebb02f2a0e6?w=500',
    category: 'Home & Kitchen',
    stock: 40,
  },
  {
    name: 'Yoga Mat',
    price: 29.99,
    description: 'Non-slip exercise yoga mat with carrying strap',
    image: 'https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=500',
    category: 'Sports',
    stock: 100,
  },
  {
    name: 'Desk Lamp',
    price: 39.99,
    description: 'LED desk lamp with adjustable brightness',
    image: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=500',
    category: 'Home & Office',
    stock: 60,
  },
  {
    name: 'Water Bottle',
    price: 19.99,
    description: 'Stainless steel insulated water bottle',
    image: 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=500',
    category: 'Sports',
    stock: 150,
  },
  {
    name: 'Bluetooth Speaker',
    price: 59.99,
    description: 'Portable waterproof Bluetooth speaker',
    image: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=500',
    category: 'Electronics',
    stock: 45,
  },
];

// Seed products (run once)
export const seedProducts = async (req, res) => {
  try {
    await Product.deleteMany({});
    const products = await Product.insertMany(mockProducts);
    res.status(201).json({
      message: 'Products seeded successfully',
      count: products.length,
      products,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all products
export const getProducts = async (req, res) => {
  try {
    const products = await Product.find({});
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get single product
export const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};