import React, { useState, useEffect } from "react";
import axios from "axios";
import PublicLayout from "../layouts/PublicLayout";
import { API_ENDPOINTS, API_FILE_URL, API_PDF_URL } from "../config/config";
import { useLangContext } from "../context/LangContext";
import jsonTr from "../translations/tr/common.json";
import jsonEn from "../translations/en/common.json";
import { Helmet } from "react-helmet";
import { CloudArrowDown } from "@phosphor-icons/react";
import { Animated } from "react-animated-css";
import { Link } from "react-router-dom";
import Wave from "react-wavify";

export default function Catalog() {
  const [zoomedIndex, setZoomedIndex] = useState(null);
  const [imageUrls, setImageUrls] = useState([]);
  const { lang } = useLangContext();

  useEffect(() => {
    const apiURL =
      lang === "tr" ? API_ENDPOINTS.JSON_CATALOG : API_ENDPOINTS.JSON_CATALOGEN;

    axios
      .get(apiURL)
      .then((response) => {
        setImageUrls(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  const handleImageHover = (index) => {
    setZoomedIndex(index);
  };

  const handleContainerMouseLeave = () => {
    setZoomedIndex(null);
  };
  return (
    <PublicLayout>
      <Helmet>
        <title>Kataloglar</title>
        <meta name="keywords" content="sertifikalar" />
      </Helmet>

      <div className="card flex bg-[#FDF9EE]  w-screen overflow-hidden ">
        <h1 className="font-lemongrassscript text-5xl  font-bold flex justify-center items-center  mt-36 md:mt-44">
          {lang === "tr" ? jsonTr.catalog : jsonEn.catalog}
        </h1>
        <Animated
          animationIn="fadeInDown"
          animationOut="fadeInDown"
          isVisible={true}
        >
          <div
            className=" mt-12 md:mt-8 mb-12 gap-x-10 gap-y-12  grid-cols-1 grid md:grid-cols-3 px-16"
            onMouseLeave={handleContainerMouseLeave}
          >
            {imageUrls.map((imageUrl, index) => (
              <div
                key={index}
                className={`image-container ${
                  zoomedIndex === index ? "zoomed" : ""
                }`}
                onMouseEnter={() => handleImageHover(index)}
              >
                <div className="flex flex-col items-center">
                  <p className="font-bold text-center text-xl">
                    {imageUrl.catalogName}
                  </p>
                  <img
                    src={`${API_FILE_URL}/catalog/${imageUrl.catalogImage}`}
                    className="image mt-2"
                    alt={`Certificate ${index}`}
                  />
                  <Link
                    to={`${API_PDF_URL}/${imageUrl.catalogPdf}`}
                    className="bg-[#2F3D57] text-white w-full rounded-md py-1 flex justify-center items-center  "
                    target="_blank"
                    href={"assets/pdf/mayalihanetr.pdf"}
                    rel="noopener noreferrer"
                  >
                    <button className="flex justify-center items-center">
                      <CloudArrowDown
                        size={32}
                        weight="fill"
                        className="mr-2"
                      />
                      İndir
                    </button>{" "}
                  </Link>{" "}
                </div>
              </div>
            ))}
          </div>
        </Animated>
        <Wave
          mask="url(#mask)"
          fill="#F1E9D6"
          className="waveAnimation"
          options={{ points: 10, speed: 0.2, amplitude: 30 }}
        >
          <defs>
            <linearGradient id="gradient" gradientTransform="rotate(80)">
              <stop offset="0.4" stopColor="white" />
              <stop offset="0.6" stopColor="black" />
            </linearGradient>
            <mask id="mask">
              <rect
                x="0"
                y="0"
                width="2000"
                height="400"
                fill="url(#gradient)"
              />
            </mask>
          </defs>
        </Wave>
      </div>
    </PublicLayout>
  );
}
