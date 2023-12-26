import React from "react";
import Card from "react-bootstrap/Card";
import { API_FILE_URL } from "../../config/config";
import { Link } from "react-router-dom";

function RecipesCard({ item, index }) {
  return (
    <div className="px-12 ">
      <Link to={`/recipesdetails/${item.recipesId}`} key={index}>
        <Card
          key={item.id}
          className="w-80 rounded-[60px] lg:-mt-44 drop-shadow-xl border-none mt-8 lg:mb-44 h-80 "
        >
          <Card.Img
            variant="top"
            src={`${API_FILE_URL}/recipes/coverImage/${item.recipesCoverImage}`}
            alt="Recipes"
            className="h-48  rounded-tl-[60px] rounded-tr-[60px]  "
          />
          <Card.Body>
            <Card.Title className="text-[#2F3D57] text-center text-lg">
              {item.recipesTitle}
            </Card.Title>
            <Card.Text className="text-[#2F3D57] text-center text-sm   ">
              {item.recipesContent.length > 120
                ? item.recipesContent.substring(0, 120) + "..."
                : item.recipesContent}
            </Card.Text>
          </Card.Body>
        </Card>
      </Link>
    </div>
  );
}

export default RecipesCard;
