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

// Accept cartItemCount as a prop
function Navbar({ cartItemCount }) {
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
         {/* Display cart item count */}
         {/* You might want to make this a Link later if you add a Cart page */}
         <span style={cartLinkStyle}>
             Cart ({cartItemCount})
         </span>
         {/* Placeholder for a checkout button/link if needed */}
         {/* <button>Checkout</button> */}
      </div>
    </nav>
  );
}

export default Navbar;