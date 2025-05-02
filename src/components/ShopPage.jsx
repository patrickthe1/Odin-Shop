// filepath: c:\Users\mugis\OneDrive\Desktop\FUN PROJECTS\SHOPPING-CART\shopping-cart\src\components\ShopPage.jsx
import React, { useState, useEffect } from 'react';
import ProductCard from './ProductCard';
import styles from './ShopPage.module.css'; // Import CSS Module
import { getApiUrl } from '../utils/api';

// Accept onAddToCart as a prop
function ShopPage({ onAddToCart }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        // Use the API utility to get the correct base URL
        const apiUrl = getApiUrl();
        const response = await fetch(`${apiUrl}/products`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setProducts(data);
        setError(null);
      } catch (err) {
        setError(err.message);
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);


  if (loading) {
    return <div className={styles.loading}>Loading products...</div>;
  }
  if (error) {
    return <div className={styles.error}>Error fetching products: {error}</div>;
  }

  return (
    <div className={styles.shopPage}> {/* Use className */} 
      <h1 className={styles.title}>Products</h1> {/* Use className */} 
      <div className={styles.productList}> {/* Use className */} 
        {products.map(product => (
          <ProductCard
            key={product.id}
            product={product}
            // Pass onAddToCart down to each ProductCard
            onAddToCart={onAddToCart}
          />
        ))}
      </div>
    </div>
  );
}

export default ShopPage;