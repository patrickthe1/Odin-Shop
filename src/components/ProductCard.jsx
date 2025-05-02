// filepath: c:\Users\mugis\OneDrive\Desktop\FUN PROJECTS\SHOPPING-CART\shopping-cart\src\components\ProductCard.jsx
import React, { useState } from 'react';

// ... styles ...
const cardStyle = {
    border: '1px solid #ccc',
    borderRadius: '8px',
    padding: '16px',
    margin: '8px', // Reduced margin slightly
    textAlign: 'center',
    width: '220px', // Adjusted width
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    minHeight: '400px' // Adjusted height to accommodate controls
};

const imageStyle = {
    maxHeight: '150px',
    maxWidth: '100%',
    objectFit: 'contain',
    marginBottom: '10px'
};

const controlsStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    margin: '10px 0'
};

const inputStyle = {
    width: '50px',
    textAlign: 'center',
    margin: '0 5px'
};

const buttonContainerStyle = {
    marginTop: 'auto' // Pushes this container to the bottom
}

// Accept onAddToCart as a prop
function ProductCard({ product, onAddToCart }) {
  const [quantity, setQuantity] = useState(1);
  const { id, title, price, description, image } = product;

  // ... handleQuantityChange, handleIncrement, handleDecrement remain the same ...
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


  // Updated function to call the prop
  const handleAddToCartClick = () => {
    // Call the function passed from App.jsx via ShopPage
    onAddToCart(product, quantity);
    console.log(`Attempting to add ${quantity} of ${title} (ID: ${id}) to cart.`);
    // Optional: Reset quantity after adding? Or leave it as is?
    // setQuantity(1); // Uncomment to reset quantity after adding
  };

  if (!product) { /* ... missing product check ... */ }

  return (
    <div style={cardStyle}>
       <div> {/* Top section */}
            <img src={image} alt={title} style={imageStyle} />
            <h3>{title}</h3>
            <p>${price.toFixed(2)}</p>
        </div>
         <div style={buttonContainerStyle}> {/* Bottom section */}
             {/* Quantity Controls */}
            <div style={controlsStyle}>
               {/* ... buttons and input ... */}
                <button onClick={handleDecrement}>-</button>
                <input
                    type="number"
                    value={quantity}
                    onChange={handleQuantityChange}
                    style={inputStyle}
                    min="1"
                />
                <button onClick={handleIncrement}>+</button>
            </div>
             {/* Add to Cart Button - uses the updated handler */}
            <button onClick={handleAddToCartClick}>Add to Cart</button>
        </div>
    </div>
  );
}

export default ProductCard;