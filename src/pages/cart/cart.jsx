"use client"
import react, { useEffect, useState } from "react";
import Header from "../../components/header/header";


const Cart = () => {
    const [cartItems, setCartItems] = useState([]);

    useEffect(() => {
        const storedCart = localStorage.getItem("cart");
        if (storedCart) {
            setCartItems(JSON.parse(storedCart));
        }
    }, []);

    const handleQuantityChange = (id, delta) => {
        const updatedCart = cartItems.map(item =>
            item.id === id
                ? { ...item, quantity: Math.max(item.quantity + delta, 1) }
                : item
        );
        setCartItems(updatedCart);
        localStorage.setItem("cart", JSON.stringify(updatedCart));
    };

    const getTotal = (price, quantity) => (price * quantity).toFixed(2);

    const getCartSubtotal = () => {
        return cartItems.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);
    };
    return (
        <>
            <Header />
            <section class="banner-area organic-breadcrumb">
                <div class="container">
                    <div class="breadcrumb-banner d-flex flex-wrap align-items-center justify-content-end">
                        <div class="col-first">
                            <h1>Shopping Cart</h1>
                            <nav class="d-flex align-items-center">
                                <a href="index.html">Home<span class="lnr lnr-arrow-right"></span></a>
                                <a href="category.html">Cart</a>
                            </nav>
                        </div>
                    </div>
                </div>
            </section>
            <section class="cart_area">
                <div class="container">
                    <div class="cart_inner">
                        <div class="table-responsive">
                            {cartItems.length === 0 ? (
                                <h4>Your cart is empty.</h4>
                            ) : (
                                <table className="table">
                                    <thead>
                                        <tr>
                                            <th>Product</th>
                                            <th>Price</th>
                                            <th>Quantity</th>
                                            <th>Total</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {cartItems.map(item => (
                                            <tr key={item.id}>
                                                <td>
                                                    <div className="media">
                                                        <div className="d-flex">
                                                            <img src={item.image} alt={item.name} width={80} />
                                                        </div>
                                                        <div className="media-body">
                                                            <p>{item.name}</p>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td><h5>${item.price}</h5></td>
                                                <td>
                                                    <div className="product_count">
                                                        <button onClick={() => handleQuantityChange(item.id, -1)} className="reduced items-count" type="button">-</button>
                                                        <input type="text" value={item.quantity} readOnly className="input-text qty" />
                                                        <button onClick={() => handleQuantityChange(item.id, 1)} className="increase items-count" type="button">+</button>
                                                    </div>
                                                </td>
                                                <td><h5>${getTotal(item.price, item.quantity)}</h5></td>
                                            </tr>
                                        ))}
                                        <tr>
                                            <td></td>
                                            <td></td>
                                            <td><h5>Subtotal</h5></td>
                                            <td><h5>${getCartSubtotal()}</h5></td>
                                        </tr>
                                        <tr className="out_button_area">
                                            <td></td>
                                            <td></td>
                                            <td></td>
                                            <td>
                                                <div className="checkout_btn_inner d-flex align-items-center">
                                                    <a className="gray_btn" href="#">Continue Shopping</a>
                                                    <a className="primary-btn" href="#">Proceed to checkout</a>
                                                </div>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            )}
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default Cart;