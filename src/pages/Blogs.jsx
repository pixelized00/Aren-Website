import React, { useState, useEffect } from "react";
import PublicLayout from "../layouts/PublicLayout";
import Card from "react-bootstrap/Card";
import { Link } from "react-router-dom";
import { API_ENDPOINTS, API_FILE_URL } from "../config/config";
import { useLangContext } from "../context/LangContext";
import jsonTr from "../translations/tr/common.json";
import jsonEn from "../translations/en/common.json";
import { Helmet } from "react-helmet";
import { Animated } from "react-animated-css";

function formatDate(dateString) {
  const date = new Date(dateString);

  const day = date.getDate().toString().padStart(2, "0");
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const year = date.getFullYear();

  return `${day}/${month}/${year}`;
}

function Blogs() {
  const [blogData, setBlogData] = useState([]);
  const { lang } = useLangContext();

  useEffect(() => {
    const fetchBlogData = async () => {
      try {
        const apiURL =
          lang === "tr"
            ? `${API_ENDPOINTS.JSON_BLOG}`
            : `${API_ENDPOINTS.JSON_BLOGEN}`;
        const response = await fetch(apiURL);
        const data = await response.json();
        setBlogData(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchBlogData();
  }, [lang]);

  return (
    <PublicLayout>
      <Helmet>
        <title>Blog Yazıları</title>
        <meta name="keywords" content="blog yazıları" />
      </Helmet>

      <div className="relative bg-[#FEFCF7] w-screen overflow-hidden">
        <img src={"assets/img/ssslines.png"} alt="" className="mt-28" />
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 mt-16 mb-12 lg:px-28  mx-3 lg:gap-x-12 ">
          {blogData.map((blog, index) => (
            <Animated
              animationIn="zoomIn"
              animationOut="zoomIn"
              isVisible={true}
              key={index}
            >
              <Card className="bg-[#F1E9D6] border-none rounded-3xl h-[100%]">
                <Card.Img
                  variant="top"
                  src={`${API_FILE_URL}/blog/${blog.blogContentImage}`}
                  className="px-3 mt-4 h-48"
                  alt="Blog"
                />

                <Card.Body>
                  <div className="flex justify-between items-center md:space-x-12 ">
                    <div className="flex items-center">
                      <img
                        src={"assets/svg/user.svg"}
                        alt="User"
                        className="mr-2 w-4 h-4"
                      />
                      <Card.Text className="text-[#30506A] text-sm">
                        {lang === "tr" ? jsonTr.Yazar : jsonEn.Yazar}:
                        {blog.blogAuthor}
                      </Card.Text>
                    </div>
                    <div className="flex items-center">
                      <img
                        src={"assets/svg/date.svg"}
                        alt="Date"
                        className="mr-2 w-4 h-4"
                      />
                      <Card.Text className="text-[#30506A] text-sm">
                        {formatDate(blog.blogAddedDate, lang)}
                      </Card.Text>
                    </div>
                  </div>
                  <Card.Title className="mt-3 text-[18px] font-bold text-[#2F3D57] ">
                    {blog.blogTitle}
                  </Card.Title>
                  <Card.Text className="text-[16px] mt-2">
                    {blog.blogContent.substring(0, 180)}...
                  </Card.Text>
                </Card.Body>
                <Card.Footer className="">
                  <div className="flex justify-center items-center">
                    <Link to={`/blogdetails/${blog.blogId}`}>
                      <button className="bg-[#018EA0] hover:bg-[#2F3D57] text-white px-6 py-1 rounded-xl ">
                        {lang === "tr"
                          ? jsonTr.DevamınıOku
                          : jsonEn.DevamınıOku}
                      </button>
                    </Link>
                  </div>
                </Card.Footer>
              </Card>
            </Animated>
          ))}
        </div>
        <img src={"assets/img/ssslines.png"} alt="" className="mb-12" />
      </div>
    </PublicLayout>
  );
}

export default Blogs;
