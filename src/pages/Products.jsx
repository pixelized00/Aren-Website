import React, { useState, useEffect, useRef } from "react";
import PublicLayout from "../layouts/PublicLayout";
import ProductsAll from "../components/Products/ProducstAll";
import { ArrowLeft, ArrowRight } from "@phosphor-icons/react";
import { API_ENDPOINTS, API_FILE_URL } from "../config/config";
import axios from "axios";
import { Warning } from "@phosphor-icons/react";
import { Link } from "react-router-dom";
import { MagnifyingGlass } from "@phosphor-icons/react";
import { useLangContext } from "../context/LangContext";
import jsonTr from "../translations/tr/common.json";
import jsonEn from "../translations/en/common.json";
import decodeHtmlEntities from "../components/Functions/decodeHtmlEntities";
import { Helmet } from "react-helmet";
import { Animated } from "react-animated-css";

const Products = () => {
  const [isAllProductsSelected] = useState(true);
  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedSubcategory, setSelectedSubcategory] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const { lang } = useLangContext();
  const contentDivRef = useRef(null);
  const [listMode, setListMode] = useState("grid4");
  const toggleDropdown = (category) => {
    setSelectedCategory(category);
    setSelectedSubcategory("");
    setIsOpen(!isOpen);
  };
  const [searchText, setSearchText] = useState("");

  const [apiData, setApiData] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [apiDataHome, setApiDataHome] = useState([]);
  const apiURL =
    lang === "tr"
      ? API_ENDPOINTS.JSON_PRODUCT_HOME
      : API_ENDPOINTS.JSON_PRODUCT_HOMEEN;

  useEffect(() => {
    axios
      .get(apiURL)
      .then((response) => {
        const data = response.data.productscategory;
        const data2 = response.data.products;
        setApiData(data2);
        const data1 = response.data.productshome;
        setApiDataHome(data1);
        const uniqueCategories = [
          ...new Set(data.map((item) => item.productsCategoryTitle)),
        ];
        setCategories(uniqueCategories);

        const categoryToSubcategoriesMap = {};
        data.forEach((item) => {
          const category = item.productsCategoryTitle;
          const subcategory = item.productsSubcategoryTitle;

          if (!categoryToSubcategoriesMap[category]) {
            categoryToSubcategoriesMap[category] = [];
          }

          if (subcategory) {
            categoryToSubcategoriesMap[category].push(subcategory);
          }
        });

        if (uniqueCategories.length > 0) {
          setSubcategories(categoryToSubcategoriesMap[uniqueCategories[0]]);
        }
      })
      .catch((error) => {
        console.error("Veri çekme hatası:", error);
      });
  }, [apiURL]);

  useEffect(() => {
    if (selectedCategory !== "" && selectedSubcategory !== "") {
      const filteredProducts = apiData.filter(
        (product) =>
          product.productCategory === selectedCategory &&
          product.productSubcategory === selectedSubcategory &&
          product.productName.toLowerCase().includes(searchText.toLowerCase())
      );

      const uniqueFilteredProducts = Array.from(
        new Set(filteredProducts.map((product) => product.productId))
      ).map((productId) => {
        return filteredProducts.find(
          (product) => product.productId === productId
        );
      });

      setFilteredProducts(uniqueFilteredProducts);
    } else {
      const filteredProducts = apiData.filter((product) =>
        product.productName.toLowerCase().includes(searchText.toLowerCase())
      );

      const uniqueFilteredProducts = Array.from(
        new Set(filteredProducts.map((product) => product.productId))
      ).map((productId) => {
        return filteredProducts.find(
          (product) => product.productId === productId
        );
      });

      setFilteredProducts(uniqueFilteredProducts);
    }
  }, [selectedCategory, selectedSubcategory, apiData, searchText]);

  const handleNextPage = () => {
    setCurrentPage((prevPage) => (prevPage + 1) % apiDataHome.length);
  };

  const handlePrevPage = () => {
    setCurrentPage(
      (prevPage) => (prevPage - 1 + apiDataHome.length) % apiDataHome.length
    );
  };

  const handleSubcategoryClick = (subcategory) => {
    if (selectedSubcategory === subcategory) {
      setSelectedSubcategory("");
    } else {
      setSelectedSubcategory(subcategory);
      setIsOpen(false);
    }
  };
  const handleAllProductsClick = () => {
    setSelectedCategory("");
    setSelectedSubcategory("");
    setIsOpen(false);
  };

  return (
    <PublicLayout>
      <Helmet>
        <title>Ürünler</title>
        <meta name="keywords" content="ürünler , aren ilaç ürünler  " />
      </Helmet>
      <div className="w-screen overflow-hidden bg-[#FDF9EE]">
        <div className="mb-20">
          <div className="px-2 grid grid-cols-1 lg:flex flex-row justify-center items-center lg:space-x-12 lg:space-y-0 space-y-2  mb-4 mt-32">
            <button
              className={` lg:w-[15%] w-[100%] px-4 lg:px-12 py-2 rounded-3xl border-2 ${
                isAllProductsSelected
                  ? "hover:bg-[#2F3D57] hover:text-white relative lg:z-40 z-70  w-[100%] px-4 lg:px-12 py-2 rounded-3xl border-2 bg-[#F1E9D6] border-[#2F3D57] text-[#2F3D57] selected-button"
                  : "bg-[#F1E9D6] text-[#2F3D57]"
              }`}
              onClick={() => {
                handleAllProductsClick();
                if (contentDivRef.current) {
                  contentDivRef.current.scrollIntoView({
                    behavior: "smooth",
                  });
                }
              }}
            >
              {lang === "tr" ? jsonTr.TümÜrünler : jsonEn.TümÜrünler}
            </button>
            <div className="relative  lg:flex lg:space-x-10 lg:space-y-0 space-y-3">
              {categories.map((category, index) => (
                <div key={index} className="flex justify-center">
                  <button
                    onClick={() => toggleDropdown(category)}
                    className={`hover:bg-[#2F3D57] hover:text-white relative lg:z-40 z-70  w-[100%] px-4 lg:px-12 py-2 rounded-3xl border-2 bg-[#F1E9D6] border-[#2F3D57] text-[#2F3D57] selected-button`}
                  >
                    {category}
                  </button>

                  {selectedCategory === category && isOpen && (
                    <div className="absolute mt-8 lg:w-[50%] w-[100%] overflow-hidden z-30 backdrop-blur-lg backdrop-brightness-150 py-2 border-2 border-[#707070] rounded-2xl shadow-md px-4">
                      <ul className="mt-2">
                        {" "}
                        {subcategories.map((subcategory, index) => (
                          <li key={index}>
                            <button
                              className={`text-[#30506A] underline mt-2 hover:text-[#289FAE] ${
                                selectedSubcategory === subcategory
                                  ? "text-[#2F3D57]"
                                  : ""
                              }`}
                              onClick={() =>
                                handleSubcategoryClick(subcategory)
                              }
                            >
                              {subcategory}
                            </button>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
          {selectedSubcategory === "" ? (
            <div className="flex-col lg:flex-row w-screen flex bg-[#FDF9EE] items-center lg:px-16 lg:py-8 py-8">
              <div className="lg:w-1/2 lg:h-96 w-96 h-1/2 lg:ml-12 ml-8 flex-row items-center justify-around overflow-hidden lg:px-0 ">
                <div className="flex-col lg:w-1/6 w-1/4 lg:ml-8 lg:h-48 lg:mt-40 absolute items-center justify-center">
                  <img
                    src={"assets/svg/ok1.svg"}
                    className="lg:w-1/4 w-1/2 lg:ml-28 md:-ml-12 ml-12 lg:mt-2 mt-28 "
                    alt=""
                  />
                  <p className=" lg:text-lg text-xs text-cyan-900 ml-2 lg:ml-0 text-start ">
                    {apiDataHome.length > 0
                      ? apiDataHome[currentPage].productshomeTitle1
                      : ""}
                  </p>
                </div>
                <Animated
                  animationIn="slideInDown"
                  animationOut="slideInDown"
                  isVisible={true}
                >
                  <img
                    src={`${API_FILE_URL}/productsHome/${
                      apiDataHome.length > 0
                        ? apiDataHome[currentPage].productshomeImage1
                        : ""
                    }`}
                    className="lg:h-[370px] lg:w-2/6 w-1/3 lg:ml-72 h-60 ml-28 lg:py-4"
                    alt="Product"
                  />
                </Animated>
                <div className="flex-col lg:w-1/6  lg:h-48 w-1/6 lg:right-1/2 right-0 lg:-mr-32 mr-12 lg:top-1/2 top-1/3 lg:mt-0 mt-28 absolute items-center justify-center">
                  <img
                    src={"assets/svg/ok2.svg"}
                    className="lg:w-1/4 w-12 lg:ml-10 "
                    alt=""
                  />
                  <p className=" lg:text-lg lg:ml-12 text-sm text-cyan-900 w-2/3 text-center">
                    {apiDataHome.length > 0
                      ? apiDataHome[currentPage].productshomeTitle2
                      : ""}
                  </p>
                </div>
              </div>

              <div className="lg:w-1/2 w-screen lg:h-96 h-1/2  flex items-center justify-center ">
                <Animated
                  animationIn="slideInUp"
                  animationOut="slideInUp"
                  isVisible={true}
                >
                  <img
                    src={`${API_FILE_URL}/productsHome/${
                      apiDataHome.length > 0
                        ? apiDataHome[currentPage].productshomeImage2
                        : ""
                    }`}
                    className="lg:h-96 h-80   relative"
                    alt="Product"
                  />
                </Animated>

                <div className="lg:w-1/6 lg:h-32 w-2/5 h-16 lg:mt-16 mb-8 text-center absolute">
                  <Animated
                    animationIn="slideInUp"
                    animationOut="slideInUp"
                    isVisible={true}
                  >
                    <p className="lg:text-lg text-sm text-cyan-900 font-medium w-full">
                      {apiDataHome.length > 0
                        ? apiDataHome[currentPage].productshomeTitle3
                        : ""}
                    </p>
                    <p className="text-[#4395C5] font-lemongrassscript font-semibold lg:text-2xl text-lg ">
                      {apiDataHome.length > 0
                        ? apiDataHome[currentPage].productshomeTitle4
                        : ""}
                    </p>
                  </Animated>
                </div>
              </div>

              <button
                className="prev-button lg:w-16 lg:h-16"
                onClick={handlePrevPage}
              >
                <ArrowLeft size={32} weight="bold" color="white" />
              </button>

              <button
                className="next-button lg:w-16 lg:h-16"
                onClick={handleNextPage}
              >
                <ArrowRight size={32} weight="bold" color="white" />
              </button>
            </div>
          ) : null}
        </div>
        <div className="bg-[#F1E9D6]  overflow-hidden pb-12 ">
          <div id="content" ref={contentDivRef} className="pt-12 text-center">
            {selectedSubcategory === "" ? (
              <ProductsAll />
            ) : (
              <div className="">
                <div className="flex justify-between items-center px-16 ">
                  <div className="flex justify-center bg-[#FEFCF7] border-2 border-[#2F3D57] rounded-3xl py-1 px-2 lg:w-[20%]">
                    <MagnifyingGlass
                      size={28}
                      weight="bold"
                      className="ml-2 mr-2"
                    />
                    <input
                      type="text"
                      className="flex-1 py-1 rounded-3xl border-0 focus:outline-none bg-transparent"
                      placeholder={
                        lang === "tr" ? jsonTr.urunismigir : jsonEn.urunismigir
                      }
                      value={searchText}
                      onChange={(e) => setSearchText(e.target.value)}
                    />
                  </div>

                  <div className="flex  space-x-2 hidden md:block  ">
                    <p className="font-bold mb-2 mr-1 hidden md:block underline">
                      Görünüm
                    </p>{" "}
                    <button
                      className={`list-mode-button ${
                        listMode === "grid4" ? "active" : ""
                      }`}
                      onClick={() => setListMode("grid4")}
                    >
                      <img
                        src={"assets/svg/four.svg"}
                        alt="User"
                        className=" w-7 h-7 "
                      />
                    </button>
                    <button
                      className={`list-mode-button ${
                        listMode === "grid5" ? "active" : ""
                      }`}
                      onClick={() => setListMode("grid5")}
                    >
                      <img
                        src={"assets/svg/five.svg"}
                        alt="User"
                        className="mr-2 w-7 h-7"
                      />
                    </button>
                  </div>
                </div>

                {selectedSubcategory === "" ? null : (
                  <div className=" gap-4 mt-20">
                    <div
                      className={`grid ${
                        listMode === "grid4"
                          ? "grid-cols-1 md:grid-cols-4"
                          : "grid-cols-1 md:grid-cols-5 px-12 gap-10"
                      } `}
                    >
                      {filteredProducts.length === 0 ? (
                        <p className="text-[#30506A] pt-4  flex flex-col justify-center items-center text-center text-xl">
                          <Warning size={32} weight="bold" />
                          Bu kategoride içerik bulunmamaktadır.
                        </p>
                      ) : (
                        filteredProducts.map((product, index) => (
                          <Link
                            to={`/productsdetails/${product.productId}`}
                            key={index}
                          >
                            <div
                              key={product.productId}
                              className="flex justify-center items-center bg-[#F1E9D6] hover:text-[#018EA0]"
                            >
                              <div className="w-64 rounded-3xl drop-shadow-3xl bg-white mt-10 mb-10 text-center h-64 hover:text-[#018EA0]">
                                <div className="relative">
                                  <img
                                    src={`${API_FILE_URL}/products/${product.productImage}`}
                                    alt={product.productName}
                                    className="hover:text-[#018EA0] h-[12rem] mx-auto max-w-full -mt-16 rounded-3xl"
                                  />
                                </div>
                                <p className="text-md font-extrabold text-[#2F3D57] px-1 hover:text-[#018EA0]">
                                  {decodeHtmlEntities(product.productName)}
                                </p>
                                <p className="text-md text-[#2F3D57] font-medium hover:text-[#018EA0]">
                                  {product.productGram} gr
                                </p>
                              </div>
                            </div>
                          </Link>
                        ))
                      )}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </PublicLayout>
  );
};

export default Products;
