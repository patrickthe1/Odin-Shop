// filepath: c:\Users\mugis\OneDrive\Desktop\FUN PROJECTS\SHOPPING-CART\shopping-cart\src\components\ShopPage.jsx
import React, { useState, useEffect } from 'react';
import ProductCard from './ProductCard';

const shopPageStyle = { /* ... styles ... */ };

// Accept onAddToCart as a prop
function ShopPage({ onAddToCart }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // ... useEffect for fetching data remains the same ...
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('https://fakestoreapi.com/products');
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


  if (loading) { /* ... loading state ... */ }
  if (error) { /* ... error state ... */ }

  return (
    <div>
      <h1>Shop Page</h1>
      <div style={shopPageStyle}>
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