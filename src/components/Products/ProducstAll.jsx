import React, { useState, useEffect } from "react";
import { MagnifyingGlass } from "@phosphor-icons/react";
import { API_ENDPOINTS, API_FILE_URL } from "../../config/config";
import { Link } from "react-router-dom";
import { useLangContext } from "../../context/LangContext";
import decodeHtmlEntities from "../Functions/decodeHtmlEntities";
import jsonTr from "../../translations/tr/common.json";
import jsonEn from "../../translations/en/common.json";

const CenteredImageCard = ({ imageUrl, title, productGram }) => {
  return (
    <div className="flex justify-center items-center bg-[#F1E9D6] hover:text-[#018EA0] ">
      <div className="w-64 rounded-[58px] drop-shadow-3xl bg-white mt-10 mb-10 text-center h-64 hover:text-[#018EA0] ">
        <div className="relative">
          <img
            src={imageUrl}
            alt={title}
            className="h-[12rem]  mx-auto max-w-full -mt-16 rounded-3xl"
          />
        </div>
        <p className="text-md hover:text-[#289FAE] font-extrabold text-[#2F3D57] mx-2">
          {title}
        </p>
        <p className="text-md hover:text-[#289FAE] text-[#2F3D57]">
          {productGram} gr
        </p>
      </div>
    </div>
  );
};

const ProductsAll = () => {
  const [products, setProducts] = useState([]);
  const [searchText, setSearchText] = useState("");
  const { lang } = useLangContext();
  const [listMode, setListMode] = useState("grid4");

  useEffect(() => {
    const fetchProductData = async () => {
      try {
        const apiURL =
          lang === "tr"
            ? ` ${API_ENDPOINTS.JSON_PRODUCT}`
            : `${API_ENDPOINTS.JSON_PRODUCTEN}`;
        const response = await fetch(apiURL);
        const data = await response.json();
        setProducts(data.products);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchProductData();
  }, [lang]);

  return (
    <>
      <div className="w-screen overflow-hidden flex flex-col justify-end items-end px-16  ">
        <p className="font-bold mb-2 mr-1 hidden md:block underline">Görünüm</p>
        <div className="flex justify-center items-center space-x-2 hidden md:block">
          <button
            className={`list-mode-button ${
              listMode === "grid4" ? "active" : ""
            }`}
            onClick={() => setListMode("grid4")}
          >
            <img src={"assets/svg/four.svg"} alt="User" className=" w-7 h-7 " />
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
            />{" "}
          </button>{" "}
        </div>
      </div>
      <div className=" text-center">
        <div className="md:px-[500px] px-8">
          <div className="flex bg-[#FEFCF7] items-center border-2 border-[#2F3D57] rounded-3xl py-1 px-2">
            <MagnifyingGlass size={28} weight="bold" className="ml-2 mr-2" />
            <input
              type="text"
              className="flex-1 py-1 px-2 rounded-3xl border-0 focus:outline-none bg-transparent"
              placeholder={
                lang === "tr" ? jsonTr.urunismigir : jsonEn.urunismigir
              }
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
            />
          </div>
        </div>

        <div
          className={`grid ${
            listMode === "grid4"
              ? "grid-cols-1 md:grid-cols-4"
              : "grid-cols-1 md:grid-cols-5 px-12 gap-10"
          } pt-24`}
        >
          {products
            .filter((product) =>
              product.productName
                .toLowerCase()
                .includes(searchText.toLowerCase())
            )
            .map((product, index) => (
              <Link to={`/productsdetails/${product.productId}`} key={index}>
                <CenteredImageCard
                  imageUrl={`${API_FILE_URL}/products/${product.productImage}`}
                  title={decodeHtmlEntities(product.productName)}
                  productGram={product.productGram}
                />
              </Link>
            ))}
        </div>
      </div>
    </>
  );
};

export default ProductsAll;
