import React, { useEffect, useState } from 'react';
import './header.css';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useCart } from '../../CartContext';

const Header = () => {
	const [showSearch, setShowSearch] = useState(false);
	const navigate = useNavigate();
	const { cart } = useCart();
	const cartCount = cart.reduce((total, item) => total + item.quantity, 0);
	useEffect(() => {
		const handleScroll = () => {
			const header = document.getElementById('header');
			if (window.scrollY > 10) {
				header.classList.add('sticky-header');
			} else {
				header.classList.remove('sticky-header');
			}
		};

		window.addEventListener('scroll', handleScroll);
		return () => window.removeEventListener('scroll', handleScroll);
	}, []);
	const toggleSearch = () => {
		setShowSearch((prev) => !prev);
	};
	const token = localStorage.getItem('token');
	const handleLogout = () => {
		localStorage.removeItem('token');
		localStorage.removeItem('user');
		navigate('/login');
	};
	return (
		<header class="header_area sticky-header" id="header">
			<div class="main_menu">
				<nav class="navbar navbar-expand-lg navbar-light main_box">
					<div class="container">
						<a class="navbar-brand logo_h" href="index.html"><h4 style={{ marginBottom: '0px' }}>CBH</h4></a>
						<button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent"
							aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
							<span class="icon-bar"></span>
							<span class="icon-bar"></span>
							<span class="icon-bar"></span>
						</button>
						<div class="collapse navbar-collapse offset" id="navbarSupportedContent">
							<ul class="nav navbar-nav menu_nav ml-auto">
								<li class="nav-item active"><a class="nav-link" href="index.html">Home</a></li>
								<li class="nav-item submenu dropdown">
									<a href="#" class="nav-link dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true"
										aria-expanded="false">Shop</a>
									<ul class="dropdown-menu">
										<li class="nav-item"><a class="nav-link" href="category.html">Shop Category</a></li>
										<li class="nav-item"><a class="nav-link" href="single-product.html">Product Details</a></li>
										<li class="nav-item"><a class="nav-link" href="checkout.html">Product Checkout</a></li>
										<li class="nav-item"><a class="nav-link" href="cart.html">Shopping Cart</a></li>
										<li class="nav-item"><a class="nav-link" href="confirmation.html">Confirmation</a></li>
									</ul>
								</li>
								<li class="nav-item submenu dropdown">
									<a href="#" class="nav-link dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true"
										aria-expanded="false">Blog</a>
									<ul class="dropdown-menu">
										<li class="nav-item"><a class="nav-link" href="blog.html">Blog</a></li>
										<li class="nav-item"><a class="nav-link" href="single-blog.html">Blog Details</a></li>
									</ul>
								</li>
								<li class="nav-item submenu dropdown">
									<a href="#" class="nav-link dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true"
										aria-expanded="false">Pages</a>
									<ul class="dropdown-menu">
										<li class="nav-item"><a class="nav-link" href="login.html">Login</a></li>
										<li class="nav-item"><a class="nav-link" href="tracking.html">Tracking</a></li>
										<li class="nav-item"><a class="nav-link" href="elements.html">Elements</a></li>
									</ul>
								</li>
								<li class="nav-item"><a class="nav-link" href="contact.html">Contact</a></li>
							</ul>
							<ul class="nav navbar-nav navbar-right">
								<li class="nav-item"><a href="#" class="cart">
									<Link to="/cart" className="cart-link">
										<i class="fa-solid fa-cart-shopping" style={{ color: 'black' }}></i>
										{cartCount > 0 && <span className="cart-count">{cartCount}</span>}
									</Link>
								</a></li>
								<li class="nav-item">
									<button class="search" onClick={toggleSearch}><i class="fa-solid fa-magnifying-glass"></i></button>
								</li>
								<li className="nav-item">
									{token ? (
										<button onClick={handleLogout} className="btn btn-link nav-link" style={{ padding: 0 }}>
											Logout
										</button>
									) : (
										<Link to="/login">
											<i className="fa-solid fa-user" style={{ color: 'black', cursor: 'pointer' }}></i>
										</Link>
									)}
								</li>
							</ul>
						</div>
					</div>
				</nav>
			</div>
			<div className={`search_input ${showSearch ? 'open' : ''}`} id="search_input_box">
				<div class="container">
					<form class="d-flex justify-content-between">
						<input type="text" class="form-control" id="search_input" placeholder="Search Here" />
						<button type="submit" class="btn"></button>
						<span class="lnr lnr-cross" id="close_search" title="Close Search"></span>
					</form>
				</div>
			</div>
		</header>
	);
};

export default Header;