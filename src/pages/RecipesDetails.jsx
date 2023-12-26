import React, { useState, useEffect } from "react";
import PublicLayout from "../layouts/PublicLayout";
import RecipesMore from "../components/Recipes/RecipesMore";
import { Modal } from "react-bootstrap";
import { AiFillCloseCircle } from "react-icons/ai";
import { useParams } from "react-router-dom";
import { API_ENDPOINTS, API_FILE_URL } from "../config/config";
import decodeHtmlEntities from "../components/Functions/decodeHtmlEntities";
import { useLangContext } from "../context/LangContext";
import jsonTr from "../translations/tr/common.json";
import jsonEn from "../translations/en/common.json";
import { Helmet } from "react-helmet";
import { Animated } from "react-animated-css";

const RecipesDetails = () => {
  const { recipesId } = useParams();
  const [recipesData, setRecipesData] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const { lang } = useLangContext();

  const handleClose = () => {
    setShowModal(false);
  };

  const handleShow = () => {
    setShowModal(true);
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const apiURL =
          lang === "tr"
            ? ` ${API_ENDPOINTS.JSON_RECIPES}`
            : `${API_ENDPOINTS.JSON_RECIPESEN}`;
        const response = await fetch(apiURL);
        const data = await response.json();
        setRecipesData(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [recipesId, lang]);

  const selectedProduct = recipesData.find(
    (product) => product.recipesId === recipesId
  );
  return (
    <PublicLayout>
      <Helmet>
        <title>Tarif Detay</title>
      </Helmet>
      {selectedProduct && (
        <div className=" relative bg-[#FDF9EE] w-screen overflow-hidden">
          <Animated animationIn="zoomIn" animationOut="zoomIn" isVisible={true}>
            {" "}
            <div className="lg:flex lg:px-20 lg:space-x-12 mt-40 mx-4">
              {" "}
              <img
                className="h-[650px]  lg:h-[850px] rounded-xl "
                src={`${API_FILE_URL}/recipes/contentImage/${selectedProduct.recipesContentImage}`}
                alt="recipes"
              />
              <div>
                <div className="relative">
                  {" "}
                  <img
                    className=""
                    src={`${API_FILE_URL}/recipes/contentImage/glutenimg.png`}
                    alt="recipes"
                  />{" "}
                  <div className=" font-breveiablack absolute inset-0 flex flex-col items-center justify-center text-center text-white">
                    <h1 className="text-[#2F3D57] lg:text-[60px] text-[30px] ">
                      {decodeHtmlEntities(selectedProduct.recipesTitle)}
                    </h1>
                    {/* <p className="text-[#2F3D57] text-[20px] ">
                    Kalori: <span> {selectedProduct.recipesCalories} kCal</span>
                  </p> */}
                  </div>
                </div>

                <div className="flex  space-x-4 mt-2 ">
                  <div className="lg:w-[80%]">
                    <h1 className="text-[#7EBB32] font-breveiablack text-3xl">
                      {lang === "tr" ? jsonTr.Malzemeler : jsonEn.Malzemeler}
                    </h1>
                    <ul className="text-[#2F3D57] text-lg">
                      {selectedProduct.recipesMaterials
                        .split("\n")
                        .map((step, index) => (
                          <li key={index}>{step}</li>
                        ))}{" "}
                    </ul>{" "}
                  </div>
                </div>
                <div className="lg:w-[55%] mt-20">
                  <h1 className="text-[#7EBB32] font-breveiablack text-3xl -mt-16 ">
                    {lang === "tr" ? jsonTr.NasılYapılır : jsonEn.NasılYapılır}
                  </h1>
                  <ol className="text-[#2F3D57] text-lg">
                    {selectedProduct.recipesMake.length <= 300 ? (
                      <li>{selectedProduct.recipesMake}</li>
                    ) : (
                      <li>{`${selectedProduct.recipesMake.substring(
                        0,
                        310
                      )}...`}</li>
                    )}
                  </ol>

                  <p
                    className="underline mt-2 text-[#5F6D85]  font-bold text-lg text-end"
                    onClick={handleShow}
                  >
                    {lang === "tr" ? jsonTr.DevamınıOku : jsonEn.DevamınıOku}
                  </p>
                </div>
              </div>
            </div>
          </Animated>
          <div className=" flex-col flex lg:flex-row justify-start  items-center mt-12 lg:space-x-28 lg:ml-64">
            <a
              href="https://www.youtube.com/@mayalhane6364/videos"
              target="_blank"
              rel="noopener noreferrer"
            >
              <div className=" flex flex-col  justify-center  items-center  bg-[#FF0C0C] px-6 py-1 rounded-[40px]">
                <div className=" text  center text-white font-breveiablack text-xl mt-1">
                  {lang === "tr"
                    ? jsonTr.VideoluTariflerimiziçin
                    : jsonEn.VideoluTariflerimiziçin}
                </div>
                <img
                  src="/assets/svg/youtube.svg"
                  alt=""
                  className=" h-12 w-12"
                />
              </div>
            </a>
            {selectedProduct.recipesAllergen && (
              <div className="mt-4 border-2 border-[#E30E16] lg:w-[40%] rounded-full py-2 px-1 mb-4 flex justify-center items-center">
                <p className="text-[#E30E16] font-medium">
                  {lang === "tr"
                    ? jsonTr.AlerjenUyarısı
                    : jsonEn.AlerjenUyarısı}
                  : {selectedProduct.recipesAllergen}
                </p>
              </div>
            )}
          </div>
          <RecipesMore />
          <Modal
            show={showModal}
            onHide={handleClose}
            centered
            scrollable
            backdropClassName="bg-[#FDF9EE]"
          >
            <Modal.Title className="p-4 text-[#7EBB32] font-breveiablack text-4xl mt-8">
              {lang === "tr" ? jsonTr.NasılYapılır : jsonEn.NasılYapılır}
            </Modal.Title>
            <button className="absolute top-2 right-2" onClick={handleClose}>
              <AiFillCloseCircle size={32} color="#2F3D57" />
            </button>
            <Modal.Body className="p-4 mb-10">
              <ol className="text-[#2F3D57] space-y-4">
                {selectedProduct.recipesMake.split("\n").map((step, index) => (
                  <li key={index}>{step}</li>
                ))}
              </ol>
            </Modal.Body>
          </Modal>
        </div>
      )}
    </PublicLayout>
  );
};

export default RecipesDetails;
