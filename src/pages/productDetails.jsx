import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Header from '../components/header/header';
import Banner from '../components/banner/banner';
import Footer from '../components/footer/footer';
import { useCart } from '../CartContext';
import './category.css';

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [similar, setSimilar] = useState([]);
  const [reviews, setReviews] = useState([
    { name: 'Jason', rating: 5, comment: 'The fit and comfort are fantastic. Highly recommend.' },
    { name: 'Sara', rating: 4, comment: 'Very stylish, good value for the price.' },
    { name: 'Mike', rating: 4, comment: 'Great experience but a little tight in size.' },
  ]);
  const [newReview, setNewReview] = useState({ name: '', rating: 0, comment: '' });
  const { cart, addToCart, removeFromCart } = useCart();

  useEffect(() => {
    const fetch = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/product/${id}`);
        setProduct(res.data.product);

        const allProducts = await axios.get('http://localhost:5000/api/getproduct');
        const others = allProducts.data.product || [];
        const related = others
          .filter(p => p._id !== id && p.brand === res.data.product.brand)
          .slice(0, 4);
        setSimilar(related);
      } catch (err) {
        console.error('Product fetch error', err);
      }
    };
    fetch();
  }, [id]);

  if (!product) {
    return (
      <div className="main-wrapper">
        <Header />
        <div className="container" style={{ padding: '100px 0' }}>
          <h3>Loading product details...</h3>
        </div>
        <Footer />
      </div>
    );
  }

  const cartItem = cart.find(item => item._id === product._id);
  const quantity = cartItem ? cartItem.quantity : 0;

  const handleBuyNow = () => {
    if (product.stock <= 0) return;
    addToCart(product);
    navigate('/cart');
  };

  const submitReview = (e) => {
    e.preventDefault();
    if (!newReview.name || !newReview.comment || newReview.rating === 0) return;
    setReviews(prev => [...prev, newReview]);
    setNewReview({ name: '', rating: 0, comment: '' });
  };

  const renderStars = (count) => '★'.repeat(count) + '☆'.repeat(5 - count);

  return (
    <>
      <div className="main-wrapper">
        <Header />
        {/* <Banner /> */}

        <section className="section_gap">
          <div className="container">
            <div className="row">
              <div className="col-lg-5">
                <div className="single-product">
                  <img className="img-fluid" src={`http://localhost:5000/uploads/${product.image}`} alt={product.title} />
                </div>
              </div>
              <div className="col-lg-7">
                <div className="product-details">
                  <h2>{product.title}</h2>
                  <p><strong>Brand:</strong> {product.brand}</p>
                  <p>{product.description}</p>
                  <p><strong>Product warranty:</strong> Includes 1-year manufacturer warranty. Valid against defects in materials and workmanship from the date of purchase. (Terms and conditions apply.)</p>
                  <p><strong>Return support:</strong> 30-day money-back guarantee if unopened and unused.</p>
                  <p><strong>Color:</strong> {product.color}</p>
                  <p><strong>Size:</strong> {product.size?.join(', ')}</p>
                  <p><strong>Availability:</strong> {product.stock > 0 ? 'In Stock' : 'Out of Stock'}</p>

                  <div className="price">
                    {product.originalPrice && product.originalPrice > product.price ? (
                      <>
                        <h4>${product.price}</h4>
                        <h6 className="l-through">${product.originalPrice}</h6>
                        <span className="discount-amount">Save ${(product.originalPrice - product.price).toFixed(2)}</span>
                      </>
                    ) : (
                      <h4>${product.price}</h4>
                    )}
                  </div>

                  <div className="prd-bottom">
                    <div className="prd d-flex align-items-center gap-2">
                      {product.stock > 0 ? (
                        <>
                          <button onClick={() => removeFromCart(product)} className="btn btn-outline-secondary">−</button>
                          <span>{quantity}</span>
                          <button onClick={() => addToCart(product)} className="btn btn-outline-secondary">+</button>
                        </>
                      ) : (
                        <button disabled className="btn btn-outline-secondary">Unavailable</button>
                      )}
                    </div>
                    <div className="mt-3">
                      <button onClick={handleBuyNow} className="btn btn-primary" disabled={product.stock <= 0}>
                        Buy Now
                      </button>
                    </div>
                  </div>

                </div>
              </div>
            </div>

            <div className="row mt-5">
              <div className="col-12">
                <h3>Customer Reviews</h3>
              </div>
              <div className="col-12">
                {reviews.length === 0 ? (
                  <p>No reviews yet. Be the first to review this product.</p>
                ) : (
                  reviews.map((rv, index) => (
                    <div key={index} className="mb-3">
                      <strong>{rv.name}</strong> &nbsp; {renderStars(rv.rating)}
                      <p>{rv.comment}</p>
                    </div>
                  ))
                )}

                <form onSubmit={submitReview} className="mt-4">
                  <h5>Add your review</h5>
                  <div className="mb-2">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Your Name"
                      value={newReview.name}
                      onChange={(e) => setNewReview(prev => ({ ...prev, name: e.target.value }))}
                    />
                  </div>
                  <div className="mb-2">
                    <select
                      className="form-control"
                      value={newReview.rating}
                      onChange={(e) => setNewReview(prev => ({ ...prev, rating: Number(e.target.value) }))}
                    >
                      <option value={0}>Select star rating</option>
                      <option value={5}>5 - Excellent</option>
                      <option value={4}>4 - Very Good</option>
                      <option value={3}>3 - Good</option>
                      <option value={2}>2 - Fair</option>
                      <option value={1}>1 - Poor</option>
                    </select>
                  </div>
                  <div className="mb-2">
                    <textarea
                      className="form-control"
                      placeholder="Write your review"
                      rows={3}
                      value={newReview.comment}
                      onChange={(e) => setNewReview(prev => ({ ...prev, comment: e.target.value }))}
                    ></textarea>
                  </div>
                  <button type="submit" className="btn btn-success">Submit Review</button>
                </form>
              </div>
            </div>

            {similar.length > 0 && (
              <div className="row mt-5">
                <div className="col-12">
                  <h3>Similar Products</h3>
                </div>
                {similar.map(sim => (
                  <div className="col-lg-3 col-md-6" key={sim._id}>
                    <div className="single-product">
                      <Link to={`/product/${sim._id}`}>
                        <img className="img-fluid" src={`http://localhost:5000/uploads/${sim.image}`} alt={sim.title} />
                        <div className="product-details">
                          <h6>{sim.brand}</h6>
                          <h5>{sim.title}</h5>
                          <div className="price"><h6>${sim.price}</h6></div>
                        </div>
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            )}

          </div>
        </section>

        <Footer />
      </div>
    </>
  );
};

export default ProductDetails;