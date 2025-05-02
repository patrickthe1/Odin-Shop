// filepath: c:\Users\mugis\OneDrive\Desktop\FUN PROJECTS\SHOPPING-CART\shopping-cart\src\components\Navbar.jsx
import React from 'react';
import { Link } from 'react-router-dom';

// Basic styling for Navbar (can be moved to CSS)
const navStyle = {
    display: 'flex',
    justifyContent: 'space-between', // Space out logo/links and cart
    alignItems: 'center',
    padding: '10px 20px',
    backgroundColor: '#f8f8f8',
    borderBottom: '1px solid #ddd'
};

const ulStyle = {
    listStyle: 'none',
    display: 'flex',
    gap: '20px', // Space between nav links
    margin: 0,
    padding: 0
};

const cartLinkStyle = {
    textDecoration: 'none',
    color: 'black' // Or your preferred color
}

// Style for the clickable cart area
const cartButtonStyle = {
    cursor: 'pointer', // Indicate it's clickable
    padding: '5px 10px',
    border: '1px solid transparent', // Optional: add border on hover/focus
    borderRadius: '4px'
};

// Accept cartItemCount and onCartClick props
function Navbar({ cartItemCount, onCartClick }) {
  return (
    <nav style={navStyle}>
      <div> {/* Container for Logo/Brand (optional) and Links */}
        <ul style={ulStyle}>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/shop">Shop</Link>
          </li>
        </ul>
      </div>

      <div> {/* Container for Cart Info */}
         {/* Make the cart display a button or clickable span */}
         <button onClick={onCartClick} style={cartButtonStyle} aria-label={`View Cart (${cartItemCount} items)`}>
             Cart ({cartItemCount})
         </button>
      </div>
    </nav>
  );
}

export default Navbar;