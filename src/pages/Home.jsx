import React from "react";
import PublicLayout from "../layouts/PublicLayout";
import HomeSlider from "../components/Slider/HomeSlider";
import ProductsSlider from "../components/Slider/ProductsSlider";
import { Helmet } from "react-helmet";
import MobileSlider from "../components/Slider/MobileSlider";

const Home = () => {
  return (
    <PublicLayout>
      <Helmet>
        <title>Anasayfa</title>
      </Helmet>
      <div className="w-screen overflow-hidden">
        <div className="hidden md:block">
          <HomeSlider />{" "}
        </div>
        <div className="md:hidden ">
          <MobileSlider />
        </div>
        <ProductsSlider />
      </div>
    </PublicLayout>
  );
};

export default Home;
