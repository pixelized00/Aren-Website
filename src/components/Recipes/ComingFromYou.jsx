import React, { useState, useEffect } from "react";
import Card from "react-bootstrap/Card";
import { API_ENDPOINTS, API_FILE_URL } from "../../config/config";
import { useLangContext } from "../../context/LangContext";
import jsonTr from "../../translations/tr/common.json";
import jsonEn from "../../translations/en/common.json";

function ComingFromYou() {
  const [data, setData] = useState([]);
  const [randomData, setRandomData] = useState([]);

  const { lang } = useLangContext();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const apiURL =
          lang === "tr"
            ? `${API_ENDPOINTS.JSON_FROMYOU}`
            : `${API_ENDPOINTS.JSON_FROMYOUEN}`;
        const response = await fetch(apiURL);
        const data = await response.json();
        setData(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [lang]);

  useEffect(() => {
    if (data.length > 0) {
      const randomIndexes = [];
      while (randomIndexes.length < 3) {
        const randomIndex = Math.floor(Math.random() * data.length);
        if (!randomIndexes.includes(randomIndex)) {
          randomIndexes.push(randomIndex);
        }
      }
      const randomDataItems = randomIndexes.map((index) => data[index]);
      setRandomData(randomDataItems);
    }
  }, [data]);

  return (
    <div>
      <p className="lg:ml-28 ml-2 px-3 font-breveia font-bold text-3xl lg:text-4xl mt-8">
        {lang === "tr" ? jsonTr.SizdenGelenler : jsonEn.SizdenGelenler}
      </p>

      <img src={"assets/img/coming.png"} alt="" className="lg:mt-4" />

      <div className="lg:flex  lg:justify-center lg:items-center lg:px-32  mx-6 lg:space-x-20 lg:-mt-60 grid grid-cols-1 md:grid-cols-2 md:space-x-6">
        {randomData.map((dataItem, i) => (
          <Card
            key={i}
            className="rounded-[76px] lg:-mt-44 drop-shadow-xl border-none  lg:mb-20 mb-10  h-96 lg:w-[60%]"
          >
            <Card.Img
              variant="top"
              src={`${API_FILE_URL}/fromyou/${dataItem.fromyouImage}`}
              alt="Recipes"
              className="h-[14rem] rounded-t-[60px]	 rounded-t-r-[50px]	"
            />
            <Card.Body>
              <Card.Title className=" text-[#2F3D57] text-center text-2xl">
                {dataItem.fromyouTitle}
              </Card.Title>
              <Card.Text className="text-[#2F3D57] text-center text-sm lg:mb-0">
                {dataItem.fromyouContent.length > 170
                  ? dataItem.fromyouContent.substring(0, 170) + "..."
                  : dataItem.fromyouContent}
              </Card.Text>
            </Card.Body>
          </Card>
        ))}
      </div>
    </div>
  );
}

export default ComingFromYou;
