import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Navbar.module.css'; // Import CSS Module

// Accept cartItemCount and onCartClick props
function Navbar({ cartItemCount, onCartClick }) {
  return (
    <nav className={styles.navbar}> {/* Use className from styles */} 
      {/* Brand Name */}
      <div className={styles.brand}>
        <Link to="/">Odin Shop</Link> {/* Added Brand Link */} 
      </div>

      {/* Navigation Links */}
      <div>
        <ul className={styles.navLinks}> {/* Use className */} 
          <li>
            {/* Consider using NavLink for active styling later */}
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/shop">Shop</Link>
          </li>
        </ul>
      </div>

      {/* Cart Button */}
      <div>
         <button 
           onClick={onCartClick} 
           className={styles.cartButton} // Use className
           aria-label={`View Cart (${cartItemCount} items)`}
         >
             Cart 
             {/* Display count only if > 0 */} 
             {cartItemCount > 0 && (
               <span className={styles.cartCount}>{cartItemCount}</span>
             )}
         </button>
      </div>
    </nav>
  );
}

export default Navbar;