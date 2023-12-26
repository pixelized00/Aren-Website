import React, { useState, useEffect } from "react";
import axios from "axios";
import "../../input.css";
import { API_ENDPOINTS, API_FILE_URL } from "../../config/config";
import jsonTr from "../../translations/tr/common.json";
import jsonEn from "../../translations/en/common.json";
import { useLangContext } from "../../context/LangContext";

const ProductsSlider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [productData, setProductData] = useState([]);
  const { lang } = useLangContext();

  useEffect(() => {
    axios
      .get(`${API_ENDPOINTS.JSON_HOME}`)
      .then((response) => {
        const filteredData = response.data.filter(
          (item) => item.homeStatus === "Anasayfa Ürün"
        );
        setProductData(filteredData);
      })
      .catch((error) => {
        console.error("Error fetching data: ", error);
      });
  }, []);

  useEffect(() => {
    if (window.particlesJS) {
      window.particlesJS("particles-js", {
        particles: {
          number: {
            value: 2,
            density: {
              enable: true,
              value_area: 45,
            },
          },
          line_linked: {
            enable: false,
          },
          shape: {
            type: "image",
            image: {
              src: "assets/img/kurabiye.png",
              width: 12,
              height: 6,
            },
          },
          size: {
            value: 16,
            random: true,
            anim: {
              enable: false,
              speed: 400,
              size_min: 0.4,
              sync: false,
            },
          },
          opacity: {
            value: 0.1,
            random: false,
            anim: {
              enable: false,
              speed: 1,
              opacity_min: 0.1,
              sync: false,
            },
          },
          move: {
            enable: true,
            speed: 4,
            direction: "none",
            random: false,
            straight: false,
            out_mode: "out",
            bounce: false,
            attract: {
              enable: false,
              rotateX: 600,
              rotateY: 1200,
            },
          },
        },
        color: "#F1E9D6",
        interactivity: {
          events: {
            onClick: {
              enable: false,
              mode: "push",
            },
          },
        },

        opacity: {
          value: 0.5,
          random: false,
          anim: {
            enable: false,
            speed: 1,
            opacity_min: 0.1,
            sync: false,
          },
        },
      });
      window.particlesInitialized = true;
    }
  }, []);

  return (
    <div className="relative w-screen overflow-hidden flex flex-col">
      <div
        id="particles-js"
        style={{ position: "absolute", width: "100%", height: "100%" }}
      ></div>
      <div className="bg-[#F1E9D6]">
        <div className="mt-28 px-8 md:px-0 relative  mb-44 z-0 overflow-x-visible  flex-row flex justify-center items-center">
          {productData.map((product, index) => (
            <img
              key={product.id}
              src={`${API_FILE_URL}/homeProduct/${
                productData[(currentIndex + index) % productData.length]
                  .homeImage
              }`}
              className={`w-1/2 lg:w-1/6 lg:h-96  h-44 lg:mx-16 px-1 ${
                index === 1 ? "middle-image" : ""
              }`}
              alt={`Cookie ${index}`}
            />
          ))}
        </div>
      </div>

      <a href="/products">
        {" "}
        <button
          type="button"
          className="md:mt-64 mt-28 bg-[#2F3D57] w-44 h-12 rounded-3xl text-white text-lg absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
        >
          {lang === "tr" ? jsonTr.ÜrünlereGit : jsonEn.ÜrünlereGit}
        </button>
      </a>
    </div>
  );
};

export default ProductsSlider;
