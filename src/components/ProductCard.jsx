import React, { useState } from 'react';
import styles from './ProductCard.module.css'; // Import CSS Module
import { useCart } from './CartContext';

function ProductCard({ product}) {
  const [quantity, setQuantity] = useState(1);

  // Get addToCart function from context instead of props
  const { addToCart } = useCart();

  if (!product) {
    return <div className={styles.card}>Product data is missing.</div>; // Basic error display
  }

  // Destructure, using images array from Platzi API
  const { id, title, price, description, images } = product; 

  // Use the first image from the images array, provide a fallback if empty/undefined
  const imageUrl = images && images.length > 0 ? images[0] : ''; // Default to empty string if no image

  const handleQuantityChange = (event) => {
    const value = parseInt(event.target.value, 10);
    setQuantity(isNaN(value) || value < 1 ? 1 : value);
  };

  const handleIncrement = () => {
    setQuantity(prevQuantity => prevQuantity + 1);
  };

  const handleDecrement = () => {
    setQuantity(prevQuantity => (prevQuantity > 1 ? prevQuantity - 1 : 1));
  };

  const handleAddToCartClick = () => {
    // Pass the product data along, ensuring the cart uses the same image logic if needed
    // Currently, App.jsx likely just uses the passed product object
    addToCart(product, quantity); 
    // Optional: Reset quantity after adding?
    // setQuantity(1);
  };

  return (
    <div className={styles.card}> {/* Use className */} 
      <div> {/* Top section */} 
        <div className={styles.imageContainer}> {/* Use className */} 
          {/* Use the derived imageUrl */}
          <img src={imageUrl} alt={title} className={styles.image} /> {/* Use className */} 
        </div>
        <h3 className={styles.title}>{title}</h3> {/* Use className */} 
        <p className={styles.price}>${price ? price.toFixed(2) : 'N/A'}</p> {/* Use className, add price check */} 
      </div>
      <div className={styles.buttonContainer}> {/* Use className */} 
        {/* Quantity Controls */}
        <div className={styles.controls}> {/* Use className */} 
          <button onClick={handleDecrement} className={styles.quantityButton}>-</button> {/* Use className */} 
          <input
            type="number"
            value={quantity}
            onChange={handleQuantityChange}
            className={styles.quantityInput}  
            min="1"
            aria-label={`Quantity for ${title}`}
          />
          <button onClick={handleIncrement} className={styles.quantityButton}>+</button> {/* Use className */} 
        </div>
        {/* Add to Cart Button */}
        <button onClick={handleAddToCartClick} className={styles.addToCartButton}>Add to Cart</button> {/* Use className */} 
      </div>
    </div>
  );
}

export default ProductCard;