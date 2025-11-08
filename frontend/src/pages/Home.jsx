import { useState, useEffect } from 'react';
import { getProducts } from '../services/api';
import ProductGrid from '../components/ProductGrid';
import Loader from '../components/Loader';
import toast from 'react-hot-toast';
import './Home.css';

const Home = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const data = await getProducts();
      setProducts(data);
    } catch (error) {
      console.error('Error fetching products:', error);
      toast.error('Failed to load products');
    } finally {
      setLoading(false);
    }
  };

  const categories = ['all', ...new Set(products.map(p => p.category))];

  const filteredProducts = filter === 'all' 
    ? products 
    : products.filter(p => p.category === filter);

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="home-page">
      <div className="hero-section">
        <h1 className="hero-title">Welcome to Vibe Commerce</h1>
        <p className="hero-subtitle">Discover amazing products at great prices</p>
      </div>

      <div className="filter-section">
        <h2 className="filter-title">Shop by Category</h2>
        <div className="filter-buttons">
          {categories.map(category => (
            <button
              key={category}
              className={`filter-btn ${filter === category ? 'active' : ''}`}
              onClick={() => setFilter(category)}
            >
              {category === 'all' ? 'All Products' : category}
            </button>
          ))}
        </div>
      </div>

      {filteredProducts.length === 0 ? (
        <div className="empty-state">
          <h3>No products found</h3>
          <p>Try selecting a different category</p>
        </div>
      ) : (
        <>
          <div className="products-count">
            Showing {filteredProducts.length} product{filteredProducts.length !== 1 ? 's' : ''}
          </div>
          <ProductGrid products={filteredProducts} />
        </>
      )}
    </div>
  );
};

export default Home;