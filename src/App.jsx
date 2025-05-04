import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import HomePage from './components/HomePage';
import ShopPage from './components/ShopPage';
import CartModal from './components/CartModal';
import { CartProvider } from './components/CartContext'; // Import the provider

function App() {
  return (
      <CartProvider> {/* Wrap your app with the provider */}
        <div>
          <Navbar />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/shop" element={<ShopPage />} />
          </Routes>
          <CartModal />
        </div>
      </CartProvider>
  );
}

export default App;
