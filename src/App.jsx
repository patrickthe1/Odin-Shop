import React from 'react';
import { Routes, Route } from 'react-router-dom'; 
import HomePage from './components/Homepage'; // Import HomePage
import ShopPage from './components/ShopPage'; // Import ShopPage


function App() {
 return(
  <div>
    <h1>My shopping App</h1>
    <Routes>
        <Route path='/' element={<HomePage/>}></Route>
        <Route path='/shop' element={<ShopPage/>}></Route>
    </Routes>
  </div>
 )

}

export default App
