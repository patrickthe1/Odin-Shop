import React from 'react';
import { Link } from 'react-router-dom';

function HomePage() {
  return (
    <div>
      <h1>Welcome to The Awesome Shop!</h1>
      <p>
        Your one-stop destination for the coolest gadgets and gizmos.
        Browse our collection and find something amazing today!
      </p>
      {/* You could add an image here later */}
    <img src="/path/to/your/image.jpg" alt="Shop promotion" />
    <p>
        Ready to start shopping? Head over to our <Link to="/shop">Shop Page</Link>!
        {/* Note: Using the <Link> component prevents a full page refresh. */}
    </p>
        {/* We'll stick to the Navbar <Link> for primary navigation. */}
        {/* Alternatively, you could use the <Link> component here too if needed. */}
    
    </div>
  );
}

export default HomePage;