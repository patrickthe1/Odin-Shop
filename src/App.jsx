import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from './components/Homepage';
import ShopPage from './components/ShopPage';
import Navbar from './components/Navbar';
import CartModal from './components/CartModal'; // Import CartModal (will create next)


function App() {
  const [cart, setCart] = useState([]);
  // State to control modal visibility
  const [isCartModalOpen, setIsCartModalOpen] = useState(false);

  const handleAddToCart = (product, quantity) => {
    setCart(prevCart => {
      const existingItemIndex = prevCart.findIndex(item => item.id === product.id);
      if (existingItemIndex > -1) {
        const updatedCart = [...prevCart];
        updatedCart[existingItemIndex] = {
          ...updatedCart[existingItemIndex],
          quantity: updatedCart[existingItemIndex].quantity + quantity,
        };
        return updatedCart;
      } else {
        const newItem = {
          id: product.id,
          title: product.title,
          price: product.price,
          image: product.image,
          quantity: quantity,
        };
        return [...prevCart, newItem];
      }
    });
  };


  const totalCartItems = cart.reduce((total, item) => total + item.quantity, 0);

  // Function to open the modal
  const handleOpenCartModal = () => {
    setIsCartModalOpen(true);
  };

  // Function to close the modal
  const handleCloseCartModal = () => {
    setIsCartModalOpen(false);
  };

  return (
    <div>
      {/* Pass handler to open modal and item count to Navbar */}
      <Navbar
        cartItemCount={totalCartItems}
        onCartClick={handleOpenCartModal} // Pass the open handler
      />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route
          path="/shop"
          element={<ShopPage onAddToCart={handleAddToCart} />}
        />
      </Routes>
      {/* Conditionally render the CartModal */}
      <CartModal
        isOpen={isCartModalOpen}
        onClose={handleCloseCartModal} // Pass the close handler
        cartItems={cart} // Pass the cart data
        // Pass setCart if modal needs to modify cart (e.g., remove items) - maybe later
      />
    </div>
  );
}

export default App;
