import React from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './pages/home';
import Login from './pages/login/login'
import Register from './pages/register/register';
import ProtectedRoute from './components/protectedRoute';
import Cart from './pages/cart/cart';
import { CartProvider } from './CartContext';


const App = () => {
  return (
    <>
      <CartProvider>
        <BrowserRouter>
          <Routes>
            {/* Protected Routes Group */}
            <Route element={<ProtectedRoute />}>
              <Route path="/" element={<Home />} />
              <Route path="/cart" element={<Cart />} />
            </Route>

            {/* Public Routes */}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Routes>
        </BrowserRouter>
      </CartProvider>
    </>
  );
}

export default App;
