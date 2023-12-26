import React, { useState, useEffect } from "react";
import { API_ENDPOINTS, API_FILE_URL } from "../config/config";
import PublicLayout from "../layouts/PublicLayout";
import SimpleSlider from "../components/Slider/Simple";
import { useParams } from "react-router-dom";
import { useLangContext } from "../context/LangContext";
import axios from "axios";
import jsonTr from "../translations/tr/common.json";
import jsonEn from "../translations/en/common.json";
import { Helmet } from "react-helmet";
import { Animated } from "react-animated-css";

const ProductsDetails = () => {
  const { productId } = useParams();
  const { lang } = useLangContext();
  const [fdata, setFdata] = useState({
    ingredients: [],
    nutritionalValues: [],
    products: [],
    productsicon: [],
  });

  const [selectedProduct, setSelectedProduct] = useState();
  const [selectedLetter, setSelectedLetter] = useState(null);
  const [loader, setLoader] = useState(false);

  useEffect(() => {
    setLoader(false);
    const apiEndpoint =
      lang === "en" ? API_ENDPOINTS.JSON_PRODUCTEN : API_ENDPOINTS.JSON_PRODUCT;
    axios
      .get(apiEndpoint) //?productId=${productId}
      .then((x) => {
        setFdata(x.data);
        const sp = x.data.products.find((p) => p.productId === productId);
        setSelectedProduct(sp);

        const ingredientsByLetter = {};
        x.data.ingredients
          .filter((ingredient) => ingredient.productId === productId)
          .forEach((ingredient) => {
            const firstLetter = ingredient.ingredientName
              .charAt(0)
              .toUpperCase();
            if (!ingredientsByLetter[firstLetter]) {
              ingredientsByLetter[firstLetter] = [];
            }
            ingredientsByLetter[firstLetter].push(ingredient);
          });

        setSelectedLetter(Object.keys(ingredientsByLetter)[0]);

        setLoader(true);
      })
      .catch((e) => console.error("Error fetching product details:", e));
  }, [productId, lang]);

  const ingredientsByLetter = {};
  fdata.ingredients
    .filter((ingredient) => ingredient.productId === productId)
    .forEach((ingredient) => {
      const firstLetter = ingredient.ingredientName.charAt(0).toUpperCase();
      if (!ingredientsByLetter[firstLetter]) {
        ingredientsByLetter[firstLetter] = [];
      }
      ingredientsByLetter[firstLetter].push(ingredient);
    });

  const handleLetterClick = (letter) => {
    setSelectedLetter((prevSelectedLetter) =>
      prevSelectedLetter === letter ? null : letter
    );
  };
  const getAllAlphabetLetters = () => {
    const alphabet = "ABCÇDEFGHIİJKLMNOPRSŞTUVYZ";
    return alphabet.split("").map((letter) => ({
      letter,
      active: !!ingredientsByLetter[letter],
    }));
  };

  if (!loader) return null;

  return (
    <PublicLayout>
      <Helmet>
        <title>Ürün Detay</title>
      </Helmet>
      <div className="w-screen  bg-[#FEFCF8] overflow-hidden">
        <div className="lg:flex">
          <div className="bg-[#FEFCF8] lg:w-[45%] px-2 flex flex-col justify-center items-center">
            <h1 className="text-[#018EA0] text-center font-lemongrassscript text-[40px] lg:text-[50px] lg:w-[80%]  mt-32 lg:mt-36">
              <Animated
                animationIn="slideInDown"
                animationOut="slideInDown"
                isVisible={true}
              >
                {selectedProduct?.productName}
              </Animated>
            </h1>
            <Animated
              animationIn="fadeInUp"
              animationOut="fadeInUp"
              isVisible={true}
            >
              {" "}
              <img
                src={`${API_FILE_URL}/products/${selectedProduct?.productImage}`}
                className="h-72"
                alt="Product"
              />{" "}
            </Animated>
            <a
              href="https://www.mayalihane.com/tum-urunler"
              target="_blank"
              rel="noopener noreferrer"
            >
              <button className="py-1 px-6  justify-center items-center  flex bg-[#2F3D57] font-semibold  text-white rounded-full text-xl mt-2">
                {lang === "tr" ? jsonTr.SepeteEkle : jsonEn.SepeteEkle}
                <img
                  src="/assets/svg/shop.svg"
                  alt="Shop"
                  className="h-10 ml-1"
                />
              </button>
            </a>
            <div className=" grid-cols-3 grid lg:grid-cols-5 gap-2  mt-4 text-center">
              {fdata.productsicon
                .filter(
                  (productsicons) => productsicons.productId === productId
                )
                .map((productsicons, index) => (
                  <div key={index} className="flex flex-col items-center">
                    <img
                      src={`${API_FILE_URL}/productsIcon/${productsicons?.productsiconImage}`}
                      alt="Icon"
                      className="h-12 text-[#2F3D57] "
                    />
                    {productsicons.productsiconTitle}
                  </div>
                ))}
            </div>
            <div className=" lg:w-[70%] mt-4 border-2 border-[#E30E16] rounded-full  px-1 mb-4 flex justify-center items-center">
              <div className=" px-3 text-[#E30E16] font-medium ">
                <span className="font-bold">
                  {" "}
                  {lang === "tr"
                    ? jsonTr.AlerjenUyarısı
                    : jsonEn.AlerjenUyarısı}
                  :
                </span>{" "}
                {selectedProduct?.productAllergen}
              </div>
            </div>
          </div>
          <div className="bg-[#F1E9D6]  lg:w-[55%]  lg:px-12 text-center pt-12 lg:pt-36 pb-20 ">
            <h1 className="text-[#2F3D57] font-bold text-[30px] lg:px-0 px-3">
              {lang === "tr" ? jsonTr.ÜRÜNÖZELLİKLERİ : jsonEn.ÜRÜNÖZELLİKLERİ}
            </h1>
            <div className="text-[#2F3D57] mt-4 lg:text-lg lg:px-0 px-3  mb-10 text-start">
              {selectedProduct?.productDetail}
            </div>

            <div className="border-4 border-[#FEFCF8] rounded-3xl mx-3">
              <h1 className="text-[#2F3D57]   mb-4 font-bold text-[30px] mt-4 lg:mt-2">
                {lang === "tr" ? jsonTr.İÇİNDEKİLER : jsonEn.İÇİNDEKİLER}
              </h1>

              <ul className="text-start text-lg mb-12  px-10 text-[#2F3D57]">
                {fdata.ingredients
                  .filter((ingredient) => ingredient.productId === productId)
                  .map((ingredient, index) => (
                    <li key={index}>{ingredient.ingredientName}</li>
                  ))}
              </ul>
            </div>
          </div>
        </div>
        <div className="lg:flex">
          <div className="bg-[#F1E9D6] text-center lg:w-[45%] pb-6">
            <h1 className="text-[#2F3D57] font-bold text-3xl lg:mt-4">
              {lang === "tr"
                ? jsonTr.ÜrünümünİçindeNeİşiVar
                : jsonEn.ÜrünümünİçindeNeİşiVar}
            </h1>
            <div className="bg-[#30506A] rounded-lg px-2 mt-4 text-white font-bold py-1 lg:mx-12 mx-2">
              <div className="flex flex-wrap justify-center items-center">
                {getAllAlphabetLetters().map((letterObj, index) => (
                  <div
                    key={index}
                    className={`text-white font-bold text-[10px] mx-2 my-1 cursor-pointer ${
                      selectedLetter === letterObj.letter ? "bg-[#018EA0]" : ""
                    } ${
                      !letterObj.active ? "opacity-50 cursor-not-allowed" : ""
                    }`}
                    onClick={() => {
                      if (letterObj.active) {
                        handleLetterClick(letterObj.letter);
                      }
                    }}
                  >
                    {letterObj.letter}
                  </div>
                ))}
              </div>
            </div>
            {Object.entries(ingredientsByLetter).map(
              ([letter, ingredientList]) => (
                <div key={letter}>
                  {selectedLetter === letter && (
                    <div className="bg-[#FFFFFF] border-2 border-[#30506A] rounded-3xl px-6 mx-6 mb-6 mt-6">
                      {ingredientList.map((ingredient, index) => (
                        <div key={index}>
                          {ingredient.ingredientWhatIs && (
                            <div>
                              <div className="text-[#2F3D57] font-bold text-xl mt-4">
                                <span className="text-[#018EA0]">
                                  {ingredient.ingredientName}{" "}
                                  {lang === "tr" ? jsonTr.Nedir : jsonEn.Nedir}{" "}
                                </span>
                              </div>
                              <div className="text-[#2F3D57">
                                {ingredient.ingredientWhatIs}
                              </div>
                            </div>
                          )}
                          {ingredient.ingredientWhy && (
                            <div>
                              <div className="text-[#2F3D57] font-bold text-xl mt-4">
                                <span className="text-[#018EA0]">
                                  {" "}
                                  {lang === "tr"
                                    ? jsonTr.ÜründeNedenVar
                                    : jsonEn.ÜründeNedenVar}{" "}
                                </span>
                              </div>
                              <div className="mb-4 text-[#2F3D57">
                                {ingredient.ingredientWhy}
                              </div>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )
            )}
          </div>
          <div className=" lg:w-[55%] lg:px-20 mt-4  px-4">
            <div className="text-[#2F3D57] font-bold text-center  text-3xl">
              {lang === "tr" ? jsonTr.BESİNDEĞERLERİ : jsonEn.BESİNDEĞERLERİ}
            </div>
            <div
              style={{ maxHeight: 430, width: "100%", overflowY: "auto" }}
              className="border-2 border-[#707070] mt-3"
            >
              <table className=" table-auto w-full  mb-4 text-[#2F3D57]">
                <thead className="">
                  <tr className="bg-[#2F3D57] text-white ">
                    <th className="px-4 py-2 text-center lg:text-lg text-md">
                      {lang === "tr"
                        ? jsonTr.BesinDeğerleri
                        : jsonEn.BesinDeğerleri}
                    </th>
                    <th className="px-4 py-2 text-center">ge</th>
                    <th className="px-4 py-2 text-center">100</th>
                  </tr>
                </thead>
                <tbody>
                  {fdata.nutritionalValues
                    .filter((ingredient) => ingredient.productId === productId)
                    .map((ingredient, index) => (
                      <tr key={index}>
                        <td className="px-4 py-2 text-center">
                          {ingredient.nutritionalValueName}
                        </td>
                        <td className="px-4 py-2 text-center">
                          {ingredient.nutritionalValueGe}
                        </td>
                        <td className="px-4 py-2 text-center">
                          {ingredient.nutritionalValueGram}
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <div className="flex flex-col justify-center items-center mt-12">
          <h1 className="font-lemongrassscript text-4xl text-[#018EA0] mt-4 ">
            {lang === "tr"
              ? jsonTr.BunlarıDenedinizmi
              : jsonEn.BunlarıDenedinizmi}{" "}
          </h1>
          <SimpleSlider />
        </div>
      </div>
    </PublicLayout>
  );
};

export default ProductsDetails;
