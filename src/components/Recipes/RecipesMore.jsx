import React, { useState, useEffect } from "react";
import Card from "react-bootstrap/Card";
import { API_ENDPOINTS, API_FILE_URL } from "../../config/config";
import { Link } from "react-router-dom";
import { useLangContext } from "../../context/LangContext";
import jsonTr from "../../translations/tr/common.json";
import jsonEn from "../../translations/en/common.json";

function RecipesMore() {
  const [recipes, setRecipes] = useState([]);
  const [randomRecipes, setRandomRecipes] = useState([]);
  const { lang } = useLangContext();

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const apiURL =
          lang === "tr"
            ? ` ${API_ENDPOINTS.JSON_RECIPES}`
            : `${API_ENDPOINTS.JSON_RECIPESEN}`;
        const response = await fetch(apiURL);
        const data = await response.json();
        setRecipes(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchRecipes();
  }, [lang]);

  useEffect(() => {
    const shuffledRecipes = [...recipes].sort(() => Math.random() - 0.5);
    const randomThreeRecipes = shuffledRecipes.slice(0, 3);

    setRandomRecipes(randomThreeRecipes);
  }, [recipes]);

  return (
    <div>
      <p
        className="px-12 font-breveia
       font-bold text-4xl mt-16  lg:mt-28 "
      >
        {lang === "tr" ? jsonTr.DahaFazla : jsonEn.DahaFazla}
        ...
      </p>

      <img src="/assets/img/coming.png" alt="" className="mt-36 lg:mt-0" />

      <div className="lg:flex justify-center items-center lg:px-44 lg:space-x-20  -mt-56  grid md:grid-cols-2  grid-cols-1 ">
        {randomRecipes.map((recipe) => (
          <Link to={`/recipesdetails/${recipe.recipesId}`}>
            <Card
              key={recipe.id}
              className="  rounded-[65px] lg:-mt-40 drop-shadow-xl border-none mt-8 mb-20 mx-4 lg:w-80 h-[340px]  "
            >
              <Card.Img
                variant="top"
                src={`${API_FILE_URL}/recipes/coverImage/${recipe.recipesCoverImage}`}
                alt="Recipes"
                className="h-[12rem] w-[100%]  rounded-tl-[60px] rounded-tr-[60px]  "
              />
              <Card.Body>
                <Card.Title className=" text-[#2F3D57] text-center text-lg">
                  {recipe.recipesTitle}
                </Card.Title>
                <Card.Text className="text-[#2F3D57] text-center text-sm ">
                  {recipe.recipesContent.substring(0, 100)}...
                </Card.Text>
              </Card.Body>
            </Card>{" "}
          </Link>
        ))}{" "}
      </div>
    </div>
  );
}

export default RecipesMore;
