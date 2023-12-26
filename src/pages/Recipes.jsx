import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import PublicLayout from "../layouts/PublicLayout";
import RecipesCard from "../components/Recipes/RecipesCard";
import ComingFromYou from "../components/Recipes/ComingFromYou";
import { API_ENDPOINTS } from "../config/config";
import { FunnelSimple } from "@phosphor-icons/react";
import { useLangContext } from "../context/LangContext";
import jsonTr from "../translations/tr/common.json";
import jsonEn from "../translations/en/common.json";
import decodeHtmlEntities from "../components/Functions/decodeHtmlEntities";
import { Helmet } from "react-helmet";

const Recipes = () => {
  const [data, setData] = useState([]);
  const [selectedProductType, setSelectedProductType] = useState("all");
  const [selectedFoodType, setSelectedFoodType] = useState("all");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const navigate = useNavigate();
  const [categoriesData, setCategoriesData] = useState([]);
  const { lang } = useLangContext();
  const [textData, setTextData] = useState({});
  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const apiURL =
          lang === "tr"
            ? `${API_ENDPOINTS.JSON_RECIPESCATEGORY}`
            : `${API_ENDPOINTS.JSON_RECIPESCATEGORYEN}`;
        const response = await fetch(apiURL);
        const data = await response.json();
        setCategoriesData(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [lang]);
  useEffect(() => {
    const fetchTextData = async () => {
      try {
        const apiURL =
          lang === "tr"
            ? ` ${API_ENDPOINTS.JSON_RECIPES_HOME}`
            : `${API_ENDPOINTS.JSON_RECIPES_HOMEEN}`;
        const response = await fetch(apiURL);
        const data = await response.json();
        setTextData(data[0]);
      } catch (error) {
        console.error("Error fetching text data:", error);
      }
    };

    fetchTextData();
  }, [lang]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const apiURL =
          lang === "tr"
            ? `${API_ENDPOINTS.JSON_RECIPES}`
            : `${API_ENDPOINTS.JSON_RECIPESEN}`;
        const response = await fetch(apiURL);
        const data = await response.json();
        setData(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [lang]);

  const handleEditClick = (item) => {
    navigate("/edit", { state: { item } });
  };

  const handleProductTypeClick = (productType) => {
    setSelectedProductType(productType);
  };

  const handleFoodTypeClick = (foodType) => {
    setSelectedFoodType(foodType);
  };

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
  };

  const productTypes = [
    ...new Set(categoriesData.map((item) => item.recipesCategoryProductType)),
  ].filter((item) => item !== null);

  const foodTypes = [
    ...new Set(categoriesData.map((item) => item.recipesCategoryFoodType)),
  ].filter((item) => item !== null);

  const categories = [
    ...new Set(categoriesData.map((item) => item.recipesCategoryTitle)),
  ].filter((item) => item !== null);

  const resetFilters = () => {
    setSelectedProductType("all");
    setSelectedFoodType("all");
    setSelectedCategory("all");
  };

  useEffect(() => {
    const filtered = data.filter((item) => {
      return (
        (selectedProductType === "all" ||
          item.recipesProductType === selectedProductType) &&
        (selectedFoodType === "all" ||
          item.recipesFoodType === selectedFoodType) &&
        (selectedCategory === "all" ||
          item.recipesCategory === selectedCategory) &&
        item.recipesCategoryTitle !== null &&
        item.recipesCategoryFoodType !== null &&
        item.recipesCategoryProductType !== null
      );
    });
    setFilteredData(filtered);
  }, [data, selectedProductType, selectedFoodType, selectedCategory]);

  return (
    <PublicLayout>
      <Helmet>
        <title>Tarifler</title>
        <meta name="keywords" content="tarifler , aren ilaç tarifler  " />
      </Helmet>

      <div className="w-screen overflow-hidden ">
        <div className="relative flex justify-center items-center">
          <img
            src={"assets/img/recipesdetails.png"}
            alt=""
            className="mt-20 lg:mt-24 "
          />
          <div className="absolute">
            <div className="flex flex-col justify-between items-center ">
              <h2 className="lg:w-[40%] w-[65%] lg:mb-0 mb-8 text-center font-lemongrassscript text-[#7EBB32] lg:text-7xl mt-28 text-3xl">
                {decodeHtmlEntities(textData.recipesHomeTitle)}
              </h2>
              <p className="text-center lg:w-[30%] text-lg hidden lg:block mt-2">
                {decodeHtmlEntities(textData.recipesHomeContent)}
              </p>
            </div>{" "}
          </div>
        </div>
        <div className="flex  justify-end items-end bg-[#7DBB31] text-center   ">
          <button
            className="flex items-center font-bold justify-center py-2 px-4 text-md rounded-3xl lg:mr-8 mt-2 text-white transition hover:bg-[#018EA0] "
            onClick={resetFilters}
          >
            {lang === "tr"
              ? jsonTr.FiltreleriSıfırlayın
              : jsonEn.FiltreleriSıfırlayın}
            <FunnelSimple size={28} weight="bold" className="ml-2" />
          </button>
        </div>
        <div className="flex flex-col  lg:justify-center lg:items-center bg-[#7DBB31] ">
          <div className="lg:flex px-3">
            <div className="flex flex-col space-y-2 lg:space-x-3  lg:space-y-0 lg:flex-row lg:items-center">
              <h1 className="font-lemongrassscript text-white text-4xl lg:mr-3 lg:-ml-48">
                {lang === "tr" ? jsonTr.KategoriSeçin : jsonEn.KategoriSeçin}
              </h1>
              {categories.map((category) => (
                <button
                  key={category}
                  className={`border-2 border-[#FEFCF7] py-2 px-10 rounded-3xl ${
                    selectedCategory === category ? "bg-white" : ""
                  }`}
                  onClick={() => handleCategoryClick(category)}
                >
                  {decodeHtmlEntities(category)}
                </button>
              ))}
            </div>
          </div>
          <div className="lg:flex mt-6 px-3">
            <div className="flex flex-col space-y-2 lg:space-x-3  lg:space-y-0 lg:flex-row lg:items-center">
              <h1 className="font-lemongrassscript text-white text-4xl lg:mr-3">
                {lang === "tr" ? jsonTr.ÜrününüzüSeçin : jsonEn.ÜrününüzüSeçin}
              </h1>
              {productTypes.map((productType) => (
                <button
                  key={productType}
                  className={`border-2 border-[#FEFCF7] py-2 px-10 rounded-3xl ${
                    selectedProductType === productType ? "bg-white" : ""
                  }`}
                  onClick={() => handleProductTypeClick(productType)}
                >
                  {decodeHtmlEntities(productType)}
                </button>
              ))}
            </div>
          </div>
          <div className="lg:flex mb-12 mt-6 lg:ml-2 px-3">
            <div className="flex flex-col space-y-2 lg:space-x-3  lg:space-y-0 lg:flex-row lg:items-center">
              <h1 className="font-lemongrassscript text-white text-4xl lg:mr-3 lg:ml-36 ">
                {lang === "tr" ? jsonTr.YemeğiniSeç : jsonEn.YemeğiniSeç}
              </h1>
              {foodTypes.map((foodType) => (
                <button
                  key={foodType}
                  className={`border-2 border-[#FEFCF7] py-2 px-10 rounded-3xl ${
                    selectedFoodType === foodType ? "bg-white" : ""
                  }`}
                  onClick={() => handleFoodTypeClick(foodType)}
                >
                  {decodeHtmlEntities(foodType)}
                </button>
              ))}
            </div>
          </div>
        </div>
        <div className="bg-[#FEFCF8] ">
          <img src={"assets/img/recipeslines.png"} alt="" className="" />
          <div className="grid-cols-1 grid lg:grid-cols-4 gap-y-12 md:grid-cols-2 md:space-x-6 mb-12">
            {filteredData.map((item) => (
              <RecipesCard
                key={item.recipesId}
                item={item}
                handleEditClick={handleEditClick}
              />
            ))}
          </div>

          <ComingFromYou />
        </div>
      </div>
    </PublicLayout>
  );
};

export default Recipes;
