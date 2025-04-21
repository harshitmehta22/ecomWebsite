import React from "react";
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
const ExclusiveDeals = () => {
    const products = [
        {
            image: '/img/product/e-p1.png',
            price: '$150.00',
            oldPrice: '$210.00',
            title: 'Addidas New Hammer sole for Sports person'
        },
        {
            image: '/img/product/e-p1.png',
            price: '$150.00',
            oldPrice: '$210.00',
            title: 'Addidas New Hammer sole for Sports person'
        }
    ];
    return (
        <>
            <section class="exclusive-deal-area">
                <div class="container-fluid">
                    <div class="row justify-content-center align-items-center">
                        <div class="col-lg-6 no-padding exclusive-left">
                            <div class="row clock_sec clockdiv" id="clockdiv">
                                <div class="col-lg-12">
                                    <h1>Exclusive Hot Deal Ends Soon!</h1>
                                    <p>Who are in extremely love with eco friendly system.</p>
                                </div>
                                <div class="col-lg-12">
                                    <div class="row clock-wrap">
                                        <div class="col clockinner1 clockinner">
                                            <h1 class="days">150</h1>
                                            <span class="smalltext">Days</span>
                                        </div>
                                        <div class="col clockinner clockinner1">
                                            <h1 class="hours">23</h1>
                                            <span class="smalltext">Hours</span>
                                        </div>
                                        <div class="col clockinner clockinner1">
                                            <h1 class="minutes">47</h1>
                                            <span class="smalltext">Mins</span>
                                        </div>
                                        <div class="col clockinner clockinner1">
                                            <h1 class="seconds">59</h1>
                                            <span class="smalltext">Secs</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <a href="" class="primary-btn">Shop Now</a>
                        </div>
                        <div class="col-lg-6 no-padding exclusive-right">
                            <div class="active-exclusive-product-slider">
                                <Carousel
                                    showThumbs={false}
                                    showStatus={false}
                                    autoPlay
                                    infiniteLoop
                                    showIndicators={false}
                                    interval={3000}
                                    className="active-exclusive-product-slider"
                                >
                                    {products.map((product, index) => (
                                        <div className="single-exclusive-slider" key={index}>
                                            <img className="img-fluid" src={product.image} alt="product" />
                                            <div className="product-details">
                                                <div className="price">
                                                    <h6>{product.price}</h6>
                                                    <h6 className="l-through">{product.oldPrice}</h6>
                                                </div>
                                                <h4>{product.title}</h4>
                                                <div className="add-bag d-flex align-items-center justify-content-center">
                                                    <a className="add-btn" href="#"><i class="fa-solid fa-plus" style={{ color: 'white' }}></i></a>
                                                    <span className="add-text text-uppercase">Add to Bag</span>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </Carousel>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}
export default ExclusiveDeals