import React, { useState } from "react";
import PublicLayout from "../layouts/PublicLayout";
import NewsCard from "../components/Card/NewsCard";
import About from "../components/About/About";
import Faq from "../components/Faq/Faq";
import { useLangContext } from "../context/LangContext";
import jsonTr from "../translations/tr/common.json";
import jsonEn from "../translations/en/common.json";
import { Helmet } from "react-helmet";

const Institutional = () => {
  const [content, setContent] = useState("hakkimizda");
  const { lang } = useLangContext();

  const handleButtonClick = (contentType) => {
    setContent(contentType);
  };

  const renderContent = () => {
    if (content === "hakkimizda") {
      return (
        <>
          <About />
        </>
      );
    } else if (content === "haberler") {
      return (
        <>
          <div>
            <NewsCard />
          </div>
        </>
      );
    } else if (content === "sss") {
      return (
        <>
          <Faq />
        </>
      );
    }
  };

  return (
    <PublicLayout>
      <Helmet>
        <title>Kurumsal</title>
        <meta name="keywords" content="kurumsal" />
      </Helmet>
      <div className="w-screen overflow-hidden ">
        <div className="bg-[#FDF9EE]">
          <div className="  lg:space-y-0 space-y-2 flex flex-col lg:flex lg:flex-row justify-center items-center lg:space-x-12   mb-4 pt-32">
            <button
              className={` lg:w-[12%] w-[70%] px-4 lg:px-12 py-2 rounded-3xl border-2 hover:bg-[#2F3D57] hover:text-white hover:border-[#2F3D57] ${
                content === "hakkimizda"
                  ? "bg-[#018EA0] border-[#018EA0] text-white"
                  : "bg-[#F1E9D6] border-[#018EA0] text-[#2F3D57]"
              }`}
              onClick={() => handleButtonClick("hakkimizda")}
            >
              {lang === "tr" ? jsonTr.Hakkımızda : jsonEn.Hakkımızda}
            </button>
            <button
              className={`  lg:w-[20%] w-[70%] px-4 md:px-12 py-2 rounded-3xl border-2 hover:bg-[#2F3D57] hover:text-white hover:border-[#2F3D57] ${
                content === "sss"
                  ? "bg-[#018EA0] border-[#018EA0] text-white "
                  : "bg-[#F1E9D6] border-[#018EA0] text-[#2F3D57] "
              }`}
              onClick={() => handleButtonClick("sss")}
            >
              {lang === "tr" ? jsonTr.SSS : jsonEn.SSS}
            </button>
            <button
              className={` lg:w-[12%] w-[70%] px-4 lg:px-12 py-2 rounded-3xl border-2 hover:bg-[#2F3D57] hover:text-white hover:border-[#2F3D57] ${
                content === "haberler"
                  ? "bg-[#018EA0] border-[#018EA0] text-white"
                  : "bg-[#F1E9D6] border-[#018EA0] text-[#2F3D57]"
              }`}
              onClick={() => handleButtonClick("haberler")}
            >
              {lang === "tr" ? jsonTr.Haberler : jsonEn.Haberler}
            </button>
          </div>
          <img src={"assets/img/ssslines.png"} alt="" className="" />
          <div className="">{renderContent()}</div>{" "}
          <img src={"assets/img/ssslines.png"} alt="" className="pb-12" />
        </div>{" "}
      </div>
    </PublicLayout>
  );
};

export default Institutional;
