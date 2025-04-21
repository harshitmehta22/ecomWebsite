import React from "react";
import { Carousel } from 'react-responsive-carousel';
import './banner.css';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

const Banner = () => {
  const slides = [
    {
      title: "Nike New Collection!",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation.",
      image: "/img/banner/banner-img.png"
    },
    {
      title: "Nike New Collection!",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation.",
      image: "/img/banner/banner-img.png"
    }
  ];
  return (
    <>
      <section class="banner-area">
        <div class="container">
          <div class="row fullscreen align-items-center justify-content-start">
            <div class="col-lg-12">
              <div className="active-banner-slider banner-carousel-wrapper">
                <Carousel
                  showArrows={false}
                  showIndicators={false}
                  autoPlay={true}
                  infiniteLoop={true}
                  showThumbs={false}
                  showStatus={false}
                  interval={5000}
                >
                  {slides.map((slide, index) => (
                    <div className="row single-slide" key={index}>
                      <div className="col-lg-5 col-md-6 banner-content-container">
                        <div className="banner-content">
                          <h1>{slide.title}</h1>
                          <p>{slide.description}</p>
                          <div className="add-bag d-flex align-items-center">
                            <a className="add-btn" href="#"><i class="fa-solid fa-plus" style={{ color: 'white' }}></i></a>
                            <span className="add-text text-uppercase">Add to Bag</span>
                          </div>
                        </div>
                      </div>
                      <div className="col-lg-7 banner-img-container">
                        <img src={slide.image} alt="banner" className="img-fluid" />
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
export default Banner;