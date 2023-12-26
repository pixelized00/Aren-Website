import React, { useState, useEffect } from "react";
import { API_ENDPOINTS, API_FILE_URL } from "../../config/config";
import { useLangContext } from "../../context/LangContext";
import { Animated } from "react-animated-css";

const SocialMediaIcon = ({ href, iconSrc, altText }) => (
  <a href={href} target="_blank" rel="noopener noreferrer">
    <img
      src={`${API_FILE_URL}/icons/socialsIcon/${iconSrc}`}
      className="h-12"
      alt={altText}
    />
  </a>
);

const About = () => {
  const { lang } = useLangContext();
  const { JSON_ABOUT, JSON_ABOUTEN } = API_ENDPOINTS;
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const apiURL = lang === "tr" ? JSON_ABOUT : JSON_ABOUTEN;
        const response = await fetch(apiURL);
        const data = await response.json();
        setData(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [lang]);

  return (
    <div className="lg:px-44">
      {data.map((item) => (
        <div key={item.aboutId} className="px-4">
          <h1 className="font-lemongrassscript text-[#018EA0] text-5xl lg:text-6xl mt-8">
            {item.aboutTitle}
          </h1>
          <p className="text-[#707070] text-[16px] lg:text-[20px] ">
            {item?.aboutContent &&
              item.aboutContent.split("\n").map((line, index) => (
                <p className="mt-4" key={index}>
                  {line}
                </p>
              ))}
          </p>
          <div className="flex space-x-4 mt-4">
            {item.aboutInstagram && (
              <SocialMediaIcon
                href={item.aboutInstagram}
                iconSrc="aboutinstagram.svg"
                altText="Instagram"
              />
            )}
            {item.aboutFacebook && (
              <SocialMediaIcon
                href={item.aboutFacebook}
                iconSrc="aboutfacebook.svg"
                altText="Facebook"
              />
            )}
            {item.aboutTwitter && (
              <SocialMediaIcon
                href={item.aboutTwitter}
                iconSrc="abouttwitter.svg"
                altText="Twitter"
              />
            )}
            {item.aboutLinkedIn && (
              <SocialMediaIcon
                href={item.aboutLinkedIn}
                iconSrc="aboutlinkedin.svg"
                altText="LinkedIn"
              />
            )}
          </div>
          <Animated animationIn="zoomIn" animationOut="zoomIn" isVisible={true}>
            <div className="flex justify-center items-center mt-12 mb-12">
              <iframe
                width="97%"
                className="lg:h-[600px] h-[400px]"
                src={item.aboutYoutube}
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              ></iframe>
            </div>
          </Animated>
        </div>
      ))}
    </div>
  );
};

export default About;
