import React, { useState, useEffect } from "react";
import Card from "react-bootstrap/Card";
import { Link } from "react-router-dom";
import { API_ENDPOINTS, API_FILE_URL } from "../../config/config";
import { useLangContext } from "../../context/LangContext";
import jsonTr from "../../translations/tr/common.json";
import jsonEn from "../../translations/en/common.json";

function CardPage() {
  const [blogData, setBlogData] = useState([]);
  const [randomBlogs, setRandomBlogs] = useState([]);
  const { lang } = useLangContext();
  const MAX_CONTENT_LENGTH = 100;

  useEffect(() => {
    const fetchBlogData = async () => {
      try {
        const apiURL =
          lang === "tr" ? API_ENDPOINTS.JSON_BLOG : API_ENDPOINTS.JSON_BLOGEN;
        const response = await fetch(apiURL);
        const data = await response.json();
        setBlogData(data);
      } catch (error) {
        console.error("Error fetching blog data:", error);
      }
    };

    fetchBlogData();
  }, [lang]);

  useEffect(() => {
    if (blogData.length > 0) {
      const shuffledData = blogData.sort(() => 0.5 - Math.random());
      const randomTwoBlogs = shuffledData.slice(0, 2);
      setRandomBlogs(randomTwoBlogs);
    }
  }, [blogData]);

  const renderBlogCards = () => {
    return randomBlogs.map((dataItem) => (
      <Link key={dataItem.id} to={`/blogdetails/${dataItem.blogId}`}>
        <Card className="lg:w-[24rem] h-[80%] rounded-[60px] mt-6 drop-shadow-xl border-none">
          <Card.Img
            variant="top"
            src={`${API_FILE_URL}/blog/${dataItem.blogCoverImage}`}
            alt="Kart Resmi"
            className="h-40 rounded-tl-[60px] rounded-tr-[60px]"
          />
          <Card.Body className="mb-3">
            <Card.Title className="underline mt-2 font-bold text-base">
              {dataItem.blogTitle}
            </Card.Title>
            <Card.Text>
              {dataItem.blogContent.substring(0, MAX_CONTENT_LENGTH)}...
            </Card.Text>
          </Card.Body>
        </Card>
      </Link>
    ));
  };

  return (
    <div className="mb-12 pb-2">
      <p className="font-extrabold text-2xl mt-8 font-lemongrass lg:mx-24 text-center">
        {lang === "tr" ? jsonTr.İLGİNİZİÇEKEBİLİR : jsonEn.İLGİNİZİÇEKEBİLİR}...
      </p>
      <div className="lg:flex justify-center items-center lg:space-x-28 mb-12 px-4">
        {renderBlogCards()}
      </div>
    </div>
  );
}

export default CardPage;
