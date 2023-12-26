import React, { useState, useEffect } from "react";
import axios from "axios";
import PublicLayout from "../layouts/PublicLayout";
import { API_ENDPOINTS, API_FILE_URL } from "../config/config";
import { useLangContext } from "../context/LangContext";
import jsonTr from "../translations/tr/common.json";
import jsonEn from "../translations/en/common.json";
import { Helmet } from "react-helmet";
import Wave from "react-wavify";

export default function Certificate() {
  const [zoomedIndex, setZoomedIndex] = useState(null);
  const [imageUrls, setImageUrls] = useState([]);
  const { lang } = useLangContext();

  useEffect(() => {
    axios
      .get(`${API_ENDPOINTS.JSON_CERTIFICATE}`)
      .then((response) => {
        setImageUrls(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  const setZoomedIndexOnImageHover = (index) => {
    setZoomedIndex(index);
  };

  const handleContainerMouseLeave = () => {
    setZoomedIndex(null);
  };

  const gridContainerStyles = `
    md:px-28
    mt-10
    mb-20
    gap-x-8
    gap-y-16
    grid-cols-1
    grid
    md:grid-cols-3
    px-4
  `;

  return (
    <PublicLayout>
      <Helmet>
        <title>Sertifikalar</title>
        <meta name="keywords" content="sertifikalar" />
      </Helmet>

      <div className="card flex bg-[#FDF9EE]">
        <h1 className="font-lemongrassscript text-6xl font-bold flex justify-center items-center  mt-36 md:mt-44">
          {lang === "tr" ? jsonTr.Sertifikalar : jsonEn.Sertifikalar}
        </h1>
        <div
          className={gridContainerStyles}
          onMouseLeave={handleContainerMouseLeave}
        >
          {imageUrls.map((imageUrl, index) => (
            <div
              key={index}
              className={`image-container ${
                zoomedIndex === index ? "zoomed" : ""
              }`}
              onMouseEnter={() => setZoomedIndexOnImageHover(index)}
            >
              <img
                src={`${API_FILE_URL}/certificate/${imageUrl.certificateImage}`}
                className="image"
                alt={`Certificate ${index}`}
              />
            </div>
          ))}
        </div>
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
