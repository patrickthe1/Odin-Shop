import React from 'react';
import { Link } from 'react-router-dom';
import styles from './HomePage.module.css'; // Import CSS Module
import heroImage from '../assets/images/hero-image.png';
function HomePage() {
  return (
    <div className={styles.homePage}> {/* Use className */} 
      <h1 className={styles.title}>Welcome to The Odin Shop!</h1> {/* Use className */} 
      <p className={styles.subtitle}> {/* Use className */} 
        Your one-stop destination for the coolest gadgets and gizmos.
        Browse our collection and find something amazing today!
      </p>
      
      {/* Hero Placeholder Area */}
      <div className={styles.heroPlaceholder}> {/* Use className */} 
        {/* Content removed, styling handles the placeholder appearance */}
        <img src={heroImage} alt="hero-image" className={styles.heroActualImage} />
      </div>

      <p className={styles.shopLinkContainer}> {/* Use className */} 
        Ready to start shopping? Head over to our <Link to="/shop">Shop Page</Link>!
      </p>
    </div>
  );
}

export default HomePage;