import React, { useState, useEffect } from "react";
import { Minus, Plus } from "@phosphor-icons/react";
import { Disclosure } from "@headlessui/react";
import { API_ENDPOINTS } from "../../config/config";
import { useLangContext } from "../../context/LangContext";
import jsonTr from "../../translations/tr/common.json";
import jsonEn from "../../translations/en/common.json";
import decodeHtmlEntities from "../Functions/decodeHtmlEntities";
import { Animated } from "react-animated-css";

const Faq = () => {
  const { lang } = useLangContext();
  const [faqData, setFaqData] = useState([]);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const apiURL =
          lang === "tr"
            ? API_ENDPOINTS.JSON_ASKEDQUESTION
            : API_ENDPOINTS.JSON_ASKEDQUESTIONEN;
        const response = await fetch(apiURL);
        const data = await response.json();
        setFaqData(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [lang]);

  const togglePanel = () => {
    setOpen((prev) => !prev);
  };

  return (
    <div className="lg:px-24 mx-3">
      <h1 className="text-[#018EA0] font-lemongrassscript mb-8 text-6xl mt-4">
        {lang === "tr"
          ? jsonTr.SıkçaSorulanSorular
          : jsonEn.SıkçaSorulanSorular}
      </h1>
      <div className="w-[100%] overflow-hidden lg:mt-10 mb-16">
        {faqData.map((item, index) => (
          <Animated
            key={index}
            animationIn="zoomIn"
            animationOut="zoomIn"
            isVisible={true}
          >
            <Disclosure>
              {({ open }) => (
                <div className="rounded-2xl mb-6 ">
                  <Disclosure.Button
                    className={`flex w-full items-center rounded-xl border-2 shodow-2xl ${
                      open
                        ? "bg-[#7EBB32] text-white border-b border-[#7EBB32]"
                        : "bg-[#7EBB32] text-white border-b border-[#7EBB32]"
                    }  shadow-md px-4 py-2 text-left text-md  focus:outline-none focus-visible:ring  focus-visible:ring-opacity-75`}
                    onClick={togglePanel}
                  >
                    {open ? (
                      <Minus className="h-4 w-4 text-white" weight="bold" />
                    ) : (
                      <Plus className="h-4 w-4 text-white" weight="bold" />
                    )}
                    <span className="ml-2">
                      {decodeHtmlEntities(item.questionName)}
                    </span>
                  </Disclosure.Button>

                  <Disclosure.Panel className="-mt-2 bg-white drop-shadow-md px-4 pt-4 pb-2 text-base text-gray-600 border-[#7EBB32] border-2 rounded-bl-2xl rounded-br-2xl">
                    {decodeHtmlEntities(item.questionAnswer)}
                  </Disclosure.Panel>
                </div>
              )}
            </Disclosure>
          </Animated>
        ))}
      </div>
    </div>
  );
};

export default Faq;
