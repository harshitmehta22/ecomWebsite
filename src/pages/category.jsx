import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Header from '../components/header/header';
import Footer from '../components/footer/footer';
import { useCart } from '../CartContext';
import './category.css';

const Category = () => {
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [filters, setFilters] = useState({
        brand: '',
        color: '',
        size: [],
        minPrice: '',
        maxPrice: '',
        available: false
    });
    const { cart, addToCart, removeFromCart } = useCart();

    useEffect(() => {
        axios.get("http://localhost:5000/api/getproduct")
            .then(res => {
                setProducts(res.data.product);
                setFilteredProducts(res.data.product);
            })
            .catch(err => {
                console.error("Failed to fetch products:", err);
            });
    }, []);

    useEffect(() => {
        let filtered = products;

        if (filters.brand) {
            filtered = filtered.filter(product => product.brand?.toLowerCase().includes(filters.brand.toLowerCase()));
        }

        if (filters.color) {
            filtered = filtered.filter(product => product.color?.toLowerCase().includes(filters.color.toLowerCase()));
        }

        if (filters.size.length > 0) {
            filtered = filtered.filter(product => 
                filters.size.some(size => product.size?.includes(size))
            );
        }

        if (filters.minPrice) {
            filtered = filtered.filter(product => product.price >= parseFloat(filters.minPrice));
        }

        if (filters.maxPrice) {
            filtered = filtered.filter(product => product.price <= parseFloat(filters.maxPrice));
        }

        if (filters.available) {
            filtered = filtered.filter(product => product.stock > 0);
        }

        setFilteredProducts(filtered);
    }, [filters, products]);

    const handleFilterChange = (e) => {
        const { name, value, type, checked } = e.target;
        if (type === 'checkbox') {
            if (name === 'size') {
                setFilters(prev => ({
                    ...prev,
                    size: checked 
                        ? [...prev.size, value]
                        : prev.size.filter(s => s !== value)
                }));
            } else {
                setFilters(prev => ({ ...prev, [name]: checked }));
            }
        } else {
            setFilters(prev => ({ ...prev, [name]: value }));
        }
    };

    const clearFilters = () => {
        setFilters({
            brand: '',
            color: '',
            size: [],
            minPrice: '',
            maxPrice: '',
            available: false
        });
    };

    return (
        <>
            <Header />
            <section className="category-area section_gap">
                <div className="container">
                    <div className="row">
                        {/* Filters Sidebar */}
                        <div className="col-lg-3">
                            <div className="filter-sidebar">
                                <h4>Filters</h4>
                                
                                {/* Brand Filter */}
                                <div className="filter-group">
                                    <label>Brand</label>
                                    <input
                                        type="text"
                                        name="brand"
                                        value={filters.brand}
                                        onChange={handleFilterChange}
                                        placeholder="Search brand..."
                                        className="form-control"
                                    />
                                </div>

                                {/* Color Filter */}
                                <div className="filter-group">
                                    <label>Color</label>
                                    <input
                                        type="text"
                                        name="color"
                                        value={filters.color}
                                        onChange={handleFilterChange}
                                        placeholder="Search color..."
                                        className="form-control"
                                    />
                                </div>

                                {/* Size Filter */}
                                <div className="filter-group">
                                    <label>Size</label>
                                    <div className="size-options">
                                        {['S', 'M', 'L', 'XL', 'XXL', '6', '7', '8', '9', '10', '11', '12'].map(size => (
                                            <label key={size} className="checkbox-label">
                                                <input
                                                    type="checkbox"
                                                    name="size"
                                                    value={size}
                                                    checked={filters.size.includes(size)}
                                                    onChange={handleFilterChange}
                                                />
                                                {size}
                                            </label>
                                        ))}
                                    </div>
                                </div>

                                {/* Price Range */}
                                <div className="filter-group">
                                    <label>Price Range</label>
                                    <div className="price-range">
                                        <input
                                            type="number"
                                            name="minPrice"
                                            value={filters.minPrice}
                                            onChange={handleFilterChange}
                                            placeholder="Min"
                                            className="form-control"
                                        />
                                        <input
                                            type="number"
                                            name="maxPrice"
                                            value={filters.maxPrice}
                                            onChange={handleFilterChange}
                                            placeholder="Max"
                                            className="form-control"
                                        />
                                    </div>
                                </div>

                                {/* Availability */}
                                <div className="filter-group">
                                    <label className="checkbox-label">
                                        <input
                                            type="checkbox"
                                            name="available"
                                            checked={filters.available}
                                            onChange={handleFilterChange}
                                        />
                                        In Stock Only
                                    </label>
                                </div>

                                <button onClick={clearFilters} className="btn btn-secondary">Clear Filters</button>
                            </div>
                        </div>

                        {/* Products Grid */}
                        <div className="col-lg-9">
                            <div className="row">
                                {filteredProducts?.map((product) => {
                                    const cartItem = cart.find(item => item._id === product._id);
                                    const quantity = cartItem ? cartItem.quantity : 0;
                                    return (
                                        <div className="col-lg-4 col-md-6" key={product._id}>
                                            <div className="single-product">
                                                <Link to={`/product/${product._id}`} className="product-link">
                                                    <img className="img-fluid" src={`http://localhost:5000/uploads/${product.image}`} alt="" />
                                                </Link>
                                                {product.stock <= 0 && (
                                                    <div className="stock-badge out-of-stock">Out of Stock</div>
                                                )}
                                                {product.stock > 0 && (
                                                    <div className="stock-badge in-stock">In Stock</div>
                                                )}
                                                <div className="product-details">
                                                    <h6>{product.brand}</h6>
                                                    <h5><Link to={`/product/${product._id}`} className="text-decoration-none text-dark">{product.title}</Link></h5>
                                                    <div className="price">
                                                        {product.originalPrice && product.originalPrice > product.price ? (
                                                            <>
                                                                <h6>${product.price}</h6>
                                                                <h6 className="l-through">${product.originalPrice}</h6>
                                                                <span className="discount-amount">Save ${(product.originalPrice - product.price).toFixed(2)}</span>
                                                            </>
                                                        ) : (
                                                            <h6>${product.price}</h6>
                                                        )}
                                                    </div>
                                                    <div className="d-flex justify-content-between mt-2">
                                                        <span><strong>Size:</strong> {product.size?.join(', ')}</span>
                                                        <span><strong>Color:</strong> {product.color}</span>
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
                                                        <a href="" className="social-info ml-2">
                                                            <i className="fa-regular fa-heart"></i>
                                                            <p className="hover-text">Wishlist</p>
                                                        </a>
                                                        <a href="" className="social-info">
                                                            <i className="fa-solid fa-up-down-left-right"></i>
                                                            <p className="hover-text">view more</p>
                                                        </a>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <Footer />
        </>
    );
};

export default Category;