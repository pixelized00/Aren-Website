import React, { useState, useEffect } from "react";
import Carousel from "react-bootstrap/Carousel";
import { API_ENDPOINTS, API_FILE_URL } from "../../config/config";

const MobileSlider = ({ lang }) => {
  const [loading, setLoading] = useState(true);
  const [homeData, setHomeData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const apiURL =
          lang === "tr"
            ? `${API_ENDPOINTS.JSON_HOME}`
            : `${API_ENDPOINTS.JSON_HOMEEN}`;
        const response = await fetch(apiURL);
        const data = await response.json();
        setHomeData(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [lang]);

  if (loading) {
    return <div>Loading...</div>;
  }

  const filteredHomeData = homeData.filter(
    (slide) => slide.homeStatus === "Mobil Anasayfa İçerik"
  );

  return (
    <div className="">
      <Carousel data-bs-theme="dark" className="mt-20">
        {filteredHomeData.map((slide) => (
          <Carousel.Item key={slide.id}>
            <img
              className="d-block w-100"
              src={`${API_FILE_URL}/mobileHomeSlider/${slide.homeImage}`}
              alt={slide.altText}
            />
          </Carousel.Item>
        ))}
      </Carousel>
    </div>
  );
};

export default MobileSlider;
