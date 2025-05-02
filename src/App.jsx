import React, {useState} from 'react';
import { Routes, Route } from 'react-router-dom'; 
import HomePage from './components/Homepage'; // Import HomePage
import ShopPage from './components/ShopPage'; // Import ShopPag
import Navbar from './components/Navbar';


function App() {
    const [cart, setCart] = useState([]);

      // Function to add an item to the cart
  const handleAddToCart = (product, quantity) => {
    setCart(prevCart => {
      // Check if the item is already in the cart
      const existingItemIndex = prevCart.findIndex(item => item.id === product.id);

      if (existingItemIndex > -1) {
        // Item exists, update quantity
        const updatedCart = [...prevCart]; // Create a copy of the cart
        // Update the quantity of the existing item
        updatedCart[existingItemIndex] = {
          ...updatedCart[existingItemIndex],
          quantity: updatedCart[existingItemIndex].quantity + quantity,
        };
        return updatedCart; // Return the updated cart
      } else {
        // Item does not exist, add it as a new item
        const newItem = {
          id: product.id,
          title: product.title,
          price: product.price,
          image: product.image, // Include image for potential cart display later
          quantity: quantity,
        };
        // Return a new cart array with the new item added
        return [...prevCart, newItem];
      }
    });
    console.log("Cart updated:", cart); // Log cart state after update (for debugging)
  };

   // Calculate total number of items in the cart
   const totalCartItems = cart.reduce((total, item) => total + item.quantity, 0);


   return (
    <div>
      {/* Pass the total item count to Navbar */}
      <Navbar cartItemCount={totalCartItems} />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route
          path="/shop"
          element={<ShopPage onAddToCart={handleAddToCart} />}
        />
        {/* Add route for CartPage later if needed */}
      </Routes>
    </div>
  );

}

export default App
