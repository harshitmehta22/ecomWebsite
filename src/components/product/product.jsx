import axios from "axios";
import React, { useEffect, useState } from "react";
import { useCart } from "../../CartContext";

const Product = () => {
	const [products, setProducts] = useState([]);
	const { cart, addToCart, removeFromCart } = useCart();

	useEffect(() => {
		axios.get(" http://localhost:5000/api/getproduct")
			.then(res => {
				setProducts(res.data.product); // Update this line if your API wraps products inside a key
			})
			.catch(err => {
				console.error("Failed to fetch products:", err);
			});
	}, []);

	return (
		<>
			<section class="active-product-area section_gap">
				<div class="single-product-slider">
					<div class="container">
						<div class="row justify-content-center">
							<div class="col-lg-6 text-center">
								<div class="section-title">
									<h1>Latest Products</h1>
									<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et
										dolore
										magna aliqua.</p>
								</div>
							</div>
						</div>
						<div class="row">
							{products?.map((product) => {
								const cartItem = cart.find(item => item._id === product._id); // ✅ safe now
								const quantity = cartItem ? cartItem.quantity : 0;
								return (
									<div class="col-lg-3 col-md-6" key={product._id || product.id || product.image}>
										<div class="single-product">
											<img class="img-fluid" src={`http://localhost:5000/uploads/${product.image}`} alt="" />
											<div class="product-details">
												<h6>{product.brand}</h6>
												<div class="price">
													<h6>${product.price}</h6>
													{/* {product.originalPrice && (
														<h6 className="l-through">${product.originalPrice}</h6>
													)} */}
												</div>
												<div class="d-flex justify-content-between mt-2">
													<span><strong>Size:</strong> {product.size}</span>
													<span><strong>Color:</strong> {product.color}</span>
												</div>
												<div class="prd-bottom">

													<div className="prd d-flex align-items-center gap-2">
														<button onClick={() => removeFromCart(product)} className="btn btn-outline-secondary">−</button>
														<span>{quantity}</span>
														<button onClick={() => addToCart(product)} className="btn btn-outline-secondary">+</button>
													</div>
													<a href="" class="social-info ml-2">
														<i class="fa-regular fa-heart"></i>
														<p class="hover-text">Wishlist</p>
													</a>
													<a href="" class="social-info">
														<i class="fa-solid fa-up-down-left-right"></i>
														<p class="hover-text">view more</p>
													</a>
												</div>
											</div>

										</div>
									</div>

								)
							})}


							{/* <div class="col-lg-3 col-md-6">
								<div class="single-product">
									<img class="img-fluid" src="img/product/p2.jpg" alt="" />
									<div class="product-details">
										<h6>addidas New Hammer sole
											for Sports person</h6>
										<div class="price">
											<h6>$150.00</h6>
											<h6 class="l-through">$210.00</h6>
										</div>
										<div class="prd-bottom">

											<a href="" class="social-info">
												<i class="ti-bag fa-solid fa-bag-shopping"></i>
												<p class="hover-text">add to bag</p>
											</a>
											<a href="" class="social-info">
												<i class="fa-regular fa-heart"></i>
												<p class="hover-text">Wishlist</p>
											</a>
											<a href="" class="social-info">
												<i class="fa-solid fa-up-down-left-right"></i>
												<p class="hover-text">view more</p>
											</a>
										</div>
									</div>
								</div>
							</div>
							<div class="col-lg-3 col-md-6">
								<div class="single-product">
									<img class="img-fluid" src="img/product/p3.jpg" alt="" />
									<div class="product-details">
										<h6>addidas New Hammer sole
											for Sports person</h6>
										<div class="price">
											<h6>$150.00</h6>
											<h6 class="l-through">$210.00</h6>
										</div>
										<div class="prd-bottom">
											<a href="" class="social-info">
												<i class="ti-bag fa-solid fa-bag-shopping"></i>
												<p class="hover-text">add to bag</p>
											</a>
											<a href="" class="social-info">
												<i class="fa-regular fa-heart"></i>
												<p class="hover-text">Wishlist</p>
											</a>
											<a href="" class="social-info">
												<i class="fa-solid fa-up-down-left-right"></i>
												<p class="hover-text">view more</p>
											</a>
										</div>
									</div>
								</div>
							</div>
							<div class="col-lg-3 col-md-6">
								<div class="single-product">
									<img class="img-fluid" src="img/product/p4.jpg" alt="" />
									<div class="product-details">
										<h6>addidas New Hammer sole
											for Sports person</h6>
										<div class="price">
											<h6>$150.00</h6>
											<h6 class="l-through">$210.00</h6>
										</div>
										<div class="prd-bottom">

											<a href="" class="social-info">
												<i class="ti-bag fa-solid fa-bag-shopping"></i>
												<p class="hover-text">add to bag</p>
											</a>
											<a href="" class="social-info">
												<i class="fa-regular fa-heart"></i>
												<p class="hover-text">Wishlist</p>
											</a>
											<a href="" class="social-info">
												<i class="fa-solid fa-up-down-left-right"></i>
												<p class="hover-text">view more</p>
											</a>
										</div>
									</div>
								</div>
							</div>
							<div class="col-lg-3 col-md-6">
								<div class="single-product">
									<img class="img-fluid" src="img/product/p5.jpg" alt="" />
									<div class="product-details">
										<h6>addidas New Hammer sole
											for Sports person</h6>
										<div class="price">
											<h6>$150.00</h6>
											<h6 class="l-through">$210.00</h6>
										</div>
										<div class="prd-bottom">

											<a href="" class="social-info">
												<i class="ti-bag fa-solid fa-bag-shopping"></i>
												<p class="hover-text">add to bag</p>
											</a>
											<a href="" class="social-info">
												<i class="fa-regular fa-heart"></i>
												<p class="hover-text">Wishlist</p>
											</a>
											<a href="" class="social-info">
												<i class="fa-solid fa-up-down-left-right"></i>
												<p class="hover-text">view more</p>
											</a>
										</div>
									</div>
								</div>
							</div>
							<div class="col-lg-3 col-md-6">
								<div class="single-product">
									<img class="img-fluid" src="img/product/p6.jpg" alt="" />
									<div class="product-details">
										<h6>addidas New Hammer sole
											for Sports person</h6>
										<div class="price">
											<h6>$150.00</h6>
											<h6 class="l-through">$210.00</h6>
										</div>
										<div class="prd-bottom">

											<a href="" class="social-info">
												<i class="ti-bag fa-solid fa-bag-shopping"></i>
												<p class="hover-text">add to bag</p>
											</a>
											<a href="" class="social-info">
												<i class="fa-regular fa-heart"></i>
												<p class="hover-text">Wishlist</p>
											</a>
											<a href="" class="social-info">
												<i class="fa-solid fa-up-down-left-right"></i>
												<p class="hover-text">view more</p>
											</a>
										</div>
									</div>
								</div>
							</div>
							<div class="col-lg-3 col-md-6">
								<div class="single-product">
									<img class="img-fluid" src="img/product/p7.jpg" alt="" />
									<div class="product-details">
										<h6>addidas New Hammer sole
											for Sports person</h6>
										<div class="price">
											<h6>$150.00</h6>
											<h6 class="l-through">$210.00</h6>
										</div>
										<div class="prd-bottom">

											<a href="" class="social-info">
												<i class="ti-bag fa-solid fa-bag-shopping"></i>
												<p class="hover-text">add to bag</p>
											</a>
											<a href="" class="social-info">
												<i class="fa-regular fa-heart"></i>
												<p class="hover-text">Wishlist</p>
											</a>
											<a href="" class="social-info">
												<i class="fa-solid fa-up-down-left-right"></i>
												<p class="hover-text">view more</p>
											</a>
										</div>
									</div>
								</div>
							</div>
							<div class="col-lg-3 col-md-6">
								<div class="single-product">
									<img class="img-fluid" src="img/product/p8.jpg" alt="" />
									<div class="product-details">
										<h6>addidas New Hammer sole
											for Sports person</h6>
										<div class="price">
											<h6>$150.00</h6>
											<h6 class="l-through">$210.00</h6>
										</div>
										<div class="prd-bottom">

											<a href="" class="social-info">
												<i class="ti-bag fa-solid fa-bag-shopping"></i>
												<p class="hover-text">add to bag</p>
											</a>
											<a href="" class="social-info">
												<i class="fa-regular fa-heart"></i>
												<p class="hover-text">Wishlist</p>
											</a>
											<a href="" class="social-info">
												<i class="fa-solid fa-up-down-left-right"></i>
												<p class="hover-text">view more</p>
											</a>
										</div>
									</div>
								</div>
							</div> */}
						</div>
					</div>
				</div>
				{/* <div class="single-product-slider">
			<div class="container">
				<div class="row justify-content-center">
					<div class="col-lg-6 text-center">
						<div class="section-title">
							<h1>Coming Products</h1>
							<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et
								dolore
								magna aliqua.</p>
						</div>
					</div>
				</div>
				<div class="row">
					<div class="col-lg-3 col-md-6">
						<div class="single-product">
							<img class="img-fluid" src="img/product/p6.jpg" alt=""/>
							<div class="product-details">
								<h6>addidas New Hammer sole
									for Sports person</h6>
								<div class="price">
									<h6>$150.00</h6>
									<h6 class="l-through">$210.00</h6>
								</div>
								<div class="prd-bottom">

									<a href="" class="social-info">
										<i class="ti-bag fa-solid fa-bag-shopping"></i>
										<p class="hover-text">add to bag</p>
									</a>
									<a href="" class="social-info">
										<i class="fa-regular fa-heart"></i>
										<p class="hover-text">Wishlist</p>
									</a>
									<a href="" class="social-info">
										<span class="lnr lnr-sync"></span>
										<p class="hover-text">compare</p>
									</a>
									<a href="" class="social-info">
										<span class="lnr lnr-move"></span>
										<p class="hover-text">view more</p>
									</a>
								</div>
							</div>
						</div>
					</div>
					<div class="col-lg-3 col-md-6">
						<div class="single-product">
							<img class="img-fluid" src="img/product/p8.jpg" alt=""/>
							<div class="product-details">
								<h6>addidas New Hammer sole
									for Sports person</h6>
								<div class="price">
									<h6>$150.00</h6>
									<h6 class="l-through">$210.00</h6>
								</div>
								<div class="prd-bottom">

									<a href="" class="social-info">
										<span class="ti-bag"></span>
										<p class="hover-text">add to bag</p>
									</a>
									<a href="" class="social-info">
										<span class="lnr lnr-heart"></span>
										<p class="hover-text">Wishlist</p>
									</a>
									<a href="" class="social-info">
										<span class="lnr lnr-sync"></span>
										<p class="hover-text">compare</p>
									</a>
									<a href="" class="social-info">
										<span class="lnr lnr-move"></span>
										<p class="hover-text">view more</p>
									</a>
								</div>
							</div>
						</div>
					</div>
					<div class="col-lg-3 col-md-6">
						<div class="single-product">
							<img class="img-fluid" src="img/product/p3.jpg" alt=""/>
							<div class="product-details">
								<h6>addidas New Hammer sole
									for Sports person</h6>
								<div class="price">
									<h6>$150.00</h6>
									<h6 class="l-through">$210.00</h6>
								</div>
								<div class="prd-bottom">

									<a href="" class="social-info">
										<span class="ti-bag"></span>
										<p class="hover-text">add to bag</p>
									</a>
									<a href="" class="social-info">
										<span class="lnr lnr-heart"></span>
										<p class="hover-text">Wishlist</p>
									</a>
									<a href="" class="social-info">
										<span class="lnr lnr-sync"></span>
										<p class="hover-text">compare</p>
									</a>
									<a href="" class="social-info">
										<span class="lnr lnr-move"></span>
										<p class="hover-text">view more</p>
									</a>
								</div>
							</div>
						</div>
					</div>
					<div class="col-lg-3 col-md-6">
						<div class="single-product">
							<img class="img-fluid" src="img/product/p5.jpg" alt=""/>
							<div class="product-details">
								<h6>addidas New Hammer sole
									for Sports person</h6>
								<div class="price">
									<h6>$150.00</h6>
									<h6 class="l-through">$210.00</h6>
								</div>
								<div class="prd-bottom">

									<a href="" class="social-info">
										<span class="ti-bag"></span>
										<p class="hover-text">add to bag</p>
									</a>
									<a href="" class="social-info">
										<span class="lnr lnr-heart"></span>
										<p class="hover-text">Wishlist</p>
									</a>
									<a href="" class="social-info">
										<span class="lnr lnr-sync"></span>
										<p class="hover-text">compare</p>
									</a>
									<a href="" class="social-info">
										<span class="lnr lnr-move"></span>
										<p class="hover-text">view more</p>
									</a>
								</div>
							</div>
						</div>
					</div>
					<div class="col-lg-3 col-md-6">
						<div class="single-product">
							<img class="img-fluid" src="img/product/p1.jpg" alt=""/>
							<div class="product-details">
								<h6>addidas New Hammer sole
									for Sports person</h6>
								<div class="price">
									<h6>$150.00</h6>
									<h6 class="l-through">$210.00</h6>
								</div>
								<div class="prd-bottom">

									<a href="" class="social-info">
										<span class="ti-bag"></span>
										<p class="hover-text">add to bag</p>
									</a>
									<a href="" class="social-info">
										<span class="lnr lnr-heart"></span>
										<p class="hover-text">Wishlist</p>
									</a>
									<a href="" class="social-info">
										<span class="lnr lnr-sync"></span>
										<p class="hover-text">compare</p>
									</a>
									<a href="" class="social-info">
										<span class="lnr lnr-move"></span>
										<p class="hover-text">view more</p>
									</a>
								</div>
							</div>
						</div>
					</div>
					<div class="col-lg-3 col-md-6">
						<div class="single-product">
							<img class="img-fluid" src="img/product/p4.jpg" alt=""/>
							<div class="product-details">
								<h6>addidas New Hammer sole
									for Sports person</h6>
								<div class="price">
									<h6>$150.00</h6>
									<h6 class="l-through">$210.00</h6>
								</div>
								<div class="prd-bottom">

									<a href="" class="social-info">
										<span class="ti-bag"></span>
										<p class="hover-text">add to bag</p>
									</a>
									<a href="" class="social-info">
										<span class="lnr lnr-heart"></span>
										<p class="hover-text">Wishlist</p>
									</a>
									<a href="" class="social-info">
										<span class="lnr lnr-sync"></span>
										<p class="hover-text">compare</p>
									</a>
									<a href="" class="social-info">
										<span class="lnr lnr-move"></span>
										<p class="hover-text">view more</p>
									</a>
								</div>
							</div>
						</div>
					</div>
					<div class="col-lg-3 col-md-6">
						<div class="single-product">
							<img class="img-fluid" src="img/product/p1.jpg" alt=""/>
							<div class="product-details">
								<h6>addidas New Hammer sole
									for Sports person</h6>
								<div class="price">
									<h6>$150.00</h6>
									<h6 class="l-through">$210.00</h6>
								</div>
								<div class="prd-bottom">

									<a href="" class="social-info">
										<span class="ti-bag"></span>
										<p class="hover-text">add to bag</p>
									</a>
									<a href="" class="social-info">
										<span class="lnr lnr-heart"></span>
										<p class="hover-text">Wishlist</p>
									</a>
									<a href="" class="social-info">
										<span class="lnr lnr-sync"></span>
										<p class="hover-text">compare</p>
									</a>
									<a href="" class="social-info">
										<span class="lnr lnr-move"></span>
										<p class="hover-text">view more</p>
									</a>
								</div>
							</div>
						</div>
					</div>
					<div class="col-lg-3 col-md-6">
						<div class="single-product">
							<img class="img-fluid" src="img/product/p8.jpg" alt=""/>
							<div class="product-details">
								<h6>addidas New Hammer sole
									for Sports person</h6>
								<div class="price">
									<h6>$150.00</h6>
									<h6 class="l-through">$210.00</h6>
								</div>
								<div class="prd-bottom">

									<a href="" class="social-info">
										<span class="ti-bag"></span>
										<p class="hover-text">add to bag</p>
									</a>
									<a href="" class="social-info">
										<span class="lnr lnr-heart"></span>
										<p class="hover-text">Wishlist</p>
									</a>
									<a href="" class="social-info">
										<span class="lnr lnr-sync"></span>
										<p class="hover-text">compare</p>
									</a>
									<a href="" class="social-info">
										<span class="lnr lnr-move"></span>
										<p class="hover-text">view more</p>
									</a>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div> */}
			</section>
		</>
	)
}
export default Product