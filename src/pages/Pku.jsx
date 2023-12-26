import React, { useState, useEffect, useRef } from "react";
import PublicLayout from "../layouts/PublicLayout";
import { API_ENDPOINTS, API_FILE_URL, API_PDF_URL } from "../config/config";
import { useLangContext } from "../context/LangContext";
import { Link } from "react-router-dom";
import {
  CloudArrowDown,
  ArrowSquareIn,
  Warning,
  ArrowRight,
} from "@phosphor-icons/react";
import axios from "axios";
import SampleForm from "../pages/SampleForm";
import Game from "../components/Game/Game";
import { Helmet } from "react-helmet";
import decodeHtmlEntities from "../components/Functions/decodeHtmlEntities";
import Wave from "react-wavify";

const Pku = () => {
  const { lang } = useLangContext();
  const [data, setData] = useState([]);
  const [uniqueCategories, setUniqueCategories] = useState([]);
  const [dataContent, setDataContent] = useState([]);
  const [selectedPkuSubCategory, setSelectedPkuSubCategory] = useState(null);
  const [selectedPkuCategory, setSelectedPkuCategory] = useState(null);
  const contentDivRef = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const apiURL =
          lang === "tr"
            ? `${API_ENDPOINTS.JSON_PKU}`
            : `${API_ENDPOINTS.JSON_PKUEN}`;
        const response = await axios.get(apiURL);
        const data = response.data.pkucategory;
        const data2 = response.data.pku;

        setData(data);
        setDataContent(data2);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [lang]);
  const filteredPkuData = dataContent.filter((item) => {
    return (
      item.pkuSubCategory === selectedPkuSubCategory &&
      item.pkuCategory === selectedPkuCategory
    );
  });

  useEffect(() => {
    const uniqueCategoryTitles = [
      ...new Set(data.map((category) => category.pkuCategory)),
    ];
    setUniqueCategories(uniqueCategoryTitles);
  }, [data]);

  return (
    <PublicLayout>
      <Helmet>
        <title>Hasta Bilgilendirme</title>
        <meta name="keywords" content="hasta bilgilendirme " />
      </Helmet>

      <div className="w-screen overflow-hidden bg-[#FDF9EE]">
        <div className=" px-2 grid grid-cols-1 lg:flex lg:mt-44 mt-12 flex-row justify-center items-center lg:space-x-12 lg:space-y-0    mb-28 lg:pt-0 pt-24">
          <div className="relative inline-block lg:flex  lg:space-x-10 lg:space-y-0 space-y-3 mt-4">
            {uniqueCategories.map((categoryTitle, index) => (
              <div key={index} className="flex ">
                <div className="relative lg:z-40 z-70 lg:w-[100%] w-[95%] px-4  text-[#2F3D57] lg:px-12 py-2 rounded-3xl border-4 border-[#F1E9D6] ">
                  <p className="relative text-lg mb-2 lg:z-40 z-70 w-[100%]  lg:px-12 py-2 font-bold border-b-4 border-[#2F3D57]">
                    {categoryTitle}
                  </p>
                  {data
                    .filter((item) => item.pkuCategory === categoryTitle)
                    .map((subCategory, subIndex) => (
                      <button
                        className="flex flex-col ml-4 mt-2 font-medium hover:text-[#289FAE] "
                        onClick={() => {
                          setSelectedPkuCategory(categoryTitle);
                          setSelectedPkuSubCategory(subCategory.pkuSubCategory);

                          if (contentDivRef.current) {
                            contentDivRef.current.scrollIntoView({
                              behavior: "smooth",
                            });
                          }
                        }}
                      >
                        {subCategory.pkuSubCategory}
                      </button>
                    ))}
                </div>
              </div>
            ))}
          </div>
        </div>
        <Wave
          mask="url(#mask)"
          fill="#F1E9D6"
          className="waveAnimation"
          options={{ points: 12, speed: 0.2, amplitude: 30 }}
        >
          <defs>
            <linearGradient id="gradient" gradientTransform="rotate(80)">
              <stop offset="0.5" stopColor="white" />
              <stop offset="0.5" stopColor="black" />
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

        {selectedPkuSubCategory && (
          <div
            id="content"
            ref={contentDivRef}
            className=" pt-10 bg-[#F1E9D6]  "
          >
            <h1 className="text-[#2F3D57] text-2xl lg:text-4xl font-bold text-center lg:mt-2 pb-4  ">
              {selectedPkuSubCategory}
            </h1>
            <div className="grid md:grid-cols-2 grid-cols-1 md:px-32 gap-x-16 pb-16 mt- mx-6">
              {filteredPkuData.length === 0 &&
              selectedPkuSubCategory != "Oyunlar" &&
              selectedPkuSubCategory != "Games" &&
              selectedPkuSubCategory != "Numune Talep" &&
              selectedPkuSubCategory != "Sample Request" ? (
                <p className="text-[#2F3D57] pt-4  flex mt-4 justify-start items-center text-center text-xl">
                  <Warning size={32} weight="bold" />
                  Bu kategoride içerik bulunmamaktadır.
                </p>
              ) : (
                filteredPkuData.map((pkuItem, index) => (
                  <div key={index} className="mb-4 ">
                    {pkuItem.pkuTitle && !pkuItem.pkuPdf && (
                      <>
                        <div className="flex items-center border-2 mt-3 bg-[#30506A] text-[#fff] rounded-xl px-2 p-2 ">
                          <ArrowRight size={24} weight="bold" />{" "}
                          <h2 className=" text-md  font-bold ml-2 ">
                            {decodeHtmlEntities(pkuItem.pkuTitle)}
                          </h2>
                        </div>
                      </>
                    )}
                    {pkuItem.pkuLink && (
                      <div className="border-2 mt-3 bg-[#30506A] rounded-xl px-2 p-2 ">
                        <a
                          href={pkuItem.pkuLink}
                          className="flex hover:text-white text-center justify-center items-center text-[#fff] text-md font-bold"
                          target="_blank"
                        >
                          <ArrowSquareIn
                            size={30}
                            weight="bold"
                            className="mr-2"
                          />
                          {decodeHtmlEntities(pkuItem.pkuLinkTitle)}
                        </a>
                      </div>
                    )}
                    {pkuItem.pkuContent && (
                      <p
                        className="text-[#30506A] mt-3 px-2"
                        dangerouslySetInnerHTML={{ __html: pkuItem.pkuContent }}
                      />
                    )}
                    {pkuItem.pkuImage && !pkuItem.pkuPdf && (
                      <div className="flex justify-center">
                        <img
                          src={`${API_FILE_URL}/poster/${pkuItem.pkuImage}`}
                          className="lg:h-[370px] h-60 lg:py-4"
                        />
                      </div>
                    )}
                    {pkuItem.pkuPdf && (
                      <div className={`mt-4 ${pkuItem.pkuImage ? " " : ""}`}>
                        {pkuItem.pkuImage && (
                          <img
                            src={`${API_FILE_URL}/poster/${pkuItem.pkuImage}`}
                            className="lg:h-96 h-60 lg:py-4 w-full rounded-xl border-2 "
                          />
                        )}{" "}
                        <div
                          className={`border-2 bg-[#30506A] rounded-xl px-2 p-2 mb-4 flex text-center flex-col justify-center items-center ${
                            pkuItem.pkuImage ? "" : ""
                          }`}
                        >
                          <div>
                            <Link
                              to={`${API_PDF_URL}/${pkuItem.pkuPdf}`}
                              target="_blank"
                              className="text-md text-white font-bold flex items-center "
                            >
                              <CloudArrowDown
                                size={32}
                                weight="bold"
                                color="#fff"
                                className="mr-2 ml-2"
                              />
                              {decodeHtmlEntities(pkuItem.pkuTitle)}
                            </Link>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                ))
              )}
            </div>
            {selectedPkuSubCategory ===
              (lang === "tr" ? "Oyunlar" : "Games") && <Game />}
            {selectedPkuSubCategory ===
              (lang === "tr" ? "Numune Talep" : "Sample Request") && (
              <SampleForm />
            )}
          </div>
        )}
      </div>
    </PublicLayout>
  );
};

export default Pku;
