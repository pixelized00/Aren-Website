import React, { useState, useEffect } from "react";
import Card from "react-bootstrap/Card";
import Modal from "react-bootstrap/Modal";
import { Animated } from "react-animated-css";
import { API_ENDPOINTS, API_FILE_URL } from "../../config/config";
import { useLangContext } from "../../context/LangContext";
import decodeHtmlEntities from "../Functions/decodeHtmlEntities";
import jsonTr from "../../translations/tr/common.json";
import jsonEn from "../../translations/en/common.json";

const NewsCard = () => {
  const [blogData, setBlogData] = useState([]);
  const { lang } = useLangContext();
  const [showModal, setShowModal] = useState(false);
  const [selectedBlog, setSelectedBlog] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const apiURL =
          lang === "tr" ? API_ENDPOINTS.JSON_NEWS : API_ENDPOINTS.JSON_NEWSEN;
        const response = await fetch(apiURL);
        const data = await response.json();
        setBlogData(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [lang]);

  const openModal = (blog) => {
    setSelectedBlog(blog);
    setShowModal(true);
  };

  const closeModal = () => {
    setSelectedBlog(null);
    setShowModal(false);
  };

  const renderNewsCards = () => {
    return blogData.map((news, index) => (
      <div className="flex justify-center items-center" key={index}>
        <Animated animationIn="zoomIn" animationOut="zoomIn" isVisible={true}>
          <Card className="lg:w-[100%] w-[95%] px-4 text-[#2F3D57] py-2 rounded-3xl border-4 border-[#F1E9D6] bg-[#F1E9D6] mb-8">
            <Card.Title className="mt-2 text-[#2F3D57] font-extrabold text-base text-center">
              {decodeHtmlEntities(news.newsTitle)}
            </Card.Title>
            <img
              src={`${API_FILE_URL}/news/${news.newsImage}`}
              className="h-52 md:h-60 mb-6 mt-1 rounded-md"
              alt={news.newsTitle}
            />
            <button onClick={() => openModal(news)}>
              <div className="flex justify-center items-center bg-[#2F3D57] rounded-md py-2 px-2 w-44 left-1/4 absolute inset-x-0 -mt-2 border border-[#2F3D57] font-medium text-[#fff]">
                {lang === "tr" ? jsonTr.Haber : jsonEn.Haber}
              </div>
            </button>
          </Card>
        </Animated>
      </div>
    ));
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-8 lg:px-24 mt-10 mb-10 mx-4">
      {renderNewsCards()}
      <Modal
        className="rounded-[40px] border-none"
        show={showModal}
        onHide={closeModal}
        dialogClassName="modal-lg"
        contentClassName="bg-[#FDF9EE]"
      >
        <Modal.Header closeButton>
          <Modal.Title className="text-lg font-bold text-[#018EA0]">
            {selectedBlog && decodeHtmlEntities(selectedBlog.newsTitle)}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedBlog && (
            <>
              <img
                src={`${API_FILE_URL}/news/${selectedBlog.newsImage}`}
                alt={selectedBlog.newsTitle}
                className="w-full max-h-96 mb-3"
              />
              {decodeHtmlEntities(selectedBlog.newsContent)}
            </>
          )}
        </Modal.Body>
        <Modal.Footer className="flex justify-center items-center">
          <button
            className="bg-[#018EA0] text-white px-6 py-1 rounded-xl"
            onClick={closeModal}
          >
            Kapat
          </button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default NewsCard;
