import React, { createContext, useContext, useState } from "react";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState([]);
    React.useEffect(() => {
        const storedCart = JSON.parse(localStorage.getItem('cart')) || [];
        setCart(storedCart);
      }, []);
    
    React.useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cart));
      }, [cart]);

    const addToCart = (product) => {
        setCart((prevCart) => {
            const existing = prevCart.find(item => item._id === product._id);
            if (existing) {
                return prevCart.map(item =>
                    item._id === product._id ? { ...item, quantity: item.quantity + 1 } : item
                );
            } else {
                return [...prevCart, { ...product, quantity: 1 }];
            }
        });
    };

    const removeFromCart = (product) => {
        setCart((prevCart) => {
            const existing = prevCart.find(item => item._id === product._id);
            if (existing && existing.quantity > 1) {
                return prevCart.map(item =>
                    item._id === product._id ? { ...item, quantity: item.quantity - 1 } : item
                );
            } else {
                return prevCart.filter(item => item._id !== product._id);
            }
        });
    };

    return (
        <CartContext.Provider value={{ cart, addToCart, removeFromCart }}>
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => useContext(CartContext);
