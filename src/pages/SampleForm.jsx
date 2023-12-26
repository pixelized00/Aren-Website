import React from "react";
import { useLangContext } from "../context/LangContext";
import jsonTr from "../translations/tr/common.json";
import jsonEn from "../translations/en/common.json";
import { Animated } from "react-animated-css";

const SampleForm = () => {
  const { lang } = useLangContext();

  return (
    <div className=" ">
      <div className=" flex flex-col lg:flex lg:flex-row justify-center items-center  lg:space-x-10 mt-44 pb-16">
        <Animated
          animationIn="rotateInDownLeft"
          animationOut="rotateInDownLeft"
          isVisible={true}
        >
          {" "}
          <a href="/patientdemand">
            {" "}
            <div className="flex  flex-col justify-center items-center -mt-10">
              <img
                src={"assets/img/medicalicon.png"}
                alt=""
                className="h-44 absolute -mt-80"
              />{" "}
              <p className="bg-[#FDF9EE] w-[35%] text-[#018EA0] hover:text-[#018EA0]   rounded-full flex justify-center items-center text-center text-5xl py-24 px-36 font-lemongrassscript text-[]#010101">
                {lang === "tr" ? jsonTr.HastaTalep : jsonEn.HastaTalep}
              </p>
            </div>{" "}
          </a>{" "}
        </Animated>
        <a href="/medicaldemand">
          <Animated
            animationIn="rotateInDownRight"
            animationOut="rotateInDownRight"
            isVisible={true}
          >
            {" "}
            <div className="flex  flex-col justify-center items-center lg:mt-0 mt-44">
              {" "}
              <img
                src={"assets/img/clinic.png"}
                alt=""
                className="h-40 absolute -mt-96"
              />{" "}
              <p className="bg-[#FDF9EE] w-[50%] flex text-[#018EA0] hover:text-[#018EA0] -mt-10 justify-center items-center rounded-full  text-center text-5xl px-36 py-[70px] lg:px-28 font-lemongrassscript text-[]#010101">
                {lang === "tr" ? jsonTr.TıpUzmanıTalep : jsonEn.TıpUzmanıTalep}
              </p>
            </div>
          </Animated>
        </a>
      </div>
    </div>
  );
};

export default SampleForm;
