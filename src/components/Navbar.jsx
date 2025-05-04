import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Navbar.module.css'; // Import CSS Module
import { useCart } from './CartContext';


function Navbar() {
  //Get what we need from context instead of props
  const {totalCartItems, openCartModal} = useCart();
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
           onClick={openCartModal} 
           className={styles.cartButton} // Use className
           aria-label={`View Cart (${totalCartItems} items)`}
         >
             Cart 
             {/* Display count only if > 0 */} 
             {totalCartItems > 0 && (
               <span className={styles.cartCount}>{totalCartItems}</span>
             )}
         </button>
      </div>
    </nav>
  );
}

export default Navbar;