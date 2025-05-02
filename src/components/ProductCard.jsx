import React from 'react';

// Basic styling (can be moved to a CSS file later)
const cardStyle = {
  border: '1px solid #ccc',
  borderRadius: '8px',
  padding: '16px',
  margin: '16px',
  textAlign: 'center',
  maxWidth: '250px', // Limit card width
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between', // Push button to bottom
  minHeight: '350px' // Ensure cards have similar height
};

const imageStyle = {
  maxHeight: '150px', // Limit image height
  maxWidth: '100%',
  objectFit: 'contain', // Keep aspect ratio
  marginBottom: '10px'
};

const buttonStyle = {
    marginTop: 'auto' // Push button to the bottom
}

function ProductCard({ product }) {
  // Destructure product properties for easier access
  const { title, price, description, image } = product;

  // Handle potential missing data gracefully (optional but good practice)
  if (!product) {
    return <div>Product data is missing.</div>;
  }

  return (
    <div style={cardStyle}>
      <img src={image} alt={title} style={imageStyle} />
      <h3>{title}</h3>
      <p>${price.toFixed(2)}</p> {/* Format price */}
      {/* We might add description later if needed, keeping it simple for now */}
      {/* <p>{description}</p> */}
      {/* Placeholder for quantity input and add to cart button */}
      <div style={buttonStyle}>
         <button>Add to Cart</button>
      </div>
    </div>
  );
}

// Add prop validation later if using PropTypes

export default ProductCard;