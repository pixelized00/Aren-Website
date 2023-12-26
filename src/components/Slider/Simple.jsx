import React, { useState, useEffect } from "react";
import { API_ENDPOINTS, API_FILE_URL } from "../../config/config";
import { Link } from "react-router-dom";
import { useLangContext } from "../../context/LangContext";
import { Animated } from "react-animated-css";

const Simple = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [productData, setProductData] = useState(null);
  const { lang } = useLangContext();

  useEffect(() => {
    const fetchProductData = async () => {
      try {
        const apiURL =
          lang === "tr"
            ? ` ${API_ENDPOINTS.JSON_PRODUCT}`
            : `${API_ENDPOINTS.JSON_PRODUCTEN}`;
        const response = await fetch(apiURL);
        const data = await response.json();
        setProductData(data.products);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchProductData();
  }, [lang]);

  const prevImage = () => {
    if (productData && productData.length > 1) {
      setCurrentImageIndex((prevIndex) =>
        prevIndex === 0 ? productData.length - 1 : prevIndex - 1
      );
    }
  };

  const nextImage = () => {
    if (productData && productData.length > 1) {
      setCurrentImageIndex((prevIndex) =>
        prevIndex === productData.length - 1 ? 0 : prevIndex + 1
      );
    }
  };

  return (
    <div className="slider-container">
      <button className="prev-button1" onClick={prevImage}>
        &lt;
      </button>
      <div className="flex flex-col justify-center items-center">
        <div className="w-[60%] rounded-3xl drop-shadow-3xl bg-white mt-12 mb-10 text-center">
          {productData && productData.length > 0 && (
            <Link
              to={`/productsdetails/${productData[currentImageIndex].productId}`}
            >
              <>
                <Animated
                  animationIn="slideInDown"
                  animationOut="slideInDown"
                  isVisible={true}
                >
                  {" "}
                  <img
                    src={`${API_FILE_URL}/products/${productData[currentImageIndex].productImage}`}
                    alt={`Products ${currentImageIndex + 1}`}
                    className=" mx-auto max-w-full -mt-12"
                  />{" "}
                </Animated>
                <div className="mb-2">
                  <p className="text-[#018EA0] font-bold">
                    {productData[currentImageIndex].productName}{" "}
                  </p>
                  <p className="text-[#018EA0]">
                    {productData[currentImageIndex].productGram}{" "}
                  </p>
                </div>
              </>
            </Link>
          )}
        </div>
      </div>
      <button className="next-button1" onClick={nextImage}>
        &gt;
      </button>
    </div>
  );
};

export default Simple;
