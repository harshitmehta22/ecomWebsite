import React from "react";
import Header from "../components/header/header";
import Banner from "../components/banner/banner";
import Feature from "../components/features/feature";
import Category from "../components/category/category";
import Product from "../components/product/product";
import ExclusiveDeals from "../components/exclusivedeals/exclusivedeals";
const Home = () => {
    return(
        <>
         <div className="main-wrapper">
            <Header/>
            <Banner/>
            <Feature/>
            <Category/>
            <Product/>
            <ExclusiveDeals/>
         </div>
        </>
    )
}

export default Home;