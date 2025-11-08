# Vibe Commerce - Full Stack E-Commerce Cart

A full-stack shopping cart application built with React, Node.js, Express, and MongoDB.

## 🚀 Features

- Browse products with dynamic category filters
- Add/remove items from cart with real-time updates
- Update product quantities with stock tracking
- Fully responsive modern design
- Quick bill generation
- Detailed order receipt with tax calculations
- Indian Rupee (₹) currency support
- MongoDB persistence with error handling
- Toast notifications for user feedback

## 🛠️ Tech Stack

**Frontend:**
- React 18
- Vite
- React Router
- Axios
- React Hot Toast

**Backend:**
- Node.js
- Express
- MongoDB with Mongoose
- CORS

## 📁 Project Structure
```
vibe-commerce/
├── backend/          # Express API server
│   ├── src/
│   │   ├── config/   # Database configuration
│   │   ├── models/   # Mongoose models
│   │   ├── routes/   # API routes
│   │   ├── controllers/ # Route controllers
│   │   └── middleware/ # Error handling
│   └── package.json
│
├── frontend/         # React application
│   ├── src/
│   │   ├── components/ # React components
│   │   ├── pages/      # Page components
│   │   ├── context/    # Context API
│   │   ├── services/   # API services
│   │   └── styles/     # CSS files
│   └── package.json
│
└── README.md
```

## 🔧 Setup Instructions

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (local or Atlas)
- npm or yarn

### Backend Setup

1. Navigate to backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Create `.env` file:
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/vibe-commerce
NODE_ENV=development
```

4. Start the server:
```bash
npm run dev
```

5. Seed the database (one-time):
Visit `http://localhost:5000/api/products/seed`

### Frontend Setup

1. Navigate to frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Create `.env` file:
```env
VITE_API_URL=http://localhost:5000/api
```

4. Start the development server:
```bash
npm run dev
```

5. Open browser at `http://localhost:3000`

## 📡 API Endpoints

### Products
- `GET /api/products` - Get all products
- `GET /api/products/:id` - Get single product
- `GET /api/products/seed` - Seed database with mock products

### Cart
- `GET /api/cart?userId=guest-user` - Get cart contents
- `POST /api/cart` - Add item to cart
- `PUT /api/cart/:id` - Update item quantity
- `DELETE /api/cart/:id` - Remove specific item
- `DELETE /api/cart` - Clear entire cart

### Checkout & Orders
- `POST /api/checkout` - Generate bill and process order
- `GET /api/checkout/orders?userId=guest-user` - Get order history
- `GET /api/checkout/receipt/:orderId` - Get detailed order receipt

## 🎨 Screenshots

### Home Page
![image alt](https://github.com/karimulla9673-oss/Vibe-Ecommerce/blob/209ca3c554eeb0a2d462c11e3cf2b0b7f747daed/Screenshot%202025-11-08%20120703.png)


### Product Listing
![image alt](https://github.com/karimulla9673-oss/Vibe-Ecommerce/blob/e9dba77a09c88defe0c202593c5cc0db398fecdd/Screenshot%202025-11-08%20130717.png)
### Shopping Cart
![image alt](https://github.com/karimulla9673-oss/Vibe-Ecommerce/blob/4c0429b19f89bec5390cc98ba8231aaccf8b849b/Screenshot%202025-11-08%20130743.png)

### Order Summary
![image alt]()

### Order Confirmation
![image alt]()

## 🎥 Demo Video



## 💡 Key Features Implemented

✅ Product listing with images and dynamic category filters  
✅ Real-time cart management with persistent storage  
✅ Dynamic quantity updates with stock tracking  
✅ Automatic price calculations in Indian Rupees (₹)  
✅ Quick bill generation with tax calculation  
✅ Detailed digital receipt with order tracking  
✅ MongoDB persistence with error handling  
✅ Loading states and error boundaries  
✅ Modern responsive design with animations  
✅ Interactive toast notifications  
✅ Context API for global state management  

## 🚀 Future Enhancements

- User authentication
- Payment integration
- Product search
- Order tracking
- Admin dashboard
- Product reviews
- Wishlist functionality

## 📝 License

MIT

## 👤 Author

Your Name - Vibe Commerce Assignment

## 🙏 Acknowledgments

- Unsplash for product images
- React and Node.js communities
