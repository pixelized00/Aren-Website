import React, { useState, useEffect } from "react";
import PublicLayout from "../layouts/PublicLayout";
import Card from "../components/Card/Card";
import { useParams } from "react-router-dom";
import { API_ENDPOINTS, API_FILE_URL } from "../config/config";
import { useLangContext } from "../context/LangContext";
import { Helmet } from "react-helmet";

const BlogDetails = () => {
  const { blogId } = useParams();
  const [blogDetails, setBlogDetails] = useState({
    blogTitle: "",
    blogContent: "",
  });
  const { lang } = useLangContext();

  useEffect(() => {
    const fetchBlogDetails = async () => {
      try {
        const apiURL =
          lang === "tr"
            ? ` ${API_ENDPOINTS.JSON_BLOG}?blogId=${blogId}`
            : `${API_ENDPOINTS.JSON_BLOGEN}?blogId=${blogId}`;
        const response = await fetch(apiURL);
        const data = await response.json();
        setBlogDetails(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchBlogDetails();
  }, [blogId, lang]);

  return (
    <PublicLayout>
      <Helmet>
        <title>Blog Detay</title>
      </Helmet>

      <div className="relative bg-[#FEFCF7]  w-screen overflow-hidden">
        <div className=" lg:mt-24 top-0 left-0 right-0 bottom-0  ">
          <img
            className="d-block w-[100%] lg:h-[500px] h-[300px] mt-12"
            src={`${API_FILE_URL}/blog/${blogDetails.blogCoverImage}`}
            alt="Blog"
          />

          <div className="lg:px-28 mt-16">
            <div className="px-4">
              <h3 className="font-bold text-2xl mb-8">
                {blogDetails.blogTitle}
              </h3>
              <p className=" ">
                {blogDetails?.blogContent &&
                  blogDetails.blogContent.split("\n").map((line, index) => (
                    <p className="mt-2" key={index}>
                      {line}
                    </p>
                  ))}{" "}
              </p>
            </div>
            <div className="border-2 border-[#2F3D57] mx-12  mt-12 lg:mt-16"></div>{" "}
            <Card />
          </div>
        </div>
      </div>
    </PublicLayout>
  );
};

export default BlogDetails;
