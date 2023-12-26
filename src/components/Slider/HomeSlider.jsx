import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination, Mousewheel, Keyboard } from "swiper/modules";
import "../../input.css";
import { API_ENDPOINTS, API_FILE_URL } from "../../config/config";
import { useLangContext } from "../../context/LangContext";

const HomeSlider = () => {
  const [homeData, setHomeData] = useState([]);
  const [loading, setLoading] = useState(true);
  const { lang } = useLangContext();

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
    (slide) => slide.homeStatus === "Anasayfa İçerik"
  );

  return (
    <Swiper
      cssMode={true}
      navigation={true}
      style={{
        "--swiper-navigation-color": "#FFF",
        "--swiper-pagination-color": "#FFF",
      }}
      pagination={true}
      mousewheel={true}
      keyboard={true}
      modules={[Navigation, Pagination, Mousewheel, Keyboard]}
      className="mySwiper hidden md:block"
    >
      {filteredHomeData.map((slide, index) => (
        <SwiperSlide key={index} className="relative mt-20 lg:mt-24">
          <img
            src={`${API_FILE_URL}/homeSlider/${slide.homeImage}`}
            alt={`Slide ${index + 1}`}
            loading="lazy"
          />

          <div className="absolute flex flex-col justify-center items-center lg:top-1/4 lg:w-2/5 lg:left-1/2 left-1/2 top-1/4 lg:-mt-0 -mt-6 w-[60%] transform p-4 -ml-12 lg:-ml-0 md:w-[50%] ">
            <h3 className="lg:text-7xl text-md md:text-5xl text-white font-medium font-lemongrassscript lg:w-[85%] w-[100%]  text-center relative">
              {slide.homeContentTitle}
            </h3>

            <p className="lg:text-xl text-[7px] md:text-xl  text-white text-center w-[75%] text-center relative mt-2">
              {slide.homeContent}
            </p>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default HomeSlider;
